"use client";

import { useEffect, useRef, useState } from "react";
import {
  Search, Share2, MousePointerClick, Megaphone, PenLine,
  Mail, Clapperboard, Waves, Workflow,
} from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/* ── micro-visual: rising rank bars ── */
function RankViz() {
  const [on, setOn] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(([e]) => e.isIntersecting && setOn(true), { threshold: 0.2 });
    o.observe(el);
    return () => o.disconnect();
  }, []);
  const rows = [40, 58, 72, 100];
  return (
    <div ref={ref} className="flex flex-col gap-2.5">
      {rows.map((w, i) => (
        <div key={i} className="flex items-center gap-2.5">
          <span className="text-[10px] font-mono text-gray-500 w-4 shrink-0">#{4 - i}</span>
          <div className="flex-1 h-1.5 rounded-full bg-white/[0.08] overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000 ease-out"
              style={{
                width: on ? `${w}%` : "6%",
                transitionDelay: `${i * 140}ms`,
                background: i === 3 ? "#CCFF00" : "rgba(204,255,0,0.35)",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── micro-visual: sparkline ── */
function SparkViz({ color = "#CCFF00" }: { color?: string }) {
  const [on, setOn] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(([e]) => e.isIntersecting && setOn(true), { threshold: 0.2 });
    o.observe(el);
    return () => o.disconnect();
  }, []);
  return (
    <div ref={ref} className="h-16">
      <svg viewBox="0 0 200 60" preserveAspectRatio="none" className="w-full h-full" fill="none">
        <path
          d="M4,50 Q28,46 48,38 T92,30 Q116,26 136,14 T196,8"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={{
            strokeDasharray: 260,
            strokeDashoffset: on ? 0 : 260,
            transition: "stroke-dashoffset 1.8s ease-out",
          }}
        />
        <path
          d="M4,50 Q28,46 48,38 T92,30 Q116,26 136,14 T196,8"
          stroke={color}
          strokeWidth="7"
          strokeLinecap="round"
          opacity="0.2"
          vectorEffect="non-scaling-stroke"
          style={{ filter: "blur(5px)" }}
        />
        <circle
          cx="196" cy="8" r="3.5" fill={color}
          className="transition-opacity duration-500 delay-1000"
          style={{ opacity: on ? 1 : 0 }}
        />
      </svg>
    </div>
  );
}

/* ── micro-visual: engagement dots grid ── */
function PulseGrid({ color }: { color: string }) {
  return (
    <div className="grid grid-cols-8 gap-1.5">
      {Array.from({ length: 24 }).map((_, i) => (
        <span
          key={i}
          className="aspect-square rounded-[3px]"
          style={{
            background: i % 5 === 0 ? color : `${color}30`,
            opacity: i % 5 === 0 ? 0.9 : 0.6,
            animation: i % 5 === 0 ? `pulse 2.4s ease-in-out ${i * 90}ms infinite` : undefined,
          }}
        />
      ))}
    </div>
  );
}

/* ── micro-visual: waveform ── */
function WaveViz({ color }: { color: string }) {
  const bars = [30, 55, 80, 45, 95, 62, 38, 72, 50, 88, 42, 66, 34, 78];
  return (
    <div className="flex items-end gap-1 h-16">
      {bars.map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm origin-bottom"
          style={{
            height: `${h}%`,
            background: `linear-gradient(to top, ${color}35, ${color})`,
            animation: `wave 1.6s ease-in-out ${i * 80}ms infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}

/* ── micro-visual: automation nodes ── */
function FlowViz({ color }: { color: string }) {
  return (
    <div className="h-16">
      <svg viewBox="0 0 200 60" preserveAspectRatio="none" className="w-full h-full" fill="none">
        <path
          d="M14,30 H56 M76,30 H118 M138,30 H186"
          stroke={`${color}55`}
          strokeWidth="1.5"
          strokeDasharray="4 4"
          vectorEffect="non-scaling-stroke"
        />
        {[4, 66, 128].map((x, i) => (
          <g key={x}>
            <rect
              x={x} y={20} width={20} height={20} rx={5}
              fill={`${color}22`}
              stroke={`${color}60`}
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
            <circle
              cx={x + 10} cy={30} r={2.5} fill={color}
              style={{ animation: `pulse 2s ease-in-out ${i * 400}ms infinite` }}
            />
          </g>
        ))}
        <circle cx={192} cy={30} r={4} fill={color} />
      </svg>
    </div>
  );
}

type Channel = {
  icon: typeof Search;
  title: string;
  accent: string;
  wide: boolean;
  blurb: string;
  viz: React.ReactNode;
};

const channels: Channel[] = [
  {
    icon: Search, title: "SEO", accent: "#CCFF00", wide: true,
    blurb: "Technical audits, content architecture, and link equity that compounds instead of evaporating.",
    viz: <RankViz />,
  },
  {
    icon: Share2, title: "Social Media Marketing", accent: "#38bdf8", wide: false,
    blurb: "Always-on creative and community management across every surface that matters.",
    viz: <PulseGrid color="#38bdf8" />,
  },
  {
    icon: MousePointerClick, title: "Google Ads", accent: "#CCFF00", wide: false,
    blurb: "Search, Shopping, and PMax campaigns tuned to CAC, not vanity impressions.",
    viz: <SparkViz color="#CCFF00" />,
  },
  {
    icon: Megaphone, title: "Meta Ads", accent: "#a78bfa", wide: false,
    blurb: "Creative testing at volume across Facebook and Instagram, with clean attribution.",
    viz: <SparkViz color="#a78bfa" />,
  },
  {
    icon: PenLine, title: "Content Marketing", accent: "#34d399", wide: false,
    blurb: "Editorial that ranks and persuades — briefs, drafts, and distribution.",
    viz: <PulseGrid color="#34d399" />,
  },
  {
    icon: Mail, title: "Email Marketing", accent: "#f472b6", wide: false,
    blurb: "Lifecycle flows, segmentation, and campaigns that people don't reflexively delete.",
    viz: <SparkViz color="#f472b6" />,
  },
  {
    icon: Clapperboard, title: "Video Editing", accent: "#fb923c", wide: false,
    blurb: "Short-form cuts, brand films, and ad variants delivered on a weekly cadence.",
    viz: <WaveViz color="#fb923c" />,
  },
  {
    icon: Waves, title: "Motion Graphics", accent: "#a78bfa", wide: true,
    blurb: "Logo animation, UI motion, and explainers that make the product feel alive.",
    viz: <WaveViz color="#a78bfa" />,
  },
  {
    icon: Workflow, title: "Marketing Automation", accent: "#CCFF00", wide: true,
    blurb: "CRM wiring, lead scoring, and triggered journeys so the pipeline runs without a human babysitting it.",
    viz: <FlowViz color="#CCFF00" />,
  },
];

export default function MarketingChannels() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      gsap.set("[data-mk-tile], [data-mk-head]", {
        opacity: 1, y: 0, scale: 1, clearProps: "filter",
      });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to("[data-mk-head]", {
        y: 0, opacity: 1, filter: "blur(0px)", duration: 1, ease: "power4.out",
        scrollTrigger: { trigger: "[data-mk-head]", start: "top 90%" },
      });

      // Per-element trigger — no cross-item stagger, nothing waits offscreen
      gsap.utils.toArray<HTMLElement>("[data-mk-tile]").forEach((tile) => {
        gsap.to(tile, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: "power3.out",
          overwrite: "auto",
          scrollTrigger: { trigger: tile, start: "top 95%", once: true },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative bg-[#050505] text-white pt-32 md:pt-40 pb-28 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      {/* Ambient */}
      <div className="absolute top-20 left-1/3 w-[600px] h-[600px] rounded-full bg-[#CCFF00]/[0.02] blur-[170px] pointer-events-none" />
      <div className="absolute bottom-20 right-[15%] w-[450px] h-[450px] rounded-full bg-cyan-500/[0.025] blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Eyebrow */}
        <div className="flex items-center gap-2.5 mb-8">
          <span className="relative w-2.5 h-2.5 rounded-full bg-[#CCFF00]">
            <span className="absolute inset-0 rounded-full bg-[#CCFF00] animate-ping opacity-40" />
          </span>
          <span className="text-sm text-gray-400 tracking-widest uppercase font-medium">
            Growth &amp; channels
          </span>
        </div>

        {/* Heading */}
        <h2
          data-mk-head
          className="text-4xl sm:text-5xl md:text-[4rem] font-bold tracking-tight leading-[1.02] italic mb-16 max-w-3xl"
          style={{ opacity: 0, transform: "translateY(40px)", filter: "blur(10px)" }}
        >
          <span className="bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
            Design gets you noticed.
          </span>
          <br />
          <span className="bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
            These get you paid.
          </span>
        </h2>

        {/* Bento grid — 12 cells across 3 rows of 4 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {channels.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.title}
                data-mk-tile
                className={`group relative rounded-3xl p-7 overflow-hidden backdrop-blur-xl transition-shadow duration-500 ${
                  c.wide ? "md:col-span-2" : ""
                }`}
                style={{
                  opacity: 0,
                  transform: "translateY(50px) scale(0.95)",
                  boxShadow: "0 0 0 1px rgba(255,255,255,0.10)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 0 1px ${c.accent}40, 0 12px 60px ${c.accent}12, inset 0 1px 0 rgba(255,255,255,0.12)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 0 1px rgba(255,255,255,0.10)";
                }}
              >
                {/* Glass wash */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `linear-gradient(160deg, ${c.accent}0d 0%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.025) 100%)`,
                  }}
                />
                {/* Top shimmer */}
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px pointer-events-none"
                  style={{ background: `linear-gradient(90deg, transparent, ${c.accent}60, transparent)` }}
                />
                {/* Corner glow */}
                <div
                  className="absolute -top-20 -right-16 w-44 h-44 rounded-full blur-[80px] pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ background: `${c.accent}18` }}
                />

                {/* Content — side-by-side on wide tiles, stacked on narrow */}
                <div
                  className={`relative h-full ${
                    c.wide ? "md:flex md:items-center md:gap-10" : "flex flex-col"
                  }`}
                >
                  <div className={c.wide ? "md:flex-1" : ""}>
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                      style={{
                        background: `${c.accent}1c`,
                        border: `1px solid ${c.accent}40`,
                      }}
                    >
                      <Icon className="w-[18px] h-[18px]" style={{ color: c.accent }} />
                    </div>

                    <h3
                      className="text-lg font-semibold tracking-tight mb-2 text-white transition-colors duration-300 group-hover:text-[color:var(--tile-accent)]"
                      style={{ ["--tile-accent" as string]: c.accent }}
                    >
                      {c.title}
                    </h3>

                    <p className="text-sm text-gray-400 leading-relaxed">{c.blurb}</p>
                  </div>

                  <div className={c.wide ? "md:flex-1 mt-6 md:mt-0" : "mt-6"}>
                    {c.viz}
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