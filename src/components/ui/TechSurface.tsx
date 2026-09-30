"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export type TechVariant = "blueprint" | "network" | "voice" | "process" | "editorial" | "diagnostic" | "nav";

const tones: Record<"mist" | "white" | "dark", string> = {
  mist: "bg-mist text-text",
  white: "bg-white text-text",
  dark: "bg-[#0B0E11] text-white",
};

export function TechSurface({
  variant,
  tone = "mist",
  labelledBy,
  className = "",
  mark,
  compact = false,
  children,
}: {
  variant: TechVariant;
  tone?: "mist" | "white" | "dark";
  labelledBy?: string;
  className?: string;
  mark?: string;
  compact?: boolean;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const [on, setOn] = useState(false);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const t = window.setTimeout(() => setOn(true), 0);
      return () => window.clearTimeout(t);
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setOn(true);
        setLive(entry.isIntersecting);
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      aria-labelledby={labelledBy}
      className={`tech-surface tech-surface--${variant} tech-surface--${tone} relative section-y ${tones[tone]} ${compact ? "tech-surface--compact" : ""} ${on ? "tech-in" : ""} ${live ? "tech-live" : ""} ${className}`}
    >
      <TechLayer variant={variant} mark={mark} />
      <div className="container-fc relative">{children}</div>
    </section>
  );
}

function TechLayer({ variant, mark }: { variant: TechVariant; mark?: string }) {
  return (
    <div className="tech-layer" aria-hidden="true">
      {variant === "blueprint" && (
        <>
          <div className="tech-grid-dark" />
          <div className="tech-glow-red tech-glow-red--left" />
          <div className="tech-vignette" />
        </>
      )}
      {variant === "network" && (
        <>
          <div className="tech-grid-dark tech-grid-dark--wide" />
          <div className="tech-slash" />
          {mark && <span className="tech-watermark">{mark}</span>}
        </>
      )}
      {variant === "voice" && (
        <>
          <div className="tech-dots" />
          <div className="tech-wash-red" />
          <span className="tech-quote">”</span>
        </>
      )}
      {variant === "process" && (
        <>
          <div className="tech-grid-dark" />
          <div className="tech-glow-red tech-glow-red--right" />
          <WireCar />
        </>
      )}
      {variant === "editorial" && (
        <>
          <div className="tech-dots" />
          <div className="tech-diag-red" />
        </>
      )}
      {variant === "diagnostic" && (
        <>
          <div className="tech-wash-red tech-wash-red--faq" />
          <span className="tech-qmark">?</span>
        </>
      )}
      {variant === "nav" && (
        <>
          <div className="tech-glow-red tech-glow-red--right" />
          <svg className="tech-trail" viewBox="0 0 1200 200" fill="none" preserveAspectRatio="none">
            <path d="M40 150C280 40 520 190 760 90C940 20 1080 70 1200 40" />
          </svg>
        </>
      )}
    </div>
  );
}

function WireCar() {
  return (
    <svg className="tech-car" viewBox="0 0 920 280" fill="none">
      <path d="M92 186H168C186 148 214 118 268 104L318 62C338 50 372 44 418 44H548C612 44 658 62 696 98L768 118C812 124 842 148 854 186H868" />
      <path d="M268 104H690" />
      <path d="M318 62L338 104" />
      <path d="M548 44L572 104" />
      <path d="M92 186C92 198 102 208 118 208H168" />
      <path d="M286 208H612" />
      <path d="M730 208H854C870 208 880 198 880 186" />
      <circle cx="228" cy="204" r="36" />
      <circle cx="228" cy="204" r="16" />
      <circle cx="672" cy="204" r="36" />
      <circle cx="672" cy="204" r="16" />
      <path d="M400 62V104" />
      <path d="M488 62V104" />
      <path d="M140 168H200" />
      <path d="M760 156H830" />
    </svg>
  );
}
