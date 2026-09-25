import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { enabledServices } from "@/config/services";
import { getServiceContent } from "@/content/services";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { servicePath } from "@/i18n/routes";
import { getGeneralFaq } from "@/lib/faq";
import { crumbsFor } from "@/lib/page-meta";
import { faqNode } from "@/lib/schema";
import { FaqList } from "@/components/faq/FaqList";
import { FinalCta } from "@/components/home/FinalCta";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageShell } from "@/components/layout/PageShell";
import { PageHero, Section } from "@/components/ui/Section";

export function FaqPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.faqPage;
  const crumbs = crumbsFor(locale, "faq");
  const general = getGeneralFaq(locale);
  const byService = enabledServices
    .map((s) => ({ service: s, content: getServiceContent(locale, s.id) }))
    .filter((x) => x.content.faq.length > 0);
  const all = [...general, ...byService.flatMap((x) => x.content.faq)];

  return (
    <PageShell locale={locale} pageRef={{ type: "page", key: "faq" }} current="faq" schema={[crumbs.schema, faqNode(all)]}>
      <PageHero eyebrow={t.eyebrow} title={t.title} lead={t.lead} breadcrumbs={<Breadcrumbs items={crumbs.items} label={dict.a11y.breadcrumb} />} />

      <Section labelledBy="faq-general">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <h2 id="faq-general" className="text-h2 font-extrabold">
            {t.generalTitle}
          </h2>
          <FaqList items={general} />
        </div>
      </Section>

      <Section tone="mist" labelledBy="faq-services">
        <h2 id="faq-services" className="mb-10 text-h2 font-extrabold">
          {t.servicesTitle}
        </h2>
        <div className="grid gap-x-12 gap-y-12 lg:grid-cols-2">
          {byService.map(({ service, content }) => (
            <div key={service.id}>
              <div className="mb-2 flex items-baseline justify-between gap-4">
                <h3 className="text-xl font-extrabold">{content.name}</h3>
                <Link href={servicePath(locale, service.slugs)} className="inline-flex shrink-0 items-center gap-1 text-sm font-bold text-brand hover:underline">
                  {dict.cta.details}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
              <FaqList items={content.faq} />
            </div>
          ))}
        </div>
      </Section>

      <FinalCta locale={locale} />
    </PageShell>
  );
}
