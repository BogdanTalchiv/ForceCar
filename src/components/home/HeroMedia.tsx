"use client";

import { useEffect, useState } from "react";
import type { ResolvedImage } from "@/config/forcecar-images";
import { FcImage } from "@/components/ui/FcImage";

const VIDEO_SRC = "/images/forcecar/_og/forcecarvideo.mp4";

export function HeroMedia({ poster }: { poster: ResolvedImage | null }) {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <div className="absolute inset-0" aria-hidden="true">
      {reduceMotion && poster ? (
        <FcImage image={poster} fill decorative quality={72} sizes="100vw" />
      ) : (
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
