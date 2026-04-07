import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import { getLatestVerificationDate } from "@/lib/pricing-analytics";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References, { Cite } from "@/components/research/References";

const SLUG = "semaglutide-para-que-sirve";

export async function generateMetadata(): Promise<Metadata> {
  const article = getResearchArticleBySlug(SLUG)!;
  return {
    title: article.title,
    description: article.description,
    alternates: {
      canonical: `/research/${SLUG}`,
      languages: {
        "en-US": "/research/tirzepatide-vs-semaglutide-head-to-head",
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

export default function SemaglutideParaQueSirveArticle() {
  const article = getResearchArticleBySlug(SLUG)!;
  const dataAsOf = getLatestVerificationDate();

  return (
    <ResearchArticleLayout article={article} dataAsOf={dataAsOf}>
      <div className="mb-6 rounded-lg border border-brand-violet/20 bg-brand-violet/5 p-4 text-sm text-brand-text-secondary">
        Esta es la versión en español de nuestro material editorial sobre la
        semaglutida. Para la versión completa en inglés con el análisis
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
        La <strong>semaglutida</strong> es un medicamento inyectable que
        pertenece a la clase de los <strong>agonistas del receptor de
        GLP-1</strong>. Está aprobada por la Administración de Alimentos y
        Medicamentos de Estados Unidos (FDA) con dos nombres comerciales
        principales: <strong>Ozempic</strong>, para el tratamiento de la
        diabetes tipo 2, y <strong>Wegovy</strong>, para el manejo crónico
        del peso en adultos y adolescentes con obesidad o sobrepeso con
        enfermedades relacionadas con el peso. En el estudio clínico STEP 1
        (Wilding y colaboradores, <em>New England Journal of Medicine</em>{" "}
        2021), los adultos sin diabetes que recibieron 2.4 mg de semaglutida
        por vía subcutánea una vez por semana durante 68 semanas perdieron
        en promedio el <strong>14.9% del peso corporal</strong>, en
        comparación con el 2.4% del grupo placebo.
        <Cite n={1} />
      </p>

      <p>
        Esta guía explica en lenguaje claro qué es la semaglutida, cómo
        funciona dentro del cuerpo, para qué enfermedades la aprobó la FDA,
        qué resultados se observaron en los ensayos clínicos principales,
        cuáles son las reacciones adversas más comunes, quién no debería
        usarla y qué costos puede esperar un paciente en Estados Unidos.
        Toda la información proviene de estudios revisados por pares y de
        la información de prescripción oficial aprobada por la FDA. No
        sustituye la consulta con un médico o profesional de la salud
        calificado.
      </p>

      <h2>¿Qué es la semaglutida?</h2>

      <p>
        La semaglutida es una molécula que imita la acción de una hormona
        natural del intestino llamada <strong>péptido similar al glucagón
        tipo 1</strong> (GLP-1, por sus siglas en inglés). Cuando una
        persona come, las células del intestino liberan GLP-1, que a su vez
        envía señales al páncreas para que produzca insulina, al estómago
        para que se vacíe más lentamente y al cerebro para generar la
        sensación de saciedad. La semaglutida fue diseñada para unirse al
        mismo receptor que utiliza el GLP-1 natural, pero permanece activa
        en el organismo mucho más tiempo, lo que permite una administración
        de una sola inyección por semana.
        <Cite n={2} />
      </p>

      <p>
        La semaglutida se administra como una <strong>inyección
        subcutánea</strong> (debajo de la piel) en el abdomen, el muslo o
        la parte superior del brazo. Existe en presentación de pluma
        precargada (Ozempic y Wegovy) y en una versión oral diaria llamada
        Rybelsus, aprobada únicamente para diabetes tipo 2 a dosis más
        bajas. Esta guía se centra en la versión inyectable, que es la que
        se utiliza para la pérdida de peso.
      </p>

      <h2>¿Cómo funciona la semaglutida?</h2>

      <p>
        La semaglutida actúa principalmente de tres maneras que contribuyen
        a la pérdida de peso y al control de la glucosa en la sangre:
      </p>

      <ul>
        <li>
          <strong>Retrasa el vaciamiento del estómago</strong>, de modo que
          los alimentos permanecen más tiempo en el aparato digestivo y la
          persona se siente llena por más tiempo después de comer.
        </li>
        <li>
          <strong>Disminuye el apetito</strong>, porque el fármaco activa
          receptores de GLP-1 en áreas del cerebro (como el hipotálamo) que
          regulan la sensación de hambre y saciedad.
        </li>
        <li>
          <strong>Mejora la secreción de insulina en respuesta a la
          glucosa</strong> y reduce la producción de glucagón por el
          páncreas, lo que ayuda a controlar los niveles de azúcar en la
          sangre en personas con diabetes tipo 2.
        </li>
      </ul>

      <p>
        La semaglutida tiene una vida media aproximada de <strong>una
        semana</strong>, lo que permite su administración una sola vez a la
        semana y mantiene niveles estables del medicamento en el organismo.
        <Cite n={3} />
      </p>

      <h2>¿Para qué sirve la semaglutida? Usos aprobados por la FDA</h2>

      <p>
        En Estados Unidos, la semaglutida cuenta con varias indicaciones
        aprobadas por la FDA:
      </p>

      <ul>
        <li>
          <strong>Diabetes tipo 2 (Ozempic):</strong> como complemento de
          la dieta y el ejercicio para mejorar el control de la glucosa en
          adultos con diabetes tipo 2. También está aprobada para reducir
          el riesgo de eventos cardiovasculares mayores en adultos con
          diabetes tipo 2 y enfermedad cardiovascular establecida.
        </li>
        <li>
          <strong>Manejo crónico del peso (Wegovy):</strong> como
          complemento de una dieta con reducción de calorías y mayor
          actividad física en adultos con un índice de masa corporal (IMC)
          de 30 o más, o de 27 o más con al menos una enfermedad
          relacionada con el peso (como presión arterial alta, colesterol
          alto o diabetes tipo 2). También está aprobada en adolescentes
          desde los 12 años con obesidad.
        </li>
        <li>
          <strong>Reducción del riesgo cardiovascular en personas con
          sobrepeso u obesidad sin diabetes (Wegovy):</strong> aprobada por
          la FDA en 2024 sobre la base del estudio SELECT, que mostró una
          reducción del 20% en el riesgo relativo de eventos
          cardiovasculares mayores (infarto, accidente cerebrovascular o
          muerte cardiovascular) en adultos con enfermedad cardiovascular
          establecida y sobrepeso u obesidad sin diabetes.
          <Cite n={4} />
        </li>
        <li>
          <strong>Enfermedad renal crónica asociada con diabetes tipo 2
          (Ozempic):</strong> sobre la base del estudio FLOW (Perkovic y
          colaboradores, <em>NEJM</em> 2024), que mostró una reducción del
          24% en el riesgo de eventos renales mayores en pacientes con
          diabetes tipo 2 y enfermedad renal crónica.
          <Cite n={5} />
        </li>
      </ul>

      <h2>¿Cuánta pérdida de peso se observó en los estudios?</h2>

      <p>
        El estudio pivotal para la aprobación de Wegovy en el manejo del
        peso fue <strong>STEP 1</strong>, un ensayo clínico aleatorizado,
        doble ciego y controlado con placebo publicado en el{" "}
        <em>New England Journal of Medicine</em> en 2021. Participaron{" "}
        <strong>1,961 adultos</strong> con un IMC de 30 o más (o de 27 o
        más con al menos una enfermedad relacionada con el peso), sin
        diabetes tipo 2. Los participantes recibieron semaglutida 2.4 mg o
        placebo por vía subcutánea una vez por semana durante 68 semanas,
        junto con asesoría sobre estilo de vida.
        <Cite n={1} />
      </p>

      <p>
        Los resultados principales fueron:
      </p>

      <ul>
        <li>
          <strong>Pérdida de peso promedio:</strong> 14.9% en el grupo de
          semaglutida frente a 2.4% en el grupo placebo.
        </li>
        <li>
          Aproximadamente el <strong>86% de los participantes</strong> que
          recibieron semaglutida perdió al menos el 5% de su peso corporal
          inicial.
        </li>
        <li>
          Aproximadamente el <strong>32%</strong> perdió el 20% o más de su
          peso corporal.
        </li>
        <li>
          También se observaron mejorías en la circunferencia de la
          cintura, la presión arterial, los niveles de glucosa en ayunas y
          los marcadores de riesgo cardiovascular.
        </li>
      </ul>

      <p>
        Es importante entender que estos resultados se obtuvieron dentro
        del contexto de un ensayo clínico, con seguimiento frecuente,
        asesoría nutricional estructurada y acceso garantizado al
        medicamento. En la práctica real, la pérdida de peso suele ser
        algo menor, ya que muchos pacientes no completan la titulación
        completa de la dosis, pierden dosis o descontinúan el tratamiento
        por razones de costo o tolerabilidad.
      </p>

      <h2>Reacciones adversas más frecuentes</h2>

      <p>
        Las reacciones adversas de la semaglutida están, en su mayoría,
        relacionadas con el aparato digestivo y tienden a aparecer durante
        el período de aumento gradual de la dosis. En el estudio STEP 1,
        los efectos más frecuentes fueron:
        <Cite n={1} />
      </p>

      <ul>
        <li><strong>Náuseas</strong> (aproximadamente 44% de los pacientes)</li>
        <li><strong>Diarrea</strong> (aproximadamente 30%)</li>
        <li><strong>Vómitos</strong> (aproximadamente 24%)</li>
        <li><strong>Estreñimiento</strong> (aproximadamente 24%)</li>
        <li>Dolor abdominal, distensión, eructos y reflujo</li>
        <li>Fatiga y dolor de cabeza</li>
      </ul>

      <p>
        La mayoría de estos efectos fueron de intensidad leve o moderada y
        ocurrieron sobre todo durante las primeras semanas del tratamiento,
        cuando la dosis se está incrementando de forma escalonada.
        Aproximadamente el 7% de los participantes suspendió el medicamento
        por reacciones adversas, en comparación con el 3.1% en el grupo
        placebo.
      </p>

      <p>
        <strong>Reacciones graves menos frecuentes</strong> descritas en la
        información de prescripción incluyen pancreatitis aguda,
        enfermedad de la vesícula biliar (incluyendo cálculos biliares),
        insuficiencia renal aguda (generalmente asociada con
        deshidratación por vómitos o diarrea), retinopatía diabética
        (en personas con diabetes tipo 2), reacciones alérgicas graves y
        cambios en el estado de ánimo. Cualquier dolor abdominal
        persistente o intenso, signos de reacción alérgica o cambios
        inesperados en el estado de ánimo deben ser evaluados de inmediato
        por un médico.
      </p>

      <h2>¿Quién no debe usar semaglutida?</h2>

      <p>
        La información de prescripción aprobada por la FDA incluye una
        advertencia en recuadro (<em>boxed warning</em>) sobre el riesgo
        de tumores de células C de la tiroides. En estudios con roedores,
        la semaglutida causó tumores tiroideos; no se sabe con certeza si
        también los causa en humanos. Por esta razón, la semaglutida{" "}
        <strong>está contraindicada</strong> en personas con:
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
          Reacción alérgica grave previa a la semaglutida o a cualquiera
          de los componentes del medicamento.
        </li>
      </ul>

      <p>
        Se debe tener <strong>precaución especial</strong> y conversar
        detalladamente con el médico antes de iniciar semaglutida si
        existe:
      </p>

      <ul>
        <li>Antecedente de pancreatitis.</li>
        <li>Enfermedad de la vesícula biliar o cálculos biliares.</li>
        <li>Insuficiencia renal o problemas renales conocidos.</li>
        <li>Retinopatía diabética (en diabetes tipo 2).</li>
        <li>
          Trastornos gastrointestinales graves como gastroparesia.
        </li>
        <li>
          Embarazo, planes de embarazo o lactancia. La semaglutida{" "}
          <strong>no debe usarse durante el embarazo</strong>, y se
          recomienda suspenderla al menos dos meses antes de intentar
          concebir, debido a su larga vida media.
        </li>
      </ul>

      <p>
        Nunca inicie ni suspenda la semaglutida por cuenta propia. La
        decisión de usar este medicamento debe tomarse en conjunto con un
        profesional de la salud, quien evaluará su historia clínica
        completa, sus medicamentos actuales y sus metas de tratamiento.
      </p>

      <h2>¿Cuánto cuesta la semaglutida en Estados Unidos?</h2>

      <p>
        El precio de lista de <strong>Wegovy</strong> en Estados Unidos es
        de aproximadamente <strong>$1,349 dólares por mes</strong> (precio
        al contado sin seguro). Novo Nordisk, el fabricante, ofrece
        programas de ahorro y cupones que pueden reducir el costo para
        pacientes con seguro comercial que cumplan ciertos requisitos. La
        cobertura por parte de los seguros de salud varía mucho: algunos
        planes cubren Wegovy con requisitos de autorización previa,
        mientras que otros no cubren medicamentos para obesidad. Medicare
        generalmente no cubre Wegovy únicamente para pérdida de peso, pero
        puede cubrirlo cuando se prescribe para la reducción del riesgo
        cardiovascular en pacientes con enfermedad cardiovascular
        establecida.
      </p>

      <p>
        Algunas farmacias de compuestos (<em>compounding pharmacies</em>)
        ofrecen versiones compuestas de semaglutida a un precio mucho
        menor, en promedio alrededor de $150 a $300 dólares por mes. Sin
        embargo, la semaglutida compuesta <strong>no está aprobada por la
        FDA</strong>, no ha sido evaluada en los mismos estudios de
        seguridad y calidad que el producto de marca, y la FDA ha emitido
        advertencias sobre los riesgos de estas preparaciones. Cualquier
        consideración de una forma compuesta debe discutirse cuidadosamente
        con un médico.
      </p>

      <h2>Otros medicamentos relacionados</h2>

      <p>
        La semaglutida forma parte de una clase más amplia de medicamentos
        incretina-miméticos. Otros fármacos relacionados que pueden ser
        relevantes incluyen:
      </p>

      <ul>
        <li>
          <strong>Tirzepatida</strong> (Mounjaro, Zepbound): un agonista
          dual de los receptores de GIP y GLP-1 que ha mostrado una
          pérdida de peso aún mayor en estudios clínicos. Lea nuestra{" "}
          <Link href="/research/tirzepatide-para-que-sirve">
            guía en español sobre la tirzepatida
          </Link>
          .
        </li>
        <li>
          <strong>Liraglutida</strong> (Saxenda, Victoza): un agonista del
          receptor de GLP-1 de administración diaria, aprobado tanto para
          diabetes como para manejo crónico del peso.
        </li>
        <li>
          <strong>Dulaglutida</strong> (Trulicity): agonista del receptor
          de GLP-1 aprobado para diabetes tipo 2.
        </li>
      </ul>

      <h2>Aviso importante</h2>

      <p>
        Esta guía tiene fines únicamente educativos e informativos. No
        constituye asesoría médica ni sustituye la consulta con un médico,
        enfermero, farmacéutico u otro profesional de la salud calificado.
        Las decisiones sobre el uso de semaglutida, su dosis y su
        seguimiento deben tomarse siempre bajo supervisión médica. Si
        tiene dudas sobre los medicamentos para la pérdida de peso,
        consulte con su proveedor de salud. En caso de emergencia médica,
        llame al 911 o acuda al servicio de urgencias más cercano.
      </p>

      <References
        items={[
          {
            authors: "Wilding JPH, Batterham RL, Calanna S, et al.",
            title:
              "Once-Weekly Semaglutide in Adults with Overweight or Obesity (STEP 1).",
            source: "N Engl J Med",
            year: 2021,
            pmid: "33567185",
          },
          {
            authors: "Drucker DJ.",
            title:
              "Mechanisms of Action and Therapeutic Application of Glucagon-Like Peptide-1.",
            source: "Cell Metab",
            year: 2018,
            pmid: "29320702",
          },
          {
            authors: "Hall S, Isaacs D, Clements JN.",
            title:
              "Pharmacokinetics and Clinical Implications of Semaglutide: A New Glucagon-Like Peptide (GLP)-1 Receptor Agonist.",
            source: "Clin Pharmacokinet",
            year: 2018,
            pmid: "29915923",
          },
          {
            authors: "Lincoff AM, Brown-Frandsen K, Colhoun HM, et al.",
            title:
              "Semaglutide and Cardiovascular Outcomes in Obesity Without Diabetes (SELECT).",
            source: "N Engl J Med",
            year: 2023,
            pmid: "37952131",
          },
          {
            authors: "Perkovic V, Tuttle KR, Rossing P, et al.",
            title:
              "Effects of Semaglutide on Chronic Kidney Disease in Patients with Type 2 Diabetes (FLOW).",
            source: "N Engl J Med",
            year: 2024,
            pmid: "38785209",
          },
          {
            authors: "U.S. Food and Drug Administration.",
            title:
              "Wegovy (semaglutide) injection, for subcutaneous use — Prescribing Information.",
            source: "FDA Label",
            year: 2024,
            url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/215256s011lbl.pdf",
          },
          {
            authors: "U.S. Food and Drug Administration.",
            title:
              "Ozempic (semaglutide) injection, for subcutaneous use — Prescribing Information.",
            source: "FDA Label",
            year: 2024,
            url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/209637s026lbl.pdf",
          },
          {
            authors: "Jastreboff AM, Aronne LJ, Ahmad NN, et al.",
            title:
              "Tirzepatide Once Weekly for the Treatment of Obesity (SURMOUNT-1).",
            source: "N Engl J Med",
            year: 2022,
            pmid: "35658024",
          },
        ]}
      />
    </ResearchArticleLayout>
  );
}
