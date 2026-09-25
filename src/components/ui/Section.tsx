import type { ReactNode } from "react";

type Tone = "white" | "mist" | "dark";

const tones: Record<Tone, string> = {
  white: "bg-white",
  mist: "bg-mist",
  dark: "bg-ink-900 text-white",
};

export function Section({
  children,
  tone = "white",
  id,
  className = "",
  labelledBy,
}: {
  children: ReactNode;
  tone?: Tone;
  id?: string;
  className?: string;
  labelledBy?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`${tones[tone]} py-16 sm:py-20 lg:py-24 ${className}`}>
      <div className="container-fc">{children}</div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  lead,
  id,
  dark = false,
  action,
  as: Heading = "h2",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  id?: string;
  dark?: boolean;
  action?: ReactNode;
  as?: "h1" | "h2";
}) {
  return (
    <div className="mb-10 flex flex-col gap-6 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-3xl">
        {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
        <Heading id={id} className="text-h2 font-extrabold text-balance">
          {title}
        </Heading>
        {lead && <p className={`mt-4 text-lead ${dark ? "text-steel-300" : "text-muted"}`}>{lead}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

/** Antetul paginilor interioare (fundal grafit, titlu H1). */
export function PageHero({
  eyebrow,
  title,
  lead,
  children,
  breadcrumbs,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  children?: ReactNode;
  breadcrumbs?: ReactNode;
}) {
  return (
    <div className="relative overflow-hidden bg-ink-900 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,white_1px,transparent_1px)] [background-size:120px_100%]"
      />
      <div className="container-fc relative pt-8 pb-14 sm:pb-16 lg:pt-10 lg:pb-20">
        {breadcrumbs}
        <div className="mt-8 max-w-3xl lg:mt-10">
          {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
          <h1 className="text-display font-extrabold text-balance">{title}</h1>
          {lead && <p className="mt-5 max-w-2xl text-lead text-steel-300">{lead}</p>}
          {children}
        </div>
      </div>
    </div>
  );
}
