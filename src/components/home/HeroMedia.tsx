"use client";

import { useEffect, useState } from "react";
import type { ResolvedImage } from "@/config/forcecar-images";
import { FcImage } from "@/components/ui/FcImage";

const VIDEO_SRC = "/images/forcecar/_og/forcecarvideo.mp4";

export function HeroMedia({ poster }: { poster: ResolvedImage | null }) {
  const [playVideo, setPlayVideo] = useState(false);

  useEffect(() => {
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqDesktop = window.matchMedia("(min-width: 768px)");
    const update = () => {
      const saveData = Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);
      setPlayVideo(!mqReduce.matches && mqDesktop.matches && !saveData);
    };
    mqReduce.addEventListener("change", update);
    mqDesktop.addEventListener("change", update);
    const timer = window.setTimeout(update, 0);
    return () => {
      mqReduce.removeEventListener("change", update);
      mqDesktop.removeEventListener("change", update);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div className="absolute inset-0" aria-hidden="true">
      {poster && <FcImage image={poster} fill decorative quality={72} sizes="100vw" />}
      {playVideo && (
        <video
          className="absolute inset-0 size-full object-cover object-[center_40%]"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster?.src}
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
