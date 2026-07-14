"use client";

import { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const faqs = [
  { q: "How soon will someone respond?", a: "Within 24 hours, usually faster during the week. If it's urgent, say so in the message and we'll bump it." },
  { q: "Do I need a budget in mind?", a: "No, but a range helps us recommend the right scope instead of guessing. Pick 'not sure yet' if you genuinely don't know." },
  { q: "Can we just have a call instead of filling this out?", a: "Yes — use the 'Book a call' link and skip the form entirely." },
  { q: "What happens after I submit this?", a: "We read it, check it against our current capacity, and reply with either a call link or a few clarifying questions." },
];

function Item({ f, i, open, onToggle }: { f: typeof faqs[number]; i: number; open: boolean; onToggle: () => void }) {
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
      data-cfaq-item
      style={{ opacity: 0, transform: "translateY(40px)" }}
      className="group relative rounded-2xl overflow-hidden backdrop-blur-xl transition-shadow duration-500"
    >
      <div
        className="absolute inset-0"
        style={{ background: open ? "rgba(204,255,0,0.05)" : "rgba(255,255,255,0.04)" }}
      />
      <div
        className="absolute inset-0 rounded-2xl"
        style={{ boxShadow: open ? "0 0 0 1px rgba(204,255,0,0.3)" : "0 0 0 1px rgba(255,255,255,0.10)" }}
      />
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="relative w-full flex items-center gap-5 md:gap-8 p-6 text-left cursor-pointer"
      >
        <span className="text-xs font-mono shrink-0" style={{ color: open ? "#CCFF00" : "rgba(255,255,255,0.35)" }}>
          {String(i + 1).padStart(2, "0")}
        </span>
        <h3 className={`flex-1 text-base font-medium tracking-tight ${open ? "text-white" : "text-gray-300 group-hover:text-white"}`}>
          {f.q}
        </h3>
        <span
          className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300"
          style={{
            background: open ? "rgba(204,255,0,0.15)" : "rgba(255,255,255,0.06)",
            color: open ? "#CCFF00" : "#9ca3af",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          <Plus className="w-4 h-4" />
        </span>
      </button>
      <div className="relative overflow-hidden transition-all duration-500 ease-out" style={{ maxHeight: open ? maxH : 0, opacity: open ? 1 : 0 }}>
        <div ref={bodyRef}>
          <p className="text-sm text-gray-400 leading-relaxed px-6 pb-6 pl-[3.9rem] max-w-2xl">{f.a}</p>
        </div>
      </div>
    </div>
  );
}

export default function ContactFAQ() {
  const rootRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) {
      gsap.set("[data-cfaq-item]", { opacity: 1, y: 0 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-cfaq-item]").forEach((item) => {
        gsap.to(item, {
          y: 0, opacity: 1, duration: 0.65, ease: "power3.out", overwrite: "auto",
          scrollTrigger: { trigger: item, start: "top 95%", once: true },
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative bg-[#050505] text-white pb-32 px-6 md:px-12 lg:px-20">
      <div className="max-w-4xl mx-auto">
        <p className="text-sm tracking-widest uppercase text-gray-400 font-medium mb-8">
          Quick answers
        </p>
        <div className="flex flex-col gap-3">
          {faqs.map((f, i) => (
            <Item key={f.q} f={f} i={i} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
          ))}
        </div>
      </div>
    </section>
  );
}