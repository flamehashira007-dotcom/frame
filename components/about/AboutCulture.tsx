"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const rowA = [
  "Async by default", "Friday demos", "No standups", "Four timezones",
  "Rollover hours", "Open salary bands", "Books on the studio",
];

const rowB = [
  "One design system", "Ship weekly", "Argue in public", "Document everything",
  "No overtime culture", "Sabbatical at 5 years", "Conference budget",
];

function Strip({ items, reverse }: { items: string[]; reverse?: boolean }) {
  return (
    <div className="relative overflow-hidden py-3">
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, #050505 0%, transparent 10%, transparent 90%, #050505 100%)",
        }}
      />
      <div
        className="flex gap-4 w-max"
        style={{
          animation: `ticker ${reverse ? "36s" : "44s"} linear infinite ${reverse ? "reverse" : ""}`,
        }}
      >
        {[...items, ...items].map((t, i) => (
          <span
            key={i}
            className="flex items-center gap-3 shrink-0 bg-gradient-to-b from-white/[0.08] to-white/[0.03] border border-white/[0.10] rounded-full px-6 py-3 backdrop-blur-xl text-sm text-gray-300 whitespace-nowrap"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00]/70" />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function AboutCulture() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      gsap.set("[data-cu-head], [data-cu-strips]", { opacity: 1, y: 0, clearProps: "filter" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to("[data-cu-head]", {
        y: 0, opacity: 1, filter: "blur(0px)", duration: 1, ease: "power4.out",
        scrollTrigger: { trigger: "[data-cu-head]", start: "top 90%" },
      });

      gsap.to("[data-cu-strips]", {
        opacity: 1, duration: 1, ease: "power2.out",
        scrollTrigger: { trigger: "[data-cu-strips]", start: "top 92%" },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative bg-[#050505] text-white pt-32 md:pt-40 pb-28 overflow-hidden"
    >
      <div className="absolute top-10 right-[15%] w-[500px] h-[500px] rounded-full bg-violet-500/[0.02] blur-[150px] pointer-events-none" />

      <div className="px-6 md:px-12 lg:px-20 mb-14">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2.5 mb-8">
            <span className="relative w-2.5 h-2.5 rounded-full bg-[#CCFF00]">
              <span className="absolute inset-0 rounded-full bg-[#CCFF00] animate-ping opacity-40" />
            </span>
            <span className="text-sm text-gray-400 tracking-widest uppercase font-medium">
              How we work
            </span>
          </div>

          <h2
            data-cu-head
            className="text-4xl sm:text-5xl md:text-[3.5rem] font-bold tracking-tight leading-[1.05] italic max-w-3xl mx-auto"
            style={{ opacity: 0, transform: "translateY(40px)", filter: "blur(10px)" }}
          >
            <span className="bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
              The culture isn&apos;t a poster.
            </span>
            <br />
            <span className="bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
              It&apos;s the calendar.
            </span>
          </h2>
        </div>
      </div>

      <div data-cu-strips style={{ opacity: 0 }} className="flex flex-col gap-2">
        <Strip items={rowA} />
        <Strip items={rowB} reverse />
        <Strip items={rowA} />
      </div>
    </section>
  );
}