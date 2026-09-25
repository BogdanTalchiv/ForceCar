import { CalendarCheck, Hammer, MessagesSquare, MessageSquareText, Search, ShieldCheck } from "lucide-react";
import { business } from "@/config/business";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { fmt } from "@/lib/format";
import { Section, SectionHeader } from "@/components/ui/Section";

const icons = [ShieldCheck, Search, MessageSquareText, MessagesSquare, Hammer, CalendarCheck];

export function TrustSection({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).home.trust;
  return (
    <Section labelledBy="trust-title">
      <SectionHeader id="trust-title" eyebrow={t.eyebrow} title={t.title} />
      <ul className="grid gap-x-10 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
        {t.items.map((item, i) => {
          const Icon = icons[i] ?? ShieldCheck;
          return (
            <li key={item.title} className="flex gap-5 border-t border-line py-7">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-mist text-brand">
                <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-h3 font-bold">{fmt(item.title, { years: business.experienceYears })}</h3>
                <p className="mt-2 leading-relaxed text-muted">{item.text}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
