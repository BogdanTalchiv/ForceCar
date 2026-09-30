"use client";

import { useEffect, useState, type ReactNode } from "react";

export function HeaderFrame({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    const timer = window.setTimeout(onScroll, 0);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <header
      className={`header-frame sticky top-0 z-40 border-b text-white transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled
          ? "header-frame--scrolled border-white/10 bg-ink-950/90 backdrop-blur-md"
          : "border-white/8 bg-ink-950/72 backdrop-blur-[8px] supports-[backdrop-filter]:bg-ink-950/58"
      }`}
    >
      {children}
    </header>
  );
}
