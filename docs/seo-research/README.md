# SEO Research — Ahrefs Keyword Data

This folder holds the raw Ahrefs keyword exports we use to drive
content and tool roadmap decisions, plus a running log of which
clusters have been built into pages or tools and which are still open.

## Files

| File | Source | Date |
|---|---|---|
| `ahrefs-semaglutide-2026-04-06.csv` | Ahrefs "matching terms" report for the seed `semaglutide`, US, top 1000 by volume | 2026-04-06 |
| `ahrefs-tirzepatide-2026-04-06.csv` | Ahrefs "matching terms" report for the seed `tirzepatide`, US, top 1000 by volume | 2026-04-06 |

Both files are UTF-16 BOM TSV. To parse with Python:

```python
import csv
with open(path, encoding='utf-16') as f:
    reader = csv.DictReader(f, delimiter='\t')
    rows = list(reader)
```

Columns: `#`, `Keyword`, `Country`, `Difficulty`, `Volume`, `CPC`,
`CPS`, `Parent Keyword`, `Last Update`, `SERP Features`,
`Global volume`, `Traffic potential`, `Global traffic potential`,
`First seen`, `Intents`, `Languages`, `SV trend`, `SV Forecasting trend`,
`Category`.

## Cluster analysis (2026-04-06)

Clustered both CSVs by topic, filtered to **KD ≤ 35** and
**Volume ≥ 200**. Results sorted by total monthly volume:

| Cluster | # Terms | Total Vol/mo | Avg KD | Status |
|---|---:|---:|---:|---|
| Unit conversion (mg ↔ syringe units) | 52 | 31,450 | 1.1 | ✅ Built — `/tools/glp1-unit-converter` |
| Injection technique / where to inject | 20 | 23,500 | 3.5 | ⏳ Pending — needs SVG diagram |
| How to get / where to buy | 43 | 22,700 | 6.7 | ✅ Already covered by `/providers` |
| Time to work / onset | 31 | 22,600 | 0.9 | ⏳ Pending — research article |
| Cost / pricing | 51 | 22,050 | 6.6 | ✅ Already covered by `/research/glp-1-pricing-index-2026` |
| Storage / refrigeration / shelf life | 32 | 18,500 | 6.9 | ⏳ Pending — reference article |
| Side effects (general) | 17 | 11,050 | 6.8 | Partial — `/research/glp1-side-effects-what-trials-actually-showed` |
| Side effects — fatigue | 7 | 9,150 | 1.4 | ⏳ Pending — short article |
| Side effects — hair loss | 6 | 8,700 | 6.3 | ⏳ Pending — short article |
| Microdosing | 13 | 6,700 | 0.4 | ⏳ Pending — needs careful YMYL framing |
| Reconstitution | 10 | 4,500 | 0.0 | ⏳ Pending — paired with unit converter |
| Plateau / non-responder | 4 | 3,600 | 0.2 | ⏳ Pending — short article |
| Food / diet | 10 | 4,950 | 5.7 | ⏳ Pending — patient guide |
| Comparison / vs / difference | 13 | 10,100 | 20.6 | Partial — already have head-to-head deep-dive |
| Dosage schedule / titration | 6 | 2,200 | 3.2 | ✅ Already covered by `/tools/glp1-dose-plotter` |

## Top low-KD individual queries (KD ≤ 5, Vol ≥ 1,000)

These are the highest-leverage individual long-tail queries that
should each be answered explicitly somewhere on the site:

| Vol | KD | Query | Where it should live |
|---:|---:|---|---|
| 5,400 | 10 | where to inject semaglutide | injection guide article |
| 4,700 | 2 | where to inject tirzepatide | injection guide article |
| 4,200 | 0 | does tirzepatide cause hair loss | hair-loss article |
| 3,900 | 4 | does semaglutide make you tired | fatigue article |
| 3,700 | 3 | tirzepatide para que sirve | Spanish-language overview |
| 3,600 | 0 | how many units is 2.5 mg of tirzepatide | ✅ unit converter |
| 3,400 | 15 | how to inject semaglutide | injection guide article |
| 3,000 | 1 | does tirzepatide make you tired | fatigue article |
| 2,900 | 1 | how long do semaglutide side effects last | side-effects-duration article |
| 2,500 | 0 | how many mg is 40 units of semaglutide | ✅ unit converter |
| 2,300 | 1 | how long does it take for semaglutide to suppress appetite | onset article |
| 2,300 | 0 | how to inject tirzepatide | injection guide article |
| 2,300 | 5 | how to get tirzepatide | ✅ providers directory |
| 2,100 | 2 | 20 units of semaglutide is how many mg | ✅ unit converter |
| 1,900 | 1 | how long does it take for semaglutide to work | onset article |
| 1,800 | 22 | does semaglutide expire | storage article |
| 1,700 | 0 | how many mg is 50 units of semaglutide | ✅ unit converter |
| 1,600 | 1 | what to eat on semaglutide | diet guide |
| 1,600 | (n/a) | how long does tirzepatide stay in your system | onset/half-life article |
| 1,500 | 0 | how long does it take for tirzepatide to work | onset article |
| 1,500 | 0 | how long does tirzepatide last in the fridge | storage article |
| 1,500 | 28 | how much weight can you lose on semaglutide | already covered by STEP-1 article |
| 1,400 | 0 | how long does tirzepatide take to work | onset article |
| 1,400 | 2 | how many mg is 40 units of tirzepatide | ✅ unit converter |
| 1,400 | 1 | why am i not losing weight on semaglutide | plateau article |
| 1,400 | 0 | how many mg is 40 units of tirzepatide | ✅ unit converter |
| 1,400 | 1 | how long does semaglutide take to work | onset article |
| 1,400 | 0 | does semaglutide need to be refrigerated | storage article |
| 1,200 | 0 | how to microdose semaglutide | microdose explainer (careful framing) |
| 1,200 | 0 | does tirzepatide need to be refrigerated | storage article |
| 1,200 | 0 | where to inject tirzepatide in thigh | injection guide article |
| 1,200 | 0 | how many mg is 20 units of tirzepatide | ✅ unit converter |
| 1,100 | 0 | how long after semaglutide injection do side effects start | side-effects-duration |
| 1,100 | 0 | 40 units of semaglutide is how many mg | ✅ unit converter |
| 1,100 | 0 | how fast does semaglutide work | onset article |
| 1,100 | 1 | how long for semaglutide to work | onset article |
| 1,100 | 4 | where to get tirzepatide | ✅ providers directory |
| 1,100 | 6 | how to get tirzepatide online | ✅ providers directory |
| 1,000 | 0 | how many units is 5mg of tirzepatide | ✅ unit converter |
| 1,000 | 0 | how fast does tirzepatide work | onset article |
| 1,000 | 0 | why am i not losing weight on tirzepatide | plateau article |

## Build queue (in priority order)

1. **Unit converter tool** — ✅ DONE 2026-04-06 (`/tools/glp1-unit-converter`)
2. **Injection technique guide** — ✅ DONE 2026-04-06 (`/research/where-to-inject-semaglutide-tirzepatide-guide`) — includes new reusable `InjectionSitesDiagram` SVG component
3. **Onset / time-to-work article** — ✅ DONE 2026-04-06 (`/research/how-long-does-glp1-take-to-work`)
4. **Storage & shelf-life article** — ✅ DONE 2026-04-06 (`/research/glp1-storage-shelf-life-refrigeration-guide`)
5. **Side effects: fatigue + hair loss + duration article** — ✅ DONE 2026-04-07 (`/research/glp1-side-effects-fatigue-hair-loss-duration`)
6. **Plateau / non-responder article** — ✅ DONE 2026-04-07 (`/research/why-am-i-not-losing-weight-glp1-plateau`)
7. **Microdosing explainer** — ✅ DONE 2026-04-07 (`/research/semaglutide-microdosing-evidence-guide`) — careful YMYL framing with off-label disclaimer
8. **What to eat on a GLP-1 article** — ✅ DONE 2026-04-07 (`/research/what-to-eat-on-glp1-diet-protein-guide`)
9. **Reconstitution guide** — ✅ DONE 2026-04-07 (`/research/compounded-glp1-reconstitution-mixing-guide`)

**Top 9 queue items all shipped.** Next quarter's refresh should surface new clusters.

## How to refresh the data

When the next quarterly Ahrefs export drops:

1. Run the same "matching terms" report against `semaglutide` and
   `tirzepatide` seed keywords, US, top 1000 by volume.
2. Save with the date suffix in this folder: `ahrefs-semaglutide-YYYY-MM-DD.csv`
3. Re-run the cluster analysis (the python helper at the top of
   this README) and update the cluster + queue tables here.
4. Diff the new cluster volumes against the previous quarter to spot
   surging topics — those are the highest-priority new articles.
