"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const projects = [
  {
    number: "01",
    title: "Neon Frame System.",
    year: "2025",
    image: "/project-neonframe.png",
    span: "large", // col-span-2 on md+
  },
  {
    number: "02",
    title: "Music OS AI.",
    year: "2024",
    image: "/project-musicos.png",
    span: "small",
  },
  {
    number: "03",
    title: "Botly® Port App.",
    year: "2022",
    image: "/project-botly.png",
    span: "third",
  },
  {
    number: "04",
    title: "Curea Studio",
    year: "2020",
    image: "/project-curea.png",
    span: "third",
  },
  {
    number: "05",
    title: "Sos Core Identity App.",
    year: "2024",
    image: "/project-sosapp.png",
    span: "third",
  },
];

/* ── Reveal-on-scroll wrapper ── */
function RevealCard({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function ProjectShowcase() {
  return (
    <section className="relative bg-[#050505] text-white pt-32 md:pt-40 pb-28 px-6 md:px-12 lg:px-20 overflow-hidden">
      {/* Decorative blurs */}
      <div className="absolute top-32 right-0 w-[500px] h-[500px] rounded-full bg-violet-500/[0.02] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] rounded-full bg-[#CCFF00]/[0.01] blur-[160px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* ── Header ── */}
        <div className="mb-16">
          <div className="flex items-center gap-2.5 mb-8">
            <span className="relative w-2.5 h-2.5 rounded-full bg-[#CCFF00]">
              <span className="absolute inset-0 rounded-full bg-[#CCFF00] animate-ping opacity-40" />
            </span>
            <span className="text-sm text-gray-400 tracking-widest uppercase font-medium">
              Project showcase
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1]">
                Selected Work.
                <sup className="text-lg sm:text-xl font-normal text-gray-500 ml-2 align-top">
                  ({projects.length})
                </sup>
              </h2>
            </div>

            <div className="flex items-end justify-between lg:flex-col lg:items-end gap-4">
              <p className="text-sm sm:text-base text-gray-500 max-w-sm leading-relaxed">
                We&apos;ve helped businesses across industries achieve their
                goals. Here are some of our recent projects.
              </p>
              <span className="text-xs text-gray-600 tracking-wider font-mono whitespace-nowrap">
                16-25®
              </span>
            </div>
          </div>
        </div>

        {/* ── Project Grid — Row 1 (2 cards: 60/40 split) ── */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-5 mb-5">
          {/* Large card */}
          <RevealCard delay={0} className="md:col-span-3 h-full">
            <ProjectCard project={projects[0]} stretch />
          </RevealCard>

          {/* Smaller card */}
          <RevealCard delay={120} className="md:col-span-2 h-full">
            <ProjectCard project={projects[1]} stretch />
          </RevealCard>
        </div>

        {/* ── Project Grid — Row 2 (3 equal cards) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {projects.slice(2).map((project, i) => (
            <RevealCard key={project.number} delay={i * 120}>
              <ProjectCard project={project} aspectRatio="aspect-[4/3]" />
            </RevealCard>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Individual Project Card ── */
function ProjectCard({
  project,
  aspectRatio,
  stretch,
}: {
  project: (typeof projects)[number];
  aspectRatio?: string;
  stretch?: boolean;
}) {
  return (
    <div className={`group relative ${stretch ? "h-full" : ""}`}>
      {/* Image container with glass frame */}
      <div
        className={`relative ${stretch ? "h-full min-h-[360px]" : aspectRatio || "aspect-[4/3]"} rounded-3xl overflow-hidden bg-gradient-to-b from-white/[0.05] to-white/[0.01] border border-white/[0.07] backdrop-blur-xl hover:border-white/[0.16] transition-all duration-500 hover:shadow-[0_16px_70px_rgba(204,255,0,0.04),inset_0_1px_0_rgba(255,255,255,0.08)]`}
      >
        {/* Shimmer highlight */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />

        {/* Hover glow */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-60 h-60 rounded-full bg-[#CCFF00]/[0.03] blur-[80px] group-hover:bg-[#CCFF00]/[0.07] transition-all duration-700 pointer-events-none z-10" />

        {/* Image */}
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Hover overlay — project number */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-10">
          <span className="text-7xl font-bold text-white/10">{project.number}</span>
        </div>
      </div>

      {/* Info bar */}
      <div className="flex items-center justify-between mt-4 px-1">
        <div className="flex items-baseline gap-3">
          <span className="text-xs text-gray-600 font-mono">{project.number}.</span>
          <h3 className="text-base sm:text-lg font-semibold tracking-tight group-hover:text-[#CCFF00] transition-colors duration-300">
            {project.title}
          </h3>
        </div>
        <span className="text-sm text-gray-600 font-mono">{project.year}</span>
      </div>
    </div>
  );
}
