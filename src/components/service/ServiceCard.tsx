import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getImage } from "@/config/forcecar-images";
import type { ServiceConfig } from "@/config/services";
import { getServiceContent } from "@/content/services";
import type { Locale } from "@/i18n/config";
import { externalLinkProps, serviceHref } from "@/lib/navigation";
import { FcImage } from "@/components/ui/FcImage";
import { ServiceIcon } from "@/components/ui/ServiceIcon";

/** Card de serviciu: întreaga suprafață este clicabilă, titlul rămâne link-ul accesibil. */
export function ServiceCard({
  locale,
  service,
  detailsLabel,
  badge,
  className = "",
  span,
}: {
  locale: Locale;
  service: ServiceConfig;
  detailsLabel: string;
  badge?: string;
  className?: string;
  /** Cardul ocupă 2 sau 4 coloane: imagine mai mare, gradient lateral, text în stânga. */
  span?: 2 | 4;
}) {
  const content = getServiceContent(locale, service.id);
  const image = getImage(service.image, locale);
  const link = serviceHref(locale, service);
  const wide = span === 2 || span === 4;
  const spanClass =
    span === 4 ? "sm:col-span-2 lg:col-span-4 lg:min-h-[23rem]" : span === 2 ? "sm:col-span-2" : "";
  const sizes =
    span === 4
      ? "(min-width: 1280px) 1280px, 100vw"
      : span === 2
        ? "(min-width: 1024px) 640px, 100vw"
        : "(min-width: 1024px) 768px, (min-width: 640px) 100vw, 100vw";
  return (
    <article
      className={`group relative isolate flex min-h-[16.5rem] flex-col overflow-hidden rounded-lg bg-ink-900 text-white ring-1 ring-white/10 transition-[ring-color] duration-300 hover:ring-white/28 sm:min-h-[19.5rem] ${spanClass} ${className}`}
    >
      <div className="absolute inset-0">
        <FcImage
          image={image}
          fill
          decorative
          quality={80}
          sizes={sizes}
          className={`transition-transform duration-700 ease-out group-hover:scale-[1.03] ${wide ? "brightness-[1.2]" : ""}`}
        />
        {wide ? (
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-t from-ink-950 from-10% via-ink-950/40 to-transparent sm:bg-linear-to-r sm:from-ink-950/90 sm:from-0% sm:via-ink-950/30 sm:via-45%"
          />
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-t from-ink-950 from-15% via-ink-950/50 to-ink-950/10"
          />
        )}
      </div>
      <div
        className={`relative mt-auto flex flex-1 flex-col justify-end p-5 ${
          span === 4 ? "sm:max-w-xl sm:p-7" : span === 2 ? "sm:max-w-sm sm:p-6" : ""
        }`}
      >
        {badge && <p className="eyebrow mb-3 text-[0.65rem]">{badge}</p>}
        <span className="flex size-10 items-center justify-center rounded-md bg-white/10 text-white ring-1 ring-white/15 transition-[background-color,ring-color] duration-300 group-hover:bg-brand group-hover:ring-brand">
          <ServiceIcon name={service.icon} className="size-5" />
        </span>
        <h3 className="mt-4 text-lg leading-snug font-bold">
          <Link href={link.href} {...externalLinkProps(link.external)} className="after:absolute after:inset-0 after:content-['']">
            {content.name}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-[0.9375rem] leading-relaxed text-steel-300">{content.short}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-white">
          {detailsLabel}
          <ArrowRight className="btn-arrow size-4" aria-hidden="true" />
        </span>
      </div>
    </article>
  );
}
