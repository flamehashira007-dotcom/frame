"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion, isCoarsePointer } from "@/lib/gsap";

export default function PricingCTA() {
  const rootRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
        scrollTrigger: { trigger: "[data-prc-card]", start: "top 80%" },
      });

      tl.from("[data-prc-card]", {
        clipPath: "inset(0 0 100% 0)",
        scale: 0.93,
        opacity: 0,
        duration: 1.1,
      })
        .from(
          "[data-prc-word]",
          {
            yPercent: 120,
            rotateX: -50,
            opacity: 0,
            filter: "blur(10px)",
            stagger: 0.08,
            duration: 0.9,
          },
          "-=0.5"
        )
        .from(
          "[data-prc-sub]",
          { y: 24, opacity: 0, filter: "blur(6px)", duration: 0.7 },
          "-=0.4"
        )
        .from(
          "[data-prc-actions] > *",
          { y: 30, opacity: 0, scale: 0.9, stagger: 0.12, duration: 0.6 },
          "-=0.3"
        )
        .from(
          "[data-prc-meta] > *",
          { y: 20, opacity: 0, stagger: 0.1, duration: 0.6 },
          "-=0.2"
        );

      gsap.to("[data-prc-ring]", {
        rotate: 360,
        duration: 44,
        ease: "none",
        repeat: -1,
      });

      gsap.to("[data-prc-orb]", {
        yPercent: -28,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  // Cursor spotlight
  useEffect(() => {
    const card = cardRef.current;
    if (!card || isCoarsePointer() || prefersReducedMotion()) return;

    const onMove = (e: MouseEvent) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    card.addEventListener("mousemove", onMove);
    return () => card.removeEventListener("mousemove", onMove);
  }, []);

  // Magnetic button
  useEffect(() => {
    const btn = btnRef.current;
    if (!btn || isCoarsePointer()) return;
    const xTo = gsap.quickTo(btn, "x", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(btn, "y", { duration: 0.5, ease: "power3" });
    const onMove = (e: MouseEvent) => {
      const r = btn.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * 0.4);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.4);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };
    btn.addEventListener("mousemove", onMove);
    btn.addEventListener("mouseleave", onLeave);
    return () => {
      btn.removeEventListener("mousemove", onMove);
      btn.removeEventListener("mouseleave", onLeave);
      gsap.killTweensOf(btn);
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative bg-[#050505] text-white pt-32 md:pt-40 pb-32 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      <div data-prc-orb className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-[#CCFF00]/[0.03] blur-[170px]" />
        <div className="absolute bottom-0 right-[15%] w-[400px] h-[400px] rounded-full bg-violet-500/[0.025] blur-[140px]" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div
          ref={cardRef}
          data-prc-card
          className="group relative rounded-[2.5rem] overflow-hidden border border-white/[0.08] bg-gradient-to-b from-white/[0.06] to-white/[0.01] backdrop-blur-2xl px-8 py-20 md:px-16 md:py-28 text-center"
          style={{
            boxShadow:
              "0 40px 120px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
            ["--mx" as string]: "50%",
            ["--my" as string]: "50%",
          }}
        >
          {/* Cursor spotlight */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background:
                "radial-gradient(320px circle at var(--mx) var(--my), rgba(204,255,0,0.07), transparent 70%)",
            }}
          />

          {/* Conic ring */}
          <div
            data-prc-ring
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] aspect-square rounded-full opacity-[0.07] pointer-events-none"
            style={{
              background:
                "conic-gradient(from 0deg, transparent, #CCFF00, transparent 30%, transparent 70%, #a78bfa, transparent)",
            }}
          />

          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
              maskImage:
                "radial-gradient(ellipse at center, black, transparent 75%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at center, black, transparent 75%)",
            }}
          />

          <div className="relative">
            <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.1] backdrop-blur-md">
              <span className="relative w-2 h-2 rounded-full bg-[#CCFF00]">
                <span className="absolute inset-0 rounded-full bg-[#CCFF00] animate-ping opacity-40" />
              </span>
              <span className="text-xs text-gray-400 tracking-widest uppercase font-medium">
                2 slots open for Q3
              </span>
            </div>

            <h2
              className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight leading-[1.05] mb-6"
              style={{ perspective: 800 }}
            >
              {["Still", "deciding?"].map((w) => (
                <span
                  key={w}
                  className="inline-block overflow-hidden align-bottom mr-[0.25em]"
                >
                  <span data-prc-word className="inline-block">
                    {w}
                  </span>
                </span>
              ))}
              <br />
              <span className="inline-block overflow-hidden align-bottom mr-[0.25em]">
                <span
                  data-prc-word
                  className="inline-block bg-gradient-to-r from-[#CCFF00] via-white to-[#CCFF00] bg-clip-text text-transparent"
                >
                  Let&apos;s talk
                </span>
              </span>
              <span className="inline-block overflow-hidden align-bottom">
                <span data-prc-word className="inline-block">
                  numbers.
                </span>
              </span>
            </h2>

            <p
              data-prc-sub
              className="text-base md:text-lg text-gray-400 max-w-xl mx-auto mb-12 leading-relaxed"
            >
              Book a free 30-minute call. We&apos;ll audit what you have,
              recommend the right plan, and give you a custom quote — no
              pressure, no pitch deck.
            </p>

            <div
              data-prc-actions
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <button
                ref={btnRef}
                className="group/btn flex items-center gap-3 bg-[#CCFF00] hover:bg-[#b8e600] text-black px-8 py-4 rounded-full font-semibold text-base transition-colors shadow-[0_0_40px_rgba(204,255,0,0.25)]"
              >
                Book a free call
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>

              <button className="group/btn2 flex items-center gap-3 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.12] px-8 py-4 rounded-full font-semibold text-base transition-colors backdrop-blur-md">
                Email us instead
                <ArrowUpRight className="w-4 h-4 group-hover/btn2:translate-x-0.5 group-hover/btn2:-translate-y-0.5 transition-transform" />
              </button>
            </div>

            <div
              data-prc-meta
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mt-10 text-xs text-gray-500"
            >
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00]/60" />
                Reply within 24 hours
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00]/60" />
                Free audit on the first call
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00]/60" />
                30-day money-back guarantee
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
