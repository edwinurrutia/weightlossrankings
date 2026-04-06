import { defineType, defineField } from "sanity";

export const pricing = defineType({
  name: "pricing",
  title: "Pricing",
  type: "object",
  fields: [
    defineField({
      name: "dose",
      title: "Dose",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "form",
      title: "Form",
      type: "string",
      options: {
        list: [
          { title: "Compounded", value: "compounded" },
          { title: "Brand", value: "brand" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "monthly_cost",
      title: "Monthly Cost",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "promo_code",
      title: "Promo Code",
      type: "string",
    }),
    defineField({
      name: "promo_price",
      title: "Promo Price",
      type: "number",
    }),
  ],
});
