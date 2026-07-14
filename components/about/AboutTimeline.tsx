"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

const milestones = [
  { year: "2016", title: "Three people, one rule", body: "Founded in a co-working space in Ahmedabad with a single principle: whoever sells the work does the work." },
  { year: "2018", title: "First system, not a site", body: "Shipped our first full design system for a fintech client. It's still in production. We stopped selling one-off pages." },
  { year: "2020", title: "Went remote-first", body: "Four timezones, async by default. Output went up. So did the quality of the arguments." },
  { year: "2022", title: "Added engineering", body: "Design that can't ship is a mood board. We brought build in-house so nothing gets lost in handover." },
  { year: "2024", title: "Growth channels", body: "Clients kept asking who'd promote the thing we just built. So we learned to do that properly too." },
  { year: "2026", title: "Still twelve people", body: "We've turned down more work than we've taken. That's the plan, not an accident." },
];

export default function AboutTimeline() {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      const getScrollAmount = () => track.scrollWidth - window.innerWidth + 96;

      const tween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
      });

      ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top top",
        end: () => `+=${getScrollAmount()}`,
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative bg-[#050505] text-white py-24 overflow-hidden"
    >
      <div className="absolute top-20 left-1/3 w-[600px] h-[600px] rounded-full bg-[#CCFF00]/[0.015] blur-[170px] pointer-events-none" />

      <div className="px-6 md:px-12 lg:px-20 mb-14">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2.5 mb-8">
            <span className="relative w-2.5 h-2.5 rounded-full bg-[#CCFF00]">
              <span className="absolute inset-0 rounded-full bg-[#CCFF00] animate-ping opacity-40" />
            </span>
            <span className="text-sm text-gray-400 tracking-widest uppercase font-medium">
              How we got here
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-[4rem] font-bold tracking-tight leading-[1.02] italic max-w-2xl">
            <span className="bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
              Ten years,
            </span>
            <br />
            <span className="bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
              six decisions.
            </span>
          </h2>
        </div>
      </div>

      {/* Horizontal track */}
      <div className="relative">
        {/* Rail */}
        <div className="absolute top-[76px] left-0 right-0 h-px bg-white/[0.08]" />

        <div
          ref={trackRef}
          className="flex gap-6 pl-6 md:pl-12 lg:pl-20 w-max will-change-transform"
        >
          {milestones.map((m, i) => (
            <div key={m.year} className="w-[320px] md:w-[380px] shrink-0">
              {/* Year + node */}
              <div className="flex items-center gap-4 mb-8 h-[60px]">
                <span className="text-4xl md:text-5xl font-bold tracking-tighter text-[#CCFF00]">
                  {m.year}
                </span>
                <span className="flex-1 h-px bg-gradient-to-r from-[#CCFF00]/50 to-transparent" />
              </div>

              <span
                className="block w-[13px] h-[13px] rounded-full bg-[#050505] border-2 border-[#CCFF00] mb-8 -mt-[38px]"
                style={{ boxShadow: "0 0 16px rgba(204,255,0,0.4)" }}
              />

              {/* Card */}
              <div className="group relative rounded-3xl p-7 overflow-hidden backdrop-blur-xl bg-gradient-to-br from-white/[0.08] via-white/[0.04] to-white/[0.02] border border-white/[0.10] hover:border-[#CCFF00]/30 transition-all duration-500 hover:shadow-[0_12px_60px_rgba(204,255,0,0.06),inset_0_1px_0_rgba(255,255,255,0.1)] min-h-[220px]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-[#CCFF00]/[0.04] blur-[80px] group-hover:bg-[#CCFF00]/[0.09] transition-all duration-700 pointer-events-none" />

                <div className="relative">
                  <span className="text-xs font-mono text-gray-500 block mb-3">
                    {String(i + 1).padStart(2, "0")} / {String(milestones.length).padStart(2, "0")}
                  </span>
                  <h3 className="text-xl font-semibold tracking-tight mb-3 group-hover:text-[#CCFF00] transition-colors duration-300">
                    {m.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{m.body}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Tail spacer */}
          <div className="w-20 shrink-0" />
        </div>
      </div>
    </section>
  );
}