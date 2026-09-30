import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pagePath } from "@/i18n/routes";
import { buttonClasses } from "@/components/ui/button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/Section";

export function ProcessSection({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.home.process;
  return (
    <section aria-labelledby="process-title" className="relative overflow-hidden bg-ink-900 section-y text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgb(255_255_255/0.045),transparent_52%)]"
      />
      <div className="container-fc relative">
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
        <Reveal>
          <ol className="relative grid gap-0 lg:grid-cols-4 lg:gap-6">
            <span
              aria-hidden="true"
              className="process-line pointer-events-none absolute top-8 right-[12.5%] left-[12.5%] hidden h-px bg-white/18 lg:block"
            />
            {t.steps.map((step, i) => (
              <li
                key={step.title}
                className="relative border-l border-white/15 py-5 pl-6 first:pt-0 last:pb-0 lg:border-l-0 lg:py-0 lg:pl-0"
              >
                <span
                  aria-hidden="true"
                  className="absolute top-7 -left-[5px] size-2.5 rounded-full bg-brand ring-4 ring-ink-900 lg:hidden"
                />
                <span className="relative z-10 mb-4 flex size-16 items-center justify-center rounded-full bg-ink-800 text-[1.375rem] font-extrabold text-brand tabular-nums ring-1 ring-white/12">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-h3 font-bold">{step.title}</h3>
                <p className="mt-2 max-w-[20rem] leading-relaxed text-steel-300">{step.text}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
