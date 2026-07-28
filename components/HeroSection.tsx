"use client";

import { useRef, useEffect } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";



const stats = [
  { value: "15+", label: "Projects Delivered", accent: "#CCFF00" },
  { value: "67%", label: "Keyword Ranking", accent: "#a78bfa" },
  { value: "6-Step", label: "Proven Process", accent: "#38bdf8" },
  { value: "9+", label: "Tools & Technologies", accent: "#f472b6" },
];

export default function HeroSection() {
  const rootRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const heading = headingRef.current;
    if (!heading) return;

    const ctx = gsap.context(() => {
      const words = heading.querySelectorAll<HTMLElement>("[data-word]");
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(words, {
        yPercent: 120,
        opacity: 0,
        filter: "blur(12px)",
        rotateX: -40,
        duration: 1,
        stagger: 0.09,
        transformOrigin: "50% 100%",
      })
        .from(paraRef.current, { y: 30, opacity: 0, filter: "blur(6px)", duration: 0.8 }, "-=0.5");
    }, rootRef);

    return () => ctx.revert();
  }, []);



  return (
    <div ref={rootRef}>
      <div className="relative max-w-[1536px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 w-full">
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center pt-72 md:pt-72 lg:pt-100 pb-20 max-w-5xl mx-auto">
        <h1
          ref={headingRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.3] mb-5 sm:mb-6 pb-2"
          style={{ perspective: 800 }}
        >
          <span className="inline-block overflow-hidden align-bottom pb-1">
            <span data-word className="inline-block">Pixels</span>
          </span>{" "}
          <span className="inline-block overflow-hidden align-bottom pb-1">
            <span data-word className="inline-block">forged,</span>
          </span>
          <br />
          <span className="inline-block overflow-hidden align-bottom pb-1">
            <span data-word className="inline-block">into</span>
          </span>{" "}
          <span className="inline-block overflow-hidden align-bottom pb-1">
            <span data-word className="inline-block">flawless</span>
          </span>{" "}
          <span className="inline-block overflow-hidden align-bottom pb-1">
            <span data-word className="inline-block">code</span>
          </span>
        </h1>

        <p
          ref={paraRef}
          className="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl mb-8 sm:mb-10 leading-relaxed"
        >
          Frameonix Studio is a full-service web design and development agency
          helping SaaS, e-commerce, and creative brands turn ideas into
          exceptional digital experiences.
        </p>

        <div className="relative z-20 w-full max-w-3xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-3 items-stretch">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="group relative rounded-2xl border border-white/[0.1] bg-white/[0.06] backdrop-blur-md px-5 py-6 text-center transition-all duration-300 hover:border-white/[0.2] hover:bg-white/[0.1] flex flex-col items-center justify-center min-h-[120px]"
                style={{
                  boxShadow: `0 0 30px ${stat.accent}08`,
                }}
              >
                {/* Top shimmer */}
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${stat.accent}60, transparent)`,
                  }}
                />
                <div
                  className="text-3xl sm:text-4xl font-bold tracking-tight mb-1.5"
                  style={{ color: stat.accent }}
                >
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-gray-500 font-medium tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}