import type { Locale } from "@/i18n/config";
import { isServiceId } from "@/config/services";
import type { Article, ArticleTranslation } from "./types";
import timingBelt from "./timing-belt";
import brakePads from "./brake-pads";
import checkEngine from "./check-engine";

/** Ordinea = ordinea de afișare. Articolele despre servicii dezactivate sunt ascunse automat. */
const all: Article[] = [timingBelt, brakePads, checkEngine];

export const articles = all.filter((a) => isServiceId(a.serviceId));

export function getArticlesForLocale(locale: Locale): (Article & { t: ArticleTranslation })[] {
  return articles.flatMap((a) => (a.translations[locale] ? [{ ...a, t: a.translations[locale]! }] : []));
}

export function getArticleBySlug(locale: Locale, slug: string) {
  return getArticlesForLocale(locale).find((a) => a.t.slug === slug);
}

export function getArticlesForService(locale: Locale, serviceId: string) {
  return getArticlesForLocale(locale).filter((a) => a.serviceId === serviceId);
}

export type { Article, ArticleTranslation };
