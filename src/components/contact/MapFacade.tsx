"use client";

import { ExternalLink, MapPin } from "lucide-react";
import { useState } from "react";

/** Harta Google se încarcă doar la cerere — fără cookie-uri terțe și fără cost de performanță la încărcare. */
export function MapFacade({
  embedUrl,
  mapsUrl,
  labels,
}: {
  embedUrl: string;
  mapsUrl: string | null;
  labels: { title: string; load: string; notice: string; open: string };
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
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center [background-image:radial-gradient(circle_at_center,rgb(255_255_255/0.06)_1px,transparent_1px)] [background-size:22px_22px]">
          <span className="flex size-14 items-center justify-center rounded-full bg-brand">
            <MapPin className="size-7" aria-hidden="true" />
          </span>
          <button type="button" onClick={() => setActive(true)} className="h-11 rounded-md bg-white px-5 font-bold text-ink-900 hover:bg-mist">
            {labels.load}
          </button>
          <p className="max-w-xs text-xs text-steel-300">{labels.notice}</p>
          {mapsUrl && (
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold underline">
              {labels.open}
              <ExternalLink className="size-3.5" aria-hidden="true" />
            </a>
          )}
        </div>
      )}
    </div>
  );
}
