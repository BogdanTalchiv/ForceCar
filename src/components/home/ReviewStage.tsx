"use client";

import { Children, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function ReviewStage({
  children,
  prevLabel,
  nextLabel,
}: {
  children: ReactNode;
  prevLabel: string;
  nextLabel: string;
}) {
  const items = Children.toArray(children);
  const [index, setIndex] = useState(0);
  const many = items.length > 1;
  const go = (dir: -1 | 1) => setIndex((i) => (i + dir + items.length) % items.length);

  if (items.length === 0) return null;

  return (
    <div className="fc-stage relative">
      <div className="lg:hidden">
        {items[index]}
        {many && (
          <div className="mt-5 flex items-center justify-between gap-4">
            <div className="flex gap-2">
              <button type="button" className="fc-nav-btn fc-nav-btn--light" onClick={() => go(-1)} aria-label={prevLabel}>
                <ChevronLeft className="size-5" strokeWidth={1.75} />
              </button>
              <button type="button" className="fc-nav-btn fc-nav-btn--light" onClick={() => go(1)} aria-label={nextLabel}>
                <ChevronRight className="size-5" strokeWidth={1.75} />
              </button>
            </div>
            <div className="flex gap-1.5" aria-hidden="true">
              {items.map((_, i) => (
                <span key={i} className={`size-1.5 rounded-full ${i === index ? "bg-brand" : "bg-line"}`} />
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="hidden lg:grid lg:grid-cols-3 lg:gap-4">{items}</div>
    </div>
  );
}
