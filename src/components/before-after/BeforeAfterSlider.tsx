"use client";

import Image from "next/image";
import { MoveHorizontal } from "lucide-react";
import { useRef, useState } from "react";
import type { ResolvedImage } from "@/config/forcecar-images";
import { track } from "@/lib/analytics/track";

interface Props {
  id: string;
  before: ResolvedImage;
  after: ResolvedImage;
  title: string;
  labels: { before: string; after: string; slider: string; hint: string };
}

/**
 * Comparație Înainte/După. Controlul este un <input type="range"> nativ:
 * funcționează cu mouse, touch și tastatură (săgeți, Home/End) și este anunțat de cititoarele de ecran.
 * Folosește DOAR perechi reale ale aceleiași mașini și aceleiași lucrări.
 */
export function BeforeAfterSlider({ id, before, after, title, labels }: Props) {
  const [value, setValue] = useState(50);
  const tracked = useRef(false);

  const onChange = (v: number) => {
    setValue(v);
    if (!tracked.current) {
      tracked.current = true;
      track("before_after_interaction", { pair: id });
    }
  };

  return (
    <figure>
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-ink-800 select-none has-[input:focus-visible]:ring-2 has-[input:focus-visible]:ring-brand has-[input:focus-visible]:ring-offset-2">
        <Image
          src={after.src}
          alt={after.alt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          quality={72}
          placeholder="blur"
          blurDataURL={after.blurDataURL}
          className="object-cover"
        />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}>
          <Image
            src={before.src}
            alt={before.alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            quality={72}
            placeholder="blur"
            blurDataURL={before.blurDataURL}
            className="object-cover"
          />
        </div>

        <span className="pointer-events-none absolute top-3 left-3 rounded bg-ink-900/85 px-2.5 py-1 text-xs font-bold text-white">
          {labels.before}
        </span>
        <span className="pointer-events-none absolute top-3 right-3 rounded bg-brand px-2.5 py-1 text-xs font-bold text-white">
          {labels.after}
        </span>

        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white" style={{ left: `${value}%` }}>
          <span className="absolute top-1/2 left-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink-900 shadow-float">
            <MoveHorizontal className="size-5" />
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
          className="ba-range absolute inset-0 size-full opacity-0 focus-visible:outline-none"
        />
      </div>
      <figcaption className="mt-3 flex items-center justify-between gap-4 text-sm">
        <span className="font-bold">{title}</span>
        <span className="text-muted">{labels.hint}</span>
      </figcaption>
    </figure>
  );
}
