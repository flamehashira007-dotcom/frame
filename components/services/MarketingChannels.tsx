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


/* ── micro-visual: ROAS gauge arc (Google Ads) ── */
function GaugeViz({ color }: { color: string }) {
  const [on, setOn] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(([e]) => e.isIntersecting && setOn(true), { threshold: 0.2 });
    o.observe(el);
    return () => o.disconnect();
  }, []);
  /* Arc math: semi-circle from 180° to 0° (left to right) */
  const r = 42;
  const cx = 60;
  const cy = 50;
  const circumference = Math.PI * r; /* half-circle */
  const fillPct = 0.72; /* 72% — the "performance" value */
  return (
    <div ref={ref} className="flex flex-col items-center">
      <svg viewBox="0 0 120 65" className="w-full max-w-[140px]" fill="none">
        {/* track */}
        <path
          d={`M ${cx - r},${cy} A ${r},${r} 0 0,1 ${cx + r},${cy}`}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
        />
        {/* filled arc */}
        <path
          d={`M ${cx - r},${cy} A ${r},${r} 0 0,1 ${cx + r},${cy}`}
          stroke={color}
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: on ? circumference * (1 - fillPct) : circumference,
            transition: "stroke-dashoffset 1.6s cubic-bezier(.4,0,.2,1)",
          }}
        />
        {/* glow duplicate */}
        <path
          d={`M ${cx - r},${cy} A ${r},${r} 0 0,1 ${cx + r},${cy}`}
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
          fill="none"
          opacity="0.15"
          style={{
            filter: "blur(6px)",
            strokeDasharray: circumference,
            strokeDashoffset: on ? circumference * (1 - fillPct) : circumference,
            transition: "stroke-dashoffset 1.6s cubic-bezier(.4,0,.2,1)",
          }}
        />
        {/* center value */}
        <text
          x={cx} y={cy - 6}
          textAnchor="middle"
          className="text-[14px] font-bold transition-opacity duration-700"
          fill={color}
          style={{ opacity: on ? 1 : 0, transitionDelay: "800ms" }}
        >
          4.2×
        </text>
        <text
          x={cx} y={cy + 5}
          textAnchor="middle"
          className="text-[8px] font-mono"
          fill="#9ca3af"
          style={{ opacity: on ? 1 : 0, transition: "opacity 0.5s", transitionDelay: "1s" }}
        >
          ROAS
        </text>
      </svg>
    </div>
  );
}

/* ── micro-visual: radar chart (Meta Ads) ── */
function RadarViz({ color }: { color: string }) {
  const [on, setOn] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(([e]) => e.isIntersecting && setOn(true), { threshold: 0.2 });
    o.observe(el);
    return () => o.disconnect();
  }, []);
  const dims = [
    { label: "Reach", val: 0.9 },
    { label: "CTR", val: 0.65 },
    { label: "CPA", val: 0.8 },
    { label: "ROAS", val: 0.72 },
    { label: "Eng", val: 0.85 },
  ];
  const cx = 60, cy = 40, R = 32;
  const angle = (i: number) => (Math.PI * 2 * i) / dims.length - Math.PI / 2;
  const poly = (scale: number) =>
    dims.map((_, i) => {
      const a = angle(i);
      return `${cx + Math.cos(a) * R * scale},${cy + Math.sin(a) * R * scale}`;
    }).join(" ");
  const dataPoly = dims.map((d, i) => {
    const a = angle(i);
    const s = on ? d.val : 0.08;
    return `${cx + Math.cos(a) * R * s},${cy + Math.sin(a) * R * s}`;
  }).join(" ");

  return (
    <div ref={ref} className="flex flex-col items-center">
      <svg viewBox="0 0 120 85" className="w-full max-w-[150px]" fill="none">
        {/* grid rings */}
        {[0.33, 0.66, 1].map((s) => (
          <polygon
            key={s}
            points={poly(s)}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="0.7"
            fill="none"
          />
        ))}
        {/* axis lines */}
        {dims.map((_, i) => {
          const a = angle(i);
          return (
            <line
              key={i}
              x1={cx} y1={cy}
              x2={cx + Math.cos(a) * R} y2={cy + Math.sin(a) * R}
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="0.5"
            />
          );
        })}
        {/* data fill */}
        <polygon
          points={dataPoly}
          fill={`${color}20`}
          stroke={color}
          strokeWidth="1.5"
          strokeLinejoin="round"
          style={{ transition: "all 1.2s cubic-bezier(.4,0,.2,1)" }}
        />
        {/* data dots */}
        {dims.map((d, i) => {
          const a = angle(i);
          const s = on ? d.val : 0.08;
          return (
            <circle
              key={i}
              cx={cx + Math.cos(a) * R * s}
              cy={cy + Math.sin(a) * R * s}
              r="2"
              fill={color}
              style={{
                transition: "all 1.2s cubic-bezier(.4,0,.2,1)",
                transitionDelay: `${i * 60}ms`,
              }}
            />
          );
        })}
        {/* labels */}
        {dims.map((d, i) => {
          const a = angle(i);
          const lx = cx + Math.cos(a) * (R + 11);
          const ly = cy + Math.sin(a) * (R + 11);
          return (
            <text
              key={i}
              x={lx} y={ly + 3}
              textAnchor="middle"
              className="text-[7px] font-mono"
              fill="#6b7280"
            >
              {d.label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

/* ── micro-visual: concentric ripple rings (Email Marketing) ── */
function RippleViz({ color }: { color: string }) {
  const [on, setOn] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(([e]) => e.isIntersecting && setOn(true), { threshold: 0.2 });
    o.observe(el);
    return () => o.disconnect();
  }, []);
  const rings = [
    { r: 10, label: "42%", desc: "click" },
    { r: 22, label: "68%", desc: "open" },
    { r: 34, label: "97%", desc: "delivered" },
  ];
  const cx = 60, cy = 42;
  return (
    <div ref={ref} className="flex flex-col items-center">
      <svg viewBox="0 0 120 85" className="w-full max-w-[150px]" fill="none">
        {/* expanding rings */}
        {rings.map((ring, i) => (
          <g key={i}>
            <circle
              cx={cx} cy={cy} r={ring.r}
              stroke={color}
              strokeWidth="1"
              fill="none"
              opacity={on ? 0.15 + i * 0.15 : 0}
              style={{
                transform: on ? "scale(1)" : "scale(0)",
                transformOrigin: `${cx}px ${cy}px`,
                transition: `all 0.9s cubic-bezier(.4,0,.2,1)`,
                transitionDelay: `${(rings.length - 1 - i) * 250}ms`,
              }}
            />
            <circle
              cx={cx} cy={cy} r={ring.r}
              stroke={color}
              strokeWidth="5"
              fill="none"
              opacity={on ? 0.06 : 0}
              style={{
                filter: "blur(4px)",
                transform: on ? "scale(1)" : "scale(0)",
                transformOrigin: `${cx}px ${cy}px`,
                transition: `all 0.9s cubic-bezier(.4,0,.2,1)`,
                transitionDelay: `${(rings.length - 1 - i) * 250}ms`,
              }}
            />
          </g>
        ))}
        {/* center dot */}
        <circle
          cx={cx} cy={cy} r="3"
          fill={color}
          style={{
            opacity: on ? 1 : 0,
            transition: "opacity 0.5s",
            transitionDelay: "0.2s",
          }}
        />
        {/* metric labels along rings */}
        {rings.map((ring, i) => (
          <text
            key={`lbl-${i}`}
            x={cx + ring.r + 3}
            y={cy - 3}
            className="text-[7px] font-mono"
            fill={i === 0 ? color : "#6b7280"}
            style={{
              opacity: on ? 1 : 0,
              transition: "opacity 0.5s",
              transitionDelay: `${(rings.length - 1 - i) * 250 + 500}ms`,
            }}
          >
            {ring.label}
          </text>
        ))}
        {/* bottom labels */}
        {rings.map((ring, i) => (
          <text
            key={`desc-${i}`}
            x={cx + ring.r + 3}
            y={cy + 5}
            className="text-[6px] font-mono"
            fill="#4b5563"
            style={{
              opacity: on ? 1 : 0,
              transition: "opacity 0.5s",
              transitionDelay: `${(rings.length - 1 - i) * 250 + 600}ms`,
            }}
          >
            {ring.desc}
          </text>
        ))}
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

/* ── micro-visual: NLE timeline (Video Editing) ── */
function TimelineViz({ color }: { color: string }) {
  const [on, setOn] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(([e]) => e.isIntersecting && setOn(true), { threshold: 0.2 });
    o.observe(el);
    return () => o.disconnect();
  }, []);
  const tracks = [
    [
      { x: 4, w: 38, clr: color },
      { x: 46, w: 24, clr: `${color}88` },
      { x: 74, w: 50, clr: color },
      { x: 128, w: 30, clr: `${color}66` },
      { x: 162, w: 34, clr: color },
    ],
    [
      { x: 4, w: 28, clr: `${color}55` },
      { x: 36, w: 44, clr: `${color}90` },
      { x: 84, w: 20, clr: `${color}55` },
      { x: 108, w: 56, clr: `${color}80` },
      { x: 168, w: 28, clr: `${color}55` },
    ],
  ];
  return (
    <div ref={ref} className="h-16">
      <svg viewBox="0 0 200 60" preserveAspectRatio="none" className="w-full h-full" fill="none">
        {/* track backgrounds */}
        <rect x="2" y="8" width="196" height="18" rx="3" fill="rgba(255,255,255,0.03)" />
        <rect x="2" y="32" width="196" height="18" rx="3" fill="rgba(255,255,255,0.03)" />
        {/* track labels */}
        <text x="6" y="5" className="text-[5px] font-mono" fill="#4b5563">V1</text>
        <text x="6" y="29" className="text-[5px] font-mono" fill="#4b5563">A1</text>
        {/* clips on track 1 */}
        {tracks[0].map((clip, i) => (
          <rect
            key={`v-${i}`}
            x={clip.x} y={10} width={clip.w} height={14} rx={2}
            fill={clip.clr}
            opacity={on ? 0.7 : 0}
            style={{
              transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
              transitionDelay: `${i * 100}ms`,
              transform: on ? "scaleX(1)" : "scaleX(0)",
              transformOrigin: `${clip.x}px 17px`,
            }}
          />
        ))}
        {/* clips on track 2 */}
        {tracks[1].map((clip, i) => (
          <rect
            key={`a-${i}`}
            x={clip.x} y={34} width={clip.w} height={14} rx={2}
            fill={clip.clr}
            opacity={on ? 0.5 : 0}
            style={{
              transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
              transitionDelay: `${i * 100 + 300}ms`,
              transform: on ? "scaleX(1)" : "scaleX(0)",
              transformOrigin: `${clip.x}px 41px`,
            }}
          />
        ))}
        {/* playhead */}
        <line
          x1="80" y1="3" x2="80" y2="55"
          stroke={color}
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
          opacity={on ? 1 : 0}
          style={{
            transition: "opacity 0.5s",
            transitionDelay: "0.8s",
            animation: on ? "playhead 3s ease-in-out 1.2s infinite alternate" : undefined,
          }}
        />
        <polygon
          points="77,2 83,2 80,6"
          fill={color}
          opacity={on ? 1 : 0}
          style={{
            transition: "opacity 0.5s",
            transitionDelay: "0.8s",
            animation: on ? "playhead 3s ease-in-out 1.2s infinite alternate" : undefined,
          }}
        />
      </svg>
    </div>
  );
}

/* ── micro-visual: orbital constellation (Marketing Automation) ── */
function OrbitViz({ color }: { color: string }) {
  const [on, setOn] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(([e]) => e.isIntersecting && setOn(true), { threshold: 0.2 });
    o.observe(el);
    return () => o.disconnect();
  }, []);
  const cx = 100, cy = 30;
  const orbits = [
    { rx: 20, ry: 12, dur: "4s", size: 3, delay: "0s" },
    { rx: 40, ry: 20, dur: "6s", size: 2.5, delay: "1s" },
    { rx: 65, ry: 26, dur: "8s", size: 2, delay: "0.5s" },
  ];
  return (
    <div ref={ref} className="h-16">
      <svg viewBox="0 0 200 60" preserveAspectRatio="xMidYMid meet" className="w-full h-full" fill="none">
        {/* orbit paths */}
        {orbits.map((orb, i) => (
          <ellipse
            key={`path-${i}`}
            cx={cx} cy={cy} rx={orb.rx} ry={orb.ry}
            stroke={`${color}18`}
            strokeWidth="0.8"
            fill="none"
            style={{
              opacity: on ? 1 : 0,
              transition: "opacity 0.8s",
              transitionDelay: `${i * 200}ms`,
            }}
          />
        ))}
        {/* orbiting nodes */}
        {orbits.map((orb, i) => (
          <circle
            key={`node-${i}`}
            cx={cx + orb.rx} cy={cy}
            r={orb.size}
            fill={color}
            opacity={on ? 0.9 - i * 0.15 : 0}
            style={{
              transition: "opacity 0.6s",
              transitionDelay: `${i * 200 + 400}ms`,
              transformOrigin: `${cx}px ${cy}px`,
              animation: on ? `orbit-${i} ${orb.dur} linear ${orb.delay} infinite` : undefined,
            }}
          />
        ))}
        {/* glow trails */}
        {orbits.map((orb, i) => (
          <circle
            key={`glow-${i}`}
            cx={cx + orb.rx} cy={cy}
            r={orb.size + 3}
            fill={color}
            opacity={on ? 0.12 : 0}
            style={{
              filter: "blur(4px)",
              transformOrigin: `${cx}px ${cy}px`,
              animation: on ? `orbit-${i} ${orb.dur} linear ${orb.delay} infinite` : undefined,
            }}
          />
        ))}
        {/* center hub */}
        <circle
          cx={cx} cy={cy} r="5"
          fill={`${color}30`}
          stroke={color}
          strokeWidth="1"
          style={{
            opacity: on ? 1 : 0,
            transition: "opacity 0.5s",
            transitionDelay: "0.2s",
          }}
        />
        <circle
          cx={cx} cy={cy} r="2"
          fill={color}
          style={{
            opacity: on ? 1 : 0,
            transition: "opacity 0.5s",
            transitionDelay: "0.3s",
          }}
        />
        {/* hub glow */}
        <circle
          cx={cx} cy={cy} r="10"
          fill={color}
          opacity={on ? 0.08 : 0}
          style={{ filter: "blur(6px)", transition: "opacity 0.8s" }}
        />
      </svg>
    </div>
  );
}

/* ── micro-visual: animation curve with keyframe diamonds (Motion Graphics) ── */
function KeyframeViz({ color }: { color: string }) {
  const [on, setOn] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(([e]) => e.isIntersecting && setOn(true), { threshold: 0.2 });
    o.observe(el);
    return () => o.disconnect();
  }, []);
  /* Keyframe positions along a bezier-style curve */
  const keyframes = [
    { x: 10, y: 48 },
    { x: 50, y: 42 },
    { x: 90, y: 14 },
    { x: 130, y: 28 },
    { x: 170, y: 10 },
  ];
  const curvePath = `M ${keyframes[0].x},${keyframes[0].y} C 30,48 35,42 ${keyframes[1].x},${keyframes[1].y} C 65,42 70,14 ${keyframes[2].x},${keyframes[2].y} C 110,14 115,28 ${keyframes[3].x},${keyframes[3].y} C 150,28 155,10 ${keyframes[4].x},${keyframes[4].y}`;

  return (
    <div ref={ref} className="h-16">
      <svg viewBox="0 0 200 60" preserveAspectRatio="none" className="w-full h-full" fill="none">
        {/* grid lines */}
        {[15, 30, 45].map((y) => (
          <line key={y} x1="4" y1={y} x2="196" y2={y} stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
        ))}
        {/* curve glow */}
        <path
          d={curvePath}
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
          opacity="0.15"
          vectorEffect="non-scaling-stroke"
          style={{ filter: "blur(5px)" }}
        />
        {/* main curve */}
        <path
          d={curvePath}
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          vectorEffect="non-scaling-stroke"
          style={{
            strokeDasharray: 320,
            strokeDashoffset: on ? 0 : 320,
            transition: "stroke-dashoffset 1.6s cubic-bezier(.4,0,.2,1)",
          }}
        />
        {/* keyframe diamonds */}
        {keyframes.map((kf, i) => (
          <g key={i}>
            <rect
              x={kf.x - 4} y={kf.y - 4} width={8} height={8} rx={1.5}
              fill={`${color}30`}
              stroke={color}
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              style={{
                transform: `rotate(45deg)`,
                transformOrigin: `${kf.x}px ${kf.y}px`,
                opacity: on ? 1 : 0,
                transition: "opacity 0.4s",
                transitionDelay: `${i * 180 + 400}ms`,
              }}
            />
            <circle
              cx={kf.x} cy={kf.y} r="1.5"
              fill={color}
              style={{
                opacity: on ? 1 : 0,
                transition: "opacity 0.4s",
                transitionDelay: `${i * 180 + 500}ms`,
              }}
            />
          </g>
        ))}
        {/* easing label */}
        <text
          x="180" y="54"
          textAnchor="end"
          className="text-[7px] font-mono"
          fill="#4b5563"
          style={{ opacity: on ? 1 : 0, transition: "opacity 0.5s", transitionDelay: "1.2s" }}
        >
          ease-in-out
        </text>
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
    viz: <GaugeViz color="#CCFF00" />,
  },
  {
    icon: Megaphone, title: "Meta Ads", accent: "#a78bfa", wide: false,
    blurb: "Creative testing at volume across Facebook and Instagram, with clean attribution.",
    viz: <RadarViz color="#a78bfa" />,
  },
  {
    icon: PenLine, title: "Content Marketing", accent: "#34d399", wide: false,
    blurb: "Editorial that ranks and persuades — briefs, drafts, and distribution.",
    viz: <PulseGrid color="#34d399" />,
  },
  {
    icon: Mail, title: "Email Marketing", accent: "#f472b6", wide: false,
    blurb: "Lifecycle flows, segmentation, and campaigns that people don't reflexively delete.",
    viz: <RippleViz color="#f472b6" />,
  },
  {
    icon: Clapperboard, title: "Video Editing", accent: "#fb923c", wide: false,
    blurb: "Short-form cuts, brand films, and ad variants delivered on a weekly cadence.",
    viz: <TimelineViz color="#fb923c" />,
  },
  {
    icon: Waves, title: "Motion Graphics", accent: "#a78bfa", wide: true,
    blurb: "Logo animation, UI motion, and explainers that make the product feel alive.",
    viz: <KeyframeViz color="#a78bfa" />,
  },
  {
    icon: Workflow, title: "Marketing Automation", accent: "#CCFF00", wide: true,
    blurb: "CRM wiring, lead scoring, and triggered journeys so the pipeline runs without a human babysitting it.",
    viz: <OrbitViz color="#CCFF00" />,
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