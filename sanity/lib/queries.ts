import { groq } from "next-sanity";

export const postCardFields = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  coverImage,
  publishedAt,
  readingTime,
  "author": author->{name, "slug": slug.current, image},
  "categories": categories[]->{title, "slug": slug.current, accent}
`;

export const allPostsQuery = groq`
  *[_type == "post" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
    ${postCardFields}
  }
`;

export const featuredPostQuery = groq`
  *[_type == "post" && featured == true && !(_id in path("drafts.**"))] | order(publishedAt desc)[0] {
    ${postCardFields}
  }
`;

export const postsByCategoryQuery = groq`
  *[_type == "post" && !(_id in path("drafts.**")) && $category in categories[]->slug.current] | order(publishedAt desc) {
    ${postCardFields}
  }
`;

export const allCategoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    title, "slug": slug.current, accent
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    body,
    coverImage,
    publishedAt,
    updatedAt,
    readingTime,
    seoTitle,
    seoDescription,
    seoImage,
    noIndex,
    canonicalUrl,
    "author": author->{name, "slug": slug.current, image, role, bio, twitter, linkedin},
    "categories": categories[]->{title, "slug": slug.current, accent}
  }
`;

export const relatedPostsQuery = groq`
  *[_type == "post" && slug.current != $slug && !(_id in path("drafts.**")) && count(categories[@._ref in $categoryIds]) > 0] | order(publishedAt desc) [0...3] {
    ${postCardFields}
  }
`;

export const allSlugsQuery = groq`
  *[_type == "post" && !(_id in path("drafts.**"))] { "slug": slug.current }
`;