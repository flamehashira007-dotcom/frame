"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

export default function ContactHero() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      gsap.set("[data-ch-word], [data-ch-sub], [data-ch-meta] > *]", {
        opacity: 1, y: 0, clearProps: "filter",
      });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from("[data-ch-eyebrow]", { y: 20, opacity: 0, duration: 0.7 })
        .from("[data-ch-word]", {
          yPercent: 120,
          rotateX: -45,
          opacity: 0,
          filter: "blur(12px)",
          stagger: 0.06,
          duration: 1,
        }, "-=0.4")
        .from("[data-ch-sub]", { y: 24, opacity: 0, filter: "blur(6px)", duration: 0.7 }, "-=0.5")
        .from("[data-ch-meta] > *", { y: 24, opacity: 0, stagger: 0.1, duration: 0.6 }, "-=0.3");

      gsap.to("[data-ch-bloom]", {
        scale: 1.14,
        opacity: 0.55,
        duration: 5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative bg-[#050505] text-white pt-40 md:pt-48 pb-20 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      <div
        data-ch-bloom
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-[#CCFF00]/[0.03] blur-[170px] pointer-events-none"
      />
      <div className="absolute top-1/3 right-[10%] w-[400px] h-[400px] rounded-full bg-violet-500/[0.02] blur-[140px] pointer-events-none" />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(204,255,0,0.14) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, black, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, black, transparent 80%)",
        }}
      />

      <div className="relative max-w-5xl mx-auto text-center">
        <div
          data-ch-eyebrow
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-white/[0.06] border border-white/[0.12] backdrop-blur-md"
        >
          <span className="relative w-2 h-2 rounded-full bg-[#CCFF00]">
            <span className="absolute inset-0 rounded-full bg-[#CCFF00] animate-ping opacity-40" />
          </span>
          <span className="text-xs text-gray-300 tracking-widest uppercase font-medium">
            2 slots open for Q3
          </span>
        </div>

        <h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.98] mb-7"
          style={{ perspective: 800 }}
        >
          {["Let's", "fix"].map((w) => (
            <span key={w} className="inline-block overflow-hidden align-bottom mr-[0.22em]">
              <span data-ch-word className="inline-block">{w}</span>
            </span>
          ))}
          <br />
          <span className="inline-block overflow-hidden align-bottom mr-[0.22em]">
            <span
              data-ch-word
              className="inline-block italic bg-gradient-to-r from-[#CCFF00] via-white to-[#CCFF00] bg-clip-text text-transparent"
            >
              what&apos;s
            </span>
          </span>
          <span className="inline-block overflow-hidden align-bottom">
            <span data-ch-word className="inline-block italic">broken.</span>
          </span>
        </h1>

        <p data-ch-sub className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
          No brief required. Tell us what&apos;s not working and we&apos;ll tell you
          which of the thirteen services actually fixes it.
        </p>

        <div
          data-ch-meta
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-xs text-gray-400"
        >
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00]/70" />
            Reply within 24 hours
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00]/70" />
            Free audit on the first call
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00]/70" />
            No lock-in
          </span>
        </div>
      </div>
    </section>
  );
}