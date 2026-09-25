import Image from "next/image";
import { business } from "@/config/business";

/**
 * Logo: fișierul oficial dacă este configurat în business.logo,
 * altfel wordmark-ul tipografic ForceCar (nu un logo inventat).
 */
export function Logo({ tagline, className = "" }: { tagline?: string; className?: string }) {
  if (business.logo) {
    return <Image src={business.logo} alt="ForceCar" width={160} height={40} className={`h-9 w-auto ${className}`} preload />;
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
