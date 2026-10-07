import Link from "next/link";
import { CalendarCheck, ClipboardList, Search, Wrench } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pagePath } from "@/i18n/routes";
import { buttonClasses } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/Section";
import { TechSurface } from "@/components/ui/TechSurface";

const icons = [CalendarCheck, Search, ClipboardList, Wrench];

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
          <Link href={pagePath(locale, "booking")} className={buttonClasses({ className: "fc-book-glow" })}>
            {dict.cta.book}
          </Link>
        }
      />
      <div className="relative mt-4 lg:mt-8">
        <div className="process-rail" aria-hidden="true">
          <span className="process-rail__base" />
          <span className="process-rail__progress" />
        </div>
        <span className="process-rail-v" aria-hidden="true">
          <span className="process-rail-v__progress" />
        </span>
        <ol className="process-steps relative grid gap-0 lg:grid-cols-4 lg:gap-8">
          {t.steps.map((step, i) => {
            const Icon = icons[i] ?? Wrench;
            return (
              <li key={step.title} className="relative flex gap-5 py-6 first:pt-0 last:pb-0 lg:block lg:py-0 lg:text-center">
                <span className="process-node relative z-10 flex size-[4.5rem] shrink-0 items-center justify-center rounded-full bg-[#101317] text-brand lg:mx-auto lg:mb-5">
                  <Icon className="size-7" strokeWidth={1.6} aria-hidden="true" />
                </span>
                <div>
                  <p className="mb-2 text-sm font-extrabold tracking-[0.14em] text-brand tabular-nums">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="text-h3 font-bold">{step.title}</h3>
                  <p className="mt-2 max-w-[18rem] leading-relaxed text-steel-300 lg:mx-auto">{step.text}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </TechSurface>
  );
}
