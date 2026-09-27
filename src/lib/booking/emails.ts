import { business } from "@/config/business";
import { siteConfig } from "@/config/site";
import { getService, type ServiceId } from "@/config/services";
import { getServiceContent } from "@/content/services";
import { localeMeta, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Utm } from "@/lib/analytics/utm";
import { formatPhone } from "@/lib/format";
import { escapeHtml, singleLine } from "@/lib/security";
import { customerEmailCopy } from "./customer-copy";
import { SERVICE_OTHER, SERVICE_UNKNOWN, type BookingData } from "./validation";

export interface BookingMeta {
  id: string;
  locale: Locale;
  page: string | null;
  utm: Utm;
  submittedAt: Date;
  photoCount: number;
}

export interface EmailContent {
  subject: string;
  html: string;
  text: string;
}

const BRAND = "#D71920";
const INK = "#111315";
const MUTED = "#5A6068";
const LINE = "#E3E5E8";

const e = escapeHtml;

export function serviceLabel(service: string, locale: Locale): string {
  const fields = getDictionary(locale).booking.fields;
  if (service === SERVICE_UNKNOWN) return fields.serviceUnknown;
  if (service === SERVICE_OTHER) return fields.serviceOther;
  return getService(service) ? getServiceContent(locale, service as ServiceId).name : service;
}

function formatDate(iso: string | null, locale: Locale): string | null {
  if (!iso) return null;
  const d = new Date(`${iso}T12:00:00Z`);
  return new Intl.DateTimeFormat(localeMeta[locale].dateLocale, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(d);
}

function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("ro-MD", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Europe/Chisinau",
  }).format(date);
}

type Row = [label: string, value: string | null | undefined];

function rowsHtml(rows: Row[]): string {
  return rows
    .filter(([, v]) => v)
    .map(
      ([label, value]) => `<tr>
  <td style="padding:10px 12px 10px 0;border-bottom:1px solid ${LINE};color:${MUTED};font-size:13px;vertical-align:top;width:38%;">${e(label)}</td>
  <td style="padding:10px 0;border-bottom:1px solid ${LINE};color:${INK};font-size:15px;vertical-align:top;white-space:pre-wrap;">${e(value!)}</td>
</tr>`,
    )
    .join("");
}

function sectionHtml(title: string, rows: Row[]): string {
  const body = rowsHtml(rows);
  if (!body) return "";
  return `<tr><td style="padding:24px 32px 0;">
  <div style="font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:${BRAND};font-weight:700;margin-bottom:4px;">${e(title)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">${body}</table>
</td></tr>`;
}

function button(href: string, label: string, bg: string): string {
  return `<a href="${e(href)}" style="display:inline-block;background:${bg};color:#ffffff;text-decoration:none;font-weight:700;font-size:15px;padding:12px 20px;border-radius:6px;margin:0 8px 8px 0;">${e(label)}</a>`;
}

function layout({ preheader, header, body, lang }: { preheader: string; header: string; body: string; lang: string }) {
  return `<!doctype html>
<html lang="${lang}">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>ForceCar</title></head>
<body style="margin:0;padding:0;background:#F5F6F7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${e(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F5F6F7;padding:24px 12px;">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid ${LINE};">
<tr><td style="background:${INK};padding:20px 32px;border-bottom:4px solid ${BRAND};">
  ${
    business.logo
      ? `<img src="${e(`${siteConfig.url}${business.logo}`)}" alt="ForceCar" height="44" style="height:44px;width:auto;display:block;border:0;" />`
      : `<span style="color:#ffffff;font-size:20px;font-weight:800;letter-spacing:.02em;">FORCE<span style="color:${BRAND};">CAR</span></span>`
  }
  <div style="color:#C9CDD2;font-size:13px;margin-top:4px;">${e(header)}</div>
</td></tr>
${body}
<tr><td style="padding:28px 32px 32px;"></td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

/** Emailul intern către ForceCar — în română, optimizat pentru a suna rapid clientul de pe telefon. */
export function buildInternalEmail(data: BookingData, meta: BookingMeta): EmailContent {
  const dict = getDictionary("ro");
  const f = dict.booking.fields;
  const car = `${data.carBrand} ${data.carModel}`;
  const phonePretty = formatPhone(data.phone);
  const digits = data.phone.replace(/\D/g, "");
  const serviceRo = serviceLabel(data.service, "ro");
  const date = formatDate(data.preferredDate, "ro");
  const time = f.times[data.preferredTime];
  const submitted = formatDateTime(meta.submittedAt);
  const utmEntries = Object.entries(meta.utm).filter(([, v]) => v);

  const subject = singleLine(`Programare nouă ForceCar — ${data.name} — ${car}`, 180);

  const hero = `<tr><td style="padding:28px 32px 8px;">
  <div style="font-size:13px;color:${MUTED};">Cerere ${e(meta.id)} · ${e(submitted)}</div>
  <div style="font-size:22px;font-weight:800;color:${INK};margin:6px 0 2px;">${e(data.name)}</div>
  <div style="font-size:15px;color:${INK};">${e(car)} · ${e(serviceRo)}</div>
  <a href="tel:${e(data.phone)}" style="display:block;font-size:32px;line-height:1.2;font-weight:800;color:${BRAND};text-decoration:none;margin:18px 0 14px;">${e(phonePretty)}</a>
  <div>
    ${button(`tel:${data.phone}`, "Sună clientul", BRAND)}
    ${button(`https://wa.me/${digits}`, "WhatsApp", INK)}
    ${data.email ? button(`mailto:${data.email}`, "Email", INK) : ""}
  </div>
  <div style="margin-top:12px;padding:12px 14px;background:#FFF5F5;border-left:3px solid ${BRAND};font-size:14px;color:${INK};">
    Contact preferat: <strong>${e(f.methods[data.contactMethod])}</strong>. Clientul așteaptă confirmarea programării.
  </div>
</td></tr>`;

  const body = [
    hero,
    sectionHtml("Client", [
      [f.name, data.name],
      [f.phone, phonePretty],
      [f.email, data.email],
      [f.contactMethod, f.methods[data.contactMethod]],
    ]),
    sectionHtml("Mașina", [
      [f.brand, data.carBrand],
      [f.model, data.carModel],
      [f.year, String(data.carYear)],
      [f.mileage, data.mileage !== null ? `${data.mileage.toLocaleString("ro-MD")} km` : null],
      [f.plate, data.plate],
    ]),
    sectionHtml("Cerere", [
      [f.service, serviceRo],
      [f.description, data.description || "—"],
      [f.date, date],
      [f.time, time],
      ["Fotografii", meta.photoCount > 0 ? `${meta.photoCount} atașate la acest email` : null],
    ]),
    sectionHtml("Sursa cererii", [
      ["Limba site-ului", localeMeta[meta.locale].nativeName],
      ["Pagina", meta.page],
      ...utmEntries.map(([k, v]) => [k, v] as Row),
    ]),
  ].join("");

  const html = layout({
    lang: "ro",
    preheader: `${data.name} · ${car} · ${phonePretty}`,
    header: "Cerere nouă de programare de pe site",
    body,
  });

  const text = [
    `PROGRAMARE NOUĂ FORCECAR — ${meta.id}`,
    `Trimisă: ${submitted}`,
    "",
    `Nume: ${data.name}`,
    `Telefon: ${phonePretty}`,
    data.email ? `Email: ${data.email}` : null,
    `Contact preferat: ${f.methods[data.contactMethod]}`,
    "",
    `Mașina: ${car}, ${data.carYear}`,
    data.mileage !== null ? `Kilometraj: ${data.mileage} km` : null,
    data.plate ? `Număr: ${data.plate}` : null,
    "",
    `Serviciu: ${serviceRo}`,
    `Descriere: ${data.description || "—"}`,
    date ? `Data preferată: ${date}` : null,
    `Interval: ${time}`,
    meta.photoCount > 0 ? `Fotografii: ${meta.photoCount} atașate` : null,
    "",
    `Limba: ${localeMeta[meta.locale].nativeName}`,
    meta.page ? `Pagina: ${meta.page}` : null,
    ...utmEntries.map(([k, v]) => `${k}: ${v}`),
    "",
    "Clientul așteaptă confirmarea programării.",
  ]
    .filter((l) => l !== null)
    .join("\n");

  return { subject, html, text };
}

/** Confirmarea de primire pentru client — fără date interne (sursă, UTM, note). */
export function buildCustomerEmail(data: BookingData, meta: BookingMeta): EmailContent {
  const locale = meta.locale;
  const c = customerEmailCopy[locale];
  const f = getDictionary(locale).booking.fields;
  const car = `${data.carBrand} ${data.carModel}`;
  const date = formatDate(data.preferredDate, locale);
  const time = f.times[data.preferredTime];
  const greeting = c.greeting.replace("{name}", data.name.split(" ")[0]);

  const contactRows: Row[] = [
    [c.phone, business.phone ? formatPhone(business.phone) : null],
    [c.email, business.email],
  ];

  const body = [
    `<tr><td style="padding:28px 32px 0;">
  <div style="font-size:20px;font-weight:800;color:${INK};">${e(greeting)}</div>
  <p style="font-size:15px;line-height:1.6;color:${INK};margin:12px 0 0;">${e(c.intro)}</p>
  <div style="margin-top:16px;padding:12px 14px;background:#F5F6F7;border-left:3px solid ${BRAND};font-size:15px;line-height:1.5;color:${INK};">${e(c.notConfirmed)}</div>
</td></tr>`,
    sectionHtml(c.summaryTitle, [
      [c.reference, meta.id],
      [c.car, `${car}, ${data.carYear}`],
      [c.service, serviceLabel(data.service, locale)],
      [c.date, date],
      [c.time, time],
      [c.photos, meta.photoCount > 0 ? String(meta.photoCount) : null],
    ]),
    sectionHtml(c.contactTitle, contactRows),
    `<tr><td style="padding:24px 32px 0;font-size:12px;line-height:1.5;color:${MUTED};">${e(c.footer)}</td></tr>`,
  ].join("");

  const html = layout({ lang: locale, preheader: c.notConfirmed, header: c.subject.split(" — ")[0], body });

  const text = [
    greeting,
    "",
    c.intro,
    c.notConfirmed,
    "",
    `${c.reference}: ${meta.id}`,
    `${c.car}: ${car}, ${data.carYear}`,
    `${c.service}: ${serviceLabel(data.service, locale)}`,
    date ? `${c.date}: ${date}` : null,
    `${c.time}: ${time}`,
    ...contactRows.filter(([, v]) => v).map(([l, v]) => `${l}: ${v}`),
    "",
    c.footer,
  ]
    .filter((l) => l !== null)
    .join("\n");

  return { subject: c.subject, html, text };
}
