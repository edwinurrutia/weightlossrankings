import { z } from "zod";

export const PricingSchema = z.object({
  dose: z.string().min(1, "pricing.dose is required"),
  form: z.enum(["compounded", "brand"]),
  drug: z.enum(["semaglutide", "tirzepatide"]).optional(),
  monthly_cost: z
    .number()
    .positive("pricing.monthly_cost must be > 0")
    .lt(5000, "pricing.monthly_cost must be < 5000 (sanity check)"),
  promo_code: z.string().optional(),
  promo_price: z.number().positive().optional(),
});

export const ScoresSchema = z.object({
  value: z.number().min(0).max(10),
  effectiveness: z.number().min(0).max(10),
  ux: z.number().min(0).max(10),
  trust: z.number().min(0).max(10),
  accessibility: z.number().min(0).max(10),
  support: z.number().min(0).max(10),
});

const STATE_CODE = /^[A-Z]{2}$/;
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export const VerificationSchema = z.object({
  last_verified: z
    .string()
    .regex(ISO_DATE, "verification.last_verified must be YYYY-MM-DD")
    .refine((s) => !Number.isNaN(new Date(s).getTime()), {
      message: "verification.last_verified must be a valid date",
    }),
  verified_by: z.enum(["manual", "scraper", "owner-confirmed"]).optional(),
  source_urls: z.array(z.string().url()),
  confidence: z.enum(["high", "medium", "low"]),
  notes: z.string().optional(),
});

export const ProviderSchema = z.object({
  _id: z.string().min(1),
  name: z.string().min(1, "name is required"),
  slug: z
    .string()
    .min(1, "slug is required")
    .regex(SLUG, "slug must be lowercase with hyphens only"),
  logo: z.string().optional(),
  description: z.string(),
  category: z.string(),
  pricing: z.array(PricingSchema).min(1, "pricing must have at least 1 entry"),
  scores: ScoresSchema,
  features: z.array(z.string()),
  states_available: z
    .array(z.string().regex(STATE_CODE, "state code must be 2 uppercase letters")),
  affiliate_url: z.string().url("affiliate_url must be a valid URL"),
  affiliate_network: z.string().optional(),
  fda_warnings: z.array(
    z.object({
      date: z.string(),
      description: z.string(),
    })
  ),
  review_content: z.any().optional(),
  pros: z.array(z.string()),
  cons: z.array(z.string()),
  best_for: z.string().optional(),
  is_featured: z.boolean(),
  external_reviews: z
    .object({
      trustpilot_score: z.number().optional(),
      trustpilot_count: z.number().optional(),
      google_score: z.number().optional(),
      google_count: z.number().optional(),
    })
    .optional(),
  verification: VerificationSchema.optional(),
});

export type ProviderSchemaType = z.infer<typeof ProviderSchema>;

export function validateProvider(data: unknown): {
  valid: boolean;
  errors: string[];
} {
  const result = ProviderSchema.safeParse(data);
  if (result.success) {
    return { valid: true, errors: [] };
  }
  const errors = result.error.issues.map((issue) => {
    const path = issue.path.join(".");
    return path ? `${path}: ${issue.message}` : issue.message;
  });
  return { valid: false, errors };
}
