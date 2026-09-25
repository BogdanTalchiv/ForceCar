import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pagePath } from "@/i18n/routes";
import { buttonClasses } from "@/components/ui/button";
import { Section, SectionHeader } from "@/components/ui/Section";

export function ProcessSection({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.home.process;
  return (
    <Section tone="dark" labelledBy="process-title">
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
      <ol className="grid gap-px overflow-hidden rounded-lg bg-white/8 sm:grid-cols-2 lg:grid-cols-4">
        {t.steps.map((step, i) => (
          <li key={step.title} className="bg-ink-900 p-6 lg:p-7">
            <span className="block text-4xl leading-none font-extrabold text-brand tabular-nums" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-6 text-h3 font-bold">{step.title}</h3>
            <p className="mt-2 leading-relaxed text-steel-300">{step.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
