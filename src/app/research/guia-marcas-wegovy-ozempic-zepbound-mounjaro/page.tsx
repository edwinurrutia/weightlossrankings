import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References from "@/components/research/References";

const SLUG = "guia-marcas-wegovy-ozempic-zepbound-mounjaro";

export async function generateMetadata(): Promise<Metadata> {
  const article = getResearchArticleBySlug(SLUG)!;
  return {
    title: article.title,
    description: article.description,
    alternates: {
      canonical: `/research/${SLUG}`,
      languages: {
        "en-US":
          "/research/wegovy-ozempic-zepbound-mounjaro-brand-name-cheat-sheet",
        "es-US": `/research/${SLUG}`,
      },
    },
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      locale: "es_US",
      publishedTime: article.publishedDate,
    },
  };
}

// Traducción al español de
// /research/wegovy-ozempic-zepbound-mounjaro-brand-name-cheat-sheet.
// Las marcas comerciales se mantienen en su forma original (Wegovy,
// Ozempic, Zepbound, Mounjaro, Rybelsus, Foundayo, Saxenda, Victoza,
// Trulicity). Los nombres de los principios activos se traducen
// (semaglutida, tirzepatida, liraglutida, dulaglutida). Las
// referencias provienen directamente de la información de
// prescripción aprobada por la FDA de cada producto.

export default function GuiaMarcasArticle() {
  const article = getResearchArticleBySlug(SLUG)!;

  const citations = [
    {
      authors: "Novo Nordisk Inc.",
      title:
        "WEGOVY (semaglutida) inyección — Información de prescripción aprobada por la FDA.",
      source: "FDA Approved Labeling",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/215256s024lbl.pdf",
    },
    {
      authors: "Novo Nordisk Inc.",
      title:
        "OZEMPIC (semaglutida) inyección — Información de prescripción aprobada por la FDA.",
      source: "FDA Approved Labeling",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/209637s029lbl.pdf",
    },
    {
      authors: "Novo Nordisk Inc.",
      title:
        "RYBELSUS (semaglutida) tabletas — Información de prescripción aprobada por la FDA.",
      source: "FDA Approved Labeling",
      year: 2024,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/213051s000lbl.pdf",
    },
    {
      authors: "Eli Lilly and Company.",
      title:
        "ZEPBOUND (tirzepatida) inyección — Información de prescripción aprobada por la FDA.",
      source: "FDA Approved Labeling",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/217806s016lbl.pdf",
    },
    {
      authors: "Eli Lilly and Company.",
      title:
        "MOUNJARO (tirzepatida) inyección — Información de prescripción aprobada por la FDA.",
      source: "FDA Approved Labeling",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/215866s019lbl.pdf",
    },
    {
      authors: "Eli Lilly and Company.",
      title:
        "FOUNDAYO (orforglipron) tabletas — Información de prescripción aprobada por la FDA.",
      source: "FDA Approved Labeling",
      year: 2026,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2026/foundayo-pi.pdf",
    },
  ];

  return (
    <ResearchArticleLayout article={article}>
      <div className="mb-6 rounded-lg border border-brand-violet/20 bg-brand-violet/5 p-4 text-sm text-brand-text-secondary">
        Esta es la versión en español de nuestra hoja de referencia sobre
        las marcas de GLP-1. Para la versión original en inglés, visite{" "}
        <Link
          href="/research/wegovy-ozempic-zepbound-mounjaro-brand-name-cheat-sheet"
          className="text-brand-violet hover:underline"
        >
          Wegovy vs Ozempic vs Zepbound vs Mounjaro: The GLP-1 Brand Name
          Cheat Sheet
        </Link>
        .
      </div>

      <p data-speakable="lead">
        El mercado de los agonistas del receptor de GLP-1 en 2026 es un
        enredo de marcas comerciales. Seis productos comparten tres
        ingredientes activos entre dos fabricantes, y los nombres
        comerciales no dan ninguna pista sobre cuál es cuál. Los pacientes
        buscan constantemente en internet preguntas como
        &ldquo;¿es Zepbound lo mismo que Mounjaro?&rdquo; (sí),
        &ldquo;¿es Wegovy lo mismo que Ozempic?&rdquo; (casi) y
        &ldquo;¿Zepbound es una semaglutida?&rdquo; (no — es
        tirzepatida), con un total combinado cercano a 5,800 búsquedas
        mensuales. Esta hoja de referencia aclara todo en un solo lugar,
        con las indicaciones aprobadas por la FDA y la dosificación
        tomadas directamente de la información de prescripción de cada
        producto.
      </p>

      <h2>Resumen en una página</h2>

      <table>
        <thead>
          <tr>
            <th>Nombre comercial</th>
            <th>Ingrediente activo</th>
            <th>Fabricante</th>
            <th>Indicación aprobada por la FDA</th>
            <th>Forma</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Wegovy</strong>
            </td>
            <td>Semaglutida 2.4 mg</td>
            <td>Novo Nordisk</td>
            <td>Manejo crónico del peso</td>
            <td>Pluma inyectable semanal</td>
          </tr>
          <tr>
            <td>
              <strong>Ozempic</strong>
            </td>
            <td>Semaglutida (dosis menores)</td>
            <td>Novo Nordisk</td>
            <td>
              Diabetes tipo 2 + reducción del riesgo cardiovascular +
              riñón (FLOW)
            </td>
            <td>Pluma inyectable semanal</td>
          </tr>
          <tr>
            <td>
              <strong>Rybelsus</strong>
            </td>
            <td>Semaglutida (péptido oral)</td>
            <td>Novo Nordisk</td>
            <td>Diabetes tipo 2</td>
            <td>Tableta oral diaria</td>
          </tr>
          <tr>
            <td>
              <strong>Zepbound</strong>
            </td>
            <td>Tirzepatida</td>
            <td>Eli Lilly</td>
            <td>
              Manejo crónico del peso + apnea obstructiva del sueño
            </td>
            <td>Pluma inyectable semanal</td>
          </tr>
          <tr>
            <td>
              <strong>Mounjaro</strong>
            </td>
            <td>Tirzepatida</td>
            <td>Eli Lilly</td>
            <td>Diabetes tipo 2</td>
            <td>Pluma inyectable semanal</td>
          </tr>
          <tr>
            <td>
              <strong>Foundayo</strong>
            </td>
            <td>Orforglipron (molécula pequeña)</td>
            <td>Eli Lilly</td>
            <td>Manejo crónico del peso</td>
            <td>Tableta oral diaria</td>
          </tr>
        </tbody>
      </table>

      <h2>¿Es Wegovy lo mismo que Ozempic?</h2>

      <p>
        <strong>Casi.</strong> Tanto Wegovy como Ozempic contienen el
        mismo ingrediente activo —la semaglutida— y son fabricados por
        la misma compañía, Novo Nordisk. Ambos son plumas de inyección
        subcutánea de aplicación semanal. Las diferencias son [1, 2]:
      </p>

      <ul>
        <li>
          <strong>Dosis máxima.</strong> Wegovy llega hasta 2.4 mg por
          semana (la dosis para el manejo del peso). Ozempic llega
          hasta 2.0 mg por semana (la dosis para diabetes).
        </li>
        <li>
          <strong>Indicación aprobada por la FDA.</strong> Wegovy está
          aprobado para el manejo crónico del peso en adultos y
          adolescentes con obesidad, además de la reducción del riesgo
          cardiovascular en adultos con enfermedad cardíaca conocida y
          obesidad. Ozempic está aprobado para la diabetes tipo 2, la
          reducción del riesgo cardiovascular en adultos con diabetes
          tipo 2 y enfermedad cardíaca y —más recientemente— para
          reducir el riesgo de progresión de la enfermedad renal en
          adultos con diabetes tipo 2 y enfermedad renal crónica (la
          indicación del estudio FLOW, aprobada en enero de 2025).
        </li>
        <li>
          <strong>Cobertura del seguro.</strong> Ozempic está cubierto
          por la mayoría de los planes de seguro para pacientes con
          diabetes tipo 2 porque es un medicamento para la diabetes.
          Wegovy con frecuencia queda excluido de los planes
          comerciales porque la cobertura de los medicamentos contra
          la obesidad sigue siendo una categoría inestable. Esta es la
          mayor diferencia práctica entre los dos.
        </li>
        <li>
          <strong>Ventana de almacenamiento a temperatura ambiente.</strong>{" "}
          Ozempic puede mantenerse 56 días a temperatura ambiente
          después del primer uso; Wegovy solo 28 días. Vea nuestra{" "}
          <Link href="/research/glp1-storage-shelf-life-refrigeration-guide">
            guía de almacenamiento
          </Link>{" "}
          para la comparación completa según la etiqueta de la FDA.
        </li>
      </ul>

      <p>
        En cuanto al efecto clínico, son esencialmente idénticos a
        dosis equivalentes. A veces los pacientes encuentran que su
        seguro cubre Ozempic pero no Wegovy, aunque un médico podría
        lograr resultados similares de pérdida de peso con cualquiera
        de los dos. Esto motiva muchas prescripciones de Ozempic fuera
        de la indicación aprobada (<em>off-label</em>) para la pérdida
        de peso, lo cual es legal pero complicado.
      </p>

      <h2>¿Es Zepbound lo mismo que Mounjaro?</h2>

      <p>
        <strong>Sí — son el mismo medicamento.</strong> Ambos contienen
        tirzepatida, son fabricados por Eli Lilly y son plumas de
        inyección subcutánea semanal. Las únicas diferencias [4, 5]:
      </p>

      <ul>
        <li>
          <strong>Indicación aprobada por la FDA.</strong> Zepbound
          está aprobado para el manejo crónico del peso y la apnea
          obstructiva del sueño en adultos con obesidad. Mounjaro está
          aprobado para la diabetes tipo 2. La misma molécula, dos
          etiquetas distintas.
        </li>
        <li>
          <strong>Cobertura del seguro.</strong> Igual que en el caso
          de Ozempic frente a Wegovy, Mounjaro está cubierto para los
          pacientes con diabetes, mientras que la cobertura de
          Zepbound para el manejo del peso es inconsistente entre los
          planes comerciales.
        </li>
        <li>
          <strong>Empaque.</strong> Plumas de colores distintos y
          etiquetas de farmacia diferentes, pero el medicamento activo
          que llevan dentro es idéntico.
        </li>
      </ul>

      <p>
        Si usted se pregunta &ldquo;¿debería usar Zepbound o
        Mounjaro?&rdquo;, la respuesta honesta es &ldquo;depende de lo
        que cubra su seguro y de lo que indique su médico. El
        medicamento es el mismo&rdquo;.
      </p>

      <h2>
        ¿Zepbound es una semaglutida? ¿Wegovy es una tirzepatida?
      </h2>

      <p>
        <strong>No.</strong> Esta es la confusión más frecuente sobre
        las marcas de GLP-1 en Google:
      </p>

      <ul>
        <li>
          <strong>Zepbound es tirzepatida</strong>, no semaglutida. La
          tirzepatida es un agonista dual de los receptores de GLP-1 y
          GIP, fabricado por Eli Lilly. La semaglutida es un agonista
          único del receptor de GLP-1, fabricado por Novo Nordisk.
          Moléculas distintas, fabricantes distintos.
        </li>
        <li>
          <strong>Wegovy es semaglutida</strong>, no tirzepatida. La
          misma molécula que Ozempic y Rybelsus, con marca e
          indicación distintas.
        </li>
      </ul>

      <p>
        La forma más rápida de recordarlo: si la marca empieza con W u
        O, es la semaglutida de Novo Nordisk. Si la marca empieza con
        Z o M, es la tirzepatida de Eli Lilly. Si es Rybelsus, es la
        semaglutida oral. Si es Foundayo, es el nuevo orforglipron,
        oral y no peptídico.
      </p>

      <h2>¿Qué es Rybelsus?</h2>

      <p>
        Rybelsus es <strong>semaglutida oral</strong>: el mismo
        ingrediente activo que Wegovy y Ozempic, pero formulado como
        una pastilla diaria en lugar de una inyección semanal [3].
        Para sobrevivir al ácido estomacal, Rybelsus utiliza un
        potenciador especial de absorción (SNAC) y debe tomarse con el
        estómago vacío con no más de 4 onzas de agua; el paciente debe
        esperar 30 minutos antes de comer, beber o tomar otros
        medicamentos orales.
      </p>

      <p>
        Rybelsus está aprobado por la FDA únicamente para la diabetes
        tipo 2. No está aprobado para el manejo del peso. La
        restricción práctica de la regla de estómago vacío más los 30
        minutos de espera ha limitado su adopción frente a la
        semaglutida inyectable.
      </p>

      <h2>¿Qué es Foundayo?</h2>

      <p>
        Foundayo (orforglipron) es la incorporación más reciente a la
        categoría: fue aprobado por la FDA el 1 de abril de 2026 [6].
        Es el primer agonista del receptor de GLP-1 de molécula
        pequeña no peptídica aprobado para el manejo crónico del peso.
        A diferencia de Rybelsus (que sigue siendo un péptido y exige
        tomarse con el estómago vacío), Foundayo es una verdadera
        molécula pequeña que puede tomarse a cualquier hora del día,
        con o sin alimentos.
      </p>

      <p>
        Foundayo es fabricado por Eli Lilly y se posiciona en el
        mercado entre los medicamentos inyectables y la semaglutida
        oral más antigua. Vea nuestro{" "}
        <Link href="/research/foundayo-orforglipron-fda-approval-2026">
          análisis a fondo de la aprobación de Foundayo
        </Link>{" "}
        para conocer los datos completos del estudio ATTAIN-1 y los
        precios de lanzamiento de $25 a $149 al mes.
      </p>

      <h2>Saxenda, Victoza y Trulicity: los agentes anteriores</h2>

      <p>
        Antes de la semaglutida y la tirzepatida, la categoría de los
        miméticos de incretinas estaba dominada por la liraglutida y
        la dulaglutida. Aunque ya no son las opciones más recetadas,
        siguen disponibles y vale la pena reconocerlas:
      </p>

      <ul>
        <li>
          <strong>Saxenda</strong> (liraglutida 3.0 mg): inyección
          subcutánea diaria aprobada por la FDA para el manejo crónico
          del peso. Es eficaz, pero produce menos pérdida de peso que
          la semaglutida o la tirzepatida y requiere una inyección
          diaria en lugar de semanal.
        </li>
        <li>
          <strong>Victoza</strong> (liraglutida 1.8 mg): la misma
          molécula que Saxenda, pero a una dosis menor y aprobada para
          la diabetes tipo 2.
        </li>
        <li>
          <strong>Trulicity</strong> (dulaglutida): agonista del
          receptor de GLP-1 de aplicación semanal aprobado para la
          diabetes tipo 2. Tiene efectos en la pérdida de peso, pero
          son moderados en comparación con la semaglutida o la
          tirzepatida.
        </li>
      </ul>

      <h2>Genéricos, compuestos y medicamentos de marca</h2>

      <p>
        Todos los productos anteriores son{" "}
        <strong>medicamentos de marca</strong>: las versiones aprobadas
        por la FDA, etiquetadas por el fabricante y vendidas a través
        de farmacias a los precios de marca. Existe un mercado aparte
        para la <strong>semaglutida y la tirzepatida compuestas</strong>,
        que son preparadas por farmacias de compuestos 503A y 503B a
        partir de los mismos ingredientes farmacéuticos activos, pero
        que no están aprobadas por la FDA como productos terminados.
      </p>

      <p>
        Los GLP-1 compuestos se venden principalmente a través de
        proveedores de telesalud a precios al contado significativamente
        menores que los de marca. Se envían en viales en lugar de
        plumas, y el paciente carga su propia dosis con una jeringa
        para insulina. <em>No son genéricos</em>: un genérico es una
        copia exacta de un medicamento de marca que la FDA ha aprobado
        como bioequivalente, y para estos medicamentos no existen
        genéricos. Para conocer la distinción y las consideraciones de
        calidad, vea nuestra{" "}
        <Link href="/research/compounded-semaglutide-bioequivalence">
          investigación sobre la bioequivalencia de la semaglutida
          compuesta
        </Link>
        , nuestra{" "}
        <Link href="/research/pcab-accreditation-compounding-pharmacy-investigation">
          guía sobre la acreditación PCAB
        </Link>{" "}
        y nuestro{" "}
        <Link href="/research/wegovy-pen-vs-compounded-vial-practical-differences">
          análisis a fondo de la pluma de Wegovy frente al vial
          compuesto
        </Link>
        .
      </p>

      <h2>¿Sobre cuál medicamento debería preguntarle a mi médico?</h2>

      <p>
        Para la mayoría de los adultos con obesidad y sin diabetes, el
        árbol de decisiones actual se ve aproximadamente así:
      </p>

      <ol>
        <li>
          <strong>Si el seguro lo cubre:</strong> Wegovy (mayor
          conjunto de datos para el manejo del peso) o Zepbound (mayor
          magnitud de efecto en las comparaciones directas en
          estudios). Zepbound gana en magnitud del efecto; Wegovy gana
          en datos de resultados cardiovasculares (estudio SELECT).
        </li>
        <li>
          <strong>Si tiene diabetes tipo 2:</strong> Ozempic o
          Mounjaro (la cobertura de los seguros es prácticamente
          universal para diabetes tipo 2), con el manejo del peso como
          beneficio secundario fuera de la indicación.
        </li>
        <li>
          <strong>Si el costo es la limitación principal:</strong>{" "}
          Foundayo a $149 al mes pagando en efectivo (si la menor
          magnitud de efecto resulta aceptable) o semaglutida o
          tirzepatida compuestas (en general $150 a $300 al mes).
        </li>
        <li>
          <strong>Si el problema es el rechazo a las agujas:</strong>{" "}
          Foundayo (pastilla diaria, sin restricciones de comida) o
          Rybelsus (pastilla diaria con restricciones estrictas de
          comida, menos práctico).
        </li>
      </ol>

      <p>
        Para la comparación detallada de la magnitud del efecto entre
        todos los medicamentos aprobados, vea nuestra{" "}
        <Link href="/research/tirzepatide-vs-semaglutide-head-to-head">
          comparación directa entre tirzepatida y semaglutida
        </Link>
        .
      </p>

      <h2>Conclusión</h2>

      <p>
        Cinco marcas, tres ingredientes activos, dos fabricantes y un
        mercado confuso. Wegovy y Ozempic son la misma semaglutida con
        indicaciones distintas. Zepbound y Mounjaro son la misma
        tirzepatida con indicaciones distintas. Rybelsus es la
        semaglutida oral. Foundayo es el nuevo orforglipron oral. Las
        decisiones reales suelen reducirse a lo que cubre el seguro y
        a la presentación que prefiere el paciente, no a diferencias
        farmacológicas entre productos con el mismo principio activo.
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
          ¿cuánto tarda la semaglutida o la tirzepatida en hacer
          efecto?
        </Link>
        . Para la versión original en inglés con todas las referencias,
        vea{" "}
        <Link href="/research/wegovy-ozempic-zepbound-mounjaro-brand-name-cheat-sheet">
          Wegovy vs Ozempic vs Zepbound vs Mounjaro: The GLP-1 Brand
          Name Cheat Sheet
        </Link>
        .
      </p>

      <h2>Información importante</h2>

      <p>
        Esta guía tiene fines únicamente educativos e informativos. No
        constituye asesoría médica ni sustituye la consulta con un
        médico, enfermero, farmacéutico u otro profesional de la salud
        calificado. Los miméticos de incretinas como la semaglutida y
        la tirzepatida tienen contraindicaciones importantes (entre
        ellas antecedentes personales o familiares de carcinoma
        medular de tiroides y síndrome de neoplasia endocrina múltiple
        tipo 2 [MEN 2]) y pueden causar reacciones adversas. Las
        decisiones sobre iniciar, cambiar o suspender cualquiera de
        estos medicamentos deben tomarse con su médico. Si tiene dudas
        sobre los medicamentos para la pérdida de peso, consulte con
        su proveedor de salud. En caso de emergencia médica, llame al
        911 o acuda al servicio de urgencias más cercano.
      </p>

      <References items={citations} />
    </ResearchArticleLayout>
  );
}
