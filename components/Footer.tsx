"use client";

import { ArrowUpRight, ArrowUp } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion, isCoarsePointer } from "@/lib/gsap";

const footerCols = [
  {
    title: "Company",
    links: ["About", "Careers", "Studio", "Contact"],
  },
  {
    title: "Services",
    links: ["Branding", "Digital Design", "Web Design", "UI/UX"],
  },
  {
    title: "Resources",
    links: ["Blog", "Case Studies", "Playbook", "Changelog"],
  },
];

const socials = [
  { label: "Twitter / X", path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
  { label: "Dribbble", path: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.424 25.424 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.245.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" },
  { label: "LinkedIn", path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = footerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Giant wordmark — masked reveal from bottom, scrubbed
      gsap.from("[data-foot-mark]", {
        yPercent: 30,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-foot-mark]",
          start: "top 95%",
          end: "top 55%",
          scrub: true,
        },
      });

      // Columns stagger up
      gsap.from("[data-foot-col]", {
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-foot-top]", start: "top 85%" },
      });

      // Link hover underline is CSS; social icons pop in
      gsap.from("[data-foot-social]", {
        scale: 0.5,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: "back.out(2)",
        scrollTrigger: { trigger: "[data-foot-socials]", start: "top 90%" },
      });

      // Bottom bar fade
      gsap.from("[data-foot-bottom]", {
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: { trigger: "[data-foot-bottom]", start: "top 95%" },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  // Magnetic scroll-to-top button
  const topRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const btn = topRef.current;
    if (!btn || isCoarsePointer()) return;
    const xTo = gsap.quickTo(btn, "x", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(btn, "y", { duration: 0.5, ease: "power3" });
    const onMove = (e: MouseEvent) => {
      const r = btn.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * 0.4);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.4);
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

  const scrollTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      ref={footerRef}
      className="relative bg-[#050505] text-white pt-24 px-6 md:px-12 lg:px-20 overflow-hidden border-t border-white/[0.06]"
    >
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] rounded-full bg-[#CCFF00]/[0.02] blur-[160px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* ── Top: brand + columns ── */}
        <div data-foot-top className="flex flex-col lg:flex-row lg:justify-between gap-14 mb-20">
          {/* Brand block */}
          <div data-foot-col className="max-w-sm">
            <div className="flex items-center gap-3 mb-6">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <rect x="14" y="2" width="8" height="12" rx="2" fill="#CCFF00" />
                <rect x="2" y="14" width="12" height="8" rx="2" fill="#CCFF00" />
                <rect x="22" y="14" width="12" height="8" rx="2" fill="#CCFF00" />
                <rect x="14" y="22" width="8" height="12" rx="2" fill="#CCFF00" />
              </svg>
              <span className="text-xl font-semibold tracking-tight">Ezando®</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed mb-8">
              A creative studio crafting bold, thoughtful digital experiences
              for teams who care about the details.
            </p>

            {/* Newsletter mini-form */}
            <div className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.1] rounded-full p-1.5 max-w-xs">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-transparent px-4 py-2 text-sm outline-none placeholder:text-gray-600 text-white"
              />
              <button className="bg-[#CCFF00] hover:bg-[#b8e600] text-black w-9 h-9 rounded-full flex items-center justify-center transition-colors shrink-0">
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 lg:gap-16">
            {footerCols.map((col) => (
              <div key={col.title} data-foot-col>
                <h4 className="text-sm font-semibold text-white mb-5 tracking-wide">
                  {col.title}
                </h4>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="group/link inline-flex items-center gap-1 text-sm text-gray-500 hover:text-[#CCFF00] transition-colors duration-300"
                      >
                        <span className="relative">
                          {link}
                          <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#CCFF00] group-hover/link:w-full transition-all duration-300" />
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── Socials + scroll top ── */}
        <div className="flex items-center justify-between mb-12">
          <div data-foot-socials className="flex items-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href="#"
                data-foot-social
                aria-label={s.label}
                className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-gray-500 hover:text-[#CCFF00] hover:border-[#CCFF00]/40 hover:bg-[#CCFF00]/[0.06] transition-all duration-300"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>

          <button
            ref={topRef}
            onClick={scrollTop}
            className="group/top flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors"
          >
            Back to top
            <span className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center group-hover/top:border-[#CCFF00]/40 group-hover/top:bg-[#CCFF00]/[0.06] transition-all duration-300">
              <ArrowUp className="w-4 h-4 group-hover/top:-translate-y-0.5 transition-transform" />
            </span>
          </button>
        </div>

        {/* ── Giant wordmark ── */}
        <div className="relative overflow-hidden">
          <h2
            data-foot-mark
            className="text-[13vw] leading-[0.8] font-bold tracking-tighter text-center whitespace-nowrap bg-gradient-to-b from-white/[0.5] to-white/[0.06] bg-clip-text text-transparent select-none pointer-events-none"
          >
            Frameonix
          </h2>
        </div>

        {/* ── Bottom bar ── */}
        <div
          data-foot-bottom
          className="flex flex-col sm:flex-row items-center justify-between gap-4 py-8 border-t border-white/[0.06] text-xs text-gray-600"
        >
          <span>© {new Date().getFullYear()} Ezando® Studio. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-gray-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}