import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References from "@/components/research/References";
import FaqSchema from "@/components/research/FaqSchema";

const SLUG = "wegovy-vs-ozempic-diferencias";
const ENGLISH_COUNTERPART = "wegovy-ozempic-zepbound-mounjaro-brand-name-cheat-sheet";

export async function generateMetadata(): Promise<Metadata> {
  const article = getResearchArticleBySlug(SLUG)!;
  return {
    title: { absolute: article.title },
    description: article.description,
    alternates: {
      // Canonical URL is the /es/research/ path. The /research/ path
      // 301-redirects via next.config.mjs.
      canonical: `/es/research/${SLUG}`,
      languages: {
        "en-US": `/research/${ENGLISH_COUNTERPART}`,
        es: `/es/research/${SLUG}`,
        "es-US": `/es/research/${SLUG}`,
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

// Spanish-language deep-dive on Wegovy vs Ozempic — the highest-
// volume Hispanic patient search comparing the two brand-name
// semaglutide products. All clinical data are anchored on STEP-1
// (Wilding 2021), SUSTAIN-6 (Marso 2016), and the FDA-approved
// prescribing information for both Wegovy (Novo Nordisk, 2025) and
// Ozempic (Novo Nordisk, 2025). Data verbatim from primary sources.
export default function WegovyVsOzempicArticle() {
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
        "Marso SP, Bain SC, Consoli A, Eliaschewitz FG, Jódar E, Leiter LA, Lingvay I, Rosenstock J, Seufert J, Warren ML, Woo V, Hansen O, Holst AG, Pettersson J, Vilsbøll T; SUSTAIN-6 Investigators.",
      title:
        "Semaglutide and Cardiovascular Outcomes in Patients with Type 2 Diabetes (SUSTAIN-6).",
      source: "N Engl J Med",
      year: 2016,
      pmid: "27633186",
    },
    {
      authors:
        "Lincoff AM, Brown-Frandsen K, Colhoun HM, et al.; SELECT Trial Investigators.",
      title:
        "Semaglutide and Cardiovascular Outcomes in Obesity without Diabetes (SELECT).",
      source: "N Engl J Med",
      year: 2023,
      pmid: "37952131",
    },
    {
      authors: "Novo Nordisk Inc.",
      title:
        "WEGOVY (semaglutide) injection — US Prescribing Information, 2025.",
      source: "FDA Approved Labeling",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/215256s024lbl.pdf",
    },
    {
      authors: "Novo Nordisk Inc.",
      title:
        "OZEMPIC (semaglutide) injection — US Prescribing Information, 2025.",
      source: "FDA Approved Labeling",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/209637s029lbl.pdf",
    },
  ];

  return (
    <ResearchArticleLayout article={article}>
      <p data-speakable="lead">
        Wegovy y Ozempic son fabricados por la misma compañía (Novo
        Nordisk) y contienen el mismo ingrediente activo
        (semaglutida), pero <strong>no son el mismo medicamento</strong>.
        La diferencia clínica importa: están aprobados por la FDA para
        indicaciones distintas, alcanzan dosis máximas distintas y
        tienen perfiles de cobertura de seguro completamente
        diferentes. Esta guía explica las cinco diferencias principales,
        todas verificadas contra la información de prescripción
        aprobada por la FDA y los ensayos clínicos publicados.
      </p>

      <h2>1. Indicación aprobada por la FDA</h2>

      <p>
        La diferencia más importante es para qué está aprobado cada
        medicamento por la FDA:
      </p>

      <ul>
        <li>
          <strong>Wegovy</strong> — aprobado para el manejo crónico
          del peso en adultos con obesidad (IMC ≥30) o sobrepeso (IMC
          ≥27) con al menos una comorbilidad relacionada con el peso.
          En marzo de 2024, la FDA agregó una segunda indicación: la
          reducción del riesgo de eventos cardiovasculares mayores en
          adultos con enfermedad cardiovascular establecida y obesidad
          o sobrepeso, basada en el ensayo SELECT [3].
        </li>
        <li>
          <strong>Ozempic</strong> — aprobado para diabetes tipo 2
          (control glucémico) y para reducción del riesgo de eventos
          cardiovasculares mayores en pacientes con diabetes tipo 2 y
          enfermedad cardiovascular establecida, basado en SUSTAIN-6
          [2]. Ozempic <em>no</em> está aprobado por la FDA para el
          manejo del peso, aunque muchos médicos lo recetan fuera de
          etiqueta (off-label) para perder peso porque contiene el
          mismo ingrediente activo que Wegovy.
        </li>
      </ul>

      <h2>2. Dosis máxima</h2>

      <p>
        Las dosis aprobadas son distintas porque los ensayos clínicos
        se hicieron en poblaciones diferentes:
      </p>

      <ul>
        <li>
          <strong>Wegovy</strong> — dosis de mantenimiento de{" "}
          <strong>2.4 mg semanales</strong> (titulada desde 0.25 mg →
          0.5 mg → 1.0 mg → 1.7 mg → 2.4 mg, cada paso por 4 semanas).
          Esta es la dosis estudiada en STEP-1, que produjo una
          pérdida de peso promedio del 14.9% a las 68 semanas [1].
        </li>
        <li>
          <strong>Ozempic</strong> — dosis máxima de{" "}
          <strong>2.0 mg semanales</strong> (titulada desde 0.25 mg →
          0.5 mg → 1.0 mg → 2.0 mg). Esta dosis se aprobó para
          control glucémico, no para pérdida de peso, así que es
          menor que la dosis de Wegovy.
        </li>
      </ul>

      <h2>3. Ensayos clínicos pivotales</h2>

      <p>
        Los datos de eficacia y seguridad vienen de programas de
        ensayos completamente distintos:
      </p>

      <ul>
        <li>
          <strong>Wegovy</strong> — programa STEP (5 ensayos
          principales), enfocado en pérdida de peso. STEP-1 (Wilding
          2021, NEJM, PMID 33567185) es el ensayo pivotal: 1,961
          adultos con obesidad, 14.9% de pérdida de peso promedio
          con semaglutida 2.4 mg vs 2.4% con placebo a las 68
          semanas [1].
        </li>
        <li>
          <strong>Ozempic</strong> — programa SUSTAIN (10 ensayos
          principales), enfocado en diabetes. SUSTAIN-6 (Marso 2016,
          NEJM, PMID 27633186) demostró una reducción del 26% en
          eventos cardiovasculares mayores en pacientes diabéticos
          con enfermedad cardiovascular [2].
        </li>
      </ul>

      <h2>4. Cobertura de seguro</h2>

      <p>
        Esta es la diferencia práctica más importante para los
        pacientes en EE.UU.:
      </p>

      <ul>
        <li>
          <strong>Wegovy</strong> — la cobertura para manejo del peso
          es opcional a nivel del empleador. Muchos planes comerciales
          NO cubren Wegovy, incluso cuando el paciente cumple los
          criterios clínicos. Medicare Parte D tradicionalmente no
          cubría medicamentos para perder peso, aunque desde marzo de
          2024 cubre Wegovy para pacientes con la indicación
          cardiovascular (con enfermedad cardíaca establecida más
          obesidad). Medicaid varía por estado.
        </li>
        <li>
          <strong>Ozempic</strong> — la cobertura para diabetes tipo
          2 es mucho más amplia. La mayoría de los planes
          comerciales, Medicare y Medicaid cubren Ozempic con
          autorización previa cuando el paciente tiene un diagnóstico
          de diabetes tipo 2. Sin diagnóstico de diabetes, los seguros
          rara vez cubren Ozempic — ni siquiera para perder peso.
        </li>
      </ul>

      <h2>5. Costo en efectivo (sin seguro)</h2>

      <p>
        Los precios de lista son similares pero los programas de
        descuento del fabricante fueron significativamente
        actualizados por Novo Nordisk en marzo de 2025:
      </p>

      <ul>
        <li>
          <strong>Wegovy</strong> — precio de lista de aproximadamente
          $1,349 al mes en farmacias minoristas. Desde marzo de 2025,
          Novo Nordisk redujo el precio en efectivo sin seguro a
          aproximadamente <strong>$349 al mes</strong> a través del
          programa NovoCare Pharmacy. Para pacientes con seguro
          comercial elegible, la tarjeta de ahorro del fabricante
          puede reducir el costo a tan solo <strong>$25 al mes</strong>{" "}
          (el mismo precio que Ozempic con la tarjeta de ahorro).
        </li>
        <li>
          <strong>Ozempic</strong> — precio de lista de
          aproximadamente $1,000 al mes. La tarjeta de ahorro de Novo
          Nordisk reduce el costo a tan solo <strong>$25 al mes</strong>{" "}
          para pacientes con seguro comercial que tienen un
          diagnóstico de diabetes y cumplen los criterios del
          programa.
        </li>
      </ul>

      <p className="text-sm text-brand-text-secondary">
        <em>
          Nota: los precios reflejan la información pública de marzo
          de 2025 del programa NovoCare Pharmacy de Novo Nordisk y de
          los programas de tarjetas de ahorro del fabricante. Los
          precios exactos pueden variar según la elegibilidad y el
          estado del seguro. Verifica siempre el precio actual en
          NovoCare y con tu farmacia antes de asumir el costo.
        </em>
      </p>

      <h2>¿Cuál medicamento es mejor para perder peso?</h2>

      <p>
        Si el objetivo principal es la pérdida de peso, los datos de
        ensayos clínicos publicados favorecen a <strong>Wegovy</strong>{" "}
        sobre Ozempic — no porque la semaglutida sea distinta, sino
        porque la dosis de Wegovy es mayor (2.4 mg vs 2.0 mg) y los
        ensayos del programa STEP estudiaron específicamente el
        manejo del peso a largo plazo. Wegovy es la opción FDA-
        aprobada y respaldada por evidencia para perder peso.
      </p>

      <p>
        Sin embargo, en la práctica muchos pacientes terminan tomando
        Ozempic para perder peso porque su seguro lo cubre (con un
        diagnóstico de diabetes o prediabetes) cuando no cubre
        Wegovy. Esta es una decisión clínica que debe tomarse con tu
        prescriptor, quien conoce tu historia médica y tu cobertura
        de seguro específica.
      </p>

      <h2>¿Y los efectos secundarios?</h2>

      <p>
        Los perfiles de efectos secundarios son cualitativamente
        idénticos porque el ingrediente activo es el mismo. Los más
        comunes son gastrointestinales: náuseas, vómitos, diarrea,
        estreñimiento, eructos. La intensidad puede ser ligeramente
        mayor con la dosis más alta de Wegovy (2.4 mg) comparada con
        Ozempic (2.0 mg), pero la diferencia es modesta y depende de
        la velocidad de titulación.
      </p>

      <p>
        Para una guía detallada de las tasas exactas de efectos
        secundarios verificadas contra los ensayos clínicos publicados,
        consulta nuestra{" "}
        <Link href="/research/efectos-secundarios-glp1-preguntas-respuestas">
          guía de efectos secundarios del GLP-1 en español
        </Link>
        .
      </p>

      <h2>Recursos relacionados</h2>

      <ul>
        <li>
          <Link href="/es/research/semaglutide-para-que-sirve">
            Semaglutida: ¿para qué sirve?
          </Link>{" "}
          — guía detallada del medicamento, mecanismo y eficacia.
        </li>
        <li>
          <Link href="/es/research/cuanto-tarda-glp1-en-hacer-efecto">
            ¿Cuánto tarda el GLP-1 en hacer efecto?
          </Link>{" "}
          — cronograma de pérdida de peso semana a semana.
        </li>
        <li>
          <Link href="/es/research/guia-marcas-wegovy-ozempic-zepbound-mounjaro">
            Guía de las cuatro marcas: Wegovy, Ozempic, Zepbound,
            Mounjaro
          </Link>{" "}
          — comparación de las cuatro marcas principales.
        </li>
        <li>
          <Link href="/es/research/efectos-secundarios-glp1-preguntas-respuestas">
            Efectos secundarios del GLP-1: preguntas y respuestas
          </Link>{" "}
          — tasas verificadas de los ensayos STEP-1 y SURMOUNT-1.
        </li>
      </ul>

      <References items={citations} />
      <FaqSchema
        items={[
          {
            question: "¿Cuál es la diferencia entre Wegovy y Ozempic?",
            answer:
              "Wegovy y Ozempic contienen el mismo ingrediente activo (semaglutida) y los fabrica la misma compañía (Novo Nordisk), pero están aprobados por la FDA para indicaciones distintas. Wegovy está aprobado para el manejo crónico del peso (dosis máxima 2.4 mg semanales). Ozempic está aprobado para la diabetes tipo 2 (dosis máxima 2.0 mg semanales). La cobertura de seguro y la dosis son las dos diferencias prácticas más importantes.",
          },
          {
            question: "¿Wegovy es lo mismo que Ozempic?",
            answer:
              "Casi, pero no exactamente. El ingrediente activo (semaglutida) es idéntico, pero las dosis máximas son distintas (2.4 mg vs 2.0 mg) y las indicaciones aprobadas por la FDA son distintas (manejo del peso vs diabetes tipo 2). Si tu objetivo es perder peso, Wegovy es la opción aprobada por la FDA y respaldada por los ensayos del programa STEP.",
          },
          {
            question: "¿Cuál es mejor para perder peso, Wegovy u Ozempic?",
            answer:
              "Wegovy fue específicamente estudiado para pérdida de peso en el programa STEP (STEP-1 mostró 14.9% de pérdida de peso promedio a las 68 semanas con la dosis de 2.4 mg). Ozempic se estudió para diabetes a una dosis máxima menor (2.0 mg). Si la pérdida de peso es el objetivo principal y tu seguro cubre Wegovy, esa es la opción respaldada por evidencia.",
          },
          {
            question: "¿Por qué los seguros cubren Ozempic pero no Wegovy?",
            answer:
              "Porque Ozempic está aprobado para diabetes tipo 2, una enfermedad crónica que la mayoría de los planes de seguro cubren ampliamente. Wegovy está aprobado para el manejo del peso, una indicación que muchos planes comerciales tratan como un beneficio opcional al nivel del empleador. Como resultado, los pacientes con diabetes tipo 2 frecuentemente reciben Ozempic cubierto por seguro, mientras que pacientes solo con obesidad (sin diabetes) pagan en efectivo o usan tarjetas de ahorro del fabricante para Wegovy.",
          },
          {
            question: "¿Puedo cambiar de Ozempic a Wegovy?",
            answer:
              "Sí, pero requiere una nueva receta y normalmente comenzar desde la dosis inicial de Wegovy (0.25 mg) para minimizar los efectos secundarios gastrointestinales durante la titulación. La transición debe hacerse con tu prescriptor, no por tu cuenta. Si tu seguro cubre Ozempic pero no Wegovy, este cambio podría aumentar significativamente tu costo mensual.",
          },
        ]}
      />
    </ResearchArticleLayout>
  );
}
