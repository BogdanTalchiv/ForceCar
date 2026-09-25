import type { Metadata } from "next";
import { getOgImage, type ImageKey } from "@/config/forcecar-images";
import { siteConfig } from "@/config/site";
import { localeMeta, locales, type Locale } from "@/i18n/config";
import { localizedPaths, type PageRef } from "@/i18n/routes";

export function absoluteUrl(path: string): string {
  return path === "/" ? siteConfig.url : `${siteConfig.url}${path}`;
}

/** Hreflang pentru toate versiunile existente ale paginii + x-default. */
export function alternatesFor(ref: PageRef): { languages: Record<string, string>; paths: Partial<Record<Locale, string>> } {
  const paths = localizedPaths(ref);
  const languages: Record<string, string> = {};
  for (const l of locales) {
    const p = paths[l];
    if (p) languages[localeMeta[l].hreflang] = p;
  }
  const isHome = ref.type === "page" && ref.key === "home";
  const fallback = paths.ro ?? Object.values(paths)[0];
  if (fallback) languages["x-default"] = isHome ? "/" : fallback;
  return { languages, paths };
}

interface BuildMetadataInput {
  locale: Locale;
  ref: PageRef;
  title: string;
  description: string;
  image?: ImageKey;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
}

export function buildMetadata({
  locale,
  ref,
  title,
  description,
  image = "hero",
  type = "website",
  publishedTime,
  modifiedTime,
  noindex,
}: BuildMetadataInput): Metadata {
  const { languages, paths } = alternatesFor(ref);
  const canonical = paths[locale] ?? `/${locale}`;
  const fullTitle = title.includes("ForceCar") ? title : `${title} | ForceCar`;
  const og = getOgImage(image);
  const otherLocales = locales.filter((l) => l !== locale && paths[l]).map((l) => localeMeta[l].ogLocale);

  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical, languages },
    openGraph: {
      type,
      title: fullTitle,
      description,
      url: canonical,
      siteName: "ForceCar",
      locale: localeMeta[locale].ogLocale,
      alternateLocale: otherLocales,
      ...(og ? { images: [{ url: og.url, width: og.width, height: og.height, alt: fullTitle }] } : {}),
      ...(type === "article" && publishedTime ? { publishedTime, modifiedTime: modifiedTime ?? publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      ...(og ? { images: [og.url] } : {}),
    },
    ...(noindex || siteConfig.noindex ? { robots: { index: false, follow: !siteConfig.noindex } } : {}),
  };
}
