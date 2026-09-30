import { Play } from "lucide-react";
import Link from "next/link";
import { reviews, videoReviews } from "@/config/reviews";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pagePath } from "@/i18n/routes";
import { hasReviews } from "@/lib/navigation";
import { buttonClasses } from "@/components/ui/button";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { VideoReview } from "@/components/reviews/VideoReview";
import { Section, SectionHeader } from "@/components/ui/Section";

export function TestimonialsSection({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.home.reviews;
  const videos = videoReviews.slice(0, 3);
  const texts = reviews.slice(0, 3);
  const showReal = hasReviews && (videos.length > 0 || texts.length > 0);

  if (!showReal) {
    return (
      <Section labelledBy="home-reviews-title" tone="mist">
        <SectionHeader id="home-reviews-title" eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
        <div className="flex max-w-2xl items-start gap-4 border-y border-line py-7">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-white ring-1 ring-line">
            <Play className="ml-0.5 size-4 text-ink-900" aria-hidden="true" />
          </span>
          <div>
            <p className="font-bold">{t.placeholderName}</p>
            <p className="mt-1 text-[0.9375rem] leading-relaxed text-muted">{t.placeholderNotice}</p>
            <p className="mt-2 text-sm text-muted">{t.placeholderQuote}</p>
          </div>
        </div>
      </Section>
    );
  }

  return (
    <section aria-labelledby="home-reviews-title" className="bg-mist section-y">
      <div className="container-fc">
        <SectionHeader
          id="home-reviews-title"
          eyebrow={t.eyebrow}
          title={t.title}
          lead={t.lead}
          action={
            <Link href={pagePath(locale, "reviews")} className={buttonClasses({ variant: "outline" })}>
              {dict.nav.reviews}
            </Link>
          }
        />
        {videos.length > 0 ? (
          <ul className="grid gap-4 md:grid-cols-3">
            {videos.map((review) => (
              <li key={review.id}>
                <VideoReview review={review} labels={dict.video} />
              </li>
            ))}
          </ul>
        ) : (
          <ul className="grid gap-4 md:grid-cols-3">
            {texts.map((r) => (
              <li key={r.id}>
                <ReviewCard
                  review={r}
                  locale={locale}
                  labels={{
                    ratingLabel: dict.reviews.ratingLabel,
                    sources: dict.reviews.sources,
                    viewSource: dict.reviews.viewSource,
                    newTab: dict.a11y.newTab,
                  }}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
