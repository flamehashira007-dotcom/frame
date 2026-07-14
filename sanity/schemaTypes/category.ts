import { defineField, defineType } from "sanity";

export default defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 64 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
    defineField({
      name: "accent",
      title: "Accent color",
      type: "string",
      description: "Hex value, e.g. #CCFF00 — used for the tag color on the site.",
      initialValue: "#CCFF00",
    }),
  ],
  preview: { select: { title: "title", subtitle: "description" } },
});