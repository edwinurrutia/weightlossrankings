import { pricing } from "./objects/pricing";
import { scores } from "./objects/scores";
import { fdaWarning } from "./objects/fdaWarning";
import { externalReviews } from "./objects/externalReviews";
import { provider } from "./provider";
import { drug } from "./drug";
import { category } from "./category";
import { blogPost } from "./blogPost";
import { state } from "./state";

export const schemas = [
  // Object schemas
  pricing,
  scores,
  fdaWarning,
  externalReviews,
  // Document schemas
  provider,
  drug,
  category,
  blogPost,
  state,
];
