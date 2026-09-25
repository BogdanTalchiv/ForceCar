import { ExternalLink, Quote, Star } from "lucide-react";
import type { Review } from "@/config/reviews";
import { localeMeta, type Locale } from "@/i18n/config";

interface Labels {
  ratingLabel: string;
  sources: Record<Review["source"], string>;
  viewSource: string;
  newTab: string;
}

export function Stars({ rating, label }: { rating: number; label: string }) {
  return (
    <span className="flex items-center gap-0.5" role="img" aria-label={label.replace("{rating}", String(rating))}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} aria-hidden="true" className={`size-4 ${i < rating ? "fill-brand text-brand" : "text-steel-200"}`} />
      ))}
    </span>
  );
}

/** Recenzie reală — textul este afișat exact, în limba originală a clientului. */
export function ReviewCard({ review, locale, labels }: { review: Review; locale: Locale; labels: Labels }) {
  const date = new Intl.DateTimeFormat(localeMeta[locale].dateLocale, { month: "long", year: "numeric" }).format(
    new Date(`${review.date}T12:00:00Z`),
  );
  return (
    <figure className="flex h-full flex-col rounded-lg bg-white p-6 ring-1 ring-line">
      <div className="flex items-center justify-between gap-4">
        {review.rating ? <Stars rating={review.rating} label={labels.ratingLabel} /> : <Quote className="size-5 text-brand" aria-hidden="true" />}
        <span className="text-xs font-bold tracking-wide text-muted uppercase">{labels.sources[review.source]}</span>
      </div>
      <blockquote lang={review.language} className="mt-4 flex-1 leading-relaxed text-text">
        <p>{review.text}</p>
      </blockquote>
      <figcaption className="mt-5 border-t border-line pt-4 text-sm">
        <span className="font-bold">{review.customer}</span>
        {review.vehicle && <span className="text-muted"> · {review.vehicle}</span>}
        <span className="mt-0.5 block text-muted">
          <time dateTime={review.date}>{date}</time>
        </span>
        {review.sourceUrl && (
          <a
            href={review.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1 font-semibold text-brand hover:underline"
          >
            {labels.viewSource}
            <ExternalLink className="size-3.5" aria-hidden="true" />
            <span className="sr-only">{labels.newTab}</span>
          </a>
        )}
      </figcaption>
    </figure>
  );
}
