import Image from "next/image";
import { business } from "@/config/business";

const sizes = {
  sm: "h-9",
  md: "h-12",
  lg: "h-16",
} as const;

/**
 * Logo oficial ForceCar. Dacă `business.logo` lipsește, se folosește wordmark-ul tipografic.
 */
export function Logo({
  tagline,
  className = "",
  size = "md",
}: {
  tagline?: string;
  className?: string;
  size?: keyof typeof sizes;
}) {
  if (business.logo) {
    return (
      <Image
        src={business.logo}
        alt="ForceCar"
        width={2117}
        height={743}
        className={`${sizes[size]} w-auto max-w-full object-contain ${className}`}
        preload
      />
    );
  }

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <span className="text-[1.375rem] leading-none font-extrabold tracking-[0.04em] text-white">
        FORCE<span className="text-brand">CAR</span>
      </span>
      {tagline && (
        <span className="hidden border-l border-white/20 pl-3 text-[0.6875rem] leading-tight font-semibold tracking-[0.12em] text-steel-300 uppercase sm:inline lg:hidden xl:inline">
          {tagline}
        </span>
      )}
    </span>
  );
}
