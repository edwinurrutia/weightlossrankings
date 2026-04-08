import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References from "@/components/research/References";
import FaqSchema, { type FaqItem } from "@/components/research/FaqSchema";

const SLUG = "zepbound-apnea-del-sueno-surmount-osa";

// FAQPage JSON-LD en español. Cada cifra de AHI fue verificada
// directamente contra el resumen oficial del ensayo SURMOUNT-OSA
// en PubMed (Malhotra et al, NEJM 2024, PMID 38912654).
const FAQ_ITEMS: FaqItem[] = [
  {
    question: "¿La FDA aprobó Zepbound para la apnea del sueño?",
    answer:
      "Sí. En diciembre de 2024 la FDA aprobó Zepbound (tirzepatida) para el tratamiento de adultos con apnea obstructiva del sueño de moderada a severa y obesidad. Es el primer medicamento aprobado por la FDA con esta indicación específica. La aprobación se basó en los resultados del ensayo SURMOUNT-OSA.",
  },
  {
    question: "¿Cuánto reduce Zepbound el índice de apneas con SURMOUNT-OSA?",
    answer:
      "En SURMOUNT-OSA (Malhotra, NEJM 2024), los pacientes tratados con tirzepatida durante 52 semanas redujeron el índice de apnea-hipopnea (AHI) en 25.3 eventos por hora en el grupo sin PAP y en 29.3 eventos por hora en el grupo con PAP, frente a reducciones de 5.3 y 5.5 eventos por hora con placebo respectivamente.",
  },
  {
    question: "¿Puedo dejar la CPAP si uso Zepbound?",
    answer:
      "No, no sin consultar a su médico de sueño. SURMOUNT-OSA probó la tirzepatida tanto en pacientes sin terapia con presión positiva (PAP) como en pacientes que ya usaban CPAP. El ensayo no estableció que Zepbound reemplace la CPAP. La decisión de modificar o suspender la CPAP depende de un estudio del sueño de seguimiento y de la evaluación clínica individual.",
  },
  {
    question: "¿Medicare cubre Zepbound para la apnea del sueño?",
    answer:
      "Sí, en situaciones específicas. Medicare Part D cubre Zepbound exclusivamente para la indicación de apnea obstructiva del sueño añadida en diciembre de 2024 — no para la pérdida de peso por sí sola. Los pacientes elegibles son aquellos con apnea obstructiva del sueño de moderada a severa y obesidad documentadas. A partir de abril de 2026, un acuerdo establece un copago de $50 por mes en Medicare para los pacientes que cumplen los criterios.",
  },
  {
    question: "¿Zepbound causa los mismos efectos secundarios cuando se usa para la apnea del sueño?",
    answer:
      "Sí. El perfil de efectos secundarios en SURMOUNT-OSA fue el mismo que en los ensayos de obesidad: los eventos adversos más frecuentes fueron gastrointestinales (náuseas, diarrea, estreñimiento, vómitos) y la mayoría se describieron como leves a moderados. La información de prescripción aprobada por la FDA es la misma que para la indicación de manejo del peso.",
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
        "en-US": "/research/glp1-side-effects-what-trials-actually-showed",
        "es-US": `/es/research/${SLUG}`,
        es: `/es/research/${SLUG}`,
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

export default function ZepboundApneaDelSuenoArticle() {
  const article = getResearchArticleBySlug(SLUG)!;

  const citations = [
    {
      authors:
        "Malhotra A, Grunstein RR, Fietze I, Weaver TE, Redline S, Azarbarzin A, Sands SA, Schwab RJ, Dunn JP, Chakladar S, Bednarik J, Bunck MC; SURMOUNT-OSA Investigators.",
      title:
        "Tirzepatide for the Treatment of Obstructive Sleep Apnea and Obesity.",
      source: "N Engl J Med",
      year: 2024,
      pmid: "38912654",
    },
    {
      authors: "Eli Lilly and Company.",
      title:
        "ZEPBOUND (tirzepatide) injection — Información de prescripción aprobada por la FDA, Sección 1 Indicaciones.",
      source: "FDA Approved Labeling",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/217806s003lbl.pdf",
    },
    {
      authors: "Centers for Medicare & Medicaid Services.",
      title:
        "Cobertura de Zepbound en Medicare Part D para apnea obstructiva del sueño con obesidad.",
      source: "Medicare.gov",
      year: 2026,
      url: "https://www.medicare.gov",
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
        Esta guía en español explica los resultados del ensayo clínico
        SURMOUNT-OSA de tirzepatida (Zepbound) para la apnea obstructiva
        del sueño con obesidad — la primera indicación de la FDA para un
        medicamento en esta condición. Todas las cifras del índice
        apnea-hipopnea (AHI) provienen directamente de la publicación
        del ensayo en <em>New England Journal of Medicine</em> (Malhotra
        et al., PMID 38912654).
      </div>

      <p data-speakable="lead">
        En diciembre de 2024 la Administración de Alimentos y
        Medicamentos de Estados Unidos (FDA) aprobó Zepbound
        (tirzepatida) como el <strong>primer medicamento con una
        indicación formal</strong> para el tratamiento de adultos con
        apnea obstructiva del sueño de moderada a severa y obesidad [2].
        La aprobación se basó en el ensayo clínico SURMOUNT-OSA,
        publicado por Malhotra y colaboradores en <em>New England
        Journal of Medicine</em> en 2024 [1]. Esta guía recorre los
        datos del ensayo, qué significa una reducción del índice de
        apneas, si la tirzepatida puede reemplazar a la CPAP y cómo
        funciona la cobertura de Medicare en esta indicación.
      </p>

      <h2>Qué es la apnea obstructiva del sueño</h2>

      <p>
        La apnea obstructiva del sueño (AOS) es un trastorno en el que
        la vía aérea superior se colapsa repetidamente durante el
        sueño, interrumpiendo la respiración por períodos cortos. La
        medida estándar de la gravedad es el <strong>índice de
        apnea-hipopnea (AHI)</strong>, que cuenta el número de episodios
        de apnea o hipopnea por hora de sueño. La clasificación
        habitual es:
      </p>

      <ul>
        <li>AHI &lt; 5: normal</li>
        <li>AHI 5 a 14: apnea leve</li>
        <li>AHI 15 a 29: apnea moderada</li>
        <li>AHI ≥ 30: apnea severa</li>
      </ul>

      <p>
        La obesidad es uno de los factores de riesgo más importantes
        para la AOS porque el tejido adiposo en el cuello y el abdomen
        contribuye al colapso de la vía aérea. El tratamiento
        tradicional es la terapia con presión positiva en las vías
        respiratorias (PAP), de la que la más común es la CPAP
        (presión positiva continua), que mantiene la vía aérea abierta
        con un flujo constante de aire. Cuando esta guía menciona
        &quot;PAP&quot; se refiere a cualquier modalidad de presión
        positiva (incluida la CPAP) y cuando menciona &quot;CPAP&quot;
        se refiere específicamente a la modalidad de presión continua.
      </p>

      <h2>El diseño de SURMOUNT-OSA</h2>

      <p>
        SURMOUNT-OSA fue en realidad <strong>dos ensayos
        aleatorizados</strong> paralelos, ambos doble ciego y
        controlados con placebo, con una duración de 52 semanas [1]:
      </p>

      <ul>
        <li>
          <strong>Ensayo 1:</strong> adultos con apnea obstructiva del
          sueño de moderada a severa y obesidad que{" "}
          <em>no estaban recibiendo terapia con PAP</em> al inicio del
          estudio.
        </li>
        <li>
          <strong>Ensayo 2:</strong> adultos con los mismos criterios
          que <em>ya estaban usando CPAP u otra terapia con PAP</em> al
          inicio del estudio.
        </li>
      </ul>

      <p>
        En ambos ensayos los pacientes se asignaron aleatoriamente 1:1
        a tirzepatida (dosis máxima tolerada) o a placebo, en
        inyección subcutánea semanal durante 52 semanas [1]. El
        resultado primario fue el cambio del AHI desde el inicio hasta
        la semana 52.
      </p>

      <p>
        Las características al inicio del estudio fueron similares en
        los dos ensayos [1]:
      </p>

      <ul>
        <li>
          AHI promedio: <strong>51.5 eventos por hora</strong> (Ensayo
          1) y <strong>49.5 eventos por hora</strong> (Ensayo 2) — es
          decir, apnea severa en promedio.
        </li>
        <li>
          IMC promedio: <strong>39.1</strong> (Ensayo 1) y{" "}
          <strong>38.7</strong> (Ensayo 2).
        </li>
      </ul>

      <h2>Resultados: reducción del índice de apneas</h2>

      <p>
        Después de 52 semanas de tratamiento, las reducciones del AHI
        fueron las siguientes [1]:
      </p>

      <table>
        <thead>
          <tr>
            <th>Grupo</th>
            <th>Tirzepatida</th>
            <th>Placebo</th>
            <th>Diferencia</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Ensayo 1 (sin PAP)</td>
            <td>−25.3 eventos/hora</td>
            <td>−5.3 eventos/hora</td>
            <td>−20.0 eventos/hora</td>
          </tr>
          <tr>
            <td>Ensayo 2 (con PAP)</td>
            <td>−29.3 eventos/hora</td>
            <td>−5.5 eventos/hora</td>
            <td>−23.8 eventos/hora</td>
          </tr>
        </tbody>
      </table>

      <p>
        La interpretación clínica: en términos absolutos, la
        tirzepatida redujo el AHI en aproximadamente 25 a 29 eventos
        por hora, lo que representa una mejoría sustancial. Para
        contextualizar, un paciente que inicia con un AHI de 51
        (severo) y logra una reducción de 25 eventos por hora termina
        en aproximadamente 26 eventos por hora, que sigue siendo
        moderado pero está en el umbral donde muchos pacientes ya no
        requieren CPAP o pueden reducir los ajustes de presión.
      </p>

      <h2>Pérdida de peso en SURMOUNT-OSA</h2>

      <p>
        SURMOUNT-OSA también midió el cambio del peso corporal como
        parte de los resultados secundarios preestablecidos. El
        resumen oficial del ensayo indica que la tirzepatida produjo
        mejorías significativas en todas las medidas secundarias clave
        incluyendo el porcentaje de cambio de AHI, la reducción del
        peso corporal, la carga hipóxica, la proteína C reactiva y la
        presión arterial sistólica [1]. Las cifras exactas de pérdida
        de peso en esta población con apnea son similares en magnitud
        a las del ensayo SURMOUNT-1 en pacientes con obesidad sin
        apnea, donde la tirzepatida 15 mg produjo una pérdida promedio
        del 20.9% del peso corporal a las 72 semanas [4].
      </p>

      <h2>¿Puede Zepbound reemplazar a la CPAP?</h2>

      <p>
        La respuesta honesta es: <strong>no sin una evaluación
        individual con un médico del sueño</strong>. SURMOUNT-OSA no
        fue diseñado como un estudio de &quot;reemplazo de CPAP&quot;
        — fue un estudio de eficacia que probó la tirzepatida como
        tratamiento independiente (en el ensayo 1) y como tratamiento
        añadido (en el ensayo 2). El ensayo mostró que:
      </p>

      <ul>
        <li>
          En pacientes <strong>sin CPAP</strong>, la tirzepatida
          redujo el AHI de forma clínicamente significativa y podría
          ser una opción de tratamiento independiente en pacientes
          seleccionados.
        </li>
        <li>
          En pacientes <strong>con CPAP</strong>, la tirzepatida se
          combinó con el tratamiento de PAP y produjo una reducción
          aún mayor del AHI, lo que sugiere que funciona como
          tratamiento complementario.
        </li>
        <li>
          La decisión de modificar, reducir o suspender la CPAP debe
          tomarla el médico del sueño basándose en un estudio del
          sueño de seguimiento (polisomnografía o estudio domiciliario)
          después de que el paciente haya perdido peso y se haya
          estabilizado en la dosis de mantenimiento.
        </li>
      </ul>

      <h2>Efectos secundarios en SURMOUNT-OSA</h2>

      <p>
        El perfil de efectos secundarios en SURMOUNT-OSA fue
        coherente con los ensayos previos de tirzepatida en obesidad.
        El resumen del ensayo indica que los eventos adversos más
        frecuentes con tirzepatida fueron de naturaleza
        gastrointestinal y en su mayoría leves a moderados [1]. Para
        el calendario completo de los efectos secundarios
        gastrointestinales y cuánto duran, consulte nuestra guía de{" "}
        <Link
          href="/es/research/semaglutida-efectos-secundarios-duracion"
          className="text-brand-violet hover:underline"
        >
          semaglutida: cuánto duran los efectos secundarios
        </Link>
        {" "}(el patrón temporal es similar para tirzepatida, que
        también sigue una escalada de dosis).
      </p>

      <h2>Cobertura de Medicare para la indicación de OSA</h2>

      <p>
        La aprobación de la indicación de apnea obstructiva del sueño
        en diciembre de 2024 abrió una vía de cobertura en Medicare
        Part D que <strong>no existe</strong> para el manejo del peso
        solamente [3]. Medicare Part D cubre Zepbound exclusivamente
        para la indicación de apnea obstructiva del sueño — no para la
        obesidad sin apnea.
      </p>

      <p>
        Los pacientes elegibles para la cobertura de Medicare son
        aquellos con:
      </p>

      <ul>
        <li>
          Diagnóstico documentado de apnea obstructiva del sueño de
          moderada a severa (habitualmente confirmado con un estudio
          del sueño).
        </li>
        <li>Diagnóstico documentado de obesidad.</li>
        <li>
          Prescripción de tirzepatida con la indicación de OSA
          claramente especificada.
        </li>
      </ul>

      <p>
        A partir de abril de 2026, un acuerdo federal establece un
        copago máximo de <strong>$50 por mes</strong> para los
        pacientes elegibles de Medicare en la indicación de OSA [3].
        Para pacientes que no cumplen los criterios de la indicación
        de OSA, Medicare Part D no cubre Zepbound y los pacientes
        dependen del programa Self Pay Journey Program de Eli Lilly
        o de cobertura comercial con tarjeta de ahorro.
      </p>

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
            href="/es/research/cuanto-peso-se-pierde-wegovy-zepbound"
            className="text-brand-violet hover:underline"
          >
            ¿Cuánto peso se pierde con Wegovy y Zepbound?
          </Link>
        </li>
        <li>
          <Link
            href="/es/research/donde-comprar-tirzepatida-mounjaro"
            className="text-brand-violet hover:underline"
          >
            Dónde comprar tirzepatida (Zepbound y Mounjaro): precios y opciones
          </Link>
        </li>
        <li>
          <Link
            href="/es/research/semaglutida-efectos-secundarios-duracion"
            className="text-brand-violet hover:underline"
          >
            Semaglutida: cuánto duran los efectos secundarios
          </Link>
        </li>
      </ul>

      <div className="mt-8 rounded-lg border border-brand-violet/20 bg-brand-bg-purple/30 p-4 text-sm text-brand-text-secondary">
        <strong>Aviso médico:</strong> esta guía es informativa y no
        sustituye la consulta médica. La apnea obstructiva del sueño es
        una condición médica seria que requiere diagnóstico con un
        estudio del sueño y seguimiento especializado. No modifique ni
        suspenda la terapia con CPAP sin consultar a su médico del
        sueño. Zepbound es un medicamento con receta que debe ser
        iniciado y monitoreado por un profesional de la salud.
      </div>

      <References items={citations} />
    </ResearchArticleLayout>
  );
}
