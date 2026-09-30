import Link from "next/link";
import { CalendarCheck, Globe, MapPin, ShieldCheck } from "lucide-react";
import { business } from "@/config/business";
import { forceCarImages, getImage } from "@/config/forcecar-images";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pagePath } from "@/i18n/routes";
import { fmt } from "@/lib/format";
import { serviceLinks, type ServiceLink } from "@/lib/navigation";
import { buttonClasses } from "@/components/ui/button";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { HeroMedia } from "./HeroMedia";

function HeroServicePills({ services, hidden }: { services: ServiceLink[]; hidden?: boolean }) {
  return (
    <ul className="flex items-center gap-2 pr-2" aria-hidden={hidden || undefined}>
      {services.map((s) => (
        <li key={`${hidden ? "dup" : "src"}-${s.id}`} className="shrink-0">
          <Link
            href={s.href}
            tabIndex={hidden ? -1 : undefined}
            className="flex h-9 items-center gap-2 rounded-md px-3 text-sm font-semibold whitespace-nowrap text-white/80 ring-1 ring-white/12 transition-colors hover:bg-white/8 hover:text-white"
          >
            <ServiceIcon name={s.icon} className="size-4 text-brand" />
            {s.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function Hero({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.home.hero;
  const years = business.experienceYears;
  const image = getImage(forceCarImages.hero, locale);
  const services = serviceLinks(locale);

  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-ink-900 text-white">
      <div className="absolute inset-0">
        <HeroMedia poster={image} />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-r from-ink-950 from-0% via-ink-950/88 via-42% to-ink-950/30 lg:via-38% lg:to-ink-950/15"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgb(11_12_14/0.55))]" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-ink-950 to-transparent" />
      </div>

      <div className="container-fc relative">
        <div className="flex min-h-[28rem] flex-col justify-end py-10 sm:min-h-[32rem] sm:py-12 lg:min-h-[min(34rem,calc(100svh-10.5rem))] lg:max-w-[38rem] lg:py-12 xl:max-w-[42rem]">
          <p className="eyebrow">{t.eyebrow}</p>
          <h1 id="hero-title" className="mt-4 text-display font-extrabold text-balance">
            <span className="block">{t.kicker}</span>
            <span className="mt-1 block">
              <span className="text-brand">{t.accent}</span> {t.rest}
            </span>
          </h1>
          <p className="mt-4 max-w-xl text-lead text-steel-300">{fmt(t.lead, { years })}</p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href={pagePath(locale, "booking")} className={buttonClasses({ size: "lg" })}>
              <CalendarCheck className="size-5" aria-hidden="true" />
              {dict.cta.book}
            </Link>
            <Link href={pagePath(locale, "works")} className={buttonClasses({ variant: "onDark", size: "lg" })}>
              {dict.cta.worksShort}
            </Link>
          </div>

          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm">
            <li className="flex items-center gap-2.5">
              <ShieldCheck className="size-4 shrink-0 text-brand" aria-hidden="true" />
              <span>
                <span className="font-extrabold tabular-nums">{fmt(t.stats.experienceValue, { years })}</span>
                <span className="ml-1.5 text-steel-300">{t.stats.experienceLabel}</span>
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <Globe className="size-4 shrink-0 text-brand" aria-hidden="true" />
              <span>
                <span className="font-extrabold">{t.stats.languagesValue}</span>
                <span className="ml-1.5 text-steel-300">{t.stats.languagesLabel}</span>
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <MapPin className="size-4 shrink-0 text-brand" aria-hidden="true" />
              <span>
                <span className="font-extrabold">{t.stats.locationValue}</span>
                <span className="ml-1.5 text-steel-300">{t.stats.locationLabel}</span>
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/8 bg-ink-950/80 backdrop-blur-md">
        <div className="container-fc flex items-center gap-5 py-3.5">
          <p className="hidden shrink-0 text-xs font-bold tracking-[0.14em] text-steel-400 uppercase md:block">{t.servicesLabel}</p>
          <div className="hero-services-ticker min-w-0 flex-1" role="region" aria-label={t.servicesLabel}>
            <div className="hero-services-ticker__track">
              <HeroServicePills services={services} />
              <HeroServicePills services={services} hidden />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
