"use client";

import { Fragment, useEffect, useRef } from "react";
import { Check, Minus } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const categories = [
  {
    label: "Design & Branding",
    features: [
      { name: "Brand identity design", starter: true, growth: true, premium: true, enterprise: true },
      { name: "Logo & brand guidelines", starter: true, growth: true, premium: true, enterprise: true },
      { name: "UI/UX design system", starter: false, growth: true, premium: true, enterprise: true },
      { name: "Custom illustrations", starter: false, growth: false, premium: true, enterprise: true },
      { name: "Motion graphics", starter: false, growth: false, premium: true, enterprise: true },
    ],
  },
  {
    label: "Web & Development",
    features: [
      { name: "Landing page", starter: "1 page", growth: "Up to 8", premium: "Unlimited", enterprise: "Unlimited" },
      { name: "Custom web application", starter: false, growth: false, premium: true, enterprise: true },
      { name: "CMS integration", starter: false, growth: true, premium: true, enterprise: true },
      { name: "API & integrations", starter: false, growth: false, premium: false, enterprise: true },
      { name: "Performance optimization", starter: false, growth: true, premium: true, enterprise: true },
    ],
  },
  {
    label: "Marketing & Growth",
    features: [
      { name: "SEO setup", starter: "Basic", growth: "Advanced", premium: "Full strategy", enterprise: "Full strategy" },
      { name: "Google Ads management", starter: false, growth: "30 days", premium: "Ongoing", enterprise: "Ongoing" },
      { name: "Meta Ads management", starter: false, growth: false, premium: "Ongoing", enterprise: "Ongoing" },
      { name: "Email marketing", starter: false, growth: false, premium: true, enterprise: true },
      { name: "Content strategy", starter: false, growth: false, premium: true, enterprise: true },
      { name: "Social media templates", starter: "5", growth: "15", premium: "Unlimited", enterprise: "Unlimited" },
    ],
  },
  {
    label: "Support & Delivery",
    features: [
      { name: "Revision rounds", starter: "1", growth: "2", premium: "Unlimited", enterprise: "Unlimited" },
      { name: "Delivery timeline", starter: "3 weeks", growth: "5 weeks", premium: "8 weeks", enterprise: "Custom" },
      { name: "Dedicated project manager", starter: false, growth: false, premium: true, enterprise: true },
      { name: "Priority support", starter: false, growth: "Slack", premium: "Slack + call", enterprise: "2-hr SLA" },
      { name: "Post-launch bug support", starter: "7 days", growth: "30 days", premium: "60 days", enterprise: "Custom" },
      { name: "Quarterly strategy reviews", starter: false, growth: false, premium: false, enterprise: true },
    ],
  },
];

const planNames = ["Starter", "Growth", "Premium", "Enterprise"] as const;

function Cell({ value }: { value: boolean | string }) {
  if (value === true)
    return (
      <span className="w-6 h-6 rounded-full bg-[#CCFF00]/[0.15] border border-[#CCFF00]/30 flex items-center justify-center mx-auto">
        <Check className="w-3.5 h-3.5 text-[#CCFF00]" />
      </span>
    );
  if (value === false)
    return (
      <span className="w-6 h-6 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mx-auto">
        <Minus className="w-3 h-3 text-gray-600" />
      </span>
    );
  return (
    <span className="text-sm text-gray-300 font-medium">{value}</span>
  );
}

export default function PricingCompare() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      gsap.set("[data-pc-head], [data-pc-table]", {
        opacity: 1,
        y: 0,
        clearProps: "filter",
      });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to("[data-pc-head]", {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1,
        ease: "power4.out",
        scrollTrigger: { trigger: "[data-pc-head]", start: "top 90%" },
      });

      gsap.to("[data-pc-table]", {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-pc-table]", start: "top 90%" },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="compare"
      ref={rootRef}
      className="relative bg-[#050505] text-white pt-32 md:pt-40 pb-28 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      <div className="absolute top-20 right-1/4 w-[500px] h-[500px] rounded-full bg-[#CCFF00]/[0.02] blur-[160px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-10 mb-14">
          <div className="flex items-center gap-2.5 lg:pt-4">
            <span className="relative w-2.5 h-2.5 rounded-full bg-[#CCFF00]">
              <span className="absolute inset-0 rounded-full bg-[#CCFF00] animate-ping opacity-40" />
            </span>
            <span className="text-sm text-gray-400 tracking-widest uppercase font-medium">
              Compare
            </span>
          </div>

          <div className="max-w-xl">
            <h2
              data-pc-head
              className="text-4xl sm:text-5xl md:text-[3.5rem] font-bold tracking-tight leading-[1.05] italic mb-5"
              style={{
                opacity: 0,
                transform: "translateY(40px)",
                filter: "blur(10px)",
              }}
            >
              <span className="bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
                Side by side,
              </span>
              <br />
              <span className="bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
                no surprises.
              </span>
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed max-w-md">
              Every feature, every plan. Find exactly what&apos;s included so you
              can choose with confidence.
            </p>
          </div>
        </div>

        {/* Table */}
        <div
          data-pc-table
          className="rounded-3xl overflow-hidden border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-transparent backdrop-blur-xl"
          style={{
            opacity: 0,
            transform: "translateY(40px)",
            boxShadow:
              "0 40px 120px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              {/* Plan names header */}
              <thead>
                <tr className="border-b border-white/[0.08]">
                  <th className="text-left p-6 text-sm font-normal text-gray-500 w-[280px]">
                    Features
                  </th>
                  {planNames.map((name, i) => (
                    <th key={name} className="p-6 text-center">
                      <span
                        className={`text-base font-semibold ${
                          i === 1 ? "text-[#CCFF00]" : "text-white"
                        }`}
                      >
                        {name}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {categories.map((cat) => (
                  <Fragment key={cat.label}>
                    {/* Category header */}
                    <tr key={cat.label}>
                      <td
                        colSpan={5}
                        className="px-6 pt-8 pb-3 text-xs font-bold tracking-widest uppercase text-[#CCFF00]/70"
                      >
                        {cat.label}
                      </td>
                    </tr>

                    {/* Feature rows */}
                    {cat.features.map((feature) => (
                      <tr
                        key={feature.name}
                        className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
                      >
                        <td className="px-6 py-4 text-sm text-gray-400">
                          {feature.name}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <Cell value={feature.starter} />
                        </td>
                        <td className="px-6 py-4 text-center">
                          <Cell value={feature.growth} />
                        </td>
                        <td className="px-6 py-4 text-center">
                          <Cell value={feature.premium} />
                        </td>
                        <td className="px-6 py-4 text-center">
                          <Cell value={feature.enterprise} />
                        </td>
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
