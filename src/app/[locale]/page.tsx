import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { reviews } from "@/config/reviews";
import { getArticlesForLocale } from "@/content/articles";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pagePath } from "@/i18n/routes";
import { getHomeFaq } from "@/lib/faq";
import { hasReviews } from "@/lib/navigation";
import { faqNode } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { FaqSection } from "@/components/home/FaqSection";
import { FinalCta } from "@/components/home/FinalCta";
import { Hero } from "@/components/home/Hero";
import { ProcessSection } from "@/components/home/ProcessSection";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { TrustSection } from "@/components/home/TrustSection";
import { WorksTeaser } from "@/components/home/WorksTeaser";
import { PageShell } from "@/components/layout/PageShell";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { Section, SectionHeader } from "@/components/ui/Section";
import Link from "next/link";
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
  const showReviews = hasReviews && reviews.length > 0;
  const showBlog = articles.length > 0;
  // Secțiunile de după galerie (fundal gri) alternează alb/gri, indiferent care dintre ele sunt afișate.
  const flip = (n: number): "white" | "mist" => (n % 2 === 1 ? "white" : "mist");
  const blogTone = flip(showReviews ? 2 : 1);
  const faqTone = flip(1 + Number(showReviews) + Number(showBlog));

  return (
    <PageShell locale={locale} pageRef={{ type: "page", key: "home" }} current="home" schema={[faqNode(faq)]}>
      <Hero locale={locale} />
      <TrustSection locale={locale} />
      <ServicesGrid locale={locale} />
      <ProcessSection locale={locale} />
      <AboutTeaser locale={locale} />
      <WorksTeaser locale={locale} />

      {showReviews && (
        <Section labelledBy="home-reviews-title">
          <SectionHeader
            id="home-reviews-title"
            eyebrow={dict.home.reviews.eyebrow}
            title={dict.home.reviews.title}
            action={
              <Link href={pagePath(locale, "reviews")} className={buttonClasses({ variant: "outline" })}>
                {dict.nav.reviews}
              </Link>
            }
          />
          <ul className="grid gap-4 md:grid-cols-3">
            {reviews.slice(0, 3).map((r) => (
              <li key={r.id}>
                <ReviewCard
                  review={r}
                  locale={locale}
                  labels={{ ratingLabel: dict.reviews.ratingLabel, sources: dict.reviews.sources, viewSource: dict.reviews.viewSource, newTab: dict.a11y.newTab }}
                />
              </li>
            ))}
          </ul>
        </Section>
      )}

      {showBlog && (
        <Section tone={blogTone} labelledBy="home-blog-title">
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
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((a) => (
              <li key={a.id}>
                <ArticleCard locale={locale} article={a} readLabel={dict.cta.readArticle} />
              </li>
            ))}
          </ul>
        </Section>
      )}

      <FaqSection locale={locale} items={faq} tone={faqTone} />
      <FinalCta locale={locale} />
    </PageShell>
  );
}
