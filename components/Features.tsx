"use client";

import { useEffect, useRef, useState } from "react";

/* ── Animated bars for Growth chart ── */
function GrowthChart() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const bars = [62, 78, 55, 90, 70, 95, 82, 60, 88, 75, 98, 85];

  return (
    <div ref={ref} className="relative h-40 flex flex-col">
      <span className="text-[#CCFF00] text-xs font-semibold mb-3 tracking-wide">Growth</span>
      <div className="flex-1 flex items-end gap-[5px]">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-sm transition-all duration-700 ease-out"
            style={{
              height: visible ? `${h}%` : "4%",
              background: `linear-gradient(to top, #3a5406, #CCFF00)`,
              transitionDelay: `${i * 60}ms`,
              boxShadow: visible ? "0 0 8px rgba(204,255,0,0.2)" : "none",
            }}
          />
        ))}
      </div>
      <div className="flex justify-between mt-2 text-[10px] text-gray-600">
        <span>Nov. 10</span>
        <span>Nov. 11</span>
        <span>Today</span>
      </div>
    </div>
  );
}

/* ── Latest design notification card ── */
function DesignNotification() {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setShow(true); },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative h-40 flex items-center justify-center">
      {/* Floating notification */}
      <div
        className={`transition-all duration-700 ease-out ${
          show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div className="text-[10px] text-gray-500 mb-2 ml-1 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
          REVIEWED
        </div>
        <div className="bg-white/[0.06] backdrop-blur-xl border border-white/[0.1] rounded-2xl p-4 flex items-center gap-4 hover:border-[#CCFF00]/20 transition-colors duration-300 min-w-[220px]">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#CCFF00] to-[#3a5406] flex items-center justify-center shadow-lg shadow-[#CCFF00]/10">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] animate-pulse" />
              <span className="text-[10px] text-[#CCFF00] font-semibold tracking-wide">NEW</span>
            </div>
            <p className="text-sm font-semibold text-white">Latest design</p>
            <p className="text-xs text-gray-500">Today, 11:50</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Scalability curve graphic ── */
function ScalabilityCurve() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative h-40 flex items-end justify-center overflow-hidden">
      <svg viewBox="0 0 200 120" className="w-full h-full" fill="none">
        {/* Grid lines */}
        {[20, 40, 60, 80].map((y) => (
          <line key={y} x1="10" y1={y} x2="190" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
        ))}
        {/* Axis labels */}
        {["4S", "3S", "2S", "S", "0"].map((label, i) => (
          <text key={label} x={190 - i * 40} y="115" fill="rgba(255,255,255,0.2)" fontSize="7" textAnchor="middle">{label}</text>
        ))}
        {/* Curve path */}
        <path
          d="M10,90 Q50,85 80,60 T140,30 Q160,20 190,25"
          stroke="#CCFF00"
          strokeWidth="2"
          strokeLinecap="round"
          className={`transition-all duration-1500 ease-out ${visible ? "opacity-100" : "opacity-0"}`}
          style={{
            strokeDasharray: 300,
            strokeDashoffset: visible ? 0 : 300,
            transition: "stroke-dashoffset 2s ease-out, opacity 0.5s",
          }}
        />
        {/* Glow behind curve */}
        <path
          d="M10,90 Q50,85 80,60 T140,30 Q160,20 190,25"
          stroke="#CCFF00"
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.15"
          className={`transition-opacity duration-1000 ${visible ? "opacity-[0.15]" : "opacity-0"}`}
          style={{
            filter: "blur(4px)",
            strokeDasharray: 300,
            strokeDashoffset: visible ? 0 : 300,
            transition: "stroke-dashoffset 2s ease-out, opacity 1s",
          }}
        />
        {/* Endpoint dot */}
        <circle
          cx="140"
          cy="30"
          r="6"
          fill="#CCFF00"
          className={`transition-all duration-700 delay-1000 ${visible ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}
          style={{ transformOrigin: "140px 30px" }}
        />
        <circle
          cx="140"
          cy="30"
          r="12"
          fill="none"
          stroke="#CCFF00"
          strokeWidth="1"
          opacity="0.3"
          className={`transition-all duration-700 delay-1200 ${visible ? "opacity-30" : "opacity-0"}`}
        />
      </svg>
    </div>
  );
}

/* ── Integration icons grid ── */
function IntegrationIcons() {
  const icons = [
    { name: "Figma", color: "from-red-500 via-purple-500 to-green-400", symbol: "F" },
    { name: "Notion", color: "from-gray-200 to-gray-400", symbol: "N" },
    { name: "Slack", color: "from-[#CCFF00] to-emerald-500", symbol: "#" },
    { name: "X", color: "from-white to-gray-400", symbol: "𝕏" },
    { name: "Asana", color: "from-orange-400 to-pink-500", symbol: "✳" },
    { name: "Linear", color: "from-indigo-400 to-violet-600", symbol: "◆" },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {icons.map((icon, i) => (
        <div
          key={icon.name}
          className="group/icon w-14 h-14 rounded-2xl bg-gradient-to-br border border-white/[0.08] flex items-center justify-center text-lg font-bold cursor-default hover:scale-110 hover:border-white/20 transition-all duration-300 hover:shadow-lg"
          style={{ animationDelay: `${i * 100}ms` }}
        >
          <div className={`w-full h-full rounded-2xl bg-gradient-to-br ${icon.color} flex items-center justify-center text-black/80 opacity-80 group-hover/icon:opacity-100 transition-opacity`}>
            {icon.symbol}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Collaboration avatars ── */
function CollabAvatars() {
  const people = [
    { name: "Alex", gradient: "from-cyan-400 to-blue-600", ring: "ring-cyan-400/30" },
    { name: "Sarah", gradient: "from-pink-400 to-rose-600", ring: "ring-pink-400/30" },
    { name: "Maya", gradient: "from-amber-400 to-orange-600", ring: "ring-amber-400/30" },
    { name: "Eliah", gradient: "from-[#CCFF00] to-emerald-500", ring: "ring-[#CCFF00]/30" },
  ];

  return (
    <div className="relative flex items-center">
      <div className="flex -space-x-3">
        {people.map((p, i) => (
          <div
            key={p.name}
            className={`relative w-12 h-12 rounded-full bg-gradient-to-br ${p.gradient} border-[3px] border-[#0a0a0a] ring-2 ${p.ring} flex items-center justify-center transition-transform duration-300 hover:-translate-y-2 hover:z-10 cursor-pointer`}
            style={{ zIndex: people.length - i }}
          >
            <span className="text-sm font-bold text-black/60">{p.name[0]}</span>
          </div>
        ))}
      </div>
      {/* Cursor + label */}
      <div className="ml-4 relative">
        <svg width="16" height="20" viewBox="0 0 16 20" fill="white" className="opacity-60">
          <path d="M0 0L16 12L8 12L4 20L0 0Z" />
        </svg>
        <span className="absolute -bottom-1 left-4 bg-[#CCFF00] text-black text-[10px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap shadow-lg shadow-[#CCFF00]/20">
          Eliah
        </span>
      </div>
    </div>
  );
}

/* ── Feature tags ── */
const tags = [
  "Design workshops",
  "Workshops",
  "Trend reports",
  "Asset library",
  "Rollover hours",
  "Premium designers",
  "Multilingual support",
];

/* ════════════════════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════════════════════ */
export default function Features() {
  return (
    <section id="features" className="relative bg-[#050505] text-white pt-32 md:pt-40 pb-24 px-6 md:px-12 lg:px-20 overflow-hidden">
      {/* Decorative blurs */}
      <div className="absolute top-20 left-1/3 w-[600px] h-[600px] rounded-full bg-[#CCFF00]/[0.015] blur-[160px] pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] rounded-full bg-emerald-500/[0.02] blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="relative w-2.5 h-2.5 rounded-full bg-[#CCFF00]">
              <span className="absolute inset-0 rounded-full bg-[#CCFF00] animate-ping opacity-40" />
            </span>
            <span className="text-sm text-[#CCFF00] tracking-widest uppercase font-semibold">What you&apos;ll get</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-[1.15] max-w-2xl mx-auto">
            We resolve problems associated with{" "}
            <span className="bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
              creative procedures.
            </span>
          </h2>
        </div>

        {/* ── Top 3 cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
          {/* Card 1: Cost effective */}
          <div className="group relative bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/[0.08] rounded-3xl p-7 backdrop-blur-xl overflow-hidden hover:border-white/[0.18] transition-all duration-500 hover:shadow-[0_8px_60px_rgba(204,255,0,0.06),inset_0_1px_0_rgba(255,255,255,0.1)]">
            {/* Inner glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full bg-[#CCFF00]/[0.04] blur-[60px] group-hover:bg-[#CCFF00]/[0.08] transition-all duration-700 pointer-events-none" />
            <div className="relative">
              <GrowthChart />
              <h3 className="text-xl font-semibold mt-6 mb-2 group-hover:text-[#CCFF00] transition-colors duration-300">
                Cost effective solution
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Get high-quality design work at a fraction of the cost.
              </p>
            </div>
          </div>

          {/* Card 2: Tailor-made */}
          <div className="group relative bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/[0.08] rounded-3xl p-7 backdrop-blur-xl overflow-hidden hover:border-white/[0.18] transition-all duration-500 hover:shadow-[0_8px_60px_rgba(204,255,0,0.06),inset_0_1px_0_rgba(255,255,255,0.1)]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full bg-[#CCFF00]/[0.04] blur-[60px] group-hover:bg-[#CCFF00]/[0.08] transition-all duration-700 pointer-events-none" />
            <div className="relative">
              <DesignNotification />
              <h3 className="text-xl font-semibold mt-6 mb-2 group-hover:text-[#CCFF00] transition-colors duration-300">
                Tailor–made design
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                We&apos;ve got the expertise to make your vision a reality.
              </p>
            </div>
          </div>

          {/* Card 3: Scalable */}
          <div className="group relative bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/[0.08] rounded-3xl p-7 backdrop-blur-xl overflow-hidden hover:border-white/[0.18] transition-all duration-500 hover:shadow-[0_8px_60px_rgba(204,255,0,0.06),inset_0_1px_0_rgba(255,255,255,0.1)]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full bg-[#CCFF00]/[0.04] blur-[60px] group-hover:bg-[#CCFF00]/[0.08] transition-all duration-700 pointer-events-none" />
            <div className="relative">
              <ScalabilityCurve />
              <h3 className="text-xl font-semibold mt-6 mb-2 group-hover:text-[#CCFF00] transition-colors duration-300">
                Scalable as you grow
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                We&apos;re ready to meet your evolving needs.
              </p>
            </div>
          </div>
        </div>

        {/* ── Bottom 2 cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
          {/* Workflow integration */}
          <div className="group relative bg-gradient-to-br from-white/[0.07] via-white/[0.03] to-white/[0.01] border border-white/[0.08] rounded-3xl p-8 backdrop-blur-xl overflow-hidden hover:border-white/[0.18] transition-all duration-500 hover:shadow-[0_12px_60px_rgba(204,255,0,0.05),inset_0_1px_0_rgba(255,255,255,0.1)] flex flex-col sm:flex-row items-start gap-8">
            {/* Shimmer line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
            {/* Corner glow */}
            <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-emerald-400/[0.04] blur-[80px] group-hover:bg-emerald-400/[0.08] transition-all duration-700 pointer-events-none" />
            <div className="relative flex-shrink-0">
              <h3 className="text-2xl font-semibold mb-1 leading-tight group-hover:text-[#CCFF00] transition-colors duration-300">
                Workflow
                <br />
                integration
              </h3>
              <p className="text-sm text-gray-500 mt-3 leading-relaxed max-w-[180px]">
                Seamlessly connect all your existing apps
              </p>
            </div>
            <div className="relative flex-1 flex items-center justify-center">
              <IntegrationIcons />
            </div>
          </div>

          {/* Collaborate real-time */}
          <div className="group relative bg-gradient-to-br from-white/[0.07] via-white/[0.03] to-white/[0.01] border border-white/[0.08] rounded-3xl p-8 backdrop-blur-xl overflow-hidden hover:border-white/[0.18] transition-all duration-500 hover:shadow-[0_12px_60px_rgba(204,255,0,0.05),inset_0_1px_0_rgba(255,255,255,0.1)] flex flex-col sm:flex-row items-start gap-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
            <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full bg-violet-400/[0.04] blur-[80px] group-hover:bg-violet-400/[0.08] transition-all duration-700 pointer-events-none" />
            <div className="relative flex-shrink-0">
              <h3 className="text-2xl font-semibold mb-1 leading-tight group-hover:text-[#CCFF00] transition-colors duration-300">
                Collaborate
                <br />
                real-time
              </h3>
              <p className="text-sm text-gray-500 mt-3 leading-relaxed max-w-[180px]">
                Seamlessly connect all your existing apps
              </p>
            </div>
            <div className="relative flex-1 flex items-center justify-center">
              <CollabAvatars />
            </div>
          </div>
        </div>

        {/* ── Feature tags ── */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {tags.map((tag) => (
            <div
              key={tag}
              className="group/tag relative flex items-center gap-2.5 bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/[0.1] rounded-full px-5 py-3 backdrop-blur-xl overflow-hidden hover:border-[#CCFF00]/30 hover:shadow-[0_4px_20px_rgba(204,255,0,0.08),inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-300 cursor-default"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              <span className="relative w-2 h-2 rounded-full bg-[#CCFF00]/60 group-hover/tag:bg-[#CCFF00] group-hover/tag:shadow-[0_0_10px_rgba(204,255,0,0.5)] transition-all duration-300" />
              <span className="relative text-sm text-gray-400 group-hover/tag:text-white transition-colors duration-300">{tag}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
