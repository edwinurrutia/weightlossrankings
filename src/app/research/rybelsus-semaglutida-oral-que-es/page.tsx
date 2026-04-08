import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References from "@/components/research/References";
import FaqSchema, { type FaqItem } from "@/components/research/FaqSchema";

const SLUG = "rybelsus-semaglutida-oral-que-es";

// FAQPage JSON-LD en español. Los datos de PIONEER 1 (PMID
// 31186300), PIONEER 6 (PMID 31185157) y OASIS 1 (PMID 37385278)
// fueron verificados directamente contra los resúmenes oficiales
// en PubMed antes de la publicación.
const FAQ_ITEMS: FaqItem[] = [
  {
    question: "¿Qué es Rybelsus?",
    answer:
      "Rybelsus es el nombre comercial de la semaglutida oral, aprobada por la FDA en septiembre de 2019 para el control glucémico en adultos con diabetes tipo 2. Es el primer y único agonista del receptor de GLP-1 en forma de pastilla — todos los demás (Ozempic, Wegovy, Zepbound, Mounjaro) son inyecciones subcutáneas. Contiene el mismo principio activo que Ozempic y Wegovy (semaglutida) pero en una formulación oral que incluye el potenciador de absorción SNAC.",
  },
  {
    question: "¿Rybelsus sirve para bajar de peso?",
    answer:
      "Rybelsus en sus dosis aprobadas originalmente (3, 7 y 14 mg) tiene indicación de la FDA solo para el control glucémico en diabetes tipo 2, no para el manejo crónico del peso. En el ensayo pivote PIONEER 1 (Aroda, Diabetes Care 2019, PMID 31186300), la dosis de 14 mg produjo una pérdida de peso promedio de aproximadamente 2.6 kg a las 26 semanas en pacientes con diabetes — mucho menos que Wegovy (semaglutida 2.4 mg inyectable) que produjo una pérdida promedio del 14.9% del peso corporal a las 68 semanas. La dosis oral de 50 mg mostró una pérdida del 15.1% a las 68 semanas en el ensayo OASIS 1 (Knop, Lancet 2023, PMID 37385278). El panorama regulatorio de las formulaciones orales de semaglutida para el manejo del peso ha evolucionado rápidamente; para la situación actual consulte Drugs@FDA o pregunte a su médico.",
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
        "RYBELSUS (semaglutide) tablets — Información de prescripción aprobada por la FDA, Sección 2 Dosis y Administración.",
      source: "FDA Approved Labeling",
      year: 2025,
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
  ];

  return (
    <ResearchArticleLayout article={article}>
      <FaqSchema items={FAQ_ITEMS} />

      <div className="mb-6 rounded-lg border border-brand-violet/20 bg-brand-violet/5 p-4 text-sm text-brand-text-secondary">
        Esta guía en español explica qué es Rybelsus (semaglutida
        oral), en qué se diferencia de las inyecciones de Ozempic y
        Wegovy, qué muestran los ensayos PIONEER 1 y PIONEER 6, y por
        qué los datos del ensayo OASIS 1 a la dosis oral de 50 mg son
        prometedores pero aún no están aprobados por la FDA para el
        manejo del peso. Todas las cifras fueron verificadas
        directamente contra los resúmenes oficiales en PubMed.
      </div>

      <p data-speakable="lead">
        Rybelsus es la única pastilla diaria de un agonista del
        receptor de GLP-1 aprobada por la FDA. Contiene el mismo
        principio activo que Ozempic y Wegovy (semaglutida), pero en
        una formulación oral que requiere instrucciones de
        administración muy específicas para funcionar. Está aprobado
        por la FDA desde septiembre de 2019 para el control glucémico
        en adultos con diabetes tipo 2 — no para el manejo crónico
        del peso, aunque los ensayos clínicos con dosis mayores han
        mostrado resultados notables en pérdida de peso que todavía
        no han recibido aprobación regulatoria. Esta guía recorre
        cómo funciona, qué datos respaldan su uso, cómo se compara
        con las inyecciones de Ozempic y Wegovy, y las reglas de
        administración que no se pueden saltar.
      </p>

      <h2>¿Qué es Rybelsus?</h2>

      <p>
        Rybelsus es el nombre comercial de la <strong>semaglutida
        oral</strong>, fabricada por Novo Nordisk. La FDA la aprobó
        en septiembre de 2019 con una indicación específica: mejorar
        el control glucémico en adultos con diabetes tipo 2, como
        complemento a la dieta y el ejercicio. Es el primer y único
        agonista del receptor de GLP-1 en forma de pastilla — todos
        los demás medicamentos de esta clase (Ozempic, Wegovy,
        Zepbound, Mounjaro, Trulicity) son inyecciones subcutáneas.
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
        honesta tiene varias capas. <strong>A la dosis aprobada
        (hasta 14 mg), Rybelsus no es una terapia para el manejo
        del peso</strong> — la pérdida de peso promedio en los
        ensayos PIONEER fue modesta (aproximadamente 2 a 3 kg en
        pacientes con diabetes), muy por debajo de lo que se
        considera un efecto clínicamente significativo para la
        obesidad.
      </p>

      <p>
        Pero en 2023 se publicó OASIS 1 (Knop et al., <em>Lancet</em>{" "}
        2023, PMID 37385278), un ensayo fase 3 que probó una dosis
        mucho más alta de semaglutida oral — <strong>50 mg una vez
        al día</strong> — en 667 adultos con sobrepeso u obesidad
        sin diabetes durante 68 semanas [3]. Los resultados:
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
        STEP-1) [5]. <strong>Rybelsus en sus dosis aprobadas
        originalmente (3, 7 y 14 mg) no tiene una indicación de la
        FDA para el manejo crónico del peso</strong> — esa marca
        está reservada exclusivamente para el control glucémico en
        diabetes tipo 2. Novo Nordisk ha estado evaluando una dosis
        oral mayor específicamente para obesidad basándose en los
        datos de OASIS. El panorama regulatorio de las
        formulaciones orales de semaglutida para el manejo del
        peso ha evolucionado rápidamente desde 2024 y puede haber
        cambiado después de la publicación de esta guía. Para
        verificar la situación actual de cualquier formulación
        oral de semaglutida aprobada por la FDA, consulte
        directamente el buscador oficial de la FDA en{" "}
        <a
          href="https://www.accessdata.fda.gov/scripts/cder/daf/"
          className="text-brand-violet hover:underline"
          rel="nofollow"
        >
          Drugs@FDA
        </a>
        {" "}(busque &quot;semaglutide&quot;) o pregunte directamente
        a su médico sobre las opciones disponibles en este momento.
        Independientemente del producto, la decisión de iniciar
        cualquier agonista del receptor de GLP-1 para el manejo del
        peso debe tomarla un profesional de la salud basándose en
        su situación clínica individual.
      </p>

      <h2>Rybelsus frente a Ozempic y Wegovy</h2>

      <table>
        <thead>
          <tr>
            <th>Característica</th>
            <th>Rybelsus</th>
            <th>Ozempic</th>
            <th>Wegovy</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Principio activo</td>
            <td>Semaglutida</td>
            <td>Semaglutida</td>
            <td>Semaglutida</td>
          </tr>
          <tr>
            <td>Forma</td>
            <td>Pastilla oral</td>
            <td>Inyección subcutánea</td>
            <td>Inyección subcutánea</td>
          </tr>
          <tr>
            <td>Frecuencia</td>
            <td>Una vez al día</td>
            <td>Una vez a la semana</td>
            <td>Una vez a la semana</td>
          </tr>
          <tr>
            <td>Dosis aprobadas</td>
            <td>3, 7, 14 mg</td>
            <td>0.25, 0.5, 1, 2 mg</td>
            <td>0.25, 0.5, 1, 1.7, 2.4 mg</td>
          </tr>
          <tr>
            <td>Indicación FDA</td>
            <td>Diabetes tipo 2</td>
            <td>Diabetes tipo 2; reducción de MACE en ECV establecida</td>
            <td>Manejo crónico del peso; reducción de MACE en ECV con obesidad</td>
          </tr>
          <tr>
            <td>Restricciones de toma</td>
            <td>Ayunas + 30 min de espera</td>
            <td>Ninguna específica</td>
            <td>Ninguna específica</td>
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
        receta indicado para la diabetes tipo 2 y no está aprobado
        por la FDA para el manejo crónico del peso. Consulte con su
        médico antes de iniciar, modificar o suspender cualquier
        tratamiento. Las instrucciones de administración específicas
        de Rybelsus son esenciales para su efectividad y no deben
        modificarse.
      </div>

      <References items={citations} />
    </ResearchArticleLayout>
  );
}
