import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getArticlesForLocale } from "@/content/articles";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pagePath } from "@/i18n/routes";
import { getHomeFaq } from "@/lib/faq";
import { faqNode } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { ContactBand } from "@/components/home/ContactBand";
import { FaqSection } from "@/components/home/FaqSection";
import { FinalCta } from "@/components/home/FinalCta";
import { Hero } from "@/components/home/Hero";
import { ProcessSection } from "@/components/home/ProcessSection";
import { ResultsSection } from "@/components/home/ResultsSection";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { TrustSection } from "@/components/home/TrustSection";
import { WorksTeaser } from "@/components/home/WorksTeaser";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/ui/Section";
import { TechSurface } from "@/components/ui/TechSurface";
import { buttonClasses } from "@/components/ui/button";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const m = getDictionary(locale).meta.home;
  return buildMetadata({ locale, ref: { type: "page", key: "home" }, title: m.title, description: m.description });
}

export default async function HomePage({ params }: Params) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const faq = getHomeFaq(locale);
  const articles = getArticlesForLocale(locale);
  const showBlog = articles.length > 0;

  return (
    <PageShell locale={locale} pageRef={{ type: "page", key: "home" }} current="home" schema={[faqNode(faq)]}>
      <Hero locale={locale} />
      <ServicesGrid locale={locale} />
      <ResultsSection locale={locale} />
      <WorksTeaser locale={locale} />
      <TrustSection locale={locale} />
      <AboutTeaser locale={locale} />
      <TestimonialsSection locale={locale} />
      <ProcessSection locale={locale} />

      {showBlog && (
        <TechSurface variant="editorial" labelledBy="home-blog-title" tone="white">
          <SectionHeader
            id="home-blog-title"
            eyebrow={dict.blog.eyebrow}
            title={dict.blog.title}
            lead={dict.blog.lead}
            action={
              <Link href={pagePath(locale, "blog")} className={buttonClasses({ variant: "outline" })}>
                {dict.blog.back}
              </Link>
            }
          />
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {articles.map((a) => (
              <li key={a.id}>
                <ArticleCard locale={locale} article={a} readLabel={dict.cta.readArticle} />
              </li>
            ))}
          </ul>
        </TechSurface>
      )}

      <FaqSection locale={locale} items={faq} tone={showBlog ? "mist" : "white"} />
      <ContactBand locale={locale} />
      <FinalCta locale={locale} />
    </PageShell>
  );
}
