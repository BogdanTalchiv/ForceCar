import Image from "next/image";
import type { ResolvedImage } from "@/config/forcecar-images";

interface FcImageProps {
  image: ResolvedImage | null;
  sizes: string;
  className?: string;
  /** Umple containerul părinte (care trebuie să fie `relative` și să aibă dimensiuni). */
  fill?: boolean;
  preload?: boolean;
  quality?: 60 | 72 | 80;
  alt?: string;
  /** Imagine decorativă — textul alternativ este gol. */
  decorative?: boolean;
}

/** Imagine ForceCar cu placeholder blur și fallback controlat dacă fișierul lipsește. */
export function FcImage({ image, sizes, className = "", fill = false, preload = false, quality = 72, alt, decorative }: FcImageProps) {
  if (!image) return <ImageFallback className={`${fill ? "absolute inset-0" : "aspect-[4/3] w-full"} ${className}`} />;
  const altText = decorative ? "" : (alt ?? image.alt);
  const common = {
    src: image.src,
    sizes,
    quality,
    preload,
    placeholder: "blur" as const,
    blurDataURL: image.blurDataURL,
    style: { objectPosition: image.focal },
  };
  return fill ? (
    <Image {...common} alt={altText} fill className={`object-cover ${className}`} />
  ) : (
    <Image {...common} alt={altText} width={image.width} height={image.height} className={`h-auto w-full ${className}`} />
  );
}

export function ImageFallback({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`flex items-center justify-center bg-ink-800 ${className}`}>
      <span className="text-sm font-extrabold tracking-[0.2em] text-white/25">
        FORCE<span className="text-brand/60">CAR</span>
      </span>
    </div>
  );
}
