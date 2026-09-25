import { ExternalLink } from "lucide-react";
import { business } from "@/config/business";
import { reviews, videoReviews, type Review, type VideoReview as VideoReviewData } from "@/config/reviews";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { crumbsFor } from "@/lib/page-meta";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageShell } from "@/components/layout/PageShell";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { VideoReview } from "@/components/reviews/VideoReview";
import { buttonClasses } from "@/components/ui/button";
import { PageHero, Section, SectionHeader } from "@/components/ui/Section";
import { FinalCta } from "@/components/home/FinalCta";

/**
 * Pagina de recenzii. Fără aggregateRating în schema: nota agregată se publică doar
 * dacă provine dintr-o sursă verificabilă, nu calculată din selecția de pe site.
 */
export function ReviewsPage({
  locale,
  items = reviews,
  videos = videoReviews,
}: {
  locale: Locale;
  items?: Review[];
  videos?: VideoReviewData[];
}) {
  const dict = getDictionary(locale);
  const t = dict.reviews;
  const crumbs = crumbsFor(locale, "reviews");

  return (
    <PageShell locale={locale} pageRef={{ type: "page", key: "reviews" }} current="reviews" schema={[crumbs.schema]}>
      <PageHero eyebrow={t.eyebrow} title={t.title} lead={t.lead} breadcrumbs={<Breadcrumbs items={crumbs.items} label={dict.a11y.breadcrumb} />}>
        {business.googleBusinessProfileUrl && (
          <a
            href={business.googleBusinessProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses({ variant: "onDark", className: "mt-8" })}
          >
            {t.leaveReview}
            <ExternalLink className="size-4" aria-hidden="true" />
          </a>
        )}
      </PageHero>

      {videos.length > 0 && (
        <Section labelledBy="video-reviews">
          <SectionHeader id="video-reviews" title={t.videoTitle} />
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {videos.map((v) => (
              <li key={v.id}>
                <VideoReview review={v} labels={dict.video} />
              </li>
            ))}
          </ul>
        </Section>
      )}

      {items.length > 0 && (
        <Section tone="mist">
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {items.map((r) => (
              <li key={r.id}>
                <ReviewCard
                  review={r}
                  locale={locale}
                  labels={{ ratingLabel: t.ratingLabel, sources: t.sources, viewSource: t.viewSource, newTab: dict.a11y.newTab }}
                />
              </li>
            ))}
          </ul>
        </Section>
      )}

      <FinalCta locale={locale} />
    </PageShell>
  );
}
