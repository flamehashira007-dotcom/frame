"use client";


import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { Globe, ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const partnerLogos = [
  { name: "Thrive", icon: "✦" },
  { name: "Leafe", icon: "🍃" },
  { name: "Hues", icon: "◆" },
  { name: "Zumar Cons.", icon: "◈" },
  { name: "Crona", icon: "◎" },
  { name: "Mercury", icon: "⬡" },
];

const avatars = [
  { id: 1, gradient: "from-amber-500 to-orange-700" },
  { id: 2, gradient: "from-emerald-400 to-teal-700" },
  { id: 3, gradient: "from-violet-400 to-indigo-700" },
];

/* ── Animated counter hook ── */
function useCounter(end: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let startTime: number;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, end, duration]);

  return { count, ref };
}

export default function WhyChooseUs() {
  const counter400 = useCounter(400, 2200);
  const counter230 = useCounter(230, 2000);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-title]", {
        clipPath: "inset(0 0 100% 0)",
        filter: "blur(10px)",
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: { trigger: "[data-title]", start: "top 80%" },
      });

      // Masked image reveal (clip wipe + slow scale)
      gsap.from("[data-photo]", {
        clipPath: "inset(100% 0 0 0)",
        scale: 1.15,
        duration: 1.3,
        ease: "power4.out",
        scrollTrigger: { trigger: "[data-photo]", start: "top 78%" },
      });

      gsap.from("[data-socials] > *", {
        y: 20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: "back.out(1.6)",
        scrollTrigger: { trigger: "[data-socials]", start: "top 85%" },
      });

      gsap.from("[data-right] > *", {
        x: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-right]", start: "top 75%" },
      });

      gsap.from("[data-bottom-card]", {
        y: 50,
        opacity: 0,
        scale: 0.95,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-bottom-card]", start: "top 85%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#050505] text-white pt-40 md:pt-52 pb-24 px-6 md:px-12 lg:px-20 overflow-hidden">
      {/* ── Decorative background elements ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-[#CCFF00]/[0.02] blur-[150px] pointer-events-none" />
      <div className="absolute top-40 right-0 w-[400px] h-[400px] rounded-full bg-emerald-500/[0.03] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-violet-500/[0.02] blur-[130px] pointer-events-none" />

      {/* ── Subtle grid overlay ── */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-8 group">
          <span className="relative w-2.5 h-2.5 rounded-full bg-[#CCFF00]">
            <span className="absolute inset-0 rounded-full bg-[#CCFF00] animate-ping opacity-40" />
          </span>
          <span className="text-sm text-gray-400 tracking-widest uppercase font-medium">Why choose us</span>
        </div>

        {/* Header row */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-[4rem] font-semibold tracking-tight leading-[1.05] max-w-2xl mb-10 lg:mb-0">
            <span className="block">Meet The Minds</span>
            <span className="block bg-gradient-to-r from-white via-white to-gray-500 bg-clip-text text-transparent">
              Behind The Work
            </span>
          </h2>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {[
              { label: "Twitter / X", path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
              { label: "Dribbble", path: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.424 25.424 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.245.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" },
              { label: "LinkedIn", path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
            ].map((social) => (
              <a
                key={social.label}
                href="#"
                className="group/social w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-500 hover:text-[#CCFF00] hover:border-[#CCFF00]/40 hover:bg-[#CCFF00]/[0.06] hover:shadow-[0_0_20px_rgba(204,255,0,0.1)] transition-all duration-300"
                aria-label={social.label}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="group-hover/social:scale-110 transition-transform duration-300">
                  <path d={social.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14">
          {/* Left — Team photo with overlay effects */}
          <div className="group relative rounded-3xl overflow-hidden aspect-[4/5] lg:aspect-auto lg:min-h-[560px] border border-white/[0.06]">
            <Image
              src="/team-photo.png"
              alt="Our creative team collaborating"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/30 to-transparent" />

            {/* Floating badge */}
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
              <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl px-5 py-3 flex items-center gap-3">
                <Sparkles className="w-4 h-4 text-[#CCFF00]" />
                <span className="text-sm font-medium text-white/90">Creative Team</span>
              </div>
            </div>
          </div>

          {/* Right — Content */}
          <div className="flex flex-col justify-between gap-8">
            {/* Description text */}
            <div>
              <p className="text-xl sm:text-2xl md:text-[1.75rem] leading-[1.5] tracking-[-0.01em]">
                <span className="text-white font-medium">At Ezando® Studio, we bring together designers, strategists,</span>{" "}
                <span className="text-gray-500">and makers to craft bold, thoughtful digital experiences made with care and curiosity.</span>
              </p>

              {/* Stats row */}
              <div className="flex items-center justify-between mt-12 pt-8 border-t border-white/[0.06]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
                    <Globe className="w-5 h-5 text-[#CCFF00]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Over 100 Fields</p>
                    <p className="text-sm text-gray-500">12 Countries Over World</p>
                  </div>
                </div>

                {/* Avatar stack */}
                <div className="flex items-center">
                  <div className="flex -space-x-2.5">
                    {avatars.map((avatar) => (
                      <div
                        key={avatar.id}
                        className={`w-10 h-10 rounded-full bg-gradient-to-br ${avatar.gradient} border-[2.5px] border-[#050505] shadow-lg flex items-center justify-center transition-transform hover:-translate-y-1`}
                      >
                        <span className="text-xs text-white/90">👤</span>
                      </div>
                    ))}
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/[0.06] border-[2.5px] border-[#050505] flex items-center justify-center -ml-2.5 text-xs font-bold text-[#CCFF00]">
                    12
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Trusted Partner card — glassmorphism */}
              <div
                ref={counter400.ref}
                className="group bg-white/[0.03] border border-white/[0.07] rounded-3xl p-7 backdrop-blur-md hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-500 hover:shadow-[0_8px_40px_rgba(204,255,0,0.04)]"
              >
                <p className="text-5xl font-bold text-white mb-1 tabular-nums">
                  {counter400.count}<span className="text-[#CCFF00]">+</span>
                </p>
                <p className="text-sm text-gray-500 mb-7">Trusted Partner</p>

                {/* Partner logo grid */}
                <div className="grid grid-cols-3 gap-x-4 gap-y-3 mb-7">
                  {partnerLogos.map((partner) => (
                    <div
                      key={partner.name}
                      className="flex items-center gap-2 text-gray-600 hover:text-gray-300 transition-colors text-xs cursor-default"
                    >
                      <span className="text-[11px] opacity-60">{partner.icon}</span>
                      <span className="truncate font-medium">{partner.name}</span>
                    </div>
                  ))}
                </div>

                <button className="w-full flex items-center justify-center gap-2.5 bg-white text-black py-4 px-6 rounded-full font-semibold text-sm hover:bg-[#CCFF00] hover:shadow-[0_0_30px_rgba(204,255,0,0.2)] transition-all duration-300 group-hover:translate-y-0">
                  Book a call
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Ezando Fact card */}
              <div
                ref={counter230.ref}
                className="group relative rounded-3xl overflow-hidden min-h-[300px] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500"
              >
                <Image
                  src="/workspace-photo.png"
                  alt="Creative workspace"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

                {/* Card header */}
                <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
                  <span className="text-xs font-medium text-white/90 bg-white/[0.08] backdrop-blur-xl px-4 py-2 rounded-full border border-white/[0.1] shadow-lg">
                    Ezando Fact
                  </span>
                  <span className="text-xs text-white/40 font-mono">01/04</span>
                </div>

                {/* Card bottom stat */}
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-5xl font-bold mb-2">
                    <span className="text-[#CCFF00] drop-shadow-[0_0_20px_rgba(204,255,0,0.3)]">{counter230.count}</span>
                    <span className="text-[#CCFF00]/70">+</span>
                  </p>
                  <p className="text-sm text-white/60 leading-snug">
                    Projects successfully launched
                    <br />
                    worldwide
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
