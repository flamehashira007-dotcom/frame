"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

const steps = [
  { number: "01", title: "Discovery & Research", body: "We start by understanding your goals, audience, and competitive landscape before a single pixel gets placed." },
  { number: "02", title: "Ideation & Wireframing", body: "Structure and flow come first — low-fidelity wireframes map out how the product actually works." },
  { number: "03", title: "UI/UX Design", body: "User-centric interfaces, built in Figma, focused on clarity and measurable business outcomes." },
  { number: "04", title: "Development & Integration", body: "React, Next.js, TypeScript, and the right backend — built to match the design exactly, not approximate it." },
  { number: "05", title: "Testing & QA", body: "Cross-browser, cross-device checks before anything ships, so launch day has no surprises." },
  { number: "06", title: "Launch & Support", body: "We stay on after go-live for maintenance and support, not just a handover email." },
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

      <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 mb-14">
        <div className="max-w-[1536px] mx-auto">
          <div className="flex items-center gap-2.5 mb-8">
            <span className="relative w-2.5 h-2.5 rounded-full bg-[#CCFF00]">
              <span className="absolute inset-0 rounded-full bg-[#CCFF00] animate-ping opacity-40" />
            </span>
            <span className="text-sm text-gray-400 tracking-widest uppercase font-medium">
              How we work
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-[4rem] font-bold tracking-tight leading-[1.02] italic max-w-2xl">
            <span className="bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
              One process,
            </span>
            <br />
            <span className="bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
              six steps.
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
          {steps.map((s, i) => (
            <div key={s.number} className="w-[320px] md:w-[380px] shrink-0">
              {/* Number + node */}
              <div className="flex items-center gap-4 mb-8 h-[60px]">
                <span className="text-4xl md:text-5xl font-bold tracking-tighter text-[#CCFF00]">
                  {s.number}
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
                    Step {String(i + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
                  </span>
                  <h3 className="text-xl font-semibold tracking-tight mb-3 group-hover:text-[#CCFF00] transition-colors duration-300">
                    {s.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{s.body}</p>
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