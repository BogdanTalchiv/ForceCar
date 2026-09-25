export interface LegalSection {
  h: string;
  p?: string[];
  ul?: string[];
}

export type CookieRowKey = "locale" | "consent" | "bookingDraft" | "utm" | "ga" | "ads" | "meta" | "youtube" | "maps";

export interface LegalContent {
  updatedLabel: string;
  privacy: { intro: string; sections: LegalSection[] };
  cookies: {
    intro: string;
    sections: LegalSection[];
    tableTitle: string;
    columns: { name: string; purpose: string; duration: string; category: string };
    categories: { necessary: string; analytics: string; marketing: string; external: string };
    rows: Record<CookieRowKey, { purpose: string; duration: string }>;
    manage: LegalSection;
  };
}
