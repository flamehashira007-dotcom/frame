import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollRefresh from "@/components/ScrollRefresh";
import BlogHero from "@/components/blog/BlogHero";
import BlogGrid, { type Post, type Category } from "@/components/blog/BlogGrid";
import Footer from "@/components/Footer";
import { client } from "@/sanity/lib/client";
import { allPostsQuery, allCategoriesQuery, featuredPostQuery } from "@/sanity/lib/queries";

export const metadata = {
  title: "Blog — Ezando® Studio",
  description:
    "Notes on brand, product design, and growth from the Ezando studio floor — no fluff, no filler.",
  alternates: { canonical: "https://ezando.studio/blog" },
  openGraph: {
    title: "Blog — Ezando® Studio",
    description:
      "Notes on brand, product design, and growth from the Ezando studio floor — no fluff, no filler.",
    url: "https://ezando.studio/blog",
    type: "website",
  },
};

export const revalidate = 60; // ISR — re-fetch from Sanity every 60s

export default async function BlogPage() {
  const [posts, categories, featured] = await Promise.all([
    client.fetch<Post[]>(allPostsQuery),
    client.fetch<Category[]>(allCategoriesQuery),
    client.fetch<Post | null>(featuredPostQuery),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Ezando® Studio Blog",
    url: "https://ezando.studio/blog",
    description:
      "Notes on brand, product design, and growth from the Ezando studio floor.",
    blogPost: posts.slice(0, 10).map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `https://ezando.studio/blog/${p.slug}`,
      datePublished: p.publishedAt,
    })),
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ScrollProgress />
      <ScrollRefresh />
      <Navbar />
      <BlogHero />
      <BlogGrid posts={posts} categories={categories} featured={featured} />
      <Footer />
    </main>
  );
}