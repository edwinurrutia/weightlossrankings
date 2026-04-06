import { defineType, defineField } from "sanity";

export const provider = defineType({
  name: "provider",
  title: "Provider",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "GLP-1 Provider", value: "GLP-1 Provider" },
          { title: "Weight Loss Program", value: "Weight Loss Program" },
          { title: "Supplement", value: "Supplement" },
          { title: "Meal Delivery", value: "Meal Delivery" },
          { title: "Fitness App", value: "Fitness App" },
          { title: "Metabolic Testing", value: "Metabolic Testing" },
          { title: "Coaching", value: "Coaching" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "pricing",
      title: "Pricing",
      type: "array",
      of: [{ type: "pricing" }],
    }),
    defineField({
      name: "scores",
      title: "Scores",
      type: "scores",
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "states_available",
      title: "States Available",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "affiliate_url",
      title: "Affiliate URL",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "affiliate_network",
      title: "Affiliate Network",
      type: "string",
    }),
    defineField({
      name: "fda_warnings",
      title: "FDA Warnings",
      type: "array",
      of: [{ type: "fdaWarning" }],
    }),
    defineField({
      name: "review_content",
      title: "Review Content",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "pros",
      title: "Pros",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "cons",
      title: "Cons",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "best_for",
      title: "Best For",
      type: "string",
    }),
    defineField({
      name: "is_featured",
      title: "Is Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "external_reviews",
      title: "External Reviews",
      type: "externalReviews",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "category",
      media: "logo",
    },
  },
});
