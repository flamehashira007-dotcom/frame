"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

export default function PortfolioHero() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from("[data-ph-eyebrow]", { y: 20, opacity: 0, duration: 0.7 })
        .from(
          "[data-ph-word]",
          {
            yPercent: 120,
            opacity: 0,
            filter: "blur(10px)",
            stagger: 0.07,
            duration: 0.9,
          },
          "-=0.4"
        )
        .from("[data-ph-sub]", { y: 24, opacity: 0, filter: "blur(6px)", duration: 0.7 }, "-=0.5");
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative bg-[#050505] text-white pt-40 md:pt-48 pb-8 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      {/* Ambient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-[#CCFF00]/[0.025] blur-[170px] pointer-events-none" />

      {/* Dot matrix */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(204,255,0,0.14) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage: "radial-gradient(ellipse 70% 70% at 50% 30%, black, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 50% 30%, black, transparent 80%)",
        }}
      />

      <div className="relative max-w-5xl mx-auto text-center">
        <div
          data-ph-eyebrow
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.1] backdrop-blur-md"
        >
          <span className="relative w-2 h-2 rounded-full bg-[#CCFF00]">
            <span className="absolute inset-0 rounded-full bg-[#CCFF00] animate-ping opacity-40" />
          </span>
          <span className="text-xs text-gray-400 tracking-widest uppercase font-medium">
            Portfolio
          </span>
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1] mb-6">
          {["Two", "decks."].map((w) => (
            <span key={w} className="inline-block overflow-hidden align-bottom mr-[0.22em]">
              <span data-ph-word className="inline-block">
                {w}
              </span>
            </span>
          ))}
          <br />
          <span className="inline-block overflow-hidden align-bottom mr-[0.22em]">
            <span
              data-ph-word
              className="inline-block italic bg-gradient-to-r from-[#CCFF00] via-white to-[#CCFF00] bg-clip-text text-transparent"
            >
              No fluff.
            </span>
          </span>
        </h1>

        <p
          data-ph-sub
          className="text-base md:text-lg text-gray-400 max-w-xl mx-auto leading-relaxed"
        >
          Pick the side you care about. Read it in the browser or take the PDF
          with you — both are the full thing, no gated preview.
        </p>
      </div>
    </section>
  );
}