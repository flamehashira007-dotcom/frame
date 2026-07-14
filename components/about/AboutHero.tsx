"use client";

import { ArrowDown } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion, isCoarsePointer } from "@/lib/gsap";

export default function AboutHero() {
  const rootRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      gsap.set("[data-ah-word], [data-ah-sub], [data-ah-meta] > *, [data-ah-scroll]", {
        opacity: 1,
        y: 0,
        clearProps: "filter,transform",
      });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from("[data-ah-eyebrow]", { y: 20, opacity: 0, duration: 0.7 })
        .from(
          "[data-ah-word]",
          {
            yPercent: 120,
            rotateX: -45,
            opacity: 0,
            filter: "blur(12px)",
            stagger: 0.06,
            duration: 1,
          },
          "-=0.4"
        )
        .from("[data-ah-sub]", { y: 24, opacity: 0, filter: "blur(6px)", duration: 0.7 }, "-=0.5")
        .from("[data-ah-meta] > *", { y: 24, opacity: 0, stagger: 0.1, duration: 0.6 }, "-=0.35")
        .from("[data-ah-scroll]", { opacity: 0, y: -10, duration: 0.6 }, "-=0.2");

      // Marquee drift on scroll
      gsap.to("[data-ah-marquee]", {
        xPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Glow breathe
      gsap.to("[data-ah-glow]", {
        scale: 1.15,
        opacity: 0.55,
        duration: 5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Scroll cue bob
      gsap.to("[data-ah-scroll] svg", {
        y: 6,
        duration: 1.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  // Cursor-follow glow
  useEffect(() => {
    const glow = glowRef.current;
    if (!glow || isCoarsePointer() || prefersReducedMotion()) return;

    const xTo = gsap.quickTo(glow, "x", { duration: 1.4, ease: "power2.out" });
    const yTo = gsap.quickTo(glow, "y", { duration: 1.4, ease: "power2.out" });

    const onMove = (e: MouseEvent) => {
      xTo((e.clientX / window.innerWidth - 0.5) * 120);
      yTo((e.clientY / window.innerHeight - 0.5) * 80);
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      gsap.killTweensOf(glow);
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative bg-[#050505] text-white min-h-screen flex flex-col justify-center pt-40 md:pt-48 pb-20 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      {/* Ambient */}
      <div
        ref={glowRef}
        data-ah-glow
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-[#CCFF00]/[0.03] blur-[180px] pointer-events-none"
      />
      <div className="absolute bottom-0 right-[10%] w-[450px] h-[450px] rounded-full bg-violet-500/[0.025] blur-[150px] pointer-events-none" />

      {/* Dot matrix */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(204,255,0,0.14) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 45%, black, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 45%, black, transparent 80%)",
        }}
      />

      {/* Ghost marquee behind headline */}
      <div
        data-ah-marquee
        className="absolute top-1/2 left-0 -translate-y-1/2 w-[140%] pointer-events-none select-none"
      >
        <span className="block text-[18vw] font-bold tracking-tighter leading-none whitespace-nowrap text-white/[0.018] italic">
          curious · stubborn · precise · curious · stubborn · precise
        </span>
      </div>

      <div className="relative max-w-6xl mx-auto w-full">
        {/* Eyebrow */}
        <div
          data-ah-eyebrow
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.1] backdrop-blur-md"
        >
          <span className="relative w-2 h-2 rounded-full bg-[#CCFF00]">
            <span className="absolute inset-0 rounded-full bg-[#CCFF00] animate-ping opacity-40" />
          </span>
          <span className="text-xs text-gray-400 tracking-widest uppercase font-medium">
            About the studio
          </span>
        </div>

        {/* Headline */}
        <h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.98] mb-8"
          style={{ perspective: 800 }}
        >
          {["We're", "a", "small", "studio"].map((w) => (
            <span key={w} className="inline-block overflow-hidden align-bottom mr-[0.22em]">
              <span data-ah-word className="inline-block">
                {w}
              </span>
            </span>
          ))}
          <br />
          {["with", "an"].map((w) => (
            <span key={w} className="inline-block overflow-hidden align-bottom mr-[0.22em]">
              <span data-ah-word className="inline-block">
                {w}
              </span>
            </span>
          ))}
          <span className="inline-block overflow-hidden align-bottom mr-[0.22em]">
            <span
              data-ah-word
              className="inline-block italic bg-gradient-to-r from-[#CCFF00] via-white to-[#CCFF00] bg-clip-text text-transparent"
            >
              unreasonable
            </span>
          </span>
          <br />
          <span className="inline-block overflow-hidden align-bottom">
            <span data-ah-word className="inline-block italic">
              standard.
            </span>
          </span>
        </h1>

        <p data-ah-sub className="text-base md:text-lg text-gray-400 max-w-2xl mb-14 leading-relaxed">
          Twelve people across four timezones who got tired of watching good
          ideas die in committee. We build brands and products that survive
          contact with the real world.
        </p>

        {/* Meta row */}
        <div
          data-ah-meta
          className="flex flex-wrap items-center gap-x-12 gap-y-6 pt-10 border-t border-white/[0.08]"
        >
          {[
            { k: "Founded", v: "2016" },
            { k: "Based in", v: "Ahmedabad, IN" },
            { k: "Team", v: "12 people" },
            { k: "Clients in", v: "12 countries" },
          ].map((m) => (
            <div key={m.k}>
              <p className="text-[11px] tracking-widest uppercase text-gray-500 mb-1.5">{m.k}</p>
              <p className="text-lg font-semibold text-white">{m.v}</p>
            </div>
          ))}
        </div>

        {/* Scroll cue */}
        <div
          data-ah-scroll
          className="flex items-center gap-3 mt-16 text-xs text-gray-500 tracking-widest uppercase"
        >
          <ArrowDown className="w-4 h-4 text-[#CCFF00]" />
          Scroll
        </div>
      </div>
    </section>
  );
}