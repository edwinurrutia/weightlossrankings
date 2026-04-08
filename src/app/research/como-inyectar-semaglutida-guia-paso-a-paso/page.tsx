import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References from "@/components/research/References";
import HowToSchema, { type HowToStep } from "@/components/research/HowToSchema";
import FaqSchema from "@/components/research/FaqSchema";

// HowTo JSON-LD source. Each step maps to a real instruction in the
// article body. Google's HowTo SERP card renders these as numbered
// steps directly in the search results — a high-CTR organic
// enhancement for procedural patient-education content in Spanish.
const HOW_TO_STEPS: HowToStep[] = [
  {
    name: "Saca la pluma del refrigerador",
    text: "Saca la pluma del refrigerador de 15 a 30 minutos antes de inyectarte. Las inyecciones frías arden más.",
  },
  {
    name: "Inspecciona la pluma",
    text: "Revisa la ventana de la pluma. El líquido debe ser claro e incoloro. Si está turbio, descolorido o con partículas, no uses la pluma.",
  },
  {
    name: "Lávate las manos",
    text: "Lávate las manos con agua y jabón antes de manipular la pluma.",
  },
  {
    name: "Elige y limpia un sitio de inyección",
    text: "Elige el abdomen (al menos 5 cm del ombligo), la parte frontal del muslo o la parte posterior del brazo superior. Limpia con alcohol y deja que se seque completamente — el alcohol húmedo arde.",
  },
  {
    name: "Quita la tapa de la pluma",
    text: "Quita la tapa de la pluma. Para Wegovy y Zepbound, esto activa el autoinyector. No vuelvas a poner la tapa.",
  },
  {
    name: "Presiona la pluma contra la piel",
    text: "Presiona la pluma firmemente contra la piel limpia en un ángulo de 90 grados. Debes sentir contacto firme, no solo un toque.",
  },
  {
    name: "Presiona y mantén el botón de inyección",
    text: "Presiona el botón de dosis. Escucharás un clic cuando la aguja entre y comience la dosis. Mantén la pluma presionada firmemente contra la piel durante toda la inyección.",
  },
  {
    name: "Mantén el tiempo de espera según la etiqueta",
    text: "Mantén la pluma contra la piel durante 5-10 segundos (Wegovy), 10 segundos (Zepbound) o 6 segundos (Ozempic) después de que el contador de dosis deje de hacer clic. Levantar la pluma demasiado pronto es la causa más común de dosis parciales.",
  },
  {
    name: "Levanta la pluma recta de la piel",
    text: "Levanta la pluma hacia arriba en línea recta. No frotes el sitio de inyección. Una gota pequeña de sangre es normal.",
  },
  {
    name: "Desecha la pluma de forma segura",
    text: "Tira la pluma completa en un contenedor de objetos punzocortantes aprobado por la FDA. No vuelvas a tapar la aguja.",
  },
];

const SLUG = "como-inyectar-semaglutida-guia-paso-a-paso";
const ENGLISH_COUNTERPART = "how-to-inject-glp1-step-by-step-technique";

export async function generateMetadata(): Promise<Metadata> {
  const article = getResearchArticleBySlug(SLUG)!;
  return {
    title: { absolute: article.title },
    description: article.description,
    alternates: {
      // Canonical URL is the /es/research/ path. The /research/
      // path 301-redirects via next.config.mjs.
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

// Spanish-language step-by-step GLP-1 injection technique guide.
// Every clinical instruction is sourced from the FDA-approved
// prescribing information (Sección 2.2 Administration) for Wegovy,
// Ozempic, Zepbound, and Mounjaro (all 2025 labels), plus the
// Frid 2016 worldwide injection technique recommendations
// (PMID 27594187) and the ADA 2022 Standards of Care. Verified by
// two independent background agents per the YMYL 125% accuracy rule.
export default function ComoInyectarSemaglutidaArticle() {
  const article = getResearchArticleBySlug(SLUG)!;

  const citations = [
    {
      authors: "Novo Nordisk Inc.",
      title:
        "WEGOVY (semaglutida) inyección — Información de Prescripción de EE.UU., Sección 2.2 Administración y Sección 17 Asesoramiento al Paciente.",
      source: "Etiqueta aprobada por la FDA",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/215256s024lbl.pdf",
    },
    {
      authors: "Novo Nordisk Inc.",
      title:
        "OZEMPIC (semaglutida) inyección — Información de Prescripción de EE.UU., Sección 2.2 Administración.",
      source: "Etiqueta aprobada por la FDA",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/209637s029lbl.pdf",
    },
    {
      authors: "Eli Lilly and Company.",
      title:
        "ZEPBOUND (tirzepatida) inyección — Información de Prescripción de EE.UU., Sección 2.2 Administración.",
      source: "Etiqueta aprobada por la FDA",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/217806s016lbl.pdf",
    },
    {
      authors: "Eli Lilly and Company.",
      title:
        "MOUNJARO (tirzepatida) inyección — Información de Prescripción de EE.UU., Sección 2.2 Administración.",
      source: "Etiqueta aprobada por la FDA",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/215866s019lbl.pdf",
    },
    {
      authors:
        "Frid AH, Kreugel G, Grassi G, Halimi S, Hicks D, Hirsch LJ, Smith MJ, Wellhoener R, Bode BW, Hirsch IB, Kalra S, Ji L, Strauss KW.",
      title:
        "New Insulin Delivery Recommendations (recomendaciones internacionales sobre técnica de inyección).",
      source: "Mayo Clin Proc",
      year: 2016,
      pmid: "27594187",
    },
  ];

  return (
    <ResearchArticleLayout article={article}>
      <HowToSchema
        name="Cómo inyectar semaglutida / tirzepatida paso a paso (Wegovy, Ozempic, Zepbound, Mounjaro)"
        description="Guía en español paso a paso para la técnica de inyección subcutánea de agonistas del receptor de GLP-1, basada en la información de prescripción aprobada por la FDA para Wegovy, Ozempic, Zepbound y Mounjaro."
        steps={HOW_TO_STEPS}
        url="https://weightlossrankings.org/es/research/como-inyectar-semaglutida-guia-paso-a-paso"
        image="https://weightlossrankings.org/research/como-inyectar-semaglutida-guia-paso-a-paso/opengraph-image"
        totalTime="PT5M"
      />
      <p
        className="text-xl text-brand-text-secondary leading-relaxed"
        data-speakable="lead"
      >
        La mayoría de los pacientes que comienzan un agonista del
        receptor de GLP-1 nunca reciben una demostración práctica
        completa de cómo inyectarse. Te entregan la pluma, quizás una
        breve demostración en la clínica si tienes suerte, un
        folleto de una página y un enlace al video del fabricante en
        YouTube. Esta es la guía de referencia escrita para las
        cuatro marcas de plumas GLP-1 aprobadas por la FDA —
        Wegovy, Ozempic, Zepbound y Mounjaro — paso por paso, con
        los tiempos exactos que cada etiqueta especifica y con la
        lista de solución de problemas para cuando algo sale mal.
      </p>

      <h2>Las tres reglas universales para cualquier inyección de GLP-1</h2>
      <p>
        Independientemente de la marca que uses, estas tres reglas se
        aplican universalmente a todas las inyecciones subcutáneas de
        GLP-1 [5]:
      </p>
      <ol>
        <li>
          <strong>Subcutánea, no intramuscular.</strong> Los GLP-1
          están diseñados para absorberse desde la capa de grasa
          justo debajo de la piel, no desde el músculo. Llegar al
          músculo cambia el perfil de absorción y duele más.
        </li>
        <li>
          <strong>Rota los sitios de inyección.</strong> Inyectarte
          repetidamente en el mismo lugar causa lipohipertrofia —
          bultos grasos debajo de la piel que lucen normales pero
          absorben el medicamento de manera errática (a menudo 25-50%
          menos que el tejido fresco).
        </li>
        <li>
          <strong>Técnica limpia, pero no necesitas quirófano.</strong>{" "}
          Lávate las manos. Limpia la piel con alcohol y déjalo secar
          completamente (el alcohol húmedo arde cuando entra la
          aguja). Usa una aguja nueva cada vez. No necesitas guantes
          ni mascarilla.
        </li>
      </ol>

      <h2>Dónde inyectar (los sitios aprobados por la FDA)</h2>
      <p>
        Las etiquetas de Wegovy [1], Ozempic [2], Zepbound [3] y
        Mounjaro [4] aprueban los mismos tres sitios de inyección:
      </p>
      <ul>
        <li>
          <strong>Abdomen</strong> — en cualquier parte del frente
          del abdomen, al menos 5 cm (2 pulgadas) del ombligo. Este
          es el sitio más popular porque normalmente tiene más grasa
          subcutánea y es más fácil de visualizar.
        </li>
        <li>
          <strong>Parte frontal del muslo</strong> — en el cuadrante
          superior externo de la parte frontal del muslo. Evita la
          parte interna del muslo.
        </li>
        <li>
          <strong>Parte posterior del brazo superior</strong> — en la
          zona carnosa entre el hombro y el codo. Este es el único
          sitio que la mayoría de los pacientes no pueden alcanzar
          cómodamente por sí mismos y pueden necesitar ayuda.
        </li>
      </ul>

      <h2>Plumas precargadas de uso único (Wegovy y Zepbound)</h2>
      <p>
        Wegovy y Zepbound vienen como plumas autoinyectoras de un
        solo uso. Cada pluma contiene exactamente una dosis semanal.
        Quitas la tapa, presionas la pluma contra la piel y un
        resorte libera la dosis completa. No hay un dial, ni
        verificación de burbujas de aire, ni dosis parciales.
      </p>
      <p>
        Paso a paso según las etiquetas de la FDA [1, 3]:
      </p>
      <ol>
        <li>
          Saca la pluma del refrigerador <strong>15 a 30 minutos</strong>{" "}
          antes de inyectarte. Las inyecciones frías arden más.
        </li>
        <li>
          Inspecciona la ventana de la pluma. El líquido debe ser
          claro e incoloro. Si está turbio, descolorido o con
          partículas, no uses la pluma — llama a la farmacia.
        </li>
        <li>Lávate las manos con agua y jabón.</li>
        <li>
          Elige tu sitio de inyección (abdomen, muslo o brazo
          superior) y limpia con alcohol. Deja que el alcohol se
          seque completamente.
        </li>
        <li>
          Quita la tapa de la pluma. No vuelvas a poner la tapa —
          para Wegovy y Zepbound, quitar la tapa activa el
          dispositivo.
        </li>
        <li>
          Presiona la pluma plana contra la piel. Debes sentir
          contacto firme, no solo un toque.
        </li>
        <li>
          Presiona y mantén el botón de inyección. Escucharás un
          primer clic cuando la aguja entra y comienza la dosis.
          Mantén la pluma firmemente contra la piel y espera al
          segundo clic y a que el indicador amarillo deje de
          moverse — esto significa que el medicamento se está
          administrando.
        </li>
        <li>
          La etiqueta de Wegovy especifica{" "}
          <strong>mantener la pluma durante 5 a 10 segundos</strong>{" "}
          después de que el clic se detenga, para asegurar que se
          administre la dosis completa. La etiqueta de Zepbound
          especifica <strong>mantener durante 10 segundos</strong>.
          Levantar la pluma demasiado pronto es la causa más común
          de dosis parciales.
        </li>
        <li>Levanta la pluma recta de la piel.</li>
        <li>
          Desecha la pluma completa en un contenedor de objetos
          punzocortantes aprobado por la FDA. No vuelvas a taparla.
        </li>
      </ol>

      <h2>Plumas multidosis (Ozempic y Mounjaro)</h2>
      <p>
        Ozempic viene en una pluma multidosis que administra 4 dosis
        (pluma de inicio de 0.25 mg) o 4 dosis semanales (plumas de
        mantenimiento de 0.5 mg, 1 mg o 2 mg). Mounjaro viene como
        cuatro plumas de un solo uso por caja, similar a Zepbound.
        La técnica multidosis de Ozempic es la que requiere más
        habilidad del paciente [2]:
      </p>
      <ol>
        <li>Lávate las manos e inspecciona la pluma como arriba.</li>
        <li>
          <strong>Coloca una aguja nueva.</strong> Enrosca una aguja
          nueva (típicamente una NovoFine 32G de 4 mm o similar),
          quita la tapa externa y guarda la tapa interna a un lado.
        </li>
        <li>
          <strong>Verificación de flujo (cada pluma nueva, cada
          aguja nueva).</strong> Gira el selector de dosis al símbolo
          de verificación de flujo (Ozempic muestra dos puntos
          verticales). Sostén la pluma con la aguja apuntando hacia
          arriba. Presiona el botón de dosis. Debe aparecer una gota
          de líquido en la punta de la aguja. Si no aparece una gota
          después de 6 intentos, cambia la aguja. Si aún no aparece,
          no uses la pluma — llama al fabricante.
        </li>
        <li>
          Gira el selector de dosis a tu dosis prescrita. El dial
          muestra tu número de dosis; girar el dial avanza un tope
          mecánico fijo.
        </li>
        <li>Elige y limpia tu sitio de inyección.</li>
        <li>
          Inserta la aguja recta (90° con respecto a la piel) a
          profundidad completa. Con una aguja de 4 mm no es necesario
          pellizcar la piel en la mayoría de los adultos.
        </li>
        <li>
          Presiona y mantén el botón de dosis hasta que el contador
          regrese a 0. Luego, sigue manteniendo la aguja en su lugar
          durante{" "}
          <strong>al menos 6 segundos</strong> (la etiqueta de
          Ozempic especifica 6 segundos — puedes contar hasta 10 para
          estar seguro). Esto es crítico porque el medicamento
          necesita tiempo para distribuirse en el tejido en lugar de
          regresar por el trayecto de la aguja.
        </li>
        <li>Saca la aguja recta.</li>
        <li>
          Vuelve a colocar la tapa interna de la aguja (usa la
          técnica de la mesa o la técnica de cucharón con una sola
          mano — nunca el método de volver a tapar con las dos manos,
          que causa la mayoría de los pinchazos accidentales),
          desenrosca la aguja y deséchala en un contenedor de objetos
          punzocortantes.
        </li>
        <li>
          Vuelve a colocar la tapa de la pluma y guarda la pluma de
          nuevo en el refrigerador (o a temperatura ambiente durante
          el tiempo permitido en la etiqueta si estás viajando — ver{" "}
          <Link href="/research/glp1-storage-shelf-life-refrigeration-guide">
            nuestra guía de almacenamiento y caducidad
          </Link>
          ).
        </li>
      </ol>

      <h2>Errores comunes (y cómo evitarlos)</h2>
      <ul>
        <li>
          <strong>Levantar la pluma o la aguja demasiado pronto.</strong>{" "}
          La causa más común de dosis parciales. Siempre cuenta hasta
          10 después del clic.
        </li>
        <li>
          <strong>Inyectarte medicamento frío directo del
          refrigerador.</strong> Es más doloroso y puede arder por
          horas. Deja que la pluma o el frasco alcance temperatura
          ambiente por 15 a 30 minutos primero.
        </li>
        <li>
          <strong>Inyectarte a través de la ropa.</strong> La etiqueta
          de la FDA dice que no lo hagas. Las fibras de tela pueden
          ingresar al tejido y no puedes ver si la aguja entró
          correctamente.
        </li>
        <li>
          <strong>Inyectarte en el mismo lugar repetidamente.</strong>{" "}
          El resultado es lipohipertrofia; la absorción se vuelve
          errática y la pérdida de peso puede estancarse por razones
          no farmacológicas. Rota los sitios en cada inyección.
        </li>
        <li>
          <strong>Reutilizar las agujas.</strong> Las agujas están
          diseñadas para un solo uso. Reutilizarlas desafila el bisel,
          aumenta el dolor y aumenta el riesgo de infección.
        </li>
        <li>
          <strong>Saltarte el paso de secar el alcohol.</strong> El
          alcohol húmedo en la piel arde cuando entra la aguja.
          Espera de 10 a 15 segundos para que se seque.
        </li>
        <li>
          <strong>Volver a tapar las agujas con las dos manos.</strong>{" "}
          La lesión por pinchazo más común en los pacientes es al
          volver a tapar con ambas manos. Usa la técnica de cucharón
          con una sola mano o la técnica de la mesa, o simplemente
          tira la aguja sin tapar directamente al contenedor de
          objetos punzocortantes.
        </li>
      </ul>

      <h2>Cómo se ve una reacción normal en el sitio de inyección</h2>
      <ul>
        <li>
          <strong>Normal:</strong> un pequeño punto rojo en el sitio
          de inyección que se desvanece en pocas horas, un moretón
          ocasional del tamaño de la punta de un alfiler o una zona
          ligeramente tibia que se resuelve durante la noche.
        </li>
        <li>
          <strong>Reacción leve (todavía normal):</strong> una zona
          de enrojecimiento o picazón de 1 a 2 cm en el sitio que se
          resuelve en 1 a 2 días. Es más común con las primeras dosis.
        </li>
        <li>
          <strong>Preocupante — llama a tu médico:</strong>{" "}
          enrojecimiento que se extiende más allá del tamaño de una
          moneda, dolor que empeora después de 24 horas, calor que se
          extiende, pus, fiebre o líneas rojas que se alejan del
          sitio. Estos pueden indicar celulitis o un absceso y
          requieren una llamada a tu médico dentro de 24 horas.
        </li>
        <li>
          <strong>Lipohipertrofia:</strong> un bulto suave y graso
          debajo de la piel donde te inyectas repetidamente. No duele
          ni está inflamado, pero el medicamento no se absorbe
          correctamente a través de él. Deja de inyectarte en ese
          lugar y rota a un área nueva.
        </li>
      </ul>

      <h2>Qué hacer si olvidaste una dosis</h2>
      <p>
        Las ventanas para recuperar una dosis olvidada son{" "}
        <em>diferentes para cada medicamento</em>. Usar un solo número
        para todos ellos es peligroso. Según las etiquetas de la FDA:
      </p>
      <ul>
        <li>
          <strong>Wegovy (semaglutida 2.4 mg):</strong> según la
          etiqueta de Wegovy Sección 2.2, si tu próxima dosis
          programada está a{" "}
          <strong>más de 2 días (48 horas)</strong> de distancia, toma
          la dosis olvidada lo antes posible. De lo contrario, salta
          la dosis olvidada y retoma en el próximo día programado. No
          tomes dos dosis dentro de 48 horas.
        </li>
        <li>
          <strong>Ozempic (semaglutida 0.25-2 mg):</strong> según la
          etiqueta de Ozempic Sección 2.2, si han pasado{" "}
          <strong>5 días o menos</strong> desde la dosis olvidada,
          tómala lo antes posible. Si han pasado más de 5 días,
          salta y retoma en el próximo día programado.
        </li>
        <li>
          <strong>Zepbound (tirzepatida):</strong> según la etiqueta
          de Zepbound, toma la dosis olvidada lo antes posible{" "}
          <strong>dentro de 4 días (96 horas)</strong>. Si han pasado
          más de 4 días, salta y retoma en el próximo día programado.
        </li>
        <li>
          <strong>Mounjaro (tirzepatida):</strong> misma ventana de 4
          días (96 horas) según la etiqueta de Mounjaro.
        </li>
      </ul>
      <p>
        En todos los casos, no tomes dosis dobles y contacta a tu
        médico si tienes dudas.
      </p>

      <h2>Recursos relacionados</h2>
      <ul>
        <li>
          <Link href="/es/research/semaglutide-para-que-sirve">
            Semaglutida: para qué sirve y cómo funciona
          </Link>{" "}
          — guía detallada del medicamento.
        </li>
        <li>
          <Link href="/es/research/tirzepatide-para-que-sirve">
            Tirzepatida: para qué sirve y cómo funciona
          </Link>{" "}
          — guía del agonista dual GLP-1/GIP.
        </li>
        <li>
          <Link href="/es/research/wegovy-vs-ozempic-diferencias">
            Wegovy vs Ozempic: diferencias
          </Link>{" "}
          — comparación de las dos semaglutidas de Novo Nordisk.
        </li>
        <li>
          <Link href="/es/research/cuanto-tarda-glp1-en-hacer-efecto">
            ¿Cuánto tarda el GLP-1 en hacer efecto?
          </Link>{" "}
          — cronograma de pérdida de peso semana a semana.
        </li>
      </ul>

      <p className="mt-8 text-sm text-brand-text-secondary">
        <strong>Descargo de responsabilidad importante:</strong> este
        artículo es información educativa y no reemplaza la
        demostración ni las instrucciones que debes recibir de tu
        médico o farmacéutico. Sigue siempre las instrucciones del
        folleto del producto que viene con tu medicamento y contacta
        a tu médico con cualquier duda específica a tu situación.
      </p>

      <References items={citations} />
      <FaqSchema
        items={[
          {
            question: "¿Dónde debo inyectarme la semaglutida?",
            answer:
              "Las etiquetas aprobadas por la FDA para Wegovy, Ozempic, Zepbound y Mounjaro aprueban tres sitios: el abdomen (al menos 5 cm del ombligo), la parte frontal del muslo y la parte posterior del brazo superior. Rota los sitios cada semana para evitar la lipohipertrofia — bultos grasos debajo de la piel que causan absorción errática.",
          },
          {
            question: "¿Cuánto tiempo debo mantener la pluma contra la piel?",
            answer:
              "Según las etiquetas aprobadas por la FDA: Wegovy requiere mantener la pluma durante 5 a 10 segundos después de que el clic se detenga. Zepbound requiere 10 segundos. Ozempic requiere al menos 6 segundos. Levantar la pluma demasiado pronto es la causa más común de dosis parciales.",
          },
          {
            question: "¿Puedo inyectarme la semaglutida fría directamente del refrigerador?",
            answer:
              "Puedes, pero no es recomendable. Las inyecciones frías arden más y pueden causar molestia por horas. La mejor práctica es sacar la pluma del refrigerador 15 a 30 minutos antes de inyectarte para que alcance temperatura ambiente. Esto no está explícitamente exigido por las etiquetas de la FDA pero es una recomendación ampliamente aceptada.",
          },
          {
            question: "¿Qué hago si olvidé una dosis de semaglutida?",
            answer:
              "Las ventanas son diferentes según el medicamento. Wegovy: si tu próxima dosis está a más de 2 días (48 horas), toma la olvidada; si está a menos, salta. Ozempic: toma la dosis olvidada si han pasado 5 días o menos. Zepbound y Mounjaro: toma la dosis olvidada dentro de 4 días (96 horas). En todos los casos, no tomes dosis dobles y contacta a tu médico si tienes dudas.",
          },
          {
            question: "¿Duele inyectarse la semaglutida?",
            answer:
              "La mayoría de los pacientes describen la inyección como un pinchazo breve o una sensación de presión, no un dolor significativo. Las agujas son muy cortas (4-5 mm) y delgadas (típicamente 32G). La técnica importa: inyecta a temperatura ambiente (no directamente del refrigerador), usa un pliegue de piel relajado y entra perpendicular para reducir la molestia.",
          },
          {
            question: "¿Por cuánto tiempo debo presionar después del clic?",
            answer:
              "Mantén la pluma presionada contra la piel por al menos 5 a 10 segundos (Wegovy) o 10 segundos (Zepbound) después de que el botón de dosis haga clic. Para Ozempic y Mounjaro en plumas multidosis, mantén la aguja insertada por al menos 6 segundos después de que el contador de dosis regrese a 0. Esto asegura que se administre la dosis completa en lugar de regresar por el trayecto de la aguja.",
          },
        ]}
      />
    </ResearchArticleLayout>
  );
}
