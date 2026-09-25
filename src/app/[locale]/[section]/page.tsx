import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { resolveSection, sectionSegments, type SectionKey } from "@/i18n/routes";
import { hasReviews } from "@/lib/navigation";
import { sectionMetadata } from "@/lib/page-meta";
import { AboutPage } from "@/components/pages/AboutPage";
import { BlogIndexPage } from "@/components/pages/BlogIndexPage";
import { BookingPage } from "@/components/pages/BookingPage";
import { ContactPage } from "@/components/pages/ContactPage";
import { FaqPage } from "@/components/pages/FaqPage";
import { LegalPage } from "@/components/pages/LegalPage";
import { ReviewsPage } from "@/components/pages/ReviewsPage";
import { ServicesPage } from "@/components/pages/ServicesPage";
import { WorksPage } from "@/components/pages/WorksPage";

type Params = { params: Promise<{ locale: string; section: string }> };

export const dynamicParams = false;

/** Secțiunile existente. Recenziile sunt generate doar când există recenzii reale. */
function availableSections(): SectionKey[] {
  return (Object.keys(sectionSegments) as SectionKey[]).filter((k) => k !== "reviews" || hasReviews);
}

export function generateStaticParams() {
  return locales.flatMap((locale) => availableSections().map((key) => ({ locale, section: sectionSegments[key][locale] })));
}

function resolve(locale: string, section: string): { locale: Locale; key: SectionKey } | null {
  if (!isLocale(locale)) return null;
  const key = resolveSection(locale, section);
  if (!key || !availableSections().includes(key)) return null;
  return { locale, key };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, section } = await params;
  const r = resolve(locale, section);
  return r ? sectionMetadata(r.locale, r.key) : {};
}

export default async function SectionPage({ params }: Params) {
  const { locale: rawLocale, section } = await params;
  const r = resolve(rawLocale, section);
  if (!r) notFound();
  const { locale, key } = r;

  switch (key) {
    case "services":
      return <ServicesPage locale={locale} />;
    case "works":
      return <WorksPage locale={locale} />;
    case "about":
      return <AboutPage locale={locale} />;
    case "reviews":
      return <ReviewsPage locale={locale} />;
    case "faq":
      return <FaqPage locale={locale} />;
    case "contact":
      return <ContactPage locale={locale} />;
    case "booking":
      return <BookingPage locale={locale} />;
    case "privacy":
    case "cookies":
      return <LegalPage locale={locale} kind={key} />;
    case "blog":
      return <BlogIndexPage locale={locale} />;
  }
}
