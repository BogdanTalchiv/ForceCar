type Variant = "primary" | "outline" | "dark" | "onDark";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-bold whitespace-nowrap select-none transition-[background-color,box-shadow,color] duration-150 disabled:cursor-not-allowed disabled:opacity-60";

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-5 text-[0.9375rem]",
  lg: "h-14 px-7 text-base",
};

const variants: Record<Variant, string> = {
  primary: "bg-brand text-white hover:bg-brand-hover",
  outline: "bg-white text-text ring-1 ring-inset ring-line hover:ring-ink-900",
  dark: "bg-ink-900 text-white hover:bg-ink-700",
  onDark: "bg-white/5 text-white ring-1 ring-inset ring-white/25 hover:bg-white/12 hover:ring-white/45",
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  full = false,
  className = "",
}: { variant?: Variant; size?: Size; full?: boolean; className?: string } = {}): string {
  return [base, sizes[size], variants[variant], full ? "w-full" : "", className].filter(Boolean).join(" ");
}
