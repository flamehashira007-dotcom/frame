import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { allSlugsQuery } from "@/sanity/lib/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs: { slug: string }[] = await client.fetch(allSlugsQuery);
  const base = "https://ezando.studio";

  const staticRoutes = ["", "/about", "/services", "/portfolio", "/pricing", "/blog", "/contact"].map((p) => ({
    url: `${base}${p}`,
    lastModified: new Date(),
  }));

  const postRoutes = slugs.map((s) => ({
    url: `${base}/blog/${s.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...postRoutes];
}