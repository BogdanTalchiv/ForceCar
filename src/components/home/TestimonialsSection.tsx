import { Play, Star } from "lucide-react";
import Link from "next/link";
import { reviews, videoReviews } from "@/config/reviews";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pagePath } from "@/i18n/routes";
import { hasReviews } from "@/lib/navigation";
import { buttonClasses } from "@/components/ui/button";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { VideoReview } from "@/components/reviews/VideoReview";
import { SectionHeader } from "@/components/ui/Section";

function PlaceholderCard({
  quote,
  name,
  notice,
}: {
  quote: string;
  name: string;
  notice: string;
}) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg bg-ink-800 ring-1 ring-dashed ring-white/20">
      <div className="relative flex aspect-video items-center justify-center bg-linear-to-br from-ink-700 to-ink-950">
        <span className="flex size-16 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20">
          <Play className="ml-1 size-7 fill-white/70 text-white/70" aria-hidden="true" />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="flex gap-0.5" aria-hidden="true">
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} className="size-4 text-white/20" />
          ))}
        </span>
        <blockquote className="mt-4 flex-1 leading-relaxed text-steel-300">“{quote}”</blockquote>
        <p className="mt-4 text-sm font-bold text-white/70">{name}</p>
        <p className="mt-2 text-xs text-steel-400">{notice}</p>
      </div>
    </article>
  );
}

export function TestimonialsSection({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.home.reviews;
  const videos = videoReviews.slice(0, 3);
  const texts = reviews.slice(0, 3);
  const showReal = hasReviews && (videos.length > 0 || texts.length > 0);

  return (
    <section aria-labelledby="home-reviews-title" className="bg-ink-950 py-16 text-white sm:py-20 lg:py-24">
      <div className="container-fc">
        <SectionHeader
          id="home-reviews-title"
          eyebrow={t.eyebrow}
          title={t.title}
          lead={t.lead}
          dark
          action={
            showReal ? (
              <Link href={pagePath(locale, "reviews")} className={buttonClasses({ variant: "onDark" })}>
                {dict.nav.reviews}
              </Link>
            ) : undefined
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
        ) : texts.length > 0 ? (
          <ul className="grid gap-4 md:grid-cols-3">
            {texts.map((r) => (
              <li key={r.id} className="text-text">
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
        ) : (
          <ul className="grid gap-4 md:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <li key={i}>
                <PlaceholderCard quote={t.placeholderQuote} name={t.placeholderName} notice={t.placeholderNotice} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
