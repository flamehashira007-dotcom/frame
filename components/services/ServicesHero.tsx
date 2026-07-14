"use client";

import Image from "next/image";
import { ArrowRight, ArrowDown } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion, isCoarsePointer } from "@/lib/gsap";

const ticker = [
  "Branding", "Graphic Design", "UI/UX", "Web Design", "Web Development",
  "SEO", "Social Media", "Google Ads", "Meta Ads", "Content", "Email",
  "Video Editing", "Motion Graphics", "Automation",
];

export default function ServicesHero() {
  const rootRef = useRef<HTMLElement>(null);
  const artRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from("[data-sh-eyebrow]", { y: 20, opacity: 0, duration: 0.7 })
        .from("[data-sh-word]", {
          yPercent: 120,
          rotateX: -45,
          opacity: 0,
          filter: "blur(12px)",
          stagger: 0.07,
          duration: 1,
        }, "-=0.4")
        .from("[data-sh-sub]", { y: 24, opacity: 0, filter: "blur(6px)", duration: 0.7 }, "-=0.5")
        .from("[data-sh-actions] > *", { y: 24, opacity: 0, scale: 0.92, stagger: 0.1, duration: 0.6 }, "-=0.35")
        .from("[data-sh-art]", { opacity: 0, scale: 0.88, y: 70, filter: "blur(24px)", duration: 1.5 }, "-=0.9")
        .from("[data-sh-scan]", { scaleY: 0, duration: 1, ease: "power2.inOut" }, "-=0.7")
        .from("[data-sh-ticker]", { opacity: 0, duration: 0.8 }, "-=0.6");

      // Scrubbed drift on artwork
      gsap.to("[data-sh-art]", {
        yPercent: -14,
        ease: "none",
        scrollTrigger: { trigger: rootRef.current, start: "top top", end: "bottom top", scrub: true },
      });

      // Bloom breathe
      gsap.to("[data-sh-bloom]", {
        scale: 1.14,
        opacity: 0.55,
        duration: 5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Scanline sweep across the art
      gsap.to("[data-sh-scan]", {
        yPercent: 1400,
        duration: 4.5,
        ease: "power1.inOut",
        repeat: -1,
        repeatDelay: 2.5,
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  // 3D tilt
  useEffect(() => {
    const art = artRef.current;
    if (!art || isCoarsePointer() || prefersReducedMotion()) return;

    const rx = gsap.quickTo(art, "rotateX", { duration: 0.9, ease: "power3" });
    const ry = gsap.quickTo(art, "rotateY", { duration: 0.9, ease: "power3" });

    const onMove = (e: MouseEvent) => {
      const relX = e.clientX / window.innerWidth - 0.5;
      const relY = e.clientY / window.innerHeight - 0.5;
      ry(relX * 12);
      rx(-relY * 8);
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      gsap.killTweensOf(art);
    };
  }, []);

  // Magnetic CTA
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
      ref={rootRef}
      className="relative bg-[#050505] text-white pt-40 md:pt-48 pb-16 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      {/* Ambient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[700px] rounded-full bg-[#CCFF00]/[0.025] blur-[180px] pointer-events-none" />
      <div className="absolute top-1/3 right-[8%] w-[420px] h-[420px] rounded-full bg-violet-500/[0.02] blur-[150px] pointer-events-none" />

      {/* Dot matrix */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(204,255,0,0.14) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 35%, black, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 35%, black, transparent 80%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto text-center">
        <div
          data-sh-eyebrow
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.1] backdrop-blur-md"
        >
          <span className="relative w-2 h-2 rounded-full bg-[#CCFF00]">
            <span className="absolute inset-0 rounded-full bg-[#CCFF00] animate-ping opacity-40" />
          </span>
          <span className="text-xs text-gray-400 tracking-widest uppercase font-medium">
            13 services · one studio
          </span>
        </div>

        <h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.98] mb-7"
          style={{ perspective: 800 }}
        >
          {["Everything", "you", "need"].map((w) => (
            <span key={w} className="inline-block overflow-hidden align-bottom mr-[0.22em]">
              <span data-sh-word className="inline-block">{w}</span>
            </span>
          ))}
          <br />
          <span className="inline-block overflow-hidden align-bottom mr-[0.22em]">
            <span
              data-sh-word
              className="inline-block italic bg-gradient-to-r from-[#CCFF00] via-white to-[#CCFF00] bg-clip-text text-transparent"
            >
              under one
            </span>
          </span>
          <span className="inline-block overflow-hidden align-bottom">
            <span data-sh-word className="inline-block italic">roof.</span>
          </span>
        </h1>

        <p data-sh-sub className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Brand, product, web, and growth — designed as one system instead of
          stitched together from five vendors who never talk to each other.
        </p>

        <div data-sh-actions className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <button
            ref={ctaRef}
            className="group/btn flex items-center gap-3 bg-[#CCFF00] hover:bg-[#b8e600] text-black px-8 py-4 rounded-full font-semibold text-base transition-colors shadow-[0_0_40px_rgba(204,255,0,0.25)]"
          >
            Start a project
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </button>
          <a
            href="#disciplines"
            className="group/btn2 flex items-center gap-3 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.12] px-8 py-4 rounded-full font-semibold text-base transition-colors backdrop-blur-md"
          >
            Browse services
            <ArrowDown className="w-4 h-4 group-hover/btn2:translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* ── Hero artwork ── */}
        <div className="relative" style={{ perspective: 1400 }}>
          <div
            data-sh-bloom
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] rounded-full bg-[#CCFF00]/[0.07] blur-[120px] pointer-events-none"
          />

          <div
            ref={artRef}
            data-sh-art
            className="relative mx-auto max-w-5xl rounded-[2rem] overflow-hidden border border-white/[0.08] will-change-transform"
            style={{
              transformStyle: "preserve-3d",
              boxShadow: "0 50px 140px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.08)",
            }}
          >
            <Image
              src="/services-hero.png"
              alt="Design system components — buttons, tokens, charts and typography panels"
              width={1536}
              height={1024}
              priority
              className="w-full h-auto select-none"
            />

            {/* Scanline sweep */}
            <div
              data-sh-scan
              className="absolute top-0 left-0 right-0 h-[6%] pointer-events-none origin-top"
              style={{
                background: "linear-gradient(180deg, transparent, rgba(204,255,0,0.10), transparent)",
              }}
            />

            {/* Edge vignette so it melts into the page */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-70" />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#050505]/50 via-transparent to-[#050505]/50" />

            {/* Top shimmer */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          </div>
        </div>
      </div>

      {/* ── Ticker ── */}
      <div data-sh-ticker className="relative mt-16 overflow-hidden">
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, #050505 0%, transparent 12%, transparent 88%, #050505 100%)",
          }}
        />
        <div className="flex gap-4 w-max animate-[ticker_40s_linear_infinite]">
          {[...ticker, ...ticker].map((t, i) => (
            <span
              key={i}
              className="flex items-center gap-2.5 shrink-0 bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/[0.08] rounded-full px-5 py-2.5 backdrop-blur-xl text-sm text-gray-400 whitespace-nowrap"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00]/60" />
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}