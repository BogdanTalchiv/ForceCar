import { CalendarCheck, Hammer, MessagesSquare, MessageSquareText, Search, ShieldCheck } from "lucide-react";
import { business } from "@/config/business";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { fmt } from "@/lib/format";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/Section";
import { TechSurface } from "@/components/ui/TechSurface";

const icons = [ShieldCheck, Search, MessageSquareText, MessagesSquare, Hammer, CalendarCheck];

export function TrustSection({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.home.trust;
  const years = business.experienceYears;
  const featured = t.items[0];
  const rest = t.items.slice(1);

  return (
    <TechSurface variant="network" labelledBy="trust-title" tone="white" mark={`${years}+`}>
      <SectionHeader id="trust-title" eyebrow={t.eyebrow} title={t.title} />
      <Reveal>
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,17rem)_1fr] lg:gap-16">
          <div className="border-b border-line pb-8 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-12">
            <p className="trust-stat text-[4.75rem] leading-[0.9] font-extrabold tracking-[-0.04em] text-ink-900 tabular-nums sm:text-[5.5rem]">
              {years}
              <span className="text-brand">+</span>
            </p>
            <p className="mt-3 text-xs font-bold tracking-[0.16em] text-muted uppercase">{dict.home.hero.stats.experienceLabel}</p>
            <p className="mt-4 max-w-[16rem] leading-relaxed text-muted">{featured.text}</p>
          </div>
          <ul className="grid sm:grid-cols-2 sm:gap-x-10">
            {rest.map((item, i) => {
              const Icon = icons[i + 1] ?? ShieldCheck;
              return (
                <li
                  key={item.title}
                  className="trust-item group/item relative flex gap-4 border-t border-line/80 py-5 pl-1 transition-[border-color] duration-300 hover:border-brand/35"
                >
                  <Icon
                    className="mt-0.5 size-5 shrink-0 text-brand transition-transform duration-300 group-hover/item:translate-x-0.5"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-bold">{fmt(item.title, { years })}</h3>
                    <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted">{item.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </Reveal>
    </TechSurface>
  );
}
