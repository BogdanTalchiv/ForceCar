"use client";

import { useEffect, useRef, useState } from "react";
import type { ResolvedImage } from "@/config/forcecar-images";
import { FcImage } from "@/components/ui/FcImage";

const VIDEO_SRC = "/images/forcecar/_og/forcecarvideo.mp4";

function canPlayHeroVideo() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
  const saveData = Boolean(conn?.saveData);
  const slow = conn?.effectiveType === "slow-2g" || conn?.effectiveType === "2g";
  return !reduce && !saveData && !slow;
}

/**
 * Poster-ul e LCP pe toate ecranele. Videoclipul (inclusiv pe telefon) pornește după first paint,
 * se pune pe pauză când iese din ecran și se oprește la date / mișcare redusă / 2G.
 */
export function HeroMedia({ poster }: { poster: ResolvedImage | null }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loadVideo, setLoadVideo] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const conn = (navigator as Navigator & { connection?: { addEventListener?: (t: string, fn: () => void) => void; removeEventListener?: (t: string, fn: () => void) => void } }).connection;

    const sync = () => {
      window.setTimeout(() => {
        if (!cancelled) setLoadVideo(canPlayHeroVideo());
      }, 0);
    };

    const idle = window.requestIdleCallback?.(sync, { timeout: 800 });
    const timer = idle == null ? window.setTimeout(sync, 450) : undefined;

    mqReduce.addEventListener("change", sync);
    conn?.addEventListener?.("change", sync);

    return () => {
      cancelled = true;
      mqReduce.removeEventListener("change", sync);
      conn?.removeEventListener?.("change", sync);
      if (idle != null) window.cancelIdleCallback?.(idle);
      if (timer != null) window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !loadVideo) return;
    el.muted = true;
    el.defaultMuted = true;
    el.playsInline = true;

    const tryPlay = () => {
      if (document.visibilityState !== "visible") {
        el.pause();
        return;
      }
      const play = el.play();
      if (play) play.catch(() => undefined);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) tryPlay();
        else el.pause();
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    document.addEventListener("visibilitychange", tryPlay);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", tryPlay);
      el.pause();
    };
  }, [loadVideo]);

  return (
    <div className="absolute inset-0" aria-hidden="true">
      {poster && <FcImage image={poster} fill decorative preload quality={72} sizes="100vw" />}
      {loadVideo && (
        <video
          ref={videoRef}
          className="absolute inset-0 size-full object-cover object-[center_28%] opacity-0 transition-opacity duration-700 ease-out sm:object-[center_34%] md:object-[center_40%]"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster?.src}
          disablePictureInPicture
          disableRemotePlayback
          onCanPlay={(e) => {
            e.currentTarget.classList.add("opacity-100");
          }}
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
