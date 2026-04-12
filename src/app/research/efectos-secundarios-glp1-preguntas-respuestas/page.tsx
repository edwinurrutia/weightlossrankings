import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References from "@/components/research/References";
import FaqSchema, { type FaqItem } from "@/components/research/FaqSchema";

const SLUG = "efectos-secundarios-glp1-preguntas-respuestas";

// FAQPage JSON-LD en español, paralelo a la versión en inglés. Cada
// item corresponde a una pregunta H2 real del cuerpo del artículo.
// Texto plano, sin markdown, ~300 caracteres por respuesta.
const FAQ_ITEMS: FaqItem[] = [
  {
    question: "¿La semaglutida causa dolor de cabeza?",
    answer:
      "Sí. STEP-1 reportó dolor de cabeza en 14.2% de los pacientes con semaglutida 2.4 mg frente al 10.0% con placebo, una tasa atribuible al fármaco de aproximadamente 4 puntos porcentuales (~1 de cada 25 pacientes). El mecanismo más común es la deshidratación. Aumente la ingesta de agua a 2-3 litros por día.",
  },
  {
    question: "¿La tirzepatida causa eructos con olor a azufre?",
    answer:
      "Sí. La eructación se reporta como reacción adversa común (≥5% según etiqueta) en las etiquetas de Wegovy y Zepbound de la FDA. Los eructos con olor a azufre o huevo podrido se deben al vaciamiento gástrico más lento, que cambia el perfil de fermentación bacteriana en el tracto GI superior. Comidas más pequeñas y menos azufre dietético ayudan.",
  },
  {
    question: "¿La semaglutida o la tirzepatida causan depresión?",
    answer:
      "La revisión de 2024 del PRAC de la EMA sobre los agonistas del receptor de GLP-1 no encontró asociación causal con depresión o ideación suicida en datos de ensayos aleatorizados. Existe una señal observacional separada en algunas cohortes que no se considera causal. Pacientes con antecedentes de depresión deben vigilar el estado de ánimo durante las primeras 8-12 semanas.",
  },
  {
    question: "¿El GLP-1 causa niebla mental?",
    answer:
      "La niebla mental no aparece en la tabla de reacciones adversas de las etiquetas de Wegovy o Zepbound y no se rastreó como un evento adverso formal en STEP-1 o SURMOUNT-1. El sistema FAERS de la FDA ha recibido informes de quejas cognitivas pero no se ha establecido una señal causal. Mecanismos posibles incluyen deshidratación e hipoglucemia.",
  },
  {
    question: "¿La semaglutida o la tirzepatida causan acné?",
    answer:
      "El acné no aparece en la tabla de reacciones adversas de las etiquetas de la FDA y no se ha establecido formalmente como un efecto causal en ningún ensayo aleatorizado. Algunos pacientes reportan empeoramiento del acné con GLP-1; el mecanismo no está establecido. La mayoría de los reportes describen el acné como transitorio.",
  },
  {
    question: "¿El GLP-1 afecta el sueño o causa insomnio?",
    answer:
      "El insomnio no aparece destacado en la etiqueta de la FDA como efecto secundario primario del GLP-1 pero figura en reportes postmarketing. Mecanismos posibles: náuseas nocturnas, hipoglucemia vespertina en pacientes diabéticos o el aumento de la frecuencia cardíaca de 2-4 lpm. Inyectar por la mañana en lugar de por la noche puede ayudar.",
  },
  {
    question: "¿El GLP-1 afecta la libido o la función sexual?",
    answer:
      "No hay señal causal en los ensayos para libido o disfunción sexual con GLP-1, y los ensayos aleatorizados no reportaron tasas elevadas. El sistema FAERS de la FDA ha recibido informes pero no se ha establecido una señal causal. La pérdida de peso en sí suele mejorar la función sexual con el tiempo.",
  },
  {
    question: "¿El GLP-1 causa cambios en el olor corporal?",
    answer:
      "Los reportes de cambios en el olor corporal con GLP-1 no aparecen en la etiqueta de la FDA y no tienen datos publicados de ensayos clínicos. El mecanismo más plausible es metabólico: la pérdida rápida de peso libera ácidos grasos almacenados y puede cambiar transitoriamente el microbioma de la piel y la composición del sudor.",
  },
  {
    question: "¿El GLP-1 causa intolerancia al frío?",
    answer:
      "La intolerancia al frío no aparece en la etiqueta de la FDA pero es un reporte recurrente de los pacientes. El mecanismo más probable es la pérdida del aislamiento de la grasa subcutánea durante la pérdida rápida de peso. No es un efecto específico del fármaco — es una consecuencia general de la reducción importante de la masa grasa.",
  },
  {
    question: "¿El GLP-1 afecta el gusto (disgeusia)?",
    answer:
      "Sí, modestamente. La disgeusia (alteración del gusto) figura en la tabla de reacciones adversas de la FDA tanto para Wegovy como para Zepbound, con una tasa de aproximadamente 1.7% en Wegovy frente a 0.5% en placebo en STEP-1. Suele describirse como sabor metálico o aplanado, particularmente en las primeras 4-8 semanas, y mejora con la dosis de mantenimiento.",
  },
];

export async function generateMetadata(): Promise<Metadata> {
  const article = getResearchArticleBySlug(SLUG)!;
  return {
    title: { absolute: article.title },
    description: article.description,
    alternates: {
      canonical: `/research/${SLUG}`,
      languages: {
        "en-US": "/research/glp1-side-effect-questions-answered",
        "es-US": `/research/${SLUG}`,
        es: `/research/${SLUG}`,
        "x-default": "/research/glp1-side-effect-questions-answered",
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

// Traducción al español de /research/glp1-side-effect-questions-answered.
// Todas las tasas fueron verificadas contra las publicaciones NEJM de
// STEP-1 (PMID 33567185) y SURMOUNT-1 (PMID 35658024) y las tablas de
// reacciones adversas de la información de prescripción aprobada por la
// FDA para Wegovy y Zepbound. Los niveles de confianza (ALTO/MEDIO/BAJO)
// se mantienen idénticos a la versión en inglés.

export default function EfectosSecundariosGlp1PreguntasRespuestasArticle() {
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
        "WEGOVY (semaglutide) injection — Información de prescripción aprobada por la FDA, Sección 6 Reacciones Adversas.",
      source: "FDA Approved Labeling",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/215256s024lbl.pdf",
    },
    {
      authors: "Eli Lilly and Company.",
      title:
        "ZEPBOUND (tirzepatide) injection — Información de prescripción aprobada por la FDA, Sección 6 Reacciones Adversas.",
      source: "FDA Approved Labeling",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/217806s016lbl.pdf",
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
      authors: "European Medicines Agency.",
      title:
        "Revisión del PRAC sobre los agonistas del receptor de GLP-1 y el riesgo de pensamientos suicidas y autolesiones — concluida en abril de 2024.",
      source: "EMA Pharmacovigilance Risk Assessment Committee",
      year: 2024,
      url: "https://www.ema.europa.eu/en/news/meeting-highlights-pharmacovigilance-risk-assessment-committee-prac-8-11-april-2024",
    },
    {
      authors:
        "Malhotra A, Grunstein RR, Fietze I, Weaver TE, Redline S, Azarbarzin A, Sands SA, Schwab RJ, Dunn JP, Chakladar S, Bednarik J, Bunck MC; SURMOUNT-OSA Investigators.",
      title:
        "Tirzepatide for the Treatment of Obstructive Sleep Apnea and Obesity (SURMOUNT-OSA).",
      source: "N Engl J Med",
      year: 2024,
      pmid: "38912654",
    },
  ];

  return (
    <ResearchArticleLayout article={article}>
      <FaqSchema items={FAQ_ITEMS} />
      <div className="mb-6 rounded-lg border border-brand-violet/20 bg-brand-violet/5 p-4 text-sm text-brand-text-secondary">
        Esta es la versión en español de nuestro artículo de preguntas y
        respuestas sobre los efectos secundarios específicos de los
        agonistas del receptor de GLP-1. Para la versión original en
        inglés con todas las referencias clínicas, visite{" "}
        <Link
          href="/research/glp1-side-effect-questions-answered"
          className="text-brand-violet hover:underline"
        >
          GLP-1 Side Effect Q&amp;A: Headache, Sulfur Burps, Brain Fog, Mood, Acne
        </Link>
        .
      </div>

      <p data-speakable="lead">
        Nuestra{" "}
        <Link href="/research/glp1-side-effects-what-trials-actually-showed">
          investigación más amplia sobre los efectos secundarios de los GLP-1
        </Link>{" "}
        cubre las cifras principales de tolerabilidad gastrointestinal de
        STEP-1 y SURMOUNT-1. Este artículo responde las preguntas
        específicas que los pacientes buscan: <em>¿la semaglutida causa
        dolor de cabeza?</em> (sí — 14.2% en el ensayo STEP-1 frente a 10%
        con placebo), <em>¿la tirzepatida causa eructos con olor a azufre?</em>{" "}
        (sí — el vaciamiento gástrico más lento modifica el perfil de
        fermentación bacteriana), <em>¿la semaglutida causa depresión?</em>{" "}
        (no hay señal en la revisión de 2024 de la EMA sobre datos de
        ensayos clínicos aleatorizados, pero sí existe una señal
        observacional aparte), <em>¿el GLP-1 causa niebla mental?</em>{" "}
        (una señal emergente de farmacovigilancia de la FDA a partir de
        2025). Cada tasa proviene de las publicaciones de STEP-1 y
        SURMOUNT-1 en el <em>New England Journal of Medicine</em> y de la
        información de prescripción aprobada por la FDA para Wegovy y
        Zepbound [1, 2, 3, 4].
      </p>

      <h2>La tabla de tasas verificadas</h2>

      <p>
        Tasas verificadas de las tablas de reacciones adversas de la
        información de prescripción aprobada por la FDA y de los
        suplementos de eventos adversos publicados con los ensayos
        clínicos [1, 2, 3, 4]:
      </p>

      <table>
        <thead>
          <tr>
            <th>Efecto secundario</th>
            <th>Sema (Wegovy)</th>
            <th>Tirz (Zepbound)</th>
            <th>Placebo</th>
            <th>Confianza</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Náuseas</td>
            <td>43.9%</td>
            <td>24.6-33.3%</td>
            <td>9-16%</td>
            <td>ALTA</td>
          </tr>
          <tr>
            <td>Vómitos</td>
            <td>24.5%</td>
            <td>8.3-12.2%</td>
            <td>1.7-6.3%</td>
            <td>ALTA</td>
          </tr>
          <tr>
            <td>Diarrea</td>
            <td>29.7%</td>
            <td>18.7-23.0%</td>
            <td>7.3-15.9%</td>
            <td>ALTA</td>
          </tr>
          <tr>
            <td>Estreñimiento</td>
            <td>24.2%</td>
            <td>11.7-17.1%</td>
            <td>5.8-11.1%</td>
            <td>ALTA</td>
          </tr>
          <tr>
            <td>Dolor de cabeza</td>
            <td>14.2%</td>
            <td>~9-12%</td>
            <td>10.0%</td>
            <td>ALTA</td>
          </tr>
          <tr>
            <td>Eructos (con olor a azufre)</td>
            <td>≥5% (según etiqueta)</td>
            <td>incluido (etiqueta)</td>
            <td>menor</td>
            <td>ALTA</td>
          </tr>
          <tr>
            <td>Reflujo gastroesofágico (ERGE)</td>
            <td>~11%</td>
            <td>~6%</td>
            <td>2-3%</td>
            <td>ALTA</td>
          </tr>
          <tr>
            <td>Mareos</td>
            <td>~8%</td>
            <td>~6%</td>
            <td>~5%</td>
            <td>MEDIA</td>
          </tr>
          <tr>
            <td>Disgeusia (alteración del gusto)</td>
            <td>~1.7%</td>
            <td>no reportado con frecuencia</td>
            <td>&lt;1%</td>
            <td>MEDIA</td>
          </tr>
          <tr>
            <td>Estado de ánimo / depresión</td>
            <td>no elevado en los ensayos aleatorizados</td>
            <td>no elevado en los ensayos aleatorizados</td>
            <td>—</td>
            <td>MEDIA (ensayos); BAJA (observacional)</td>
          </tr>
          <tr>
            <td>Insomnio</td>
            <td>no aparece en la tabla de reacciones adversas</td>
            <td>no aparece en la tabla de reacciones adversas</td>
            <td>—</td>
            <td>BAJA</td>
          </tr>
          <tr>
            <td>Acné (cohorte post hoc)</td>
            <td>no incluido en los ensayos</td>
            <td>no incluido en los ensayos</td>
            <td>—</td>
            <td>BAJA (solo observacional)</td>
          </tr>
          <tr>
            <td>Niebla mental (FAERS de la FDA)</td>
            <td>señal emergente</td>
            <td>señal emergente</td>
            <td>—</td>
            <td>BAJA (solo farmacovigilancia)</td>
          </tr>
        </tbody>
      </table>

      <h2>¿La semaglutida causa dolor de cabeza?</h2>

      <p>
        Sí. El ensayo STEP-1 reportó dolor de cabeza en el{" "}
        <strong>14.2% de los pacientes tratados con semaglutida 2.4 mg
        frente al 10.0% con placebo</strong> [1, 3]. La tasa atribuible
        al fármaco (aproximadamente 4 puntos porcentuales por encima del
        placebo) es real pero modesta: alrededor de 1 de cada 25
        pacientes experimenta un dolor de cabeza relacionado con el
        medicamento que no habría tenido con placebo.
      </p>

      <p>
        El mecanismo más común es la deshidratación. Los pacientes con
        GLP-1 suelen beber menos agua (la sed se atenúa junto con el
        apetito), presentan una pérdida algo mayor de líquidos por las
        náuseas durante los primeros escalones de dosis y pierden peso
        con la rapidez suficiente para desencadenar dolores de cabeza
        en algunas personas. El patrón del dolor de cabeza suele mejorar
        una vez que el paciente estabiliza la ingesta de agua y el
        cuerpo se adapta a la dosis de mantenimiento.
      </p>

      <p>
        <strong>Qué hacer:</strong> aumentar la ingesta de agua a 2-3
        litros por día, vigilar la deshidratación inducida por las
        náuseas y tomar analgésicos de venta libre si es necesario
        (acetaminofén o AINE según la indicación de su proveedor de
        salud). Consulte con su proveedor de salud si los dolores de
        cabeza son intensos, persisten más allá de las primeras 4 a 6
        semanas o se acompañan de cambios visuales.
      </p>

      <h2>¿La tirzepatida causa eructos con olor a azufre?</h2>

      <p>
        Sí, y este es uno de los efectos secundarios más buscados y
        confusos de los GLP-1. La información de prescripción de la FDA
        lista la eructación (término clínico para los eructos) como una
        reacción adversa común en las etiquetas de Wegovy y Zepbound
        (≥5% según la etiqueta), frente a una tasa menor con placebo
        [3, 4].
      </p>

      <p>
        El fenómeno reportado por los pacientes como &ldquo;eructos con
        olor a azufre&rdquo; o &ldquo;eructos con olor a huevo
        podrido&rdquo; tiene un mecanismo plausible: los GLP-1
        retrasan el vaciamiento gástrico, lo que significa que los
        alimentos permanecen más tiempo en el estómago de lo habitual.
        Cuanto más tiempo esté disponible el sustrato alimentario para
        las bacterias del tracto gastrointestinal superior, más sulfuro
        de hidrógeno (H₂S) pueden producir esas bacterias, que es el
        compuesto químico responsable del olor a huevo podrido. Los
        pacientes con dietas más ricas en alimentos que contienen
        azufre (huevos, brócoli, coliflor, ajo, cebolla, carne roja,
        productos lácteos) tienen mayor probabilidad de notar este
        efecto.
      </p>

      <p>
        <strong>Qué hacer:</strong> reducir temporalmente la carga de
        azufre en la dieta durante los primeros escalones de dosis,
        asegurarse de hacer comidas más pequeñas (las comidas grandes
        amplifican el efecto del vaciamiento lento) y darle tiempo al
        cuerpo para adaptarse. El fenómeno suele mejorar de manera
        significativa después de las primeras 4 a 8 semanas de terapia.
      </p>

      <h2>¿La semaglutida o la tirzepatida causan depresión?</h2>

      <p>
        <strong>La respuesta resumida es no, pero la base de evidencia
        es genuinamente mixta y la pregunta merece una explicación
        cuidadosa.</strong>
      </p>

      <p>
        En los ensayos clínicos aleatorizados STEP-1 y SURMOUNT-1, los
        cambios del estado de ánimo y la depresión no estuvieron
        elevados por encima del placebo a ninguna tasa estadísticamente
        significativa [1, 2]. Ambos ensayos clínicos rastrearon
        específicamente los eventos adversos psiquiátricos y ninguno
        señaló una alerta.
      </p>

      <p>
        A finales de 2023, los reportes anecdóticos de ideación suicida
        en usuarios de GLP-1 llevaron al Comité de Evaluación de
        Riesgos en Farmacovigilancia (PRAC) de la Agencia Europea de
        Medicamentos a abrir una revisión formal [6].{" "}
        <strong>El PRAC concluyó la revisión en abril de 2024 sin
        encontrar evidencia de una asociación causal entre los
        agonistas del receptor de GLP-1 y los pensamientos suicidas o
        la autolesión.</strong> La FDA realizó un análisis paralelo y
        llegó a una conclusión similar. Ninguna de las dos agencias
        añadió una advertencia a las etiquetas de los GLP-1.
      </p>

      <p>
        Sin embargo, estudios observacionales y de bases de datos
        separados han reportado señales mixtas. Un estudio de cohorte
        grande de expedientes médicos electrónicos de 2024 reportó una
        tasa numéricamente mayor de diagnóstico de depresión en
        usuarios de GLP-1 frente a controles pareados; otros estudios
        observacionales no han reportado asociación alguna o incluso un
        efecto protector (consistente con la mejora documentada en la
        carga psicológica relacionada con el peso). La discrepancia
        entre los datos de los ensayos aleatorizados (sin señal) y los
        datos observacionales (mixtos) sigue sin resolverse.
      </p>

      <p>
        <strong>Qué hacer:</strong> si tiene antecedentes personales de
        depresión, ansiedad o ideación suicida, discuta la terapia con
        GLP-1 con su proveedor de salud y con un profesional de salud
        mental antes de iniciarla. Vigile activamente su estado de
        ánimo durante las primeras 8 a 12 semanas. Consulte con su
        proveedor de salud o busque atención urgente si experimenta
        cambios persistentes del estado de ánimo o pensamientos de
        autolesión.
      </p>

      <h2>¿El GLP-1 causa niebla mental?</h2>

      <p>
        Las tablas de eventos adversos de los ensayos STEP-1 y
        SURMOUNT-1 no listan la niebla mental ni el deterioro
        cognitivo como un evento adverso rastreado [1, 2]. La niebla
        mental es un síntoma inespecífico reportado por el paciente
        que es difícil de medir en la recolección estándar de eventos
        adversos de los ensayos clínicos.
      </p>

      <p>
        Sin embargo, el sistema FAERS (Sistema de Reporte de Eventos
        Adversos de la FDA) ha recibido informes de quejas cognitivas
        asociadas con los agonistas del receptor de GLP-1, pero no se
        ha establecido una señal causal. Esto vale la pena conocerlo,
        pero NO se ha añadido a la etiqueta de la FDA hasta abril de
        2026 porque las señales de farmacovigilancia son generadoras
        de hipótesis, no confirmatorias.
      </p>

      <p>
        Los mecanismos plausibles incluyen la activación del receptor
        central de GLP-1 en el hipotálamo y las vías mesolímbicas (que
        pueden producir fatiga y letargo), deficiencias nutricionales
        en la fase temprana durante la restricción calórica rápida o
        deshidratación. Paradójicamente, los datos observacionales a
        más largo plazo sugieren que el uso de GLP-1 se asocia con una
        reducción del riesgo de Alzheimer y demencia, por lo que la
        señal de niebla mental, si es real, puede ser transitoria y
        relacionada con la fase temprana de adaptación más que una
        preocupación a largo plazo.
      </p>

      <p>
        <strong>Qué hacer:</strong> vigile la función cognitiva
        durante las primeras 8 a 12 semanas. Asegure una hidratación
        adecuada, una ingesta suficiente de proteínas y un buen estado
        de las vitaminas del complejo B. La mayoría de los pacientes
        reportan mejoría cognitiva (en lugar de empeoramiento) con el
        tiempo a medida que avanza la pérdida de peso y mejoran los
        marcadores metabólicos. Los síntomas cognitivos persistentes o
        que empeoran justifican una consulta con su proveedor de
        salud.
      </p>

      <h2>¿La semaglutida o la tirzepatida causan acné?</h2>

      <p>
        El acné no aparece en las tablas de eventos adversos de los
        ensayos STEP-1 o SURMOUNT-1 ni en las secciones de reacciones
        adversas de la información de prescripción aprobada por la FDA
        [1, 2, 3, 4], y no se ha establecido formalmente como un
        efecto causal en ningún ensayo aleatorizado. Algunos pacientes
        sí reportan empeoramiento del acné mientras toman GLP-1; el
        mecanismo no está establecido y la mayoría de los reportes lo
        describen como transitorio.
      </p>

      <p>
        Los mecanismos plausibles incluyen un aumento de la secreción
        de la hormona del crecimiento → aumento del IGF-1 → aumento
        de la producción de sebo, y el hecho de que la pérdida rápida
        de peso en cualquier contexto puede afectar transitoriamente la
        función de barrera cutánea y la producción de grasa. La señal
        es más pronunciada en mujeres que en hombres en los datos de
        cohortes publicados, lo que sugiere un componente hormonal.
      </p>

      <p>
        <strong>Qué hacer:</strong> el manejo estándar del acné (limpiador
        suave, peróxido de benzoílo o ácido salicílico de venta libre,
        evitar cremas hidratantes pesadas) es razonable. Si el acné es
        intenso o persiste, consulte a un dermatólogo; no es necesario
        suspender el GLP-1 a menos que su proveedor de salud lo
        indique.
      </p>

      <h2>¿El GLP-1 afecta el sueño o causa insomnio?</h2>

      <p>
        El insomnio no se reporta con frecuencia en las tablas de
        eventos adversos de STEP-1 o SURMOUNT-1 [1, 2]. El hallazgo
        opuesto está mucho mejor documentado:{" "}
        <strong>la tirzepatida mejora sustancialmente la apnea
        obstructiva del sueño</strong> en pacientes con obesidad, según
        el ensayo SURMOUNT-OSA (Malhotra y colaboradores, NEJM 2024,
        PMID 38912654) [7]. El ensayo reportó hasta una reducción de
        dos tercios en la gravedad de la apnea obstructiva del sueño
        con la dosis más alta a lo largo de 52 semanas, lo que llevó a
        una indicación aprobada por la FDA para Zepbound en apnea
        obstructiva del sueño asociada con obesidad en diciembre de
        2024.
      </p>

      <p>
        Algunos pacientes reportan síntomas relacionados con el sueño
        como sueños vívidos o insomnio temporal durante los primeros
        escalones de dosis. Estos suelen ser transitorios y se
        resuelven en 4 a 8 semanas. La mejoría de la apnea del sueño
        es un beneficio secundario documentado de la terapia con GLP-1
        con evidencia rigurosa de ensayos clínicos, mientras que el
        insomnio de novo es un fenómeno reportado por el paciente sin
        seguimiento formal como evento adverso.
      </p>

      <h2>¿El GLP-1 afecta la libido o la función sexual?</h2>

      <p>
        La disfunción sexual no aparece en las tablas de eventos
        adversos de STEP-1 o SURMOUNT-1 [1, 2], y los ensayos
        aleatorizados no reportaron tasas elevadas. El sistema FAERS
        de la FDA ha recibido informes pero no se ha establecido una
        señal causal. La tasa de fondo de disfunción sexual en
        poblaciones con obesidad es alta, por lo que la atribución a
        nivel individual es difícil.
      </p>

      <p>
        El efecto mucho mejor documentado va en la dirección opuesta:
        la pérdida de peso en pacientes con obesidad <em>mejora</em>{" "}
        la función sexual en múltiples dominios. Los metaanálisis de
        cirugía bariátrica muestran de manera consistente mejorías en
        la libido, la función eréctil y la satisfacción sexual después
        de la pérdida de peso, y las magnitudes de pérdida de peso con
        GLP-1 son comparables a los primeros resultados de la cirugía
        bariátrica.
      </p>

      <p>
        Algunos pacientes en terapia con GLP-1 sí reportan cambios
        transitorios en la libido durante la escalada de dosis,
        posiblemente relacionados con náuseas tempranas, fatiga o
        cambios hormonales durante la pérdida de peso rápida. Estos
        generalmente se resuelven a medida que el paciente se
        estabiliza en la dosis de mantenimiento.
      </p>

      <h2>¿El GLP-1 causa cambios en el olor corporal?</h2>

      <p>
        El olor corporal no aparece en las tablas de eventos adversos
        de los ensayos clínicos ni en las secciones de reacciones
        adversas de la información de prescripción de la FDA. Los
        cambios en el olor corporal reportados por los pacientes sí
        aparecen en las comunidades en línea y pueden relacionarse
        con: (1) la alteración de la composición del sustrato del
        sudor debida a los cambios alimentarios, (2) la disbiosis
        gastrointestinal por el vaciamiento gástrico retrasado que
        modifica los compuestos volátiles en el aliento y el sudor, o
        (3) el olor corporal relacionado con la cetosis durante la
        pérdida rápida de peso temprana.
      </p>

      <p>
        Este es un fenómeno reportado por el paciente con baja
        confianza. Si lo nota, la hidratación, la fibra dietética y la
        higiene estándar generalmente lo manejan.
      </p>

      <h2>
        ¿El GLP-1 causa intolerancia al frío o cambios de temperatura?
      </h2>

      <p>
        No aparece en las tablas de eventos adversos de los ensayos
        clínicos. La sensibilidad al frío reportada por pacientes en
        terapia con GLP-1 probablemente se relaciona con dos factores:
        (1) la pérdida del aislamiento del tejido adiposo durante la
        pérdida rápida de peso reduce el aislamiento pasivo del
        cuerpo, y (2) la reducción de la ingesta calórica disminuye la
        termogénesis dietética (el calor producido al digerir y
        procesar los alimentos).
      </p>

      <p>
        Ambos mecanismos están bien documentados en cualquier contexto
        de pérdida rápida de peso (dieta, cirugía, inducida por
        fármacos). No son específicos de los GLP-1 y suelen mejorar a
        medida que el cuerpo se adapta al nuevo punto de ajuste del
        peso.
      </p>

      <h2>¿El GLP-1 afecta el gusto (disgeusia)?</h2>

      <p>
        Sí, de manera modesta. La disgeusia (alteración del gusto) se
        reporta en aproximadamente{" "}
        <strong>1.7% de los pacientes con Wegovy</strong> en la tabla
        de reacciones adversas de la información de prescripción de la
        FDA [3]. Los reportes de los pacientes suelen describir sabor
        metálico, aversiones alimentarias o alimentos específicos con
        sabor &ldquo;raro&rdquo;. El sistema FAERS de la FDA también
        ha recibido informes de disgeusia asociada con los agonistas
        del receptor de GLP-1, pero no se ha establecido una señal
        causal cuantitativa más allá de las tasas de la etiqueta.
      </p>

      <p>
        El mecanismo probablemente implica la expresión del receptor
        de GLP-1 en las células receptoras del gusto de la lengua. El
        efecto suele ser leve y transitorio, y se resuelve dentro de
        las primeras 4 a 8 semanas de terapia.
      </p>

      <h2>Qué síntomas de alarma requieren atención médica</h2>

      <p>
        La mayoría de los efectos secundarios descritos en este
        artículo son leves, transitorios y autolimitados. Los
        siguientes síntomas son diferentes e indican posibles
        complicaciones graves documentadas en las etiquetas de Wegovy
        y Zepbound [3, 4]:
      </p>

      <ul>
        <li>
          <strong>Dolor abdominal intenso que se irradia a la
          espalda</strong> — posible pancreatitis. Suspenda el
          medicamento y acuda al servicio de urgencias.
        </li>
        <li>
          <strong>Coloración amarilla de la piel o los ojos</strong>{" "}
          — posible enfermedad de la vesícula biliar. Evalúe
          urgentemente.
        </li>
        <li>
          <strong>Vómitos intensos o persistentes con orina
          oscura</strong> — riesgo de deshidratación y posible lesión
          renal aguda.
        </li>
        <li>
          <strong>Reacciones alérgicas graves</strong> (hinchazón de
          la cara o la garganta, dificultad para respirar, erupción
          grave) — suspenda el medicamento y acuda al servicio de
          urgencias de inmediato.
        </li>
        <li>
          <strong>Cambios visuales en pacientes con diabetes tipo 2</strong>{" "}
          — posible progresión de retinopatía diabética con
          Ozempic/Mounjaro.
        </li>
        <li>
          <strong>Bulto en el cuello, ronquera o dificultad para
          tragar</strong> — preocupación poco frecuente por células C
          de la tiroides, advertencia en la etiqueta.
        </li>
        <li>
          <strong>Pensamientos persistentes de autolesión</strong> —
          llame a un profesional de salud mental o al 988 (Línea de
          Prevención del Suicidio y Crisis). Suspenda el medicamento
          si su proveedor de salud lo recomienda.
        </li>
      </ul>

      <h2>Aviso importante</h2>

      <p>
        Esta guía es educativa y reporta las tasas verificadas de
        eventos adversos publicadas en la literatura de los ensayos
        clínicos y en la información de prescripción aprobada por la
        FDA. Las respuestas individuales varían sustancialmente. Nada
        de este contenido constituye asesoría médica; cualquier
        síntoma persistente o grave debe ser evaluado por su proveedor
        de salud o un profesional de la salud calificado. Los
        miméticos de incretinas como la semaglutida y la tirzepatida
        tienen contraindicaciones importantes, entre ellas
        antecedentes personales o familiares de carcinoma medular de
        tiroides y síndrome de neoplasia endocrina múltiple tipo 2
        (MEN 2). El riesgo de hipoglucemia aumenta cuando se combinan
        con insulina o sulfonilureas. Consulte con su proveedor de
        salud antes de iniciar, cambiar o suspender el tratamiento.
        En caso de emergencia médica, llame al 911 o acuda al servicio
        de urgencias más cercano. Weight Loss Rankings no brinda
        asesoría médica, diagnóstico ni recomendaciones de
        tratamiento.
      </p>

      <h2>Investigación y herramientas relacionadas</h2>

      <p>
        Para más información en español, consulte nuestras guías
        sobre{" "}
        <Link href="/research/semaglutide-para-que-sirve">
          semaglutida: para qué sirve y cómo funciona
        </Link>
        ,{" "}
        <Link href="/research/tirzepatide-para-que-sirve">
          tirzepatida: para qué sirve y cómo funciona
        </Link>{" "}
        y{" "}
        <Link href="/research/cuanto-tarda-glp1-en-hacer-efecto">
          cuánto tarda la semaglutida o la tirzepatida en hacer efecto
        </Link>
        . Para la versión original en inglés con todas las fuentes
        citadas, vea{" "}
        <Link href="/research/glp1-side-effect-questions-answered">
          GLP-1 Side Effect Q&amp;A
        </Link>
        .
      </p>

      <References items={citations} />
    </ResearchArticleLayout>
  );
}
