"use client";

import { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const faqs = [
  {
    q: "Can I switch plans later?",
    a: "Absolutely. Upgrade any time and we'll prorate the difference. Downgrade at your next billing cycle — no penalty, no awkward conversation.",
  },
  {
    q: "What's included in the 30-day refund guarantee?",
    a: "If we haven't started production work, you get a full refund. If work has begun, we'll refund the unused portion. We'd rather lose a project than trap you in one.",
  },
  {
    q: "Do you charge per revision?",
    a: "Starter includes 1 round, Growth includes 2, and Premium/Enterprise are unlimited within scope. Extra rounds outside of those plans are billed at a flat rate — quoted upfront, no surprises.",
  },
  {
    q: "Are there any hidden fees?",
    a: "Zero. The price on the page is the price on the invoice. Third-party costs (hosting, ad spend, stock imagery) are separate, but we'll estimate those in the proposal.",
  },
  {
    q: "How does annual billing work?",
    a: "Pay for 12 months upfront and save 20%. If your needs change mid-year, we'll apply the remaining balance to a different plan. No lock-in traps.",
  },
  {
    q: "What if I need something that's not in any plan?",
    a: "That's what Enterprise is for — or we can build a custom add-on stack. Book a call and we'll scope it within 24 hours.",
  },
];

function Item({
  f,
  i,
  open,
  onToggle,
}: {
  f: (typeof faqs)[number];
  i: number;
  open: boolean;
  onToggle: () => void;
}) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [maxH, setMaxH] = useState(0);

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
      data-pf-item
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
            background: open
              ? "rgba(204,255,0,0.15)"
              : "rgba(255,255,255,0.06)",
            border: `1px solid ${
              open ? "rgba(204,255,0,0.5)" : "rgba(255,255,255,0.14)"
            }`,
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

export default function PricingFAQ() {
  const rootRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number>(0);

  useEffect(() => {
    if (prefersReducedMotion()) {
      gsap.set("[data-pf-item], [data-pf-head]", {
        opacity: 1,
        y: 0,
        clearProps: "filter",
      });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to("[data-pf-head]", {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1,
        ease: "power4.out",
        scrollTrigger: { trigger: "[data-pf-head]", start: "top 90%" },
      });

      gsap.utils.toArray<HTMLElement>("[data-pf-item]").forEach((item) => {
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
      id="pricing-faqs"
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
              data-pf-head
              className="text-4xl sm:text-5xl md:text-[3.5rem] font-bold tracking-tight leading-[1.05] italic mb-5"
              style={{
                opacity: 0,
                transform: "translateY(40px)",
                filter: "blur(10px)",
              }}
            >
              <span className="bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
                Money questions,
              </span>
              <br />
              <span className="bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
                straight answers.
              </span>
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed max-w-md">
              Everything you&apos;d ask before signing. We&apos;d rather you knew
              now.
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
