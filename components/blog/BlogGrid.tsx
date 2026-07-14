"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Clock, Search } from "lucide-react";
import type { Image as SanityImage } from "sanity";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { urlFor } from "@/sanity/lib/image";

export type CoverImage = SanityImage & { alt?: string };

export type Post = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  coverImage: CoverImage;
  publishedAt: string;
  readingTime?: number;
  author: { name: string; slug: string; image?: SanityImage };
  categories?: { title: string; slug: string; accent: string }[];
};

export type Category = { title: string; slug: string; accent: string };

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function PostCard({ post, large = false }: { post: Post; large?: boolean }) {
  const accent = post.categories?.[0]?.accent || "#CCFF00";
  return (
    <Link
      href={`/blog/${post.slug}`}
      data-bg-card
      style={{ opacity: 0, transform: "translateY(50px)" }}
      className={`group relative rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 bg-white/3 backdrop-blur-xl transition-all duration-500 hover:border-white/20 hover:shadow-[0_20px_70px_rgba(0,0,0,0.4)] ${
        large ? "md:col-span-2" : ""
      }`}
    >
      <div className={`relative overflow-hidden ${large ? "aspect-16/9" : "aspect-16/9"}`}>
        <Image
          src={urlFor(post.coverImage).width(900).height(large ? 506 : 506).url()}
          alt={post.coverImage?.alt || post.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#050505] via-transparent to-transparent opacity-70" />
        {post.categories?.[0] && (
          <span
            className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full backdrop-blur-md"
            style={{ background: `${accent}22`, border: `1px solid ${accent}55`, color: accent }}
          >
            {post.categories[0].title}
          </span>
        )}
      </div>

      <div className="p-4 md:p-5">
        <div className="flex items-center gap-2.5 text-[11px] text-gray-500 mb-2">
          <span>{formatDate(post.publishedAt)}</span>
          {post.readingTime && (
            <>
              <span className="w-1 h-1 rounded-full bg-gray-600" />
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" /> {post.readingTime} min read
              </span>
            </>
          )}
        </div>
        <h3
          className={`font-semibold tracking-tight text-white group-hover:text-[#CCFF00] transition-colors duration-300 mb-1.5 ${
            large ? "text-xl md:text-2xl" : "text-base md:text-lg"
          }`}
        >
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="text-xs md:text-sm text-gray-400 leading-relaxed line-clamp-2 mb-3">{post.excerpt}</p>
        )}
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-gray-500">{post.author?.name}</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-[#CCFF00] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
        </div>
      </div>
    </Link>
  );
}

export default function BlogGrid({
  posts, categories, featured,
}: { posts: Post[]; categories: Category[]; featured: Post | null }) {
  const rootRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    let result = posts;
    if (active) {
      result = result.filter((p) => p.categories?.some((c) => c.slug === active));
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          (p.excerpt && p.excerpt.toLowerCase().includes(query))
      );
    }
    return result;
  }, [posts, active, searchQuery]);

  useEffect(() => {
    if (prefersReducedMotion()) {
      gsap.set("[data-bg-card]", { opacity: 1, y: 0 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-bg-card]").forEach((card) => {
        gsap.to(card, {
          y: 0, opacity: 1, duration: 0.7, ease: "power3.out", overwrite: "auto",
          scrollTrigger: { trigger: card, start: "top 95%", once: true },
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, [filtered]);

  return (
    <section ref={rootRef} className="relative bg-[#050505] text-white pb-20 md:pb-28 px-4 sm:px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/4 border border-white/12 rounded-full pl-12 pr-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-[#CCFF00]/50 transition-colors"
            />
          </div>
        </div>
        
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setActive(null)}
            className={`px-3.5 py-1.5 rounded-full text-[11px] font-medium border transition-all duration-300 ${
              !active
                ? "bg-[#CCFF00] text-black border-[#CCFF00]"
                : "bg-white/4 text-gray-400 border-white/12 hover:border-white/25 hover:text-white"
            }`}
          >
            All posts
          </button>
          {categories.map((c) => (
            <button
              key={c.slug}
              onClick={() => setActive(c.slug === active ? null : c.slug)}
              className={`px-3.5 py-1.5 rounded-full text-[11px] font-medium border transition-all duration-300 ${
                active === c.slug
                  ? "text-black border-transparent"
                  : "bg-white/4 text-gray-400 border-white/12 hover:border-white/25 hover:text-white"
              }`}
              style={active === c.slug ? { background: c.accent } : undefined}
            >
              {c.title}
            </button>
          ))}
        </div>

        {/* Featured */}
        {featured && !active && !searchQuery && (
          <div className="mb-5">
            <PostCard post={featured} large />
          </div>
        )}

        {/* Grid */}
        {filtered.length === 0 ? (
          <p className="text-gray-500 text-sm py-16 md:py-20 text-center">
            No posts found — try another search or category.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filtered
              .filter((p) => !(featured && !active && !searchQuery && p._id === featured._id))
              .map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
          </div>
        )}
      </div>
    </section>
  );
}