"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { gsap, prefersReducedMotion, isCoarsePointer } from "@/lib/gsap";

const plans = [
  {
    name: "Starter",
    tagline: "For brands finding their feet",
    price: 1499,
    annual: 1199,
    features: [
      "Brand identity design",
      "1 landing page (design + dev)",
      "Basic SEO setup",
      "Social media templates (5)",
      "1 revision round",
      "Email support",
      "Delivery in 3 weeks",
    ],
    cta: "Get started",
    popular: false,
  },
  {
    name: "Growth",
    tagline: "For startups ready to scale",
    price: 3499,
    annual: 2799,
    features: [
      "Everything in Starter",
      "Full website (up to 8 pages)",
      "UI/UX design system",
      "On-page + technical SEO",
      "Google Ads setup & 30-day management",
      "Social media kit (15 templates)",
      "2 revision rounds",
      "Priority Slack support",
      "Delivery in 5 weeks",
    ],
    cta: "Start growing",
    popular: true,
  },
  {
    name: "Premium",
    tagline: "For companies that want it all",
    price: 6999,
    annual: 5599,
    features: [
      "Everything in Growth",
      "Custom web application",
      "Motion graphics & video editing",
      "Full SEO strategy + content plan",
      "Google Ads + Meta Ads management",
      "Email marketing automation",
      "Monthly performance reports",
      "Unlimited revisions",
      "Dedicated project manager",
      "Delivery in 8 weeks",
    ],
    cta: "Go premium",
    popular: false,
  },
  {
    name: "Enterprise",
    tagline: "For teams that need a studio on retainer",
    price: null,
    annual: null,
    features: [
      "Everything in Premium",
      "Dedicated design & dev team",
      "White-label deliverables",
      "Custom SLA & uptime guarantee",
      "Quarterly strategy reviews",
      "Priority 2-hour response",
      "Custom integrations & API work",
      "On-site workshops available",
      "Flexible contract terms",
    ],
    cta: "Talk to us",
    popular: false,
  },
];

export default function PricingPackages() {
  const rootRef = useRef<HTMLElement>(null);
  const [annual, setAnnual] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      gsap.set("[data-pp-card], [data-pp-head], [data-pp-toggle]", {
        opacity: 1,
        y: 0,
        clearProps: "filter,clipPath",
      });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to("[data-pp-head]", {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1,
        ease: "power4.out",
        scrollTrigger: { trigger: "[data-pp-head]", start: "top 90%" },
      });

      gsap.to("[data-pp-toggle]", {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-pp-toggle]", start: "top 95%" },
      });

      gsap.utils.toArray<HTMLElement>("[data-pp-card]").forEach((card) => {
        gsap.to(card, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          overwrite: "auto",
          scrollTrigger: { trigger: card, start: "top 95%", once: true },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  // Cursor spotlight on cards
  useEffect(() => {
    if (isCoarsePointer() || prefersReducedMotion()) return;

    const cards = document.querySelectorAll<HTMLElement>("[data-pp-card]");
    const handlers: Array<() => void> = [];

    cards.forEach((card) => {
      const onMove = (e: MouseEvent) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      };
      card.addEventListener("mousemove", onMove);
      handlers.push(() => card.removeEventListener("mousemove", onMove));
    });

    return () => handlers.forEach((h) => h());
  }, []);

  return (
    <section
      id="plans"
      ref={rootRef}
      className="relative bg-[#050505] text-white pt-32 md:pt-40 pb-28 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] rounded-full bg-[#CCFF00]/[0.015] blur-[160px] pointer-events-none" />
      <div className="absolute bottom-40 right-[10%] w-[400px] h-[400px] rounded-full bg-violet-500/[0.02] blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2.5 mb-8">
            <span className="relative w-2.5 h-2.5 rounded-full bg-[#CCFF00]">
              <span className="absolute inset-0 rounded-full bg-[#CCFF00] animate-ping opacity-40" />
            </span>
            <span className="text-sm text-gray-400 tracking-widest uppercase font-medium">
              Packages
            </span>
          </div>

          <h2
            data-pp-head
            className="text-4xl sm:text-5xl md:text-[3.5rem] font-bold tracking-tight leading-[1.05] italic mb-5"
            style={{
              opacity: 0,
              transform: "translateY(40px)",
              filter: "blur(10px)",
            }}
          >
            <span className="bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
              One price.
            </span>{" "}
            <span className="bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
              Everything inside.
            </span>
          </h2>
          <p className="text-sm text-gray-400 leading-relaxed max-w-md mx-auto mb-10">
            Every plan includes strategy, design, and build. Pick the scope
            that matches your stage.
          </p>

          {/* Billing toggle */}
          <div
            data-pp-toggle
            className="inline-flex items-center gap-4 bg-white/[0.04] border border-white/[0.1] rounded-full px-2 py-1.5 backdrop-blur-md"
            style={{ opacity: 0, transform: "translateY(20px)" }}
          >
            <button
              onClick={() => setAnnual(false)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                !annual
                  ? "bg-[#CCFF00] text-black shadow-[0_0_20px_rgba(204,255,0,0.2)]"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                annual
                  ? "bg-[#CCFF00] text-black shadow-[0_0_20px_rgba(204,255,0,0.2)]"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Annual
              <span
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                  annual
                    ? "bg-black/20 text-black"
                    : "bg-[#CCFF00]/20 text-[#CCFF00]"
                }`}
              >
                SAVE 20%
              </span>
            </button>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {plans.map((plan) => (
            <div
              key={plan.name}
              data-pp-card
              className={`group relative rounded-3xl overflow-hidden backdrop-blur-xl transition-all duration-500 hover:shadow-[0_8px_60px_rgba(204,255,0,0.06),inset_0_1px_0_rgba(255,255,255,0.1)] ${
                plan.popular
                  ? "border-[#CCFF00]/30 bg-gradient-to-b from-[#CCFF00]/[0.08] to-white/[0.02]"
                  : "bg-gradient-to-b from-white/[0.06] to-white/[0.02]"
              }`}
              style={{
                opacity: 0,
                transform: "translateY(50px)",
                border: plan.popular
                  ? "1px solid rgba(204,255,0,0.3)"
                  : "1px solid rgba(255,255,255,0.1)",
                boxShadow: plan.popular
                  ? "0 0 80px rgba(204,255,0,0.08), inset 0 1px 0 rgba(255,255,255,0.1)"
                  : "inset 0 1px 0 rgba(255,255,255,0.06)",
                ["--mx" as string]: "50%",
                ["--my" as string]: "50%",
              }}
            >
              {/* Cursor spotlight */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(280px circle at var(--mx) var(--my), rgba(204,255,0,0.06), transparent 70%)",
                }}
              />

              {/* Top shimmer */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px"
                style={{
                  background: plan.popular
                    ? "linear-gradient(90deg, transparent, rgba(204,255,0,0.6), transparent)"
                    : "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                }}
              />

              {/* Popular glow */}
              {plan.popular && (
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-56 h-56 rounded-full bg-[#CCFF00]/[0.08] blur-[90px] pointer-events-none" />
              )}

              <div className="relative p-8 flex flex-col h-full">
                {/* Popular badge — fixed-height wrapper so all cards align */}
                <div className="h-8 mb-4 flex items-center">
                  {plan.popular && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#CCFF00]/[0.15] border border-[#CCFF00]/30">
                      <Sparkles className="w-3 h-3 text-[#CCFF00]" />
                      <span className="text-[10px] font-bold tracking-widest uppercase text-[#CCFF00]">
                        Most popular
                      </span>
                    </div>
                  )}
                </div>

                <h3 className="text-xl font-semibold mb-1 group-hover:text-[#CCFF00] transition-colors duration-300">
                  {plan.name}
                </h3>
                <p className="text-xs text-gray-500 mb-6">{plan.tagline}</p>

                {/* Price */}
                <div className="mb-8 min-h-[80px]">
                  {plan.price !== null ? (
                    <>
                      <div className="flex items-baseline gap-1">
                        <span className="text-[11px] text-gray-500 self-start mt-2">
                          $
                        </span>
                        <span className="text-5xl font-bold tabular-nums tracking-tight">
                          {annual ? plan.annual?.toLocaleString() : plan.price.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        per month · billed {annual ? "annually" : "monthly"}
                      </p>
                    </>
                  ) : (
                    <>
                      <span className="text-4xl font-bold tracking-tight">
                        Custom
                      </span>
                      <p className="text-xs text-gray-500 mt-1">
                        Tailored to your needs
                      </p>
                    </>
                  )}
                </div>

                {/* CTA button */}
                <button
                  className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 mb-8 ${
                    plan.popular
                      ? "bg-[#CCFF00] hover:bg-[#b8e600] text-black shadow-[0_0_30px_rgba(204,255,0,0.2)]"
                      : "bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.12] text-white"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Divider */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent mb-6" />

                {/* Features list */}
                <ul className="space-y-3 mt-auto">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                          plan.popular
                            ? "bg-[#CCFF00]/[0.15] border border-[#CCFF00]/30"
                            : "bg-white/[0.06] border border-white/[0.1]"
                        }`}
                      >
                        <Check
                          className={`w-3 h-3 ${
                            plan.popular ? "text-[#CCFF00]" : "text-gray-400"
                          }`}
                        />
                      </span>
                      <span className="text-gray-400 leading-snug">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
