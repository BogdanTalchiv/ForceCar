import Link from "next/link";
import { CalendarCheck, Check, Phone, TriangleAlert } from "lucide-react";
import { getBeforeAfterPairs, getImage, getImages } from "@/config/forcecar-images";
import { getService, type ServiceConfig } from "@/config/services";
import { getArticlesForService } from "@/content/articles";
import { getServiceContent } from "@/content/services";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pagePath, servicePath } from "@/i18n/routes";
import { phoneLink } from "@/lib/business-info";
import { crumbsFor } from "@/lib/page-meta";
import { faqNode, serviceNode } from "@/lib/schema";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { BeforeAfterSlider } from "@/components/before-after/BeforeAfterSlider";
import { TrackOnMount } from "@/components/consent/TrackOnMount";
import { FaqList } from "@/components/faq/FaqList";
import { Gallery } from "@/components/gallery/Gallery";
import { FinalCta } from "@/components/home/FinalCta";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageShell } from "@/components/layout/PageShell";
import { ServiceCard } from "@/components/service/ServiceCard";
import { buttonClasses } from "@/components/ui/button";
import { FcImage } from "@/components/ui/FcImage";
import { Section } from "@/components/ui/Section";
import { ServiceIcon } from "@/components/ui/ServiceIcon";

export function ServicePage({ locale, service }: { locale: Locale; service: ServiceConfig }) {
  const dict = getDictionary(locale);
  const t = dict.servicePage;
  const c = getServiceContent(locale, service.id);
  const href = servicePath(locale, service.slugs);
  const crumbs = crumbsFor(locale, "services", { name: c.name, href });
  const image = getImage(service.image, locale);
  const photos = getImages(service.photos.filter((p) => p !== service.image), locale);
  const pairs = getBeforeAfterPairs(service.id)
    .map((p) => ({ ...p, before: getImage(p.before, locale), after: getImage(p.after, locale) }))
    .filter((p) => p.before && p.after);
  const related = service.related.map((id) => getService(id)).filter((s): s is ServiceConfig => Boolean(s));
  const articles = getArticlesForService(locale, service.id);
  const phone = phoneLink();
  const bookingHref = `${pagePath(locale, "booking")}?service=${service.id}`;
  const [firstIntro, ...restIntro] = c.intro;

  return (
    <PageShell
      locale={locale}
      pageRef={{ type: "service", id: service.id, slugs: service.slugs }}
      current="services"
      schema={[crumbs.schema, serviceNode(locale, service), faqNode(c.faq)]}
    >
      <TrackOnMount event="service_view" params={{ service: service.id, locale }} />

      <section className="relative overflow-hidden bg-ink-900 text-white">
        <div className="container-fc grid gap-10 pt-8 pb-12 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-14 lg:pt-10 lg:pb-16">
          <div>
            <Breadcrumbs items={crumbs.items} label={dict.a11y.breadcrumb} />
            <p className="eyebrow mt-8 lg:mt-10">{t.eyebrow}</p>
            <h1 className="mt-4 text-display font-extrabold text-balance">{c.h1}</h1>
            <p className="mt-5 max-w-xl text-lead text-steel-300">{firstIntro}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={bookingHref} className={buttonClasses({ size: "lg", className: "fc-book-glow" })}>
                <CalendarCheck className="size-5" aria-hidden="true" />
                {dict.cta.bookCheck}
              </Link>
              {phone && (
                <a href={phone.href} className={buttonClasses({ variant: "onDark", size: "lg" })} data-track-location="service_hero">
                  <Phone className="size-5" aria-hidden="true" />
                  {phone.label}
                </a>
              )}
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-ink-800 lg:aspect-[5/4]">
            <FcImage image={image} fill preload quality={72} sizes="(min-width: 1024px) 45vw, 100vw" />
            <span className="absolute bottom-4 left-4 flex size-12 items-center justify-center rounded-md bg-brand shadow-float">
              <ServiceIcon name={service.icon} className="size-6" />
            </span>
          </div>
        </div>
      </section>

      <Section labelledBy="symptoms-title">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            {restIntro.map((p) => (
              <p key={p.slice(0, 24)} className="mb-5 text-lead text-muted">
                {p}
              </p>
            ))}
            <h2 id="symptoms-title" className="mt-2 text-2xl font-extrabold sm:text-3xl">
              {t.symptomsTitle}
            </h2>
            <p className="mt-3 text-muted">{t.symptomsLead}</p>
            <ul className="mt-6 space-y-3">
              {c.symptoms.map((s) => (
                <li key={s} className="flex gap-3">
                  <span className="mt-2 h-0.5 w-3 shrink-0 bg-brand" aria-hidden="true" />
                  <span className="leading-relaxed">{s}</span>
                </li>
              ))}
            </ul>
            {c.safety && (
              <div className="mt-8 flex gap-4 rounded-lg bg-brand-soft p-5 ring-1 ring-brand/20" role="note">
                <TriangleAlert className="size-6 shrink-0 text-danger" aria-hidden="true" />
                <div>
                  <p className="font-bold">{t.safetyTitle}</p>
                  <p className="mt-1 leading-relaxed">{c.safety}</p>
                </div>
              </div>
            )}
          </div>
          <div className="rounded-lg bg-mist p-6 sm:p-8">
            <h2 className="text-2xl font-extrabold">{t.checksTitle}</h2>
            <ul className="mt-6 space-y-3.5">
              {c.checks.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md bg-ink-900 text-white">
                    <Check className="size-4" aria-hidden="true" />
                  </span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="dark" labelledBy="steps-title">
        <h2 id="steps-title" className="mb-10 text-h2 font-extrabold">
          {t.stepsTitle}
        </h2>
        <ol className="grid gap-px overflow-hidden rounded-lg bg-white/8 sm:grid-cols-2 lg:grid-cols-4">
          {c.steps.map((step, i) => (
            <li key={step.title} className="bg-ink-900 p-6">
              <span className="text-3xl leading-none font-extrabold text-brand tabular-nums" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 text-lg font-bold">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-steel-300">{step.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      {pairs.length > 0 && (
        <Section labelledBy="service-ba">
          <h2 id="service-ba" className="mb-8 text-h2 font-extrabold">
            {dict.works.beforeAfterTitle}
          </h2>
          <div className="grid gap-8 lg:grid-cols-2">
            {pairs.map((p) => (
              <BeforeAfterSlider key={p.id} id={p.id} before={p.before!} after={p.after!} title={p.title[locale]} labels={dict.beforeAfter} />
            ))}
          </div>
        </Section>
      )}

      {photos.length > 0 && (
        <Section labelledBy="photos-title" tone={pairs.length ? "mist" : "white"}>
          <h2 id="photos-title" className="mb-8 text-h2 font-extrabold">
            {t.photosTitle}
          </h2>
          <Gallery images={photos} labels={dict.gallery} filters={false} />
        </Section>
      )}

      {c.faq.length > 0 && (
        <Section tone="mist" labelledBy="service-faq">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
            <h2 id="service-faq" className="text-h2 font-extrabold">
              {t.faqTitle}
            </h2>
            <FaqList items={c.faq} />
          </div>
        </Section>
      )}

      {articles.length > 0 && (
        <Section labelledBy="service-articles">
          <h2 id="service-articles" className="mb-8 text-2xl font-extrabold">
            {t.articlesTitle}
          </h2>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((a) => (
              <li key={a.id}>
                <ArticleCard locale={locale} article={a} readLabel={dict.cta.readArticle} />
              </li>
            ))}
          </ul>
        </Section>
      )}

      {related.length > 0 && (
        <Section tone={articles.length ? "mist" : "white"} labelledBy="related-title">
          <h2 id="related-title" className="mb-8 text-2xl font-extrabold">
            {t.relatedTitle}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {related.map((s) => (
              <ServiceCard key={s.id} locale={locale} service={s} detailsLabel={dict.cta.details} />
            ))}
          </div>
        </Section>
      )}

      <FinalCta locale={locale} title={t.ctaTitle} text={t.ctaText} />
    </PageShell>
  );
}
