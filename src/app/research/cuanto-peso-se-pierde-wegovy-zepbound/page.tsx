import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References from "@/components/research/References";
import FaqSchema, { type FaqItem } from "@/components/research/FaqSchema";

const SLUG = "cuanto-peso-se-pierde-wegovy-zepbound";

// FAQPage JSON-LD en español. Todas las cifras provienen directamente
// de las publicaciones NEJM y JAMA de STEP-1 (PMID 33567185),
// SURMOUNT-1 (PMID 35658024), STEP-4 (PMID 33755728) y SURMOUNT-4
// (PMID 38078870), verificadas contra los resúmenes oficiales en
// PubMed antes de la publicación.
const FAQ_ITEMS: FaqItem[] = [
  {
    question: "¿Cuánto peso se pierde en promedio con Wegovy?",
    answer:
      "En el ensayo clínico STEP-1 (Wilding, NEJM 2021) los adultos con sobrepeso u obesidad sin diabetes perdieron en promedio 14.9% de su peso corporal con semaglutida 2.4 mg (Wegovy) a las 68 semanas, frente a 2.4% con placebo. En términos absolutos, la pérdida promedio fue de 15.3 kg con Wegovy y 2.6 kg con placebo.",
  },
  {
    question: "¿Cuánto peso se pierde con Zepbound?",
    answer:
      "En el ensayo SURMOUNT-1 (Jastreboff, NEJM 2022) los adultos con sobrepeso u obesidad sin diabetes perdieron en promedio 20.9% de su peso corporal con tirzepatida 15 mg (Zepbound) a las 72 semanas, frente a 3.1% con placebo. La dosis de 10 mg produjo una pérdida del 19.5% y la de 5 mg del 15.0%.",
  },
  {
    question: "¿Qué porcentaje de pacientes pierden al menos 10% de su peso con Wegovy?",
    answer:
      "En STEP-1, el 69.1% de los pacientes con Wegovy alcanzó una pérdida de al menos 10% del peso corporal a las 68 semanas, frente al 12.0% con placebo. Para el umbral de 15%, las cifras fueron 50.5% con Wegovy y 4.9% con placebo.",
  },
  {
    question: "¿Qué pasa si dejo de tomar Wegovy o Zepbound?",
    answer:
      "Los ensayos clínicos de retirada muestran que al suspender el fármaco la mayoría de los pacientes recupera una parte importante del peso perdido. En STEP-4 (Rubino, JAMA 2021), los participantes que cambiaron a placebo ganaron 6.9% del peso en 48 semanas, mientras que los que continuaron con Wegovy siguieron perdiendo peso (-7.9%). En SURMOUNT-4 (Aronne, JAMA 2024), los que cambiaron a placebo ganaron 14.0% en 52 semanas mientras que los que continuaron con tirzepatida perdieron 5.5% adicional.",
  },
  {
    question: "¿Wegovy o Zepbound funcionan mejor?",
    answer:
      "En comparaciones indirectas entre STEP-1 (Wegovy) y SURMOUNT-1 (Zepbound), la tirzepatida 15 mg produjo una pérdida de peso promedio mayor (20.9%) que la semaglutida 2.4 mg (14.9%). Sin embargo, los ensayos se realizaron en poblaciones y tiempos distintos, por lo que la comparación no es de cabeza a cabeza. La elección depende también de cobertura de seguro, tolerabilidad y disponibilidad.",
  },
  {
    question: "¿Cuánto peso se pierde con Ozempic?",
    answer:
      "Ozempic es la marca de semaglutida aprobada por la FDA para diabetes tipo 2, no para el manejo del peso. Se usa en dosis menores (0.5 a 2 mg) que Wegovy (2.4 mg), por lo que la pérdida de peso suele ser menor — habitualmente entre 6% y 10% en los ensayos SUSTAIN realizados en pacientes con diabetes tipo 2. Para el manejo del peso, la FDA aprobó Wegovy, no Ozempic.",
  },
];

export async function generateMetadata(): Promise<Metadata> {
  const article = getResearchArticleBySlug(SLUG)!;
  return {
    title: { absolute: article.title },
    description: article.description,
    alternates: {
      canonical: `/es/research/${SLUG}`,
      languages: {
        "en-US": "/research/glp1-weight-loss-calculator",
        "es-US": `/es/research/${SLUG}`,
        es: `/es/research/${SLUG}`,
        "x-default": "/research/glp1-weight-loss-calculator",
      },
    },
    openGraph: {
      title: { absolute: article.title },
      description: article.description,
      type: "article",
      locale: "es_US",
      publishedTime: article.publishedDate,
    },
  };
}

export default function CuantoPesoSePiereWegovyZepboundArticle() {
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
        "Jastreboff AM, Aronne LJ, Ahmad NN, Wharton S, Connery L, Alves B, Kiyosue A, Zhang S, Liu B, Bunck MC, Stefanski A; SURMOUNT-1 Investigators.",
      title:
        "Tirzepatide Once Weekly for the Treatment of Obesity (SURMOUNT-1).",
      source: "N Engl J Med",
      year: 2022,
      pmid: "35658024",
    },
    {
      authors:
        "Rubino D, Abrahamsson N, Davies M, Hesse D, Greenway FL, Jensen C, Lingvay I, Mosenzon O, Rosenstock J, Rubio MA, Rudofsky G, Tadayon S, Wadden TA, Dicker D; STEP 4 Investigators.",
      title:
        "Effect of Continued Weekly Subcutaneous Semaglutide vs Placebo on Weight Loss Maintenance in Adults With Overweight or Obesity: The STEP 4 Randomized Clinical Trial.",
      source: "JAMA",
      year: 2021,
      pmid: "33755728",
    },
    {
      authors:
        "Aronne LJ, Sattar N, Horn DB, Bays HE, Wharton S, Lin WY, Ahmad NN, Zhang S, Liao R, Bunck MC, Jouravskaya I, Murphy MA; SURMOUNT-4 Investigators.",
      title:
        "Continued Treatment With Tirzepatide for Maintenance of Weight Reduction in Adults With Obesity: The SURMOUNT-4 Randomized Clinical Trial.",
      source: "JAMA",
      year: 2024,
      pmid: "38078870",
    },
    {
      authors: "Novo Nordisk Inc.",
      title:
        "WEGOVY (semaglutide) injection — Información de prescripción aprobada por la FDA, Sección 14 Estudios Clínicos.",
      source: "FDA Approved Labeling",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2023/215256s007lbl.pdf",
    },
    {
      authors: "Eli Lilly and Company.",
      title:
        "ZEPBOUND (tirzepatide) injection — Información de prescripción aprobada por la FDA, Sección 14 Estudios Clínicos.",
      source: "FDA Approved Labeling",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/217806s003lbl.pdf",
    },
  ];

  return (
    <ResearchArticleLayout article={article}>
      <FaqSchema items={FAQ_ITEMS} />

      <div className="mb-6 rounded-lg border border-brand-violet/20 bg-brand-violet/5 p-4 text-sm text-brand-text-secondary">
        Esta guía en español compara la pérdida de peso promedio de Wegovy
        (semaglutida 2.4 mg) y Zepbound (tirzepatida 15 mg) en los ensayos
        clínicos clave, los porcentajes de pacientes que alcanzan cada
        umbral de pérdida, y lo que sucede al suspender el fármaco. Todas
        las cifras provienen de las publicaciones en{" "}
        <em>New England Journal of Medicine</em> y <em>JAMA</em> de los
        ensayos STEP-1, SURMOUNT-1, STEP-4 y SURMOUNT-4, verificadas
        directamente contra los resúmenes oficiales en PubMed.
      </div>

      <p data-speakable="lead">
        La pregunta más frecuente de los pacientes que consideran empezar
        un agonista del receptor de GLP-1 para bajar de peso es
        simplemente: <em>¿cuánto voy a perder?</em>. La respuesta basada en
        ensayos clínicos aleatorizados es que, en promedio, los adultos
        con sobrepeso u obesidad sin diabetes pierden alrededor del
        <strong> 14.9% del peso corporal con Wegovy</strong> (semaglutida
        2.4 mg) a las 68 semanas [1] y alrededor del{" "}
        <strong>20.9% con Zepbound</strong> (tirzepatida 15 mg) a las 72
        semanas [2]. Esta guía recorre las cifras exactas, qué porcentaje
        de pacientes alcanza cada umbral, y qué sucede con el peso si se
        suspende el tratamiento.
      </p>

      <h2>Wegovy (semaglutida 2.4 mg): los datos de STEP-1</h2>

      <p>
        STEP-1 fue el ensayo pivote que llevó a la aprobación de Wegovy
        por la FDA para el manejo crónico del peso [1]. Fue un ensayo
        aleatorizado, doble ciego y controlado con placebo en 1,961
        adultos con sobrepeso u obesidad sin diabetes tipo 2, publicado
        en <em>New England Journal of Medicine</em> en 2021 (Wilding et
        al., PMID 33567185). Los pacientes recibieron inyecciones
        subcutáneas semanales durante 68 semanas, con una escalada de
        16 semanas hasta la dosis de mantenimiento de 2.4 mg.
      </p>

      <h3>Pérdida de peso promedio en STEP-1</h3>

      <table>
        <thead>
          <tr>
            <th>Medida</th>
            <th>Semaglutida 2.4 mg</th>
            <th>Placebo</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Cambio de peso a las 68 semanas (%)</td>
            <td>−14.9%</td>
            <td>−2.4%</td>
          </tr>
          <tr>
            <td>Cambio de peso a las 68 semanas (kg)</td>
            <td>−15.3 kg</td>
            <td>−2.6 kg</td>
          </tr>
          <tr>
            <td>Pacientes que perdieron ≥5% del peso</td>
            <td>86.4%</td>
            <td>31.5%</td>
          </tr>
          <tr>
            <td>Pacientes que perdieron ≥10% del peso</td>
            <td>69.1%</td>
            <td>12.0%</td>
          </tr>
          <tr>
            <td>Pacientes que perdieron ≥15% del peso</td>
            <td>50.5%</td>
            <td>4.9%</td>
          </tr>
        </tbody>
      </table>

      <p>
        La interpretación práctica: aproximadamente{" "}
        <strong>7 de cada 10 pacientes</strong> que toman Wegovy a la
        dosis de mantenimiento durante más de un año pierden al menos
        10% del peso corporal, y <strong>la mitad</strong> pierde al
        menos 15%. Todos estos porcentajes se combinaron con asesoría
        sobre dieta y ejercicio durante las 68 semanas [1].
      </p>

      <h2>Zepbound (tirzepatida 15 mg): los datos de SURMOUNT-1</h2>

      <p>
        SURMOUNT-1 fue el ensayo pivote que llevó a la aprobación de
        Zepbound por la FDA en noviembre de 2023 [2]. Fue un ensayo
        aleatorizado, doble ciego y controlado con placebo en 2,539
        adultos con sobrepeso u obesidad sin diabetes tipo 2 (peso
        corporal promedio al inicio: 104.8 kg; IMC promedio: 38.0),
        publicado en <em>New England Journal of Medicine</em> en 2022
        (Jastreboff et al., PMID 35658024). Los pacientes recibieron
        inyecciones subcutáneas semanales durante 72 semanas, repartidos
        en 4 grupos iguales: placebo, tirzepatida 5 mg, 10 mg y 15 mg.
      </p>

      <h3>Pérdida de peso promedio en SURMOUNT-1</h3>

      <table>
        <thead>
          <tr>
            <th>Dosis</th>
            <th>Pérdida promedio a las 72 semanas</th>
            <th>≥5% del peso</th>
            <th>≥20% del peso</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Tirzepatida 5 mg</td>
            <td>−15.0%</td>
            <td>85%</td>
            <td>—</td>
          </tr>
          <tr>
            <td>Tirzepatida 10 mg</td>
            <td>−19.5%</td>
            <td>89%</td>
            <td>50%</td>
          </tr>
          <tr>
            <td>Tirzepatida 15 mg</td>
            <td>−20.9%</td>
            <td>91%</td>
            <td>57%</td>
          </tr>
          <tr>
            <td>Placebo</td>
            <td>−3.1%</td>
            <td>35%</td>
            <td>3%</td>
          </tr>
        </tbody>
      </table>

      <p>
        La interpretación práctica: más del{" "}
        <strong>90% de los pacientes</strong> que toman Zepbound 15 mg
        durante más de un año pierden al menos 5% del peso corporal, y{" "}
        <strong>más de la mitad</strong> pierde al menos 20% [2]. Esta
        última cifra — el umbral del 20% — es aproximadamente 19 veces
        más alta que con placebo (57% frente al 3%).
      </p>

      <h2>Comparación indirecta: Wegovy frente a Zepbound</h2>

      <p>
        Los ensayos STEP-1 y SURMOUNT-1 no compararon Wegovy y Zepbound
        de cabeza a cabeza. Cada fármaco se evaluó contra placebo en
        poblaciones distintas y en años distintos. Dicho esto, las
        cifras promedio sugieren que la tirzepatida a la dosis máxima
        (20.9%) produce una pérdida de peso mayor que la semaglutida a
        la dosis máxima (14.9%) en una población similar [1, 2].
      </p>

      <p>
        Existe un ensayo comparativo directo en diabetes tipo 2
        (SURPASS-2, Frías et al., NEJM 2021) que mostró que la
        tirzepatida produce una mayor pérdida de peso que la
        semaglutida 1 mg en pacientes diabéticos, pero no hay un ensayo
        aleatorizado cabeza a cabeza en pacientes con obesidad sin
        diabetes que compare las dosis máximas aprobadas para el manejo
        del peso. La elección entre los dos fármacos también depende de
        la cobertura del seguro, la disponibilidad en farmacia, la
        tolerabilidad individual y el costo.
      </p>

      <h2>Qué sucede al suspender el tratamiento</h2>

      <p>
        Esta es una de las preguntas más importantes — y una de las
        menos comunicadas en las consultas iniciales. Dos ensayos
        aleatorizados han medido directamente lo que ocurre cuando se
        interrumpe el fármaco después de haber perdido peso.
      </p>

      <h3>STEP-4: retirada de Wegovy</h3>

      <p>
        En STEP-4 (Rubino et al., <em>JAMA</em> 2021, PMID 33755728),
        803 participantes tomaron semaglutida 2.4 mg durante una fase
        abierta de 20 semanas. Al llegar a la semana 20, los pacientes
        se asignaron aleatoriamente a dos grupos: uno continuó con
        Wegovy y el otro cambió a placebo. Ambos grupos siguieron
        recibiendo asesoría sobre dieta y ejercicio durante 48 semanas
        adicionales (hasta la semana 68).
      </p>

      <ul>
        <li>
          <strong>Grupo que continuó con Wegovy:</strong> siguió
          perdiendo peso, un <strong>−7.9% adicional</strong> entre las
          semanas 20 y 68.
        </li>
        <li>
          <strong>Grupo que cambió a placebo:</strong>{" "}
          <strong>recuperó +6.9% del peso</strong> entre las semanas 20
          y 68.
        </li>
        <li>
          Diferencia entre grupos: 14.8 puntos porcentuales a favor de
          continuar con Wegovy (P &lt; 0.001).
        </li>
      </ul>

      <h3>SURMOUNT-4: retirada de Zepbound</h3>

      <p>
        En SURMOUNT-4 (Aronne et al., <em>JAMA</em> 2024, PMID
        38078870), los participantes tomaron tirzepatida a la dosis
        máxima tolerada durante una fase abierta de 36 semanas. Al
        llegar a la semana 36, 670 pacientes se asignaron
        aleatoriamente: uno continuó con tirzepatida y el otro cambió
        a placebo durante las siguientes 52 semanas.
      </p>

      <ul>
        <li>
          <strong>Grupo que continuó con Zepbound:</strong> perdió un
          <strong> −5.5% adicional</strong> entre las semanas 36 y 88.
        </li>
        <li>
          <strong>Grupo que cambió a placebo:</strong>{" "}
          <strong>recuperó +14.0% del peso</strong> entre las semanas
          36 y 88.
        </li>
        <li>
          Diferencia entre grupos: 19.4 puntos porcentuales a favor de
          continuar con Zepbound (P &lt; 0.001).
        </li>
      </ul>

      <p>
        <strong>La conclusión honesta:</strong> estos dos fármacos
        funcionan mientras se toman. Al suspenderlos, la mayoría de los
        pacientes recupera una parte importante del peso perdido dentro
        del primer año. El manejo del peso con agonistas del receptor
        de GLP-1 es un tratamiento crónico, no un curso temporal. Esta
        es una conversación que los pacientes deben tener con su médico
        antes de iniciar el tratamiento.
      </p>

      <h2>¿Y con Ozempic?</h2>

      <p>
        <Link
          href="/es/research/wegovy-vs-ozempic-diferencias"
          className="text-brand-violet hover:underline"
        >
          Ozempic y Wegovy contienen el mismo principio activo
          (semaglutida)
        </Link>{" "}
        pero se aprobaron para indicaciones y dosis distintas. Ozempic
        está aprobado por la FDA para la diabetes tipo 2 y se usa en
        dosis de 0.5 a 2 mg por semana. Wegovy está aprobado para el
        manejo crónico del peso y se usa en dosis de hasta 2.4 mg por
        semana. En los ensayos SUSTAIN de semaglutida 1 mg en pacientes
        con diabetes tipo 2, la pérdida de peso promedio fue de
        aproximadamente 6% a 10% del peso corporal — menor que en
        STEP-1 por dos razones: la dosis es más baja y la población con
        diabetes tipo 2 suele perder menos peso con los GLP-1 que la
        población sin diabetes.
      </p>

      <h2>Lo que las cifras promedio no dicen</h2>

      <p>
        Un punto importante para interpretar los promedios de 14.9% y
        20.9%: estos son <strong>promedios de población</strong>. La
        respuesta individual es muy variable. En STEP-1, alrededor del
        14% de los pacientes con Wegovy no alcanzó el umbral del 5% a
        pesar de completar las 68 semanas, mientras que otros superaron
        el 20%. En SURMOUNT-1, el 57% del grupo de 15 mg alcanzó el
        umbral del 20%, pero el 43% restante se quedó por debajo.
        Factores que influyen en la respuesta individual incluyen la
        adherencia a las inyecciones semanales, la calidad de la dieta,
        el nivel de actividad física, el estado hormonal, el peso
        inicial y factores genéticos aún en investigación.
      </p>

      <h2>Lecturas relacionadas en español</h2>

      <ul>
        <li>
          <Link
            href="/es/research/cuanto-tarda-glp1-en-hacer-efecto"
            className="text-brand-violet hover:underline"
          >
            ¿Cuánto tarda el GLP-1 en hacer efecto?
          </Link>{" "}
          — la línea de tiempo semana a semana de la pérdida de peso.
        </li>
        <li>
          <Link
            href="/es/research/semaglutida-efectos-secundarios-duracion"
            className="text-brand-violet hover:underline"
          >
            Semaglutida: cuánto duran los efectos secundarios
          </Link>
          {" "}— el calendario de la escalada de 16 semanas.
        </li>
        <li>
          <Link
            href="/es/research/wegovy-vs-ozempic-diferencias"
            className="text-brand-violet hover:underline"
          >
            Wegovy vs Ozempic: diferencias
          </Link>
          {" "}— por qué contienen el mismo principio activo pero no son
          intercambiables.
        </li>
        <li>
          <Link
            href="/es/research/ozempic-precio-costo-comprar"
            className="text-brand-violet hover:underline"
          >
            Ozempic: precio, costo y cómo comprar
          </Link>
          {" "}— costos y opciones de cobertura en Estados Unidos.
        </li>
      </ul>

      <div className="mt-8 rounded-lg border border-brand-violet/20 bg-brand-bg-purple/30 p-4 text-sm text-brand-text-secondary">
        <strong>Aviso médico:</strong> esta guía es informativa y no
        sustituye la consulta médica. Wegovy y Zepbound son
        medicamentos con receta y deben ser iniciados y monitoreados
        por un profesional de la salud. Las cifras promedio de los
        ensayos clínicos no predicen la respuesta individual. Consulte
        con su médico para entender qué resultado puede esperar usted
        en particular.
      </div>

      <References items={citations} />
    </ResearchArticleLayout>
  );
}
