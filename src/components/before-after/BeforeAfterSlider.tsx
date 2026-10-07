"use client";

import Image from "next/image";
import { MoveHorizontal } from "lucide-react";
import { useRef, useState } from "react";
import type { ResolvedImage } from "@/config/forcecar-images";
import { track } from "@/lib/analytics/track";

interface Props {
  id: string;
  before?: ResolvedImage;
  after?: ResolvedImage;
  /** O singură fotografie, folosită demonstrativ (stânga în grayscale). Nu este o pereche reală. */
  preview?: ResolvedImage;
  title: string;
  labels: { before: string; after: string; slider: string; hint: string };
  notice?: string;
  className?: string;
  onDark?: boolean;
  showCaption?: boolean;
}

/**
 * Comparație Înainte/După. Controlul este un <input type="range"> nativ:
 * funcționează cu mouse, touch și tastatură (săgeți, Home/End) și este anunțat de cititoarele de ecran.
 * Folosește DOAR perechi reale ale aceleiași mașini și aceleiași lucrări — sau un preview marcat explicit.
 */
export function BeforeAfterSlider({
  id,
  before,
  after,
  preview,
  title,
  labels,
  notice,
  className = "",
  onDark = false,
  showCaption = true,
}: Props) {
  const [value, setValue] = useState(50);
  const tracked = useRef(false);
  const left = preview ?? before;
  const right = preview ?? after;

  const onChange = (v: number) => {
    setValue(v);
    if (!tracked.current) {
      tracked.current = true;
      track("before_after_interaction", { pair: id });
    }
  };

  if (!left || !right) return null;

  return (
    <figure className={className}>
      <div
        className={`relative aspect-[16/11] overflow-hidden rounded-xl bg-ink-800 select-none has-[input:focus-visible]:ring-2 has-[input:focus-visible]:ring-brand has-[input:focus-visible]:ring-offset-2 ${
          onDark ? "shadow-[0_24px_60px_-28px_rgb(0_0_0/0.7)] ring-1 ring-white/10" : "ring-1 ring-black/5"
        }`}
      >
        <Image
          src={right.src}
          alt={right.alt}
          fill
          sizes="(min-width: 1024px) 55vw, 100vw"
          quality={72}
          placeholder="blur"
          blurDataURL={right.blurDataURL}
          className="object-cover"
          style={{ objectPosition: right.focal }}
        />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}>
          <Image
            src={left.src}
            alt={left.alt}
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            quality={72}
            placeholder="blur"
            blurDataURL={left.blurDataURL}
            className={`object-cover ${preview ? "grayscale contrast-110" : ""}`}
            style={{ objectPosition: left.focal }}
          />
        </div>

        <span className="pointer-events-none absolute top-3 left-3 rounded bg-ink-900/90 px-2.5 py-1 text-[0.6875rem] font-bold tracking-wide text-white uppercase">
          {labels.before}
        </span>
        <span className="pointer-events-none absolute top-3 right-3 rounded bg-brand px-2.5 py-1 text-[0.6875rem] font-bold tracking-wide text-white uppercase">
          {labels.after}
        </span>

        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 w-px -translate-x-1/2 bg-white" style={{ left: `${value}%` }}>
          <span className="absolute top-1/2 left-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink-900 shadow-[0_4px_16px_rgb(0_0_0/0.28)] ring-4 ring-white/30">
            <MoveHorizontal className="size-5" strokeWidth={1.75} />
          </span>
        </div>

        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-label={labels.slider.replace("{title}", title)}
          aria-valuetext={`${labels.before} ${value}% · ${labels.after} ${100 - value}%`}
          className="ba-range absolute inset-0 size-full cursor-ew-resize opacity-0 focus-visible:outline-none"
        />
      </div>
      {showCaption && (
        <figcaption
          className={`mt-3 text-sm ${onDark ? "text-steel-400" : "flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4"}`}
        >
          {!onDark && <span className="font-bold text-text">{title}</span>}
          <span className={`max-w-xl ${onDark ? "" : "text-muted"}`}>{notice ?? (onDark ? null : labels.hint)}</span>
        </figcaption>
      )}
    </figure>
  );
}
