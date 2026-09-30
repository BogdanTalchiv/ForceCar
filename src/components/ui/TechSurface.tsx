"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export type TechVariant = "blueprint" | "network" | "voice" | "process" | "editorial" | "diagnostic" | "nav";

const tones: Record<"mist" | "white" | "dark", string> = {
  mist: "bg-mist text-text",
  white: "bg-white text-text",
  dark: "bg-ink-900 text-white",
};

export function TechSurface({
  variant,
  tone = "mist",
  labelledBy,
  className = "",
  mark,
  coords,
  children,
}: {
  variant: TechVariant;
  tone?: "mist" | "white" | "dark";
  labelledBy?: string;
  className?: string;
  mark?: string;
  coords?: { lat: number; lng: number } | null;
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
      { threshold: 0.16, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      aria-labelledby={labelledBy}
      className={`tech-surface tech-surface--${variant} relative section-y ${tones[tone]} ${on ? "tech-in" : ""} ${live ? "tech-live" : ""} ${className}`}
    >
      <TechLayer variant={variant} mark={mark} coords={coords} />
      <div className="container-fc relative">{children}</div>
    </section>
  );
}

function TechLayer({
  variant,
  mark,
  coords,
}: {
  variant: TechVariant;
  mark?: string;
  coords?: { lat: number; lng: number } | null;
}) {
  return (
    <div className="tech-layer" aria-hidden="true">
      {variant === "blueprint" && (
        <>
          <div className="tech-grid-light" />
          <div className="tech-diag" />
          <div className="tech-radial" />
          <svg className="tech-ticks" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M4 16V4h12" />
            <path d="M96 16V4H84" />
            <path d="M4 84v12h12" />
            <path d="M96 84v12H84" />
          </svg>
          <div className="tech-scan" />
        </>
      )}
      {variant === "network" && (
        <>
          <div className="tech-grid-light tech-grid-light--wide" />
          {mark && <span className="tech-watermark">{mark}</span>}
          <svg className="tech-schematic" viewBox="0 0 800 360" fill="none">
            <path className="tech-draw" d="M40 180H210C230 180 240 150 270 150H390" />
            <path className="tech-draw" d="M390 150H520C560 150 560 220 600 220H760" />
            <path className="tech-draw" d="M270 150V80H430" />
            <path className="tech-draw" d="M520 150V280H680" />
            <circle cx="210" cy="180" r="3.5" />
            <circle cx="390" cy="150" r="3.5" />
            <circle cx="520" cy="150" r="3.5" />
            <circle cx="600" cy="220" r="3.5" />
          </svg>
        </>
      )}
      {variant === "voice" && (
        <>
          <div className="tech-dots" />
          <div className="tech-radial tech-radial--soft" />
          <span className="tech-quote">”</span>
        </>
      )}
      {variant === "process" && (
        <>
          <div className="tech-grid-dark" />
          <svg className="tech-arcs" viewBox="0 0 1200 420" fill="none">
            <path d="M-20 320C180 120 420 80 640 180C860 280 1040 240 1220 90" />
            <path d="M-40 380C220 200 500 160 760 250C980 320 1120 300 1240 180" />
          </svg>
        </>
      )}
      {variant === "editorial" && (
        <>
          <div className="tech-dots" />
          <div className="tech-diag tech-diag--tight" />
        </>
      )}
      {variant === "diagnostic" && (
        <>
          <div className="tech-rings" />
          <span className="tech-qmark">?</span>
        </>
      )}
      {variant === "nav" && (
        <>
          <div className="tech-grid-dark tech-grid-dark--map" />
          <svg className="tech-route" viewBox="0 0 900 480" fill="none">
            <path className="tech-route-line" d="M80 400C180 390 210 250 340 240C470 230 500 120 640 110C760 102 800 70 860 40" />
            <circle cx="340" cy="240" r="3" />
            <circle cx="640" cy="110" r="3" />
          </svg>
          {coords && (
            <span className="tech-coords">
              {coords.lat.toFixed(3)}° N · {coords.lng.toFixed(3)}° E
            </span>
          )}
        </>
      )}
    </div>
  );
}
