"use client";

import Link from "next/link";
import { CircleAlert, CircleCheck, ImagePlus, LoaderCircle, Phone, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { bookingLimits } from "@/config/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/ro";
import { track } from "@/lib/analytics/track";
import { getUtm, UTM_KEYS } from "@/lib/analytics/utm";
import {
  contactMethods,
  preferredTimes,
  SERVICE_OTHER,
  SERVICE_UNKNOWN,
  todayInChisinau,
  validateBooking,
  validatePhotos,
  type BookingErrorKey,
  type BookingErrors,
  type BookingField,
} from "@/lib/booking/validation";
import { CHAT_PREFILL_KEY, type ChatPrefill } from "@/lib/chat/types";
import { buttonClasses } from "@/components/ui/button";
import { resizeImage } from "./resize-image";

type Labels = Dictionary["booking"];

interface Props {
  locale: Locale;
  labels: Labels;
  optionalLabel: string;
  services: { id: string; label: string }[];
  uploadsEnabled: boolean;
  phone: { href: string; label: string } | null;
  privacyHref: string;
  yearMax: number;
}

type Status =
  | { type: "idle" }
  | { type: "submitting" }
  | { type: "success"; id: string; emailSent: boolean }
  | { type: "error"; kind: "rate" | "generic" };

interface Photo {
  file: File;
  url: string;
}

const DRAFT_KEY = "fc_booking_draft";
const TEXT_FIELDS = [
  "name",
  "phone",
  "email",
  "contactMethod",
  "carBrand",
  "carModel",
  "carYear",
  "mileage",
  "plate",
  "service",
  "description",
  "preferredDate",
  "preferredTime",
] as const;

const BRANDS = [
  "Audi", "BMW", "Chevrolet", "Citroën", "Dacia", "Fiat", "Ford", "Honda", "Hyundai", "Kia", "Land Rover", "Lexus", "Mazda",
  "Mercedes-Benz", "Mitsubishi", "Nissan", "Opel", "Peugeot", "Porsche", "Renault", "Seat", "Škoda", "Subaru", "Suzuki", "Tesla",
  "Toyota", "Volkswagen", "Volvo",
];

const input =
  "block h-12 w-full rounded-md border border-line/90 bg-white px-3.5 text-base text-text placeholder:text-steel-400 transition-[border-color,box-shadow] duration-200 focus:border-brand focus:ring-2 focus:ring-brand/15 focus:outline-none aria-[invalid=true]:border-danger aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-danger/10";

const safeSession = {
  get(key: string) {
    try {
      return sessionStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key: string, value: string) {
    try {
      sessionStorage.setItem(key, value);
    } catch {
      /* stocare indisponibilă */
    }
  },
  remove(key: string) {
    try {
      sessionStorage.removeItem(key);
    } catch {
      /* stocare indisponibilă */
    }
  },
};

export function BookingForm({ locale, labels, optionalLabel, services, uploadsEnabled, phone, privacyHref, yearMax }: Props) {
  const f = labels.fields;
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const startedAt = useRef<HTMLInputElement>(null);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const started = useRef(false);

  const [errors, setErrors] = useState<BookingErrors>({});
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<Status>({ type: "idle" });
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [processing, setProcessing] = useState(false);
  const [descLength, setDescLength] = useState(0);
  const [prefilled, setPrefilled] = useState(false);
  const [minDate, setMinDate] = useState<string>();
  const [hydrated, setHydrated] = useState(false);

  const serviceIds = services.map((s) => s.id);

  // Restaurare ciornă + precompletare din URL (?service=) sau din conversația cu asistentul.
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    if (startedAt.current) startedAt.current.value = String(Date.now());
    const setField = (name: string, value: string) => {
      const el = form.elements.namedItem(name) as HTMLInputElement | RadioNodeList | null;
      if (el && value) el.value = value;
    };
    const draft = safeSession.get(DRAFT_KEY);
    if (draft) {
      try {
        const values = JSON.parse(draft) as Record<string, string>;
        for (const k of TEXT_FIELDS) if (typeof values[k] === "string") setField(k, values[k]);
      } catch {
        safeSession.remove(DRAFT_KEY);
      }
    }
    const fromUrl = new URLSearchParams(location.search).get("service");
    if (fromUrl && serviceIds.includes(fromUrl)) setField("service", fromUrl);

    const rawPrefill = safeSession.get(CHAT_PREFILL_KEY);
    let didPrefill = false;
    if (rawPrefill) {
      safeSession.remove(CHAT_PREFILL_KEY);
      try {
        const prefill = JSON.parse(rawPrefill) as ChatPrefill;
        if (prefill.serviceId && serviceIds.includes(prefill.serviceId)) setField("service", prefill.serviceId);
        const desc = form.elements.namedItem("description") as HTMLTextAreaElement | null;
        if (prefill.description && desc && !desc.value) desc.value = prefill.description.slice(0, bookingLimits.maxDescription);
        didPrefill = Boolean(prefill.serviceId || prefill.description);
      } catch {
        /* ignorat */
      }
    }
    const desc = form.elements.namedItem("description") as HTMLTextAreaElement | null;
    const length = desc?.value.length ?? 0;
    const today = todayInChisinau();
    queueMicrotask(() => {
      setDescLength(length);
      setPrefilled(didPrefill);
      setMinDate(today);
      setHydrated(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const photosRef = useRef<Photo[]>([]);
  useEffect(() => {
    photosRef.current = photos;
  }, [photos]);
  useEffect(() => () => photosRef.current.forEach((p) => URL.revokeObjectURL(p.url)), []);

  const readRaw = (form: HTMLFormElement) => {
    const fd = new FormData(form);
    const raw: Record<string, unknown> = {};
    for (const k of TEXT_FIELDS) raw[k] = fd.get(k) ?? "";
    raw.consent = fd.get("consent") === "on";
    return raw;
  };

  const collectErrors = (form: HTMLFormElement, currentPhotos: Photo[]): BookingErrors => {
    const result = validateBooking(readRaw(form), { serviceIds, today: todayInChisinau() });
    const errs: BookingErrors = result.ok ? {} : { ...result.errors };
    if (uploadsEnabled) {
      const photoError = validatePhotos(currentPhotos.map((p) => ({ name: p.file.name, type: p.file.type, size: p.file.size })));
      if (photoError) errs.photos = photoError;
    }
    return errs;
  };

  const onInput = () => {
    const form = formRef.current;
    if (!form) return;
    if (attempted) setErrors(collectErrors(form, photos));
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      const raw = readRaw(form);
      delete raw.consent;
      safeSession.set(DRAFT_KEY, JSON.stringify(raw));
    }, 400);
  };

  const onFocus = () => {
    if (started.current) return;
    started.current = true;
    track("booking_start", { location: "booking_form" });
  };

  const onPhotos = async (list: FileList | null) => {
    if (!list?.length) return;
    const incoming = Array.from(list);
    const typeError = validatePhotos(incoming.map((f) => ({ name: f.name, type: f.type, size: 1 })));
    if (typeError === "photoType") {
      setErrors((e) => ({ ...e, photos: "photoType" }));
      return;
    }
    if (photos.length + incoming.length > bookingLimits.maxPhotos) {
      setErrors((e) => ({ ...e, photos: "photoCount" }));
      return;
    }
    setProcessing(true);
    const resized = await Promise.all(incoming.map((file) => resizeImage(file, bookingLimits.clientResizeMaxEdge)));
    const next = [...photos, ...resized.map((file) => ({ file, url: URL.createObjectURL(file) }))];
    setPhotos(next);
    setProcessing(false);
    const photoError = validatePhotos(next.map((p) => ({ name: p.file.name, type: p.file.type, size: p.file.size })));
    setErrors((e) => {
      const rest = { ...e };
      delete rest.photos;
      return photoError ? { ...rest, photos: photoError } : rest;
    });
  };

  const removePhoto = (index: number) => {
    URL.revokeObjectURL(photos[index].url);
    const next = photos.filter((_, i) => i !== index);
    setPhotos(next);
    const photoError = validatePhotos(next.map((p) => ({ name: p.file.name, type: p.file.type, size: p.file.size })));
    setErrors((e) => {
      const rest = { ...e };
      delete rest.photos;
      return photoError ? { ...rest, photos: photoError } : rest;
    });
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const errs = collectErrors(form, photos);
    setErrors(errs);
    setAttempted(true);
    if (Object.keys(errs).length > 0) {
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    setStatus({ type: "submitting" });
    const fd = new FormData(form);
    fd.delete("photos");
    if (uploadsEnabled) for (const p of photos) fd.append("photos", p.file, p.file.name);
    fd.set("page", location.pathname);
    const utm = getUtm();
    for (const k of UTM_KEYS) if (utm[k]) fd.set(k, utm[k]!);

    try {
      const res = await fetch("/api/booking", { method: "POST", body: fd, headers: { Accept: "application/json" } });
      const json = (await res.json().catch(() => null)) as
        | { ok: true; id: string; customerEmailSent: boolean }
        | { ok: false; error: string; fields?: BookingErrors }
        | null;
      if (res.ok && json?.ok) {
        track("booking_submit", {
          service: String(fd.get("service") ?? ""),
          contact_method: String(fd.get("contactMethod") ?? ""),
          photos: photos.length,
          locale,
        });
        safeSession.remove(DRAFT_KEY);
        form.reset();
        photos.forEach((p) => URL.revokeObjectURL(p.url));
        setPhotos([]);
        setAttempted(false);
        setStatus({ type: "success", id: json.id, emailSent: json.customerEmailSent });
        requestAnimationFrame(() => {
          successRef.current?.focus();
          successRef.current?.scrollIntoView({ block: "center" });
        });
        return;
      }
      if (res.status === 429) setStatus({ type: "error", kind: "rate" });
      else if (json && !json.ok && json.fields && Object.keys(json.fields).length) {
        setErrors(json.fields);
        setStatus({ type: "idle" });
        requestAnimationFrame(() => summaryRef.current?.focus());
      } else setStatus({ type: "error", kind: "generic" });
    } catch {
      setStatus({ type: "error", kind: "generic" });
    }
  };

  const message = (key: BookingErrorKey) =>
    labels.errors[key]
      .replace("{mb}", String(Math.round(bookingLimits.maxPhotoBytes / 1024 / 1024)))
      .replace("{max}", String(bookingLimits.maxPhotos));

  const fieldLabels: Partial<Record<BookingField, string>> = {
    name: f.name,
    phone: f.phone,
    email: f.email,
    carBrand: f.brand,
    carModel: f.model,
    carYear: f.year,
    mileage: f.mileage,
    service: f.service,
    description: f.description,
    preferredDate: f.date,
    photos: f.photos,
  };

  const a11y = (name: BookingField, hint = false) => {
    const describedBy = [errors[name] ? `bf-${name}-error` : null, hint ? `bf-${name}-hint` : null].filter(Boolean).join(" ");
    return {
      id: `bf-${name}`,
      name,
      "aria-invalid": errors[name] ? true : undefined,
      "aria-describedby": describedBy || undefined,
    } as const;
  };

  const errorText = (name: BookingField) =>
    errors[name] ? (
      <p id={`bf-${name}-error`} className="mt-1.5 flex items-start gap-1.5 text-sm font-semibold text-danger">
        <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
        {message(errors[name]!)}
      </p>
    ) : null;

  const label = (name: BookingField, text: string, required: boolean) => (
    <label htmlFor={`bf-${name}`} className="mb-1.5 block text-sm font-bold">
      {text}
      {required ? (
        <span className="text-brand" aria-hidden="true">
          {" "}
          *
        </span>
      ) : (
        <span className="font-medium text-muted"> ({optionalLabel})</span>
      )}
    </label>
  );

  const legend = (n: number, text: string) => (
    <legend className="mb-5 flex items-center gap-3 text-lg font-extrabold">
      <span className="flex size-7 items-center justify-center rounded-md bg-ink-900 text-sm text-white tabular-nums">{n}</span>
      {text}
    </legend>
  );

  const errorEntries = Object.entries(errors) as [BookingField, BookingErrorKey][];

  if (status.type === "success") {
    return (
      <div className="rounded-lg bg-success-soft p-6 ring-1 ring-success/20 sm:p-8" role="status">
        <CircleCheck className="size-10 text-success" aria-hidden="true" />
        <h2 ref={successRef} tabIndex={-1} className="mt-4 text-2xl font-extrabold outline-none">
          {labels.success.title}
        </h2>
        <p className="mt-3 text-lg leading-relaxed">{labels.success.text}</p>
        <p className="mt-4 font-bold tabular-nums">{labels.success.reference.replace("{id}", status.id)}</p>
        {status.emailSent && <p className="mt-2 text-muted">{labels.success.emailNote}</p>}
        <button
          type="button"
          onClick={() => {
            setStatus({ type: "idle" });
            queueMicrotask(() => startedAt.current && (startedAt.current.value = String(Date.now())));
          }}
          className={buttonClasses({ variant: "outline", className: "mt-6" })}
        >
          {labels.success.again}
        </button>
      </div>
    );
  }

  const submitting = status.type === "submitting";
  const failure =
    status.type === "error"
      ? status.kind === "rate"
        ? labels.failure.rateLimited
        : phone
          ? labels.failure.withPhone.replace("{phone}", phone.label)
          : labels.failure.withoutPhone
      : null;

  return (
    <form
      ref={formRef}
      action="/api/booking"
      method="post"
      encType="multipart/form-data"
      noValidate={hydrated}
      onSubmit={onSubmit}
      onInput={onInput}
      onFocus={onFocus}
      className="space-y-10"
    >
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="startedAt" ref={startedAt} defaultValue="" />
      {/* Câmp capcană pentru roboți — ascuns vizual și pentru cititoarele de ecran. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      {prefilled && (
        <p className="rounded-md bg-mist px-4 py-3 text-sm font-semibold ring-1 ring-line">{labels.prefilled}</p>
      )}

      {errorEntries.length > 0 && (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="rounded-lg bg-brand-soft p-5 ring-1 ring-brand/25 outline-none">
          <p className="flex items-center gap-2 font-bold text-danger">
            <CircleAlert className="size-5" aria-hidden="true" />
            {labels.errors.summary.replace("{count}", String(errorEntries.length))}
          </p>
          <ul className="mt-3 space-y-1.5 pl-7 text-sm">
            {errorEntries.map(([field, key]) => (
              <li key={field}>
                <a href={`#bf-${field}`} className="font-semibold underline underline-offset-2">
                  {fieldLabels[field] ? `${fieldLabels[field]}: ${message(key)}` : message(key)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <fieldset>
        {legend(1, labels.sections.client)}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            {label("name", f.name, true)}
            <input {...a11y("name")} type="text" autoComplete="name" maxLength={80} required className={input} />
            {errorText("name")}
          </div>
          <div>
            {label("phone", f.phone, true)}
            <input {...a11y("phone", true)} type="tel" inputMode="tel" autoComplete="tel" maxLength={32} required className={input} />
            {!errors.phone && (
              <p id="bf-phone-hint" className="mt-1.5 text-sm text-muted">
                {f.phoneHint}
              </p>
            )}
            {errorText("phone")}
          </div>
          <div>
            {label("email", f.email, false)}
            <input {...a11y("email", true)} type="email" inputMode="email" autoComplete="email" maxLength={120} className={input} />
            {!errors.email && (
              <p id="bf-email-hint" className="mt-1.5 text-sm text-muted">
                {f.emailHint}
              </p>
            )}
            {errorText("email")}
          </div>
          <fieldset className="sm:col-span-2">
            <legend className="mb-2 text-sm font-bold">{f.contactMethod}</legend>
            <div className="flex flex-wrap gap-2">
              {contactMethods.map((m, i) => (
                <label key={m} className="cursor-pointer">
                  <input type="radio" name="contactMethod" value={m} defaultChecked={i === 0} className="peer sr-only" />
                  <span className="flex h-11 items-center rounded-md px-4 text-sm font-semibold ring-1 ring-line ring-inset peer-checked:bg-ink-900 peer-checked:text-white peer-checked:ring-ink-900 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand hover:ring-ink-900">
                    {f.methods[m]}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>
      </fieldset>

      <fieldset>
        {legend(2, labels.sections.car)}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            {label("carBrand", f.brand, true)}
            <input {...a11y("carBrand")} type="text" list="bf-brands" placeholder={f.brandHint} maxLength={40} autoComplete="off" required className={input} />
            <datalist id="bf-brands">
              {BRANDS.map((b) => (
                <option key={b} value={b} />
              ))}
            </datalist>
            {errorText("carBrand")}
          </div>
          <div>
            {label("carModel", f.model, true)}
            <input {...a11y("carModel")} type="text" placeholder={f.modelHint} maxLength={40} autoComplete="off" required className={input} />
            {errorText("carModel")}
          </div>
          <div>
            {label("carYear", f.year, true)}
            <select {...a11y("carYear")} defaultValue="" required className={`${input} appearance-auto`}>
              <option value="" disabled>
                {f.yearPlaceholder}
              </option>
              {Array.from({ length: yearMax - 1960 + 1 }, (_, i) => yearMax - i).map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
            {errorText("carYear")}
          </div>
          <div>
            {label("mileage", f.mileage, false)}
            <div className="relative">
              <input {...a11y("mileage")} type="text" inputMode="numeric" maxLength={9} className={`${input} pr-12`} />
              <span className="pointer-events-none absolute inset-y-0 right-3.5 flex items-center text-sm text-muted">{f.mileageHint}</span>
            </div>
            {errorText("mileage")}
          </div>
          <div className="sm:col-span-2">
            {label("plate", f.plate, false)}
            <input {...a11y("plate")} type="text" maxLength={15} autoComplete="off" autoCapitalize="characters" className={`${input} uppercase sm:max-w-xs`} />
          </div>
        </div>
      </fieldset>

      <fieldset>
        {legend(3, labels.sections.request)}
        <div className="grid grid-cols-1 gap-5">
          <div>
            {label("service", f.service, true)}
            <select {...a11y("service")} defaultValue="" required className={`${input} appearance-auto`}>
              <option value="" disabled>
                {f.servicePlaceholder}
              </option>
              <option value={SERVICE_UNKNOWN}>{f.serviceUnknown}</option>
              {services.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
              <option value={SERVICE_OTHER}>{f.serviceOther}</option>
            </select>
            {errorText("service")}
          </div>
          <div>
            {label("description", f.description, false)}
            <textarea
              {...a11y("description", true)}
              rows={5}
              maxLength={bookingLimits.maxDescription}
              onInput={(e) => setDescLength(e.currentTarget.value.length)}
              className={`${input} h-auto min-h-32 py-3 leading-relaxed`}
            />
            <div className="mt-1.5 flex justify-between gap-4 text-sm text-muted">
              <p id="bf-description-hint">{f.descriptionHint}</p>
              <span className="shrink-0 tabular-nums" aria-hidden="true">
                {descLength}/{bookingLimits.maxDescription}
              </span>
            </div>
            {errorText("description")}
          </div>
        </div>
      </fieldset>

      <fieldset>
        {legend(4, labels.sections.when)}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            {label("preferredDate", f.date, false)}
            <input {...a11y("preferredDate")} type="date" min={minDate} className={input} />
            {errorText("preferredDate")}
          </div>
          <fieldset>
            <legend className="mb-1.5 text-sm font-bold">{f.time}</legend>
            <div className="grid grid-cols-2 gap-2">
              {preferredTimes.map((t, i) => (
                <label key={t} className="cursor-pointer">
                  <input type="radio" name="preferredTime" value={t} defaultChecked={i === 0} className="peer sr-only" />
                  <span className="flex h-12 items-center justify-center rounded-md px-3 text-sm font-semibold ring-1 ring-line ring-inset peer-checked:bg-ink-900 peer-checked:text-white peer-checked:ring-ink-900 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand hover:ring-ink-900">
                    {f.times[t]}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>
      </fieldset>

      {uploadsEnabled && (
        <fieldset>
          {legend(5, labels.sections.photos)}
          <div
            className={`rounded-lg border-2 border-dashed p-5 transition-colors ${errors.photos ? "border-danger" : "border-line"} has-[input:focus-visible]:border-ink-900`}
          >
            <label htmlFor="bf-photos" className="flex cursor-pointer flex-col items-center gap-2 py-3 text-center">
              {processing ? (
                <LoaderCircle className="size-8 animate-spin text-muted" aria-hidden="true" />
              ) : (
                <ImagePlus className="size-8 text-brand" aria-hidden="true" />
              )}
              <span className="font-bold">{f.photos}</span>
              <span id="bf-photos-hint" className="text-sm text-muted">
                {f.photosHint.replace("{max}", String(bookingLimits.maxPhotos))}
              </span>
            </label>
            <input
              id="bf-photos"
              name="photos"
              type="file"
              multiple
              accept={bookingLimits.acceptedTypes.join(",")}
              aria-describedby={errors.photos ? "bf-photos-error bf-photos-hint" : "bf-photos-hint"}
              aria-invalid={errors.photos ? true : undefined}
              disabled={processing || photos.length >= bookingLimits.maxPhotos}
              onChange={(e) => {
                void onPhotos(e.currentTarget.files);
                e.currentTarget.value = "";
              }}
              className="sr-only"
            />
            {photos.length > 0 && (
              <ul className="mt-4 grid grid-cols-4 gap-3">
                {photos.map((p, i) => (
                  <li key={p.url} className="relative aspect-square overflow-hidden rounded-md bg-mist ring-1 ring-line">
                    {/* eslint-disable-next-line @next/next/no-img-element -- previzualizare locală (blob:), nu trece prin optimizare */}
                    <img src={p.url} alt="" className="size-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removePhoto(i)}
                      aria-label={f.removePhoto.replace("{n}", String(i + 1))}
                      className="absolute top-1 right-1 flex size-8 items-center justify-center rounded-md bg-ink-900/80 text-white hover:bg-ink-900"
                    >
                      <X className="size-4" aria-hidden="true" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {errorText("photos")}
        </fieldset>
      )}

      <div className="space-y-5 border-t border-line pt-8">
        <div>
          <label className="flex cursor-pointer items-start gap-3">
            <input
              id="bf-consent"
              name="consent"
              type="checkbox"
              required
              aria-invalid={errors.consent ? true : undefined}
              aria-describedby={errors.consent ? "bf-consent-error" : undefined}
              className="mt-0.5 size-5 shrink-0 accent-brand"
            />
            <span className="text-[0.9375rem] leading-relaxed">
              {f.consentBefore}
              <Link href={privacyHref} className="font-semibold text-brand underline underline-offset-2" target="_blank">
                {f.consentLink}
              </Link>
              {f.consentAfter}
              <span className="text-brand" aria-hidden="true">
                {" "}
                *
              </span>
            </span>
          </label>
          {errorText("consent")}
        </div>

        {failure && (
          <div role="alert" className="rounded-lg bg-brand-soft p-5 ring-1 ring-brand/25">
            <p className="font-bold text-danger">{labels.failure.title}</p>
            <p className="mt-1">{failure}</p>
            {phone && status.type === "error" && status.kind === "generic" && (
              <a href={phone.href} className={buttonClasses({ variant: "dark", size: "sm", className: "mt-3" })} data-track-location="booking_error">
                <Phone className="size-4" aria-hidden="true" />
                {phone.label}
              </a>
            )}
          </div>
        )}

        <p className="text-sm text-muted">{labels.notice}</p>
        <button type="submit" disabled={submitting || processing} className={buttonClasses({ size: "lg", full: true, className: "sm:w-auto" })}>
          {submitting && <LoaderCircle className="size-5 animate-spin" aria-hidden="true" />}
          {submitting ? labels.submitting : labels.submit}
        </button>
        <p className="text-sm text-muted">{labels.requiredNote}</p>
      </div>
    </form>
  );
}
