import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getImage } from "@/config/forcecar-images";
import type { ServiceConfig } from "@/config/services";
import { getServiceContent } from "@/content/services";
import type { Locale } from "@/i18n/config";
import { servicePath } from "@/i18n/routes";
import { FcImage } from "@/components/ui/FcImage";
import { ServiceIcon } from "@/components/ui/ServiceIcon";

/** Card de serviciu: întreaga suprafață este clicabilă, titlul rămâne link-ul accesibil. */
export function ServiceCard({
  locale,
  service,
  detailsLabel,
  badge,
}: {
  locale: Locale;
  service: ServiceConfig;
  detailsLabel: string;
  badge?: string;
}) {
  const content = getServiceContent(locale, service.id);
  const image = getImage(service.image, locale);
  return (
    <article
      className="group relative isolate flex min-h-[16.5rem] flex-col overflow-hidden rounded-lg bg-ink-900 text-white ring-1 ring-white/10 transition-[ring-color] duration-300 hover:ring-white/28 sm:min-h-[19.5rem]"
    >
      <div className="absolute inset-0">
        <FcImage
          image={image}
          fill
          decorative
          quality={60}
          sizes="(min-width: 1024px) 24vw, (min-width: 640px) 48vw, 100vw"
          className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-ink-950 from-15% via-ink-950/50 to-ink-950/10"
        />
      </div>
      <div className="relative mt-auto flex flex-1 flex-col justify-end p-5">
        {badge && <p className="eyebrow mb-3 text-[0.65rem]">{badge}</p>}
        <span className="flex size-10 items-center justify-center rounded-md bg-white/10 text-white ring-1 ring-white/15 transition-[background-color,ring-color] duration-300 group-hover:bg-brand group-hover:ring-brand">
          <ServiceIcon name={service.icon} className="size-5" />
        </span>
        <h3 className="mt-4 text-lg leading-snug font-bold">
          <Link href={servicePath(locale, service.slugs)} className="after:absolute after:inset-0 after:content-['']">
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
