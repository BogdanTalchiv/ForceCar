import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pagePath } from "@/i18n/routes";
import { buttonClasses } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/Section";
import { TechSurface } from "@/components/ui/TechSurface";

export function ProcessSection({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.home.process;
  return (
    <TechSurface variant="process" labelledBy="process-title" tone="dark">
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
      <div className="relative">
        <div className="process-rail" aria-hidden="true">
          <span className="process-rail__base" />
          <span className="process-rail__progress" />
        </div>
        <span className="process-rail-v" aria-hidden="true">
          <span className="process-rail-v__progress" />
        </span>
        <ol className="process-steps relative grid gap-0 lg:grid-cols-4 lg:gap-6">
          {t.steps.map((step, i) => (
            <li
              key={step.title}
              className="relative py-5 pl-6 first:pt-0 last:pb-0 lg:py-0 lg:pl-0"
            >
              <span className="process-node relative z-10 mb-4 flex size-16 items-center justify-center rounded-full bg-ink-800 text-[1.375rem] font-extrabold text-brand tabular-nums ring-1 ring-white/12">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-h3 font-bold">{step.title}</h3>
              <p className="mt-2 max-w-[20rem] leading-relaxed text-steel-300">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </TechSurface>
  );
}
