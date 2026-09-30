import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { enabledServices } from "@/config/services";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pagePath } from "@/i18n/routes";
import { buttonClasses } from "@/components/ui/button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/Section";
import { ServiceCard } from "@/components/service/ServiceCard";

export function ServicesGrid({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.home.services;

  return (
    <section aria-labelledby="services-title" className="relative overflow-hidden bg-ink-950 py-16 text-white sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[22rem] opacity-40 sm:h-[26rem]" aria-hidden="true">
        <Image
          src="/images/forcecar/_og/background1.png"
          alt=""
          fill
          quality={72}
          sizes="100vw"
          className="object-cover object-[72%_center]"
        />
        <div className="absolute inset-0 bg-linear-to-b from-ink-950/40 via-ink-950/85 to-ink-950" />
      </div>
      <div className="container-fc relative">
        <SectionHeader
          id="services-title"
          eyebrow={t.eyebrow}
          title={t.title}
          lead={t.lead}
          dark
          action={
            <Link href={pagePath(locale, "services")} className={buttonClasses({ variant: "onDark" })}>
              {dict.cta.allServices}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          }
        />
        <Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {enabledServices.map((s) => (
              <ServiceCard
                key={s.id}
                locale={locale}
                service={s}
                detailsLabel={dict.cta.details}
                badge={s.id === "diagnostics" ? t.featuredLabel : undefined}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
