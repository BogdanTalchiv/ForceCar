import { business } from "@/config/business";
import { bookingLimits, isUploadsEnabled } from "@/config/site";
import { enabledServices, getService } from "@/config/services";
import { getServiceContent } from "@/content/services";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { emailLink, messengerLinks, openingHoursText, phoneLink, streetAddressLine } from "./business-info";
import { fmt, listFormat, lowerFirst } from "./format";

export interface FaqItem {
  id: string;
  q: string;
  a: string;
}

const join = (...parts: (string | null | false | undefined)[]) => parts.filter(Boolean).join(" ");

export function serviceNamesList(locale: Locale): string {
  return listFormat(
    enabledServices.map((s) => lowerFirst(getServiceContent(locale, s.id).name, locale)),
    locale,
  );
}

/**
 * Întrebările generale, construite DOAR din datele confirmate în config.
 * O întrebare al cărei răspuns nu este cunoscut (program, fără programare) este omisă.
 */
export function getGeneralFaq(locale: Locale): FaqItem[] {
  const d = getDictionary(locale).faq;
  const dict = getDictionary(locale);
  const phone = phoneLink();
  const email = emailLink();
  const messengers = messengerLinks().map((m) => dict.common.messengerNames[m.id]);
  const address = streetAddressLine();
  const hours = openingHoursText(dict);
  const items: FaqItem[] = [];

  items.push({ id: "booking", q: d.booking.q, a: join(d.booking.a, phone && fmt(d.booking.phone, { phone: phone.label })) });
  if (getService("diagnostics")) items.push({ id: "diagnostics-duration", ...d.diagnosticsDuration });
  if (business.policies.walkInsAccepted !== null) {
    items.push({ id: "walk-ins", q: d.walkIns.q, a: business.policies.walkInsAccepted ? d.walkIns.yes : d.walkIns.no });
  }
  items.push({ id: "cost", ...d.cost });
  items.push({ id: "services", q: d.services.q, a: fmt(d.services.a, { list: serviceNamesList(locale) }) });
  if (isUploadsEnabled()) {
    items.push({ id: "photos", q: d.photos.q, a: fmt(d.photos.a, { max: bookingLimits.maxPhotos }) });
  }
  items.push({ id: "location", q: d.location.q, a: join(d.location.a, address && fmt(d.location.address, { address })) });
  items.push({
    id: "contact",
    q: d.contact.q,
    a: join(
      d.contact.a,
      phone && fmt(d.contact.phone, { phone: phone.label }),
      email && fmt(d.contact.email, { email: email.label }),
      messengers.length > 0 && fmt(d.contact.messengers, { list: listFormat(messengers, locale) }),
    ),
  });
  if (hours) items.push({ id: "hours", q: d.hours.q, a: fmt(d.hours.a, { hours }) });
  return items;
}

/** Selecția scurtă de pe pagina principală. */
export function getHomeFaq(locale: Locale): FaqItem[] {
  const wanted = ["booking", "cost", "diagnostics-duration", "services", "location"];
  const all = getGeneralFaq(locale);
  return wanted.map((id) => all.find((f) => f.id === id)).filter((f): f is FaqItem => Boolean(f));
}
