import { reviews, videoReviews } from "@/config/reviews";
import { enabledServices, type ServiceIcon } from "@/config/services";
import { getServiceContent } from "@/content/services";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pagePath, servicePath, type PageKey } from "@/i18n/routes";

/** Pagina de recenzii există doar când sunt recenzii reale în config. */
export const hasReviews = reviews.length + videoReviews.length > 0;

export interface NavItem {
  key: PageKey;
  label: string;
  href: string;
}

export interface ServiceLink {
  id: string;
  label: string;
  href: string;
  icon: ServiceIcon;
  group: "mechanical" | "body";
}

export function mainNav(locale: Locale): NavItem[] {
  const nav = getDictionary(locale).nav;
  const items: NavItem[] = [
    { key: "services", label: nav.services, href: pagePath(locale, "services") },
    { key: "works", label: nav.works, href: pagePath(locale, "works") },
    { key: "about", label: nav.about, href: pagePath(locale, "about") },
  ];
  if (hasReviews) items.push({ key: "reviews", label: nav.reviews, href: pagePath(locale, "reviews") });
  items.push(
    { key: "faq", label: nav.faqShort, href: pagePath(locale, "faq") },
    { key: "contact", label: nav.contact, href: pagePath(locale, "contact") },
  );
  return items;
}

export function serviceLinks(locale: Locale): ServiceLink[] {
  return enabledServices.map((s) => ({
    id: s.id,
    label: getServiceContent(locale, s.id).name,
    href: servicePath(locale, s.slugs),
    icon: s.icon,
    group: s.group,
  }));
}
