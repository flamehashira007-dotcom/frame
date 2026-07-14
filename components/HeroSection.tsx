"use client";

import { ArrowRight, Lock } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { gsap, prefersReducedMotion, isCoarsePointer } from "@/lib/gsap";

const companies = [
  { name: "Acme Corp", icon: "◎" },
  { name: "EchoLab", icon: "◉" },
  { name: "Innova", icon: "✦" },
  { name: "PixelFlow", icon: "◈" },
  { name: "Quantum", icon: "⬡" },
];

export default function HeroSection() {
  const [email, setEmail] = useState("");

  const rootRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

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
        .from(paraRef.current, { y: 30, opacity: 0, filter: "blur(6px)", duration: 0.8 }, "-=0.5")
        .from(formRef.current, { y: 40, opacity: 0, scale: 0.94, duration: 0.7 }, "-=0.4")
        .from(
          trustRef.current?.querySelectorAll("[data-logo]") ?? [],
          { y: 20, opacity: 0, stagger: 0.08, duration: 0.5 },
          "-=0.3"
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  // Magnetic CTA
  useEffect(() => {
    const btn = ctaRef.current;
    if (!btn || isCoarsePointer()) return;

    const xTo = gsap.quickTo(btn, "x", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(btn, "y", { duration: 0.5, ease: "power3" });

    const onMove = (e: MouseEvent) => {
      const r = btn.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * 0.35);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.35);
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
    <div ref={rootRef}>
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 pt-32 md:pt-40 lg:pt-48 max-w-5xl mx-auto">
        <h1
          ref={headingRef}
          className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight leading-[1.1] mb-6"
          style={{ perspective: 800 }}
        >
          <span className="inline-block overflow-hidden align-bottom">
            <span data-word className="inline-block">Design</span>
          </span>{" "}
          <span className="inline-block overflow-hidden align-bottom">
            <span data-word className="inline-block">work,</span>
          </span>
          <br />
          <span className="inline-block overflow-hidden align-bottom">
            <span data-word className="inline-block">the</span>
          </span>{" "}
          <span className="inline-block overflow-hidden align-bottom">
            <span data-word className="inline-block">efficient</span>
          </span>{" "}
          <span className="inline-block overflow-hidden align-bottom">
            <span data-word className="inline-block">way</span>
          </span>
        </h1>

        <p
          ref={paraRef}
          className="text-base md:text-lg text-gray-400 max-w-2xl mb-10 leading-relaxed"
        >
          Innovative design solutions for technology firms and emerging
          businesses weary of the typical aesthetic methodology. Arriving
          shortly.
        </p>

        <div ref={formRef} className="w-full max-w-lg">
          <div className="flex items-center gap-2 bg-white/[0.04] backdrop-blur-sm border border-white/[0.1] rounded-2xl p-2">
            <input
              type="email"
              placeholder="johndoe@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-transparent px-5 py-4 text-base outline-none placeholder:text-gray-500 text-white"
            />
            <button
              ref={ctaRef}
              className="flex items-center gap-2.5 bg-[#CCFF00] hover:bg-[#b8e600] text-black px-6 py-4 rounded-xl font-semibold text-base transition-colors shrink-0"
            >
              Get notified
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-500">
            <Lock className="w-3 h-3" />
            <span>No spam.</span>
            <span className="mx-1">•</span>
            <span>Unsubscribe anytime.</span>
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t border-white/[0.08] pt-10 pb-12">
        <p className="text-center text-xs text-gray-500 mb-8 tracking-wide uppercase">
          Trusted by future-forward companies
        </p>
        <div
          ref={trustRef}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-14 px-4"
        >
          {companies.map((company) => (
            <div
              key={company.name}
              data-logo
              className="flex items-center gap-3 text-gray-400 hover:text-gray-300 transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-xs text-white/70">
                {company.icon}
              </div>
              <span className="text-sm font-medium">{company.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}