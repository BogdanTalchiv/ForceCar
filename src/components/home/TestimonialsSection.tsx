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
import { SectionHeader } from "@/components/ui/Section";
import { TechSurface } from "@/components/ui/TechSurface";

function Waveform() {
  return (
    <span className="tech-wave text-brand" aria-hidden="true">
      <span className="h-2" />
      <span className="h-4" />
      <span className="h-3" />
      <span className="h-[1.15rem]" />
      <span className="h-2.5" />
      <span className="h-4" />
      <span className="h-3" />
    </span>
  );
}

export function TestimonialsSection({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.home.reviews;
  const videos = videoReviews.slice(0, 3);
  const texts = reviews.slice(0, 3);
  const showReal = hasReviews && (videos.length > 0 || texts.length > 0);

  if (!showReal) {
    return (
      <TechSurface variant="voice" labelledBy="home-reviews-title" tone="mist">
        <SectionHeader id="home-reviews-title" eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
        <div className="group/reserve max-w-xl rounded-lg bg-white/70 px-5 py-6 ring-1 ring-line/80 transition-[box-shadow,ring-color] duration-300 hover:ring-brand/25">
          <div className="flex items-start gap-4">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-ink-900 text-white">
              <Play className="ml-0.5 size-4 fill-current" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-3">
                <p className="font-bold">{t.placeholderName}</p>
                <Waveform />
              </div>
              <p className="mt-1 text-[0.9375rem] leading-relaxed text-muted">{t.placeholderNotice}</p>
              <p className="mt-2 text-sm text-muted">{t.placeholderQuote}</p>
            </div>
          </div>
        </div>
      </TechSurface>
    );
  }

  return (
    <TechSurface variant="voice" labelledBy="home-reviews-title" tone="mist">
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
    </TechSurface>
  );
}
