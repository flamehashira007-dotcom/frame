"use client";

import { useEffect, useRef } from "react";
import { Compass, Hammer, MessagesSquare, Recycle } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const values = [
  {
    icon: Compass,
    n: "01",
    title: "Say the hard thing early",
    body: "If the brief is wrong, we tell you in week one — not in week seven when the invoice is already sunk. Disagreements are cheapest at the start.",
    accent: "#CCFF00",
  },
  {
    icon: Hammer,
    n: "02",
    title: "Ship it or shut up",
    body: "A design that never ships is a hobby. We hand over production code, not a Figma file and a prayer. If it doesn't survive engineering, it wasn't finished.",
    accent: "#38bdf8",
  },
  {
    icon: MessagesSquare,
    n: "03",
    title: "No account theatre",
    body: "There's no layer of people whose job is to translate between you and the makers. You talk to whoever's holding the pen. It's faster and less expensive for everyone.",
    accent: "#a78bfa",
  },
  {
    icon: Recycle,
    n: "04",
    title: "Build things that outlast us",
    body: "Every project leaves behind a system your team can extend without calling us. We'd rather be missed than needed.",
    accent: "#34d399",
  },
];

export default function AboutValues() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      gsap.set("[data-vl-card], [data-vl-head]", {
        opacity: 1, y: 0, clearProps: "filter,transform",
      });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to("[data-vl-head]", {
        y: 0, opacity: 1, filter: "blur(0px)", duration: 1, ease: "power4.out",
        scrollTrigger: { trigger: "[data-vl-head]", start: "top 90%" },
      });

      gsap.utils.toArray<HTMLElement>("[data-vl-card]").forEach((card) => {
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

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative bg-[#050505] text-white pt-32 md:pt-40 pb-28 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      <div className="absolute top-20 right-1/4 w-[600px] h-[600px] rounded-full bg-[#CCFF00]/[0.018] blur-[170px] pointer-events-none" />
      <div className="absolute bottom-10 left-[10%] w-[400px] h-[400px] rounded-full bg-violet-500/[0.02] blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <div className="flex items-center gap-2.5 mb-8">
          <span className="relative w-2.5 h-2.5 rounded-full bg-[#CCFF00]">
            <span className="absolute inset-0 rounded-full bg-[#CCFF00] animate-ping opacity-40" />
          </span>
          <span className="text-sm text-gray-400 tracking-widest uppercase font-medium">
            What we believe
          </span>
        </div>

        <h2
          data-vl-head
          className="text-4xl sm:text-5xl md:text-[4rem] font-bold tracking-tight leading-[1.02] italic mb-16 max-w-3xl"
          style={{ opacity: 0, transform: "translateY(40px)", filter: "blur(10px)" }}
        >
          <span className="bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
            Four rules.
          </span>
          <br />
          <span className="bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
            We&apos;ve never broken them.
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <div
                key={v.n}
                data-vl-card
                className="group relative rounded-3xl p-8 md:p-10 overflow-hidden backdrop-blur-xl transition-shadow duration-500"
                style={{
                  opacity: 0,
                  transform: "translateY(50px)",
                  boxShadow: "0 0 0 1px rgba(255,255,255,0.10)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 0 1px ${v.accent}40, 0 16px 70px ${v.accent}12, inset 0 1px 0 rgba(255,255,255,0.12)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 0 1px rgba(255,255,255,0.10)";
                }}
              >
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `linear-gradient(150deg, ${v.accent}0d 0%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.025) 100%)`,
                  }}
                />
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px pointer-events-none"
                  style={{ background: `linear-gradient(90deg, transparent, ${v.accent}60, transparent)` }}
                />
                <div
                  className="absolute -top-24 -right-20 w-56 h-56 rounded-full blur-[90px] pointer-events-none opacity-30 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ background: `${v.accent}18` }}
                />

                <div className="relative">
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{
                        background: `${v.accent}1c`,
                        border: `1px solid ${v.accent}40`,
                      }}
                    >
                      <Icon className="w-5 h-5" style={{ color: v.accent }} />
                    </div>
                    <span
                      className="text-5xl font-bold tracking-tighter leading-none text-white transition-colors duration-500"
                      style={{ ["--vl-accent" as string]: v.accent }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = `${v.accent}30`)}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "")}
                    >
                      {v.n}
                    </span>
                  </div>

                  <h3
                    className="text-xl md:text-2xl font-semibold tracking-tight mb-3 text-white transition-colors duration-300 group-hover:text-[color:var(--vl-accent)]"
                    style={{ ["--vl-accent" as string]: v.accent }}
                  >
                    {v.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-400 leading-relaxed max-w-md">
                    {v.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}