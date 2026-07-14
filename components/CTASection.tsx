"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion, isCoarsePointer } from "@/lib/gsap";

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  // Entrance timeline + scrubbed orb parallax
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
        scrollTrigger: { trigger: "[data-cta-card]", start: "top 80%" },
      });

      tl.from("[data-cta-card]", {
        clipPath: "inset(0 0 100% 0)",
        scale: 0.92,
        opacity: 0,
        duration: 1.1,
      })
        .from("[data-cta-word]", {
          yPercent: 120,
          rotateX: -50,
          opacity: 0,
          filter: "blur(10px)",
          stagger: 0.08,
          duration: 0.9,
        }, "-=0.5")
        .from("[data-cta-sub]", { y: 24, opacity: 0, filter: "blur(6px)", duration: 0.7 }, "-=0.4")
        .from("[data-cta-actions] > *", { y: 30, opacity: 0, scale: 0.9, stagger: 0.12, duration: 0.6 }, "-=0.3")
        .from("[data-cta-foot]", { y: 20, opacity: 0, duration: 0.6 }, "-=0.2");

      // Scrubbed orb drift (background independent of foreground)
      gsap.to("[data-cta-orb]", {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Idle float on the conic ring
      gsap.to("[data-cta-ring]", {
        rotate: 360,
        duration: 40,
        ease: "none",
        repeat: -1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Magnetic primary CTA
  useEffect(() => {
    const btn = ctaRef.current;
    if (!btn || isCoarsePointer()) return;

    const xTo = gsap.quickTo(btn, "x", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(btn, "y", { duration: 0.5, ease: "power3" });

    const onMove = (e: MouseEvent) => {
      const r = btn.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * 0.4);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.4);
    };
    const onLeave = () => { xTo(0); yTo(0); };

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
      ref={sectionRef}
      className="relative bg-[#050505] text-white pt-32 md:pt-40 pb-32 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      {/* Background orbs */}
      <div ref={orbRef} data-cta-orb className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-[#CCFF00]/[0.03] blur-[170px]" />
        <div className="absolute bottom-0 right-[15%] w-[400px] h-[400px] rounded-full bg-violet-500/[0.03] blur-[140px]" />
        <div className="absolute top-1/3 left-[10%] w-[350px] h-[350px] rounded-full bg-emerald-500/[0.02] blur-[130px]" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div
          data-cta-card
          className="group relative rounded-[2.5rem] overflow-hidden border border-white/[0.08] bg-gradient-to-b from-white/[0.06] to-white/[0.01] backdrop-blur-2xl px-8 py-20 md:px-16 md:py-28 text-center"
          style={{ boxShadow: "0 40px 120px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)" }}
        >
          {/* Rotating conic ring */}
          <div
            data-cta-ring
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] aspect-square rounded-full opacity-[0.07] pointer-events-none"
            style={{
              background: "conic-gradient(from 0deg, transparent, #CCFF00, transparent 30%, transparent 70%, #a78bfa, transparent)",
            }}
          />

          {/* Shimmer top line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
              maskImage: "radial-gradient(ellipse at center, black, transparent 75%)",
            }}
          />

          <div className="relative">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.1] backdrop-blur-md">
              <span className="relative w-2 h-2 rounded-full bg-[#CCFF00]">
                <span className="absolute inset-0 rounded-full bg-[#CCFF00] animate-ping opacity-40" />
              </span>
              <span className="text-xs text-gray-400 tracking-widest uppercase font-medium">
                Available for new projects
              </span>
            </div>

            {/* Headline — word split for GSAP */}
            <h2
              className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight leading-[1.05] mb-6"
              style={{ perspective: 800 }}
            >
              {["Let's", "build", "something"].map((w) => (
                <span key={w} className="inline-block overflow-hidden align-bottom mr-[0.25em]">
                  <span data-cta-word className="inline-block">{w}</span>
                </span>
              ))}
              <br />
              <span className="inline-block overflow-hidden align-bottom mr-[0.25em]">
                <span data-cta-word className="inline-block bg-gradient-to-r from-[#CCFF00] via-white to-[#CCFF00] bg-clip-text text-transparent">
                  extraordinary
                </span>
              </span>
              <span className="inline-block overflow-hidden align-bottom">
                <span data-cta-word className="inline-block">together.</span>
              </span>
            </h2>

            <p data-cta-sub className="text-base md:text-lg text-gray-400 max-w-xl mx-auto mb-12 leading-relaxed">
              Tell us about your vision and we&apos;ll turn it into a bold,
              thoughtful digital experience — crafted with care and curiosity.
            </p>

            {/* Actions */}
            <div data-cta-actions className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                ref={ctaRef}
                className="group/btn flex items-center gap-3 bg-[#CCFF00] hover:bg-[#b8e600] text-black px-8 py-4 rounded-full font-semibold text-base transition-colors shadow-[0_0_40px_rgba(204,255,0,0.25)]"
              >
                Start a project
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>

              <button className="group/btn2 flex items-center gap-3 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.12] px-8 py-4 rounded-full font-semibold text-base transition-colors backdrop-blur-md">
                Book a call
                <ArrowUpRight className="w-4 h-4 group-hover/btn2:translate-x-0.5 group-hover/btn2:-translate-y-0.5 transition-transform" />
              </button>
            </div>

            {/* Footnote */}
            <div data-cta-foot className="flex items-center justify-center gap-3 mt-10 text-xs text-gray-500">
              <div className="flex -space-x-2">
                {["from-amber-500 to-orange-700", "from-emerald-400 to-teal-700", "from-violet-400 to-indigo-700"].map((g) => (
                  <div key={g} className={`w-6 h-6 rounded-full bg-gradient-to-br ${g} border-2 border-[#050505]`} />
                ))}
              </div>
              <span>Join 400+ teams already building with us</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}