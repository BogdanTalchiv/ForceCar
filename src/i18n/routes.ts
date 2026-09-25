import { locales, type Locale, type Localized } from "./config";

/** Paginile de prim nivel. `home` nu are segment. */
export type PageKey =
  | "home"
  | "services"
  | "works"
  | "about"
  | "reviews"
  | "faq"
  | "contact"
  | "booking"
  | "privacy"
  | "cookies"
  | "blog";

export type SectionKey = Exclude<PageKey, "home">;

export const sectionSegments: Record<SectionKey, Localized> = {
  services: { ro: "servicii", ru: "uslugi", it: "servizi", en: "services" },
  works: { ro: "lucrari", ru: "nashi-raboty", it: "lavori", en: "our-work" },
  about: { ro: "despre-noi", ru: "o-nas", it: "chi-siamo", en: "about" },
  reviews: { ro: "recenzii", ru: "otzyvy", it: "recensioni", en: "reviews" },
  faq: { ro: "intrebari-frecvente", ru: "voprosy-i-otvety", it: "domande-frequenti", en: "faq" },
  contact: { ro: "contact", ru: "kontakty", it: "contatti", en: "contact" },
  booking: { ro: "programare", ru: "zapis", it: "prenotazione", en: "book-appointment" },
  privacy: {
    ro: "politica-de-confidentialitate",
    ru: "politika-konfidencialnosti",
    it: "informativa-privacy",
    en: "privacy-policy",
  },
  cookies: { ro: "politica-cookie", ru: "politika-cookie", it: "cookie-policy", en: "cookie-policy" },
  blog: { ro: "sfaturi-auto", ru: "sovety", it: "consigli", en: "car-advice" },
};

/** Referință neutră (independentă de limbă) către o pagină. */
export type PageRef =
  | { type: "page"; key: PageKey }
  | { type: "service"; id: string; slugs: Localized }
  | { type: "article"; id: string; slugs: Partial<Localized> };

export function pagePath(locale: Locale, key: PageKey): string {
  if (key === "home") return `/${locale}`;
  return `/${locale}/${sectionSegments[key][locale]}`;
}

export function servicePath(locale: Locale, slugs: Localized): string {
  return `/${locale}/${sectionSegments.services[locale]}/${slugs[locale]}`;
}

export function articlePath(locale: Locale, slug: string): string {
  return `/${locale}/${sectionSegments.blog[locale]}/${slug}`;
}

export function resolveSection(locale: Locale, segment: string): SectionKey | null {
  for (const [key, segs] of Object.entries(sectionSegments) as [SectionKey, Localized][]) {
    if (segs[locale] === segment) return key;
  }
  return null;
}

/** Căile echivalente în fiecare limbă (pentru hreflang și selectorul de limbă). */
export function localizedPaths(ref: PageRef): Partial<Record<Locale, string>> {
  const out: Partial<Record<Locale, string>> = {};
  for (const locale of locales) {
    if (ref.type === "page") out[locale] = pagePath(locale, ref.key);
    else if (ref.type === "service") out[locale] = servicePath(locale, ref.slugs);
    else {
      const slug = ref.slugs[locale];
      if (slug) out[locale] = articlePath(locale, slug);
    }
  }
  return out;
}

export function pathFor(locale: Locale, ref: PageRef): string {
  return localizedPaths(ref)[locale] ?? pagePath(locale, ref.type === "article" ? "blog" : "home");
}
