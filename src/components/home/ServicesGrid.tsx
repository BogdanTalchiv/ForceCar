import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { enabledServices, getService } from "@/config/services";
import { getServiceContent } from "@/content/services";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pagePath, servicePath } from "@/i18n/routes";
import { buttonClasses } from "@/components/ui/button";
import { Section, SectionHeader } from "@/components/ui/Section";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { ServiceCard } from "@/components/service/ServiceCard";

export function ServicesGrid({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.home.services;
  const diagnostics = getService("diagnostics");
  const others = enabledServices.filter((s) => s.id !== "diagnostics");

  return (
    <Section tone="mist" labelledBy="services-title">
      <SectionHeader
        id="services-title"
        eyebrow={t.eyebrow}
        title={t.title}
        lead={t.lead}
        action={
          <Link href={pagePath(locale, "services")} className={buttonClasses({ variant: "outline" })}>
            {dict.cta.allServices}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        }
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {diagnostics && (
          <article className="relative flex flex-col overflow-hidden rounded-lg bg-ink-900 p-6 text-white sm:col-span-2 lg:col-span-1">
            <div aria-hidden="true" className="absolute -top-16 -right-16 size-48 rounded-full border-[18px] border-white/[0.04]" />
            <p className="eyebrow">{t.featuredLabel}</p>
            <span className="mt-6 flex size-12 items-center justify-center rounded-md bg-brand">
              <ServiceIcon name="diagnostics" className="size-6" />
            </span>
            <h3 className="mt-5 text-xl font-extrabold">
              <Link href={servicePath(locale, diagnostics.slugs)} className="hover:underline">
                {getServiceContent(locale, "diagnostics").name}
              </Link>
            </h3>
            <p className="mt-3 leading-relaxed text-steel-300">{getServiceContent(locale, "diagnostics").short}</p>
            <div className="mt-auto flex flex-col gap-2 pt-6">
              <Link href={pagePath(locale, "booking")} className={buttonClasses({ size: "md", full: true })}>
                {dict.cta.bookCheck}
              </Link>
              <Link
                href={servicePath(locale, diagnostics.slugs)}
                className="inline-flex items-center justify-center gap-1.5 py-2 text-sm font-bold text-white/80 hover:text-white"
              >
                {dict.cta.details}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </article>
        )}
        {others.map((s) => (
          <ServiceCard key={s.id} locale={locale} service={s} detailsLabel={dict.cta.details} />
        ))}
      </div>
    </Section>
  );
}
