"use client";

import Image from "next/image";
import { useState } from "react";

const steps = [
  {
    number: ".01",
    label: "Project Kick-Off",
    title: "Art Direction and Wireframing",
    image: "/process-wireframe.png",
    accent: "#CCFF00",
  },
  {
    number: ".02",
    label: "Design Process",
    title: "Design and Prototype Process",
    image: "/process-design.png",
    accent: "#a78bfa",
  },
  {
    number: ".03",
    label: "Testing",
    title: "Product Testing, Quality Control",
    image: "/process-testing.png",
    accent: "#38bdf8",
  },
];

export default function OurProcess() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative bg-[#050505] text-white pt-32 md:pt-40 pb-28 px-6 md:px-12 lg:px-20 overflow-hidden">
      {/* Radiant blurs */}
      <div className="absolute top-10 left-[15%] w-[500px] h-[500px] rounded-full bg-[#CCFF00]/[0.015] blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-[10%] w-[450px] h-[450px] rounded-full bg-violet-500/[0.02] blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* ── Header ── */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-10 mb-20">
          <div className="flex items-center gap-2.5 lg:pt-4">
            <span className="relative w-2.5 h-2.5 rounded-full bg-[#CCFF00]">
              <span className="absolute inset-0 rounded-full bg-[#CCFF00] animate-ping opacity-40" />
            </span>
            <span className="text-sm text-gray-400 tracking-widest uppercase font-medium">
              Our Process
            </span>
          </div>

          <div className="max-w-2xl">
            <h2 className="text-4xl sm:text-5xl md:text-[4rem] font-bold tracking-tight leading-[1.05] italic mb-6">
              <span className="bg-gradient-to-r from-white via-white to-gray-500 bg-clip-text text-transparent">
                From Vision To
              </span>
              <br />
              <span className="bg-gradient-to-r from-white via-gray-300 to-gray-600 bg-clip-text text-transparent">
                Measurable Value
              </span>
            </h2>
            <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-md">
              From breakthrough portfolios to performance-driven platforms — our
              numbers speak louder than words.
            </p>
          </div>
        </div>

        {/* ── Horizontal Accordion ── */}
        <div className="flex flex-col md:flex-row gap-3 min-h-[480px]">
          {steps.map((step, i) => {
            const isActive = activeIndex === i;

            return (
              <button
                key={step.number}
                onClick={() => setActiveIndex(i)}
                className="relative rounded-3xl overflow-hidden cursor-pointer text-left transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] backdrop-blur-2xl"
                style={{
                  flex: isActive ? "3 1 0%" : "1 1 0%",
                  boxShadow: isActive
                    ? `0 0 0 1px ${step.accent}25, 0 12px 50px ${step.accent}08`
                    : "0 0 0 1px rgba(255,255,255,0.06)",
                  minHeight: "480px",
                }}
              >
                {/* ── Glass background ── */}
                <div
                  className="absolute inset-0 transition-all duration-700"
                  style={{
                    background: isActive
                      ? `linear-gradient(135deg, ${step.accent}06 0%, rgba(255,255,255,0.03) 50%, rgba(255,255,255,0.01) 100%)`
                      : "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.015))",
                  }}
                />

                {/* Shimmer line */}
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px transition-all duration-500"
                  style={{
                    background: isActive
                      ? `linear-gradient(90deg, transparent, ${step.accent}50, transparent)`
                      : "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
                  }}
                />

                {/* ── ACTIVE STATE: Full image + content ── */}
                <div
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{ opacity: isActive ? 1 : 0, pointerEvents: isActive ? "auto" : "none" }}
                >
                  {/* Full background image */}
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 60vw"
                  />
                  {/* Gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent" />
                  <div
                    className="absolute inset-0 opacity-15"
                    style={{
                      background: `linear-gradient(135deg, ${step.accent}20, transparent 60%)`,
                    }}
                  />

                  {/* Bottom content */}
                  <div className="absolute bottom-0 left-0 right-0 p-7 md:p-8">
                    {/* Label */}
                    <span
                      className="inline-block text-[11px] tracking-wider uppercase font-medium px-3 py-1 rounded-full mb-3 backdrop-blur-md"
                      style={{
                        background: `${step.accent}15`,
                        border: `1px solid ${step.accent}25`,
                        color: step.accent,
                      }}
                    >
                      {step.label}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight leading-tight text-white">
                      {step.title}
                    </h3>

                    {/* Bottom divider line */}
                    <div className="mt-6 w-full h-px" style={{ background: `linear-gradient(90deg, ${step.accent}, transparent)` }} />
                  </div>

                  {/* Number — bottom right */}
                  <span
                    className="absolute bottom-6 right-8 text-8xl sm:text-9xl font-bold tracking-tighter leading-none"
                    style={{
                      background: `linear-gradient(180deg, ${step.accent}20, ${step.accent}08)`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {step.number}
                  </span>
                </div>

                {/* ── COLLAPSED STATE: Vertical text layout ── */}
                <div
                  className="absolute inset-0 flex flex-col justify-between p-6 md:p-7 transition-opacity duration-500"
                  style={{ opacity: isActive ? 0 : 1, pointerEvents: isActive ? "none" : "auto" }}
                >
                  {/* Top: label + title */}
                  <div>
                    <span className="text-[11px] tracking-wider uppercase text-gray-600 font-medium block mb-3">
                      {step.label}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-semibold tracking-tight leading-tight text-gray-300">
                      {step.title}
                    </h3>
                  </div>

                  {/* Bottom: large number */}
                  <div className="flex justify-end">
                    <span
                      className="text-8xl sm:text-9xl font-bold tracking-tighter leading-none"
                      style={{
                        color: `${step.accent}10`,
                      }}
                    >
                      {step.number}
                    </span>
                  </div>

                  {/* Bottom line */}
                  <div className="absolute bottom-0 left-6 right-6 h-px bg-white/[0.06]" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
