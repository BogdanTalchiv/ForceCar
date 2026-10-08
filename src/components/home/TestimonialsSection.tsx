import { Play } from "lucide-react";
import { reviews, videoReviews } from "@/config/reviews";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { hasReviews } from "@/lib/navigation";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { VideoReview } from "@/components/reviews/VideoReview";
import { ReviewStage } from "@/components/home/ReviewStage";
import { TechSurface } from "@/components/ui/TechSurface";

function ReservedCard({ name, notice, quote }: { name: string; notice: string; quote: string }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-[0_8px_30px_-18px_rgb(17_19_21/0.28)] ring-1 ring-black/5">
      <div className="relative flex aspect-[4/5] items-center justify-center bg-linear-to-br from-ink-700 to-ink-950">
        <span className="flex size-14 items-center justify-center rounded-full bg-white/12 ring-1 ring-white/20">
          <Play className="ml-0.5 size-5 fill-white text-white" aria-hidden="true" />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="font-bold">{name}</p>
        <p className="mt-1 text-sm leading-relaxed text-muted">{notice}</p>
        <p className="mt-2 text-sm text-muted">{quote}</p>
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

  const reviewLabels = {
    ratingLabel: dict.reviews.ratingLabel,
    sources: dict.reviews.sources,
    viewSource: dict.reviews.viewSource,
    newTab: dict.a11y.newTab,
  };

  const realCards =
    texts.length > 0
      ? texts.map((r) => <ReviewCard key={r.id} review={r} locale={locale} labels={reviewLabels} />)
      : videos.map((review) => <VideoReview key={review.id} review={review} labels={dict.video} />);

  const reserved = [0, 1, 2].map((i) => (
    <ReservedCard key={i} name={t.placeholderName} notice={t.placeholderNotice} quote={t.placeholderQuote} />
  ));

  return (
    <TechSurface variant="voice" labelledBy="home-reviews-title" tone="white">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.25fr)] lg:gap-8">
        <div className="fc-copy">
          <p className="eyebrow mb-4">{t.eyebrow}</p>
          <h2 id="home-reviews-title" className="text-h2 font-extrabold text-balance">
            {t.title}
          </h2>
          <p className="mt-4 max-w-[28rem] text-lead text-muted">{t.lead}</p>
        </div>
        <ReviewStage prevLabel={dict.gallery.prev} nextLabel={dict.gallery.next}>
          {showReal ? realCards : reserved}
        </ReviewStage>
      </div>
    </TechSurface>
  );
}
