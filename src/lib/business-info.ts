import { business, type DayOfWeek } from "@/config/business";
import type { Dictionary } from "@/i18n/dictionaries/ro";
import { formatPhone, telHref } from "./format";

export type MessengerId = "whatsapp" | "viber" | "telegram";

const digitsOnly = (value: string) => value.replace(/\D/g, "");

export const hasPhone = Boolean(business.phone);

export function phoneLink(): { href: string; label: string } | null {
  return business.phone ? { href: telHref(business.phone), label: formatPhone(business.phone) } : null;
}

export function emailLink(): { href: string; label: string } | null {
  return business.email ? { href: `mailto:${business.email}`, label: business.email } : null;
}

/** Link-urile de mesagerie configurate, în ordinea de afișare. */
export function messengerLinks(): { id: MessengerId; href: string }[] {
  const out: { id: MessengerId; href: string }[] = [];
  if (business.whatsapp) out.push({ id: "whatsapp", href: `https://wa.me/${digitsOnly(business.whatsapp)}` });
  if (business.viber) out.push({ id: "viber", href: `viber://chat?number=%2B${digitsOnly(business.viber)}` });
  if (business.telegram) out.push({ id: "telegram", href: `https://t.me/${business.telegram.replace(/^@/, "")}` });
  return out;
}

/** Adresa stradală completă sau `null` dacă nu este configurată. */
export function streetAddressLine(): string | null {
  const { streetAddress, postalCode, locality } = business.address;
  if (!streetAddress) return null;
  return [streetAddress, [postalCode, locality].filter(Boolean).join(" ")].join(", ");
}

/** Interogarea Google Maps: adresa confirmată, altfel coordonatele. */
function mapsQuery(): string | null {
  const line = streetAddressLine();
  if (line) return `ForceCar, ${line}`;
  if (business.geo) return `${business.geo.lat},${business.geo.lng}`;
  return null;
}

export function mapsUrl(): string | null {
  if (business.googleMapsUrl) return business.googleMapsUrl;
  const q = mapsQuery();
  return q ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}` : null;
}

/** Harta se încarcă doar la cerere și doar dacă locația exactă este cunoscută. */
export function mapsEmbedUrl(): string | null {
  const q = mapsQuery();
  return q ? `https://www.google.com/maps?q=${encodeURIComponent(q)}&z=16&output=embed` : null;
}

const dayOrder: DayOfWeek[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

/** Rânduri de program, cu zilele consecutive grupate: „Luni – Vineri: 09:00–18:00”. */
export function openingHoursRows(dict: Dictionary): { days: string; hours: string }[] {
  return business.openingHours.map((spec) => {
    const sorted = [...spec.days].sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b));
    const consecutive = sorted.every((d, i) => i === 0 || dayOrder.indexOf(d) === dayOrder.indexOf(sorted[i - 1]) + 1);
    const days =
      sorted.length > 2 && consecutive
        ? `${dict.common.days[sorted[0]]} – ${dict.common.days[sorted[sorted.length - 1]]}`
        : sorted.map((d) => dict.common.days[d]).join(", ");
    return { days, hours: `${spec.opens}–${spec.closes}` };
  });
}

export function openingHoursText(dict: Dictionary): string | null {
  const rows = openingHoursRows(dict);
  return rows.length ? rows.map((r) => `${r.days}: ${r.hours}`).join("; ") : null;
}

export function socialLinks(): { id: keyof typeof business.socials; href: string }[] {
  return (Object.entries(business.socials) as [keyof typeof business.socials, string | null][])
    .filter((entry): entry is [keyof typeof business.socials, string] => Boolean(entry[1]))
    .map(([id, href]) => ({ id, href }));
}
