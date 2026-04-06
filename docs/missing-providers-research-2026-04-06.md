# Missing GLP-1 Provider Research — 2026-04-06

Research conducted by an editorial agent against the live `src/data/providers.json` snapshot (80 providers). Output is research only — no DB modifications were made.

## Methodology

1. **Inventory.** Loaded `/Users/weightlossrankings/src/data/providers.json` and extracted all 80 provider names, slugs, and `affiliate_url` domains as the cross-reference set.
2. **Web search.** Ran 14 distinct WebSearch queries across the major angles requested (general best-of lists, compounded semaglutide, compounded tirzepatide, Wegovy/Zepbound alternatives, men's/women's vertical providers, menopause-focused providers, employer telehealth, plus targeted name probes for candidates surfaced in earlier queries).
3. **Listicle mining.** Pulled candidate names out of search snippets from U.S. News, TrimRx's 2026 comparison guide, Vaccine Alliance's "cheapest" rankings, Policy Lab, NewBeauty, Aspire Health, and MenoHello's 25+ provider directory.
4. **Cross-reference.** Each candidate was matched against the existing dataset by lowercase name AND domain substring against `affiliate_url`. Matches flagged as `EXISTS_IN_DB`.
5. **URL sanity check.** Each candidate's homepage URL was confirmed via WebSearch result links (the WebFetch tool was unavailable in this session, so live HTTP verification was substituted with corroborating search-result hits from at least two independent sources where possible).

Search queries executed:
- "best GLP-1 telehealth providers 2026 compounded semaglutide"
- "compounded tirzepatide telehealth online 2026"
- "Wegovy Zepbound alternatives online weight loss program 2026"
- "men's weight loss telehealth GLP-1 semaglutide"
- "women's weight loss telehealth GLP-1 menopause"
- "GLP-1 telehealth startup 2026 weight loss new"
- "U.S. News top GLP-1 weight loss medication providers 2026"
- "Shed weight loss GLP-1 telehealth compounded"
- "Midi Health GLP-1 weight loss telehealth women"
- "eMed telehealth GLP-1 Linda Yaccarino weight loss"
- "Zealthy Sequence Calibrate Knownwell weight loss telehealth GLP-1"
- "24hrdoc / DirectMeds / MyStart Health GLP-1 semaglutide telehealth"
- "Push Health Eden tirzepatide compounded telehealth provider"
- "Wisp / Vivente / Pomelo / Allara weight loss telehealth GLP-1"
- "Teladoc weight management GLP-1 employer telehealth"

## Current dataset summary

- **Total providers:** 80 (note: dataset contains a few duplicates such as `Noom` / `Noom Med` and `Weight Watchers` / `WeightWatchers`, plus several non-GLP-1 entries — see "out-of-scope notes" below).
- **Rough categorization of the 80:**
  - **Major brand-name telehealth (multi-vertical):** Hims, Hers, Ro, Lemonaid Health, LifeMD, GoodRx Care, Nurx, PlushCare, Sesame, CallonDoc, Walgreens Weight Management
  - **GLP-1 / weight-loss vertical brands:** CoreAge Rx, Henry Meds, Mochi Health, Found, Form Health, Ivim Health, ReflexMD, Remedy Meds, MEDVi, ShedRx, SkinnyRx, TrimRx, Eden, EllieMD, Fridays, JumpstartMD, Calibrate (The Calibrate Clinic), Noom Med, Pomegranate Health, Piper, Mojoon, Mochi, Trimi Health, Try Yucca Health, WeightlessRx, WeightRx, Willow, OrderlyMeds, GobyMeds, Good Life Meds, GetRelief Rx, Brello Health, Amble, Bliv, Livv, Lavender Sky Health, LumiMeds, Peak Wellness, RNK Health, VivioMD, Boston Medical Group, AmberHealth, Alan Meds, BeyondMD, bmiMD, Dollar Dad Club, Independent Wellness, Ivy Rx, MDExam, Nu Image Medical, Nuform Health, OnlineSemaglutide.org, Strive Pharmacy, Empower Pharmacy
  - **Diet / behavior / lifestyle:** Noom, WeightWatchers, G-Plans
  - **Out-of-scope (not GLP-1 telehealth at all):** Transparent Labs Fat Burner, MitoQ, Thorne Metabolic Health Bundle, Factor, BistroMD, Nutrisystem, Green Chef, MyFitnessPal Premium, Lose It!, Fitbit Premium, Apple Fitness+ — these are meal kits, supplements, or fitness apps that should arguably live in a separate table or be tagged differently.

## High-priority candidates (NOT in our database)

These are well-funded, high-profile, or obviously major US-market players that surfaced in multiple independent sources. Strongly recommended for editorial review and addition.

| Name | URL | Positioning | Compounded / Brand | Source |
|---|---|---|---|---|
| **Wisp** | https://hellowisp.com | Largest pure-play women's telehealth in US (1.5M+ patients). Launched weight-care vertical 2024 with branded Wegovy/Zepbound/Saxenda + compounded sublingual semaglutide; targeted at PCOS / perimenopause / menopause hormonal weight gain. | Both | FierceHealthcare, BusinessWire, MobiHealthNews, hellowisp.com |
| **Zealthy** | https://getzealthy.com | Multi-vertical DTC telehealth (weight loss, hair, sex, skin). Physician-supervised GLP-1 program at $135/mo membership; semaglutide and tirzepatide; iOS + Android apps. | Both | ConsumerAffairs, MarketersMedia, Apple App Store |
| **eMed** | https://www.emed.com | Linda Yaccarino-led GLP-1 employer telehealth unicorn, $200M Series A at $2B valuation (Aug 2025). Tom Brady is Chief Wellness Officer. Claims 91%+ adherence. Aon-backed B2B + DTC. | Brand-name (employer-sponsored) | PitchBook, Bloomberg, FierceHealthcare, CNBC, Axios |
| **Midi Health** | https://www.joinmidi.com | Insurance-covered women's midlife specialist (perimenopause/menopause). 230K+ patients, all 50 states. Weight-management vertical with personalized GLP-1 prescribing + compounded semaglutide. | Both | StatNews, joinmidi.com, Trustpilot |
| **Allara Health** | https://www.allarahealth.com | Insurance-covered women's hormonal/metabolic specialist (PCOS, perimenopause, thyroid, insulin resistance). $119/mo Complete Care; clinicians prescribe Wegovy/Zepbound. | Brand-name | NewBeauty, allarahealth.com |
| **Knownwell** | https://www.knownwell.co | Weight-inclusive primary-care + metabolic-health company. CVS Health Ventures-backed ($25M round). Hybrid in-person + virtual in all 50 states. $299 first visit / $149 follow-up. | Brand-name | FierceHealthcare (HLTH25), knownwell.co, Eli Lilly's telehealth-for-obesity directory |
| **Push Health** | https://www.pushhealth.com | Long-running telehealth marketplace connecting patients with licensed prescribers. Strong on FDA-approved Mounjaro/Zepbound/Ozempic/Wegovy. Native iOS/Android apps. | Brand-name | OrderlyMeds review, Apple App Store, MedConsumerWatch |
| **Shed (tryshed.com)** | https://www.tryshed.com | Phoenix-based GLP-1 platform offering injections, sublingual drops, and lozenges (more delivery formats than nearly any competitor) PLUS brand-name Wegovy/Zepbound. Famous for a 10%-in-9-months refund guarantee. **NOTE: distinct from "ShedRx" already in our DB** — different company, different domain. | Both | TrimRx 2026 guide, AccessNewswire, RankedFavorites, ClearMetabolic |

## Medium-priority candidates (NOT in our database)

Legitimate, working sites with real GLP-1 offerings, but smaller scale, narrower presence, or weaker third-party validation than the high-priority set.

| Name | URL | Positioning | Compounded / Brand | Source |
|---|---|---|---|---|
| **DirectMeds** | https://directmeds.com | LegitScript-certified, HIPAA-compliant compounded GLP-1 telehealth. 53K+ patients, 4.8 stars self-reported. Sublingual semaglutide $249/mo, injection $297/mo. | Compounded | HealthFactsJournal, MedicineHack, directmeds.com |
| **24hrDOC** | https://www.24hrdoc.com | General telehealth with weight-loss vertical (oral semaglutide, semaglutide injection, tirzepatide). Includes monthly nutritionist coaching. Free 3–5 day shipping. | Both | 24hrdoc.com, Vaccine Alliance |
| **MyStart Health** | https://mystarthealth.com | Compounded GLP-1 telehealth with 600+ board-certified physicians. Press push around holiday-season expansion of compounded semaglutide/tirzepatide programs. | Compounded | Yahoo Finance press release |
| **Aspire Health** | https://aspirehealth.care | Compounded tirzepatide / semaglutide telehealth with 503A pharmacy partners. Heavy SEO presence ranking on "best tirzepatide telehealth" queries. | Compounded | aspirehealth.care, Vaccine Alliance |
| **Teladoc Health (Weight Management)** | https://www.teladochealth.com/expert-care/condition-management/weight-management | Largest publicly traded telehealth in US. Provider-based weight-management program prescribes GLP-1s when clinically appropriate; primarily distributed via employer/health-plan opt-in (Livongo brand for diabetes/prediabetes). | Brand-name (employer channel) | teladochealth.com, FierceHealthcare, Healthcare Dive |

## Existing providers we found in search (confirms coverage)

The following well-known providers showed up repeatedly in best-of lists and we already track them — no action needed:

Hims, Hers, Ro, Lemonaid Health, LifeMD, MEDVi (Medvi), Mochi Health, Henry Meds, Ivim Health, Found, Form Health, ReflexMD, Remedy Meds, ShedRx, SkinnyRx, TrimRx, Eden, EllieMD, Fridays, Calibrate (The Calibrate Clinic), Noom / Noom Med, WeightWatchers (which now owns Sequence — already covered by our WeightWatchers entry), Walgreens Weight Management, PlushCare, Sesame, GoodRx Care, Nurx, OrderlyMeds.

## Out-of-scope results

Search results that surfaced but are NOT GLP-1 telehealth providers, and should not be added:
- **NovoCare Pharmacy** — Novo Nordisk's own direct-fulfillment pharmacy (manufacturer channel, not a third-party telehealth provider).
- **Eli Lilly's "find-care" telehealth directory** — referral page, not a provider.
- **Vaccine Alliance, Policy Lab, TrimRx blog, Health Facts Journal, NewBeauty, MenoHello** — review/affiliate publishers, not providers themselves.
- **Mercer, AJMC, Bloomberg, NPR, CNBC, StatNews** — news/analyst outlets.
- **Foundayo (orforglipron) / Wegovy oral / Zepbound vials** — drugs, not telehealth providers.
- **Saxenda / Contrave / Qsymia / Xenical** — drugs.
- **Nourish** — partners with Wisp for nutrition coaching; not itself a GLP-1 prescriber.
- **Roland Medical Weight Loss** — local clinic blog, not a national telehealth.

## Recommended next actions

### Top 10 candidates to add manually, in priority order

1. **Wisp** — biggest gap in our coverage. We have zero pure-women's-telehealth-with-real-scale, and Wisp claims 1.5M+ patients with both branded and compounded GLP-1 SKUs. Highest-impact addition.
2. **Zealthy** — multi-vertical DTC telehealth that ranks consistently in best-of lists; native mobile app; clear GLP-1 program with real volume.
3. **eMed** — $2B valuation, Tom Brady marketing, employer-channel B2B but increasingly DTC. Newsworthy and growing fast.
4. **Midi Health** — second-largest women's-midlife player after Wisp; insurance-covered, all 50 states, real GLP-1 vertical.
5. **Allara Health** — distinct angle (PCOS/insulin-resistance focus, insurance-covered) that complements Wisp/Midi.
6. **Knownwell** — CVS-backed weight-inclusive primary-care + metabolic health; hybrid model is differentiated from pure-DTC competitors.
7. **Push Health** — long-running, well-known prescriber marketplace; strong brand-name GLP-1 access.
8. **Shed (tryshed.com)** — must NOT be confused with our existing ShedRx; multiple independent reviews flag it as one of the most-comparison-tested platforms in 2026.
9. **DirectMeds** — LegitScript-certified, compounded-only, scale of 53K+ patients per their own claims.
10. **Teladoc Health (Weight Management)** — largest public telehealth co; employer channel makes it semi-relevant for our audience but coverage gap is real.

### Patterns observed (gaps in our coverage)

- **Women's-vertical scale players are missing.** We have Lavender Sky, Pomegranate, Willow, Brello — all small. The category leaders (**Wisp, Midi, Allara**) are not in our DB. This is the single biggest editorial gap.
- **Employer-channel / B2B telehealth is missing.** Teladoc, eMed, and Knownwell are increasingly relevant as more US employers underwrite GLP-1s via partner platforms. Even though our audience is consumer-first, these companies are top-of-mind in news cycles.
- **Name collision risk.** "Shed" (tryshed.com) is a different company from "ShedRx" (shedrx.com) which we already have. If editorial adds Shed they should explicitly disambiguate in the description.
- **Listicle/comparison-site noise.** A lot of search results are SEO affiliate publishers (Vaccine Alliance, Policy Lab, TrimRx blog, NewBeauty, MenoHello). They are NOT providers and should never be added — but they are useful as continued sources for finding new candidates between research passes.
- **Dataset hygiene unrelated to this task.** While inventorying providers.json, I noticed: (a) Noom and WeightWatchers each appear twice with slightly different slugs/URLs; (b) 11 of the 80 records are meal kits, supplements, or fitness apps (Factor, BistroMD, Nutrisystem, Green Chef, MyFitnessPal, Lose It!, Fitbit Premium, Apple Fitness+, MitoQ, Thorne, Transparent Labs). Worth flagging to editorial in a separate cleanup pass.

## Sources

- https://health.usnews.com/best-diet/medication/top-glp-1-weight-loss-medication-providers
- https://trimrx.com/blog/8-best-glp-1-weight-loss-programs-2026-comparison-guide/
- https://www.vaccinealliance.org/semaglutide/cheapest/
- https://policylab.us/tirzepatide/best-online-compounding-pharmacy/
- https://www.menohello.com/menopause-toolkit/glp-1-telehealth-providers
- https://www.newbeauty.com/glp-1-prescription-online-telehealth/
- https://aspirehealth.care/telehealth/glp1-providers/
- https://hellowisp.com/shop/weight-care
- https://getzealthy.com/
- https://www.emed.com/join/home
- https://www.joinmidi.com/weight-management
- https://www.allarahealth.com/weight-management
- https://www.knownwell.co/weight-management
- https://www.pushhealth.com/drugs/tirzepatide
- https://www.tryshed.com/
- https://directmeds.com/
- https://www.24hrdoc.com/weight-loss/semaglutide
- https://finance.yahoo.com/news/mystart-health-expands-telehealth-access-161000727.html
- https://www.teladochealth.com/expert-care/condition-management/weight-management
- https://pitchbook.com/news/articles/linda-yaccarinos-glp-1-telehealth-unicorn-raises-200m-on-adherence-claim-that-bucks-industry-norm
- https://www.fiercehealthcare.com/health-tech/employer-telehealth-company-emed-raises-200m-2b-valuation
- https://www.fiercehealthcare.com/digital-health/wisp-launches-weight-care-vertical-offering-glp-1s-and-otc-supplement
- https://www.statnews.com/2025/03/11/telehealth-firms-pivot-from-glp1-weight-loss-drugs-to-hormone-replacement-therapy/
