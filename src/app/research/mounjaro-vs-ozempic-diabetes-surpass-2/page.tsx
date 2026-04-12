import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References from "@/components/research/References";
import FaqSchema, { type FaqItem } from "@/components/research/FaqSchema";

const SLUG = "mounjaro-vs-ozempic-diabetes-surpass-2";

// FAQPage JSON-LD en español. Los datos del ensayo SURPASS-2 fueron
// verificados directamente contra el resumen oficial en PubMed
// (Frías et al, NEJM 2021, PMID 34170647).
const FAQ_ITEMS: FaqItem[] = [
  {
    question: "¿Mounjaro es más efectivo que Ozempic para la diabetes tipo 2?",
    answer:
      "En el ensayo SURPASS-2 (Frías, NEJM 2021), un ensayo aleatorizado de 40 semanas en 1,879 pacientes con diabetes tipo 2, la tirzepatida (Mounjaro) fue no inferior y superior a la semaglutida 1 mg (Ozempic) en la reducción de la hemoglobina A1C. La tirzepatida 15 mg redujo la A1C en 2.30 puntos porcentuales desde el inicio, frente a 1.86 con semaglutida 1 mg.",
  },
  {
    question: "¿Cuánto peso se pierde con Mounjaro frente a Ozempic?",
    answer:
      "En SURPASS-2, la tirzepatida produjo una pérdida de peso significativamente mayor que la semaglutida 1 mg. La diferencia entre las dosis de tirzepatida y semaglutida fue de 1.9 kg con tirzepatida 5 mg, 3.6 kg con 10 mg y 5.5 kg con 15 mg (P < 0.001 para todas las comparaciones). Es decir, los pacientes con tirzepatida 15 mg perdieron en promedio 5.5 kg más que los que recibieron semaglutida 1 mg.",
  },
  {
    question: "¿Cuál tiene más efectos secundarios, Mounjaro u Ozempic?",
    answer:
      "En SURPASS-2, las tasas de efectos secundarios gastrointestinales fueron similares entre tirzepatida y semaglutida 1 mg: náuseas en 17% a 22% con tirzepatida (según dosis) frente al 18% con semaglutida, diarrea en 13% a 16% frente al 12%, y vómitos en 6% a 10% frente al 8%. No hubo una diferencia clínicamente importante en la tolerabilidad gastrointestinal entre los dos fármacos.",
  },
  {
    question: "¿Mounjaro y Ozempic son intercambiables?",
    answer:
      "No. Aunque ambos son agonistas del receptor de GLP-1 aprobados por la FDA para la diabetes tipo 2, son moléculas distintas con mecanismos distintos. Ozempic contiene semaglutida (agonista puro del receptor de GLP-1) y Mounjaro contiene tirzepatida (agonista dual de los receptores de GIP y GLP-1). No se pueden sustituir uno por otro sin una nueva receta médica, y las dosis no son equivalentes.",
  },
  {
    question: "¿Por qué Mounjaro no está aprobado para bajar de peso?",
    answer:
      "Mounjaro solo está aprobado por la FDA para la diabetes tipo 2. Para el manejo crónico del peso, Eli Lilly obtuvo la aprobación de Zepbound en noviembre de 2023, que contiene el mismo principio activo (tirzepatida) pero con una indicación distinta y una marca distinta. La distinción entre Mounjaro y Zepbound es paralela a la distinción entre Ozempic (diabetes) y Wegovy (obesidad), ambos con semaglutida.",
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
        "en-US": "/research/tirzepatide-vs-semaglutide-head-to-head",
        "es-US": `/es/research/${SLUG}`,
        es: `/es/research/${SLUG}`,
        "x-default": "/research/tirzepatide-vs-semaglutide-head-to-head",
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

export default function MounjaroVsOzempicArticle() {
  const article = getResearchArticleBySlug(SLUG)!;

  const citations = [
    {
      authors:
        "Frías JP, Davies MJ, Rosenstock J, Pérez Manghi FC, Fernández Landó L, Bergman BK, Liu B, Cui X, Brown K; SURPASS-2 Investigators.",
      title:
        "Tirzepatide versus Semaglutide Once Weekly in Patients with Type 2 Diabetes.",
      source: "N Engl J Med",
      year: 2021,
      pmid: "34170647",
    },
    {
      authors: "Eli Lilly and Company.",
      title:
        "MOUNJARO (tirzepatide) injection — Información de prescripción aprobada por la FDA.",
      source: "FDA Approved Labeling",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/215866s015lbl.pdf",
    },
    {
      authors: "Novo Nordisk Inc.",
      title:
        "OZEMPIC (semaglutide) injection — Información de prescripción aprobada por la FDA.",
      source: "FDA Approved Labeling",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/209637s035,209637s037lbl.pdf",
    },
    {
      authors:
        "Nicholls SJ, Pavo I, Bhatt DL, Buse JB, Del Prato S, Kahn SE, Lincoff AM, McGuire DK, Miller D, et al.; SURPASS-CVOT Investigators.",
      title:
        "Cardiovascular Outcomes with Tirzepatide in Patients with Type 2 Diabetes and Atherosclerotic Cardiovascular Disease (SURPASS-CVOT).",
      source: "N Engl J Med",
      year: 2025,
      pmid: "41406444",
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
  ];

  return (
    <ResearchArticleLayout article={article}>
      <FaqSchema items={FAQ_ITEMS} />

      <div className="mb-6 rounded-lg border border-brand-violet/20 bg-brand-violet/5 p-4 text-sm text-brand-text-secondary">
        Esta guía en español compara Mounjaro (tirzepatida) y Ozempic
        (semaglutida) para el tratamiento de la diabetes tipo 2,
        usando los datos del único ensayo aleatorizado cabeza a cabeza
        entre ambos fármacos: SURPASS-2 (Frías et al., <em>New England
        Journal of Medicine</em> 2021, PMID 34170647). Todas las
        cifras provienen directamente del resumen oficial del ensayo
        verificado en PubMed.
      </div>

      <p data-speakable="lead">
        Mounjaro y Ozempic son los dos agonistas del receptor de GLP-1
        más recetados en Estados Unidos para la diabetes tipo 2. Son
        moléculas distintas con mecanismos distintos: Ozempic contiene
        semaglutida, un agonista puro del receptor de GLP-1, mientras
        que Mounjaro contiene tirzepatida, un agonista dual de los
        receptores de GIP y GLP-1. En 2021 se publicó el primer ensayo
        aleatorizado cabeza a cabeza entre ambos — SURPASS-2 — que
        proporciona la única comparación directa con datos de alta
        calidad. Los investigadores concluyeron que la tirzepatida fue
        &quot;no inferior y superior&quot; a la semaglutida 1 mg
        tanto en el control glucémico como en la pérdida de peso [1].
      </p>

      <h2>El diseño de SURPASS-2</h2>

      <p>
        SURPASS-2 fue un ensayo aleatorizado, abierto, multicéntrico e
        internacional publicado en <em>New England Journal of
        Medicine</em> en 2021 (Frías et al., PMID 34170647) [1].
      </p>

      <ul>
        <li>
          <strong>Población:</strong> 1,879 adultos con diabetes tipo
          2 inadecuadamente controlada con metformina en monoterapia
          (hemoglobina A1C promedio al inicio: 8.28%; peso corporal
          promedio al inicio: 93.7 kg; edad promedio: 56.6 años).
        </li>
        <li>
          <strong>Aleatorización:</strong> 1:1:1:1 a cuatro brazos de
          tratamiento.
        </li>
        <li>
          <strong>Brazos:</strong> tirzepatida 5 mg, tirzepatida 10
          mg, tirzepatida 15 mg o semaglutida 1 mg (la dosis más alta
          aprobada para Ozempic en ese momento), todas en inyección
          subcutánea una vez por semana.
        </li>
        <li>
          <strong>Duración:</strong> 40 semanas de tratamiento.
        </li>
        <li>
          <strong>Resultado primario:</strong> cambio en la
          hemoglobina A1C desde el inicio hasta la semana 40.
        </li>
      </ul>

      <h2>Control de la glucosa: reducción de la A1C</h2>

      <p>
        El ensayo mostró que las tres dosis de tirzepatida redujeron
        la A1C más que la semaglutida 1 mg, con una relación
        dosis-respuesta clara [1]:
      </p>

      <table>
        <thead>
          <tr>
            <th>Brazo de tratamiento</th>
            <th>Reducción de la A1C desde el inicio (semana 40)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Tirzepatida 5 mg</td>
            <td>−2.01 puntos porcentuales</td>
          </tr>
          <tr>
            <td>Tirzepatida 10 mg</td>
            <td>−2.24 puntos porcentuales</td>
          </tr>
          <tr>
            <td>Tirzepatida 15 mg</td>
            <td>−2.30 puntos porcentuales</td>
          </tr>
          <tr>
            <td>Semaglutida 1 mg</td>
            <td>−1.86 puntos porcentuales</td>
          </tr>
        </tbody>
      </table>

      <p>
        Para un paciente que inicia con una A1C de 8.28% (la A1C
        promedio al inicio del ensayo), la tirzepatida 15 mg llevaría
        la A1C a aproximadamente 5.98% en 40 semanas, mientras que la
        semaglutida 1 mg la llevaría a aproximadamente 6.42%. Ambas
        cifras están por debajo del umbral diagnóstico de diabetes
        (6.5%), pero la tirzepatida puso a más pacientes en la
        categoría de &quot;normalización&quot; metabólica [1].
      </p>

      <h2>Pérdida de peso: la diferencia más notable</h2>

      <p>
        Aunque SURPASS-2 fue un ensayo de diabetes y no de obesidad,
        la pérdida de peso fue un resultado secundario preestablecido.
        Las diferencias entre las tres dosis de tirzepatida y la
        semaglutida 1 mg fueron [1]:
      </p>

      <ul>
        <li>
          Tirzepatida 5 mg frente a semaglutida 1 mg:{" "}
          <strong>1.9 kg adicionales</strong> de pérdida de peso (P &lt; 0.001)
        </li>
        <li>
          Tirzepatida 10 mg frente a semaglutida 1 mg:{" "}
          <strong>3.6 kg adicionales</strong> de pérdida de peso (P &lt; 0.001)
        </li>
        <li>
          Tirzepatida 15 mg frente a semaglutida 1 mg:{" "}
          <strong>5.5 kg adicionales</strong> de pérdida de peso (P &lt; 0.001)
        </li>
      </ul>

      <p>
        En palabras del ensayo: la tirzepatida produjo una reducción
        del peso corporal <em>mayor</em> que la semaglutida, con una
        relación dosis-respuesta clara. Es importante recordar que
        SURPASS-2 usó semaglutida a 1 mg (la dosis máxima aprobada
        para Ozempic en ese momento) y <strong>no</strong> a 2.4 mg
        (la dosis de Wegovy para el manejo del peso). Para las
        comparaciones de magnitud de pérdida de peso en pacientes{" "}
        <em>sin</em> diabetes usando las dosis máximas de cada fármaco
        para el manejo del peso, consulte nuestra guía sobre{" "}
        <Link
          href="/es/research/cuanto-peso-se-pierde-wegovy-zepbound"
          className="text-brand-violet hover:underline"
        >
          ¿cuánto peso se pierde con Wegovy y Zepbound?
        </Link>{" "}
        (que usa los datos de STEP-1 y SURMOUNT-1 en lugar de
        SURPASS-2).
      </p>

      <h2>Tolerabilidad: efectos secundarios gastrointestinales</h2>

      <p>
        Una de las preguntas más frecuentes es si Mounjaro tiene más
        efectos secundarios que Ozempic. En SURPASS-2, las tasas de
        efectos gastrointestinales fueron similares entre los dos
        fármacos [1]:
      </p>

      <table>
        <thead>
          <tr>
            <th>Efecto</th>
            <th>Tirzepatida 5-15 mg</th>
            <th>Semaglutida 1 mg</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Náuseas</td>
            <td>17% a 22%</td>
            <td>18%</td>
          </tr>
          <tr>
            <td>Diarrea</td>
            <td>13% a 16%</td>
            <td>12%</td>
          </tr>
          <tr>
            <td>Vómitos</td>
            <td>6% a 10%</td>
            <td>8%</td>
          </tr>
        </tbody>
      </table>

      <p>
        Las tasas son comparables, con una tendencia ligeramente mayor
        a diarrea y vómitos en las dosis más altas de tirzepatida.
        Para la mayoría de los pacientes, los efectos gastrointestinales
        son transitorios y se concentran en las primeras semanas
        después de cada aumento de dosis. El patrón temporal es muy
        similar al de la semaglutida y se describe en detalle en la
        guía de{" "}
        <Link
          href="/es/research/semaglutida-efectos-secundarios-duracion"
          className="text-brand-violet hover:underline"
        >
          semaglutida: cuánto duran los efectos secundarios
        </Link>
        .
      </p>

      <h2>La conclusión del ensayo</h2>

      <p>
        Los autores de SURPASS-2 concluyeron textualmente en el
        resumen del ensayo que en pacientes con diabetes tipo 2, la
        tirzepatida fue <em>&quot;no inferior y superior&quot;</em> a
        la semaglutida 1 mg en cuanto al cambio de la hemoglobina A1C
        desde el inicio hasta las 40 semanas [1]. &quot;No inferior y
        superior&quot; es un lenguaje estadístico específico que
        significa que la tirzepatida cumplió con dos umbrales
        estadísticos: primero no ser peor que la semaglutida (no
        inferioridad) y luego ser claramente mejor (superioridad).
      </p>

      <h2>Las diferencias que el ensayo no cubrió</h2>

      <p>
        SURPASS-2 es una sola comparación cabeza a cabeza y no
        responde todas las preguntas que un paciente puede tener al
        elegir entre Mounjaro y Ozempic:
      </p>

      <ul>
        <li>
          <strong>Dosis comparadas:</strong> el ensayo comparó
          tirzepatida hasta 15 mg frente a semaglutida 1 mg. Ozempic
          ahora está aprobado por la FDA hasta 2 mg por semana para
          diabetes. No hay datos de cabeza a cabeza en las dosis
          máximas actuales.
        </li>
        <li>
          <strong>Duración:</strong> 40 semanas es relativamente
          corto. No hay datos de ensayos cabeza a cabeza a 2 o 5 años.
        </li>
        <li>
          <strong>Resultados cardiovasculares:</strong> Ozempic tiene
          datos cardiovasculares positivos del ensayo SUSTAIN-6
          (semaglutida reduce eventos cardiovasculares mayores en
          pacientes con diabetes tipo 2 y alto riesgo cardiovascular).
          La tirzepatida se comparó con dulaglutida (otro agonista del
          receptor de GLP-1) en el ensayo SURPASS-CVOT publicado en{" "}
          <em>New England Journal of Medicine</em> en 2025 (Nicholls
          et al., PMID 41406444) en 13,299 pacientes con diabetes tipo
          2 y enfermedad cardiovascular aterosclerótica. La tirzepatida
          fue <em>no inferior</em> a la dulaglutida en el resultado
          compuesto de muerte cardiovascular, infarto de miocardio y
          accidente cerebrovascular (cociente de riesgo 0.92; intervalo
          de confianza del 95.3%, 0.83 a 1.01). SURPASS-CVOT comparó
          tirzepatida con otro GLP-1, no con placebo, así que la
          comparación directa de resultados cardiovasculares entre
          tirzepatida y semaglutida sigue siendo una cuestión abierta.
        </li>
        <li>
          <strong>Cobertura del seguro:</strong> la cobertura varía
          entre planes de seguro privados y Medicare. Esta es a menudo
          la diferencia práctica más importante para los pacientes.
        </li>
        <li>
          <strong>Interacciones y contraindicaciones:</strong> ambos
          tienen advertencias similares sobre tumores de células C de
          tiroides, pancreatitis, retinopatía diabética y
          complicaciones de la vesícula biliar. Deben discutirse con
          el médico en cada caso individual.
        </li>
      </ul>

      <h2>Lecturas relacionadas en español</h2>

      <ul>
        <li>
          <Link
            href="/es/research/tirzepatide-para-que-sirve"
            className="text-brand-violet hover:underline"
          >
            Tirzepatida: para qué sirve, cómo funciona y qué dicen los estudios clínicos
          </Link>
        </li>
        <li>
          <Link
            href="/es/research/semaglutide-para-que-sirve"
            className="text-brand-violet hover:underline"
          >
            Semaglutida: para qué sirve y cómo funciona
          </Link>
        </li>
        <li>
          <Link
            href="/es/research/wegovy-vs-ozempic-diferencias"
            className="text-brand-violet hover:underline"
          >
            Wegovy vs Ozempic: diferencias
          </Link>{" "}
          — por qué contienen el mismo principio activo pero no son
          intercambiables.
        </li>
        <li>
          <Link
            href="/es/research/guia-marcas-wegovy-ozempic-zepbound-mounjaro"
            className="text-brand-violet hover:underline"
          >
            Guía de marcas: Wegovy, Ozempic, Zepbound y Mounjaro
          </Link>
        </li>
        <li>
          <Link
            href="/es/research/cuanto-peso-se-pierde-wegovy-zepbound"
            className="text-brand-violet hover:underline"
          >
            ¿Cuánto peso se pierde con Wegovy y Zepbound?
          </Link>
        </li>
      </ul>

      <div className="mt-8 rounded-lg border border-brand-violet/20 bg-brand-bg-purple/30 p-4 text-sm text-brand-text-secondary">
        <strong>Aviso médico:</strong> esta guía es informativa y no
        sustituye la consulta médica. La elección entre Mounjaro y
        Ozempic debe basarse en una evaluación individual con su
        médico, que considere sus objetivos glucémicos, el perfil de
        riesgo cardiovascular, la tolerabilidad, la cobertura del
        seguro y las contraindicaciones específicas. Los datos de
        SURPASS-2 son un ensayo cabeza a cabeza útil pero no el único
        factor de decisión.
      </div>

      <References items={citations} />
    </ResearchArticleLayout>
  );
}
