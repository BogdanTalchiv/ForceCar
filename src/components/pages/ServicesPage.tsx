import Link from "next/link";
import { ArrowRight, ScanSearch } from "lucide-react";
import { enabledServices, getService } from "@/config/services";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pagePath, servicePath } from "@/i18n/routes";
import { crumbsFor } from "@/lib/page-meta";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageShell } from "@/components/layout/PageShell";
import { FinalCta } from "@/components/home/FinalCta";
import { ServiceCard } from "@/components/service/ServiceCard";
import { buttonClasses } from "@/components/ui/button";
import { PageHero, Section } from "@/components/ui/Section";

export function ServicesPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.servicesPage;
  const crumbs = crumbsFor(locale, "services");
  const diagnostics = getService("diagnostics");
  const groups = (["mechanical", "body"] as const)
    .map((g) => ({ id: g, ...t.groups[g], services: enabledServices.filter((s) => s.group === g) }))
    .filter((g) => g.services.length > 0);

  return (
    <PageShell locale={locale} pageRef={{ type: "page", key: "services" }} current="services" schema={[crumbs.schema]}>
      <PageHero eyebrow={t.eyebrow} title={t.title} lead={t.lead} breadcrumbs={<Breadcrumbs items={crumbs.items} label={dict.a11y.breadcrumb} />} />

      {groups.map((g, i) => (
        <Section key={g.id} tone={i % 2 === 0 ? "white" : "mist"} labelledBy={`group-${g.id}`}>
          <div className="mb-8 max-w-2xl">
            <h2 id={`group-${g.id}`} className="text-h2 font-extrabold">
              {g.title}
            </h2>
            <p className="mt-3 text-lead text-muted">{g.text}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {g.services.map((s) => (
              <ServiceCard key={s.id} locale={locale} service={s} detailsLabel={dict.cta.details} />
            ))}
          </div>
        </Section>
      ))}

      <Section tone={groups.length % 2 === 0 ? "white" : "mist"}>
        <div className="flex flex-col gap-6 rounded-lg bg-ink-900 p-7 text-white sm:p-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex gap-5">
            <span className="hidden size-12 shrink-0 items-center justify-center rounded-md bg-brand sm:flex">
              <ScanSearch className="size-6" aria-hidden="true" />
            </span>
            <div className="max-w-2xl">
              <h2 className="text-2xl font-extrabold">{t.notSure.title}</h2>
              <p className="mt-3 leading-relaxed text-steel-300">{t.notSure.text}</p>
            </div>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row lg:flex-col">
            <Link href={pagePath(locale, "booking")} className={buttonClasses()}>
              {dict.cta.bookCheck}
            </Link>
            {diagnostics && (
              <Link href={servicePath(locale, diagnostics.slugs)} className={buttonClasses({ variant: "onDark" })}>
                {dict.cta.details}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            )}
          </div>
        </div>
      </Section>

      <FinalCta locale={locale} />
    </PageShell>
  );
}
