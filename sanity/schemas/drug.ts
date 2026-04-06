import { defineType, defineField } from "sanity";

export const drug = defineType({
  name: "drug",
  title: "Drug",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
    }),
    defineField({
      name: "generic_name",
      title: "Generic Name",
      type: "string",
    }),
    defineField({
      name: "brand_names",
      title: "Brand Names",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "how_it_works",
      title: "How It Works",
      type: "text",
    }),
    defineField({
      name: "side_effects",
      title: "Side Effects",
      type: "text",
    }),
    defineField({
      name: "fda_status",
      title: "FDA Status",
      type: "string",
    }),
    defineField({
      name: "approval_date",
      title: "Approval Date",
      type: "date",
    }),
    defineField({
      name: "dosing_schedule",
      title: "Dosing Schedule",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "week_range",
              title: "Week Range",
              type: "string",
            }),
            defineField({
              name: "dose",
              title: "Dose",
              type: "string",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "clinical_trial_summary",
      title: "Clinical Trial Summary",
      type: "text",
    }),
  ],
});
