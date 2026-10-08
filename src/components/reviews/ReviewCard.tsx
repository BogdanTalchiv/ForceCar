import { ExternalLink, Quote, Star } from "lucide-react";
import type { Review } from "@/config/reviews";
import { getImage } from "@/config/forcecar-images";
import { localeMeta, type Locale } from "@/i18n/config";
import { FcImage } from "@/components/ui/FcImage";

interface Labels {
  ratingLabel: string;
  sources: Record<Review["source"], string>;
  viewSource: string;
  newTab: string;
}

function GoogleMark() {
  return (
    <span className="inline-flex items-center gap-1 shrink-0" title="Google">
      <svg viewBox="0 0 18 18" className="size-4" aria-hidden="true">
        <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62Z" />
        <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.83.86-3.04.86-2.34 0-4.32-1.58-5.03-3.71H.96v2.33A9 9 0 0 0 9 18Z" />
        <path fill="#FBBC05" d="M3.97 10.71A5.41 5.41 0 0 1 3.69 9c0-.59.1-1.17.28-1.71V4.96H.96A9 9 0 0 0 0 9c0 1.45.35 2.82.96 4.04l3.01-2.33Z" />
        <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.96l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58Z" />
      </svg>
      <span className="text-[11px] font-medium tracking-wide text-[#5f6368]">Google</span>
    </span>
  );
}

export function Stars({ rating, label, google }: { rating: number; label: string; google?: boolean }) {
  const on = google ? "fill-[#FABB05] text-[#FABB05]" : "fill-brand text-brand";
  const off = google ? "fill-[#dadce0] text-[#dadce0]" : "text-steel-200";
  return (
    <span className="flex items-center gap-px" role="img" aria-label={label.replace("{rating}", String(rating))}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} aria-hidden="true" className={`size-3.5 ${i < rating ? on : off}`} />
      ))}
    </span>
  );
}

const AVATAR = ["#1a73e8", "#188038", "#c5221f", "#e37400", "#9334e6"];

function avatarColor(name: string) {
  let n = 0;
  for (const ch of name) n += ch.charCodeAt(0);
  return AVATAR[n % AVATAR.length];
}

/** Recenzie — textul este afișat exact, în limba originală a clientului. */
export function ReviewCard({ review, locale, labels }: { review: Review; locale: Locale; labels: Labels }) {
  const date = new Intl.DateTimeFormat(localeMeta[locale].dateLocale, { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(`${review.date}T12:00:00Z`),
  );
  const photo = review.photo ? getImage(review.photo, locale) : null;
  const google = review.source === "google";
  const initial = review.customer.trim().charAt(0).toUpperCase();

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-[0_8px_30px_-18px_rgb(17_19_21/0.28)] ring-1 ring-black/5">
      {photo && (
        <div className="relative aspect-[4/3] bg-ink-800">
          <FcImage image={photo} fill sizes="(min-width: 1024px) 22vw, (min-width: 768px) 40vw, 90vw" quality={72} />
        </div>
      )}
      <div className="flex flex-1 flex-col p-4">
        {google ? (
          <>
            <div className="flex items-start justify-between gap-2">
              <div className="flex min-w-0 items-center gap-3">
                <span
                  className="flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{ background: avatarColor(review.customer) }}
                  aria-hidden="true"
                >
                  {initial}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[15px] font-medium text-[#202124]">{review.customer}</p>
                  {review.vehicle && <p className="truncate text-xs text-[#5f6368]">{review.vehicle}</p>}
                </div>
              </div>
              <GoogleMark />
            </div>
            <div className="mt-2.5 flex flex-wrap items-center gap-2">
              {review.rating ? <Stars rating={review.rating} label={labels.ratingLabel} google /> : null}
              <time dateTime={review.date} className="text-xs text-[#5f6368]">
                {date}
              </time>
            </div>
            <blockquote lang={review.language} className="mt-3 flex-1 text-[15px] leading-relaxed text-[#3c4043]">
              <p>{review.text}</p>
            </blockquote>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between gap-4">
              {review.rating ? <Stars rating={review.rating} label={labels.ratingLabel} /> : <Quote className="size-5 text-brand" aria-hidden="true" />}
              <span className="text-xs font-bold tracking-wide text-muted uppercase">{labels.sources[review.source]}</span>
            </div>
            <blockquote lang={review.language} className="mt-4 flex-1 leading-relaxed text-text">
              <p>{review.text}</p>
            </blockquote>
            <p className="mt-5 border-t border-line pt-4 text-sm">
              <span className="font-bold">{review.customer}</span>
              {review.vehicle && <span className="text-muted"> · {review.vehicle}</span>}
              <span className="mt-0.5 block text-muted">
                <time dateTime={review.date}>{date}</time>
              </span>
            </p>
          </>
        )}
        {review.sourceUrl && (
          <a
            href={review.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline"
          >
            {labels.viewSource}
            <ExternalLink className="size-3.5" aria-hidden="true" />
            <span className="sr-only">{labels.newTab}</span>
          </a>
        )}
      </div>
    </article>
  );
}
