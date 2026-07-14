"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const paras = [
  {
    lead: "It started as a complaint.",
    body: "Three of us were freelancing for agencies that sold strategy decks and delivered stock templates. The gap between the pitch and the product was so wide you could drive a truck through it. So we stopped complaining and opened a studio.",
  },
  {
    lead: "The rule was simple:",
    body: "whoever sells the work does the work. No account layer, no handoff to a junior nobody mentioned. That rule cost us some big contracts early on. It also means the people you meet on the first call are still on the project at launch.",
  },
  {
    lead: "Ten years later, that's still the whole model.",
    body: "We stayed small on purpose. Twelve people, one design system, one set of standards. We turn down more work than we take — not out of arrogance, but because the alternative is doing it badly.",
  },
];

export default function AboutStory() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      gsap.set("[data-st-photo], [data-st-para]", {
        opacity: 1, y: 0, clearProps: "clipPath,filter,transform",
      });
      return;
    }

    const ctx = gsap.context(() => {
      // Masked photo reveal
      gsap.to("[data-st-photo]", {
        clipPath: "inset(0% 0 0 0)",
        scale: 1,
        duration: 1.4,
        ease: "power4.out",
        scrollTrigger: { trigger: "[data-st-photo]", start: "top 85%", once: true },
      });

      // Slow zoom while scrolling past
      gsap.to("[data-st-photo] img", {
        scale: 1.12,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-st-photo]",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Paragraphs — per element, no stagger
      gsap.utils.toArray<HTMLElement>("[data-st-para]").forEach((p) => {
        gsap.to(p, {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power3.out",
          overwrite: "auto",
          scrollTrigger: { trigger: p, start: "top 88%", once: true },
        });
      });

      // Badge counter line
      gsap.from("[data-st-line]", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.2,
        ease: "power3.inOut",
        scrollTrigger: { trigger: "[data-st-line]", start: "top 92%" },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative bg-[#050505] text-white pt-32 md:pt-40 pb-28 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      <div className="absolute top-20 left-[10%] w-[500px] h-[500px] rounded-full bg-[#CCFF00]/[0.015] blur-[160px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <div className="flex items-center gap-2.5 mb-16">
          <span className="relative w-2.5 h-2.5 rounded-full bg-[#CCFF00]">
            <span className="absolute inset-0 rounded-full bg-[#CCFF00] animate-ping opacity-40" />
          </span>
          <span className="text-sm text-gray-400 tracking-widest uppercase font-medium">
            Our story
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Sticky photo */}
          <div className="lg:sticky lg:top-32 lg:h-fit">
            <div
              data-st-photo
              className="relative rounded-3xl overflow-hidden aspect-[4/5] border border-white/[0.1]"
              style={{
                clipPath: "inset(100% 0 0 0)",
                transform: "scale(1.06)",
                boxShadow: "0 30px 90px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)",
              }}
            >
              <Image
                src="/about-team.png"
                alt="The Ezando team at work"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

              {/* Floating stat */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-black/60 backdrop-blur-xl border border-white/[0.12] rounded-2xl px-5 py-4">
                  <div data-st-line className="h-px w-full bg-gradient-to-r from-[#CCFF00] to-transparent mb-3" />
                  <p className="text-2xl font-bold text-white">
                    10 <span className="text-[#CCFF00]">years</span>
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Same rule, same people
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Narrative */}
          <div className="flex flex-col gap-12 lg:pt-8">
            {paras.map((p, i) => (
              <div
                key={i}
                data-st-para
                style={{ opacity: 0, transform: "translateY(40px)", filter: "blur(6px)" }}
              >
                <span className="text-xs font-mono text-[#CCFF00]/50 block mb-4">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-xl sm:text-2xl md:text-[1.6rem] leading-[1.5] tracking-[-0.01em]">
                  <span className="text-white font-medium">{p.lead}</span>{" "}
                  <span className="text-gray-400">{p.body}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}