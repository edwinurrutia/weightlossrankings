import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References from "@/components/research/References";
import FaqSchema from "@/components/research/FaqSchema";
import {
  ZEPBOUND_PRICING,
  MOUNJARO_PRICING,
  formatPriceUsd,
} from "@/lib/brand-pricing";

const SLUG = "donde-comprar-tirzepatida-mounjaro";
const ENGLISH_COUNTERPART = "where-to-buy-tirzepatide";

export async function generateMetadata(): Promise<Metadata> {
  const article = getResearchArticleBySlug(SLUG)!;
  return {
    title: { absolute: article.title },
    description: article.description,
    alternates: {
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

// Spanish-language guide to tirzepatide pricing in the US (Mounjaro
// for T2DM, Zepbound for weight loss and OSA). All pricing verified
// against primary sources (zepbound.lilly.com/savings, mounjaro.lilly
// .com/savings-resources, lillycares.com confirming NO PAP, KFF
// Medicaid GLP-1 2026 report, FDA compounding discretion end
// notifications Feb-March 2025, FDA fraudulent compounded
// tirzepatide warnings). Two independent verifier agents required
// before ship per the YMYL 125% accuracy rule.
export default function DondeComprarTirzepatidaArticle() {
  const article = getResearchArticleBySlug(SLUG)!;

  const citations = [
    {
      authors: "Eli Lilly and Company.",
      title:
        "Zepbound Savings Options — Self Pay Journey Program ($299-$449/mo by dose) and Commercial Insurance Savings Card ($25 for up to 3-month prescription, max $100/mo).",
      source: "zepbound.lilly.com",
      year: 2026,
      url: "https://zepbound.lilly.com/savings",
    },
    {
      authors: "Eli Lilly and Company.",
      title:
        "Mounjaro Savings & Resources — Commercial Insurance Savings Card ($25 for up to 3-month prescription with Mounjaro coverage; $499/mo self-pay for commercially insured without Mounjaro coverage).",
      source: "mounjaro.lilly.com",
      year: 2026,
      url: "https://mounjaro.lilly.com/savings-resources",
    },
    {
      authors: "Eli Lilly and Company.",
      title:
        "ZEPBOUND (tirzepatida) injection — US Prescribing Information.",
      source: "Etiqueta aprobada por la FDA",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/217806s016lbl.pdf",
    },
    {
      authors: "U.S. Food and Drug Administration.",
      title:
        "FDA Clarifies Policies for Compounders as National GLP-1 Supply Begins to Stabilize — tirzepatide 503A enforcement discretion ended February 18, 2025; 503B enforcement discretion ended March 19, 2025.",
      source: "FDA.gov",
      year: 2025,
      url: "https://www.fda.gov/drugs/drug-safety-and-availability/fda-clarifies-policies-compounders-national-glp-1-supply-begins-stabilize",
    },
    {
      authors: "Kaiser Family Foundation.",
      title:
        "Medicaid Coverage of and Spending on GLP-1s — January 2026 state-by-state analysis. Only 13 states cover GLP-1s for obesity/weight loss; California, Pennsylvania, Michigan, and South Carolina eliminated coverage in 2025-2026 due to budget constraints.",
      source: "KFF",
      year: 2026,
      url: "https://www.kff.org/medicaid/medicaid-coverage-of-and-spending-on-glp-1s/",
    },
    {
      authors: "Eli Lilly and Company.",
      title:
        "FDA Warning About Fraudulent Compounded Tirzepatide — Lilly statement on counterfeit and contaminated compounded products (bacteria, sugar alcohol, incorrect chemical structure).",
      source: "lilly.com",
      year: 2025,
      url: "https://investor.lilly.com/news-releases/news-release-details/lilly-statement-regarding-fraudulent-and-contaminated-tirzepatide",
    },
  ];

  return (
    <ResearchArticleLayout article={article}>
      <p
        className="text-xl text-brand-text-secondary leading-relaxed"
        data-speakable="lead"
      >
        La tirzepatida es el ingrediente activo de dos medicamentos
        de Eli Lilly con nombres comerciales distintos: <strong>
        Mounjaro</strong> (aprobado por la FDA para la diabetes tipo
        2) y <strong>Zepbound</strong> (aprobado para el manejo
        crónico del peso y para la apnea obstructiva del sueño
        moderada a severa). Esta guía en español explica los precios
        actuales de ambos productos, los programas de auto-pago y
        tarjetas de ahorro de Eli Lilly, una brecha crítica de
        acceso: no existe un Programa de Asistencia al Paciente
        gratuito de Eli Lilly para estos medicamentos que hayamos
        podido verificar, la cobertura limitada de Medicare y
        Medicaid, y las advertencias de la FDA sobre tirzepatida
        compuesta fraudulenta. Todos los datos verificados
        directamente contra las páginas oficiales de Eli Lilly y
        las comunicaciones de la FDA.
      </p>

      <h2>Primero: Mounjaro vs Zepbound (son el mismo medicamento)</h2>

      <p>
        Antes de hablar de precios, es crítico entender que{" "}
        <strong>Mounjaro y Zepbound contienen exactamente el mismo
        ingrediente activo: tirzepatida</strong>. Los fabrica la
        misma compañía (Eli Lilly), tienen los mismos efectos
        clínicos y los mismos efectos secundarios. La diferencia es
        la indicación aprobada por la FDA:
      </p>

      <ul>
        <li>
          <strong>Mounjaro</strong> — aprobado únicamente para la
          diabetes tipo 2 (control glucémico). También tiene
          aprobación para reducción de riesgo cardiovascular en
          pacientes diabéticos con enfermedad cardiovascular
          establecida.
        </li>
        <li>
          <strong>Zepbound</strong> — aprobado para el manejo
          crónico del peso en adultos con obesidad (IMC ≥30) o
          sobrepeso (IMC ≥27) con al menos una comorbilidad
          relacionada con el peso. En diciembre de 2024, la FDA
          agregó una segunda indicación: apnea obstructiva del
          sueño moderada a severa en adultos con obesidad. Esta
          segunda indicación es crítica para la cobertura de
          Medicare (ver abajo).
        </li>
      </ul>

      <p>
        La distinción importa porque los seguros, Medicare y
        Medicaid generalmente solo cubren Mounjaro cuando el
        paciente tiene un diagnóstico de diabetes tipo 2, y solo
        cubren Zepbound bajo condiciones muy limitadas (apnea del
        sueño o, en algunos estados, obesidad).
      </p>

      <h2>Precios de auto-pago (LillyDirect / Self Pay Journey Program)</h2>

      <p>
        Eli Lilly opera un programa de auto-pago directo para
        pacientes sin seguro llamado el <strong>Zepbound Self Pay
        Journey Program</strong>. Los precios actuales al mes, según
        la página oficial de zepbound.lilly.com/savings [1]:
      </p>

      <ul>
        <li>
          <strong>Zepbound 2.5 mg</strong> (dosis inicial): desde{" "}
          {formatPriceUsd(ZEPBOUND_PRICING.self_pay_2_5mg.price_usd)}{" "}
          al mes
        </li>
        <li>
          <strong>Zepbound 5 mg</strong>: desde{" "}
          {formatPriceUsd(ZEPBOUND_PRICING.self_pay_5mg.price_usd)}{" "}
          al mes
        </li>
        <li>
          <strong>Zepbound 7.5 mg, 10 mg, 12.5 mg, 15 mg</strong>:{" "}
          {formatPriceUsd(
            ZEPBOUND_PRICING.self_pay_higher_dose_journey.price_usd,
          )}{" "}
          al mes (con el Journey Program)
        </li>
      </ul>

      <p>
        <strong>Importante sobre el Journey Program:</strong> los
        precios más bajos ({formatPriceUsd(
          ZEPBOUND_PRICING.self_pay_higher_dose_journey.price_usd,
        )}
        /mes para las dosis más altas) se aplican <em>únicamente si
        rellenas tu receta dentro de 45 días</em> de tu última
        receta. Si pasan más de 45 días, se aplican los precios
        estándar, que son significativamente más altos:
      </p>

      <ul>
        <li>
          Zepbound 2.5 mg (precio estándar):{" "}
          {formatPriceUsd(ZEPBOUND_PRICING.self_pay_2_5mg.price_usd)}
          /mes
        </li>
        <li>
          Zepbound 5 mg (precio estándar):{" "}
          {formatPriceUsd(ZEPBOUND_PRICING.self_pay_5mg.price_usd)}
          /mes
        </li>
        <li>
          Zepbound 7.5 mg (precio estándar):{" "}
          {formatPriceUsd(
            ZEPBOUND_PRICING.self_pay_higher_dose_standard.price_usd,
          )}
          /mes
        </li>
        <li>
          Zepbound 10 mg, 12.5 mg, 15 mg (precio estándar):{" "}
          {formatPriceUsd(
            ZEPBOUND_PRICING.self_pay_higher_dose_standard.price_usd_max ??
              699,
          )}
          /mes
        </li>
      </ul>

      <p>
        La diferencia entre el precio del Journey Program y el
        precio estándar es significativa para las dosis altas —
        $250/mes o más para la dosis de 10, 12.5 o 15 mg. Mantén
        tus surtidos puntuales para preservar el precio con
        descuento.
      </p>

      <h2>Tarjeta de ahorro de Zepbound (con seguro comercial)</h2>

      <p>
        Si tienes seguro comercial que cubre Zepbound para el
        manejo del peso, puedes usar la tarjeta de ahorro de Eli
        Lilly. Según la página oficial [1]:
      </p>

      <ul>
        <li>
          <strong>Pacientes elegibles con seguro comercial y
          cobertura de Zepbound:</strong> desde $25 por una receta
          de hasta 3 meses de Zepbound en pluma de un solo uso.
        </li>
        <li>
          <strong>Límite máximo de ahorro:</strong> hasta $100 por
          receta mensual, $200 por receta de 2 meses o $300 por
          receta de 3 meses.
        </li>
        <li>
          <strong>Ahorro anual máximo:</strong> hasta $1,300 por
          año calendario.
        </li>
        <li>
          <strong>Vigencia:</strong> la tarjeta expira y los
          ahorros terminan el 31 de diciembre de 2026.
        </li>
        <li>
          <strong>NO elegible:</strong> pacientes con Medicare,
          Medicaid, VA, TRICARE, DoD u otros programas federales.
        </li>
      </ul>

      <h2>Tarjeta de ahorro de Mounjaro (con seguro comercial y diabetes)</h2>

      <p>
        La tarjeta de ahorro de Mounjaro tiene dos caminos según
        tu cobertura de seguro. Según la página oficial de
        mounjaro.lilly.com/savings-resources [2]:
      </p>

      <p>
        <strong>Camino 1 — Seguro comercial CON cobertura de
        Mounjaro:</strong>
      </p>
      <ul>
        <li>
          &ldquo;Si eres elegible y tienes un seguro comercial con
          cobertura para Mounjaro, puedes pagar tan poco como{" "}
          <strong>
            {formatPriceUsd(MOUNJARO_PRICING.savings_card_with_coverage.price_usd)}
          </strong>{" "}
          por una receta de hasta 3 meses de Mounjaro.&rdquo;
        </li>
      </ul>

      <p>
        <strong>Camino 2 — Seguro comercial SIN cobertura de
        Mounjaro:</strong>
      </p>
      <ul>
        <li>
          &ldquo;Debes tener seguro comercial que no cubra Mounjaro
          y una receta para un uso aprobado consistente con la
          etiqueta aprobada por la FDA para pagar tan poco como{" "}
          <strong>
            {formatPriceUsd(
              MOUNJARO_PRICING.savings_card_without_coverage.price_usd,
            )}
          </strong>{" "}
          por una receta mensual de Mounjaro en pluma de un solo
          uso.&rdquo;
        </li>
      </ul>

      <p>
        La tarjeta de ahorro de Mounjaro también expira el 31 de
        diciembre de 2026.
      </p>

      <h2>
        ALERTA: No existe un Programa de Asistencia al Paciente (PAP)
        para Mounjaro ni Zepbound
      </h2>

      <p>
        Esta es una de las diferencias más importantes entre
        tirzepatida y semaglutida (Ozempic). A diferencia de Novo
        Nordisk, que tiene un Programa de Asistencia al Paciente
        (PAP) público y bien documentado que ofrece Ozempic
        completamente GRATIS para pacientes sin seguro con ingresos
        bajos, <strong>Eli Lilly no ha publicado un Programa de
        Asistencia al Paciente gratuito equivalente para Mounjaro
        ni Zepbound</strong> que hayamos podido verificar al 8 de
        abril de 2026.
      </p>

      <p>
        Lilly Cares Foundation es la fundación de asistencia al
        paciente de Eli Lilly y ofrece varios medicamentos de Lilly
        gratis por hasta 12 meses a pacientes estadounidenses que
        califican. Sin embargo, la lista pública de medicamentos
        disponibles a través de Lilly Cares{" "}
        <strong>no incluye Mounjaro ni Zepbound</strong> según las
        fuentes públicas que pudimos consultar a la fecha de
        verificación. Si eres un paciente sin seguro que necesita
        tirzepatida, te recomendamos llamar directamente a Lilly
        Cares al <strong>1-800-545-6962</strong> para confirmar el
        estado actual de tu elegibilidad — puede haber excepciones
        individuales o programas específicos no documentados
        públicamente. Este es un punto de contacto que puede
        cambiar con el tiempo.
      </p>

      <p>
        <strong>Qué pueden hacer los pacientes sin seguro:</strong>
      </p>

      <ul>
        <li>
          Usar el programa de auto-pago (Journey Program) descrito
          arriba: $299/mes para la dosis inicial de 2.5 mg de
          Zepbound.
        </li>
        <li>
          Explorar programas de asistencia a través de fundaciones
          externas como NeedyMeds, RxAssist o la HealthWell
          Foundation — aunque la cobertura varía y no está
          garantizada.
        </li>
        <li>
          Hablar con el médico sobre si Mounjaro está clínicamente
          indicado (diabetes tipo 2) — aunque Mounjaro tampoco
          tiene PAP, su mayor cobertura por seguros y Medicare
          hace que el acceso sea más práctico.
        </li>
        <li>
          Considerar Wegovy u Ozempic, que sí tienen un programa
          PAP de Novo Nordisk (ver nuestra{" "}
          <Link href="/es/research/ozempic-precio-costo-comprar">
            guía de precios de Ozempic en español
          </Link>
          {" "}para los detalles).
        </li>
      </ul>

      <h2>Cobertura de Medicare Parte D</h2>

      <h3>Mounjaro (diabetes tipo 2)</h3>
      <p>
        Medicare Parte D <strong>cubre Mounjaro</strong> para
        pacientes con diabetes tipo 2, igual que otros GLP-1 para
        diabetes. Típicamente se clasifica en Nivel 3 del
        formulario con autorización previa requerida. Los copagos
        varían significativamente por plan, pero gracias al límite
        anual de $2,000 en gastos de Parte D establecido por la
        Ley de Reducción de la Inflación, una vez alcanzado el
        tope el costo baja a $0.
      </p>

      <h3>Zepbound (manejo del peso y apnea del sueño)</h3>
      <p>
        La cobertura de Zepbound por Medicare es muy diferente y
        más restringida:
      </p>
      <ul>
        <li>
          <strong>Para pérdida de peso:</strong> Medicare NO cubre
          Zepbound ni ningún otro GLP-1 para el manejo del peso por
          prohibición estatutaria federal. Esta regla se mantiene
          sin cambios en 2026.
        </li>
        <li>
          <strong>Para apnea obstructiva del sueño (OSA):</strong>{" "}
          desde la aprobación de la FDA de Zepbound para OSA en
          diciembre de 2024, Medicare Parte D{" "}
          <strong>sí cubre Zepbound</strong> para pacientes con
          apnea obstructiva del sueño moderada a severa y obesidad.
          A partir de abril de 2026, un acuerdo con el gobierno
          federal establece el copago de Zepbound en $50 al mes
          para pacientes elegibles de Medicare bajo esta indicación.
        </li>
      </ul>

      <p>
        Esto significa que si eres un paciente de Medicare con
        obesidad y apnea del sueño moderada a severa, Zepbound es
        accesible a $50/mes. Si tienes obesidad sola (sin OSA),
        Medicare no cubrirá Zepbound — independientemente de tu
        IMC.
      </p>

      <h2>Cobertura de Medicaid</h2>

      <h3>Mounjaro (diabetes tipo 2)</h3>
      <p>
        La mayoría de los programas estatales de Medicaid cubren
        Mounjaro para diabetes tipo 2 con autorización previa. Los
        detalles específicos (copago, nivel del formulario,
        requisitos de terapia escalonada) varían por estado. Esta
        cobertura NO es federalmente uniforme — verifica el
        formulario específico de tu plan Medicaid estatal.
      </p>

      <h3>Zepbound (manejo del peso)</h3>
      <p>
        La cobertura de Zepbound para obesidad en Medicaid es muy
        limitada. Según el informe de Kaiser Family Foundation de
        enero de 2026 [5]:
      </p>
      <ul>
        <li>
          Solo <strong>13 estados</strong> cubren Zepbound (u otros
          GLP-1 aprobados para obesidad como Wegovy) bajo sus
          programas Medicaid fee-for-service a enero de 2026.
        </li>
        <li>
          <strong>Cuatro estados eliminaron la cobertura</strong>{" "}
          en 2025-2026 por presiones presupuestarias: California,
          Pennsylvania, Michigan y South Carolina.
        </li>
        <li>
          North Carolina eliminó la cobertura en octubre de 2025 y
          luego la reinstaló en diciembre de 2025 — ilustra lo
          volátil que es el panorama de Medicaid para los GLP-1.
        </li>
        <li>
          El modelo BALANCE de CMS se lanzará el 1 de mayo de 2026
          y podría expandir la cobertura de GLP-1 en algunos
          estados mediante precios negociados.
        </li>
      </ul>

      <p>
        Si vives en uno de los 13 estados con cobertura, el acceso
        puede ser posible con autorización previa. Si no, Medicaid
        no cubrirá Zepbound para el manejo del peso.
      </p>

      <h2>Tirzepatida compuesta: advertencia crítica de la FDA</h2>

      <p>
        A diferencia de la semaglutida compuesta (que todavía
        puede dispensarse en ciertas circunstancias), la{" "}
        <strong>tirzepatida compuesta está esencialmente
        prohibida</strong> desde principios de 2025. Según las
        comunicaciones oficiales de la FDA [4]:
      </p>

      <ul>
        <li>
          La FDA terminó la discreción de cumplimiento
          (enforcement discretion) para tirzepatida en farmacias{" "}
          <strong>503A</strong> el 18 de febrero de 2025.
        </li>
        <li>
          La FDA terminó la discreción de cumplimiento para
          tirzepatida en instalaciones <strong>503B</strong> el 19
          de marzo de 2025.
        </li>
        <li>
          Después de estas fechas, la tirzepatida compuesta
          generalmente NO puede prepararse legalmente excepto bajo
          circunstancias muy limitadas donde un prescriptor
          documenta una necesidad médica específica que no puede
          ser satisfecha por el producto aprobado por la FDA (por
          ejemplo, una alergia documentada a un ingrediente
          inactivo de Zepbound o Mounjaro).
        </li>
        <li>
          El 7 de mayo de 2025, el Tribunal de Distrito de EE.UU.
          para el Distrito Norte de Texas confirmó la decisión de
          la FDA de remover la tirzepatida de la lista de escasez,
          reafirmando la ilegalidad del compuesto generalizado.
        </li>
      </ul>

      <p>
        <strong>Advertencia sobre tirzepatida fraudulenta:</strong>{" "}
        Eli Lilly y la FDA han documentado múltiples casos de
        productos vendidos como &ldquo;tirzepatida compuesta&rdquo;
        que [6]:
      </p>

      <ul>
        <li>
          Contenían bacterias y niveles altos de impurezas.
        </li>
        <li>
          Tenían un color diferente (rosado en lugar de incoloro).
        </li>
        <li>
          Tenían una estructura química completamente distinta a
          la tirzepatida auténtica.
        </li>
        <li>
          En al menos un caso, contenían únicamente alcohol de
          azúcar y ningún ingrediente activo.
        </li>
        <li>
          Incluían formas no aprobadas por la FDA: píldoras orales,
          tabletas sublinguales y aerosoles nasales — ninguna de
          estas formas ha sido evaluada o aprobada por la FDA como
          segura o efectiva.
        </li>
      </ul>

      <p>
        En septiembre de 2025, la FDA envió cartas de advertencia
        a más de 50 entidades relacionadas con la promoción y el
        etiquetado de tirzepatida compuesta. Si consideras
        tirzepatida compuesta, verifica cuidadosamente la
        licencia estatal de la farmacia, la acreditación PCAB
        (Pharmacy Compounding Accreditation Board, el estándar
        voluntario de calidad para farmacias de compuestos en
        Estados Unidos) y la documentación médica específica de
        tu prescriptor que justifique el uso compuesto en lugar
        del producto aprobado por la FDA. La mayoría de los productos comercializados
        como &ldquo;tirzepatida compuesta&rdquo; en internet no
        cumplen estos requisitos.
      </p>

      <h2>Canadá (contexto comparativo)</h2>

      <p>
        Para contexto: en diciembre de 2025, Eli Lilly redujo los
        precios de Mounjaro en Canadá en más del 20%. Los nuevos
        precios de lista canadienses para un suministro de 4
        semanas son:
      </p>

      <ul>
        <li>Mounjaro 2.5 mg y 5 mg: CAD $300</li>
        <li>Mounjaro 7.5 mg y 10 mg: CAD $420</li>
      </ul>

      <p>
        Ontario no cubre actualmente Mounjaro bajo el Ontario Drug
        Benefit (ODB), por lo que la mayoría de los residentes de
        Ontario pagan en efectivo o usan seguro privado. Esta
        información es de contexto únicamente — importar Mounjaro
        desde Canadá a Estados Unidos sin una receta válida de
        EE.UU. generalmente no es legal.
      </p>

      <h2>Resumen: ¿cuál es tu costo más bajo posible?</h2>

      <table className="w-full text-sm border-collapse">
        <thead>
          <tr>
            <th className="text-left border-b border-brand-violet/20 py-2">
              Tu situación
            </th>
            <th className="text-left border-b border-brand-violet/20 py-2">
              Costo más bajo (Zepbound)
            </th>
            <th className="text-left border-b border-brand-violet/20 py-2">
              Costo más bajo (Mounjaro)
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-brand-violet/10">
            <td className="py-2">Seguro comercial + cobertura de tirzepatida</td>
            <td>$25/receta (hasta 3 meses)</td>
            <td>$25/receta (hasta 3 meses)</td>
          </tr>
          <tr className="border-b border-brand-violet/10">
            <td className="py-2">Seguro comercial SIN cobertura de tirzepatida</td>
            <td>$299-$449/mes (Journey Program)</td>
            <td>$499/mes (tarjeta de ahorro)</td>
          </tr>
          <tr className="border-b border-brand-violet/10">
            <td className="py-2">Medicare + diabetes tipo 2</td>
            <td>N/A (Medicare no cubre para peso)</td>
            <td>Nivel 3, copago variable + tope $2,000/año</td>
          </tr>
          <tr className="border-b border-brand-violet/10">
            <td className="py-2">Medicare + apnea del sueño + obesidad</td>
            <td>$50/mes (desde abril 2026)</td>
            <td>N/A (Mounjaro no aprobado para OSA)</td>
          </tr>
          <tr className="border-b border-brand-violet/10">
            <td className="py-2">Medicaid + diabetes (estado típico)</td>
            <td>N/A</td>
            <td>Copago variable con autorización previa</td>
          </tr>
          <tr className="border-b border-brand-violet/10">
            <td className="py-2">Sin seguro</td>
            <td>$299-$449/mes (Journey Program)</td>
            <td>$499/mes (tarjeta de ahorro si es para T2D)</td>
          </tr>
        </tbody>
      </table>

      <h2>Recursos relacionados</h2>

      <ul>
        <li>
          <Link href="/es/research/ozempic-precio-costo-comprar">
            Ozempic precio: cuánto cuesta y dónde comprar
          </Link>{" "}
          — la guía paralela para semaglutida, que SÍ tiene un
          Programa de Asistencia al Paciente.
        </li>
        <li>
          <Link href="/es/research/tirzepatide-para-que-sirve">
            Tirzepatida: para qué sirve y cómo funciona
          </Link>{" "}
          — información clínica sobre el mecanismo dual GLP-1/GIP.
        </li>
        <li>
          <Link href="/es/research/wegovy-vs-ozempic-diferencias">
            Wegovy vs Ozempic: diferencias
          </Link>{" "}
          — comparación de las dos versiones de semaglutida.
        </li>
        <li>
          <Link href="/es/research/como-inyectar-semaglutida-guia-paso-a-paso">
            Cómo inyectar semaglutida / tirzepatida paso a paso
          </Link>{" "}
          — guía de técnica de inyección para Mounjaro, Zepbound,
          Wegovy y Ozempic.
        </li>
      </ul>

      <p className="mt-8 text-sm text-brand-text-secondary">
        <strong>Descargo de responsabilidad importante:</strong> los
        precios en este artículo reflejan información pública de
        abril de 2026 verificada contra las páginas oficiales de
        Eli Lilly (zepbound.lilly.com y mounjaro.lilly.com),
        Medicare, Kaiser Family Foundation y alertas oficiales de
        la FDA. Los precios exactos que pagarás pueden variar
        según tu farmacia, tu plan de seguro específico, tu estado
        y los programas en vigor. Verifica siempre el precio
        actual en LillyDirect y con tu farmacia antes de asumir un
        costo. Este artículo es informativo y no constituye
        asesoramiento médico ni financiero. La información sobre
        regulaciones de compuestos puede cambiar — consulta con
        un farmacéutico con licencia antes de obtener tirzepatida
        compuesta.
      </p>

      <References items={citations} />
      <FaqSchema
        items={[
          {
            question: "¿Cuánto cuesta Zepbound sin seguro en 2026?",
            answer:
              "Eli Lilly opera un programa de auto-pago (Zepbound Self Pay Journey Program) con precios desde $299/mes para la dosis inicial de 2.5 mg, $399/mes para 5 mg, y $449/mes para las dosis de 7.5 mg, 10 mg, 12.5 mg y 15 mg — si mantienes los surtidos dentro de 45 días del surtido anterior. Si no, los precios estándar son más altos ($699/mes para 10, 12.5 y 15 mg). El acceso es a través de LillyDirect.",
          },
          {
            question: "¿Cuánto cuesta Mounjaro sin seguro en 2026?",
            answer:
              "Mounjaro no tiene un programa de auto-pago tan estructurado como Zepbound. Para pacientes con seguro comercial SIN cobertura de Mounjaro, la tarjeta de ahorro de Eli Lilly permite pagar $499/mes por una receta mensual (siempre que la receta sea para un uso aprobado por la FDA). Pacientes completamente sin seguro no tienen acceso al programa de tarjeta de ahorro.",
          },
          {
            question: "¿Existe un programa de asistencia al paciente para Mounjaro o Zepbound?",
            answer:
              "Hasta donde pudimos verificar al 8 de abril de 2026, Eli Lilly no ha publicado un Programa de Asistencia al Paciente gratuito equivalente al de Novo Nordisk (que sí ofrece Ozempic gratis a pacientes sin seguro con ingresos bajos). La lista pública de Lilly Cares Foundation no incluye Mounjaro ni Zepbound según las fuentes que consultamos. Recomendamos llamar directamente a Lilly Cares al 1-800-545-6962 para confirmar tu elegibilidad antes de asumir que no hay opciones. Mientras tanto, los pacientes sin seguro pueden usar el programa de auto-pago de Zepbound ($299-$449/mes) o explorar fundaciones externas como NeedyMeds o RxAssist.",
          },
          {
            question: "¿Medicare cubre Zepbound?",
            answer:
              "Medicare Parte D cubre Zepbound ÚNICAMENTE para pacientes con apnea obstructiva del sueño moderada a severa y obesidad (la segunda indicación aprobada por la FDA en diciembre de 2024). A partir de abril de 2026, el copago es de $50/mes para pacientes elegibles bajo la indicación de OSA. Medicare NO cubre Zepbound para el manejo del peso sin apnea del sueño — esto está prohibido por ley federal. Mounjaro sí está cubierto para diabetes tipo 2.",
          },
          {
            question: "¿Puedo comprar tirzepatida compuesta legalmente en 2026?",
            answer:
              "Generalmente NO. La FDA terminó la discreción de cumplimiento para la tirzepatida compuesta en farmacias 503A el 18 de febrero de 2025 y en instalaciones 503B el 19 de marzo de 2025. Después de esas fechas, la tirzepatida compuesta solo puede prepararse legalmente en circunstancias muy limitadas donde un prescriptor documenta una necesidad médica específica que el producto aprobado por la FDA no puede satisfacer. Eli Lilly y la FDA han documentado productos fraudulentos vendidos como 'tirzepatida compuesta' que contenían bacterias, impurezas, colores incorrectos o en un caso solo alcohol de azúcar. Verifica siempre la licencia estatal y la acreditación PCAB de cualquier farmacia de compuestos.",
          },
          {
            question: "¿Cuál es la diferencia de cobertura entre Mounjaro y Zepbound?",
            answer:
              "Mounjaro (tirzepatida para diabetes) tiene cobertura amplia: la mayoría de los seguros comerciales, Medicare Parte D y Medicaid lo cubren para pacientes con diabetes tipo 2 con autorización previa. Zepbound (tirzepatida para peso y apnea del sueño) tiene cobertura mucho más limitada: los seguros comerciales varían significativamente, Medicare solo cubre bajo la indicación de apnea del sueño ($50/mes desde abril 2026), y solo 13 estados de Medicaid cubren Zepbound para obesidad a enero de 2026. Ambos productos contienen el mismo ingrediente activo (tirzepatida) pero tienen perfiles de cobertura completamente diferentes.",
          },
        ]}
      />
    </ResearchArticleLayout>
  );
}
