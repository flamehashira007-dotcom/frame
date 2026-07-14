import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { PortableTextBlock } from "@portabletext/types";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollRefresh from "@/components/ScrollRefresh";
import Footer from "@/components/Footer";
import BlogPostBody from "@/components/blog/BlogPostBody";
import RelatedPosts from "@/components/blog/RelatedPosts";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { postBySlugQuery, relatedPostsQuery, allSlugsQuery } from "@/sanity/lib/queries";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

type Category = {
  _id: string;
  title: string;
  slug: string;
  accent: string;
};

type Author = {
  name: string;
  slug?: string;
  image?: unknown;
  role?: string;
  bio?: string;
  twitter?: string;
  linkedin?: string;
};

type Post = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  body: PortableTextBlock[];
  coverImage: { alt?: string; asset?: { _ref: string; _type: string } };
  publishedAt: string;
  updatedAt?: string;
  readingTime?: number;
  seoTitle?: string;
  seoDescription?: string;
  seoImage?: { alt?: string; asset?: { _ref: string; _type: string } };
  noIndex?: boolean;
  canonicalUrl?: string;
  author: Author;
  categories?: Category[];
};

export async function generateStaticParams() {
  const slugs: { slug: string }[] = await client.fetch(allSlugsQuery);
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post: Post | null = await client.fetch(postBySlugQuery, { slug });
  if (!post) return {};

  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt || "";
  const image = post.seoImage || post.coverImage;
  const imageUrl = image ? urlFor(image).width(1200).height(630).url() : undefined;
  const canonical = post.canonicalUrl || `https://ezando.studio/blog/${post.slug}`;

  return {
    title: `${title} — Ezando® Studio Blog`,
    description,
    alternates: { canonical },
    robots: post.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: [post.author?.name].filter(Boolean),
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630, alt: post.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post: Post | null = await client.fetch(postBySlugQuery, { slug });
  if (!post) notFound();

  const categoryIds = (post.categories || []).map((c) => c._id).filter(Boolean);
  const related = categoryIds.length
    ? await client.fetch(relatedPostsQuery, { slug, categoryIds })
    : [];

  const canonical = post.canonicalUrl || `https://ezando.studio/blog/${post.slug}`;
  const imageUrl = urlFor(post.seoImage || post.coverImage).width(1200).height(630).url();

  // ── Structured data: Article + Breadcrumb ──
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seoDescription || post.excerpt,
    image: [imageUrl],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author?.name,
    },
    publisher: {
      "@type": "Organization",
      name: "Ezando® Studio",
      logo: {
        "@type": "ImageObject",
        url: "https://ezando.studio/logo.png",
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://ezando.studio" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://ezando.studio/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: canonical },
    ],
  };

  return (
    <main className="bg-[#050505] overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <ScrollProgress />
      <ScrollRefresh />
      <Navbar />

      <article className="relative bg-[#050505] text-white pt-32 md:pt-40 lg:pt-48 pb-6 md:pb-8 px-4 sm:px-6 md:px-12 lg:px-20 overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[90vw] max-w-[800px] h-[500px] rounded-full bg-[#CCFF00]/[0.025] blur-[170px] pointer-events-none"
        />
        <div className="relative max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6 md:mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-gray-300 line-clamp-1">{post.title}</span>
          </nav>

          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5 md:mb-6">
              {post.categories.map((c) => (
                <span
                  key={c.slug}
                  className="text-[11px] font-semibold uppercase tracking-wide px-3 py-1.5 rounded-full"
                  style={{ background: `${c.accent}18`, border: `1px solid ${c.accent}45`, color: c.accent }}
                >
                  {c.title}
                </span>
              ))}
            </div>
          )}

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.08] mb-5 md:mb-6">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-sm md:text-base lg:text-lg text-gray-400 leading-relaxed mb-6 md:mb-8">{post.excerpt}</p>
          )}

          {/* Author + meta */}
          <div className="flex items-center gap-4 pb-6 md:pb-8 border-b border-white/8">
            {post.author?.image ? (
              <Image
                src={urlFor(post.author.image).width(80).height(80).url()}
                alt={post.author.name}
                width={44}
                height={44}
                className="rounded-full object-cover"
              />
            ) : null}
            <div>
              <p className="text-sm font-semibold text-white">{post.author?.name}</p>
              <p className="text-xs text-gray-500">
                {formatDate(post.publishedAt)}
                {post.readingTime ? ` · ${post.readingTime} min read` : ""}
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* Cover image */}
      <div className="relative bg-[#050505] px-4 sm:px-6 md:px-12 lg:px-20 pb-3 md:pb-4">
        <div className="max-w-3xl mx-auto rounded-3xl md:rounded-4xl overflow-hidden border border-white/8">
          <Image
            src={urlFor(post.coverImage).width(1400).height(800).url()}
            alt={post.coverImage?.alt || post.title}
            width={1400}
            height={800}
            priority
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* Body */}
      <BlogPostBody body={post.body} author={post.author} />

      {related.length > 0 && <RelatedPosts posts={related} />}

      <Footer />
    </main>
  );
}