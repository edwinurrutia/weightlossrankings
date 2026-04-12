import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References from "@/components/research/References";
import FaqSchema, { type FaqItem } from "@/components/research/FaqSchema";

const SLUG = "rybelsus-semaglutida-oral-que-es";

// FAQPage JSON-LD en español. Los datos de PIONEER 1 (PMID
// 31186300), PIONEER 6 (PMID 31185157), OASIS 1 (PMID 37385278) y
// OASIS 4 (Wharton, NEJM 2025, PMID 40934115) fueron verificados
// directamente contra los resúmenes oficiales en PubMed antes de
// la publicación. La aprobación del 22 de diciembre de 2025 de
// las tabletas de Wegovy 25 mg (semaglutida oral) para el manejo
// crónico del peso y la reducción del riesgo cardiovascular fue
// verificada directamente contra la etiqueta oficial de la FDA
// en accessdata.fda.gov/drugsatfda_docs/label/2025/218316Orig1s000lbl.pdf
// (revisión 12/2025) y contra el comunicado de prensa oficial de
// Novo Nordisk del 22 de diciembre de 2025.
const FAQ_ITEMS: FaqItem[] = [
  {
    question: "¿Qué es Rybelsus?",
    answer:
      "Rybelsus es el nombre comercial de la semaglutida oral en dosis de 3, 7 y 14 mg, aprobada por la FDA en septiembre de 2019 para el control glucémico en adultos con diabetes tipo 2. Fue la primera pastilla de un agonista del receptor de GLP-1 aprobada por la FDA. Contiene el mismo principio activo que Ozempic y Wegovy (semaglutida) pero en una formulación oral que incluye el potenciador de absorción SNAC. El 22 de diciembre de 2025 la FDA aprobó una segunda formulación oral de semaglutida — las tabletas de Wegovy 25 mg — pero para una indicación distinta (manejo crónico del peso y reducción del riesgo cardiovascular), no para diabetes.",
  },
  {
    question: "¿Rybelsus sirve para bajar de peso?",
    answer:
      "Rybelsus en sus dosis aprobadas (3, 7 y 14 mg) tiene indicación de la FDA solo para el control glucémico en diabetes tipo 2, no para el manejo crónico del peso. En el ensayo pivote PIONEER 1 (Aroda, Diabetes Care 2019, PMID 31186300), la dosis de 14 mg produjo una pérdida de peso promedio de aproximadamente 2.6 kg a las 26 semanas en pacientes con diabetes — mucho menos que Wegovy inyectable (semaglutida 2.4 mg), que produjo una pérdida promedio del 14.9% del peso corporal a las 68 semanas. Si usted busca una pastilla de semaglutida aprobada por la FDA específicamente para bajar de peso, el producto correcto no es Rybelsus sino las tabletas de Wegovy 25 mg, aprobadas por la FDA el 22 de diciembre de 2025 basándose en el ensayo OASIS 4 (Wharton, NEJM 2025, PMID 40934115). Son dos productos distintos del mismo fabricante con el mismo principio activo pero con dosis, indicaciones y precios diferentes. Esta decisión debe tomarla con un profesional de la salud.",
  },
  {
    question:
      "¿Entonces ya hay una pastilla de semaglutida aprobada por la FDA para el manejo del peso?",
    answer:
      "Sí. El 22 de diciembre de 2025 la FDA aprobó las tabletas de Wegovy (oral semaglutida) con una dosis de mantenimiento de 25 mg una vez al día, para el manejo crónico del peso en adultos con obesidad (o sobrepeso con una comorbilidad relacionada) y para reducir el riesgo de eventos adversos cardiovasculares mayores (muerte cardiovascular, infarto de miocardio no fatal o accidente cerebrovascular no fatal) en adultos con enfermedad cardiovascular establecida y obesidad o sobrepeso. Esta es una aprobación distinta de Rybelsus: es una nueva solicitud de nuevo fármaco (NDA 218316), con una dosis mayor (escalada desde 1.5 mg hasta 25 mg durante 90 días), y una indicación distinta. La base de evidencia principal fue el ensayo OASIS 4 (Wharton, NEJM 2025, PMID 40934115), un ensayo aleatorizado de 71 semanas en 307 adultos sin diabetes que mostró un cambio promedio del peso corporal de −13.6% con semaglutida oral 25 mg frente a −2.2% con placebo a las 64 semanas (diferencia de −11.4 puntos porcentuales; intervalo de confianza del 95%, −13.9 a −9.0; P menor que 0.001). Las reglas de administración son las mismas que las de Rybelsus: tomar en ayunas por la mañana con hasta 120 mL de agua corriente, esperar al menos 30 minutos antes de comer, beber otros líquidos o tomar otros medicamentos.",
  },
  {
    question: "¿Rybelsus es lo mismo que Ozempic?",
    answer:
      "El principio activo es el mismo (semaglutida) pero la formulación y la vía de administración son distintas. Ozempic es una inyección subcutánea semanal en dosis de 0.25 a 2 mg. Rybelsus es una pastilla diaria en dosis de 3, 7 o 14 mg. La biodisponibilidad oral de la semaglutida es aproximadamente del 1% — la pastilla necesita aproximadamente 100 veces más fármaco que la inyección para alcanzar una exposición similar. Ambos están aprobados por la FDA únicamente para la diabetes tipo 2.",
  },
  {
    question: "¿Cómo se toma Rybelsus?",
    answer:
      "La información de prescripción aprobada por la FDA de Rybelsus requiere instrucciones muy específicas: tomar la pastilla a primera hora de la mañana, con el estómago completamente vacío, con no más de 120 mL (aproximadamente medio vaso) de agua corriente, y esperar al menos 30 minutos antes de comer, beber cualquier otro líquido o tomar otros medicamentos. Estas instrucciones no son opcionales — si no se siguen, la absorción del fármaco cae drásticamente y el tratamiento deja de funcionar.",
  },
  {
    question: "¿Cuánto reduce Rybelsus la hemoglobina A1C?",
    answer:
      "En PIONEER 1 (26 semanas, 703 pacientes con diabetes tipo 2 sin tratamiento previo, A1C basal promedio 8.0%), las reducciones de la A1C ajustadas por placebo fueron aproximadamente 0.7 puntos porcentuales con 3 mg, 1.2 con 7 mg y 1.4 con 14 mg. Todos los cambios fueron estadísticamente significativos (P < 0.001 frente a placebo).",
  },
  {
    question: "¿Es seguro Rybelsus para el corazón?",
    answer:
      "El ensayo PIONEER 6 (Husain, NEJM 2019, PMID 31185157) evaluó los resultados cardiovasculares de Rybelsus en 3,183 pacientes con diabetes tipo 2 y alto riesgo cardiovascular durante una mediana de 15.9 meses. El resultado primario compuesto de muerte cardiovascular, infarto de miocardio no fatal y accidente cerebrovascular no fatal ocurrió en el 3.8% del grupo de semaglutida oral frente al 4.8% del grupo placebo (cociente de riesgo 0.79; intervalo de confianza del 95%, 0.57 a 1.11). El ensayo demostró no inferioridad frente a placebo.",
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
        "en-US": "/drugs/semaglutide",
        "es-US": `/es/research/${SLUG}`,
        es: `/es/research/${SLUG}`,
        "x-default": "/drugs/semaglutide",
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

export default function RybelsusSemaglutidaOralArticle() {
  const article = getResearchArticleBySlug(SLUG)!;

  const citations = [
    {
      authors:
        "Aroda VR, Rosenstock J, Terauchi Y, Altuntas Y, Lalic NM, Morales Villegas EC, Jeppesen OK, Christiansen E, Hertz CL, Haluzík M; PIONEER 1 Investigators.",
      title:
        "PIONEER 1: Randomized Clinical Trial of the Efficacy and Safety of Oral Semaglutide Monotherapy in Comparison With Placebo in Patients With Type 2 Diabetes.",
      source: "Diabetes Care",
      year: 2019,
      pmid: "31186300",
    },
    {
      authors:
        "Husain M, Birkenfeld AL, Donsmark M, Dungan K, Eliaschewitz FG, Franco DR, Jeppesen OK, Lingvay I, Mosenzon O, Pedersen SD, Tack CJ, Thomsen M, Vilsbøll T, Warren ML, Bain SC; PIONEER 6 Investigators.",
      title:
        "Oral Semaglutide and Cardiovascular Outcomes in Patients with Type 2 Diabetes.",
      source: "N Engl J Med",
      year: 2019,
      pmid: "31185157",
    },
    {
      authors:
        "Knop FK, Aroda VR, do Vale RD, Holst-Hansen T, Laursen PN, Rosenstock J, Rubino DM, Garvey WT; OASIS 1 Investigators.",
      title:
        "Oral semaglutide 50 mg taken once per day in adults with overweight or obesity (OASIS 1): a randomised, double-blind, placebo-controlled, phase 3 trial.",
      source: "Lancet",
      year: 2023,
      pmid: "37385278",
    },
    {
      authors: "Novo Nordisk Inc.",
      title:
        "RYBELSUS (semaglutide) tablets — Información de prescripción aprobada por la FDA.",
      source: "FDA Approved Labeling (NDA 213051)",
      year: 2023,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2023/213051s019lbl.pdf",
    },
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
      authors: "Novo Nordisk Inc.",
      title:
        "WEGOVY (semaglutide) injection; WEGOVY (semaglutide) tablets — Información de prescripción aprobada por la FDA, revisión 12/2025 (NDA 218316).",
      source: "FDA Approved Labeling",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/218316Orig1s000lbl.pdf",
    },
    {
      authors:
        "Wharton S, Lingvay I, Bogdanski P, Duque do Vale R, Jacob S, Karlsson T, Shaji C, Rubino D, Garvey WT; OASIS 4 Study Group.",
      title:
        "Oral Semaglutide at a Dose of 25 mg in Adults with Overweight or Obesity.",
      source: "N Engl J Med",
      year: 2025,
      pmid: "40934115",
      doi: "10.1056/NEJMoa2500969",
    },
  ];

  return (
    <ResearchArticleLayout article={article}>
      <FaqSchema items={FAQ_ITEMS} />

      <div className="mb-6 rounded-lg border border-brand-violet/20 bg-brand-violet/5 p-4 text-sm text-brand-text-secondary">
        Esta guía en español explica qué es Rybelsus (semaglutida
        oral 3/7/14 mg), en qué se diferencia de las inyecciones de
        Ozempic y Wegovy, qué muestran los ensayos PIONEER 1 y
        PIONEER 6 en diabetes tipo 2, y por qué Rybelsus no es la
        misma cosa que las nuevas tabletas de Wegovy 25 mg — una
        segunda formulación oral de semaglutida que la FDA aprobó el
        22 de diciembre de 2025 para el manejo crónico del peso y la
        reducción del riesgo cardiovascular, basándose en el ensayo
        OASIS 4. Todas las cifras clínicas y regulatorias fueron
        verificadas directamente contra los resúmenes oficiales en
        PubMed y contra la etiqueta oficial de la FDA.
      </div>

      <p data-speakable="lead">
        Rybelsus fue la primera pastilla de un agonista del receptor
        de GLP-1 aprobada por la FDA. Contiene el mismo principio
        activo que Ozempic y Wegovy (semaglutida), pero en una
        formulación oral que requiere instrucciones de administración
        muy específicas para funcionar. Está aprobado por la FDA
        desde septiembre de 2019 para el control glucémico en
        adultos con diabetes tipo 2, en dosis de 3, 7 y 14 mg — no
        para el manejo crónico del peso. Desde el 22 de diciembre de
        2025 existe una segunda formulación oral de semaglutida en
        el mercado estadounidense: las tabletas de Wegovy 25 mg,
        aprobadas para el manejo crónico del peso y la reducción del
        riesgo cardiovascular. Son dos productos distintos del mismo
        fabricante con el mismo principio activo pero con dosis,
        indicaciones y marcas diferentes. Esta guía recorre cómo
        funciona Rybelsus, qué datos respaldan su uso en diabetes,
        cómo se compara con las inyecciones de Ozempic y Wegovy, y
        qué cambió con la aprobación de las tabletas de Wegovy.
      </p>

      <h2>¿Qué es Rybelsus?</h2>

      <p>
        Rybelsus es el nombre comercial de la <strong>semaglutida
        oral en dosis de 3, 7 y 14 mg</strong>, fabricada por Novo
        Nordisk. La FDA la aprobó en septiembre de 2019 con una
        indicación específica: mejorar el control glucémico en
        adultos con diabetes tipo 2, como complemento a la dieta y
        el ejercicio. Fue la primera pastilla de un agonista del
        receptor de GLP-1 aprobada por la FDA; todos los demás
        medicamentos inyectables de esta clase (Ozempic, Wegovy
        inyectable, Zepbound, Mounjaro, Trulicity) son
        subcutáneos. El 22 de diciembre de 2025 se sumó una segunda
        formulación oral de semaglutida al mercado estadounidense:
        las <strong>tabletas de Wegovy 25 mg</strong>, aprobadas
        por la FDA para el manejo crónico del peso y la reducción
        del riesgo cardiovascular en adultos con enfermedad
        cardiovascular establecida y obesidad o sobrepeso [6, 7].
        Es importante no confundir los dos productos: Rybelsus y
        las tabletas de Wegovy contienen el mismo principio activo
        (semaglutida) pero son productos aprobados por separado con
        dosis, indicaciones y marcas distintas.
      </p>

      <p>
        El principio activo <em>semaglutida</em> es el mismo que
        contienen Ozempic (aprobado para diabetes tipo 2) y Wegovy
        (aprobado para el manejo crónico del peso). Lo que cambia no
        es la molécula sino la formulación: Rybelsus combina la
        semaglutida con un potenciador de absorción llamado
        <em> SNAC</em> (salcaprozato de sodio) que protege el
        fármaco del ácido gástrico y facilita su paso a través de la
        pared del estómago. Aun así, la biodisponibilidad oral de la
        semaglutida es de aproximadamente el 1% — por eso la pastilla
        necesita dosis mucho más altas (hasta 14 mg diarios) que la
        inyección semanal de Ozempic (hasta 2 mg) para alcanzar una
        exposición farmacológica comparable.
      </p>

      <h2>PIONEER 1: el ensayo pivote de control glucémico</h2>

      <p>
        La aprobación de Rybelsus se basó principalmente en los
        resultados de la serie de ensayos PIONEER. El ensayo más
        citado es PIONEER 1 (Aroda et al., <em>Diabetes Care</em>{" "}
        2019, PMID 31186300) [1]:
      </p>

      <ul>
        <li>
          <strong>Población:</strong> 703 adultos con diabetes tipo
          2 que no estaban recibiendo tratamiento farmacológico
          previo (monoterapia). A1C promedio al inicio: 8.0%.
        </li>
        <li>
          <strong>Diseño:</strong> ensayo aleatorizado, doble ciego y
          controlado con placebo en 93 sitios de 9 países.
          Aleatorización 1:1:1:1 a cuatro grupos.
        </li>
        <li>
          <strong>Brazos:</strong> semaglutida oral 3 mg, 7 mg o 14
          mg una vez al día, o placebo.
        </li>
        <li>
          <strong>Duración:</strong> 26 semanas.
        </li>
      </ul>

      <h3>Reducción de la hemoglobina A1C</h3>

      <p>
        Las reducciones de la A1C ajustadas por placebo (&quot;trial
        product estimand&quot;, el análisis preespecificado que
        estima el efecto del fármaco como si todos los pacientes lo
        hubieran tomado tal como se prescribió) fueron [1]:
      </p>

      <table>
        <thead>
          <tr>
            <th>Dosis de semaglutida oral</th>
            <th>Reducción de A1C (ajustada por placebo)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>3 mg</td>
            <td>−0.7 puntos porcentuales</td>
          </tr>
          <tr>
            <td>7 mg</td>
            <td>−1.2 puntos porcentuales</td>
          </tr>
          <tr>
            <td>14 mg</td>
            <td>−1.4 puntos porcentuales</td>
          </tr>
        </tbody>
      </table>

      <p>
        Todas las comparaciones frente a placebo fueron
        estadísticamente significativas (P &lt; 0.001). La
        conclusión textual de los autores fue que la semaglutida
        oral en monoterapia demostró mejorías superiores y
        clínicamente relevantes en la A1C (todas las dosis) y la
        pérdida de peso (dosis de 14 mg) frente a placebo, con un
        perfil de seguridad consistente con otros agonistas del
        receptor de GLP-1 [1].
      </p>

      <h3>Pérdida de peso en PIONEER 1</h3>

      <p>
        El cambio de peso corporal a las 26 semanas fue modesto
        comparado con los ensayos de semaglutida inyectable para el
        manejo del peso [1]:
      </p>

      <ul>
        <li>Semaglutida oral 3 mg: aproximadamente −0.2 kg</li>
        <li>Semaglutida oral 7 mg: aproximadamente −1.0 kg</li>
        <li>Semaglutida oral 14 mg: aproximadamente −2.6 kg</li>
      </ul>

      <p>
        Estas cifras no deben interpretarse como evidencia de que
        Rybelsus sirve para bajar de peso en pacientes sin diabetes.
        Son pérdidas de peso modestas medidas en una población con
        diabetes tipo 2 durante 26 semanas, no en una población con
        obesidad durante 68 semanas como en el ensayo pivote de
        Wegovy (STEP-1, Wilding, NEJM 2021, PMID 33567185) [5].
        Para comparación: Wegovy (semaglutida 2.4 mg inyectable)
        produjo una pérdida promedio del <strong>14.9% del peso
        corporal</strong> a las 68 semanas en pacientes con
        sobrepeso u obesidad sin diabetes [5]. Consulte{" "}
        <Link
          href="/es/research/cuanto-peso-se-pierde-wegovy-zepbound"
          className="text-brand-violet hover:underline"
        >
          nuestra guía sobre cuánto peso se pierde con Wegovy y
          Zepbound
        </Link>{" "}
        para los datos completos.
      </p>

      <h2>PIONEER 6: resultados cardiovasculares</h2>

      <p>
        PIONEER 6 (Husain et al., <em>New England Journal of
        Medicine</em> 2019, PMID 31185157) fue el ensayo de
        resultados cardiovasculares que la FDA requería para aprobar
        un nuevo fármaco antidiabético [2]:
      </p>

      <ul>
        <li>
          <strong>Población:</strong> 3,183 adultos con diabetes
          tipo 2 y alto riesgo cardiovascular (edad ≥50 años con
          enfermedad cardiovascular o renal crónica establecida, o
          edad ≥60 años con factores de riesgo cardiovascular
          únicamente).
        </li>
        <li>
          <strong>Diseño:</strong> ensayo aleatorizado, doble ciego
          y controlado con placebo.
        </li>
        <li>
          <strong>Duración:</strong> mediana de 15.9 meses de
          seguimiento.
        </li>
        <li>
          <strong>Resultado primario:</strong> evento adverso
          cardiovascular mayor compuesto de 3 puntos (muerte
          cardiovascular, infarto de miocardio no fatal o accidente
          cerebrovascular no fatal).
        </li>
      </ul>

      <p>
        El resultado primario ocurrió en el 3.8% (61 de 1,591
        pacientes) del grupo de semaglutida oral frente al 4.8% (76
        de 1,592 pacientes) del grupo placebo, con un cociente de
        riesgo de 0.79 (intervalo de confianza del 95%, 0.57 a 1.11)
        [2]. El ensayo cumplió el umbral preestablecido de no
        inferioridad frente a placebo (P &lt; 0.001 para no
        inferioridad), pero no alcanzó superioridad estadística. En
        la práctica, esto significa que Rybelsus no aumenta el
        riesgo cardiovascular y mostró una tendencia numérica hacia
        la reducción de eventos sin llegar a confirmarla.
      </p>

      <h2>Cómo se toma Rybelsus: las reglas que no son negociables</h2>

      <p>
        La información de prescripción aprobada por la FDA de
        Rybelsus incluye instrucciones de administración muy
        específicas que son esenciales para que el fármaco funcione
        [4]. No son sugerencias — son requisitos farmacocinéticos
        para que el potenciador SNAC pueda hacer su trabajo en el
        estómago vacío:
      </p>

      <ol>
        <li>
          <strong>A primera hora de la mañana.</strong> Antes de
          cualquier otra comida, bebida o medicamento del día.
        </li>
        <li>
          <strong>Con el estómago completamente vacío.</strong> Al
          menos varias horas después de la última comida.
        </li>
        <li>
          <strong>Con no más de 120 mL de agua corriente.</strong>
          {" "}Aproximadamente medio vaso. No con café, té, jugo ni
          otros líquidos — solo agua.
        </li>
        <li>
          <strong>Tragar la pastilla entera.</strong> No dividir,
          aplastar ni masticar.
        </li>
        <li>
          <strong>Esperar al menos 30 minutos</strong> antes de
          comer, beber cualquier otro líquido, o tomar cualquier
          otro medicamento oral.
        </li>
      </ol>

      <p>
        Si estas reglas no se siguen, la absorción del fármaco cae
        drásticamente y el tratamiento deja de funcionar. Este es
        uno de los puntos más frecuentemente mal entendidos por los
        pacientes que empiezan Rybelsus.
      </p>

      <h2>Escalada de dosis</h2>

      <p>
        La información de prescripción aprobada por la FDA
        establece una escalada de dosis para mejorar la
        tolerabilidad [4]:
      </p>

      <ul>
        <li>
          <strong>Semanas 1 a 4:</strong> 3 mg una vez al día. Esta
          dosis inicial sirve para reducir los efectos secundarios
          gastrointestinales; no se considera terapéuticamente
          eficaz por sí sola.
        </li>
        <li>
          <strong>Semanas 5 en adelante:</strong> aumentar a 7 mg
          una vez al día como dosis de mantenimiento inicial.
        </li>
        <li>
          <strong>Si se necesita más control glucémico:</strong>{" "}
          después de al menos 30 días con 7 mg, el médico puede
          aumentar a 14 mg una vez al día.
        </li>
      </ul>

      <h2>¿Puede Rybelsus usarse para bajar de peso?</h2>

      <p>
        Esta es la pregunta más común sobre Rybelsus y la respuesta
        honesta tiene varias capas. <strong>A las dosis aprobadas
        (3, 7 y 14 mg), Rybelsus no es una terapia para el manejo
        del peso</strong> — la pérdida de peso promedio en los
        ensayos PIONEER fue modesta (aproximadamente 2 a 3 kg en
        pacientes con diabetes), muy por debajo de lo que se
        considera un efecto clínicamente significativo para la
        obesidad. La etiqueta oficial de Rybelsus aprobada por la
        FDA limita su indicación al control glucémico en diabetes
        tipo 2 y no incluye el manejo crónico del peso [4].
      </p>

      <p>
        Pero los datos de dosis orales mayores de semaglutida en
        poblaciones sin diabetes son sorprendentes. En 2023 se
        publicó OASIS 1 (Knop et al., <em>Lancet</em> 2023, PMID
        37385278), un ensayo fase 3 que probó{" "}
        <strong>semaglutida oral 50 mg</strong> una vez al día en
        667 adultos con sobrepeso u obesidad sin diabetes durante
        68 semanas [3]:
      </p>

      <ul>
        <li>
          Semaglutida oral 50 mg: pérdida promedio del{" "}
          <strong>15.1%</strong> del peso corporal
        </li>
        <li>
          Placebo: pérdida promedio del <strong>2.4%</strong>
        </li>
        <li>
          Diferencia entre grupos: 12.7 puntos porcentuales a favor
          de la semaglutida oral (P &lt; 0.0001)
        </li>
      </ul>

      <p>
        Esta magnitud de pérdida de peso es comparable a la que
        produce la semaglutida inyectable 2.4 mg (Wegovy, 14.9% en
        STEP-1) [5]. Basándose en este y otros ensayos posteriores
        del programa OASIS, Novo Nordisk solicitó a la FDA la
        aprobación de una formulación oral de semaglutida
        específicamente para el manejo del peso.
      </p>

      <h2>
        Diciembre de 2025: la FDA aprueba las tabletas de Wegovy 25 mg
      </h2>

      <p>
        El <strong>22 de diciembre de 2025</strong> la FDA aprobó
        las <strong>tabletas de Wegovy</strong>{" "}
        (semaglutida oral) como la primera pastilla de un agonista
        del receptor de GLP-1 aprobada en Estados Unidos para el
        manejo crónico del peso [6, 7]. La aprobación corresponde
        a la nueva solicitud de nuevo fármaco NDA 218316 — es un
        producto distinto de Rybelsus (NDA 213051) y distinto
        también de Wegovy inyectable (NDA 215256). Según la
        etiqueta oficial de la FDA revisada en diciembre de 2025
        [6], las tabletas de Wegovy están indicadas, en
        combinación con una dieta hipocalórica y un aumento de la
        actividad física:
      </p>

      <ul>
        <li>
          Para reducir el riesgo de eventos adversos cardiovasculares
          mayores (muerte cardiovascular, infarto de miocardio no
          fatal o accidente cerebrovascular no fatal) en adultos con
          enfermedad cardiovascular establecida y obesidad o
          sobrepeso.
        </li>
        <li>
          Para reducir el exceso de peso corporal y mantener la
          reducción de peso a largo plazo en adultos con obesidad, o
          en adultos con sobrepeso en presencia de al menos una
          comorbilidad relacionada con el peso.
        </li>
      </ul>

      <h3>Dosis y escalada</h3>

      <p>
        La escalada de dosis de las tabletas de Wegovy aprobada por
        la FDA es distinta de la de Rybelsus y utiliza dosis mucho
        mayores [6]:
      </p>

      <table>
        <thead>
          <tr>
            <th>Días</th>
            <th>Dosis diaria</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1 a 30</td>
            <td>1.5 mg (dosis inicial)</td>
          </tr>
          <tr>
            <td>31 a 60</td>
            <td>4 mg</td>
          </tr>
          <tr>
            <td>61 a 90</td>
            <td>9 mg</td>
          </tr>
          <tr>
            <td>91 en adelante</td>
            <td>25 mg (mantenimiento)</td>
          </tr>
        </tbody>
      </table>

      <p>
        Las reglas de administración son las mismas que las de
        Rybelsus y no son negociables: tomar una sola tableta por
        la mañana con el estómago vacío, con hasta 120 mL (4 onzas)
        de agua corriente, tragar entera sin partir ni masticar, y
        esperar al menos 30 minutos antes de comer, beber
        cualquier otro líquido o tomar otros medicamentos orales
        [6]. La etiqueta también indica que los pacientes que ya
        están usando la inyección de Wegovy 2.4 mg pueden cambiar
        a las tabletas de 25 mg una semana después de descontinuar
        la inyección [6].
      </p>

      <h3>OASIS 4: el ensayo pivote de las tabletas de Wegovy</h3>

      <p>
        La base de evidencia principal de la aprobación fue el
        ensayo <strong>OASIS 4</strong> (Wharton et al.,{" "}
        <em>New England Journal of Medicine</em> 2025, PMID
        40934115) [7]:
      </p>

      <ul>
        <li>
          <strong>Diseño:</strong> ensayo aleatorizado, doble
          ciego y controlado con placebo de 71 semanas, en 22
          sitios de cuatro países.
        </li>
        <li>
          <strong>Población:</strong> 307 adultos sin diabetes, con
          un índice de masa corporal de al menos 30 kg/m², o al
          menos 27 kg/m² con una comorbilidad relacionada con la
          obesidad. 205 fueron asignados a semaglutida oral 25 mg
          y 102 a placebo.
        </li>
        <li>
          <strong>Intervención:</strong> semaglutida oral 25 mg una
          vez al día más intervenciones de estilo de vida, frente a
          placebo más intervenciones de estilo de vida.
        </li>
      </ul>

      <p>
        El resultado primario fue el cambio porcentual del peso
        corporal a las 64 semanas. Los pacientes asignados a
        semaglutida oral 25 mg perdieron en promedio el{" "}
        <strong>13.6%</strong> del peso corporal, frente al{" "}
        <strong>2.2%</strong> en el grupo placebo — una diferencia
        de <strong>−11.4 puntos porcentuales</strong> (intervalo
        de confianza del 95%, −13.9 a −9.0; P &lt; 0.001) [7]. La
        proporción de pacientes que alcanzó umbrales de ≥5%, ≥10%,
        ≥15% y ≥20% de pérdida de peso fue significativamente
        mayor con semaglutida que con placebo (P &lt; 0.001 para
        todos los umbrales) [7]. Los eventos adversos
        gastrointestinales fueron más frecuentes con semaglutida
        que con placebo (<strong>74.0% frente a 42.2%</strong>)
        [7]. Los autores concluyeron que la semaglutida oral a una
        dosis de 25 mg una vez al día produjo una mayor reducción
        promedio del peso corporal que el placebo.
      </p>

      <h3>Cómo encaja todo esto</h3>

      <p>
        La consecuencia práctica de la aprobación de diciembre de
        2025 es que ahora existen en Estados Unidos{" "}
        <strong>dos productos orales de semaglutida</strong>{" "}
        aprobados por la FDA, con indicaciones distintas:
      </p>

      <ul>
        <li>
          <strong>Rybelsus</strong> (3, 7 o 14 mg diarios) — solo
          para el control glucémico en diabetes tipo 2.
        </li>
        <li>
          <strong>Tabletas de Wegovy</strong> (escalada hasta 25 mg
          diarios) — para el manejo crónico del peso y la reducción
          del riesgo cardiovascular en adultos con obesidad o
          sobrepeso con comorbilidades.
        </li>
      </ul>

      <p>
        Si su objetivo clínico es el control glucémico en diabetes
        tipo 2, el producto correcto sigue siendo Rybelsus. Si su
        objetivo es el manejo crónico del peso con una pastilla de
        semaglutida, el producto correcto son las tabletas de Wegovy
        25 mg, no Rybelsus. La decisión de iniciar cualquier
        agonista del receptor de GLP-1 debe tomarla un profesional
        de la salud basándose en su situación clínica individual,
        sus comorbilidades y su cobertura de seguro. Para
        verificar la situación regulatoria actual de cualquier
        formulación de semaglutida, puede consultar directamente
        el buscador oficial de la FDA en{" "}
        <a
          href="https://www.accessdata.fda.gov/scripts/cder/daf/"
          className="text-brand-violet hover:underline"
          rel="nofollow"
        >
          Drugs@FDA
        </a>
        {" "}(busque &quot;semaglutide&quot;).
      </p>

      <h2>
        Rybelsus, Ozempic, Wegovy inyectable y tabletas de Wegovy
      </h2>

      <p>
        Los cuatro productos son semaglutida. Lo que cambia es la
        forma, la dosis, la frecuencia y la indicación aprobada por
        la FDA:
      </p>

      <table>
        <thead>
          <tr>
            <th>Característica</th>
            <th>Rybelsus</th>
            <th>Ozempic</th>
            <th>Wegovy inyectable</th>
            <th>Tabletas de Wegovy</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Principio activo</td>
            <td>Semaglutida</td>
            <td>Semaglutida</td>
            <td>Semaglutida</td>
            <td>Semaglutida</td>
          </tr>
          <tr>
            <td>Forma</td>
            <td>Pastilla oral</td>
            <td>Inyección subcutánea</td>
            <td>Inyección subcutánea</td>
            <td>Pastilla oral</td>
          </tr>
          <tr>
            <td>Frecuencia</td>
            <td>Una vez al día</td>
            <td>Una vez a la semana</td>
            <td>Una vez a la semana</td>
            <td>Una vez al día</td>
          </tr>
          <tr>
            <td>Dosis aprobadas</td>
            <td>3, 7, 14 mg</td>
            <td>0.25, 0.5, 1, 2 mg</td>
            <td>0.25, 0.5, 1, 1.7, 2.4 mg</td>
            <td>1.5, 4, 9, 25 mg</td>
          </tr>
          <tr>
            <td>Indicación FDA</td>
            <td>Diabetes tipo 2</td>
            <td>
              Diabetes tipo 2; reducción de MACE en ECV establecida
            </td>
            <td>
              Manejo crónico del peso; reducción de MACE en ECV con
              obesidad; MASH con fibrosis F2-F3
            </td>
            <td>
              Manejo crónico del peso; reducción de MACE en ECV con
              obesidad
            </td>
          </tr>
          <tr>
            <td>Año de aprobación inicial</td>
            <td>Septiembre de 2019</td>
            <td>Diciembre de 2017</td>
            <td>Junio de 2021</td>
            <td>Diciembre de 2025</td>
          </tr>
          <tr>
            <td>Restricciones de toma</td>
            <td>Ayunas + 30 min de espera</td>
            <td>Ninguna específica</td>
            <td>Ninguna específica</td>
            <td>Ayunas + 30 min de espera</td>
          </tr>
        </tbody>
      </table>

      <h2>Efectos secundarios</h2>

      <p>
        El perfil de efectos secundarios de Rybelsus es similar al
        de la semaglutida inyectable. En los ensayos PIONEER, los
        eventos adversos más frecuentes fueron de naturaleza
        gastrointestinal (náuseas, diarrea, vómitos, dolor
        abdominal, estreñimiento) y la mayoría se describieron
        como leves a moderados y transitorios [1, 2]. Las tasas de
        descontinuación del tratamiento por efectos secundarios en
        PIONEER 1 fueron del 2.3% al 7.4% con semaglutida oral
        (según dosis) frente al 2.2% con placebo [1]. Para el
        calendario completo de los efectos gastrointestinales y su
        duración, consulte nuestra guía de{" "}
        <Link
          href="/es/research/semaglutida-efectos-secundarios-duracion"
          className="text-brand-violet hover:underline"
        >
          semaglutida: cuánto duran los efectos secundarios
        </Link>
        .
      </p>

      <h2>Lecturas relacionadas en español</h2>

      <ul>
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
            href="/es/research/semaglutida-efectos-secundarios-duracion"
            className="text-brand-violet hover:underline"
          >
            Semaglutida: cuánto duran los efectos secundarios
          </Link>
        </li>
        <li>
          <Link
            href="/es/research/mounjaro-vs-ozempic-diabetes-surpass-2"
            className="text-brand-violet hover:underline"
          >
            Mounjaro vs Ozempic en diabetes tipo 2 (SURPASS-2)
          </Link>
        </li>
      </ul>

      <div className="mt-8 rounded-lg border border-brand-violet/20 bg-brand-bg-purple/30 p-4 text-sm text-brand-text-secondary">
        <strong>Aviso médico:</strong> esta guía es informativa y no
        sustituye la consulta médica. Rybelsus es un medicamento con
        receta indicado por la FDA para la diabetes tipo 2 y no está
        aprobado para el manejo crónico del peso. Las tabletas de
        Wegovy 25 mg son un producto distinto con dosis,
        indicaciones y marcas propias; aunque contienen el mismo
        principio activo (semaglutida), no deben confundirse con
        Rybelsus. Consulte con su médico antes de iniciar, modificar
        o suspender cualquier tratamiento. Las instrucciones de
        administración específicas de Rybelsus y de las tabletas de
        Wegovy son esenciales para su efectividad y no deben
        modificarse.
      </div>

      <References items={citations} />
    </ResearchArticleLayout>
  );
}
