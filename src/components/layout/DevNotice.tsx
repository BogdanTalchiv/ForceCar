import { getMissingBusinessFields } from "@/config/business";

/** Vizibil DOAR în development: ce date lipsesc încă din src/config/business.ts. */
export function DevNotice() {
  if (process.env.NODE_ENV !== "development") return null;
  const missing = getMissingBusinessFields();
  if (!missing.length) return null;
  return (
    <details className="fixed top-20 right-3 z-50 max-w-xs rounded-md bg-amber-100 text-xs text-amber-950 shadow-lg ring-1 ring-amber-300 lg:top-auto lg:right-auto lg:bottom-3 lg:left-3">
      <summary className="cursor-pointer px-3 py-2 font-bold">DEV · {missing.length} date lipsă în business.ts</summary>
      <p className="px-3 pb-3">{missing.join(", ")}. Aceste elemente sunt ascunse pe site până la completare.</p>
    </details>
  );
}
