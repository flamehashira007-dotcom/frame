"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const pillars = [
  {
    k: "01",
    t: "Strategy first",
    d: "We diagnose before we design. No pixels until the problem is named.",
  },
  {
    k: "02",
    t: "One team, one system",
    d: "Brand, product, and growth share a token set and a vocabulary.",
  },
  {
    k: "03",
    t: "Shipped, not shelved",
    d: "We hand over production-ready code, not a PDF of good intentions.",
  },
];

function Stat({
  end,
  suffix,
  label,
}: {
  end: number;
  suffix: string;
  label: string;
}) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        obs.disconnect();
        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min((t - t0) / 1800, 1);
          setN(Math.floor((1 - Math.pow(1 - p, 3)) * end));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [end]);

  return (
    <div ref={ref} data-ov-stat className="text-center sm:text-left">
      <p className="text-4xl sm:text-5xl font-bold tabular-nums tracking-tight">
        {n}
        <span className="text-[#CCFF00]">{suffix}</span>
      </p>
      <p className="text-sm text-gray-500 mt-1.5">{label}</p>
    </div>
  );
}

export default function ServicesOverview() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      gsap.set("[data-ov-pillar], [data-ov-head]", {
        opacity: 1,
        y: 0,
        clearProps: "filter,clipPath",
      });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to("[data-ov-head]", {
        clipPath: "inset(0 0 0% 0)",
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1,
        ease: "power4.out",
        scrollTrigger: { trigger: "[data-ov-head]", start: "top 90%" },
      });

      gsap.utils.toArray<HTMLElement>("[data-ov-pillar]").forEach((p) => {
        gsap.to(p, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          overwrite: "auto",
          scrollTrigger: { trigger: p, start: "top 95%", once: true },
        });
      });

      gsap.from("[data-ov-line]", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.2,
        ease: "power3.inOut",
        scrollTrigger: { trigger: "[data-ov-stats]", start: "top 92%" },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative bg-[#050505] text-white pt-32 md:pt-40 pb-24 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] rounded-full bg-[#CCFF00]/[0.015] blur-[160px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <div className="flex items-center gap-2.5 mb-8">
          <span className="relative w-2.5 h-2.5 rounded-full bg-[#CCFF00]">
            <span className="absolute inset-0 rounded-full bg-[#CCFF00] animate-ping opacity-40" />
          </span>
          <span className="text-sm text-gray-400 tracking-widest uppercase font-medium">
            Overview
          </span>
        </div>

        <h2
          data-ov-head
          className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-[1.15] max-w-3xl mb-16"
          style={{
            opacity: 0,
            transform: "translateY(40px)",
            filter: "blur(10px)",
            clipPath: "inset(0 0 100% 0)",
          }}
        >
          Most studios sell you a deliverable.{" "}
          <span className="bg-gradient-to-r from-white via-gray-300 to-gray-600 bg-clip-text text-transparent">
            We sell you a system that keeps paying out.
          </span>
        </h2>

        <div
          data-ov-grid
          className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16"
        >
          {pillars.map((p) => (
            <div
              key={p.k}
              data-ov-pillar
              style={{ opacity: 0, transform: "translateY(50px)" }}
              className="group relative bg-gradient-to-b from-white/[0.10] to-white/[0.04] border border-white/[0.12] rounded-3xl p-8 backdrop-blur-xl overflow-hidden hover:border-white/[0.22] transition-all duration-500 hover:shadow-[0_8px_60px_rgba(204,255,0,0.06),inset_0_1px_0_rgba(255,255,255,0.1)]"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full bg-[#CCFF00]/[0.04] blur-[60px] group-hover:bg-[#CCFF00]/[0.09] transition-all duration-700 pointer-events-none" />
              <span className="relative text-6xl font-bold tracking-tighter text-white/[0.07] group-hover:text-[#CCFF00]/20 transition-colors duration-500">
                {p.k}
              </span>
              <h3 className="relative text-xl font-semibold mt-4 mb-2 group-hover:text-[#CCFF00] transition-colors duration-300">
                {p.t}
              </h3>
              <p className="relative text-sm text-gray-500 leading-relaxed">
                {p.d}
              </p>
            </div>
          ))}
        </div>

        <div
          data-ov-line
          className="h-px w-full bg-gradient-to-r from-[#CCFF00]/40 via-white/[0.08] to-transparent mb-12"
        />

        <div data-ov-stats className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <Stat end={230} suffix="+" label="Projects launched" />
          <Stat end={400} suffix="+" label="Trusted partners" />
          <Stat end={12} suffix="" label="Countries served" />
          <Stat end={98} suffix="%" label="Client retention" />
        </div>
      </div>
    </section>
  );
}
