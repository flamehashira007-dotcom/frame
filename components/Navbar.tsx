"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "@/lib/gsap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const onScroll = () => {
      const scrolled = window.scrollY > 40;
      gsap.to(nav, {
        backgroundColor: scrolled ? "rgba(10,10,10,0.55)" : "rgba(10,10,10,0)",
        backdropFilter: scrolled ? "blur(16px)" : "blur(0px)",
        borderColor: scrolled ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0)",
        paddingTop: scrolled ? 12 : 24,
        paddingBottom: scrolled ? 12 : 24,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const ctx = gsap.context(() => {
      gsap.from(nav, { y: -90, opacity: 0, duration: 1, ease: "power3.out" });
    }, navRef);

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 border-b"
      style={{ borderColor: "rgba(255,255,255,0)" }}
    >
      <div className="flex items-center justify-between px-6 py-6 max-w-7xl mx-auto w-full">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0" aria-label="Ezando home">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <rect x="14" y="2" width="8" height="12" rx="2" fill="#CCFF00" />
            <rect x="2" y="14" width="12" height="8" rx="2" fill="#CCFF00" />
            <rect x="22" y="14" width="12" height="8" rx="2" fill="#CCFF00" />
            <rect x="14" y="22" width="8" height="12" rx="2" fill="#CCFF00" />
          </svg>
        </Link>

        {/* Links - Desktop */}
        <div className="hidden md:flex items-center gap-1 bg-white/[0.04] backdrop-blur-md rounded-full px-2 py-1.5 border border-white/[0.1]">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`relative px-4 py-2 text-sm rounded-full transition-colors ${
                  active
                    ? "text-[#CCFF00] bg-[#CCFF00]/[0.08]"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* CTA + Hamburger - Mobile */}
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden md:flex shrink-0 px-6 py-2.5 text-sm font-semibold bg-[#CCFF00] hover:bg-[#b8e600] text-black rounded-full transition-colors shadow-[0_0_30px_rgba(204,255,0,0.2)]"
          >
            Book a Call
          </Link>
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-white/[0.04] border border-white/[0.1]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#050505]/95 backdrop-blur-xl border-t border-white/[0.06] px-6 py-6">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`px-4 py-3 text-base rounded-xl transition-colors ${
                    active
                      ? "text-[#CCFF00] bg-[#CCFF00]/[0.08]"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/contact"
              className="mt-4 px-6 py-3 text-center text-sm font-semibold bg-[#CCFF00] hover:bg-[#b8e600] text-black rounded-full transition-colors shadow-[0_0_30px_rgba(204,255,0,0.2)]"
            >
              Book a Call
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}