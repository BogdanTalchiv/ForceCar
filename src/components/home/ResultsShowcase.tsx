"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import type { ResolvedImage } from "@/config/forcecar-images";
import { BeforeAfterSlider } from "@/components/before-after/BeforeAfterSlider";
import { FcImage } from "@/components/ui/FcImage";

export type ResultSlide = {
  id: string;
  title: string;
  notice?: string;
  preview?: ResolvedImage;
  before?: ResolvedImage;
  after?: ResolvedImage;
};

export function ResultsShowcase({
  eyebrow,
  title,
  lead,
  slides,
  labels,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  slides: ResultSlide[];
  labels: { before: string; after: string; slider: string; hint: string; prev: string; next: string };
}) {
  const [index, setIndex] = useState(0);
  const slide = slides[index];
  const many = slides.length > 1;
  if (!slide) return null;

  const go = (dir: -1 | 1) => setIndex((i) => (i + dir + slides.length) % slides.length);

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.22fr)] lg:gap-14">
      <div className="fc-copy">
        <p className="eyebrow mb-4">{eyebrow}</p>
        <h2 id="results-title" className="text-h2 font-extrabold text-balance">
          {title}
        </h2>
        <p className="mt-4 max-w-[28rem] text-lead text-steel-300">{lead}</p>
        <div className="mt-8 flex items-center gap-3">
          <button type="button" className="fc-nav-btn" onClick={() => go(-1)} disabled={!many} aria-label={labels.prev}>
            <ChevronLeft className="size-5" strokeWidth={1.75} />
          </button>
          <button type="button" className="fc-nav-btn" onClick={() => go(1)} disabled={!many} aria-label={labels.next}>
            <ChevronRight className="size-5" strokeWidth={1.75} />
          </button>
        </div>
        {many && (
          <ul className="mt-6 flex gap-2.5">
            {slides.map((s, i) => {
              const thumb = s.preview ?? s.after ?? s.before;
              return (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={s.title}
                    aria-current={i === index}
                    className={`relative size-14 overflow-hidden rounded-md ring-1 transition ${
                      i === index ? "ring-brand" : "ring-white/15 opacity-70 hover:opacity-100"
                    }`}
                  >
                    {thumb && <FcImage image={thumb} fill decorative quality={60} sizes="56px" className="object-cover" />}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <div className="fc-stage">
        <BeforeAfterSlider
          key={slide.id}
          id={slide.id}
          before={slide.before}
          after={slide.after}
          preview={slide.preview}
          title={slide.title}
          labels={labels}
          notice={slide.notice}
          onDark
          showCaption={Boolean(slide.notice)}
        />
      </div>
    </div>
  );
}
