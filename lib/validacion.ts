// Sistema de validación — soporte del plan de 14 días.
//
// Deliberadamente usa localStorage y no Supabase: el presupuesto es CLP 0 y esto
// tiene que funcionar con `npm run dev` sin configurar nada. Los datos son del
// fundador, no de clientes, así que no hay razón para ponerlos en un servidor.
// Incluye exportar/importar JSON para que nada se pierda al limpiar el navegador.

export const STORAGE_KEY = "validacion.v1";

/** Meta del plan: 60 prospectos en lista, 40 conversaciones iniciadas. */
export const META_PROSPECTOS = 60;
export const META_CONVERSACIONES = 40;
/** Un dolor necesita mencionarse espontáneamente al menos 8 veces para ser real. */
export const UMBRAL_DOLOR = 8;

export type Estado =
  | "por_contactar"
  | "contactado"
  | "respondio"
  | "entrevistado"
  | "piloto"
  | "pagando"
  | "descartado";

export const ESTADOS: { id: Estado; label: string; color: string }[] = [
  { id: "por_contactar", label: "Por contactar", color: "bg-gray-100 text-gray-700" },
  { id: "contactado", label: "Contactado", color: "bg-blue-50 text-google-blue" },
  { id: "respondio", label: "Respondió", color: "bg-yellow-50 text-yellow-700" },
  { id: "entrevistado", label: "Entrevistado", color: "bg-purple-50 text-purple-700" },
  { id: "piloto", label: "Piloto ofrecido", color: "bg-orange-50 text-orange-700" },
  { id: "pagando", label: "PAGANDO", color: "bg-green-50 text-google-green" },
  { id: "descartado", label: "Descartado", color: "bg-gray-100 text-gray-400" },
];

/** Los estados que cuentan como "conversación iniciada". */
export const ESTADOS_CONTACTADOS: Estado[] = [
  "contactado",
  "respondio",
  "entrevistado",
  "piloto",
  "pagando",
];

/** Los estados que cuentan como respuesta obtenida. */
export const ESTADOS_RESPONDIERON: Estado[] = [
  "respondio",
  "entrevistado",
  "piloto",
  "pagando",
];

/**
 * Segmentos que se prueban en paralelo. No son negocios distintos: son dos
 * apuestas sobre dónde está el dolor pagable, y se testean con el mismo método.
 */
export type Segmento = "contratista" | "seller";

export const SEGMENTOS: { id: Segmento; label: string; descripcion: string }[] = [
  {
    id: "contratista",
    label: "Contratista pyme",
    descripcion:
      "Empresa chica que presta servicios a mandantes grandes (minería, construcción, industria) y debe acreditar papeles en el portal de cada uno.",
  },
  {
    id: "seller",
    label: "Seller e-commerce",
    descripcion:
      "Tienda online chilena que vende en uno o varios canales y despacha con couriers.",
  },
];

/**
 * Taxonomía de dolores por segmento.
 *
 * Contratista: derivados de la Ley 20.123 (responsabilidad solidaria del mandante),
 * del F30-1 y de la acreditación para ingreso a faena. El competidor existe pero
 * le vende al mandante grande; el lado pyme hoy se resuelve pagándole a alguien
 * que suba los papeles a mano, portal por portal.
 *
 * Seller: derivados de la evidencia de fallas de sincronización de marketplaces
 * y de la baja tasa de resolución de reclamos de los couriers.
 *
 * "otro" existe para capturar lo que no anticipamos, que suele ser lo más valioso.
 */
export const DOLORES: {
  id: string;
  label: string;
  segmento: Segmento | "ambos";
  hipotesis?: string;
}[] = [
  // — Contratista pyme —
  {
    id: "subir_papeles_portales",
    label: "Subir los mismos papeles al portal de cada mandante",
    segmento: "contratista",
    hipotesis: "C1",
  },
  {
    id: "vencimientos_docs",
    label: "Documentos que se vencen sin que nadie avise",
    segmento: "contratista",
    hipotesis: "C1",
  },
  {
    id: "trabajador_rechazado",
    label: "Trabajador rechazado en portería por papeles",
    segmento: "contratista",
    hipotesis: "C2",
  },
  {
    id: "pago_retenido",
    label: "Pago retenido por el mandante por documentación incompleta",
    segmento: "contratista",
    hipotesis: "C2",
  },
  {
    id: "f30_mensual",
    label: "Sacar F30 / F30-1 todos los meses",
    segmento: "contratista",
    hipotesis: "C3",
  },
  {
    id: "examenes_cursos",
    label: "Controlar exámenes y cursos vigentes por trabajador",
    segmento: "contratista",
    hipotesis: "C3",
  },
  {
    id: "cotizaciones_comprobantes",
    label: "Juntar comprobantes de cotizaciones pagadas",
    segmento: "contratista",
  },

  // — Seller e-commerce —
  {
    id: "sync_marketplace",
    label: "Sincronización entre canales / marketplaces",
    segmento: "seller",
    hipotesis: "S1",
  },
  {
    id: "quiebre_stock",
    label: "Quiebres de stock por desincronización",
    segmento: "seller",
    hipotesis: "S1",
  },
  {
    id: "reclamos_courier",
    label: "Reclamos y post-entrega con el courier",
    segmento: "seller",
    hipotesis: "S2",
  },
  {
    id: "seguimiento_despacho",
    label: "Seguimiento de despachos / pedidos atrasados",
    segmento: "seller",
    hipotesis: "S3",
  },
  {
    id: "publicar_productos",
    label: "Cargar y publicar productos en cada canal",
    segmento: "seller",
  },
  {
    id: "devoluciones",
    label: "Gestión de devoluciones y cambios",
    segmento: "seller",
  },
  {
    id: "conciliar_pagos",
    label: "Conciliar pagos y liquidaciones del marketplace",
    segmento: "seller",
  },

  // — Transversales —
  { id: "excel_manual", label: "Reportes y control en Excel a mano", segmento: "ambos" },
  {
    id: "atencion_whatsapp",
    label: "Atender consultas por WhatsApp",
    segmento: "ambos",
  },
  { id: "facturacion_dte", label: "Facturación / boletas / DTE", segmento: "ambos" },
  { id: "otro", label: "Otro (anotar en notas)", segmento: "ambos" },
];

export interface Entrevista {
  fecha: string;
  /** ¿Qué haces todos los días que preferirías no hacer? */
  r1: string;
  /** ¿Última vez que perdiste plata por un tema operacional? ¿Cuánto? */
  r2: string;
  /** ¿Qué herramientas pagas y qué sigues haciendo a mano igual? */
  r3: string;
  /** Si pudieras contratar a alguien 4 h/semana para una tarea, ¿cuál? */
  r4: string;
  /** ¿Buscaste una herramienta y no existía o no sirvió? ¿Por qué? */
  r5: string;
  /** Monto en CLP que declara haber perdido. El dato que convierte molestia en dolor. */
  montoPerdidoClp: number | null;
}

export interface Prospecto {
  id: string;
  segmento: Segmento;
  nombre: string;
  tienda: string;
  canales: string;
  contacto: string;
  fuente: string;
  estado: Estado;
  fechaContacto: string | null;
  dolores: string[];
  notas: string;
  entrevista: Entrevista | null;
}

export const PREGUNTAS: { campo: keyof Entrevista; texto: string; nota?: string }[] = [
  {
    campo: "r1",
    texto: "Cuéntame tu semana. ¿Qué haces todos los días que preferirías no hacer?",
  },
  {
    campo: "r2",
    texto:
      "¿Cuál fue la última vez que perdiste una venta o plata por un tema operacional? ¿Cuánto fue?",
    nota: "LA PREGUNTA CLAVE. Un dolor con monto en pesos se puede cobrar. Sin monto, es una molestia.",
  },
  {
    campo: "r3",
    texto:
      "¿Qué herramientas pagas hoy y cuánto? ¿Qué es lo que igual haces a mano pese a pagarlas?",
    nota: "Aquí aparece el hueco que dejan los competidores.",
  },
  {
    campo: "r4",
    texto:
      "Si pudieras contratar a alguien 4 horas a la semana sólo para una tarea, ¿cuál sería?",
  },
  {
    campo: "r5",
    texto:
      "¿Alguna vez buscaste una herramienta para eso y no la encontraste, o la encontraste y no te sirvió? ¿Por qué?",
  },
];

/**
 * Plantillas de primer contacto. Son de INVESTIGACIÓN, no de venta:
 * no mencionan producto ni precio, y ofrecen salida explícita.
 * La salida explícita no es sólo cortesía — es lo que exige la Ley 19.628 hoy
 * y lo que la Ley 21.719 endurecerá desde el 1 de diciembre de 2026.
 */
export const PLANTILLAS: {
  id: string;
  canal: string;
  segmento: Segmento | "ambos";
  texto: string;
}[] = [
  // — Contratista pyme —
  {
    id: "c_whatsapp",
    canal: "WhatsApp / llamada",
    segmento: "contratista",
    texto: `Hola {nombre}, ¿cómo estás? Te escribo por {tienda}.

Trabajo en logística y estoy investigando cómo llevan los papeles las empresas que prestan servicios a mandantes grandes: la acreditación, el F30-1, los exámenes de los trabajadores.

Una sola pregunta: ¿cuánto tiempo al mes se te va subiendo documentos a los portales de tus mandantes?

No te vendo nada, es investigación. Si no quieres que te escriba, me dices y listo.`,
  },
  {
    id: "c_email",
    canal: "Correo",
    segmento: "contratista",
    texto: `Asunto: cómo llevan la acreditación en {tienda}

Hola {nombre},

Estoy investigando cómo las empresas contratistas chilenas manejan la documentación que les exigen sus mandantes: F30-1, exámenes ocupacionales, cursos, comprobantes de cotizaciones.

No vendo nada todavía. Quiero entender una cosa: ¿cuántas horas al mes se les va subiendo los mismos papeles a portales distintos?

Si me respondes aunque sea en una línea, me ayudas mucho.

Si no quiere recibir más correos míos, respóndame "baja" y no le vuelvo a escribir.

{firma}`,
  },
  {
    id: "c_dolor",
    canal: "Apertura por dolor concreto",
    segmento: "contratista",
    texto: `Hola {nombre}, una consulta corta sobre {tienda}.

¿Les ha pasado que un trabajador no puede entrar a faena porque se venció un examen o un curso, y nadie se dio cuenta antes?

Estoy investigando qué tan seguido pasa eso y cuánto cuesta. No te vendo nada.`,
  },

  // — Seller e-commerce —
  {
    id: "dm",
    canal: "Instagram / DM",
    segmento: "seller",
    texto: `Hola {nombre}, vi {tienda} y que venden en {canales} hace tiempo.

Trabajo en logística y e-commerce y estoy investigando qué es lo que más tiempo les quita a los que venden en varios canales a la vez.

¿Te puedo hacer una sola pregunta? ¿Qué cosa haces todas las semanas a mano que sientes que debería estar automatizada?

No te estoy vendiendo nada, estoy investigando. Si prefieres que no te escriba más, dímelo y listo.`,
  },
  {
    id: "email",
    canal: "Correo",
    segmento: "seller",
    texto: `Asunto: una pregunta sobre cómo operan en {tienda}

Hola {nombre},

Trabajo en logística y e-commerce en Chile y estoy investigando qué procesos siguen siendo manuales para quienes venden en {canales}.

No vendo nada todavía. Sólo quiero entender una cosa: ¿qué tarea repites cada semana a mano que crees que debería estar automatizada?

Si me respondes aunque sea en una línea, me ayudas mucho.

Si no quieres recibir más correos míos, respóndeme "baja" y no te vuelvo a escribir.

{firma}`,
  },
  {
    id: "whatsapp",
    canal: "WhatsApp",
    segmento: "seller",
    texto: `Hola {nombre}, ¿cómo estás? Te escribo por {tienda}.

Trabajo en logística y e-commerce y estoy investigando qué les quita más tiempo a los que venden en {canales}.

Una sola pregunta: ¿qué haces todas las semanas a mano que debería estar automatizado?

No te vendo nada, es investigación. Si no quieres que te escriba, me dices y listo.`,
  },
  {
    id: "seguimiento",
    canal: "Seguimiento (a los 4 días)",
    segmento: "ambos",
    texto: `Hola {nombre}, te escribí hace unos días sobre lo que más tiempo les quita operando en {canales}.

Sé que andas ocupado. Si me tiras una sola frase con lo más molesto de tu semana, me sirve igual.

Y si no es tu tema, no hay problema, no te escribo más.`,
  },
  {
    id: "oferta",
    canal: "Oferta de piloto (día 13-14)",
    segmento: "ambos",
    texto: `{nombre}, me quedé pensando en lo que me contaste sobre {dolor}.

Eso lo puedo resolver. Te lo dejo funcionando en 2 semanas.

El primer mes son UF 3 y si no te sirve, no sigues. Después son UF 6 al mes.

¿Lo hacemos?`,
  },
];

export function prospectoVacio(segmento: Segmento = "contratista"): Prospecto {
  return {
    id: crypto.randomUUID(),
    segmento,
    nombre: "",
    tienda: "",
    canales: "",
    contacto: "",
    fuente: "",
    estado: "por_contactar",
    fechaContacto: null,
    dolores: [],
    notas: "",
    entrevista: null,
  };
}

export function entrevistaVacia(): Entrevista {
  return {
    fecha: new Date().toISOString().slice(0, 10),
    r1: "",
    r2: "",
    r3: "",
    r4: "",
    r5: "",
    montoPerdidoClp: null,
  };
}

export function cargar(): Prospecto[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const datos = JSON.parse(raw) as Prospecto[];
    // Los prospectos guardados antes de que existieran los segmentos no traen
    // el campo. Se asumen sellers, que era el único segmento en ese momento.
    return datos.map((p) => ({ ...p, segmento: p.segmento ?? "seller" }));
  } catch {
    return [];
  }
}

export function guardar(prospectos: Prospecto[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prospectos));
}

/** Rellena una plantilla con los datos del prospecto. */
export function renderPlantilla(
  texto: string,
  p: Prospecto,
  extras: Record<string, string> = {}
): string {
  const valores: Record<string, string> = {
    nombre: p.nombre || "…",
    tienda: p.tienda || "tu tienda",
    canales: p.canales || "varios canales",
    firma: "",
    dolor: "…",
    ...extras,
  };
  return texto.replace(/\{(\w+)\}/g, (_, k: string) => valores[k] ?? `{${k}}`);
}

export interface Metricas {
  total: number;
  contactados: number;
  respondieron: number;
  entrevistados: number;
  pilotos: number;
  pagando: number;
  tasaRespuesta: number;
  montoTotalDeclarado: number;
  ranking: { id: string; label: string; hipotesis?: string; n: number }[];
  alertas: string[];
}

export function calcularMetricas(prospectos: Prospecto[]): Metricas {
  const total = prospectos.length;
  const contactados = prospectos.filter((p) =>
    ESTADOS_CONTACTADOS.includes(p.estado)
  ).length;
  const respondieron = prospectos.filter((p) =>
    ESTADOS_RESPONDIERON.includes(p.estado)
  ).length;
  const entrevistados = prospectos.filter((p) => p.entrevista !== null).length;
  const pilotos = prospectos.filter((p) => p.estado === "piloto").length;
  const pagando = prospectos.filter((p) => p.estado === "pagando").length;

  const tasaRespuesta = contactados > 0 ? (respondieron / contactados) * 100 : 0;

  const montoTotalDeclarado = prospectos.reduce(
    (acc, p) => acc + (p.entrevista?.montoPerdidoClp ?? 0),
    0
  );

  const conteo = new Map<string, number>();
  for (const p of prospectos) {
    for (const d of p.dolores) conteo.set(d, (conteo.get(d) ?? 0) + 1);
  }
  const ranking = DOLORES.map((d) => ({
    id: d.id,
    label: d.label,
    hipotesis: d.hipotesis,
    n: conteo.get(d.id) ?? 0,
  }))
    .filter((d) => d.n > 0)
    .sort((a, b) => b.n - a.n);

  // Criterios de muerte definidos ANTES de empezar (MODELO_FINANCIERO.md §6).
  // Se evalúan solos para que la decisión no dependa del ánimo del día.
  const alertas: string[] = [];
  if (contactados >= META_CONVERSACIONES && tasaRespuesta < 10) {
    alertas.push(
      `Tasa de respuesta ${tasaRespuesta.toFixed(1)}% con ${contactados} contactados. ` +
        `Criterio de muerte: el canal o el mensaje están mal. Cambia el CANAL antes que el producto.`
    );
  }
  if (entrevistados >= 5 && pilotos === 0 && pagando === 0) {
    alertas.push(
      `${entrevistados} entrevistas y 0 pilotos ofrecidos. ` +
        `Si hay interés pero nadie quiere pagar, es molestia y no problema: cambia la hipótesis.`
    );
  }
  if (entrevistados >= 20 && ranking.every((d) => d.n < UMBRAL_DOLOR)) {
    alertas.push(
      `Ningún dolor supera ${UMBRAL_DOLOR} menciones con ${entrevistados} entrevistas. ` +
        `No hay patrón: vuelve al top 10 de docs/business/OPORTUNIDADES.md.`
    );
  }
  if (pilotos >= 3 && pagando === 0) {
    alertas.push(
      `${pilotos} pilotos ofrecidos y 0 pagando. Revisa el precio o el cierre, no el producto.`
    );
  }

  return {
    total,
    contactados,
    respondieron,
    entrevistados,
    pilotos,
    pagando,
    tasaRespuesta,
    montoTotalDeclarado,
    ranking,
    alertas,
  };
}

export const CLP = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  maximumFractionDigits: 0,
});
