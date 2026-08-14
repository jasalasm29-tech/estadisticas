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
 * Taxonomía de dolores. Las tres primeras son las hipótesis con evidencia
 * documentada (ver docs/sales/PLAN_VALIDACION_14_DIAS.md). Las demás existen
 * para capturar lo que no anticipamos — que es justamente lo más valioso.
 */
export const DOLORES: { id: string; label: string; hipotesis?: string }[] = [
  { id: "sync_marketplace", label: "Sincronización entre canales / marketplaces", hipotesis: "H1" },
  { id: "quiebre_stock", label: "Quiebres de stock por desincronización", hipotesis: "H1" },
  { id: "reclamos_courier", label: "Reclamos y post-entrega con el courier", hipotesis: "H2" },
  { id: "seguimiento_despacho", label: "Seguimiento de despachos / pedidos atrasados", hipotesis: "H3" },
  { id: "excel_manual", label: "Reportes y control en Excel a mano", hipotesis: "H3" },
  { id: "atencion_whatsapp", label: "Atender consultas por WhatsApp/Instagram" },
  { id: "publicar_productos", label: "Cargar y publicar productos en cada canal" },
  { id: "devoluciones", label: "Gestión de devoluciones y cambios" },
  { id: "precios_competencia", label: "Vigilar precios de la competencia" },
  { id: "facturacion_dte", label: "Facturación / boletas / DTE" },
  { id: "conciliar_pagos", label: "Conciliar pagos y liquidaciones del marketplace" },
  { id: "otro", label: "Otro (anotar en notas)" },
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
export const PLANTILLAS: { id: string; canal: string; texto: string }[] = [
  {
    id: "dm",
    canal: "Instagram / DM",
    texto: `Hola {nombre}, vi {tienda} y que venden en {canales} hace tiempo.

Trabajo en logística y e-commerce y estoy investigando qué es lo que más tiempo les quita a los que venden en varios canales a la vez.

¿Te puedo hacer una sola pregunta? ¿Qué cosa haces todas las semanas a mano que sientes que debería estar automatizada?

No te estoy vendiendo nada, estoy investigando. Si prefieres que no te escriba más, dímelo y listo.`,
  },
  {
    id: "email",
    canal: "Correo",
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
    texto: `Hola {nombre}, ¿cómo estás? Te escribo por {tienda}.

Trabajo en logística y e-commerce y estoy investigando qué les quita más tiempo a los que venden en {canales}.

Una sola pregunta: ¿qué haces todas las semanas a mano que debería estar automatizado?

No te vendo nada, es investigación. Si no quieres que te escriba, me dices y listo.`,
  },
  {
    id: "seguimiento",
    canal: "Seguimiento (a los 4 días)",
    texto: `Hola {nombre}, te escribí hace unos días sobre lo que más tiempo les quita operando en {canales}.

Sé que andas ocupado. Si me tiras una sola frase con lo más molesto de tu semana, me sirve igual.

Y si no es tu tema, no hay problema, no te escribo más.`,
  },
  {
    id: "oferta",
    canal: "Oferta de piloto (día 13-14)",
    texto: `{nombre}, me quedé pensando en lo que me contaste sobre {dolor}.

Eso lo puedo resolver. Te lo dejo funcionando en 2 semanas.

El primer mes son UF 3 y si no te sirve, no sigues. Después son UF 6 al mes.

¿Lo hacemos?`,
  },
];

export function prospectoVacio(): Prospecto {
  return {
    id: crypto.randomUUID(),
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
    return raw ? (JSON.parse(raw) as Prospecto[]) : [];
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
