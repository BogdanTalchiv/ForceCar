import { business } from "@/config/business";
import { forceCarImages, getImage, getImages } from "@/config/forcecar-images";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pagePath } from "@/i18n/routes";
import { phoneLink, streetAddressLine } from "@/lib/business-info";
import { serviceNamesList } from "@/lib/faq";
import { fmt } from "@/lib/format";
import { crumbsFor } from "@/lib/page-meta";
import { BUSINESS_ID } from "@/lib/schema";
import { absoluteUrl } from "@/lib/seo";
import { FinalCta } from "@/components/home/FinalCta";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageShell } from "@/components/layout/PageShell";
import { FcImage } from "@/components/ui/FcImage";
import { PageHero, Section } from "@/components/ui/Section";

export function AboutPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.about;
  const years = business.experienceYears;
  const crumbs = crumbsFor(locale, "about");
  const services = serviceNamesList(locale);
  const mainImage = getImage(forceCarImages.about, locale);
  const workshop = getImages(["caroserie", "vopsitorie", "fatada"], locale);
  const address = streetAddressLine();
  const phone = phoneLink();

  const facts: [string, string][] = [
    [t.facts.name, business.legalName ? `${business.name} (${business.legalName})` : business.name],
    [t.facts.type, t.facts.typeValue],
    [t.facts.location, address ? `${address}, ${business.address.countryName}` : dict.common.locationLong],
    [t.facts.experience, fmt(t.facts.experienceValue, { years })],
    [t.facts.services, services],
    [t.facts.booking, phone ? `${t.facts.bookingValue} ${t.facts.bookingPhone} (${phone.label})` : t.facts.bookingValue],
    [t.facts.languages, t.facts.languagesValue],
  ];

  const aboutNode = {
    "@type": "AboutPage",
    url: absoluteUrl(pagePath(locale, "about")),
    name: dict.meta.about.title,
    about: { "@id": BUSINESS_ID },
  };

  return (
    <PageShell locale={locale} pageRef={{ type: "page", key: "about" }} current="about" schema={[crumbs.schema, aboutNode]}>
      <PageHero
        eyebrow={t.eyebrow}
        title={t.title}
        lead={fmt(t.lead, { years })}
        breadcrumbs={<Breadcrumbs items={crumbs.items} label={dict.a11y.breadcrumb} />}
      />

      <Section labelledBy="about-experience">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-ink-800">
            <FcImage image={mainImage} fill quality={72} sizes="(min-width: 1024px) 50vw, 100vw" />
          </div>
          <div>
            <h2 id="about-experience" className="text-h2 font-extrabold text-balance">
              {t.experience.title}
            </h2>
            {t.experience.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="mt-5 text-lead text-muted">
                {fmt(p, { years, services })}
              </p>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="dark" labelledBy="about-principles">
        <h2 id="about-principles" className="mb-10 text-h2 font-extrabold">
          {t.principles.title}
        </h2>
        <ol className="grid gap-px overflow-hidden rounded-lg bg-white/8 sm:grid-cols-2 lg:grid-cols-4">
          {t.principles.items.map((item, i) => (
            <li key={item.title} className="bg-ink-900 p-6 lg:p-7">
              <span className="text-4xl leading-none font-extrabold text-brand tabular-nums" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-6 text-h3 font-bold">{item.title}</h3>
              <p className="mt-2 leading-relaxed text-steel-300">{item.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section labelledBy="about-facts">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div>
            <h2 className="text-h2 font-extrabold">{t.audience.title}</h2>
            <p className="mt-5 text-lead text-muted">{t.audience.text}</p>
            {workshop.length > 0 && (
              <ul className="mt-8 grid grid-cols-3 gap-3">
                {workshop.map((img) => (
                  <li key={img.id} className="relative aspect-square overflow-hidden rounded-md bg-ink-800">
                    <FcImage image={img} fill quality={60} sizes="(min-width: 1024px) 14vw, 30vw" />
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <h2 id="about-facts" className="text-2xl font-extrabold">
              {t.facts.title}
            </h2>
            <dl className="mt-6 divide-y divide-line border-y border-line">
              {facts.map(([k, v]) => (
                <div key={k} className="grid gap-1 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6">
                  <dt className="text-sm font-bold text-muted">{k}</dt>
                  <dd className="leading-relaxed">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      <FinalCta locale={locale} />
    </PageShell>
  );
}
