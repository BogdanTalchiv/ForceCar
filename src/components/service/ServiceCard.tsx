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
    <article className="group relative isolate flex min-h-[19rem] flex-col overflow-hidden rounded-lg bg-ink-900 text-white shadow-card ring-1 ring-white/10 transition-[transform,box-shadow,ring-color] duration-300 hover:-translate-y-0.5 hover:ring-brand/55 sm:min-h-[22rem]">
      <div className="absolute inset-0">
        <FcImage
          image={image}
          fill
          decorative
          quality={60}
          sizes="(min-width: 1024px) 24vw, (min-width: 640px) 48vw, 100vw"
          className="transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-ink-950 via-ink-950/55 to-ink-950/15" />
      </div>
      <div className="relative mt-auto flex flex-1 flex-col justify-end p-5">
        {badge && <p className="eyebrow mb-3 text-[0.65rem]">{badge}</p>}
        <span className="flex size-10 items-center justify-center rounded-md bg-brand/90 text-white shadow-float">
          <ServiceIcon name={service.icon} className="size-5" />
        </span>
        <h3 className="mt-4 text-lg leading-snug font-bold">
          <Link href={servicePath(locale, service.slugs)} className="after:absolute after:inset-0 after:content-['']">
            {content.name}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-[0.9375rem] leading-relaxed text-steel-300">{content.short}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-white group-hover:text-brand-bright">
          {detailsLabel}
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </div>
    </article>
  );
}
