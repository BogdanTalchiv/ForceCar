export const locales = ["ro", "ru", "it", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ro";

export const localeMeta: Record<
  Locale,
  { short: string; nativeName: string; hreflang: string; ogLocale: string; dateLocale: string }
> = {
  ro: { short: "RO", nativeName: "Română", hreflang: "ro", ogLocale: "ro_RO", dateLocale: "ro-MD" },
  ru: { short: "RU", nativeName: "Русский", hreflang: "ru", ogLocale: "ru_RU", dateLocale: "ru-MD" },
  it: { short: "IT", nativeName: "Italiano", hreflang: "it", ogLocale: "it_IT", dateLocale: "it-IT" },
  en: { short: "EN", nativeName: "English", hreflang: "en", ogLocale: "en_US", dateLocale: "en-GB" },
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}

export type Localized<T = string> = Record<Locale, T>;

export const LOCALE_COOKIE = "fc_locale";
