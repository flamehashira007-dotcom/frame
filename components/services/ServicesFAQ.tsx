"use client";

import { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const faqs = [
  {
    q: "Do I have to buy everything at once?",
    a: "No. Most clients start with one discipline — usually branding or a website — and add channels once there's something worth promoting. Bundling is cheaper, but it's not a condition.",
  },
  {
    q: "How fast can you start?",
    a: "Discovery usually kicks off within a week of the contract being signed. If you're on a hard deadline, tell us the date on the first call and we'll be honest about whether it's possible.",
  },
  {
    q: "Who actually does the work?",
    a: "The people you meet on the pitch call. We don't run a bait-and-switch where seniors sell and juniors deliver. Your team is named in the SOW.",
  },
  {
    q: "Do we own the files and the code?",
    a: "Yes — outright, on final payment. Source files, repo, design system, everything. No licensing games, no hostage situations.",
  },
  {
    q: "What if we already have an in-house team?",
    a: "Then we plug into it. We've worked as the design system layer under in-house product teams, and as the overflow crew for in-house marketers. We'll adapt to your rituals, not the other way round.",
  },
  {
    q: "What happens after launch?",
    a: "Thirty days of bug support is included on every build. After that it's either a retainer, a quarterly check-in, or nothing at all — your call. We don't do auto-renewing traps.",
  },
];

function Item({ f, i, open, onToggle }: {
  f: typeof faqs[number]; i: number; open: boolean; onToggle: () => void;
}) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [maxH, setMaxH] = useState(0);

  // Measure real content height so long answers never clip
  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    const measure = () => setMaxH(el.scrollHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      data-faq-item
      className="group relative rounded-2xl overflow-hidden backdrop-blur-xl transition-shadow duration-500"
      style={{
        opacity: 0,
        transform: "translateY(40px)",
        boxShadow: open
          ? "0 0 0 1px rgba(204,255,0,0.3), 0 12px 50px rgba(204,255,0,0.07), inset 0 1px 0 rgba(255,255,255,0.1)"
          : "0 0 0 1px rgba(255,255,255,0.10)",
      }}
    >
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: open
            ? "linear-gradient(135deg, rgba(204,255,0,0.06) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.025) 100%)"
            : "rgba(255,255,255,0.04)",
        }}
      />
      {open && (
        <div className="absolute -top-20 -left-20 w-56 h-56 rounded-full bg-[#CCFF00]/[0.08] blur-[90px] pointer-events-none" />
      )}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px transition-all duration-500"
        style={{
          background: open
            ? "linear-gradient(90deg, transparent, rgba(204,255,0,0.6), transparent)"
            : "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
        }}
      />

      <button
        onClick={onToggle}
        aria-expanded={open}
        className="relative w-full flex items-center gap-5 md:gap-8 p-6 md:p-7 text-left cursor-pointer"
      >
        <span
          className="text-xs font-mono shrink-0 transition-colors duration-300"
          style={{ color: open ? "#CCFF00" : "rgba(255,255,255,0.35)" }}
        >
          {String(i + 1).padStart(2, "0")}
        </span>
        <h3
          className={`flex-1 text-base md:text-lg font-medium tracking-tight transition-colors duration-300 ${
            open ? "text-white" : "text-gray-300 group-hover:text-white"
          }`}
        >
          {f.q}
        </h3>
        <span
          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-400"
          style={{
            background: open ? "rgba(204,255,0,0.15)" : "rgba(255,255,255,0.06)",
            border: `1px solid ${open ? "rgba(204,255,0,0.5)" : "rgba(255,255,255,0.14)"}`,
            color: open ? "#CCFF00" : "#9ca3af",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
            boxShadow: open ? "0 0 20px rgba(204,255,0,0.18)" : "none",
          }}
        >
          <Plus className="w-4 h-4" />
        </span>
      </button>

      <div
        className="relative overflow-hidden transition-all duration-500 ease-out"
        style={{ maxHeight: open ? maxH : 0, opacity: open ? 1 : 0 }}
      >
        <div ref={bodyRef}>
          <p className="text-sm text-gray-400 leading-relaxed px-6 md:px-7 pb-7 pl-[3.9rem] md:pl-[4.4rem] max-w-2xl">
            {f.a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ServicesFAQ() {
  const rootRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number>(0);

  useEffect(() => {
    if (prefersReducedMotion()) {
      gsap.set("[data-faq-item], [data-faq-head]", { opacity: 1, y: 0, clearProps: "filter" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to("[data-faq-head]", {
        y: 0, opacity: 1, filter: "blur(0px)", duration: 1, ease: "power4.out",
        scrollTrigger: { trigger: "[data-faq-head]", start: "top 90%" },
      });

      // Each row triggers on itself — no stagger, nothing stuck offscreen
      gsap.utils.toArray<HTMLElement>("[data-faq-item]").forEach((item) => {
        gsap.to(item, {
          y: 0,
          opacity: 1,
          duration: 0.65,
          ease: "power3.out",
          overwrite: "auto",
          scrollTrigger: {
            trigger: item,
            start: "top 95%",
            once: true,
          },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="faqs"
      ref={rootRef}
      className="relative bg-[#050505] text-white pt-32 md:pt-40 pb-28 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      <div className="absolute top-20 right-1/4 w-[500px] h-[500px] rounded-full bg-[#CCFF00]/[0.02] blur-[160px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-10 mb-14">
          <div className="flex items-center gap-2.5 lg:pt-4">
            <span className="relative w-2.5 h-2.5 rounded-full bg-[#CCFF00]">
              <span className="absolute inset-0 rounded-full bg-[#CCFF00] animate-ping opacity-40" />
            </span>
            <span className="text-sm text-gray-400 tracking-widest uppercase font-medium">
              FAQ
            </span>
          </div>

          <div className="max-w-xl">
            <h2
              data-faq-head
              className="text-4xl sm:text-5xl md:text-[3.5rem] font-bold tracking-tight leading-[1.05] italic mb-5"
              style={{ opacity: 0, transform: "translateY(40px)", filter: "blur(10px)" }}
            >
              <span className="bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
                The awkward questions,
              </span>
              <br />
              <span className="bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
                answered early.
              </span>
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed max-w-md">
              Everything people ask on the second call. We&apos;d rather you knew now.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((f, i) => (
            <Item
              key={f.q}
              f={f}
              i={i}
              open={open === i}
              onToggle={() => setOpen(open === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}