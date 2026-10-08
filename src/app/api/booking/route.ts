import { NextResponse } from "next/server";
import { enabledServices } from "@/config/services";
import { bookingLimits, isUploadsEnabled } from "@/config/site";
import { isLocale, type Locale } from "@/i18n/config";
import { pagePath } from "@/i18n/routes";
import { sanitizeUtmValue, UTM_KEYS, type Utm } from "@/lib/analytics/utm";
import { buildCustomerEmail, buildInternalEmail, type BookingMeta } from "@/lib/booking/emails";
import { getBookingRecipients, getMailerMode, sendMail, type MailAttachment } from "@/lib/booking/mailer";
import {
  createBookingId,
  detectImageType,
  todayInChisinau,
  validateBooking,
  validatePhotos,
  type BookingErrors,
  type RawBooking,
} from "@/lib/booking/validation";
import { createRateLimiter } from "@/lib/rate-limit";
import { getClientIp, isSameOrigin } from "@/lib/security";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const limiter = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 });
const MIN_FILL_MS = 2500;
const extFor = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" } as const;

type Outcome =
  | { ok: true; id: string; customerEmailSent: boolean }
  | { ok: false; error: "validation" | "rate_limited" | "server" | "forbidden" | "too_large"; fields?: BookingErrors };

function respond(req: Request, locale: Locale, status: number, body: Outcome, headers: Record<string, string> = {}) {
  const wantsJson = (req.headers.get("accept") ?? "").includes("application/json");
  if (wantsJson) return NextResponse.json(body, { status, headers });
  // Formular trimis fără JavaScript: înapoi pe pagina de programare, rezultatul este afișat prin :target.
  const target = new URL(`${pagePath(locale, "booking")}${body.ok ? "?sent=1#booking-success" : "#booking-error"}`, req.url);
  return NextResponse.redirect(target, { status: 303, headers });
}

const str = (v: FormDataEntryValue | null) => (typeof v === "string" ? v : "");

export async function POST(req: Request) {
  let locale: Locale = "ro";

  if (!isSameOrigin(req.headers)) return respond(req, locale, 403, { ok: false, error: "forbidden" });

  const length = Number(req.headers.get("content-length") ?? 0);
  if (length > bookingLimits.maxTotalBytes + 1024 * 1024) return respond(req, locale, 413, { ok: false, error: "too_large" });

  const rl = limiter.check(getClientIp(req.headers));
  if (!rl.ok) {
    return respond(req, locale, 429, { ok: false, error: "rate_limited" }, { "Retry-After": String(rl.retryAfterSeconds) });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return respond(req, locale, 400, { ok: false, error: "validation" });
  }

  const rawLocale = str(form.get("locale"));
  if (isLocale(rawLocale)) locale = rawLocale;

  const id = createBookingId();

  // Protecție anti-spam: câmp capcană completat sau formular completat nerealist de repede → răspuns „reușit” fals.
  const startedAt = Number(str(form.get("startedAt")));
  if (str(form.get("website")).trim() || (startedAt > 0 && Date.now() - startedAt < MIN_FILL_MS)) {
    return respond(req, locale, 200, { ok: true, id, customerEmailSent: false });
  }

  const raw: RawBooking = {
    name: str(form.get("name")),
    phone: str(form.get("phone")),
    email: str(form.get("email")),
    contactMethod: str(form.get("contactMethod")),
    carBrand: str(form.get("carBrand")),
    carModel: str(form.get("carModel")),
    carYear: str(form.get("carYear")),
    mileage: str(form.get("mileage")),
    plate: str(form.get("plate")),
    service: str(form.get("service")),
    description: str(form.get("description")),
    preferredDate: str(form.get("preferredDate")),
    preferredTime: str(form.get("preferredTime")),
    consent: str(form.get("consent")),
  };
  const result = validateBooking(raw, { serviceIds: enabledServices.map((s) => s.id), today: todayInChisinau() });
  const errors: BookingErrors = result.ok ? {} : { ...result.errors };

  const files = isUploadsEnabled()
    ? form.getAll("photos").filter((f): f is File => typeof f === "object" && f !== null && "arrayBuffer" in f && f.size > 0)
    : [];
  const photoError = validatePhotos(files.map((f) => ({ name: f.name, type: f.type, size: f.size })));
  if (photoError) errors.photos = photoError;

  const attachments: MailAttachment[] = [];
  if (!errors.photos) {
    for (const [i, file] of files.entries()) {
      const content = Buffer.from(await file.arrayBuffer());
      const type = detectImageType(content);
      if (!type) {
        errors.photos = "photoType";
        break;
      }
      // Nume de fișier generat de server — numele trimis de client nu este folosit.
      attachments.push({ filename: `forcecar-${id}-${i + 1}.${extFor[type]}`, content, contentType: type });
    }
  }

  if (!result.ok || Object.keys(errors).length > 0) {
    return respond(req, locale, 400, { ok: false, error: "validation", fields: errors });
  }

  const data = result.data;
  const page = str(form.get("page"));
  const utm: Utm = {};
  for (const k of UTM_KEYS) {
    const v = sanitizeUtmValue(str(form.get(k)));
    if (v) utm[k] = v;
  }
  const meta: BookingMeta = {
    id,
    locale,
    page: /^\/[\w\-/%.]{0,200}$/.test(page) ? page : null,
    utm,
    submittedAt: new Date(),
    photoCount: attachments.length,
  };

  const recipients = getBookingRecipients();
  const mode = getMailerMode();
  if (mode === "none" || (mode !== "outbox" && recipients.length === 0)) {
    console.error("[booking] Emailul nu este configurat (BOOKING_TO_EMAIL / SMTP).");
    return respond(req, locale, 503, { ok: false, error: "server" });
  }

  const internal = buildInternalEmail(data, meta);
  try {
    await sendMail({
      to: recipients.length ? recipients : ["forcecar-dev@localhost"],
      subject: internal.subject,
      html: internal.html,
      text: internal.text,
      replyTo: data.email,
      attachments,
    });
  } catch (err) {
    console.error(`[booking] Trimiterea ${id} a eșuat:`, err instanceof Error ? err.message : "unknown error");
    return respond(req, locale, 502, { ok: false, error: "server" });
  }

  let customerEmailSent = false;
  const customer = buildCustomerEmail(data, meta);
  try {
    await new Promise((resolve) => setTimeout(resolve, 400));
    await sendMail({
      to: data.email,
      subject: customer.subject,
      html: customer.html,
      text: customer.text,
      replyTo: data.email,
    });
    customerEmailSent = true;
  } catch (err) {
    console.warn(`[booking] Confirmarea către client pentru ${id} nu a putut fi trimisă:`, err instanceof Error ? err.message : "unknown");
  }

  return respond(req, locale, 200, { ok: true, id, customerEmailSent });
}
