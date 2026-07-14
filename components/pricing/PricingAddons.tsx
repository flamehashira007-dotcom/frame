"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, Plus } from "lucide-react";
import { gsap, prefersReducedMotion, isCoarsePointer } from "@/lib/gsap";

const addons = [
  {
    icon: "🎬",
    name: "Video Editing",
    desc: "Professional edits for reels, promos, and product videos. Delivered in 5 business days.",
    price: "From $499",
    unit: "per video",
  },
  {
    icon: "⚡",
    name: "Rush Delivery",
    desc: "Need it yesterday? We'll compress your timeline by 40% with a priority lane.",
    price: "+30%",
    unit: "of plan cost",
  },
  {
    icon: "📊",
    name: "Monthly Retainer",
    desc: "Ongoing design, dev, or marketing hours. Use them however you want, rollover included.",
    price: "From $1,999",
    unit: "per month",
  },
  {
    icon: "🔍",
    name: "SEO Content Pack",
    desc: "8 optimised blog posts per month, keyword research, and internal linking strategy.",
    price: "$1,299",
    unit: "per month",
  },
  {
    icon: "🎨",
    name: "Brand Collateral",
    desc: "Business cards, pitch decks, merchandise — designed within your brand system.",
    price: "From $299",
    unit: "per item",
  },
  {
    icon: "🛡️",
    name: "Maintenance & Hosting",
    desc: "Uptime monitoring, security patches, CDN, and monthly performance reports.",
    price: "$199",
    unit: "per month",
  },
];

export default function PricingAddons() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      gsap.set("[data-pa-card], [data-pa-head]", {
        opacity: 1,
        y: 0,
        clearProps: "filter",
      });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to("[data-pa-head]", {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1,
        ease: "power4.out",
        scrollTrigger: { trigger: "[data-pa-head]", start: "top 90%" },
      });

      gsap.utils.toArray<HTMLElement>("[data-pa-card]").forEach((card) => {
        gsap.to(card, {
          y: 0,
          opacity: 1,
          duration: 0.65,
          ease: "power3.out",
          overwrite: "auto",
          scrollTrigger: { trigger: card, start: "top 95%", once: true },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  // Cursor spotlight
  useEffect(() => {
    if (isCoarsePointer() || prefersReducedMotion()) return;

    const cards = document.querySelectorAll<HTMLElement>("[data-pa-card]");
    const handlers: Array<() => void> = [];

    cards.forEach((card) => {
      const onMove = (e: MouseEvent) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      };
      card.addEventListener("mousemove", onMove);
      handlers.push(() => card.removeEventListener("mousemove", onMove));
    });

    return () => handlers.forEach((h) => h());
  }, []);

  return (
    <section
      id="add-ons"
      ref={rootRef}
      className="relative bg-[#050505] text-white pt-32 md:pt-40 pb-28 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      <div className="absolute top-40 left-[15%] w-[400px] h-[400px] rounded-full bg-violet-500/[0.02] blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-10 mb-14">
          <div className="flex items-center gap-2.5 lg:pt-4">
            <span className="relative w-2.5 h-2.5 rounded-full bg-[#CCFF00]">
              <span className="absolute inset-0 rounded-full bg-[#CCFF00] animate-ping opacity-40" />
            </span>
            <span className="text-sm text-gray-400 tracking-widest uppercase font-medium">
              Add-ons
            </span>
          </div>

          <div className="max-w-xl">
            <h2
              data-pa-head
              className="text-4xl sm:text-5xl md:text-[3.5rem] font-bold tracking-tight leading-[1.05] italic mb-5"
              style={{
                opacity: 0,
                transform: "translateY(40px)",
                filter: "blur(10px)",
              }}
            >
              <span className="bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
                Need something extra?
              </span>
              <br />
              <span className="bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
                Stack it on.
              </span>
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed max-w-md">
              Bolt these onto any plan. No minimum commitment, no long-term lock-in.
            </p>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {addons.map((addon) => (
            <div
              key={addon.name}
              data-pa-card
              className="group relative bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/[0.1] rounded-3xl p-8 backdrop-blur-xl overflow-hidden hover:border-white/[0.22] transition-all duration-500 hover:shadow-[0_8px_60px_rgba(204,255,0,0.06),inset_0_1px_0_rgba(255,255,255,0.1)]"
              style={{
                opacity: 0,
                transform: "translateY(50px)",
                ["--mx" as string]: "50%",
                ["--my" as string]: "50%",
              }}
            >
              {/* Cursor spotlight */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(250px circle at var(--mx) var(--my), rgba(204,255,0,0.06), transparent 70%)",
                }}
              />

              {/* Top shimmer */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

              {/* Glow on hover */}
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full bg-[#CCFF00]/[0.04] blur-[60px] group-hover:bg-[#CCFF00]/[0.09] transition-all duration-700 pointer-events-none" />

              <div className="relative">
                <div className="flex items-start justify-between mb-5">
                  <span className="text-3xl">{addon.icon}</span>
                  <span className="w-9 h-9 rounded-full bg-white/[0.06] border border-white/[0.12] flex items-center justify-center group-hover:bg-[#CCFF00]/[0.15] group-hover:border-[#CCFF00]/30 transition-all duration-300">
                    <Plus className="w-4 h-4 text-gray-400 group-hover:text-[#CCFF00] transition-colors" />
                  </span>
                </div>

                <h3 className="text-lg font-semibold mb-2 group-hover:text-[#CCFF00] transition-colors duration-300">
                  {addon.name}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-6">
                  {addon.desc}
                </p>

                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold tracking-tight">
                    {addon.price}
                  </span>
                  <span className="text-xs text-gray-500">{addon.unit}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA row */}
        <div className="text-center mt-14">
          <p className="text-sm text-gray-500 mb-4">
            Need a custom combination?
          </p>
          <button className="inline-flex items-center gap-2 text-sm font-medium text-[#CCFF00] hover:text-[#b8e600] transition-colors group/link">
            Build a custom quote
            <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
