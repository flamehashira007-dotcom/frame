"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const phases = [
  {
    n: ".01",
    label: "Week 1",
    title: "Discovery & Audit",
    body: "We tear apart what you have — brand, site, funnel, analytics — and write down what's actually broken. You get the findings whether or not you hire us.",
    out: ["Audit deck", "Opportunity map", "Success metrics"],
  },
  {
    n: ".02",
    label: "Week 2–3",
    title: "Strategy & Direction",
    body: "Positioning locked, art direction agreed, scope written. This is the phase where disagreements are cheap — so we have them here.",
    out: ["Positioning doc", "Art direction", "Scope & timeline"],
  },
  {
    n: ".03",
    label: "Week 3–7",
    title: "Design & Build",
    body: "Weekly builds in your inbox. Design system first, then screens, then code. No six-week silence followed by a big reveal.",
    out: ["Design system", "Hi-fi screens", "Production build"],
  },
  {
    n: ".04",
    label: "Week 7–8",
    title: "Test & Launch",
    body: "Accessibility pass, Core Web Vitals, cross-device QA, analytics wired. Then we ship it and watch the numbers for a fortnight.",
    out: ["QA report", "Analytics setup", "Launch"],
  },
  {
    n: ".05",
    label: "Ongoing",
    title: "Iterate & Grow",
    body: "Channels switch on, creative gets tested, the system gets extended. Retainer clients get rollover hours and a standing weekly slot.",
    out: ["Monthly reporting", "Creative testing", "System extensions"],
  },
];

export default function ServiceProcess() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Spine draws on scroll
      gsap.from("[data-pr-spine]", {
        scaleY: 0,
        transformOrigin: "top center",
        ease: "none",
        scrollTrigger: {
          trigger: "[data-pr-track]",
          start: "top 65%",
          end: "bottom 75%",
          scrub: 0.5,
        },
      });

      gsap.utils.toArray<HTMLElement>("[data-pr-step]").forEach((step) => {
        gsap.from(step, {
          x: -50,
          opacity: 0,
          filter: "blur(8px)",
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: step, start: "top 82%" },
        });

        gsap.from(step.querySelector("[data-pr-node]"), {
          scale: 0,
          duration: 0.6,
          ease: "back.out(3)",
          scrollTrigger: { trigger: step, start: "top 80%" },
        });
      });

      gsap.from("[data-pr-head]", {
        y: 40, opacity: 0, filter: "blur(10px)", duration: 1, ease: "power4.out",
        scrollTrigger: { trigger: "[data-pr-head]", start: "top 82%" },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative bg-[#050505] text-white pt-32 md:pt-40 pb-28 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      <div className="absolute top-10 left-[15%] w-[500px] h-[500px] rounded-full bg-[#CCFF00]/[0.015] blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-[10%] w-[450px] h-[450px] rounded-full bg-violet-500/[0.02] blur-[140px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        <div className="flex items-center gap-2.5 mb-8">
          <span className="relative w-2.5 h-2.5 rounded-full bg-[#CCFF00]">
            <span className="absolute inset-0 rounded-full bg-[#CCFF00] animate-ping opacity-40" />
          </span>
          <span className="text-sm text-gray-400 tracking-widest uppercase font-medium">
            Our process
          </span>
        </div>

        <h2
          data-pr-head
          className="text-4xl sm:text-5xl md:text-[4rem] font-bold tracking-tight leading-[1.02] italic mb-20 max-w-2xl"
        >
          <span className="bg-gradient-to-r from-white via-white to-gray-500 bg-clip-text text-transparent">
            Eight weeks.
          </span>
          <br />
          <span className="bg-gradient-to-r from-white via-gray-400 to-gray-700 bg-clip-text text-transparent">
            No mystery.
          </span>
        </h2>

        {/* Timeline */}
        <div data-pr-track className="relative pl-8 md:pl-16">
          {/* Spine */}
          <div className="absolute left-[7px] md:left-[15px] top-2 bottom-2 w-px bg-white/[0.06]" />
          <div
            data-pr-spine
            className="absolute left-[7px] md:left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-[#CCFF00] via-[#CCFF00]/50 to-transparent"
            style={{ boxShadow: "0 0 12px rgba(204,255,0,0.4)" }}
          />

          <div className="space-y-6">
            {phases.map((p) => (
              <div key={p.n} data-pr-step className="relative">
                {/* Node */}
                <span
                  data-pr-node
                  className="absolute -left-8 md:-left-16 top-8 w-[15px] h-[15px] rounded-full bg-[#050505] border-2 border-[#CCFF00] flex items-center justify-center"
                  style={{ boxShadow: "0 0 16px rgba(204,255,0,0.35)" }}
                >
                  <span className="w-1 h-1 rounded-full bg-[#CCFF00]" />
                </span>

                {/* Card */}
                <div className="group relative rounded-3xl p-7 md:p-8 backdrop-blur-xl bg-gradient-to-br from-white/[0.06] via-white/[0.025] to-white/[0.01] border border-white/[0.07] overflow-hidden hover:border-[#CCFF00]/25 transition-all duration-500 hover:shadow-[0_12px_60px_rgba(204,255,0,0.05),inset_0_1px_0_rgba(255,255,255,0.1)]">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[#CCFF00]/[0.03] blur-[80px] group-hover:bg-[#CCFF00]/[0.08] transition-all duration-700 pointer-events-none" />

                  <div className="relative flex flex-col md:flex-row gap-6 md:gap-10">
                    <div className="md:w-2/3">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-[11px] tracking-wider uppercase font-medium px-3 py-1 rounded-full bg-[#CCFF00]/[0.1] border border-[#CCFF00]/25 text-[#CCFF00]">
                          {p.label}
                        </span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-semibold tracking-tight mb-3 group-hover:text-[#CCFF00] transition-colors duration-300">
                        {p.title}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed max-w-lg">
                        {p.body}
                      </p>
                    </div>

                    <div className="md:w-1/3 md:border-l md:border-white/[0.06] md:pl-8">
                      <p className="text-[10px] tracking-widest uppercase text-gray-600 font-medium mb-3">
                        Output
                      </p>
                      <ul className="space-y-2">
                        {p.out.map((o) => (
                          <li key={o} className="flex items-center gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00]/60 shrink-0" />
                            <span className="text-xs text-gray-400">{o}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Big number */}
                  <span className="absolute bottom-4 right-6 text-7xl md:text-8xl font-bold tracking-tighter leading-none text-white/[0.025] group-hover:text-[#CCFF00]/[0.06] transition-colors duration-500 pointer-events-none">
                    {p.n}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}