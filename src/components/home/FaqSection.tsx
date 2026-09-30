import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pagePath } from "@/i18n/routes";
import type { FaqItem } from "@/lib/faq";
import { buttonClasses } from "@/components/ui/button";
import { FaqList } from "@/components/faq/FaqList";
import { Section } from "@/components/ui/Section";

export function FaqSection({ locale, items, tone = "white" }: { locale: Locale; items: FaqItem[]; tone?: "white" | "mist" }) {
  const dict = getDictionary(locale);
  const t = dict.home.faq;
  return (
    <Section labelledBy="faq-title" tone={tone}>
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <p className="eyebrow mb-4">{t.eyebrow}</p>
          <h2 id="faq-title" className="text-h2 font-extrabold text-balance">
            {t.title}
          </h2>
          <Link href={pagePath(locale, "faq")} className={buttonClasses({ variant: "outline", className: "mt-8" })}>
            {dict.cta.allFaq}
            <ArrowRight className="btn-arrow size-4" aria-hidden="true" />
          </Link>
        </div>
        <FaqList items={items} />
      </div>
    </Section>
  );
}
