import { Minus, Plus } from "lucide-react";

/** Întrebări frecvente cu <details> nativ: funcționează fără JavaScript și este accesibil. */
export function FaqList({
  items,
  dark = false,
  variant = "plain",
}: {
  items: { q: string; a: string }[];
  dark?: boolean;
  variant?: "plain" | "cards";
}) {
  const cards = variant === "cards";
  return (
    <div
      className={`faq-list ${
        cards
          ? "flex flex-col gap-3"
          : `divide-y border-y ${dark ? "divide-white/10 border-white/10" : "divide-line/80 border-line/80"}`
      }`}
    >
      {items.map((item, i) => (
        <details
          key={item.q}
          className={`group ${cards ? "rounded-xl bg-white px-5 shadow-[0_6px_24px_-18px_rgb(17_19_21/0.22)] ring-1 ring-black/[0.06]" : ""}`}
          open={i === 0}
        >
          <summary className="flex cursor-pointer items-start justify-between gap-6 py-4 text-left sm:py-[1.125rem]">
            <h3 className="text-[1.0625rem] leading-snug font-bold">{item.q}</h3>
            <span
              aria-hidden="true"
              className={`faq-pulse mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border transition-[background-color,border-color,color] duration-300 ${
                cards
                  ? "border-line text-brand group-open:border-brand group-open:bg-brand group-open:text-white"
                  : dark
                    ? "rounded-md border-transparent bg-white/10"
                    : "rounded-md border-transparent bg-ink-900/5"
              }`}
            >
              <Plus className="size-3.5 group-open:hidden" strokeWidth={1.75} />
              <Minus className="hidden size-3.5 group-open:block" strokeWidth={1.75} />
            </span>
          </summary>
          <p className={`faq-a -mt-0.5 max-w-[40rem] pr-12 pb-5 leading-relaxed ${dark ? "text-steel-300" : "text-muted"}`}>
            {item.a}
          </p>
        </details>
      ))}
    </div>
  );
}
