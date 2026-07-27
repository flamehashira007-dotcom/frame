"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "@/lib/gsap";
import Image from "next/image";
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
      <div className="flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-[1536px] mx-auto w-full">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3 md:gap-3.5 shrink-0" aria-label="Frameonix home">
          <Image
            src="/Frameonix New Logo.svg"
            alt="Frameonix Logo"
            width={52}
            height={52}
            className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 object-contain"
            priority
          />
          <span className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-white">Frameonix</span>
        </Link>

        {/* Links - Medium & Desktop */}
        <div className="hidden md:flex items-center gap-0.5 lg:gap-1 bg-white/[0.04] backdrop-blur-md rounded-full px-1.5 py-1 lg:px-2 lg:py-1.5 border border-white/[0.1]">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`relative px-2.5 py-1.5 lg:px-4 lg:py-2 text-xs lg:text-sm rounded-full transition-colors whitespace-nowrap ${
                  active
                    ? "text-[#CCFF00] bg-[#CCFF00]/[0.08] font-medium"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* CTA + Hamburger - Mobile & Tablet */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <Link
            href="/contact"
            className="hidden sm:flex shrink-0 px-4 py-2 sm:px-5 sm:py-2 lg:px-6 lg:py-2.5 text-xs sm:text-sm font-semibold bg-[#CCFF00] hover:bg-[#b8e600] text-black rounded-full transition-colors shadow-[0_0_30px_rgba(204,255,0,0.2)]"
          >
            Book a Call
          </Link>
          <button
            className="md:hidden flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/[0.04] border border-white/[0.1] hover:bg-white/10 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#050505]/95 backdrop-blur-2xl border-t border-b border-white/[0.08] px-4 sm:px-6 py-6 shadow-2xl">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`px-4 py-3 text-base rounded-xl transition-colors font-medium ${
                    active
                      ? "text-[#CCFF00] bg-[#CCFF00]/[0.10]"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/contact"
              className="mt-4 px-6 py-3.5 text-center text-sm font-semibold bg-[#CCFF00] hover:bg-[#b8e600] text-black rounded-full transition-colors shadow-[0_0_30px_rgba(204,255,0,0.2)]"
            >
              Book a Call
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}