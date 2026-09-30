"use client";

import { ExternalLink, MapPin } from "lucide-react";
import { useState } from "react";
import type { ResolvedImage } from "@/config/forcecar-images";
import { FcImage } from "@/components/ui/FcImage";

/** Harta Google se încarcă doar la cerere — fără cookie-uri terțe și fără cost de performanță la încărcare. */
export function MapFacade({
  embedUrl,
  mapsUrl,
  labels,
  cover,
}: {
  embedUrl: string;
  mapsUrl: string | null;
  labels: { title: string; load: string; notice: string; open: string };
  cover?: ResolvedImage | null;
}) {
  const [active, setActive] = useState(false);
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-ink-800 text-white sm:aspect-[16/10]">
      {active ? (
        <iframe
          src={embedUrl}
          title={labels.title}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 size-full border-0"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
          {cover ? (
            <>
              <FcImage image={cover} fill decorative quality={60} sizes="(min-width: 1024px) 50vw, 100vw" />
              <div aria-hidden="true" className="absolute inset-0 bg-ink-950/62" />
            </>
          ) : (
            <div
              aria-hidden="true"
              className="absolute inset-0 [background-image:radial-gradient(circle_at_center,rgb(255_255_255/0.06)_1px,transparent_1px)] [background-size:22px_22px]"
            />
          )}
          <span className="relative z-10 flex size-12 items-center justify-center rounded-md bg-brand">
            <MapPin className="size-6" strokeWidth={1.75} aria-hidden="true" />
          </span>
          <button type="button" onClick={() => setActive(true)} className="relative z-10 h-11 rounded-md bg-white px-5 font-bold text-ink-900 hover:bg-mist">
            {labels.load}
          </button>
          <p className="relative z-10 max-w-xs text-xs text-steel-200">{labels.notice}</p>
          {mapsUrl && (
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 inline-flex items-center gap-1.5 text-sm font-semibold underline decoration-white/40 underline-offset-4 hover:decoration-white"
            >
              {labels.open}
              <ExternalLink className="size-3.5" aria-hidden="true" />
            </a>
          )}
        </div>
      )}
    </div>
  );
}
