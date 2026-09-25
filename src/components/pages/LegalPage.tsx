import { business } from "@/config/business";
import { analyticsConfig, consentRequired, siteConfig } from "@/config/site";
import { videoReviews } from "@/config/reviews";
import { getLegalContent } from "@/content/legal";
import type { CookieRowKey, LegalSection } from "@/content/legal/types";
import { localeMeta, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { emailLink, mapsEmbedUrl, phoneLink } from "@/lib/business-info";
import { crumbsFor } from "@/lib/page-meta";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CookieSettingsButton } from "@/components/layout/CookieSettingsButton";
import { PageShell } from "@/components/layout/PageShell";
import { PageHero } from "@/components/ui/Section";

const contactPhrases: Record<Locale, { email: string; phone: string; or: string; none: string }> = {
  ro: { email: "la adresa {v}", phone: "la telefon {v}", or: " sau ", none: "prin pagina de contact a site-ului" },
  ru: { email: "по email {v}", phone: "по телефону {v}", or: " или ", none: "через страницу контактов на сайте" },
  it: { email: "all'indirizzo {v}", phone: "al numero {v}", or: " oppure ", none: "tramite la pagina contatti del sito" },
  en: { email: "at {v}", phone: "by phone at {v}", or: " or ", none: "through the website's contact page" },
};

function contactPhrase(locale: Locale): string {
  const p = contactPhrases[locale];
  const email = emailLink();
  const phone = phoneLink();
  const parts = [email && p.email.replace("{v}", email.label), phone && p.phone.replace("{v}", phone.label)].filter(Boolean);
  return parts.length ? parts.join(p.or) : p.none;
}

function Sections({ sections, vars }: { sections: LegalSection[]; vars: Record<string, string> }) {
  const fill = (s: string) => s.replace(/\{(\w+)\}/g, (m, k: string) => vars[k] ?? m);
  return (
    <>
      {sections.map((s) => (
        <section key={s.h}>
          <h2>{s.h}</h2>
          {s.p?.map((p) => <p key={p.slice(0, 30)}>{fill(p)}</p>)}
          {s.ul && (
            <ul>
              {s.ul.map((li) => (
                <li key={li.slice(0, 30)}>{fill(li)}</li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </>
  );
}

const cookieNames: Record<CookieRowKey, string> = {
  locale: "fc_locale",
  consent: "fc_consent",
  bookingDraft: "fc_booking_draft (sessionStorage)",
  utm: "fc_utm (sessionStorage / localStorage)",
  ga: "_ga, _ga_*",
  ads: "_gcl_au",
  meta: "_fbp",
  youtube: "youtube-nocookie.com",
  maps: "google.com/maps",
};

export function LegalPage({ locale, kind }: { locale: Locale; kind: "privacy" | "cookies" }) {
  const dict = getDictionary(locale);
  const legal = getLegalContent(locale);
  const crumbs = crumbsFor(locale, kind);
  const vars = {
    controller: business.legalName ? `${business.legalName} (ForceCar)` : "ForceCar",
    contact: contactPhrase(locale),
  };
  const updated = new Intl.DateTimeFormat(localeMeta[locale].dateLocale, { dateStyle: "long" }).format(
    new Date(`${siteConfig.contentUpdatedAt}T12:00:00Z`),
  );

  const { gtmId, ga4Id, googleAdsId, metaPixelId } = analyticsConfig;
  const rows: { key: CookieRowKey; category: keyof typeof legal.cookies.categories }[] = [
    { key: "locale", category: "necessary" },
    ...(consentRequired ? [{ key: "consent" as const, category: "necessary" as const }] : []),
    { key: "bookingDraft", category: "necessary" },
    { key: "utm", category: "necessary" },
    ...(gtmId || ga4Id ? [{ key: "ga" as const, category: "analytics" as const }] : []),
    ...(gtmId || googleAdsId ? [{ key: "ads" as const, category: "marketing" as const }] : []),
    ...(metaPixelId ? [{ key: "meta" as const, category: "marketing" as const }] : []),
    ...(videoReviews.length ? [{ key: "youtube" as const, category: "external" as const }] : []),
    ...(mapsEmbedUrl() ? [{ key: "maps" as const, category: "external" as const }] : []),
  ];

  const title = dict.meta[kind].title;

  return (
    <PageShell locale={locale} pageRef={{ type: "page", key: kind }} schema={[crumbs.schema]}>
      <PageHero title={title} breadcrumbs={<Breadcrumbs items={crumbs.items} label={dict.a11y.breadcrumb} />}>
        <p className="mt-5 text-sm text-steel-300">
          {legal.updatedLabel}: <time dateTime={siteConfig.contentUpdatedAt}>{updated}</time>
        </p>
      </PageHero>

      <div className="container-fc py-14 lg:py-20">
        <div className="prose-fc mx-auto max-w-3xl">
          {kind === "privacy" ? (
            <>
              <p className="text-lead text-muted">{legal.privacy.intro}</p>
              <Sections sections={legal.privacy.sections} vars={vars} />
            </>
          ) : (
            <>
              <p className="text-lead text-muted">{legal.cookies.intro}</p>
              <Sections sections={legal.cookies.sections} vars={vars} />
              <h2>{legal.cookies.tableTitle}</h2>
              {!consentRequired && <p>{dict.consent.noTracking}</p>}
              <div className="overflow-x-auto rounded-lg ring-1 ring-line">
                <table className="w-full min-w-[36rem] text-left text-sm">
                  <thead className="bg-mist">
                    <tr>
                      <th className="px-4 py-3 font-bold">{legal.cookies.columns.name}</th>
                      <th className="px-4 py-3 font-bold">{legal.cookies.columns.purpose}</th>
                      <th className="px-4 py-3 font-bold">{legal.cookies.columns.duration}</th>
                      <th className="px-4 py-3 font-bold">{legal.cookies.columns.category}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {rows.map((r) => (
                      <tr key={r.key} className="align-top">
                        <td className="px-4 py-3 font-mono text-xs break-all">{cookieNames[r.key]}</td>
                        <td className="px-4 py-3">{legal.cookies.rows[r.key].purpose}</td>
                        <td className="px-4 py-3">{legal.cookies.rows[r.key].duration}</td>
                        <td className="px-4 py-3">{legal.cookies.categories[r.category]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Sections sections={[legal.cookies.manage]} vars={vars} />
              {consentRequired && (
                <p>
                  <span className="inline-flex h-11 items-center rounded-md bg-ink-900 px-5 font-bold text-white [&_button]:text-white">
                    <CookieSettingsButton label={dict.consent.settingsLink} />
                  </span>
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </PageShell>
  );
}
