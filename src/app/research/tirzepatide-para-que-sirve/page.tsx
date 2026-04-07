import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import { getLatestVerificationDate } from "@/lib/pricing-analytics";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References, { Cite } from "@/components/research/References";

const SLUG = "tirzepatide-para-que-sirve";

export async function generateMetadata(): Promise<Metadata> {
  const article = getResearchArticleBySlug(SLUG)!;
  return {
    title: { absolute: article.title },
    description: article.description,
    alternates: {
      canonical: `/research/${SLUG}`,
      languages: {
        "en-US": "/research/tirzepatide-vs-semaglutide-head-to-head",
        "es-US": `/research/${SLUG}`,
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

export default function TirzepatideParaQueSirveArticle() {
  const article = getResearchArticleBySlug(SLUG)!;
  const dataAsOf = getLatestVerificationDate();

  return (
    <ResearchArticleLayout article={article} dataAsOf={dataAsOf}>
      <div className="mb-6 rounded-lg border border-brand-violet/20 bg-brand-violet/5 p-4 text-sm text-brand-text-secondary">
        Esta es la versión en español de nuestro material editorial sobre la
        tirzepatida. Para la versión completa en inglés con el análisis
        comparativo detallado y todas las referencias, visite{" "}
        <Link
          href="/research/tirzepatide-vs-semaglutide-head-to-head"
          className="text-brand-violet hover:underline"
        >
          Tirzepatide vs Semaglutide: A Head-to-Head Look at SURMOUNT and STEP
        </Link>
        .
      </div>

      <p>
        La <strong>tirzepatida</strong> es un medicamento inyectable de
        administración semanal que pertenece a una nueva clase de
        tratamientos conocidos como <strong>agonistas duales de los
        receptores de GIP y GLP-1</strong>. Está aprobada por la
        Administración de Alimentos y Medicamentos de Estados Unidos (FDA)
        bajo dos nombres comerciales: <strong>Mounjaro</strong>, para el
        tratamiento de la diabetes tipo 2, y <strong>Zepbound</strong>,
        para el manejo crónico del peso en adultos con obesidad o
        sobrepeso con enfermedades relacionadas con el peso. Si quiere
        comparar estas marcas con Wegovy y Ozempic, consulte nuestra{" "}
        <Link href="/research/guia-marcas-wegovy-ozempic-zepbound-mounjaro">
          guía en español de las marcas de GLP-1
        </Link>
        . En el estudio
        clínico SURMOUNT-1 (Jastreboff y colaboradores, <em>New England
        Journal of Medicine</em> 2022), los adultos sin diabetes que
        recibieron 15 mg de tirzepatida por vía subcutánea una vez por
        semana durante 72 semanas perdieron en promedio el{" "}
        <strong>20.9% del peso corporal</strong>, frente al 3.1% del grupo
        placebo.
        <Cite n={1} />
      </p>

      <p>
        Esta guía explica en lenguaje claro qué es la tirzepatida, cómo
        funciona en el cuerpo, para qué enfermedades está aprobada, qué
        resultados se observaron en los estudios clínicos principales,
        cuáles son las reacciones adversas más comunes, quién no debería
        usarla y qué costos esperar en Estados Unidos. Toda la información
        proviene de estudios revisados por pares y de la información de
        prescripción oficial de la FDA. No sustituye la consulta con un
        médico o profesional de la salud calificado.
      </p>

      <h2>¿Qué es la tirzepatida?</h2>

      <p>
        La tirzepatida es una molécula que imita dos hormonas naturales
        del intestino a la vez: el <strong>péptido similar al glucagón
        tipo 1</strong> (GLP-1) y el <strong>polipéptido insulinotrópico
        dependiente de glucosa</strong> (GIP). Ambas hormonas se liberan
        cuando una persona come y le envían señales al páncreas, al
        estómago y al cerebro para regular el azúcar en la sangre y la
        sensación de saciedad. A diferencia de la semaglutida, que activa
        solo el receptor de GLP-1, la tirzepatida activa los dos
        receptores simultáneamente; por eso se le llama <em>agonista
        dual</em>. Esta doble acción es la razón principal por la que, en
        los estudios clínicos, la tirzepatida ha producido una pérdida de
        peso mayor que los agonistas que actúan únicamente sobre GLP-1.
        <Cite n={2} />
      </p>

      <p>
        La tirzepatida se administra como una <strong>inyección
        subcutánea</strong> (debajo de la piel) una vez por semana, en el
        abdomen, el muslo o la parte superior del brazo. Se presenta en
        plumas precargadas de un solo uso (Mounjaro y Zepbound) en varias
        concentraciones: 2.5 mg, 5 mg, 7.5 mg, 10 mg, 12.5 mg y 15 mg. El
        tratamiento comienza con una dosis baja y se aumenta gradualmente
        para reducir el riesgo de reacciones adversas gastrointestinales.
      </p>

      <h2>¿Cómo funciona la tirzepatida?</h2>

      <p>
        La tirzepatida actúa por varios mecanismos que, en conjunto,
        promueven la pérdida de peso y mejoran el control de la glucosa:
      </p>

      <ul>
        <li>
          <strong>Reduce el apetito</strong> al activar receptores de
          GLP-1 y GIP en áreas del cerebro que regulan el hambre, como
          el hipotálamo.
        </li>
        <li>
          <strong>Retrasa el vaciamiento del estómago</strong>, lo que
          prolonga la sensación de saciedad después de las comidas.
        </li>
        <li>
          <strong>Aumenta la secreción de insulina dependiente de
          glucosa</strong> y disminuye la liberación de glucagón, lo que
          ayuda a controlar el azúcar en la sangre sin provocar
          hipoglucemia en la mayoría de las personas.
        </li>
        <li>
          La activación del receptor de GIP parece modular también el
          metabolismo del tejido adiposo y podría contribuir a un mejor
          perfil de tolerabilidad gastrointestinal en comparación con los
          agonistas de GLP-1 puros.
        </li>
      </ul>

      <p>
        La tirzepatida tiene una vida media aproximada de <strong>cinco
        días</strong>, lo que permite la administración de una sola
        inyección por semana.
        <Cite n={3} />
      </p>

      <h2>¿Para qué sirve la tirzepatida? Usos aprobados por la FDA</h2>

      <p>
        En Estados Unidos, la tirzepatida cuenta con las siguientes
        indicaciones aprobadas por la FDA:
      </p>

      <ul>
        <li>
          <strong>Diabetes tipo 2 (Mounjaro):</strong> como complemento de
          la dieta y el ejercicio para mejorar el control de la glucosa en
          adultos con diabetes tipo 2. Aprobada en 2022.
        </li>
        <li>
          <strong>Manejo crónico del peso (Zepbound):</strong> como
          complemento de una dieta con reducción de calorías y mayor
          actividad física en adultos con un índice de masa corporal (IMC)
          de 30 o más, o de 27 o más con al menos una enfermedad
          relacionada con el peso (como presión arterial alta, colesterol
          alto, diabetes tipo 2 o apnea obstructiva del sueño). Aprobada en
          noviembre de 2023.
        </li>
        <li>
          <strong>Apnea obstructiva del sueño de moderada a severa en
          adultos con obesidad (Zepbound):</strong> aprobada por la FDA en
          diciembre de 2024, con base en los estudios SURMOUNT-OSA. Es la
          primera terapia farmacológica aprobada específicamente para la
          apnea obstructiva del sueño.
          <Cite n={4} />
        </li>
      </ul>

      <h2>¿Cuánta pérdida de peso se observó en los estudios?</h2>

      <p>
        El estudio pivotal para la aprobación de Zepbound en el manejo del
        peso fue <strong>SURMOUNT-1</strong>, publicado en el{" "}
        <em>New England Journal of Medicine</em> en 2022. Fue un ensayo
        clínico aleatorizado, doble ciego y controlado con placebo, con{" "}
        <strong>2,539 adultos</strong> con un IMC de 30 o más (o de 27 o
        más con al menos una enfermedad relacionada con el peso), sin
        diabetes tipo 2. Los participantes recibieron tirzepatida 5 mg, 10
        mg, 15 mg o placebo por vía subcutánea una vez por semana durante{" "}
        <strong>72 semanas</strong>, junto con asesoría sobre estilo de
        vida.
        <Cite n={1} />
      </p>

      <p>
        Los resultados principales fueron:
      </p>

      <ul>
        <li>
          <strong>Pérdida de peso promedio:</strong> 15.0% con la dosis de
          5 mg, 19.5% con la de 10 mg y <strong>20.9% con la dosis de 15
          mg</strong>, frente a 3.1% con placebo.
        </li>
        <li>
          Aproximadamente el <strong>91% de los participantes</strong> que
          recibieron la dosis de 15 mg perdió al menos el 5% de su peso
          corporal.
        </li>
        <li>
          Aproximadamente el <strong>57%</strong> de los participantes en
          la dosis de 15 mg perdió el 20% o más de su peso corporal.
        </li>
        <li>
          Se observaron mejorías significativas en la presión arterial,
          la circunferencia de la cintura, los niveles de glucosa en
          ayunas, los lípidos y la calidad de vida relacionada con el
          peso.
        </li>
      </ul>

      <p>
        Estos resultados se obtuvieron bajo las condiciones estructuradas
        de un ensayo clínico. En la vida real, la pérdida de peso suele
        ser algo menor debido a factores como interrupciones del
        tratamiento, costo del medicamento, tolerabilidad y adherencia al
        plan de alimentación y ejercicio. Para entender en cuánto
        tiempo se empiezan a notar los efectos de un GLP-1, consulte
        nuestra{" "}
        <Link href="/research/cuanto-tarda-glp1-en-hacer-efecto">
          guía en español sobre cuánto tarda un GLP-1 en hacer efecto
        </Link>
        .
      </p>

      <h2>Reacciones adversas más frecuentes</h2>

      <p>
        Las reacciones adversas de la tirzepatida son, en su mayoría,
        gastrointestinales y ocurren sobre todo durante el aumento gradual
        de la dosis. En el estudio SURMOUNT-1, las más frecuentes fueron:
        <Cite n={1} />
      </p>

      <ul>
        <li><strong>Náuseas</strong> (aproximadamente 33% de los pacientes con 15 mg)</li>
        <li><strong>Diarrea</strong> (aproximadamente 23%)</li>
        <li><strong>Estreñimiento</strong> (aproximadamente 17%)</li>
        <li><strong>Vómitos</strong> (aproximadamente 13%)</li>
        <li>Dolor abdominal, distensión, eructos y reflujo</li>
        <li>Fatiga y reacciones en el sitio de la inyección</li>
      </ul>

      <p>
        La mayoría de estas reacciones fueron leves o moderadas. En
        SURMOUNT-1, aproximadamente el 6.2% de los participantes con
        tirzepatida 15 mg suspendió el tratamiento por reacciones
        adversas, en comparación con el 2.6% en el grupo placebo. Para
        más detalle sobre los efectos secundarios de los GLP-1 en
        formato de preguntas y respuestas, consulte nuestra{" "}
        <Link href="/research/efectos-secundarios-glp1-preguntas-respuestas">
          guía en español sobre efectos secundarios de los GLP-1
        </Link>
        .
      </p>

      <p>
        <strong>Reacciones adversas graves menos frecuentes</strong>{" "}
        descritas en la información de prescripción incluyen pancreatitis
        aguda, enfermedad de la vesícula biliar (incluyendo cálculos
        biliares), insuficiencia renal aguda (generalmente por
        deshidratación secundaria a vómitos o diarrea), reacciones
        alérgicas graves, hipoglucemia (sobre todo cuando se combina con
        insulina o sulfonilureas), retinopatía diabética en personas con
        diabetes tipo 2 y posibles cambios en el estado de ánimo. Cualquier
        dolor abdominal intenso o persistente, signos de reacción alérgica
        o cambios inesperados en el ánimo deben ser evaluados de inmediato
        por un médico.
      </p>

      <h2>¿Quién no debe usar tirzepatida?</h2>

      <p>
        La información de prescripción aprobada por la FDA incluye una
        advertencia en recuadro (<em>boxed warning</em>) sobre el riesgo
        de tumores de células C de la tiroides observados en estudios con
        roedores. No se sabe si la tirzepatida causa estos tumores en
        humanos. Por esta razón, el medicamento{" "}
        <strong>está contraindicado</strong> en personas con:
      </p>

      <ul>
        <li>
          Antecedente personal o familiar de <strong>carcinoma medular de
          tiroides</strong>.
        </li>
        <li>
          <strong>Síndrome de neoplasia endocrina múltiple tipo 2</strong>{" "}
          (MEN 2).
        </li>
        <li>
          Reacción alérgica grave previa a la tirzepatida o a cualquiera
          de los componentes del medicamento.
        </li>
      </ul>

      <p>
        Debe tenerse <strong>precaución especial</strong> y hablar con el
        médico antes de iniciar tirzepatida en caso de:
      </p>

      <ul>
        <li>Antecedente de pancreatitis.</li>
        <li>Enfermedad de la vesícula biliar o cálculos biliares.</li>
        <li>Insuficiencia renal o problemas renales conocidos.</li>
        <li>Retinopatía diabética (en personas con diabetes tipo 2).</li>
        <li>
          Trastornos gastrointestinales graves, incluyendo gastroparesia.
        </li>
        <li>
          Uso concomitante de insulina o sulfonilureas, ya que puede
          aumentar el riesgo de hipoglucemia.
        </li>
        <li>
          Uso de anticonceptivos orales: la tirzepatida puede reducir su
          efectividad en las primeras semanas del tratamiento. Se
          recomienda usar un método anticonceptivo de barrera o cambiar a
          un método no oral durante ese período.
        </li>
        <li>
          Embarazo, planes de embarazo o lactancia. La tirzepatida{" "}
          <strong>no debe usarse durante el embarazo</strong>.
        </li>
      </ul>

      <p>
        Nunca inicie ni suspenda la tirzepatida por cuenta propia. La
        decisión debe tomarse junto con un profesional de la salud que
        evalúe su historia clínica completa, sus medicamentos actuales y
        sus metas de tratamiento.
      </p>

      <h2>¿Cuánto cuesta la tirzepatida en Estados Unidos?</h2>

      <p>
        El precio de lista de <strong>Zepbound</strong> es de
        aproximadamente <strong>$1,086 dólares por mes</strong> para las
        plumas inyectables, aunque Eli Lilly, el fabricante, ofrece viales
        de dosis única a un precio reducido a través de su programa
        directo al paciente (LillyDirect), con tarifas de aproximadamente
        $349 a $499 por mes dependiendo de la dosis. Mounjaro tiene un
        precio de lista similar. La cobertura por parte de los seguros de
        salud varía: algunos planes comerciales cubren Zepbound para
        obesidad con requisitos de autorización previa, mientras que otros
        no cubren medicamentos para pérdida de peso. Medicare, en general,
        no cubre Zepbound para pérdida de peso, pero sí cubre Zepbound
        cuando se prescribe para la apnea obstructiva del sueño en
        pacientes con obesidad.
      </p>

      <p>
        Algunas farmacias de compuestos (<em>compounding pharmacies</em>)
        ofrecen versiones compuestas de tirzepatida a precios menores. Sin
        embargo, la tirzepatida compuesta <strong>no está aprobada por la
        FDA</strong> y la agencia ha emitido comunicaciones sobre los
        riesgos asociados con estas preparaciones. Cualquier opción de
        tirzepatida compuesta debe evaluarse con cuidado junto con un
        médico.
      </p>

      <h2>Otros medicamentos relacionados</h2>

      <p>
        La tirzepatida es parte de la familia más amplia de los
        medicamentos miméticos de incretinas. Otros fármacos relacionados
        incluyen:
      </p>

      <ul>
        <li>
          <strong>Semaglutida</strong> (Ozempic, Wegovy): un agonista del
          receptor de GLP-1 también aprobado para diabetes tipo 2 y manejo
          del peso. Lea nuestra{" "}
          <Link href="/research/semaglutide-para-que-sirve">
            guía en español sobre la semaglutida
          </Link>
          .
        </li>
        <li>
          <strong>Liraglutida</strong> (Saxenda, Victoza): un agonista del
          receptor de GLP-1 de administración diaria.
        </li>
        <li>
          <strong>Dulaglutida</strong> (Trulicity): agonista del receptor
          de GLP-1 semanal aprobado para diabetes tipo 2.
        </li>
      </ul>

      <h2>Aviso importante</h2>

      <p>
        Esta guía tiene fines únicamente educativos e informativos. No
        constituye asesoría médica ni sustituye la consulta con un médico,
        enfermero, farmacéutico u otro profesional de la salud calificado.
        Las decisiones sobre el uso de tirzepatida, su dosis y su
        seguimiento deben tomarse siempre bajo supervisión médica. Si
        tiene dudas sobre los medicamentos para la pérdida de peso,
        consulte con su proveedor de salud. En caso de emergencia médica,
        llame al 911 o acuda al servicio de urgencias más cercano.
      </p>

      <References
        items={[
          {
            authors: "Jastreboff AM, Aronne LJ, Ahmad NN, et al.",
            title:
              "Tirzepatide Once Weekly for the Treatment of Obesity (SURMOUNT-1).",
            source: "N Engl J Med",
            year: 2022,
            pmid: "35658024",
          },
          {
            authors: "Min T, Bain SC.",
            title:
              "The Role of Tirzepatide, Dual GIP and GLP-1 Receptor Agonist, in the Management of Type 2 Diabetes: The SURPASS Clinical Trials.",
            source: "Diabetes Ther",
            year: 2021,
            pmid: "33367985",
          },
          {
            authors: "Urva S, Quinlan T, Landry J, et al.",
            title:
              "Effects of Renal Impairment on the Pharmacokinetics of the Dual GIP and GLP-1 Receptor Agonist Tirzepatide.",
            source: "Clin Pharmacokinet",
            year: 2021,
            pmid: "33704694",
          },
          {
            authors: "Malhotra A, Grunstein RR, Fietze I, et al.",
            title:
              "Tirzepatide for the Treatment of Obstructive Sleep Apnea and Obesity (SURMOUNT-OSA).",
            source: "N Engl J Med",
            year: 2024,
            pmid: "38912654",
          },
          {
            authors: "Wilding JPH, Batterham RL, Calanna S, et al.",
            title:
              "Once-Weekly Semaglutide in Adults with Overweight or Obesity (STEP 1).",
            source: "N Engl J Med",
            year: 2021,
            pmid: "33567185",
          },
          {
            authors: "Frias JP, Davies MJ, Rosenstock J, et al.",
            title:
              "Tirzepatide Versus Semaglutide Once Weekly in Patients with Type 2 Diabetes (SURPASS-2).",
            source: "N Engl J Med",
            year: 2021,
            pmid: "34170647",
          },
          {
            authors: "U.S. Food and Drug Administration.",
            title:
              "Zepbound (tirzepatide) injection, for subcutaneous use — Prescribing Information.",
            source: "FDA Label",
            year: 2024,
            url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/217806s000lbl.pdf",
          },
          {
            authors: "U.S. Food and Drug Administration.",
            title:
              "Mounjaro (tirzepatide) injection, for subcutaneous use — Prescribing Information.",
            source: "FDA Label",
            year: 2024,
            url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/215866s013lbl.pdf",
          },
        ]}
      />
    </ResearchArticleLayout>
  );
}
