import type { Locale } from "@/i18n/config";
import type { ServiceId } from "@/config/services";
import type { ImageKey } from "@/config/forcecar-images";

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export interface ArticleTranslation {
  slug: string;
  title: string;
  description: string;
  body: ArticleBlock[];
}

export interface Article {
  id: string;
  datePublished: string;
  dateModified: string;
  /** Serviciul spre care trimite articolul (link intern + CTA). */
  serviceId: ServiceId;
  image: ImageKey;
  /** Un articol poate exista doar în unele limbi — hreflang se generează doar pentru acestea. */
  translations: Partial<Record<Locale, ArticleTranslation>>;
}
