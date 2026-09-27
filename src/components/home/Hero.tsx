import Link from "next/link";
import { CalendarCheck, MapPin, Phone, ShieldCheck } from "lucide-react";
import { business } from "@/config/business";
import { forceCarImages, getImage } from "@/config/forcecar-images";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pagePath } from "@/i18n/routes";
import { phoneLink } from "@/lib/business-info";
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
  const phone = phoneLink();
  const services = serviceLinks(locale);

  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-ink-900 text-white">
      <div className="absolute inset-0">
        <HeroMedia poster={image} />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-r from-ink-900 from-0% via-ink-900/82 via-40% to-ink-900/25 lg:via-36% lg:to-ink-900/10"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgb(11_12_14/0.5))]" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-ink-900 to-transparent" />
      </div>

      <div className="container-fc relative">
        <div className="flex min-h-[32rem] flex-col justify-end py-14 sm:min-h-[36rem] sm:py-16 lg:min-h-[min(44rem,calc(100svh-7.5rem))] lg:max-w-[36rem] lg:justify-center lg:py-20 xl:max-w-[40rem]">
          <p className="eyebrow">{t.eyebrow}</p>
          <h1 id="hero-title" className="mt-5 text-display font-extrabold text-balance">
            {fmt(t.title, { years })}
          </h1>
          <p className="mt-5 max-w-xl text-lead text-steel-300">{t.lead}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={pagePath(locale, "booking")} className={buttonClasses({ size: "lg" })}>
              <CalendarCheck className="size-5" aria-hidden="true" />
              {dict.cta.book}
            </Link>
            {phone ? (
              <a href={phone.href} className={buttonClasses({ variant: "onDark", size: "lg" })} data-track-location="hero">
                <Phone className="size-5" aria-hidden="true" />
                {dict.cta.call}
              </a>
            ) : (
              <Link href={pagePath(locale, "services")} className={buttonClasses({ variant: "onDark", size: "lg" })}>
                {dict.cta.viewServices}
              </Link>
            )}
          </div>

          <ul className="mt-9 grid gap-3 text-sm font-semibold text-white/85 sm:flex sm:flex-wrap sm:gap-x-6">
            <li className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-brand" aria-hidden="true" />
              {fmt(dict.common.experience, { years })}
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="size-4 text-brand" aria-hidden="true" />
              {dict.common.location}
            </li>
            <li className="flex items-center gap-2">
              <CalendarCheck className="size-4 text-brand" aria-hidden="true" />
              {dict.common.quickBooking}
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
