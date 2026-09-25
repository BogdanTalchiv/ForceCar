import { Plus } from "lucide-react";

/** Întrebări frecvente cu <details> nativ: funcționează fără JavaScript și este accesibil. */
export function FaqList({ items, dark = false }: { items: { q: string; a: string }[]; dark?: boolean }) {
  return (
    <div className={`divide-y border-y ${dark ? "divide-white/10 border-white/10" : "divide-line border-line"}`}>
      {items.map((item, i) => (
        <details key={item.q} className="group" open={i === 0}>
          <summary className="flex cursor-pointer items-start justify-between gap-6 py-5 text-left">
            <h3 className="text-[1.0625rem] leading-snug font-bold">{item.q}</h3>
            <span
              aria-hidden="true"
              className={`mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md ${dark ? "bg-white/10" : "bg-ink-900/6"}`}
            >
              <Plus className="size-4 text-brand transition-transform group-open:rotate-45" />
            </span>
          </summary>
          <p className={`-mt-1 pr-12 pb-6 leading-relaxed ${dark ? "text-steel-300" : "text-muted"}`}>{item.a}</p>
        </details>
      ))}
    </div>
  );
}
