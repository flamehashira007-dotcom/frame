"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

export default function BlogHero() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      gsap.set("[data-bh-word], [data-bh-sub]", { opacity: 1, y: 0, clearProps: "filter" });
      return;
    }
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from("[data-bh-eyebrow]", { y: 20, opacity: 0, duration: 0.7 })
        .from("[data-bh-word]", {
          yPercent: 120, rotateX: -45, opacity: 0, filter: "blur(12px)",
          stagger: 0.06, duration: 1,
        }, "-=0.4")
        .from("[data-bh-sub]", { y: 24, opacity: 0, filter: "blur(6px)", duration: 0.7 }, "-=0.5");

      gsap.to("[data-bh-bloom]", {
        scale: 1.14, opacity: 0.55, duration: 5, ease: "sine.inOut", yoyo: true, repeat: -1,
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative bg-[#050505] text-white pt-32 md:pt-40 lg:pt-48 pb-12 md:pb-16 px-4 sm:px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      <div
        data-bh-bloom
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[40rem] h-[24rem] rounded-full bg-[#CCFF00]/3 blur-[170px] pointer-events-none"
      />
      <div className="absolute top-1/3 left-[8%] w-[20rem] h-[20rem] rounded-full bg-violet-500/2 blur-[140px] pointer-events-none" />

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
          data-bh-eyebrow
          className="inline-flex items-center gap-2 mb-6 md:mb-8 px-3.5 py-1.5 rounded-full bg-white/6 border border-white/12 backdrop-blur-md"
        >
          <span className="relative w-2 h-2 rounded-full bg-[#CCFF00]">
            <span className="absolute inset-0 rounded-full bg-[#CCFF00] animate-ping opacity-40" />
          </span>
          <span className="text-[11px] text-gray-300 tracking-widest uppercase font-medium">
            From the studio floor
          </span>
        </div>

        <h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-bold tracking-tight leading-[0.98] mb-5 md:mb-7"
          style={{ perspective: 800 }}
        >
          {["Ideas", "worth"].map((w) => (
            <span key={w} className="inline-block overflow-hidden align-bottom mr-[0.22em]">
              <span data-bh-word className="inline-block">{w}</span>
            </span>
          ))}
          <br />
          <span className="inline-block overflow-hidden align-bottom">
            <span
              data-bh-word
              className="inline-block italic bg-linear-to-r from-[#CCFF00] via-white to-[#CCFF00] bg-clip-text text-transparent"
            >
              stealing.
            </span>
          </span>
        </h1>

        <p data-bh-sub className="text-sm md:text-base lg:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Notes on brand, product, and growth — written by the people doing
          the work, not a content mill.
        </p>
      </div>
    </section>
  );
}