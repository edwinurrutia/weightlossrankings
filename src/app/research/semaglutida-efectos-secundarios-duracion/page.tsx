import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References from "@/components/research/References";
import FaqSchema, { type FaqItem } from "@/components/research/FaqSchema";

const SLUG = "semaglutida-efectos-secundarios-duracion";

// FAQPage JSON-LD en español. Cada pregunta corresponde a una sección
// H2 del cuerpo del artículo. Todas las cifras provienen de STEP-1
// (PMID 33567185), SURMOUNT-1 (PMID 35658024), la información de
// prescripción aprobada por la FDA para Wegovy y Zepbound, y la
// revisión de la FDA de 2024 sobre ideación suicida.
const FAQ_ITEMS: FaqItem[] = [
  {
    question: "¿Cuánto duran las náuseas de la semaglutida?",
    answer:
      "En STEP-1 las náuseas se reportaron en el 43.9% de los pacientes con semaglutida 2.4 mg frente al 16.1% con placebo. La mayoría fueron leves a moderadas y transitorias, con mayor intensidad en las primeras 2 a 4 semanas después de cada aumento de dosis y resolución progresiva al llegar a la dosis de mantenimiento.",
  },
  {
    question: "¿Cuánto tiempo tarda el cuerpo en adaptarse a la semaglutida?",
    answer:
      "La escalada estándar de Wegovy es de 16 semanas (0.25 → 0.5 → 1.0 → 1.7 → 2.4 mg). Las reacciones gastrointestinales son más intensas en las primeras 2 a 4 semanas después de cada aumento y luego disminuyen. La mayoría de los pacientes reportan estabilización aproximadamente en la semana 20, ya en dosis de mantenimiento.",
  },
  {
    question: "¿Se puede retrasar la escalada de dosis si los efectos secundarios son fuertes?",
    answer:
      "Sí. La información de prescripción aprobada por la FDA de Wegovy indica que, en caso de intolerancia al aumento de dosis, se puede retrasar el siguiente paso 4 semanas adicionales, lo que suele mejorar la tolerabilidad. Esta decisión debe tomarla su médico.",
  },
  {
    question: "¿La caída de cabello con semaglutida es permanente?",
    answer:
      "No. La caída de cabello reportada en los ensayos de Wegovy (2.5% frente al 1.0% con placebo) es una forma de efluvio telógeno asociada a la pérdida rápida de peso, no a la toxicidad directa del fármaco. Suele comenzar 2 a 4 meses después de una pérdida de peso importante y el crecimiento vuelve a la normalidad después de 3 a 6 meses.",
  },
  {
    question: "¿Cuándo debo llamar al médico por un efecto secundario de la semaglutida?",
    answer:
      "Acuda al médico de inmediato si aparece dolor abdominal intenso y persistente (posible pancreatitis), dolor en el cuadrante superior derecho con fiebre o ictericia (posible problema de vesícula), dificultad para respirar, un bulto en el cuello, ronquera, dificultad para tragar, o deshidratación por vómitos o diarrea que no mejoran en 24 a 48 horas. Estos son signos que aparecen en la información de prescripción aprobada por la FDA.",
  },
  {
    question: "¿La semaglutida causa depresión o pensamientos suicidas?",
    answer:
      "En 2024 la FDA publicó un metaanálisis de 91 ensayos clínicos aleatorizados controlados con placebo (107,910 pacientes) y no encontró aumento del riesgo de ideación o comportamiento suicida con los agonistas del receptor de GLP-1. La revisión del PRAC de la EMA llegó a la misma conclusión en abril de 2024. La etiqueta de Wegovy no lleva una advertencia formal por ideación suicida.",
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
        "en-US": "/research/glp1-side-effects-fatigue-hair-loss-duration",
        "es-US": `/es/research/${SLUG}`,
        es: `/es/research/${SLUG}`,
        "x-default": "/research/glp1-side-effects-fatigue-hair-loss-duration",
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

export default function SemaglutidaEfectosSecundariosDuracionArticle() {
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
      authors: "Novo Nordisk Inc.",
      title:
        "WEGOVY (semaglutide) injection — Información de prescripción aprobada por la FDA, Sección 2 Dosis y Administración y Sección 6 Reacciones Adversas.",
      source: "FDA Approved Labeling",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2023/215256s007lbl.pdf",
    },
    {
      authors: "Novo Nordisk Inc.",
      title:
        "OZEMPIC (semaglutide) injection — Información de prescripción aprobada por la FDA, Sección 5 Advertencias y Precauciones.",
      source: "FDA Approved Labeling",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/209637s035,209637s037lbl.pdf",
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
      authors: "U.S. Food and Drug Administration.",
      title:
        "Update on FDA's ongoing evaluation of reports of suicidal thoughts or actions in patients taking a certain type of medicines approved for type 2 diabetes and obesity.",
      source: "FDA Drug Safety Communication",
      year: 2024,
      url: "https://www.fda.gov/drugs/drug-safety-and-availability/update-fdas-ongoing-evaluation-reports-suicidal-thoughts-or-actions-patients-taking-certain-type",
    },
    {
      authors: "European Medicines Agency.",
      title:
        "Revisión del PRAC sobre los agonistas del receptor de GLP-1 y el riesgo de pensamientos suicidas y autolesiones — concluida en abril de 2024.",
      source: "EMA Pharmacovigilance Risk Assessment Committee",
      year: 2024,
      url: "https://www.ema.europa.eu/en/news/meeting-highlights-pharmacovigilance-risk-assessment-committee-prac-8-11-april-2024",
    },
  ];

  return (
    <ResearchArticleLayout article={article}>
      <FaqSchema items={FAQ_ITEMS} />

      <div className="mb-6 rounded-lg border border-brand-violet/20 bg-brand-violet/5 p-4 text-sm text-brand-text-secondary">
        Esta guía en español se centra en la <strong>duración</strong> y el{" "}
        <strong>momento</strong> de los efectos secundarios de la semaglutida
        (Wegovy, Ozempic). Para el catálogo completo de reacciones adversas
        con preguntas y respuestas, consulte nuestra guía de
        {" "}
        <Link
          href="/es/research/efectos-secundarios-glp1-preguntas-respuestas"
          className="text-brand-violet hover:underline"
        >
          efectos secundarios del GLP-1: preguntas y respuestas
        </Link>
        . Para el tiempo hasta el efecto clínico, consulte{" "}
        <Link
          href="/es/research/cuanto-tarda-glp1-en-hacer-efecto"
          className="text-brand-violet hover:underline"
        >
          cuánto tarda el GLP-1 en hacer efecto
        </Link>
        .
      </div>

      <p data-speakable="lead">
        La pregunta que más escuchan los médicos después de recetar
        semaglutida es: &quot;¿cuánto van a durar estas náuseas?&quot;. La
        respuesta basada en los ensayos clínicos STEP-1 (PMID 33567185) y la
        información de prescripción aprobada por la FDA para Wegovy es que
        los efectos secundarios gastrointestinales siguen un patrón
        predecible: son más intensos en las primeras 2 a 4 semanas después
        de cada aumento de dosis, disminuyen gradualmente conforme el cuerpo
        se adapta a ese nivel, y suelen estabilizarse alrededor de la semana
        20, ya en dosis de mantenimiento de 2.4 mg [1, 3]. Esta guía recorre
        el calendario completo, qué esperar en cada fase de la escalada, y
        cuándo un síntoma deja de ser &quot;esperado&quot; y se convierte en
        una señal de alarma.
      </p>

      <h2>El calendario de escalada de Wegovy</h2>

      <p>
        La información de prescripción aprobada por la FDA de Wegovy
        establece una escalada de 16 semanas antes de alcanzar la dosis de
        mantenimiento [3]. Cada nivel se mantiene 4 semanas completas:
      </p>

      <table>
        <thead>
          <tr>
            <th>Semanas</th>
            <th>Dosis semanal</th>
            <th>Qué esperar</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1 – 4</td>
            <td>0.25 mg</td>
            <td>Primera oleada de náuseas leves. Saciedad temprana en las comidas.</td>
          </tr>
          <tr>
            <td>5 – 8</td>
            <td>0.5 mg</td>
            <td>Segunda oleada de reacciones GI durante los primeros 7 a 10 días del aumento.</td>
          </tr>
          <tr>
            <td>9 – 12</td>
            <td>1.0 mg</td>
            <td>Nueva oleada más corta. Algunos pacientes notan por primera vez estreñimiento significativo.</td>
          </tr>
          <tr>
            <td>13 – 16</td>
            <td>1.7 mg</td>
            <td>Intensidad similar. Si la tolerabilidad es mala, esta es la etapa donde los médicos pausan.</td>
          </tr>
          <tr>
            <td>17 en adelante</td>
            <td>2.4 mg (mantenimiento)</td>
            <td>Última oleada. A partir de la semana 20 la mayoría reporta estabilización.</td>
          </tr>
        </tbody>
      </table>

      <p>
        La información de prescripción permite <strong>retrasar 4 semanas
        adicionales</strong> cualquier paso de la escalada si la
        tolerabilidad es mala, y la guía de práctica clínica sobre el manejo
        de los efectos gastrointestinales de los GLP-1 recomienda usar esa
        flexibilidad en lugar de suspender el tratamiento [3, 5].
      </p>

      <h2>Cuánto duran los efectos gastrointestinales</h2>

      <p>
        Las tasas de incidencia en STEP-1 (semaglutida 2.4 mg frente a
        placebo, 68 semanas) son el punto de referencia más citado [1]. La
        mayoría de los pacientes que experimentan estos síntomas los
        describen como <em>transitorios</em> y <em>leves a moderados</em>
        {" "}en el análisis de tolerabilidad gastrointestinal de STEP-1
        (&quot;mild-to-moderate in severity&quot;, Wharton 2022) [5].
      </p>

      <h3>Náuseas — el síntoma más común</h3>

      <p>
        Incidencia en STEP-1: 43.9% con semaglutida 2.4 mg frente al 16.1%
        con placebo [1]. Patrón temporal típico:
      </p>

      <ul>
        <li>
          <strong>Inicio:</strong> 1 a 3 días después de la primera
          inyección o del aumento de dosis.
        </li>
        <li>
          <strong>Pico:</strong> días 3 a 7 después del aumento.
        </li>
        <li>
          <strong>Resolución:</strong> la mayoría de los episodios disminuye
          sustancialmente entre los días 10 y 14 del mismo nivel de dosis.
        </li>
        <li>
          <strong>Estabilización:</strong> alrededor de la semana 20, ya en
          dosis de mantenimiento, las náuseas son claramente menos
          frecuentes e intensas.
        </li>
      </ul>

      <h3>Vómitos</h3>

      <p>
        Incidencia en STEP-1: 24.5% frente al 6.3% con placebo [1]. Siguen
        el mismo patrón que las náuseas pero son menos frecuentes. La
        información de prescripción aprobada por la FDA advierte sobre el
        riesgo de deshidratación: si los vómitos impiden mantener la
        hidratación durante 24 a 48 horas, se debe contactar al médico [3].
      </p>

      <h3>Diarrea</h3>

      <p>
        Incidencia en STEP-1: 29.7% frente al 15.9% con placebo [1]. En el
        análisis publicado por Wharton y colaboradores, la diarrea
        &quot;subsided over the 68-week trial period&quot; — es decir,
        disminuyó progresivamente a lo largo del ensayo [5]. Suele ser más
        notable en las primeras 4 a 8 semanas y mejora conforme el
        vaciamiento gástrico se adapta al fármaco.
      </p>

      <h3>Estreñimiento</h3>

      <p>
        Incidencia en STEP-1: 24.2% frente al 11.1% con placebo [1]. A
        diferencia de la diarrea, el estreñimiento tiende a aparecer más
        tarde en la escalada (habitualmente a partir de la semana 9) y
        puede persistir en la fase de mantenimiento si no se aumenta la
        ingesta de fibra y agua. Es una de las pocas quejas que con cierta
        frecuencia continúa más allá de las primeras 20 semanas.
      </p>

      <h3>Dolor abdominal</h3>

      <p>
        El dolor abdominal leve agrupado con los eventos gastrointestinales
        es común durante la escalada. El dolor <strong>intenso,
        persistente y que se irradia a la espalda</strong> es diferente:
        puede indicar pancreatitis y requiere atención médica inmediata. La
        información de prescripción aprobada por la FDA de Ozempic incluye
        esta advertencia explícitamente [4].
      </p>

      <h2>Efectos no gastrointestinales y su duración</h2>

      <h3>Dolor de cabeza</h3>

      <p>
        Aparece en la tabla de reacciones adversas de Wegovy en
        aproximadamente el 14% de los pacientes adultos [3]. La duración no
        está formalmente caracterizada en los ensayos clínicos. El
        mecanismo más plausible en el período inicial es la deshidratación
        por reducción de la ingesta de líquidos como consecuencia de la
        saciedad temprana. Aumentar el consumo de agua a 2 a 3 litros por
        día suele ayudar.
      </p>

      <h3>Fatiga</h3>

      <p>
        Reportada en aproximadamente el 11% de los pacientes en los
        ensayos clínicos de Wegovy [3]. Suele ser más marcada en las
        primeras 4 a 8 semanas de tratamiento, cuando la ingesta calórica
        cae más rápidamente. Es coherente con el déficit energético abrupto
        del inicio. La mayoría de los pacientes reportan normalización en
        semanas a pocos meses.
      </p>

      <h3>Caída de cabello (efluvio telógeno)</h3>

      <p>
        La tabla de reacciones adversas de Wegovy lista la caída de cabello
        en el 2.5% de los pacientes frente al 1.0% con placebo [3]. Es más
        común en pacientes que pierden más del 20% del peso corporal y se
        clasifica como <em>efluvio telógeno</em>, una forma de caída
        temporal provocada por la pérdida rápida de peso (no por toxicidad
        directa del fármaco sobre el folículo). Patrón temporal:
      </p>

      <ul>
        <li>
          <strong>Inicio:</strong> típicamente 2 a 4 meses después de una
          pérdida de peso importante.
        </li>
        <li>
          <strong>Duración:</strong> la caída dura entre 3 y 6 meses.
        </li>
        <li>
          <strong>Recrecimiento:</strong> comienza una vez que el peso se
          estabiliza y mejora la ingesta de proteína. No suele requerir
          tratamiento específico.
        </li>
      </ul>

      <h3>Reacciones en el sitio de inyección</h3>

      <p>
        Incidencia en los ensayos de Wegovy: aproximadamente 1.4% frente a
        1.0% con placebo [3]. Enrojecimiento leve o bultitos que típicamente
        desaparecen en 24 a 72 horas. Rotar el sitio de inyección
        (abdomen, muslo, brazo) reduce la frecuencia.
      </p>

      <h2>Efectos adversos graves: nunca son &quot;parte del proceso&quot;</h2>

      <p>
        Los siguientes síntomas aparecen en la sección de advertencias y
        precauciones de la información de prescripción aprobada por la FDA
        para Wegovy y Ozempic y requieren atención médica <strong>el mismo
        día</strong> [3, 4]. No &quot;se pasan solos&quot;.
      </p>

      <ul>
        <li>
          <strong>Pancreatitis aguda:</strong> dolor abdominal intenso y
          persistente, a menudo irradiado a la espalda, con o sin vómitos.
          Si el médico confirma pancreatitis, la semaglutida debe
          suspenderse y no reiniciarse.
        </li>
        <li>
          <strong>Enfermedad de la vesícula biliar (colelitiasis,
          colecistitis):</strong> dolor en el cuadrante superior derecho
          del abdomen, fiebre, náuseas y vómitos, con o sin ictericia
          (color amarillo en piel u ojos).
        </li>
        <li>
          <strong>Tumores de células C de tiroides (advertencia de
          recuadro):</strong> un bulto nuevo en el cuello, ronquera,
          dificultad para tragar o dificultad para respirar. La
          semaglutida está contraindicada en personas con antecedentes
          personales o familiares de carcinoma medular de tiroides o
          síndrome de neoplasia endocrina múltiple tipo 2.
        </li>
        <li>
          <strong>Deshidratación grave / insuficiencia renal:</strong>
          vómitos o diarrea que no mejoran en 24 a 48 horas, orina oscura,
          mareos al pararse.
        </li>
        <li>
          <strong>Reacción alérgica grave:</strong> urticaria generalizada,
          hinchazón de cara o lengua, dificultad para respirar.
        </li>
        <li>
          <strong>Cambios en la visión:</strong> si tiene retinopatía
          diabética, la semaglutida puede empeorar rápidamente los
          cambios en la retina.
        </li>
      </ul>

      <h2>Lo que la evidencia actual dice sobre el estado de ánimo</h2>

      <p>
        La preocupación sobre una posible asociación entre los agonistas
        del receptor de GLP-1 y la ideación suicida fue revisada
        formalmente en 2024 tanto por la FDA como por la EMA. La FDA
        analizó 91 ensayos clínicos aleatorizados controlados con placebo
        que incluyeron 107,910 pacientes y concluyó que no encontró
        evidencia de un aumento del riesgo de ideación o comportamiento
        suicida asociado al uso de estos fármacos [6]. El PRAC de la EMA
        llegó a la misma conclusión en abril de 2024 [7]. La etiqueta
        aprobada por la FDA de Wegovy no lleva una advertencia formal por
        este motivo.
      </p>

      <p>
        Dicho esto, los pacientes con antecedentes de depresión o
        ansiedad deben mantener una vigilancia habitual del estado de
        ánimo durante las primeras 8 a 12 semanas de tratamiento y
        comunicar cualquier cambio a su médico.
      </p>

      <h2>Resumen: el calendario realista</h2>

      <ul>
        <li>
          <strong>Semanas 1 a 4 (0.25 mg):</strong> primera oleada de
          náuseas y saciedad temprana. Leve a moderada.
        </li>
        <li>
          <strong>Semanas 5 a 16 (0.5 → 1.7 mg):</strong> nuevas oleadas
          de síntomas GI tras cada aumento, más cortas cada vez.
        </li>
        <li>
          <strong>Semanas 17 a 20 (2.4 mg):</strong> última oleada al
          llegar a la dosis de mantenimiento.
        </li>
        <li>
          <strong>Después de la semana 20:</strong> la mayoría de los
          pacientes reporta estabilización. El estreñimiento es el
          síntoma que con más frecuencia persiste.
        </li>
        <li>
          <strong>2 a 4 meses después de pérdida de peso importante:</strong>{" "}
          posible efluvio telógeno temporal.
        </li>
      </ul>

      <p>
        Para la guía en español sobre cuántas semanas tarda cada dosis en
        producir pérdida de peso medible, consulte{" "}
        <Link
          href="/es/research/cuanto-tarda-glp1-en-hacer-efecto"
          className="text-brand-violet hover:underline"
        >
          cuánto tarda el GLP-1 en hacer efecto
        </Link>
        . Para el catálogo completo de reacciones adversas con preguntas y
        respuestas, consulte{" "}
        <Link
          href="/es/research/efectos-secundarios-glp1-preguntas-respuestas"
          className="text-brand-violet hover:underline"
        >
          efectos secundarios del GLP-1: preguntas y respuestas
        </Link>
        . Y para la técnica de inyección paso a paso, consulte{" "}
        <Link
          href="/es/research/como-inyectar-semaglutida-guia-paso-a-paso"
          className="text-brand-violet hover:underline"
        >
          cómo inyectar semaglutida
        </Link>
        .
      </p>

      <div className="mt-8 rounded-lg border border-brand-violet/20 bg-brand-bg-purple/30 p-4 text-sm text-brand-text-secondary">
        <strong>Aviso médico:</strong> esta guía es informativa y no
        sustituye la consulta médica. La semaglutida es un medicamento con
        receta y debe ser iniciada y monitoreada por un profesional de la
        salud. Consulte siempre con su médico antes de modificar cualquier
        tratamiento, retrasar una dosis o suspender el fármaco.
      </div>

      <References items={citations} />
    </ResearchArticleLayout>
  );
}
