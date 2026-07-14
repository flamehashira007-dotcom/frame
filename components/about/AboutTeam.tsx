"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const team = [
  { name: "Aarav Mehta", role: "Founder, Strategy", gradient: "from-amber-400 to-orange-700", tag: "AM" },
  { name: "Sara Iyer", role: "Creative Director", gradient: "from-[#CCFF00] to-emerald-600", tag: "SI" },
  { name: "Dev Kapoor", role: "Design Lead", gradient: "from-violet-400 to-indigo-700", tag: "DK" },
  { name: "Maya Rao", role: "Brand Designer", gradient: "from-pink-400 to-rose-700", tag: "MR" },
  { name: "Rohan Shah", role: "Engineering Lead", gradient: "from-cyan-400 to-blue-700", tag: "RS" },
  { name: "Nisha Patel", role: "Motion Designer", gradient: "from-fuchsia-400 to-purple-700", tag: "NP" },
  { name: "Kabir Singh", role: "Growth Lead", gradient: "from-lime-400 to-green-700", tag: "KS" },
  { name: "Eliah Fernandes", role: "Product Designer", gradient: "from-teal-400 to-emerald-800", tag: "EF" },
];

export default function AboutTeam() {
  const rootRef = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      gsap.set("[data-tm-card], [data-tm-head]", {
        opacity: 1, y: 0, clearProps: "filter,transform",
      });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to("[data-tm-head]", {
        y: 0, opacity: 1, filter: "blur(0px)", duration: 1, ease: "power4.out",
        scrollTrigger: { trigger: "[data-tm-head]", start: "top 90%" },
      });

      gsap.utils.toArray<HTMLElement>("[data-tm-card]").forEach((card) => {
        gsap.to(card, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: "power3.out",
          overwrite: "auto",
          scrollTrigger: { trigger: card, start: "top 95%", once: true },
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
      <div className="absolute top-20 left-1/4 w-[600px] h-[600px] rounded-full bg-[#CCFF00]/[0.018] blur-[170px] pointer-events-none" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse at center, black, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black, transparent 75%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-8 mb-16">
          <div>
            <div className="flex items-center gap-2.5 mb-8">
              <span className="relative w-2.5 h-2.5 rounded-full bg-[#CCFF00]">
                <span className="absolute inset-0 rounded-full bg-[#CCFF00] animate-ping opacity-40" />
              </span>
              <span className="text-sm text-gray-400 tracking-widest uppercase font-medium">
                The people
              </span>
            </div>

            <h2
              data-tm-head
              className="text-4xl sm:text-5xl md:text-[4rem] font-bold tracking-tight leading-[1.02] italic max-w-2xl"
              style={{ opacity: 0, transform: "translateY(40px)", filter: "blur(10px)" }}
            >
              <span className="bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
                Twelve people.
              </span>
              <br />
              <span className="bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
                No account managers.
              </span>
            </h2>
          </div>

          <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
            Everyone here makes something. If they&apos;re on your project, you&apos;ll
            meet them on the first call and they&apos;ll still be there at launch.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {team.map((p, i) => (
            <div
              key={p.name}
              data-tm-card
              className="group relative rounded-3xl overflow-hidden backdrop-blur-xl transition-all duration-500 cursor-default"
              style={{
                opacity: 0,
                transform: "translateY(50px) scale(0.95)",
                boxShadow: "0 0 0 1px rgba(255,255,255,0.10)",
              }}
              onMouseEnter={(e) => {
                setHovered(i);
                e.currentTarget.style.boxShadow =
                  "0 0 0 1px rgba(204,255,0,0.35), 0 16px 70px rgba(204,255,0,0.08), inset 0 1px 0 rgba(255,255,255,0.12)";
              }}
              onMouseLeave={(e) => {
                setHovered(null);
                e.currentTarget.style.boxShadow = "0 0 0 1px rgba(255,255,255,0.10)";
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.07] to-white/[0.02] pointer-events-none" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

              {/* Avatar */}
              <div className="relative aspect-square flex items-center justify-center p-8">
                <div
                  className={`w-full h-full rounded-2xl bg-gradient-to-br ${p.gradient} flex items-center justify-center transition-all duration-500`}
                  style={{
                    filter: hovered === i ? "grayscale(0) saturate(1.1)" : "grayscale(0.85)",
                    transform: hovered === i ? "scale(1.05)" : "scale(1)",
                  }}
                >
                  <span className="text-3xl font-bold text-black/50">{p.tag}</span>
                </div>

                {/* Corner arrow */}
                <span
                  className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#CCFF00] flex items-center justify-center transition-all duration-400"
                  style={{
                    opacity: hovered === i ? 1 : 0,
                    transform: hovered === i ? "scale(1) rotate(0deg)" : "scale(0.5) rotate(-45deg)",
                  }}
                >
                  <ArrowUpRight className="w-4 h-4 text-black" />
                </span>
              </div>

              {/* Info */}
              <div className="relative px-6 pb-6">
                <h3 className="text-base font-semibold tracking-tight group-hover:text-[#CCFF00] transition-colors duration-300">
                  {p.name}
                </h3>
                <p className="text-xs text-gray-500 mt-1">{p.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Hiring note */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-6 p-8 rounded-3xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/[0.10] backdrop-blur-xl">
          <div>
            <h3 className="text-lg font-semibold mb-1.5">
              We hire about once a year.
            </h3>
            <p className="text-sm text-gray-400">
              No open roles right now — but we read everything that comes in.
            </p>
          </div>
          <a
            href="/contact"
            className="group/btn flex items-center gap-3 bg-white/[0.06] hover:bg-[#CCFF00] hover:text-black border border-white/[0.14] px-7 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 shrink-0"
          >
            Send us your work
            <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}