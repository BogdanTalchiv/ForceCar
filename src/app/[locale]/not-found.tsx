import Link from "next/link";
import { locale as rootLocale } from "next/root-params";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pagePath } from "@/i18n/routes";
import { serviceLinks } from "@/lib/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { buttonClasses } from "@/components/ui/button";
import { ServiceIcon } from "@/components/ui/ServiceIcon";

export default async function NotFound() {
  const raw = await rootLocale();
  const locale: Locale = isLocale(raw) ? raw : "ro";
  const dict = getDictionary(locale);
  const t = dict.notFound;

  return (
    <PageShell locale={locale} pageRef={{ type: "page", key: "home" }}>
      <title>{`${t.title} | ForceCar`}</title>
      <div className="bg-ink-900 text-white">
        <div className="container-fc py-20 lg:py-28">
          <p className="text-7xl font-extrabold text-brand tabular-nums">{t.code}</p>
          <h1 className="mt-4 text-h2 font-extrabold">{t.title}</h1>
          <p className="mt-4 max-w-xl text-lead text-steel-300">{t.text}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={pagePath(locale, "home")} className={buttonClasses()}>
              {dict.cta.backHome}
            </Link>
            <Link href={pagePath(locale, "booking")} className={buttonClasses({ variant: "onDark" })}>
              {dict.cta.requestBooking}
            </Link>
            <Link href={pagePath(locale, "contact")} className={buttonClasses({ variant: "onDark" })}>
              {dict.nav.contact}
            </Link>
          </div>
        </div>
      </div>
      <div className="container-fc py-14">
        <h2 className="text-xl font-extrabold">{dict.nav.services}</h2>
        <ul className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {serviceLinks(locale).map((s) => (
            <li key={s.id}>
              <Link href={s.href} className="flex items-center gap-3 rounded-md p-3 font-semibold ring-1 ring-line hover:ring-ink-900">
                <ServiceIcon name={s.icon} className="size-5 text-brand" />
                {s.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </PageShell>
  );
}
