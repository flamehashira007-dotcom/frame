"use client";

import { useState } from "react";
import { Plus, Minus, ArrowRight } from "lucide-react";
import Image from "next/image";

const services = [
  {
    number: "01",
    title: "Branding Design",
    tags: ["Brand Strategy", "Visual Identity"],
    description:
      "Modern, responsive, and user-friendly websites designed to engage visitors and drive conversions.",
    image: "/service-branding.png",
    accent: { from: "#CCFF00", to: "#3a5406", glow: "rgba(204,255,0,0.08)" },
  },
  {
    number: "02",
    title: "Digital Design",
    tags: ["Motion Design", "Accessibility"],
    description:
      "Captivating digital experiences with fluid motion and accessibility-first thinking that resonates with every audience.",
    image: "/service-branding.png",
    accent: { from: "#a78bfa", to: "#4c1d95", glow: "rgba(167,139,250,0.08)" },
  },
  {
    number: "03",
    title: "Web Design",
    tags: ["Landing Pages", "Portfolio Sites"],
    description:
      "Pixel-perfect landing pages and portfolio sites built to convert visitors into loyal customers.",
    image: "/service-branding.png",
    accent: { from: "#38bdf8", to: "#0c4a6e", glow: "rgba(56,189,248,0.08)" },
  },
  {
    number: "04",
    title: "UI,UX design",
    tags: ["User Research", "Wireframing"],
    description:
      "Research-driven interfaces and wireframes that put the user at the center of every interaction.",
    image: "/service-branding.png",
    accent: { from: "#f472b6", to: "#831843", glow: "rgba(244,114,182,0.08)" },
  },
];

export default function OurServices() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="relative bg-[#050505] text-white pt-32 md:pt-40 pb-28 px-6 md:px-12 lg:px-20 overflow-hidden">
      {/* ── Radiant background orbs ── */}
      <div className="absolute top-20 right-[10%] w-[600px] h-[600px] rounded-full bg-violet-500/[0.03] blur-[180px] pointer-events-none" />
      <div className="absolute top-1/2 left-[5%] w-[500px] h-[500px] rounded-full bg-[#CCFF00]/[0.02] blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-[20%] w-[400px] h-[400px] rounded-full bg-cyan-500/[0.025] blur-[140px] pointer-events-none" />
      <div className="absolute bottom-40 left-[30%] w-[350px] h-[350px] rounded-full bg-pink-500/[0.02] blur-[130px] pointer-events-none" />

      {/* ── Subtle noise texture ── */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* ── Header ── */}
        <div className="mb-16">
          <div className="flex items-center gap-2.5 mb-8">
            <span className="relative w-2.5 h-2.5 rounded-full bg-[#CCFF00]">
              <span className="absolute inset-0 rounded-full bg-[#CCFF00] animate-ping opacity-40" />
            </span>
            <span className="text-sm text-gray-400 tracking-widest uppercase font-medium">
              Shape what&apos;s next.
            </span>
          </div>

          <div className="flex items-start justify-between">
            <h2 className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight leading-[0.95] italic">
              <span className="bg-gradient-to-r from-white via-white to-gray-500 bg-clip-text text-transparent">
                Our Services
              </span>
            </h2>
            <span className="text-lg sm:text-xl text-gray-500 font-mono mt-2">
              {String(services.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* ── Accordion ── */}
        <div className="flex flex-col gap-4">
          {services.map((service, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={service.number}
                className="group relative rounded-3xl overflow-hidden transition-all duration-600"
                style={{
                  // dynamic radiant border via box-shadow trick
                  boxShadow: isOpen
                    ? `0 0 0 1px rgba(255,255,255,0.12), 0 12px 60px ${service.accent.glow}, inset 0 1px 0 rgba(255,255,255,0.1)`
                    : "0 0 0 1px rgba(255,255,255,0.06)",
                }}
              >
                {/* ── Glass background layers ── */}
                <div
                  className="absolute inset-0 backdrop-blur-2xl transition-opacity duration-500"
                  style={{
                    background: isOpen
                      ? `linear-gradient(135deg, ${service.accent.from}08 0%, rgba(255,255,255,0.04) 40%, rgba(255,255,255,0.01) 100%)`
                      : "rgba(255,255,255,0.02)",
                  }}
                />

                {/* Radiant shimmer — colored per card */}
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px transition-opacity duration-500"
                  style={{
                    background: isOpen
                      ? `linear-gradient(90deg, transparent, ${service.accent.from}60, transparent)`
                      : "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
                  }}
                />

                {/* Radiant corner glow when open */}
                {isOpen && (
                  <div
                    className="absolute -top-24 -left-24 w-64 h-64 rounded-full blur-[100px] pointer-events-none animate-pulse"
                    style={{ background: `${service.accent.from}10` }}
                  />
                )}
                {isOpen && (
                  <div
                    className="absolute -bottom-20 -right-20 w-48 h-48 rounded-full blur-[80px] pointer-events-none"
                    style={{ background: `${service.accent.to}15` }}
                  />
                )}

                {/* ── Header row (always visible) ── */}
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="relative w-full flex items-center gap-6 md:gap-10 p-6 md:p-8 cursor-pointer text-left z-10"
                >
                  {/* Number — gradient colored when open */}
                  <span
                    className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight shrink-0 transition-all duration-500"
                    style={{
                      background: isOpen
                        ? `linear-gradient(135deg, ${service.accent.from}, ${service.accent.to})`
                        : undefined,
                      WebkitBackgroundClip: isOpen ? "text" : undefined,
                      WebkitTextFillColor: isOpen ? "transparent" : undefined,
                      color: isOpen ? undefined : "rgba(255,255,255,0.06)",
                    }}
                  >
                    {service.number}.
                  </span>

                  {/* Title + tags */}
                  <div className="flex-1 min-w-0">
                    <h3
                      className={`text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight transition-colors duration-300 ${
                        isOpen
                          ? "text-white"
                          : "text-gray-400 group-hover:text-white"
                      }`}
                    >
                      {service.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-4 py-1.5 rounded-full backdrop-blur-md transition-all duration-300"
                          style={{
                            background: isOpen
                              ? `${service.accent.from}10`
                              : "rgba(255,255,255,0.04)",
                            border: `1px solid ${
                              isOpen
                                ? `${service.accent.from}25`
                                : "rgba(255,255,255,0.07)"
                            }`,
                            color: isOpen
                              ? service.accent.from
                              : "rgb(107,114,128)",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Toggle icon — radiant border when open */}
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 backdrop-blur-md"
                    style={{
                      background: isOpen
                        ? `${service.accent.from}12`
                        : "rgba(255,255,255,0.03)",
                      border: `1px solid ${
                        isOpen
                          ? `${service.accent.from}40`
                          : "rgba(255,255,255,0.08)"
                      }`,
                      boxShadow: isOpen
                        ? `0 0 20px ${service.accent.from}15`
                        : "none",
                      color: isOpen ? service.accent.from : "rgb(107,114,128)",
                    }}
                  >
                    {isOpen ? (
                      <Minus className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {/* ── Expanded content ── */}
                <div
                  className="relative z-10 overflow-hidden transition-all duration-500 ease-out"
                  style={{
                    maxHeight: isOpen ? "500px" : "0px",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div className="px-6 md:px-8 pb-8 flex flex-col md:flex-row gap-8 md:pl-[calc(theme(spacing.8)+5rem)]">
                    {/* Image with radiant border */}
                    <div
                      className="relative w-full md:w-[320px] aspect-[16/10] rounded-2xl overflow-hidden shrink-0"
                      style={{
                        boxShadow: `0 0 0 1px ${service.accent.from}20, 0 8px 30px ${service.accent.glow}`,
                      }}
                    >
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover"
                        sizes="320px"
                      />
                      {/* Image overlay gradient */}
                      <div
                        className="absolute inset-0 opacity-20"
                        style={{
                          background: `linear-gradient(135deg, ${service.accent.from}30, transparent 60%)`,
                        }}
                      />
                    </div>

                    {/* Description + CTA */}
                    <div className="flex flex-col justify-between gap-6">
                      <p className="text-sm sm:text-base text-gray-400 leading-relaxed max-w-sm">
                        {service.description}
                      </p>

                      <button
                        className="inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 w-fit group/btn hover:scale-[1.03]"
                        style={{
                          background: `linear-gradient(135deg, ${service.accent.from}15, rgba(255,255,255,0.04))`,
                          border: `1px solid ${service.accent.from}30`,
                          color: "white",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = `linear-gradient(135deg, ${service.accent.from}, ${service.accent.to})`;
                          e.currentTarget.style.color = "black";
                          e.currentTarget.style.boxShadow = `0 0 30px ${service.accent.glow}`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = `linear-gradient(135deg, ${service.accent.from}15, rgba(255,255,255,0.04))`;
                          e.currentTarget.style.color = "white";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      >
                        Explore Now
                        <span
                          className="w-7 h-7 rounded-full flex items-center justify-center transition-colors"
                          style={{ background: `${service.accent.from}20` }}
                        >
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
