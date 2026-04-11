import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References from "@/components/research/References";
import FaqSchema from "@/components/research/FaqSchema";
import HowToSchema, { type HowToStep } from "@/components/research/HowToSchema";

const SLUG = "what-to-eat-on-glp1-diet-protein-guide";

// HowTo steps correspond 1:1 to the visible <ol> in the "Meal
// timing and structure" section of the article body (sourced from
// Wharton 2022 clinical practice guidance). Google requires HowTo
// steps to map to visible on-page content.
const HOW_TO_STEPS: HowToStep[] = [
  {
    name: "Eat smaller, more frequent meals",
    text: "Three very small meals plus 1–2 small snacks is usually better tolerated than two large meals on a GLP-1. Smaller gastric volumes reduce the nausea trigger from slowed gastric emptying.",
  },
  {
    name: "Stop eating when you feel full",
    text: "Fullness on a GLP-1 comes much earlier than before. Ignoring that first fullness signal triggers nausea within the hour. Retrain your stop signals — stop when full, not when the plate is empty.",
  },
  {
    name: "Eat protein first at every meal",
    text: "Eat the protein portion of every meal before the carbs and vegetables. If you fill up halfway through, at least you got the protein in — critical for preserving lean mass during weight loss.",
  },
  {
    name: "Eat slowly",
    text: "GLP-1s delay the brain's fullness signal slightly. Fast eating produces overeating followed by nausea. Aim for 20–30 minutes per meal to stay in sync with your updated satiety signals.",
  },
  {
    name: "Hydrate between meals, not during",
    text: "Large amounts of water with meals fill the already-slow-emptying stomach faster and trigger nausea. Drink water 30 minutes before or 30 minutes after meals instead.",
  },
];

export async function generateMetadata(): Promise<Metadata> {
  const article = getResearchArticleBySlug(SLUG)!;
  return {
    title: { absolute: article.title },
    description: article.description,
    alternates: { canonical: `/research/${SLUG}` },
    openGraph: {
      title: { absolute: article.title },
      description: article.description,
      type: "article",
      publishedTime: article.publishedDate,
    },
  };
}

export default function DietArticle() {
  const article = getResearchArticleBySlug(SLUG)!;

  const citations = [
    {
      authors:
        "Wilding JPH, Batterham RL, Calanna S, Davies M, Van Gaal LF, Lingvay I, McGowan BM, Rosenstock J, Tran MTD, Wadden TA, Wharton S, Yokote K, Zeuthen N, Kushner RF; STEP 1 Study Group.",
      title:
        "Once-Weekly Semaglutide in Adults with Overweight or Obesity (STEP 1).",
      source: "N Engl J Med",
      year: 2021,
      pmid: "33567185",
    },
    {
      authors:
        "Wilding JPH, Batterham RL, Davies M, Van Gaal LF, Kandler K, Konakli K, Lingvay I, McGowan BM, Oral TK, Rosenstock J, Wadden TA, Wharton S, Yokote K, Kushner RF; STEP 1 Study Group.",
      title:
        "Weight regain and cardiometabolic effects after withdrawal of semaglutide (STEP-1 extension).",
      source: "Diabetes, Obesity and Metabolism",
      year: 2022,
      pmid: "35441470",
    },
    {
      authors:
        "Wharton S, Davies M, Dicker D, Lingvay I, Mosenzon O, Rubino DM, Pedersen SD.",
      title:
        "Managing the gastrointestinal side effects of GLP-1 receptor agonists in obesity: recommendations for clinical practice.",
      source: "Postgraduate Medicine",
      year: 2022,
      pmid: "34775881",
    },
    {
      authors:
        "Morton RW, Murphy KT, McKellar SR, Schoenfeld BJ, Henselmans M, Helms E, Aragon AA, Devries MC, Banfield L, Krieger JW, Phillips SM.",
      title:
        "A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains in muscle mass and strength in healthy adults.",
      source: "British Journal of Sports Medicine",
      year: 2018,
      pmid: "28698222",
    },
    {
      authors:
        "Cava E, Yeat NC, Mittendorfer B.",
      title:
        "Preserving Healthy Muscle during Weight Loss.",
      source: "Advances in Nutrition",
      year: 2017,
      pmid: "28507015",
    },
    {
      authors: "Novo Nordisk Inc.",
      title:
        "WEGOVY (semaglutide) injection — US Prescribing Information, patient counseling section.",
      source: "FDA Approved Labeling",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/215256s024lbl.pdf",
    },
  ];

  return (
    <ResearchArticleLayout article={article}>
      <HowToSchema
        name="How to Eat on a GLP-1: Meal Timing and Structure"
        description="Five evidence-based meal timing and structure rules for patients on semaglutide, tirzepatide, Wegovy, Ozempic, Zepbound, Mounjaro, or Foundayo — sourced from Wharton 2022 clinical practice guidance."
        steps={HOW_TO_STEPS}
        url="https://weightlossrankings.org/research/what-to-eat-on-glp1-diet-protein-guide"
        image="https://weightlossrankings.org/research/what-to-eat-on-glp1-diet-protein-guide/opengraph-image"
        totalTime="PT25M"
      />
      <p data-speakable="lead">
        GLP-1 therapy reduces caloric intake automatically — appetite
        drops, meals get smaller, snacking mostly stops. The problem
        is that when patients eat <em>less of everything</em>, they
        also eat less of the things they specifically need to
        preserve lean mass and keep GI side effects tolerable:
        protein, fiber, and water. This guide walks through the
        evidence-based daily targets for protein, fiber, and
        hydration during GLP-1 therapy, the foods that consistently
        trigger nausea / reflux / constipation on a GLP-1, and what
        to actually eat during the slow-loss plateau phase. Sourced
        from the STEP trial protocols, the Wharton 2022 clinical
        practice review on GI side effect management [3], and the
        nutrition literature on protein intake during weight loss
        [4, 5].
      </p>

      <h2>The three daily targets that matter</h2>

      <p>
        The STEP-1 trial [1] included dietary counseling for every
        participant as part of the protocol — patients were not
        just told to take the drug and eat whatever. The counseling
        emphasized three specific targets that the nutrition
        literature supports independently of GLP-1 therapy [4, 5]:
      </p>

      <table>
        <thead>
          <tr>
            <th>Target</th>
            <th>Daily amount</th>
            <th>Why</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Protein</strong>
            </td>
            <td>1.2-1.6 g per kg of body weight</td>
            <td>Preserve lean mass during weight loss</td>
          </tr>
          <tr>
            <td>
              <strong>Fiber</strong>
            </td>
            <td>25-35 g</td>
            <td>Prevent constipation; improve satiety</td>
          </tr>
          <tr>
            <td>
              <strong>Water</strong>
            </td>
            <td>2-3 liters (68-100 oz)</td>
            <td>
              Prevent dehydration-induced kidney injury (a documented
              label warning) and reduce constipation + fatigue
            </td>
          </tr>
        </tbody>
      </table>

      <h2>Why protein matters more on a GLP-1 than off one</h2>

      <p>
        When the body is in a caloric deficit, it breaks down both
        fat and lean tissue for energy. The ratio depends on protein
        intake and physical activity. The nutrition literature is
        consistent that adequate protein intake (at least 1.2 g/kg,
        ideally 1.6 g/kg) during weight loss{" "}
        <strong>substantially reduces lean mass loss</strong>{" "}
        compared to lower protein intake at the same caloric deficit
        [4, 5]. This is independent of whether the caloric deficit
        comes from diet, exercise, or GLP-1 therapy.
      </p>

      <p>
        The challenge is that GLP-1 therapy blunts appetite
        non-selectively — patients don&apos;t crave protein more
        than carbohydrates, they just want less of everything. This
        means protein intake tends to fall in proportion to total
        intake, and in practice many GLP-1 patients end up well
        below 1.0 g/kg of body weight in protein without realizing
        it. The consequence, documented in our{" "}
        <Link href="/research/semaglutide-muscle-mass-loss">
          semaglutide and muscle mass deep-dive
        </Link>
        , is that up to 40% of total weight lost on <Link href="/drugs/semaglutide">semaglutide</Link> can
        be lean mass in patients who don&apos;t prioritize protein
        and resistance training.
      </p>

      <h3>Practical protein targets for common body weights</h3>

      <table>
        <thead>
          <tr>
            <th>Starting body weight</th>
            <th>Protein target (1.2 g/kg)</th>
            <th>Protein target (1.6 g/kg)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>150 lb (68 kg)</td>
            <td>82 g</td>
            <td>109 g</td>
          </tr>
          <tr>
            <td>200 lb (91 kg)</td>
            <td>109 g</td>
            <td>146 g</td>
          </tr>
          <tr>
            <td>250 lb (113 kg)</td>
            <td>136 g</td>
            <td>181 g</td>
          </tr>
          <tr>
            <td>300 lb (136 kg)</td>
            <td>163 g</td>
            <td>218 g</td>
          </tr>
        </tbody>
      </table>

      <p>
        For most patients, the practical target is somewhere in the
        1.2-1.4 g/kg range, which translates to roughly 100-150 g
        of protein per day for the typical adult. On a GLP-1, this
        is harder than it sounds because the appetite suppression
        is real — so the strategy becomes{" "}
        <em>protein-first eating</em>: eat the protein portion of
        every meal before the carbohydrates and vegetables.
      </p>

      <h3>Protein-dense foods that work on a GLP-1</h3>

      <ul>
        <li>
          <strong>Greek yogurt (non-fat or 2%):</strong> 15-20 g
          protein per cup, easy to eat when appetite is low,
          generally well-tolerated on a GLP-1
        </li>
        <li>
          <strong>Cottage cheese:</strong> 25 g protein per cup,
          excellent protein density
        </li>
        <li>
          <strong>Eggs:</strong> 6 g protein per egg, small
          serving size is GLP-1-friendly
        </li>
        <li>
          <strong>Chicken breast:</strong> ~30 g per 100g serving;
          lean and easy to digest
        </li>
        <li>
          <strong>Fish (salmon, tuna, white fish):</strong> 20-25
          g per serving, omega-3s are a bonus
        </li>
        <li>
          <strong>Whey or plant-based protein shakes:</strong>{" "}
          20-30 g per serving, liquid format is often tolerated
          when solid food isn&apos;t
        </li>
        <li>
          <strong>Lean ground beef or turkey:</strong> 20-25 g per
          100g serving
        </li>
        <li>
          <strong>Tofu and tempeh:</strong> 15-20 g per 100g
          serving, plant-based option
        </li>
      </ul>

      <h2>Fiber and hydration</h2>

      <p>
        The most common documented non-nausea GI complaint on
        GLP-1 therapy is constipation [3]. The mechanism is partly
        drug-specific (GLP-1s slow GI transit) and partly dietary
        — reduced total food intake means reduced fiber and water
        intake, which amplifies the constipation. The fix is
        direct:
      </p>

      <ul>
        <li>
          <strong>Fiber target: 25-35 g per day.</strong> Most
          patients on a GLP-1 end up well below this because the
          fiber-rich foods (whole grains, beans, vegetables) are
          filling and get displaced by more appealing options.
          Prioritize vegetables at every meal, add berries and
          high-fiber fruit, include beans or lentils where
          possible.
        </li>
        <li>
          <strong>Water target: 2-3 liters per day.</strong>{" "}
          Patients consistently under-drink on GLP-1s because
          thirst sensation is blunted along with appetite.
          Chronic mild dehydration manifests as fatigue (see our{" "}
          <Link href="/research/glp1-side-effects-fatigue-hair-loss-duration">
            side effects duration guide
          </Link>
          ) and increases constipation. Set a daily water target
          and track it; don&apos;t rely on thirst alone.
        </li>
      </ul>

      <h2>Foods that commonly trigger nausea on a GLP-1</h2>

      <p>
        The Wharton 2022 clinical practice review [3] documented the
        most common patient-reported nausea triggers. These aren&apos;t
        absolute rules — individuals vary — but the pattern is
        consistent:
      </p>

      <ul>
        <li>
          <strong>High-fat meals.</strong> The slowed gastric
          emptying effect of GLP-1s is amplified by fatty foods,
          which take longer to digest and tend to sit in the
          stomach. Fried foods, heavy cream sauces, and greasy
          fast food produce the worst post-meal nausea.
        </li>
        <li>
          <strong>Large portions.</strong> Eating past fullness
          consistently triggers nausea and vomiting. Most patients
          need to reduce portion sizes dramatically — meals that
          would have been normal before starting the drug are now
          too much.
        </li>
        <li>
          <strong>Sugary drinks and desserts.</strong> Rapid sugar
          intake can produce a dumping-syndrome-like response on a
          GLP-1 with nausea, sweating, and rapid heart rate.
          Patients often report becoming more &ldquo;sugar-
          sensitive&rdquo; on therapy.
        </li>
        <li>
          <strong>Alcohol.</strong> Alcohol amplifies GLP-1 nausea
          and can cause unexpected intoxication because of delayed
          gastric emptying. Many patients report they cannot
          tolerate the amount of alcohol they used to drink.
        </li>
        <li>
          <strong>Very spicy or very acidic foods.</strong> These
          can amplify the mild reflux that some patients develop
          on GLP-1 therapy.
        </li>
        <li>
          <strong>Carbonated drinks.</strong> Bloating and GI
          discomfort are more common on GLP-1 therapy, and
          carbonation amplifies both.
        </li>
      </ul>

      <h2>Foods that are consistently well-tolerated</h2>

      <ul>
        <li>Lean protein sources listed above</li>
        <li>Plain rice, quinoa, oatmeal</li>
        <li>Bananas, apples, berries</li>
        <li>Cooked vegetables (softer than raw)</li>
        <li>Broth-based soups</li>
        <li>Plain crackers</li>
        <li>Room-temperature foods (hot food sometimes worsens nausea)</li>
      </ul>

      <h2>Meal timing and structure</h2>

      <p>
        The clinical practice guidance from Wharton 2022 [3] and
        patient-experience consensus converges on a few practical
        eating patterns that work better than others on GLP-1
        therapy:
      </p>

      <ol>
        <li>
          <strong>Smaller, more frequent meals.</strong> Three
          very small meals plus 1-2 small snacks is usually better
          tolerated than two large meals.
        </li>
        <li>
          <strong>Stop eating when you feel full, not when the
          plate is empty.</strong> Full on a GLP-1 comes earlier
          than before and ignoring it triggers nausea within the
          hour. Re-train your stop signals.
        </li>
        <li>
          <strong>Protein first.</strong> Eat the protein portion
          of every meal first. If you fill up halfway through, at
          least you got the protein in.
        </li>
        <li>
          <strong>Eat slowly.</strong> GLP-1s delay the fullness
          signal from reaching the brain slightly, so fast eating
          produces overeating followed by nausea. Aim for 20-30
          minutes per meal.
        </li>
        <li>
          <strong>Hydrate between meals, not during.</strong>{" "}
          Drinking large amounts of water with meals fills the
          already-slow-emptying stomach faster and triggers
          nausea. Drink water 30 minutes before or after meals
          instead.
        </li>
      </ol>

      <h2>What to eat during the slow-loss plateau</h2>

      <p>
        As covered in our{" "}
        <Link href="/research/why-am-i-not-losing-weight-glp1-plateau">
          plateau guide
        </Link>
        , the weight loss curve naturally flattens after week 40-52.
        During the plateau phase, body composition becomes more
        important than body weight — the goal is to lose fat, not
        muscle. The dietary adjustments for the plateau phase:
      </p>

      <ul>
        <li>
          <strong>Prioritize protein at the higher end of the
          range (1.4-1.6 g/kg)</strong> to preserve lean mass as
          you enter the slow phase.
        </li>
        <li>
          <strong>Add resistance training 2-3 times per week.</strong>{" "}
          The combination of adequate protein and resistance
          training is the only intervention in the literature
          that consistently preserves lean mass during weight
          loss [4, 5].
        </li>
        <li>
          <strong>Track waist circumference</strong> in addition to
          body weight — a flat scale with a shrinking waist is a
          good sign during the plateau phase.
        </li>
        <li>
          <strong>Don&apos;t increase the caloric deficit further.</strong>{" "}
          GLP-1s already produce a significant deficit and
          pushing it further typically just accelerates lean mass
          loss without producing more fat loss.
        </li>
      </ul>

      <h2>Alcohol and GLP-1s — a specific note</h2>

      <p>
        Many patients report dramatically reduced alcohol tolerance
        on GLP-1 therapy. This is consistent with the emerging
        literature on GLP-1 effects on the brain reward system
        (covered in our{" "}
        <Link href="/research/glp1-alcohol-use-disorder-evidence">
          GLP-1 and alcohol use disorder deep-dive
        </Link>
        ). Practical implications:
      </p>

      <ul>
        <li>
          Expect to drink significantly less than you used to — the
          same 2 drinks may feel like 4 on a GLP-1.
        </li>
        <li>
          Alcohol amplifies GLP-1 nausea, especially when combined
          with food.
        </li>
        <li>
          Alcohol calories still count — liquid calories are
          famously easy to under-track, and they can offset a
          meaningful portion of the caloric deficit the drug is
          producing.
        </li>
      </ul>

      <h2>Related research and tools</h2>

      <p>
        For the lean-mass preservation protocol with exact protein
        and resistance training targets, see our{" "}
        <Link href="/research/semaglutide-muscle-mass-loss">
          semaglutide and muscle mass deep-dive
        </Link>
        . For managing the GI side effects that eating patterns can
        amplify or reduce, see our{" "}
        <Link href="/research/glp1-side-effects-fatigue-hair-loss-duration">
          side effects duration guide
        </Link>
        . For the plateau phase eating strategy, see our{" "}
        <Link href="/research/why-am-i-not-losing-weight-glp1-plateau">
          plateau guide
        </Link>
        . For the trial-curve timing that determines when each
        phase begins, see our{" "}
        <Link href="/research/how-long-does-glp1-take-to-work">
          onset guide
        </Link>
        . For the alcohol context, see our{" "}
        <Link href="/research/glp1-alcohol-use-disorder-evidence">
          GLP-1 and alcohol deep-dive
        </Link>
        .
      </p>

      <References items={citations} />
      <FaqSchema
        items={[
          {
            question: "What should I eat on Wegovy or Zepbound?",
            answer:
              "The published lean-mass-preservation literature converges on three priorities for patients losing weight on a GLP-1: (1) high protein — 1.6-2.0 g per kg body weight per day, distributed evenly across meals; (2) adequate calories — don't drop so low that the body catabolizes muscle for fuel; (3) resistance training. Beyond those three, food choices are flexible — Mediterranean, lower-carb, and balanced approaches all work if they hit the protein target.",
          },
          {
            question: "How much protein should I eat on a GLP-1?",
            answer:
              "Most published guidelines for adults losing weight while preserving lean mass land in the 1.6-2.0 g/kg/day range. The Neeland 2024 GLP-1 lean-mass mitigation review specifically recommends this range for patients on semaglutide and tirzepatide. For a 200-lb (91 kg) patient that's roughly 145-180 g of protein per day, ideally split across 3 meals at ~50-60 g each.",
          },
          {
            question: "Can I do low-carb or keto on a GLP-1?",
            answer:
              "Yes, but watch for compounding side effects. GLP-1s already slow gastric emptying and can cause constipation; very low-carb diets can amplify constipation through reduced fiber and water binding. Patients who tolerate keto pre-GLP-1 generally do fine, but increase fiber, hydration, and electrolytes (sodium, potassium, magnesium) to compensate.",
          },
          {
            question: "What foods make GLP-1 nausea worse?",
            answer:
              "High-fat, fried, very greasy, or very large meals consistently trigger nausea in GLP-1 patients because they slow gastric emptying further. Spicy and very sweet foods can also be problematic. Bland, lower-fat, smaller, more frequent meals are typically better tolerated, especially during the first 2-4 weeks and after each dose escalation.",
          },
          {
            question: "Do I need to count calories on a GLP-1?",
            answer:
              "Not necessarily. GLP-1s naturally suppress appetite, so most patients eat less without tracking. The risk goes the other direction: many patients eat too little, which compounds lean-mass loss and fatigue. A reasonable practice is to track protein (hit your target every day) and let calories find their natural floor — but don't go below ~1,200/day for women or ~1,500/day for men without clinical supervision.",
          },
        ]}
      />
    </ResearchArticleLayout>
  );
}
