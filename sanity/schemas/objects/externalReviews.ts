import { defineType, defineField } from "sanity";

export const externalReviews = defineType({
  name: "externalReviews",
  title: "External Reviews",
  type: "object",
  fields: [
    defineField({
      name: "trustpilot_score",
      title: "Trustpilot Score",
      type: "number",
    }),
    defineField({
      name: "trustpilot_count",
      title: "Trustpilot Count",
      type: "number",
    }),
    defineField({
      name: "google_score",
      title: "Google Score",
      type: "number",
    }),
    defineField({
      name: "google_count",
      title: "Google Count",
      type: "number",
    }),
  ],
});
