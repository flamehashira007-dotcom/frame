"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

type Tool = { name: string; cat: string; symbol: string; accent: string };

const inner: Tool[] = [
  { name: "Figma", cat: "Design", symbol: "F", accent: "#f472b6" },
  { name: "Next.js", cat: "Framework", symbol: "N", accent: "#ffffff" },
  { name: "GSAP", cat: "Motion", symbol: "G", accent: "#CCFF00" },
  { name: "TypeScript", cat: "Language", symbol: "TS", accent: "#38bdf8" },
  { name: "Tailwind", cat: "Styling", symbol: "T", accent: "#22d3ee" },
];

const outer: Tool[] = [
  { name: "Webflow", cat: "CMS", symbol: "W", accent: "#38bdf8" },
  { name: "Sanity", cat: "CMS", symbol: "S", accent: "#f87171" },
  { name: "Vercel", cat: "Hosting", symbol: "▲", accent: "#ffffff" },
  { name: "GA4", cat: "Analytics", symbol: "◷", accent: "#fb923c" },
  { name: "HubSpot", cat: "CRM", symbol: "◉", accent: "#fb923c" },
  { name: "Klaviyo", cat: "Email", symbol: "K", accent: "#34d399" },
  { name: "Ahrefs", cat: "SEO", symbol: "A", accent: "#38bdf8" },
  { name: "After Effects", cat: "Motion", symbol: "Ae", accent: "#a78bfa" },
];

function Ring({
  tools, radius, duration, reverse, onHover,
}: {
  tools: Tool[]; radius: number; duration: number; reverse?: boolean;
  onHover: (t: Tool | null) => void;
}) {
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = ringRef.current;
    if (!el) return;
    const tw = gsap.to(el, {
      rotate: reverse ? -360 : 360,
      duration,
      ease: "none",
      repeat: -1,
    });
    return () => { tw.kill(); };
  }, [duration, reverse]);

  return (
    <div
      ref={ringRef}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ width: radius * 2, height: radius * 2 }}
    >
      {tools.map((t, i) => {
        const angle = (i / tools.length) * Math.PI * 2 - Math.PI / 2;
        const x = radius + radius * Math.cos(angle);
        const y = radius + radius * Math.sin(angle);
        return (
          <div
            key={t.name}
            className="absolute"
            style={{ left: x, top: y, transform: "translate(-50%, -50%)" }}
          >
            <div
              className="group w-14 h-14 rounded-2xl flex items-center justify-center text-sm font-bold cursor-pointer backdrop-blur-xl transition-all duration-300 hover:scale-125"
              style={{
                background: `${t.accent}0e`,
                border: `1px solid ${t.accent}28`,
                color: t.accent,
                animation: prefersReducedMotion()
                  ? undefined
                  : `counter ${duration}s linear infinite ${reverse ? "reverse" : ""}`,
              }}
              onMouseEnter={() => onHover(t)}
              onMouseLeave={() => onHover(null)}
            >
              {t.symbol}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function TechStack() {
  const rootRef = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState<Tool | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-ts-head]", {
        y: 40, opacity: 0, filter: "blur(10px)", duration: 1, ease: "power4.out",
        scrollTrigger: { trigger: "[data-ts-head]", start: "top 82%" },
      });
      gsap.from("[data-ts-orbit]", {
        scale: 0.7, opacity: 0, duration: 1.4, ease: "power3.out",
        scrollTrigger: { trigger: "[data-ts-orbit]", start: "top 78%" },
      });
      gsap.from("[data-ts-legend] > *", {
        x: 40, opacity: 0, stagger: 0.09, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: "[data-ts-legend]", start: "top 85%" },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const cats = [
    { c: "Design & Motion", v: "Figma · GSAP · After Effects" },
    { c: "Build", v: "Next.js · TypeScript · Tailwind · Vercel" },
    { c: "Content", v: "Sanity · Webflow" },
    { c: "Growth", v: "GA4 · Ahrefs · HubSpot · Klaviyo" },
  ];

  return (
    <section
      ref={rootRef}
      className="relative bg-[#050505] text-white pt-32 md:pt-40 pb-28 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-[#CCFF00]/[0.02] blur-[180px] pointer-events-none" />

      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse at center, black, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black, transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="flex items-center gap-2.5 mb-8">
          <span className="relative w-2.5 h-2.5 rounded-full bg-[#CCFF00]">
            <span className="absolute inset-0 rounded-full bg-[#CCFF00] animate-ping opacity-40" />
          </span>
          <span className="text-sm text-gray-400 tracking-widest uppercase font-medium">
            Technologies we use
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Orbit */}
          <div data-ts-orbit className="relative h-[440px] md:h-[520px]">
            {/* Ring guides */}
            {[150, 230].map((r) => (
              <div
                key={r}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.05]"
                style={{ width: r * 2, height: r * 2 }}
              />
            ))}

            {/* Center readout */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-white/[0.03] border border-white/[0.1] backdrop-blur-xl flex flex-col items-center justify-center text-center px-2">
              <span
                className="text-xs font-semibold transition-all duration-300"
                style={{ color: hovered?.accent ?? "#CCFF00" }}
              >
                {hovered?.name ?? "Our stack"}
              </span>
              <span className="text-[10px] text-gray-600 mt-0.5">
                {hovered?.cat ?? `${inner.length + outer.length} tools`}
              </span>
            </div>

            <Ring tools={inner} radius={150} duration={38} onHover={setHovered} />
            <Ring tools={outer} radius={230} duration={54} reverse onHover={setHovered} />
          </div>

          {/* Copy + legend */}
          <div>
            <h2
              data-ts-head
              className="text-4xl sm:text-5xl md:text-[3.5rem] font-bold tracking-tight leading-[1.05] italic mb-6"
            >
              <span className="bg-gradient-to-r from-white via-white to-gray-500 bg-clip-text text-transparent">
                Boring tools.
              </span>
              <br />
              <span className="bg-gradient-to-r from-white via-gray-400 to-gray-700 bg-clip-text text-transparent">
                Unreasonable results.
              </span>
            </h2>
            <p className="text-sm md:text-base text-gray-500 leading-relaxed max-w-md mb-10">
              We don&apos;t chase whatever shipped on Product Hunt last Tuesday. This
              stack is chosen because it&apos;s fast, maintainable, and something your
              next hire will already know.
            </p>

            <div data-ts-legend className="space-y-4">
              {cats.map((row) => (
                <div
                  key={row.c}
                  className="group flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6 py-4 border-t border-white/[0.06] hover:border-[#CCFF00]/25 transition-colors duration-300"
                >
                  <span className="text-sm font-semibold text-white w-40 shrink-0 group-hover:text-[#CCFF00] transition-colors duration-300">
                    {row.c}
                  </span>
                  <span className="text-sm text-gray-500 font-mono">{row.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}