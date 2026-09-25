import type { MetadataRoute } from "next";
import { enabledServices } from "@/config/services";
import { siteConfig } from "@/config/site";
import { articles } from "@/content/articles";
import { locales } from "@/i18n/config";
import { sectionSegments, type PageRef, type SectionKey } from "@/i18n/routes";
import { hasReviews } from "@/lib/navigation";
import { absoluteUrl, alternatesFor } from "@/lib/seo";

const priorities: Partial<Record<SectionKey | "home", number>> = {
  home: 1,
  services: 0.9,
  booking: 0.8,
  contact: 0.8,
  about: 0.6,
  works: 0.6,
  faq: 0.6,
  blog: 0.5,
  reviews: 0.6,
  privacy: 0.2,
  cookies: 0.2,
};

/** Toate paginile indexabile, în toate limbile, cu alternativele hreflang. */
export default function sitemap(): MetadataRoute.Sitemap {
  if (siteConfig.noindex) return [];
  const entries: MetadataRoute.Sitemap = [];

  const add = (ref: PageRef, priority: number, lastModified: string) => {
    const { languages, paths } = alternatesFor(ref);
    const absLanguages = Object.fromEntries(Object.entries(languages).map(([k, v]) => [k, absoluteUrl(v)]));
    for (const locale of locales) {
      const path = paths[locale];
      if (!path) continue;
      entries.push({
        url: absoluteUrl(path),
        lastModified,
        changeFrequency: "monthly",
        priority,
        alternates: { languages: absLanguages },
      });
    }
  };

  add({ type: "page", key: "home" }, priorities.home!, siteConfig.contentUpdatedAt);
  for (const key of Object.keys(sectionSegments) as SectionKey[]) {
    if (key === "reviews" && !hasReviews) continue;
    add({ type: "page", key }, priorities[key] ?? 0.5, siteConfig.contentUpdatedAt);
  }
  for (const s of enabledServices) add({ type: "service", id: s.id, slugs: s.slugs }, 0.9, siteConfig.contentUpdatedAt);
  for (const a of articles) {
    const slugs = Object.fromEntries(Object.entries(a.translations).map(([l, t]) => [l, t!.slug]));
    add({ type: "article", id: a.id, slugs }, 0.5, a.dateModified);
  }
  return entries;
}
