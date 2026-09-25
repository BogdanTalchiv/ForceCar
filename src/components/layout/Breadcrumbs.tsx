import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface Crumb {
  name: string;
  href: string;
}

/** Traseul de navigare vizibil — aceleași elemente sunt folosite în BreadcrumbList JSON-LD. */
export function Breadcrumbs({ items, label }: { items: Crumb[]; label: string }) {
  return (
    <nav aria-label={label}>
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-steel-300">
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={c.href} className="flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" className="text-white/90">
                  {c.name}
                </span>
              ) : (
                <>
                  <Link href={c.href} className="hover:text-white">
                    {c.name}
                  </Link>
                  <ChevronRight className="size-3.5 text-white/35" aria-hidden="true" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
