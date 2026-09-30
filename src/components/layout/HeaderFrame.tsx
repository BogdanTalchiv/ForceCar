"use client";

import { useEffect, useState, type ReactNode } from "react";

export function HeaderFrame({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    const timer = window.setTimeout(onScroll, 0);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b text-white backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-300 ${
        scrolled
          ? "border-white/12 bg-ink-950/82 shadow-[0_10px_40px_-20px_rgb(0_0_0/0.7)]"
          : "border-white/8 bg-ink-900/88 supports-[backdrop-filter]:bg-ink-900/72"
      }`}
    >
      {children}
    </header>
  );
}
