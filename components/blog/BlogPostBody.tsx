"use client";

import { useEffect, useRef } from "react";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { portableTextComponents } from "@/sanity/lib/portableTextComponents";

type Author = {
  name: string;
  role?: string;
  bio?: string;
  image?: unknown;
  twitter?: string;
  linkedin?: string;
};

type BlogPostBodyProps = {
  body: PortableTextBlock[];
  author: Author;
};

export default function BlogPostBody({ body, author }: BlogPostBodyProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-bp-block]").forEach((el) => {
        gsap.from(el, {
          y: 20, opacity: 0, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 95%" },
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="relative bg-[#050505] text-white px-4 sm:px-6 md:px-12 lg:px-20 pb-16 md:pb-20">
      <div className="max-w-3xl mx-auto">
        <div data-bp-block>
          <PortableText value={body} components={portableTextComponents} />
        </div>

        {author?.bio && (
          <div className="mt-12 md:mt-16 rounded-3xl border border-white/10 bg-white/3 p-5 md:p-7 backdrop-blur-xl">
            <p className="text-xs tracking-widest uppercase text-gray-500 font-medium mb-3">
              Written by
            </p>
            <p className="text-lg font-semibold text-white mb-1">{author.name}</p>
            {author.role && <p className="text-sm text-gray-500 mb-3">{author.role}</p>}
            <p className="text-sm text-gray-400 leading-relaxed">{author.bio}</p>
          </div>
        )}
      </div>
    </div>
  );
}