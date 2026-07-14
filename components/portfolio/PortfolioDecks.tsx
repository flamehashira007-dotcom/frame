"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Download, FileText, TrendingUp, Monitor } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const decks = [
  {
    id: "marketing",
    icon: TrendingUp,
    label: "Marketing",
    title: "Campaigns, channels, and the numbers behind them",
    body:
      "SEO, paid social, Google Ads, email, and content work — with the results attached. Case-by-case, what we changed and what it moved.",
    tags: ["SEO", "Paid Social", "Google Ads", "Email", "Content"],
    accent: "#CCFF00",
    file: "/portfolio/marketing.pdf",
    size: "8.4 MB",
    pages: "24 pages",
  },
  {
    id: "web-design",
    icon: Monitor,
    label: "Web & Design",
    title: "Brands, interfaces, and the sites they ship into",
    body:
      "Identity systems, product UI, and marketing sites. Art direction through to production build — including the ones that were hard.",
    tags: ["Branding", "UI/UX", "Web Design", "Development"],
    accent: "#a78bfa",
    file: "/portfolio/web-design.pdf",
    size: "12.1 MB",
    pages: "32 pages",
  },
];

export default function PortfolioDecks() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      gsap.set("[data-pd-card]", { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-pd-card]").forEach((card) => {
        gsap.to(card, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          overwrite: "auto",
          scrollTrigger: { trigger: card, start: "top 92%", once: true },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative bg-[#050505] text-white pt-16 pb-32 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      <div className="absolute bottom-0 right-[15%] w-[500px] h-[500px] rounded-full bg-violet-500/[0.02] blur-[150px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
          {decks.map((d) => {
            const Icon = d.icon;

            return (
              <div
                key={d.id}
                data-pd-card
                className="group relative rounded-3xl p-8 md:p-10 overflow-hidden backdrop-blur-xl flex flex-col transition-shadow duration-500"
                style={{
                  opacity: 0,
                  transform: "translateY(40px)",
                  boxShadow: "0 0 0 1px rgba(255,255,255,0.10)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 0 1px ${d.accent}40, 0 16px 70px ${d.accent}12, inset 0 1px 0 rgba(255,255,255,0.12)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 0 1px rgba(255,255,255,0.10)";
                }}
              >
                {/* Glass wash */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `linear-gradient(150deg, ${d.accent}0d 0%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.025) 100%)`,
                  }}
                />
                {/* Top shimmer */}
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px pointer-events-none"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${d.accent}60, transparent)`,
                  }}
                />
                {/* Corner glow */}
                <div
                  className="absolute -top-24 -right-20 w-56 h-56 rounded-full blur-[90px] pointer-events-none opacity-30 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ background: `${d.accent}18` }}
                />

                <div className="relative flex flex-col flex-1">
                  {/* Icon + label */}
                  <div className="flex items-center justify-between mb-7">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{
                        background: `${d.accent}1c`,
                        border: `1px solid ${d.accent}40`,
                      }}
                    >
                      <Icon className="w-5 h-5" style={{ color: d.accent }} />
                    </div>

                    <span
                      className="text-[11px] tracking-wider uppercase font-medium px-3 py-1.5 rounded-full backdrop-blur-md"
                      style={{
                        background: `${d.accent}12`,
                        border: `1px solid ${d.accent}28`,
                        color: d.accent,
                      }}
                    >
                      {d.label}
                    </span>
                  </div>

                  {/* Title — fixed height so both cards line up */}
                  <h2
                    className="text-2xl font-semibold tracking-tight leading-snug mb-3 text-white transition-colors duration-300 group-hover:text-[color:var(--pd-accent)] md:min-h-[4rem]"
                    style={{ ["--pd-accent" as string]: d.accent }}
                  >
                    {d.title}
                  </h2>

                  {/* Body — fixed height */}
                  <p className="text-sm text-gray-400 leading-relaxed mb-7 md:min-h-[5rem]">
                    {d.body}
                  </p>

                  {/* Tags — fixed height, top-aligned */}
                  <div className="flex flex-wrap content-start gap-2 mb-8 md:min-h-[4.5rem]">
                    {d.tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-3.5 py-1.5 rounded-full text-gray-400 bg-white/[0.04] border border-white/[0.09] h-fit"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* File meta — pinned to bottom */}
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-7 mt-auto pt-6 border-t border-white/[0.07]">
                    <span className="flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5" />
                      PDF
                    </span>
                    <span className="w-1 h-1 rounded-full bg-gray-700" />
                    <span>{d.pages}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-700" />
                    <span>{d.size}</span>
                  </div>

                  {/* Download */}
                  <a
                    href={d.file}
                    download
                    className="group/btn flex items-center justify-center gap-3 px-7 py-4 rounded-full font-semibold text-sm transition-all duration-300 w-full"
                    style={{
                      background: `linear-gradient(135deg, ${d.accent}18, rgba(255,255,255,0.04))`,
                      border: `1px solid ${d.accent}35`,
                      color: "white",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = d.accent;
                      e.currentTarget.style.color = "black";
                      e.currentTarget.style.boxShadow = `0 0 30px ${d.accent}30`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = `linear-gradient(135deg, ${d.accent}18, rgba(255,255,255,0.04))`;
                      e.currentTarget.style.color = "white";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    Download the deck
                    <Download className="w-4 h-4 group-hover/btn:translate-y-0.5 transition-transform" />
                  </a>

                  {/* Secondary link */}
                  <a
                    href={d.file}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-gray-500 hover:text-gray-300 transition-colors text-center mt-4"
                  >
                    or view in browser
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footnote */}
        <p className="text-center text-sm text-gray-500 mt-14">
          Want something specific?{" "}
          <Link href="/contact" className="text-[#CCFF00] hover:underline underline-offset-4">
            Ask us
          </Link>{" "}
          — we&apos;ll send the relevant case study directly.
        </p>
      </div>
    </section>
  );
}