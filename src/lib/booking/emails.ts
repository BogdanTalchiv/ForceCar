import { business } from "@/config/business";
import { getService, type ServiceId } from "@/config/services";
import { getServiceContent } from "@/content/services";
import { localeMeta, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Utm } from "@/lib/analytics/utm";
import { emailLink, phoneLink, streetAddressLine } from "@/lib/business-info";
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

/** CID pentru logo-ul inline (atașat de mailer). */
export const EMAIL_LOGO_CID = "forcecar-logo";

const BRAND = "#D71920";
const INK = "#111315";
const CANVAS = "#0B0C0E";
const MUTED = "#5A6068";
const LINE = "#E3E5E8";
const MIST = "#F5F6F7";
const STEEL = "#C9CDD2";

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
  <td style="padding:11px 16px 11px 0;border-bottom:1px solid ${LINE};color:${MUTED};font-size:13px;vertical-align:top;width:36%;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">${e(label)}</td>
  <td style="padding:11px 0;border-bottom:1px solid ${LINE};color:${INK};font-size:15px;vertical-align:top;white-space:pre-wrap;font-weight:600;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">${e(value!)}</td>
</tr>`,
    )
    .join("");
}

function sectionHtml(title: string, rows: Row[]): string {
  const body = rowsHtml(rows);
  if (!body) return "";
  return `<tr><td style="padding:8px 36px 20px;">
  <div style="font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:${BRAND};font-weight:800;margin:0 0 8px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">${e(title)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">${body}</table>
</td></tr>`;
}

function button(href: string, label: string, bg: string): string {
  return `<a href="${e(href)}" style="display:inline-block;background:${bg};color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;letter-spacing:.01em;padding:13px 22px;border-radius:6px;margin:0 8px 8px 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">${e(label)}</a>`;
}

function logoBlock(): string {
  return `<img src="cid:${EMAIL_LOGO_CID}" alt="ForceCar" width="200" height="70" style="display:block;margin:0 auto;border:0;height:56px;width:auto;max-width:220px;" />`;
}

function footerBlock(): string {
  const phone = phoneLink();
  const mail = emailLink();
  const address = streetAddressLine();
  const lines = [
    `<strong style="color:#ffffff;">${e(business.name)}</strong>`,
    address ? e(`${address}`) : null,
    phone ? `<a href="${e(phone.href)}" style="color:${STEEL};text-decoration:none;">${e(phone.label)}</a>` : null,
    mail ? `<a href="${e(mail.href)}" style="color:${STEEL};text-decoration:none;">${e(mail.label)}</a>` : null,
  ].filter(Boolean);
  return lines.join(`<br />`);
}

function layout({ preheader, kicker, body, lang }: { preheader: string; kicker: string; body: string; lang: string }) {
  const font = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif";
  return `<!doctype html>
<html lang="${lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="color-scheme" content="light">
  <title>ForceCar</title>
</head>
<body style="margin:0;padding:0;background:${CANVAS};font-family:${font};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:${CANVAS};">${e(preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="${CANVAS}" style="background:${CANVAS};padding:0;margin:0;">
    <tr>
      <td align="center" style="padding:28px 12px 40px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;border-collapse:collapse;">
          <tr>
            <td align="center" style="padding:12px 24px 20px;">
              ${logoBlock()}
              <div style="margin-top:14px;color:${STEEL};font-size:12px;letter-spacing:.16em;text-transform:uppercase;font-weight:700;">${e(kicker)}</div>
            </td>
          </tr>
          <tr>
            <td style="height:3px;line-height:3px;font-size:0;background:${BRAND};">&nbsp;</td>
          </tr>
          <tr>
            <td bgcolor="#ffffff" style="background:#ffffff;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                ${body}
              </table>
            </td>
          </tr>
          <tr>
            <td style="height:3px;line-height:3px;font-size:0;background:${BRAND};">&nbsp;</td>
          </tr>
          <tr>
            <td align="center" style="padding:28px 28px 8px;color:${STEEL};font-size:13px;line-height:1.7;">
              ${footerBlock()}
            </td>
          </tr>
        </table>
      </td>
    </tr>
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

  const hero = `<tr><td style="padding:32px 36px 12px;">
  <div style="font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:${MUTED};font-weight:700;">Cerere ${e(meta.id)} · ${e(submitted)}</div>
  <div style="font-size:26px;font-weight:800;color:${INK};margin:10px 0 6px;letter-spacing:-0.02em;">${e(data.name)}</div>
  <div style="font-size:16px;color:${INK};line-height:1.45;">${e(car)} · ${e(serviceRo)}</div>
  <a href="tel:${e(data.phone)}" style="display:block;font-size:30px;line-height:1.2;font-weight:800;color:${BRAND};text-decoration:none;margin:20px 0 16px;">${e(phonePretty)}</a>
  <div>
    ${button(`tel:${data.phone}`, "Sună clientul", BRAND)}
    ${button(`https://wa.me/${digits}`, "WhatsApp", INK)}
    ${button(`mailto:${data.email}`, "Email client", INK)}
  </div>
  <div style="margin-top:8px;padding:14px 16px;background:#FFF5F5;border-left:3px solid ${BRAND};font-size:14px;line-height:1.5;color:${INK};">
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
    `<tr><td style="height:16px;line-height:16px;font-size:0;">&nbsp;</td></tr>`,
  ].join("");

  const html = layout({
    lang: "ro",
    preheader: `${data.name} · ${car} · ${phonePretty}`,
    kicker: "Cerere nouă de programare",
    body,
  });

  const text = [
    `PROGRAMARE NOUĂ FORCECAR — ${meta.id}`,
    `Trimisă: ${submitted}`,
    "",
    `Nume: ${data.name}`,
    `Telefon: ${phonePretty}`,
    `Email: ${data.email}`,
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
  const workshopPhone = phoneLink();
  const workshopMail = emailLink();
  const address = streetAddressLine();

  const contactRows: Row[] = [
    [c.phone, workshopPhone ? workshopPhone.label : business.phone ? formatPhone(business.phone) : null],
    [c.email, workshopMail ? workshopMail.label : business.email],
    [c.address, address],
  ];

  const callBtn = workshopPhone ? button(workshopPhone.href, c.callUs, BRAND) : "";

  const body = [
    `<tr><td style="padding:32px 36px 8px;">
  <div style="font-size:24px;font-weight:800;color:${INK};letter-spacing:-0.02em;line-height:1.25;">${e(greeting)}</div>
  <p style="font-size:16px;line-height:1.65;color:${INK};margin:14px 0 0;">${e(c.intro)}</p>
  <div style="margin-top:18px;padding:14px 16px;background:${MIST};border-left:3px solid ${BRAND};font-size:15px;line-height:1.55;color:${INK};">${e(c.notConfirmed)}</div>
  ${callBtn ? `<div style="margin-top:20px;">${callBtn}</div>` : ""}
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
    `<tr><td style="padding:8px 36px 28px;font-size:12px;line-height:1.6;color:${MUTED};">${e(c.footer)}</td></tr>`,
  ].join("");

  const html = layout({ lang: locale, preheader: c.notConfirmed, kicker: c.kicker, body });

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
