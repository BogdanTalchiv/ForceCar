import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pagePath } from "@/i18n/routes";
import { buttonClasses } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/Section";

export function ProcessSection({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.home.process;
  return (
    <section aria-labelledby="process-title" className="bg-ink-900 py-16 text-white sm:py-20 lg:py-24">
      <div className="container-fc">
        <SectionHeader
          id="process-title"
          eyebrow={t.eyebrow}
          title={t.title}
          dark
          action={
            <Link href={pagePath(locale, "booking")} className={buttonClasses()}>
              {dict.cta.book}
            </Link>
          }
        />
        <ol className="relative grid gap-0 sm:gap-4 lg:grid-cols-4 lg:gap-6">
          <span
            aria-hidden="true"
            className="process-line pointer-events-none absolute top-8 right-[12.5%] left-[12.5%] hidden h-px bg-white/15 lg:block"
          />
          {t.steps.map((step, i) => (
            <li
              key={step.title}
              className="relative border-l border-white/15 py-6 pl-6 sm:border-l-0 sm:py-0 sm:pl-0 lg:pt-0"
            >
              <span
                aria-hidden="true"
                className="absolute top-7 -left-[5px] size-2.5 rounded-full bg-brand ring-4 ring-ink-900 sm:hidden"
              />
              <span className="relative z-10 mb-5 flex size-16 items-center justify-center rounded-full bg-ink-800 text-2xl font-extrabold text-brand tabular-nums ring-1 ring-white/12">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-h3 font-bold">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-steel-300">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
