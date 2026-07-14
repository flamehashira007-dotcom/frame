"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { urlFor } from "@/sanity/lib/image";

type RelatedPost = {
  _id: string;
  title: string;
  slug: string;
  coverImage: {
    alt?: string;
    asset?: { _ref: string; _type: string };
    [key: string]: unknown;
  };
};

export default function RelatedPosts({ posts }: { posts: RelatedPost[] }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      gsap.set("[data-rp-card]", { opacity: 1, y: 0 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-rp-card]").forEach((card) => {
        gsap.to(card, {
          y: 0, opacity: 1, duration: 0.7, ease: "power3.out", overwrite: "auto",
          scrollTrigger: { trigger: card, start: "top 92%", once: true },
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative bg-[#050505] text-white pb-20 md:pb-28 px-4 sm:px-6 md:px-12 lg:px-20 border-t border-white/6 pt-12 md:pt-16">
      <div className="max-w-5xl mx-auto">
        <p className="text-[11px] tracking-widest uppercase text-gray-500 font-medium mb-6 md:mb-8">
          Keep reading
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {posts.map((p) => (
            <Link
              key={p._id}
              href={`/blog/${p.slug}`}
              data-rp-card
              style={{ opacity: 0, transform: "translateY(30px)" }}
              className="group rounded-2xl overflow-hidden border border-white/10 bg-white/3 hover:border-white/20 transition-all duration-300"
            >
              <div className="relative aspect-16/9 overflow-hidden">
                <Image
                  src={urlFor(p.coverImage).width(500).height(281).url()}
                  alt={p.coverImage?.alt || p.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-3.5 md:p-4">
                <h4 className="text-sm font-semibold text-white group-hover:text-[#CCFF00] transition-colors duration-300 line-clamp-2 mb-1.5">
                  {p.title}
                </h4>
                <span className="flex items-center gap-1 text-xs text-gray-500 group-hover:text-gray-300 transition-colors">
                  Read <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}