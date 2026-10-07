"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2, Play, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { GalleryCategory, ResolvedImage } from "@/config/forcecar-images";

interface Labels {
  all: string;
  filterLabel: string;
  categories: Record<GalleryCategory, string>;
  open: string;
  openVideo: string;
  play: string;
  close: string;
  prev: string;
  next: string;
  counter: string;
  dialogLabel: string;
}

const fill = (template: string, vars: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (m, k: string) => (k in vars ? String(vars[k]) : m));

function showFirstFrame(video: HTMLVideoElement) {
  video.muted = true;
  video.defaultMuted = true;
  video.pause();
  if (video.readyState >= 1 && video.currentTime < 0.08) {
    try {
      video.currentTime = 0.12;
    } catch {
      /* unele browsere blochează seek-ul până la loadeddata */
    }
  }
}

/** Miniatură: primul cadru, oprit, fără sunet — fără ecran negru. */
function GalleryVideoThumb({ src, poster }: { src: string; poster?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.muted = true;
    el.defaultMuted = true;
    el.volume = 0;

    const onReady = () => showFirstFrame(el);
    const onSeeked = () => {
      el.pause();
      el.muted = true;
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        if (el.preload !== "metadata") {
          el.preload = "metadata";
          el.load();
        }
      },
      { rootMargin: "320px" },
    );
    io.observe(el);
    el.addEventListener("loadedmetadata", onReady);
    el.addEventListener("loadeddata", onReady);
    el.addEventListener("seeked", onSeeked);

    return () => {
      io.disconnect();
      el.removeEventListener("loadedmetadata", onReady);
      el.removeEventListener("loadeddata", onReady);
      el.removeEventListener("seeked", onSeeked);
      el.pause();
    };
  }, [src]);

  return (
    <video
      ref={ref}
      src={`${src}#t=0.1`}
      poster={poster}
      muted
      playsInline
      preload="none"
      disablePictureInPicture
      disableRemotePlayback
      className="pointer-events-none absolute inset-0 size-full object-cover"
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}

export function Gallery({ images, labels, filters = true }: { images: ResolvedImage[]; labels: Labels; filters?: boolean }) {
  const [filter, setFilter] = useState<GalleryCategory | "all">("all");
  const [index, setIndex] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const touchX = useRef<number | null>(null);

  const categories = useMemo(
    () => (Object.keys(labels.categories) as GalleryCategory[]).filter((c) => images.some((i) => i.category === c)),
    [images, labels.categories],
  );
  const visible = useMemo(() => (filter === "all" ? images : images.filter((i) => i.category === filter)), [images, filter]);
  const current = index !== null ? visible[index] : null;

  const open = (i: number) => {
    setIndex(i);
    dialog.current?.showModal();
  };
  const close = () => dialog.current?.close();
  const step = useCallback(
    (delta: number) => setIndex((i) => (i === null ? i : (i + delta + visible.length) % visible.length)),
    [visible.length],
  );

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    const pauseVideos = () => {
      el.querySelectorAll("video").forEach((v) => {
        v.pause();
        v.muted = true;
        v.volume = 0;
      });
    };
    const onClose = () => {
      pauseVideos();
      setIndex(null);
    };
    el.addEventListener("keydown", onKey);
    el.addEventListener("close", onClose);
    return () => {
      el.removeEventListener("keydown", onKey);
      el.removeEventListener("close", onClose);
      pauseVideos();
    };
  }, [step]);

  const filterBtn = "h-10 rounded-md px-4 text-sm font-bold ring-1 ring-inset transition-colors";

  return (
    <div>
      {filters && categories.length > 1 && (
        <div role="group" aria-label={labels.filterLabel} className="mb-8 flex flex-wrap gap-2">
          {(["all", ...categories] as const).map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={filter === c}
              onClick={() => setFilter(c)}
              className={`${filterBtn} ${filter === c ? "bg-ink-900 text-white ring-ink-900" : "bg-white text-text ring-line hover:ring-ink-900"}`}
            >
              {c === "all" ? labels.all : labels.categories[c]}
            </button>
          ))}
        </div>
      )}

      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:gap-4">
        {visible.map((img, i) => {
          const isVideo = img.kind === "video";
          return (
            <li key={img.id}>
              <button
                type="button"
                onClick={() => open(i)}
                aria-label={fill(isVideo ? labels.openVideo : labels.open, { alt: img.alt })}
                className="group relative block aspect-[4/3] w-full overflow-hidden rounded-lg bg-ink-800"
              >
                {isVideo ? (
                  <span className="absolute inset-0 overflow-hidden transition-transform duration-500 group-hover:scale-[1.03]">
                    <GalleryVideoThumb src={img.src} poster={img.poster} />
                  </span>
                ) : (
                  <Image
                    src={img.src}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 33vw, 50vw"
                    quality={60}
                    placeholder="blur"
                    blurDataURL={img.blurDataURL}
                    style={{ objectPosition: img.focal }}
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                )}
                <span className="absolute inset-0 bg-ink-900/0 transition-colors group-hover:bg-ink-900/20" aria-hidden="true" />
                {isVideo ? (
                  <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                    <span className="flex size-12 items-center justify-center rounded-full bg-ink-900/75 text-white ring-1 ring-white/25">
                      <Play className="size-5 fill-white" />
                    </span>
                  </span>
                ) : (
                  <span className="absolute top-3 right-3 flex size-9 items-center justify-center rounded-md bg-ink-900/70 text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                    <Maximize2 className="size-4" aria-hidden="true" />
                  </span>
                )}
                {img.category && (
                  <span className="absolute bottom-3 left-3 rounded bg-ink-900/85 px-2.5 py-1 text-xs font-bold text-white">
                    {labels.categories[img.category]}
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      <dialog
        ref={dialog}
        aria-label={labels.dialogLabel}
        className="m-0 h-dvh max-h-none w-full max-w-none bg-black/95 p-0 text-white backdrop:bg-black/80"
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
          touchX.current = null;
        }}
      >
        {current && (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
              <p className="text-sm font-semibold text-white/70 tabular-nums" aria-live="polite">
                {fill(labels.counter, { current: (index ?? 0) + 1, total: visible.length })}
              </p>
              <button
                type="button"
                onClick={close}
                aria-label={labels.close}
                className="flex size-11 items-center justify-center rounded-md hover:bg-white/10"
                autoFocus
              >
                <X className="size-6" aria-hidden="true" />
              </button>
            </div>
            <figure className="relative flex min-h-0 flex-1 flex-col">
              <div className="relative min-h-0 flex-1">
                {current.kind === "video" ? (
                  <video
                    key={current.id}
                    src={`${current.src}#t=0.1`}
                    poster={current.poster}
                    controls
                    playsInline
                    muted
                    preload="metadata"
                    disablePictureInPicture
                    className="absolute inset-0 m-auto max-h-full max-w-full animate-fade-up object-contain"
                    onLoadedMetadata={(e) => showFirstFrame(e.currentTarget)}
                    onLoadedData={(e) => showFirstFrame(e.currentTarget)}
                    onPlay={(e) => {
                      e.currentTarget.muted = true;
                      e.currentTarget.volume = 0;
                    }}
                    onVolumeChange={(e) => {
                      e.currentTarget.muted = true;
                      e.currentTarget.volume = 0;
                    }}
                  >
                    {labels.play}
                  </video>
                ) : (
                  <Image
                    key={current.id}
                    src={current.src}
                    alt={current.alt}
                    fill
                    sizes="100vw"
                    quality={80}
                    placeholder="blur"
                    blurDataURL={current.blurDataURL}
                    className="animate-fade-up object-contain"
                  />
                )}
              </div>
              <figcaption className="mx-auto max-w-3xl px-6 py-4 text-center text-sm text-white/80">{current.alt}</figcaption>
            </figure>
            {visible.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label={labels.prev}
                  className="absolute top-1/2 left-2 flex size-12 -translate-y-1/2 items-center justify-center rounded-md bg-black/40 hover:bg-white/15 sm:left-4"
                >
                  <ChevronLeft className="size-7" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label={labels.next}
                  className="absolute top-1/2 right-2 flex size-12 -translate-y-1/2 items-center justify-center rounded-md bg-black/40 hover:bg-white/15 sm:right-4"
                >
                  <ChevronRight className="size-7" aria-hidden="true" />
                </button>
              </>
            )}
          </div>
        )}
      </dialog>
    </div>
  );
}
