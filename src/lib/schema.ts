import { business } from "@/config/business";
import { getImage } from "@/config/forcecar-images";
import { enabledServices, type ServiceConfig } from "@/config/services";
import { siteConfig } from "@/config/site";
import type { Article, ArticleTranslation } from "@/content/articles";
import { getServiceContent } from "@/content/services";
import { localeMeta, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { articlePath, servicePath } from "@/i18n/routes";
import { mapsUrl, socialLinks } from "./business-info";
import type { FaqItem } from "./faq";
import { absoluteUrl } from "./seo";

type Node = Record<string, unknown>;

export const BUSINESS_ID = `${siteConfig.url}/#business`;
export const WEBSITE_ID = `${siteConfig.url}/#website`;

const chisinau = { "@type": "City", name: "Chișinău", sameAs: "https://en.wikipedia.org/wiki/Chi%C8%99in%C4%83u" };

/**
 * Entitatea AutoRepair. Câmpurile necunoscute (telefon, stradă, coordonate, program, logo)
 * sunt omise — nu se publică date neconfirmate în schema.org.
 */
export function businessNode(locale: Locale): Node {
  const dict = getDictionary(locale);
  const hero = getImage("fatada", locale);
  const { address } = business;
  const sameAs = [business.googleBusinessProfileUrl, ...socialLinks().map((s) => s.href)].filter(Boolean);

  return {
    "@type": "AutoRepair",
    "@id": BUSINESS_ID,
    name: business.name,
    ...(business.legalName ? { legalName: business.legalName } : {}),
    url: absoluteUrl(`/${locale}`),
    description: dict.meta.home.description,
    ...(hero ? { image: absoluteUrl(hero.src) } : {}),
    ...(business.logo ? { logo: absoluteUrl(business.logo) } : {}),
    ...(business.phone ? { telephone: business.phone } : {}),
    ...(business.email ? { email: business.email } : {}),
    ...(business.foundingYear ? { foundingDate: String(business.foundingYear) } : {}),
    address: {
      "@type": "PostalAddress",
      ...(address.streetAddress ? { streetAddress: address.streetAddress } : {}),
      addressLocality: address.locality,
      addressRegion: address.region,
      ...(address.postalCode ? { postalCode: address.postalCode } : {}),
      addressCountry: address.countryCode,
    },
    ...(business.geo
      ? { geo: { "@type": "GeoCoordinates", latitude: business.geo.lat, longitude: business.geo.lng } }
      : {}),
    ...(business.geo || address.streetAddress ? { hasMap: mapsUrl() } : {}),
    ...(business.openingHours.length
      ? {
          openingHoursSpecification: business.openingHours.map((s) => ({
            "@type": "OpeningHoursSpecification",
            dayOfWeek: s.days,
            opens: s.opens,
            closes: s.closes,
          })),
        }
      : {}),
    areaServed: chisinau,
    ...(sameAs.length ? { sameAs } : {}),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: dict.nav.services,
      itemListElement: enabledServices.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: getServiceContent(locale, s.id).name,
          serviceType: s.schemaType,
          url: absoluteUrl(servicePath(locale, s.slugs)),
        },
      })),
    },
  };
}

export function websiteNode(locale: Locale): Node {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: absoluteUrl("/"),
    name: "ForceCar",
    inLanguage: locales.map((l) => localeMeta[l].hreflang),
    publisher: { "@id": BUSINESS_ID },
    description: getDictionary(locale).meta.home.description,
  };
}

export function serviceNode(locale: Locale, service: ServiceConfig): Node {
  const content = getServiceContent(locale, service.id);
  const image = getImage(service.image, locale);
  return {
    "@type": "Service",
    "@id": `${absoluteUrl(servicePath(locale, service.slugs))}#service`,
    name: content.name,
    serviceType: service.schemaType,
    description: content.metaDescription,
    url: absoluteUrl(servicePath(locale, service.slugs)),
    ...(image ? { image: absoluteUrl(image.src) } : {}),
    provider: { "@id": BUSINESS_ID },
    areaServed: chisinau,
    inLanguage: localeMeta[locale].hreflang,
  };
}

export function breadcrumbNode(items: { name: string; path: string }[]): Node {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** Doar întrebările afișate efectiv pe pagină. */
export function faqNode(items: FaqItem[] | { q: string; a: string }[]): Node | null {
  if (!items.length) return null;
  return {
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function articleNode(locale: Locale, article: Article, t: ArticleTranslation): Node {
  const image = getImage(article.image, locale);
  const url = absoluteUrl(articlePath(locale, t.slug));
  const service = enabledServices.find((s) => s.id === article.serviceId);
  return {
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: t.title,
    description: t.description,
    url,
    mainEntityOfPage: url,
    inLanguage: localeMeta[locale].hreflang,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    ...(image ? { image: absoluteUrl(image.src) } : {}),
    author: { "@type": "Organization", name: "ForceCar", "@id": BUSINESS_ID },
    publisher: { "@id": BUSINESS_ID },
    ...(service ? { about: { "@id": `${absoluteUrl(servicePath(locale, service.slugs))}#service` } } : {}),
  };
}

export function graph(nodes: (Node | null | undefined)[]): Node {
  return { "@context": "https://schema.org", "@graph": nodes.filter(Boolean) };
}
