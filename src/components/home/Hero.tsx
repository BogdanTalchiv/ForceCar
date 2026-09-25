import Link from "next/link";
import { CalendarCheck, MapPin, Phone, ShieldCheck } from "lucide-react";
import { business } from "@/config/business";
import { forceCarImages, getImage } from "@/config/forcecar-images";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pagePath } from "@/i18n/routes";
import { phoneLink } from "@/lib/business-info";
import { fmt } from "@/lib/format";
import { serviceLinks } from "@/lib/navigation";
import { buttonClasses } from "@/components/ui/button";
import { FcImage } from "@/components/ui/FcImage";
import { ServiceIcon } from "@/components/ui/ServiceIcon";

export function Hero({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.home.hero;
  const years = business.experienceYears;
  const image = getImage(forceCarImages.hero, locale);
  const phone = phoneLink();

  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-ink-900 text-white">
      {/* Mobil: fotografia deasupra textului. Desktop: fotografia în dreapta, mecanicul rămâne vizibil. */}
      <div className="relative aspect-[4/3] sm:aspect-[16/9] lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:w-[58%]">
        <FcImage image={image} fill preload quality={72} sizes="(min-width: 1024px) 58vw, 100vw" />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-ink-900 via-ink-900/10 via-45% to-transparent lg:bg-linear-to-r lg:from-ink-900 lg:via-ink-900/0 lg:via-28% lg:to-transparent"
        />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 hidden h-40 bg-linear-to-t from-ink-900/80 to-transparent lg:block" />
      </div>

      <div className="container-fc relative">
        <div className="-mt-14 pb-12 sm:-mt-24 sm:pb-14 lg:mt-0 lg:flex lg:min-h-[min(44rem,calc(100svh-7.5rem))] lg:max-w-[34rem] lg:flex-col lg:justify-center lg:py-20 xl:max-w-[38rem]">
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

      <div className="relative border-t border-white/8 bg-ink-950/70 backdrop-blur-sm">
        <div className="container-fc flex items-center gap-5 py-3.5">
          <p className="hidden shrink-0 text-xs font-bold tracking-[0.14em] text-steel-400 uppercase md:block">{t.servicesLabel}</p>
          <ul className="-mx-1 flex gap-2 overflow-x-auto px-1 py-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" aria-label={t.servicesLabel}>
            {serviceLinks(locale).map((s) => (
              <li key={s.id} className="shrink-0">
                <Link
                  href={s.href}
                  className="flex h-9 items-center gap-2 rounded-md px-3 text-sm font-semibold text-white/80 ring-1 ring-white/12 transition-colors hover:bg-white/8 hover:text-white"
                >
                  <ServiceIcon name={s.icon} className="size-4 text-brand" />
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
