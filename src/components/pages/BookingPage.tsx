import { CircleAlert, CircleCheck, Phone, ShieldCheck } from "lucide-react";
import { enabledServices } from "@/config/services";
import { isUploadsEnabled } from "@/config/site";
import { getServiceContent } from "@/content/services";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pagePath } from "@/i18n/routes";
import { phoneLink } from "@/lib/business-info";
import { crumbsFor } from "@/lib/page-meta";
import { BookingForm } from "@/components/booking/BookingForm";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageShell } from "@/components/layout/PageShell";
import { PageHero } from "@/components/ui/Section";

export function BookingPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.booking;
  const crumbs = crumbsFor(locale, "booking");
  const phone = phoneLink();
  const yearMax = new Date().getFullYear() + 1;

  return (
    <PageShell locale={locale} pageRef={{ type: "page", key: "booking" }} current="booking" schema={[crumbs.schema]}>
      <PageHero eyebrow={t.eyebrow} title={t.title} lead={t.lead} breadcrumbs={<Breadcrumbs items={crumbs.items} label={dict.a11y.breadcrumb} />} />

      <div className="bg-mist py-10 sm:py-14 lg:py-16">
        <div className="container-fc grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="rounded-lg bg-white p-5 shadow-card ring-1 ring-line sm:p-8 lg:p-10">
            {/* Rezultatul trimiterii fără JavaScript (redirecționare 303 cu ancoră). */}
            <div id="booking-success" className="booking-result mb-8 rounded-lg bg-success-soft p-6 ring-1 ring-success/20" role="status">
              <CircleCheck className="size-8 text-success" aria-hidden="true" />
              <p className="mt-3 text-xl font-extrabold">{t.success.title}</p>
              <p className="mt-2 text-lg">{t.success.text}</p>
            </div>
            <div id="booking-error" className="booking-result mb-8 rounded-lg bg-brand-soft p-6 ring-1 ring-brand/25" role="alert">
              <CircleAlert className="size-8 text-danger" aria-hidden="true" />
              <p className="mt-3 text-xl font-extrabold">{t.failure.title}</p>
              <p className="mt-2">{phone ? t.failure.withPhone.replace("{phone}", phone.label) : t.failure.withoutPhone}</p>
            </div>

            <BookingForm
              locale={locale}
              labels={t}
              optionalLabel={dict.common.optional}
              services={enabledServices.map((s) => ({ id: s.id, label: getServiceContent(locale, s.id).name }))}
              uploadsEnabled={isUploadsEnabled()}
              phone={phone}
              privacyHref={pagePath(locale, "privacy")}
              yearMax={yearMax}
            />
          </div>

          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-lg bg-ink-900 p-6 text-white">
              <h2 className="text-lg font-extrabold">{t.aside.title}</h2>
              <ol className="mt-5 space-y-4">
                {t.aside.steps.map((step, i) => (
                  <li key={step} className="flex gap-3">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-brand text-sm font-bold tabular-nums">{i + 1}</span>
                    <span className="leading-relaxed text-steel-300">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
            {phone && (
              <div className="rounded-lg bg-white p-6 ring-1 ring-line">
                <p className="font-bold">{t.aside.direct}</p>
                <a href={phone.href} className="mt-3 flex items-center gap-2 text-xl font-extrabold hover:text-brand" data-track-location="booking_aside">
                  <Phone className="size-5 text-brand" aria-hidden="true" />
                  {phone.label}
                </a>
              </div>
            )}
            <p className="flex gap-3 px-1 text-sm leading-relaxed text-muted">
              <ShieldCheck className="size-5 shrink-0 text-success" aria-hidden="true" />
              {t.aside.privacy}
            </p>
          </aside>
        </div>
      </div>
    </PageShell>
  );
}
