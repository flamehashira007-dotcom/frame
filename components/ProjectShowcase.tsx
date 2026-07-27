"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowRight, Layers, Sparkles } from "lucide-react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

const projects = [
  {
    id: "marketing-portfolio",
    icon: Sparkles,
    label: "Marketing",
    number: "01",
    year: "2025",
    title: "Marketing Portfolio.",
    body:
      "Our full marketing and sales deck — who we are, what we do, and how we've helped SaaS and e-commerce brands grow.",
    tags: ["Brand Identity", "Case Studies", "Services", "Process"],
    accent: "#CCFF00",
    href: "/Frameonix_Marketing_Portfolio.pdf",
  },
  {
    id: "web-portfolio",
    icon: Layers,
    label: "Web",
    number: "02",
    year: "2025",
    title: "Web Portfolio.",
    body:
      "A closer look at our web design and development work — UI/UX, front-end builds, and the tech stack behind them.",
    tags: ["Web Design", "Web Development", "UI/UX", "Tech Stack"],
    accent: "#a78bfa",
    href: "/Frameonix_Web_Portfolio.pdf",
  },
];

export default function ProjectShowcase() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      gsap.set("[data-proj-card]", { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-proj-card]").forEach((card) => {
        gsap.to(card, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          overwrite: "auto",
          scrollTrigger: { trigger: card, start: "top 92%", once: true },
        });
      });
    }, rootRef);

    // On reload, the browser can restore scroll position (or images/fonts can
    // shift layout) before ScrollTrigger's start points are computed. If the
    // restored scroll position is already past "top 92%" for a card, the
    // trigger never fires and the card stays stuck at the initial opacity: 0 /
    // translateY(40) inline style forever. Refreshing after load/fonts
    // recalculates trigger positions against the current scroll position and
    // fires any that should already be active.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready?.then(refresh);

    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative bg-[#050505] text-white py-32 overflow-hidden border-t border-white/[0.06]"
    >
      {/* Decorative blurs */}
      <div className="absolute top-32 right-0 w-[500px] h-[500px] rounded-full bg-violet-500/[0.02] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] rounded-full bg-[#CCFF00]/[0.01] blur-[160px] pointer-events-none" />

      <div className="relative max-w-[1536px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 w-full">
        {/* ── Header ── */}
        <div className="mb-16">
          <div className="flex items-center gap-2.5 mb-8">
            <span className="relative w-2.5 h-2.5 rounded-full bg-[#CCFF00]">
              <span className="absolute inset-0 rounded-full bg-[#CCFF00] animate-ping opacity-40" />
            </span>
            <span className="text-sm text-gray-400 tracking-widest uppercase font-medium">
              Project showcase
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1]">
                Selected Work.
                <sup className="text-lg sm:text-xl font-normal text-gray-500 ml-2 align-top">
                  ({projects.length})
                </sup>
              </h2>
            </div>

            <div className="flex items-end justify-between lg:flex-col lg:items-end gap-4">
              <p className="text-sm sm:text-base text-gray-500 max-w-sm leading-relaxed">
                We&apos;ve helped businesses across industries achieve their
                goals. Here are some of our recent projects.
              </p>
              <span className="text-xs text-gray-600 tracking-wider font-mono whitespace-nowrap">
                16-25®
              </span>
            </div>
          </div>
        </div>

        {/* ── Project cards — same treatment as Portfolio Decks ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
          {projects.map((p) => {
            const Icon = p.icon;

            return (
              <div
                key={p.id}
                data-proj-card
                className="group relative rounded-3xl p-8 md:p-10 overflow-hidden backdrop-blur-xl flex flex-col transition-shadow duration-500"
                style={{
                  opacity: 0,
                  transform: "translateY(40px)",
                  boxShadow: "0 0 0 1px rgba(255,255,255,0.10)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 0 1px ${p.accent}40, 0 16px 70px ${p.accent}12, inset 0 1px 0 rgba(255,255,255,0.12)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 0 1px rgba(255,255,255,0.10)";
                }}
              >
                {/* Glass wash */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `linear-gradient(150deg, ${p.accent}0d 0%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.025) 100%)`,
                  }}
                />
                {/* Top shimmer */}
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px pointer-events-none"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${p.accent}60, transparent)`,
                  }}
                />
                {/* Corner glow */}
                <div
                  className="absolute -top-24 -right-20 w-56 h-56 rounded-full blur-[90px] pointer-events-none opacity-30 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ background: `${p.accent}18` }}
                />

                <div className="relative flex flex-col flex-1">
                  {/* Icon + label */}
                  <div className="flex items-center justify-between mb-7">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{
                        background: `${p.accent}1c`,
                        border: `1px solid ${p.accent}40`,
                      }}
                    >
                      <Icon className="w-5 h-5" style={{ color: p.accent }} />
                    </div>

                    <span
                      className="text-[11px] tracking-wider uppercase font-medium px-3 py-1.5 rounded-full backdrop-blur-md"
                      style={{
                        background: `${p.accent}12`,
                        border: `1px solid ${p.accent}28`,
                        color: p.accent,
                      }}
                    >
                      {p.label}
                    </span>
                  </div>

                  {/* Title — fixed height so both cards line up */}
                  <h2
                    className="text-2xl font-semibold tracking-tight leading-snug mb-3 text-white transition-colors duration-300 group-hover:text-[color:var(--proj-accent)] md:min-h-[4rem]"
                    style={{ ["--proj-accent" as string]: p.accent }}
                  >
                    {p.title}
                  </h2>

                  {/* Body — fixed height */}
                  <p className="text-sm text-gray-400 leading-relaxed mb-7 md:min-h-[5rem]">
                    {p.body}
                  </p>

                  {/* Tags — fixed height, top-aligned */}
                  <div className="flex flex-wrap content-start gap-2 mb-8 md:min-h-[4.5rem]">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-3.5 py-1.5 rounded-full text-gray-400 bg-white/[0.04] border border-white/[0.09] h-fit"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Project meta — pinned to bottom */}
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-7 mt-auto pt-6 border-t border-white/[0.07]">
                    <span className="flex items-center gap-2 font-mono">
                      {p.number}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-gray-700" />
                    <span>{p.year}</span>
                  </div>

                  {/* Primary CTA — downloads the PDF from /public instead of navigating */}
                  <a
                    href={p.href}
                    download
                    className="group/btn flex items-center justify-center gap-3 px-7 py-4 rounded-full font-semibold text-sm transition-all duration-300 w-full"
                    style={{
                      background: `linear-gradient(135deg, ${p.accent}18, rgba(255,255,255,0.04))`,
                      border: `1px solid ${p.accent}35`,
                      color: "white",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = p.accent;
                      e.currentTarget.style.color = "black";
                      e.currentTarget.style.boxShadow = `0 0 30px ${p.accent}30`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = `linear-gradient(135deg, ${p.accent}18, rgba(255,255,255,0.04))`;
                      e.currentTarget.style.color = "white";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    View PDF
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                  </a>

                  {/* Secondary link — also a direct PDF download */}
                  <a
                    href={p.href}
                    download
                    className="text-xs text-gray-500 hover:text-gray-300 transition-colors text-center mt-4"
                  >
                    or download the case study
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}