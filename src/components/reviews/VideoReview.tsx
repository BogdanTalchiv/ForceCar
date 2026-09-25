"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { useState } from "react";
import type { VideoReview as VideoReviewData } from "@/config/reviews";
import { track } from "@/lib/analytics/track";

export function youtubeId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname === "youtu.be") return u.pathname.slice(1) || null;
    if (u.hostname.endsWith("youtube.com") || u.hostname.endsWith("youtube-nocookie.com")) {
      if (u.searchParams.get("v")) return u.searchParams.get("v");
      const m = u.pathname.match(/^\/(shorts|embed|live)\/([\w-]{6,})/);
      return m ? m[2] : null;
    }
  } catch {
    /* URL invalid */
  }
  return null;
}

interface Labels {
  play: string;
  notice: string;
  error: string;
  watchOnYoutube: string;
}

/**
 * Fațadă video: până la click nu se încarcă nimic de la YouTube (performanță + confidențialitate).
 * După click se folosește youtube-nocookie.com.
 */
export function VideoReview({ review, labels }: { review: VideoReviewData; labels: Labels }) {
  const [active, setActive] = useState(false);
  const id = youtubeId(review.videoUrl);
  const isFile = !id && /\.(mp4|webm)$/i.test(review.videoUrl);

  if (!id && !isFile) {
    return (
      <p className="rounded-lg bg-mist p-6 text-sm text-muted">
        {labels.error}{" "}
        <a href={review.videoUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand underline">
          {labels.watchOnYoutube}
        </a>
      </p>
    );
  }

  return (
    <figure className="overflow-hidden rounded-lg bg-ink-900 text-white">
      <div className="relative aspect-video">
        {active ? (
          id ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
              title={review.quote}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              className="absolute inset-0 size-full"
            />
          ) : (
            <video src={review.videoUrl} controls autoPlay playsInline className="absolute inset-0 size-full bg-black" />
          )
        ) : (
          <button
            type="button"
            onClick={() => {
              setActive(true);
              track("video_review_play", { review: review.id });
            }}
            className="group absolute inset-0 flex items-center justify-center"
            aria-label={labels.play.replace("{customer}", review.customer)}
          >
            {review.thumbnail ? (
              <Image src={review.thumbnail} alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" quality={60} className="object-cover opacity-80" />
            ) : (
              <span aria-hidden="true" className="absolute inset-0 bg-linear-to-br from-ink-700 to-ink-950" />
            )}
            <span className="relative flex size-16 items-center justify-center rounded-full bg-brand shadow-float transition-transform group-hover:scale-105">
              <Play className="ml-1 size-7 fill-white" aria-hidden="true" />
            </span>
          </button>
        )}
      </div>
      <figcaption className="p-5">
        <blockquote lang={review.language} className="leading-relaxed">
          “{review.quote}”
        </blockquote>
        <p className="mt-3 text-sm text-steel-300">
          <span className="font-bold text-white">{review.customer}</span>
          {review.vehicle && <> · {review.vehicle}</>}
        </p>
        {!active && id && <p className="mt-3 text-xs text-steel-400">{labels.notice}</p>}
      </figcaption>
    </figure>
  );
}
