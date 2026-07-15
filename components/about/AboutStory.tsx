"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const paras = [
  {
    lead: "It started as a complaint.",
    body: "Three of us were freelancing for agencies that sold strategy decks and delivered stock templates. The gap between the pitch and the product was so wide you could drive a truck through it. So we stopped complaining and opened a studio.",
  },
  {
    lead: "The rule was simple:",
    body: "whoever sells the work does the work. No account layer, no handoff to a junior nobody mentioned. That rule cost us some big contracts early on. It also means the people you meet on the first call are still on the project at launch.",
  },
  {
    lead: "Ten years later, that's still the whole model.",
    body: "We stayed small on purpose. Twelve people, one design system, one set of standards. We turn down more work than we take — not out of arrogance, but because the alternative is doing it badly.",
  },
];

const stats = [
  { value: "10", label: "years running" },
  { value: "12", label: "people, total" },
  { value: "1", label: "design system" },
  { value: "0", label: "account managers" },
];

export default function AboutStory() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      gsap.set("[data-st-panel], [data-st-para], [data-st-stat]", {
        opacity: 1, y: 0, scale: 1, clipPath: "inset(0% 0 0 0)", filter: "blur(0px)",
      });
      return;
    }

    const ctx = gsap.context(() => {
      // Panel reveal
      gsap.to("[data-st-panel]", {
        clipPath: "inset(0% 0 0 0)",
        duration: 1.3,
        ease: "power4.out",
        scrollTrigger: { trigger: "[data-st-panel]", start: "top 85%", once: true },
      });

      // Big numeral count-up + settle
      const numEl = document.querySelector("[data-st-num]");
      if (numEl) {
        const counter = { val: 0 };
        gsap.to(counter, {
          val: 10,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: "[data-st-panel]", start: "top 80%", once: true },
          onUpdate: () => {
            numEl.textContent = Math.round(counter.val).toString();
          },
        });
      }

      // Continuous slow rotation for the orbit ring
      gsap.to("[data-st-ring]", {
        rotate: 360,
        duration: 40,
        ease: "none",
        repeat: -1,
      });

      // Stat chips stagger in
      gsap.from("[data-st-stat]", {
        y: 24,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: "[data-st-panel]", start: "top 75%", once: true },
      });

      // Paragraphs — per element, no stagger
      gsap.utils.toArray<HTMLElement>("[data-st-para]").forEach((p) => {
        gsap.to(p, {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power3.out",
          overwrite: "auto",
          scrollTrigger: { trigger: p, start: "top 88%", once: true },
        });
      });

      // Timeline line grows with scroll
      gsap.to("[data-st-timeline]", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-st-narrative]",
          start: "top 70%",
          end: "bottom 60%",
          scrub: true,
        },
      });

      // Badge counter line
      gsap.from("[data-st-line]", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.2,
        ease: "power3.inOut",
        scrollTrigger: { trigger: "[data-st-line]", start: "top 92%" },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative bg-[#050505] text-white pt-32 md:pt-40 pb-28 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      <div className="absolute top-20 left-[10%] w-[500px] h-[500px] rounded-full bg-[#CCFF00]/[0.015] blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-[5%] w-[400px] h-[400px] rounded-full bg-[#CCFF00]/[0.02] blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <div className="flex items-center gap-2.5 mb-16">
          <span className="relative w-2.5 h-2.5 rounded-full bg-[#CCFF00]">
            <span className="absolute inset-0 rounded-full bg-[#CCFF00] animate-ping opacity-40" />
          </span>
          <span className="text-sm text-gray-400 tracking-widest uppercase font-medium">
            Our story
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Sticky typographic panel — replaces photo */}
          <div className="lg:sticky lg:top-32 lg:h-fit">
            <div
              data-st-panel
              className="relative rounded-3xl overflow-hidden border border-white/[0.1] px-8 py-12 md:px-10 md:py-14"
              style={{
                clipPath: "inset(100% 0 0 0)",
                background:
                  "radial-gradient(120% 100% at 0% 0%, rgba(204,255,0,0.06) 0%, transparent 55%), #0a0a0a",
                boxShadow: "0 30px 90px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
            >
              {/* faint blueprint grid */}
              <div
                className="absolute inset-0 opacity-[0.06] pointer-events-none"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />

              {/* orbit ring behind numeral */}
              <div className="relative flex items-center justify-center py-6">
                <svg
                  data-st-ring
                  viewBox="0 0 200 200"
                  className="absolute w-[220px] h-[220px] md:w-[260px] md:h-[260px]"
                >
                  <circle
                    cx="100"
                    cy="100"
                    r="92"
                    fill="none"
                    stroke="rgba(204,255,0,0.18)"
                    strokeWidth="1"
                    strokeDasharray="2 8"
                  />
                  <circle cx="100" cy="8" r="3" fill="#CCFF00" />
                </svg>

                <div className="relative text-center">
                  <p className="flex items-start justify-center leading-none">
                    <span
                      data-st-num
                      className="text-[6rem] md:text-[7.5rem] font-bold tracking-tight text-white"
                    >
                      0
                    </span>
                    <span className="text-2xl md:text-3xl font-bold text-[#CCFF00] mt-2">yrs</span>
                  </p>
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mt-2">
                    Same rule, same people
                  </p>
                </div>
              </div>

              <div data-st-line className="h-px w-full bg-gradient-to-r from-[#CCFF00] to-transparent my-8" />

              {/* stat chips grid */}
              <div className="grid grid-cols-2 gap-3">
                {stats.map((s, i) => (
                  <div
                    key={i}
                    data-st-stat
                    className="rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3"
                  >
                    <p className="text-xl font-bold text-white">
                      {s.value}
                    </p>
                    <p className="text-[11px] text-gray-500 mt-0.5 leading-tight">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Narrative with growing timeline */}
          <div data-st-narrative className="relative flex flex-col gap-12 lg:pt-8 pl-8">
            <div className="absolute left-0 top-1 bottom-1 w-px bg-white/[0.08]">
              <div
                data-st-timeline
                className="absolute inset-x-0 top-0 bottom-0 w-full bg-gradient-to-b from-[#CCFF00] to-[#CCFF00]/20 origin-top"
                style={{ transform: "scaleY(0)" }}
              />
            </div>

            {paras.map((p, i) => (
              <div key={i} className="relative">
                <span className="absolute -left-8 top-1 w-2.5 h-2.5 rounded-full bg-[#050505] border-2 border-[#CCFF00]" />
                <div
                  data-st-para
                  style={{ opacity: 0, transform: "translateY(40px)", filter: "blur(6px)" }}
                >
                  <span className="text-xs font-mono text-[#CCFF00]/50 block mb-4">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-xl sm:text-2xl md:text-[1.6rem] leading-[1.5] tracking-[-0.01em]">
                    <span className="text-white font-medium">{p.lead}</span>{" "}
                    <span className="text-gray-400">{p.body}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}