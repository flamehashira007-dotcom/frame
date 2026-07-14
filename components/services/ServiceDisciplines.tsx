"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap,ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

const disciplines = [
  {
    n: "01",
    title: "Branding",
    accent: "#CCFF00",
    blurb:
      "Positioning, naming, identity systems, and the guidelines that keep it all from falling apart six months later.",
    deliver: [
      "Brand strategy",
      "Logo & identity",
      "Voice & tone",
      "Brand guidelines",
      "Asset library",
    ],
  },
  {
    n: "02",
    title: "Graphic Design",
    accent: "#a78bfa",
    blurb:
      "Everything the brand touches — decks, packaging, print, social, campaign artwork. Consistent, fast, on-system.",
    deliver: [
      "Pitch decks",
      "Print & packaging",
      "Campaign artwork",
      "Social templates",
      "Illustration",
    ],
  },
  {
    n: "03",
    title: "UI/UX Design",
    accent: "#38bdf8",
    blurb:
      "Research-led product design. Flows, wireframes, and interfaces built on a token set your engineers can actually ship.",
    deliver: [
      "User research",
      "Information architecture",
      "Wireframes",
      "Hi-fi UI",
      "Design system",
    ],
  },
  {
    n: "04",
    title: "Website Design",
    accent: "#f472b6",
    blurb:
      "Marketing sites that convert. Art direction, motion choreography, and layouts designed around the funnel, not the mood board.",
    deliver: [
      "Art direction",
      "Landing pages",
      "Motion spec",
      "Responsive layouts",
      "CRO review",
    ],
  },
  {
    n: "05",
    title: "Website Development",
    accent: "#34d399",
    blurb:
      "Next.js, TypeScript, and GSAP. Fast, accessible, indexable builds — handed over clean with docs.",
    deliver: [
      "Next.js build",
      "CMS integration",
      "Core Web Vitals",
      "Accessibility pass",
      "Handover docs",
    ],
  },
];

export default function ServiceDisciplines() {
  const rootRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) {
      gsap.set("[data-disc-panel]", { opacity: 1, x: 0, clearProps: "filter" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.utils
        .toArray<HTMLElement>("[data-disc-panel]")
        .forEach((panel, i) => {
          gsap.to(panel, {
            x: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "power3.out",
            overwrite: "auto",
            scrollTrigger: { trigger: panel, start: "top 92%", once: true },
          });

          ScrollTrigger.create({
            trigger: panel,
            start: "top 55%",
            end: "bottom 55%",
            onToggle: (self) => self.isActive && setActive(i),
          });
        });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="disciplines"
      ref={rootRef}
      className="relative bg-[#050505] text-white pt-32 md:pt-40 pb-28 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      <div className="absolute top-40 right-[10%] w-[600px] h-[600px] rounded-full bg-violet-500/[0.025] blur-[180px] pointer-events-none" />
      <div className="absolute bottom-20 left-[5%] w-[500px] h-[500px] rounded-full bg-[#CCFF00]/[0.015] blur-[160px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <div className="flex items-center gap-2.5 mb-8">
          <span className="relative w-2.5 h-2.5 rounded-full bg-[#CCFF00]">
            <span className="absolute inset-0 rounded-full bg-[#CCFF00] animate-ping opacity-40" />
          </span>
          <span className="text-sm text-gray-400 tracking-widest uppercase font-medium">
            Design & build
          </span>
        </div>

        <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[0.98] italic mb-20">
          <span className="bg-gradient-to-r from-white via-white to-gray-500 bg-clip-text text-transparent">
            The craft.
          </span>
        </h2>

        <div className="flex gap-16">
          {/* Sticky index */}
          <aside className="hidden lg:block w-52 shrink-0">
            <div className="sticky top-32 space-y-1">
              {disciplines.map((d, i) => (
                <div
                  key={d.n}
                  className="flex items-center gap-3 py-2.5 transition-all duration-400"
                  style={{ opacity: active === i ? 1 : 0.3 }}
                >
                  <span
                    className="h-px transition-all duration-500"
                    style={{
                      width: active === i ? 28 : 10,
                      background:
                        active === i ? d.accent : "rgba(255,255,255,0.3)",
                    }}
                  />
                  <span
                    className="text-sm font-medium transition-colors duration-400"
                    style={{ color: active === i ? d.accent : "#6b7280" }}
                  >
                    {d.title}
                  </span>
                </div>
              ))}
            </div>
          </aside>

          {/* Panels */}
          <div className="flex-1 space-y-5">
            {disciplines.map((d) => (
              <article
                key={d.n}
                data-disc-panel
                className="group relative rounded-3xl overflow-hidden p-8 md:p-10 backdrop-blur-2xl transition-shadow duration-500"
                style={{
                  opacity: 0,
                  transform: "translateX(-50px)",
                  filter: "blur(8px)",
                  boxShadow: "0 0 0 1px rgba(255,255,255,0.10)",
                }}
              >
                <div
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${d.accent}07 0%, rgba(255,255,255,0.03) 45%, rgba(255,255,255,0.01) 100%)`,
                  }}
                />
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${d.accent}50, transparent)`,
                  }}
                />
                <div
                  className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[100px] pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ background: `${d.accent}12` }}
                />

                <div className="relative flex flex-col md:flex-row gap-8 md:gap-12">
                  <div className="md:w-1/2">
                    <div className="flex items-baseline gap-4 mb-4">
                      <span
                        className="text-5xl md:text-6xl font-bold tracking-tighter"
                        style={{
                          background: `linear-gradient(135deg, ${d.accent}, ${d.accent}30)`,
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        {d.n}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">
                        {d.title}
                      </h3>
                    </div>
                    <p className="text-sm md:text-base text-gray-400 leading-relaxed max-w-md">
                      {d.blurb}
                    </p>

                    <button
                      className="mt-7 inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 w-fit hover:scale-[1.03]"
                      style={{
                        background: `linear-gradient(135deg, ${d.accent}15, rgba(255,255,255,0.04))`,
                        border: `1px solid ${d.accent}30`,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = d.accent;
                        e.currentTarget.style.color = "black";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = `linear-gradient(135deg, ${d.accent}15, rgba(255,255,255,0.04))`;
                        e.currentTarget.style.color = "white";
                      }}
                    >
                      Discuss this
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Deliverables */}
                  <div className="md:w-1/2 md:border-l md:border-white/[0.06] md:pl-12">
                    <p className="text-[11px] tracking-widest uppercase text-gray-600 font-medium mb-5">
                      What you get
                    </p>
                    <ul className="space-y-3">
                      {d.deliver.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-3 group/li"
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-300 group-hover/li:scale-150"
                            style={{ background: `${d.accent}90` }}
                          />
                          <span className="text-sm text-gray-400 group-hover/li:text-white transition-colors duration-300">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
