import { CalendarCheck, Hammer, MessageSquareText, MessagesSquare, Search } from "lucide-react";
import { business } from "@/config/business";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { fmt } from "@/lib/format";
import { TechSurface } from "@/components/ui/TechSurface";

const icons = [Search, MessageSquareText, MessagesSquare, Hammer, CalendarCheck];

export function TrustSection({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.home.trust;
  const years = business.experienceYears;
  const featured = t.items[0];
  const rest = t.items.slice(1);

  return (
    <TechSurface variant="network" labelledBy="trust-title" tone="dark" mark={`${years}+`}>
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] lg:gap-16">
        <div className="fc-copy relative">
          <p className="eyebrow mb-4">{t.eyebrow}</p>
          <h2 id="trust-title" className="text-h2 font-extrabold text-balance">
            {t.title}
          </h2>
          <p className="trust-stat mt-8 text-[4.5rem] leading-[0.9] font-extrabold tracking-[-0.04em] tabular-nums sm:text-[5.25rem]">
            {years}
            <span className="text-brand">+</span>
          </p>
          <p className="mt-3 text-xs font-bold tracking-[0.16em] text-steel-400 uppercase">{dict.home.hero.stats.experienceLabel}</p>
          <p className="mt-5 max-w-[28rem] leading-relaxed text-steel-300">{featured.text}</p>
        </div>
        <ul className="fc-stage grid gap-3 sm:grid-cols-2">
          {rest.map((item, i) => {
            const Icon = icons[i] ?? Search;
            return (
              <li key={item.title} className="trust-card">
                <span className="trust-card__icon mb-4 flex size-10 items-center justify-center rounded-md border border-brand/45 text-brand">
                  <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <h3 className="font-bold">{fmt(item.title, { years })}</h3>
                <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-steel-300">{item.text}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </TechSurface>
  );
}
