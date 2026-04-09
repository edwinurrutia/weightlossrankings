# Competitor Brand Gap Analysis — 2026-04-09

**Sources crawled:**
- `compareglp1medication.com` — 41 brands at `/reviews`
- `glp1planet.com/brands` — 74 brands

**Dedup anchor:** the 101 providers in `/Users/weightlossrankings/src/data/providers.json`.

**Total unique brands observed across both directories:** ~90
**Already in our dataset:** 38
**Gap candidates surfaced:** 32
**Defunct / excluded:** 5

---

## Already in our dataset (no action)

CoreAge Rx, Mochi Health, ShedRx, Brello Health, Fella Health, FuturHealth,
Get Thin MD, Amble, Henry Meds, Hers, LifeMD, Ro, WeightWatchers Clinic,
Found, Hims, MEDVi, Remedy Meds, Eden, Lemonaid Health, Noom Med, PlushCare,
Sesame, Nurx, OrderlyMeds, Form Health, Fridays, Willow, bmiMD, Embody,
Strut Health, VivioMD, Alan Meds, GobyMeds, SkinnyRx, OnlineSemaglutide,
GoodRx Care, The Calibrate Clinic.

**Name-match flags:**
- **GetThinUSA = Get Thin MD** — same company, already in our dataset under `get-thin-md`. No new entry needed.
- **Sequence** — historical brand, now redirects to WeightWatchers. Already covered.
- **HeyDoctor** — legacy brand for GoodRx Care. Already covered.
- **Calibrate vs The Calibrate Clinic** — needs verification. Our `the-calibrate-clinic` slug may be a different entity from the consumer brand at `joincalibrate.com` (Calibrate Health Inc., now part of WeightWatchers post-acquisition). Worth a verification pass.

---

## HIGH priority additions (13 brands — add as stubs now)

| ID | Brand | Landing URL | GLP-1s offered | Notes |
|---|---|---|---|---|
| 1 | NativeMed | https://www.nativemed.net/ | Compounded semaglutide, compounded tirzepatide | US-based, cash-pay compounded GLP-1 telehealth |
| 2 | Super Healthy Rx | https://superhealthyrx.com/ | Compounded sema $299, compounded tirz $399 | US board-certified physicians, accredited pharmacies |
| 3 | Priority Meds | https://prioritymeds.com/ | Compounded sema+B12, compounded tirz+B6 | Clearwater FL, cash-pay, flat-dose pricing |
| 4 | MultiMedRx | https://multimedrx.com/ | Brand-name Ozempic, Wegovy, Zepbound | Newport Beach CA + Reno NV, NPI 1538565072 |
| 5 | Healthicare | https://healthicare.com/ | Brand + compounded (sema, tirz, Ozempic, Wegovy, Mounjaro, Zepbound) | Powered by **Beluga Health + F&F Pharmacies** backend — noted as potential white-label cluster anchor |
| 6 | ReadyRx | https://www.readyrx.com/ | Compounded semaglutide, compounded tirzepatide | LegitScript, FDA-registered pharmacies, 5k+ members |
| 7 | AgelessRx | https://agelessrx.com/ | Compounded sema, compounded tirz, Wegovy | Ann Arbor MI, longevity + GLP-1 |
| 8 | Push Health | https://pushhealth.com/ | Brand-name Ozempic, Zepbound, Mounjaro | 55k+ pharmacy network, LegitScript |
| 9 | Wisp | https://hellowisp.com/ | Sublingual compounded semaglutide + metabolic support | Semaglutide-only (no tirz) |
| 10 | K Health | https://www.khealth.com/weight/ | GLP-1 via Cigna partnership | Large US telehealth, strong brand recognition |
| 11 | Midi Health | https://www.joinmidi.com/ | GLP-1 weight meds | Nationwide 50 states, menopause-focused but prescribes for weight, accepts insurance |
| 12 | Alloy | https://www.myalloy.com/ | Zepbound, Wegovy, compounded sema, tirz, liraglutide | Menopause brand, 48-state weight program (not LA/MS), full GLP-1 menu |
| 13 | — | — | — | Get Thin USA is already covered by Get Thin MD |

---

## MEDIUM priority (14 — deferred, need verification pass)

Each needs a YMYL verification pass (live landing check + clinician/pharmacy
disclosure + GLP-1 formulary confirmation) before adding to the dataset.

- **Circle Medical** — https://www.circlemedical.com/ — thin GLP-1 details on homepage
- **QuickMD** — https://www.quick.md/ — fetch timed out
- **Ark** — arkwellness.com 404 at time of crawl, find correct domain
- **Bioverse** — trybioverse.com is a link-redirect shell, find real URL
- **Ascend Medical** — https://www.ascendmedical.com/ — live but thin
- **Honeybee Health** — https://honeybeehealth.com/ — cash-pay pharmacy, verify GLP-1 presence
- **Klarity Health** — https://klarityhealth.com/ — marketplace, mental-health heavy, verify GLP-1
- **WeightCare** — https://weightcare.com/ — ECONNREFUSED during crawl
- **EverlyfeMD** — everlyfe.com is wrong (lifeguard equipment). Find real URL.
- **Maximus** — https://www.maximustribe.com/ — primarily TRT, verify weight-loss funnel
- **Outlive Biology → One Twenty** — https://onetwenty.com/ — rebranded, verify alive
- **Elevate Health** — domain unclear
- **Gala GLP-1** — gala.md ECONNREFUSED
- **Curex** — https://curex.com/weight-loss — primarily allergy telehealth, verify

---

## LOW priority (skip or already covered)

- **Able / Ableweightloss** — coaching-first app, GLP-1 is small add-on
- **Teladoc Health** — doesn't directly dispense GLP-1, routes through employer/insurance. Weak fit.
- **Alpha / Alpha Medical** — general women's telehealth, GLP-1 is one offering
- **Dr. B / hidoc.com** — domain parked; find real URL before adding (likely hidoc.org or hellodrb.co)

---

## DEFUNCT / DO NOT ADD (5)

- **Zeus Health** — both zeushealth.com and zeushealth.co parked / for sale on Afternic
- **Sunlight Rx** — sunlightrx.com parked at GoDaddy
- **Juniper** — Australia-only, does not serve US customers
- **Everlyfe.com (lifeguard equipment)** — not a GLP-1 brand, wrong domain
- **hidoc.com (Dr. B)** — listed for sale at $180k, actual Dr. B brand is elsewhere

---

## Separate research tasks surfaced

1. **Beluga Health + F&F Pharmacies white-label cluster** — Healthicare is one surface; there are likely several more brands running on the same backend. Worth mapping the same way we mapped the Lion MD cluster (Breeze Meds / Care Bare Rx / Synergy Rx), but with a much higher disclosure bar (verbatim NPI + pharmacy match), not circumstantial similarity.

2. **Calibrate entity disambiguation** — confirm whether our `the-calibrate-clinic` slug is Calibrate Health Inc (joincalibrate.com, now part of WeightWatchers) or a different Oxford's Weight Loss clinic. If different, we may be missing the real Calibrate brand.

---

**Report generated:** 2026-04-09 by brand-gap-crawl sub-agent against
`/Users/weightlossrankings/src/data/providers.json`.
