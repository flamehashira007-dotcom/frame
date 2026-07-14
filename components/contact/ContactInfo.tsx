"use client";

import { useEffect, useRef } from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const channels = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@ezando.studio",
    href: "mailto:hello@ezando.studio",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 98765 43210",
    href: "tel:+919876543210",
  },
  {
    icon: MapPin,
    label: "Studio",
    value: "Ahmedabad, Gujarat, India",
    href: undefined,
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon – Fri, 10am – 7pm IST",
    href: undefined,
  },
];

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" rx="5.5" />
      <circle cx="12" cy="12" r="4.6" />
      <circle cx="17.8" cy="6.2" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.86 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.11 20.45H3.56V9h3.55v11.45z" />
    </svg>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.9 3H22l-7.19 8.21L23.25 21H16.6l-5.2-6.65L5.4 21H2.28l7.7-8.8L1.5 3h6.8l4.7 6.1L18.9 3zm-1.16 16.17h1.73L7.35 4.73H5.5l12.24 14.44z" />
    </svg>
  );
}

const socials = [
  { icon: InstagramIcon, href: "#", label: "Instagram" },
  { icon: LinkedinIcon, href: "#", label: "LinkedIn" },
  { icon: XIcon, href: "#", label: "Twitter / X" },
];

export default function ContactInfo() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      gsap.set("[data-ci-card]", { opacity: 1, y: 0 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.to("[data-ci-card]", {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power4.out",
        scrollTrigger: {
          trigger: "[data-ci-card]",
          start: "top 88%",
          once: true,
        },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="h-full">
      <div
        data-ci-card
        style={{ opacity: 0, transform: "translateY(40px)" }}
        className="h-full flex flex-col justify-between rounded-3xl border border-white/[0.12] bg-gradient-to-b from-white/[0.08] to-white/[0.03] backdrop-blur-xl overflow-hidden relative"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-violet-500/[0.06] blur-[80px] pointer-events-none" />

        <div>
          {/* Direct */}
          <div className="p-7 relative">
            <p className="text-xs tracking-widest uppercase text-gray-500 font-medium mb-5">
              Direct
            </p>
            <ul className="space-y-4">
              {channels.map((c) => {
                const Icon = c.icon;
                const body = (
                  <div className="flex items-center gap-4 group">
                    <span className="w-10 h-10 rounded-xl bg-[#CCFF00]/[0.1] border border-[#CCFF00]/25 flex items-center justify-center shrink-0">
                      <Icon className="w-[17px] h-[17px] text-[#CCFF00]" />
                    </span>
                    <div>
                      <p className="text-[11px] text-gray-500 uppercase tracking-wide">
                        {c.label}
                      </p>
                      <p className="text-sm text-white group-hover:text-[#CCFF00] transition-colors duration-200">
                        {c.value}
                      </p>
                    </div>
                  </div>
                );
                return (
                  <li key={c.label}>
                    {c.href ? <a href={c.href}>{body}</a> : body}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="h-px w-full bg-white/[0.08]" />

          {/* Follow along */}
          <div className="p-7 relative">
            <p className="text-xs tracking-widest uppercase text-gray-500 font-medium mb-5">
              Follow along
            </p>
            <div className="flex gap-3">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="w-11 h-11 rounded-full bg-white/[0.05] border border-white/[0.12] flex items-center justify-center text-gray-400 hover:text-[#CCFF00] hover:border-[#CCFF00]/40 transition-colors duration-200"
                  >
                    <Icon className="w-[18px] h-[18px]" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Book a call — anchored to bottom, no dead gap above it */}
        <div className="p-7 border-t border-[#CCFF00]/20 bg-[#CCFF00]/[0.05] relative">
          <p className="text-sm text-white leading-relaxed">
            Prefer a call over a form? Book a slot directly and skip the
            back-and-forth.
          </p>
          <a
            href="/contact#book"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#CCFF00] hover:gap-3 transition-all duration-200"
          >
            Book a call →
          </a>
        </div>
      </div>
    </div>
  );
}
