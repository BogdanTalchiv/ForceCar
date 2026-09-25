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
export function ServiceCard({ locale, service, detailsLabel }: { locale: Locale; service: ServiceConfig; detailsLabel: string }) {
  const content = getServiceContent(locale, service.id);
  const image = getImage(service.image, locale);
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-lg bg-white shadow-card ring-1 ring-line transition-shadow hover:ring-ink-900/30">
      <div className="relative aspect-[4/3] overflow-hidden bg-ink-800">
        <FcImage
          image={image}
          fill
          decorative
          quality={60}
          sizes="(min-width: 1024px) 24vw, (min-width: 640px) 48vw, 100vw"
          className="transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2.5 text-brand">
          <ServiceIcon name={service.icon} className="size-5" />
        </div>
        <h3 className="mt-3 text-lg leading-snug font-bold">
          <Link href={servicePath(locale, service.slugs)} className="after:absolute after:inset-0 after:content-['']">
            {content.name}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 text-[0.9375rem] leading-relaxed text-muted">{content.short}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-bold text-text group-hover:text-brand">
          {detailsLabel}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </div>
    </article>
  );
}
