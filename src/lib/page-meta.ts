import type { Metadata } from "next";
import type { ImageKey } from "@/config/forcecar-images";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pagePath, type SectionKey } from "@/i18n/routes";
import type { Crumb } from "@/components/layout/Breadcrumbs";
import { breadcrumbNode } from "./schema";
import { buildMetadata } from "./seo";

const ogImage: Partial<Record<SectionKey, ImageKey>> = {
  services: "motor",
  works: "caroserie",
  about: "fatada",
  blog: "motor",
};

export function sectionMetadata(locale: Locale, key: SectionKey): Metadata {
  const m = getDictionary(locale).meta[key];
  return buildMetadata({ locale, ref: { type: "page", key }, title: m.title, description: m.description, image: ogImage[key] });
}

/** Traseul Acasă → secțiune → (pagină), folosit atât vizual cât și în JSON-LD. */
export function crumbsFor(locale: Locale, section?: SectionKey, leaf?: Crumb): { items: Crumb[]; schema: Record<string, unknown> } {
  const dict = getDictionary(locale);
  const items: Crumb[] = [{ name: dict.breadcrumbs.home, href: pagePath(locale, "home") }];
  if (section) {
    const labels: Record<SectionKey, string> = {
      services: dict.nav.services,
      works: dict.nav.works,
      about: dict.nav.about,
      reviews: dict.nav.reviews,
      faq: dict.nav.faq,
      contact: dict.nav.contact,
      booking: dict.nav.booking,
      privacy: dict.meta.privacy.title,
      cookies: dict.meta.cookies.title,
      blog: dict.nav.blog,
    };
    items.push({ name: labels[section], href: pagePath(locale, section) });
  }
  if (leaf) items.push(leaf);
  return { items, schema: breadcrumbNode(items.map((c) => ({ name: c.name, path: c.href }))) };
}
