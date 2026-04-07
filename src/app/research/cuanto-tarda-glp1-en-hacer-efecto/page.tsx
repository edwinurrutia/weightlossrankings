import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References from "@/components/research/References";

const SLUG = "cuanto-tarda-glp1-en-hacer-efecto";

export async function generateMetadata(): Promise<Metadata> {
  const article = getResearchArticleBySlug(SLUG)!;
  return {
    title: article.title,
    description: article.description,
    alternates: {
      canonical: `/research/${SLUG}`,
      languages: {
        "en-US": "/research/how-long-does-glp1-take-to-work",
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

// Traducción al español de /research/how-long-does-glp1-take-to-work.
// Fuentes primarias: STEP-1 (Wilding NEJM 2021, PMID 33567185),
// SURMOUNT-1 (Jastreboff NEJM 2022, PMID 35658024), Hall et al 2018
// (PMID 29915923, farmacocinética de semaglutida), Urva et al 2021
// (PMID 33704694, farmacocinética de tirzepatida), e información de
// prescripción aprobada por la FDA de Wegovy y Zepbound. Todos los
// datos semana-a-semana se toman de los informes publicados de los
// estudios y de sus suplementos.

export default function CuantoTardaGlp1EnHacerEfectoArticle() {
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
      authors: "Hall S, Isaacs D, Clements JN.",
      title:
        "Pharmacokinetics and Clinical Implications of Semaglutide: A New Glucagon-Like Peptide (GLP)-1 Receptor Agonist.",
      source: "Clinical Pharmacokinetics",
      year: 2018,
      pmid: "29915923",
    },
    {
      authors: "Urva S, Quinlan T, Landry J, Martin J, Loghin C.",
      title:
        "Effects of Renal Impairment on the Pharmacokinetics of the Dual GIP and GLP-1 Receptor Agonist Tirzepatide.",
      source: "Clinical Pharmacokinetics",
      year: 2021,
      pmid: "33704694",
    },
    {
      authors: "Novo Nordisk Inc.",
      title:
        "WEGOVY (semaglutide) injection — Información de prescripción aprobada por la FDA.",
      source: "FDA Approved Labeling",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/215256s024lbl.pdf",
    },
    {
      authors: "Eli Lilly and Company.",
      title:
        "ZEPBOUND (tirzepatide) injection — Información de prescripción aprobada por la FDA.",
      source: "FDA Approved Labeling",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/217806s016lbl.pdf",
    },
  ];

  return (
    <ResearchArticleLayout article={article}>
      <div className="mb-6 rounded-lg border border-brand-violet/20 bg-brand-violet/5 p-4 text-sm text-brand-text-secondary">
        Esta es la versión en español de nuestro análisis sobre cuánto tarda
        un agonista del receptor de GLP-1 en hacer efecto. Para la versión
        original en inglés con todas las referencias clínicas, visite{" "}
        <Link
          href="/research/how-long-does-glp1-take-to-work"
          className="text-brand-violet hover:underline"
        >
          How Long Does Semaglutide and Tirzepatide Take to Work?
        </Link>
        .
      </div>

      <p data-speakable="lead">
        La pregunta más frecuente de quienes inician un agonista del
        receptor de GLP-1 es alguna variante de{" "}
        <em>&ldquo;¿cuánto tarda en hacer efecto?&rdquo;</em> La respuesta
        honesta es que los estudios clínicos miden{" "}
        <strong>tres escalas de tiempo distintas</strong>, y entender cuál
        de las tres le interesa determina la respuesta. A las pocas horas
        de la primera inyección, el vaciamiento gástrico se vuelve más
        lento y la mayoría de los pacientes nota que se sienten llenos
        antes. En 4 a 5 semanas a cualquier dosis fija, el medicamento
        alcanza el estado estacionario en plasma. Entre las 4 y las 8
        semanas, la báscula empieza a moverse de forma notable, y las
        curvas completas de pérdida de peso de STEP-1 y SURMOUNT-1 no
        llegan a la meseta sino hasta aproximadamente la semana 60 a 68
        [1, 2]. Este artículo recorre las tres escalas usando los datos
        verificados de los estudios STEP-1 y SURMOUNT-1, para que sepa
        qué esperar en cada etapa — y qué hacer si la curva no coincide
        con lo esperado.
      </p>

      <h2>Escala 1: Supresión del apetito (horas a días)</h2>

      <p>
        El efecto más rápido del GLP-1 es el que los pacientes sienten
        primero. Los agonistas del receptor de GLP-1 retrasan el
        vaciamiento gástrico — los alimentos permanecen más tiempo en
        el estómago — y envían señales de saciedad al tronco encefálico.
        Ambos efectos comienzan a las pocas horas de la primera
        inyección, incluso antes de que el medicamento haya alcanzado
        concentraciones plasmáticas de estado estacionario [3, 5]. Los
        pacientes suelen reportar sentirse llenos más rápido dentro de
        los primeros 1 a 3 días de la primera dosis de 0.25 mg de
        semaglutida, y el efecto se intensifica a medida que la dosis
        se escala y la concentración plasmática se acumula.
      </p>

      <p>
        Este efecto inicial es real, pero también es{" "}
        <em>incompleto</em>. La supresión del apetito plena a cada
        nivel de dosis no se alcanza hasta que las concentraciones
        plasmáticas se aproximan al estado estacionario, lo cual tarda
        aproximadamente 4 a 5 semanas por cada escalón de dosis (ver
        Escala 2 más abajo). Por eso el esquema de titulación aprobado
        por la FDA mantiene al paciente en cada dosis durante 4 semanas
        antes de aumentarla — tanto los patrocinadores del estudio como
        la FDA quieren que usted sienta el efecto completo de cada
        dosis antes de decidir si escalar [5, 6].
      </p>

      <h2>
        Escala 2: Farmacocinética de estado estacionario (4 a 5 semanas
        por dosis)
      </h2>

      <p>
        Los dos agonistas inyectables de GLP-1 aprobados por la FDA
        para la pérdida de peso tienen vidas medias de eliminación
        prolongadas [3, 4]:
      </p>

      <ul>
        <li>
          <strong>Semaglutida (Wegovy, Ozempic):</strong> vida media de
          eliminación de aproximadamente 7 días [3]
        </li>
        <li>
          <strong>Tirzepatida (Zepbound, Mounjaro):</strong> vida media
          de eliminación de aproximadamente 5 días [4]
        </li>
      </ul>

      <p>
        La concentración plasmática en estado estacionario se alcanza
        después de 4 a 5 vidas medias con una dosis constante. Para la
        semaglutida esto equivale aproximadamente a 4 a 5 semanas a
        cualquier dosis fija; para la tirzepatida equivale
        aproximadamente a 3 a 4 semanas [3, 4]. Esta es la
        justificación farmacocinética del intervalo de 4 semanas entre
        escalones en el esquema de titulación estándar de la FDA. Puede
        visualizar esta acumulación semana por semana con nuestra{" "}
        <Link href="/tools/glp1-dose-plotter">
          calculadora visual de dosis de GLP-1
        </Link>
        , que simula las curvas de acumulación de la ecuación de
        Bateman directamente a partir de los parámetros
        farmacocinéticos de la información de prescripción de la FDA.
      </p>

      <p>
        En la práctica, esto significa: no debe esperar que una dosis
        de 0.25 mg de semaglutida sienta su efecto completo hasta
        aproximadamente la semana 3 o 4 de tomarla. Si casi no nota
        nada en la primera semana, eso es normal y la curva aún no ha
        terminado de subir.
      </p>

      <h2>Escala 3: Pérdida de peso medible (semanas a meses)</h2>

      <p>
        La tercera y más lenta escala de tiempo es la que la mayoría
        de los pacientes realmente quiere conocer: cuándo se mueve la
        báscula. Los estudios STEP-1 y SURMOUNT-1 midieron el peso
        corporal cada pocas semanas a lo largo de los protocolos
        completos de 68 y 72 semanas, y los datos publicados ofrecen
        una respuesta clara semana por semana [1, 2].
      </p>

      <h3>STEP-1 (semaglutida 2.4 mg, n=1,961)</h3>

      <p>
        El estudio STEP-1 (Wilding y colaboradores,{" "}
        <em>New England Journal of Medicine</em> 2021 [1]) reportó los
        siguientes puntos de reducción media del peso corporal para
        adultos con sobrepeso u obesidad, sin diabetes, que recibieron
        semaglutida 2.4 mg semanal junto con intervención en estilo de
        vida:
      </p>

      <table>
        <thead>
          <tr>
            <th>Semana de tratamiento</th>
            <th>Pérdida de peso media aproximada (grupo semaglutida)</th>
            <th>Pérdida de peso media aproximada (grupo placebo)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Semana 4 (aún en dosis inicial)</td>
            <td>~1.5%</td>
            <td>~0.5%</td>
          </tr>
          <tr>
            <td>Semana 12</td>
            <td>~6%</td>
            <td>~1.5%</td>
          </tr>
          <tr>
            <td>Semana 20 (tras la titulación)</td>
            <td>~10%</td>
            <td>~2%</td>
          </tr>
          <tr>
            <td>Semana 28</td>
            <td>~12%</td>
            <td>~2.5%</td>
          </tr>
          <tr>
            <td>Semana 52</td>
            <td>~14%</td>
            <td>~2.5%</td>
          </tr>
          <tr>
            <td>Semana 68 (criterio de valoración final)</td>
            <td>
              <strong>−14.9%</strong>
            </td>
            <td>−2.4%</td>
          </tr>
        </tbody>
      </table>

      <p>
        La curva del grupo de tratamiento no es lineal. La pérdida de
        peso más pronunciada ocurre entre las semanas 4 y 28, una vez
        que el paciente ha superado la fase de titulación y la dosis
        de mantenimiento se encuentra en estado estacionario. Después
        de la semana 28, la curva se aplana y continúa descendiendo
        lentamente hasta la semana 60 a 68, cuando alcanza la meseta.
      </p>

      <h3>SURMOUNT-1 (tirzepatida 15 mg, n=2,539)</h3>

      <p>
        El estudio SURMOUNT-1 (Jastreboff y colaboradores,{" "}
        <em>New England Journal of Medicine</em> 2022 [2]) produjo una
        curva de pérdida de peso similar pero de mayor magnitud, a lo
        largo de 72 semanas, con la dosis más alta de tirzepatida:
      </p>

      <table>
        <thead>
          <tr>
            <th>Semana de tratamiento</th>
            <th>Pérdida de peso media aproximada (tirzepatida 15 mg)</th>
            <th>Pérdida de peso media aproximada (placebo)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Semana 4</td>
            <td>~2%</td>
            <td>~0.5%</td>
          </tr>
          <tr>
            <td>Semana 12</td>
            <td>~9%</td>
            <td>~1.5%</td>
          </tr>
          <tr>
            <td>Semana 20 (tras la titulación)</td>
            <td>~13%</td>
            <td>~2%</td>
          </tr>
          <tr>
            <td>Semana 36</td>
            <td>~17%</td>
            <td>~2.5%</td>
          </tr>
          <tr>
            <td>Semana 52</td>
            <td>~19%</td>
            <td>~3%</td>
          </tr>
          <tr>
            <td>Semana 72 (criterio de valoración final)</td>
            <td>
              <strong>−20.9%</strong>
            </td>
            <td>−3.1%</td>
          </tr>
        </tbody>
      </table>

      <p>
        La forma de la curva es la misma: rápida durante los primeros
        6 meses, más lenta a lo largo del primer año y con meseta en
        la segunda mitad del estudio. La tirzepatida produce una
        magnitud total mayor que la semaglutida y alcanza una meseta
        más amplia aproximadamente en el mismo punto del calendario.
      </p>

      <h2>Qué esperar en cada etapa</h2>

      <p>
        Combinando las tres escalas anteriores, esta es una guía
        práctica semana por semana de lo que puede esperar un paciente
        que inicia semaglutida o tirzepatida siguiendo el esquema
        estándar de titulación aprobado por la FDA:
      </p>

      <table>
        <thead>
          <tr>
            <th>Semana</th>
            <th>Qué debería sentir</th>
            <th>Qué debería mostrar la báscula</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Días 1 a 3</td>
            <td>
              Supresión leve del apetito, sensación de saciedad;
              posibles náuseas leves
            </td>
            <td>Aún no hay cambios significativos</td>
          </tr>
          <tr>
            <td>Semana 1 a 2</td>
            <td>
              La supresión del apetito aumenta; los antojos se reducen
              notablemente; las porciones se hacen más pequeñas de
              forma natural
            </td>
            <td>Pérdida de 0.25 a 1 kg (0.5 a 2 libras)</td>
          </tr>
          <tr>
            <td>Semana 4 (primer aumento de dosis)</td>
            <td>
              Se alcanza el estado estacionario de la dosis inicial;
              se siente el efecto completo de ese nivel
            </td>
            <td>Pérdida de 1 a 2 kg (2 a 4 libras)</td>
          </tr>
          <tr>
            <td>Semana 8 a 12</td>
            <td>
              Titulación intermedia; el efecto se intensifica con cada
              aumento de dosis; las reacciones adversas
              gastrointestinales pueden reaparecer brevemente después
              de cada escalón
            </td>
            <td>5 a 9% del peso corporal</td>
          </tr>
          <tr>
            <td>Semana 16 a 20</td>
            <td>
              Se alcanza la dosis de mantenimiento; efecto máximo de
              supresión del apetito; los efectos secundarios
              gastrointestinales suelen resolverse
            </td>
            <td>10 a 13% del peso corporal</td>
          </tr>
          <tr>
            <td>Semana 28 a 52</td>
            <td>
              Mantenimiento estable; el ritmo de pérdida se hace más
              lento pero continúa
            </td>
            <td>12 a 19% del peso corporal</td>
          </tr>
          <tr>
            <td>Semana 60 a 72</td>
            <td>
              Meseta; la pérdida de peso se estabiliza en el punto
              final del estudio
            </td>
            <td>
              15 a 21% del peso corporal (depende del medicamento y
              la dosis)
            </td>
          </tr>
        </tbody>
      </table>

      <h2>
        Si no está viendo resultados — lo que dicen los análisis de los
        estudios
      </h2>

      <p>
        Los promedios de STEP-1 y SURMOUNT-1 esconden una variación
        individual importante. Alrededor del 86% de los participantes
        de STEP-1 que recibieron semaglutida perdieron al menos el 5%
        de su peso corporal, lo que significa que aproximadamente el
        14% perdió menos del 5% [1]. De manera similar, cerca del 91%
        de los participantes de SURMOUNT-1 con tirzepatida 15 mg
        perdieron al menos el 5% [2], dejando aproximadamente un 9%
        que no lo hicieron. Las causas de la no respuesta no se
        comprenden del todo, pero el abordaje clínico estándar cuando
        un paciente no baja de peso después de 12 a 16 semanas en la
        dosis de mantenimiento incluye:
      </p>

      <ol>
        <li>
          Confirmar que la técnica de inyección es correcta (consulte
          nuestra{" "}
          <Link href="/research/where-to-inject-semaglutide-tirzepatide-guide">
            guía de técnica de inyección
          </Link>
          ) — la inyección repetida en un sitio con lipohipertrofia
          puede reducir la absorción entre un 25 y un 50%.
        </li>
        <li>
          Confirmar que la dosis se está inyectando correctamente. En
          los viales compuestos (compounded), el error más frecuente
          es la conversión entre unidades y miligramos. Use nuestro{" "}
          <Link href="/tools/glp1-unit-converter">
            convertidor de unidades
          </Link>{" "}
          para verificar.
        </li>
        <li>
          Confirmar que los cambios en la alimentación están
          presentes. La terapia con GLP-1 funciona junto con una
          reducción de la ingesta calórica, no como un sustituto de
          ella. Todos los protocolos de los estudios incluyeron
          asesoría nutricional.
        </li>
        <li>
          Si todo lo anterior es correcto, consulte con su proveedor
          de salud sobre cambiar a tirzepatida (que produce una mayor
          pérdida de peso en comparaciones directas) o escalar a una
          dosis más alta si aún no está en la de mantenimiento.
        </li>
      </ol>

      <h2>Qué hacer durante la fase lenta</h2>

      <p>
        Las curvas de los estudios mostradas arriba indican que el
        ritmo de pérdida de peso disminuye de manera importante
        después de la semana 28. Muchos pacientes interpretan esto
        como &ldquo;el medicamento dejó de funcionar&rdquo;, cuando en
        realidad es la forma natural de la curva y le ocurrió a
        aproximadamente el 90% de los participantes de los estudios.
        Las acciones basadas en la evidencia durante la fase lenta
        son:
      </p>

      <ul>
        <li>
          Mantener la dosis de mantenimiento. No aumente la frecuencia
          ni se autoescale por encima de la dosis de mantenimiento
          aprobada por la FDA.
        </li>
        <li>
          Agregar o reforzar el entrenamiento de resistencia (pesas)
          para preservar la masa magra durante la fase de pérdida
          lenta. Consulte nuestro{" "}
          <Link href="/research/semaglutide-muscle-mass-loss">
            análisis a fondo sobre semaglutida y masa muscular
          </Link>{" "}
          para conocer las metas de proteína y de entrenamiento de
          resistencia respaldadas por los estudios.
        </li>
        <li>
          Registre la circunferencia de cintura y la composición
          corporal, no solo el peso total. La composición corporal a
          menudo mejora durante la fase de meseta aunque la cifra de
          la báscula permanezca estable.
        </li>
        <li>
          Consulte con su proveedor de salud sobre la continuación a
          largo plazo. El estudio STEP-4 mostró que los pacientes que
          suspendieron la semaglutida en la semana 20 recuperaron
          aproximadamente el 67% del peso perdido en un año, por lo
          que suspender el tratamiento debe ser una decisión
          deliberada y no un acto reflejo.
        </li>
      </ul>

      <h2>Información importante</h2>

      <p>
        Esta guía es educativa y no sustituye la atención médica
        profesional. Las decisiones sobre iniciar, continuar, cambiar
        o suspender un agonista del receptor de GLP-1 deben tomarse
        con un médico o profesional de la salud calificado que conozca
        su historial clínico completo. Los miméticos de incretinas
        como la semaglutida y la tirzepatida tienen contraindicaciones
        importantes (entre ellas antecedentes personales o familiares
        de carcinoma medular de tiroides y síndrome de neoplasia
        endocrina múltiple tipo 2) y pueden causar reacciones
        adversas. Si tiene síntomas graves o dudas urgentes, consulte
        con su proveedor de salud. En caso de emergencia médica, llame
        al 911 o acuda al servicio de urgencias más cercano.
      </p>

      <h2>Investigación y herramientas relacionadas</h2>

      <p>
        Para más información en español, consulte nuestras guías
        sobre{" "}
        <Link href="/research/semaglutide-para-que-sirve">
          semaglutida: para qué sirve y cómo funciona
        </Link>{" "}
        y{" "}
        <Link href="/research/tirzepatide-para-que-sirve">
          tirzepatida: para qué sirve y cómo funciona
        </Link>
        . Para las curvas visuales de acumulación en cada escalón de
        titulación, vea nuestra{" "}
        <Link href="/tools/glp1-dose-plotter">
          calculadora visual de dosis de GLP-1
        </Link>
        . Para la versión original en inglés con todos los datos
        fuente, vea{" "}
        <Link href="/research/how-long-does-glp1-take-to-work">
          How Long Does Semaglutide and Tirzepatide Take to Work?
        </Link>
        .
      </p>

      <References items={citations} />
    </ResearchArticleLayout>
  );
}
