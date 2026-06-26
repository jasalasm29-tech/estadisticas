import crypto from "crypto";

// Helper para integrar con la API de Flow.cl (pagos en CLP).
// Documentación: https://www.flow.cl/docs/api.html

const FLOW_API_KEY = process.env.NEXT_PUBLIC_FLOW_API_KEY ?? "";
const FLOW_SECRET_KEY = process.env.FLOW_SECRET_KEY ?? "";

// Sandbox vs producción. Flow expone su API sandbox en sandbox.flow.cl.
export const FLOW_API_URL =
  process.env.NODE_ENV === "production"
    ? "https://www.flow.cl/api"
    : "https://sandbox.flow.cl/api";

/** Indica si Flow está configurado con sus credenciales. */
export const isFlowConfigured = Boolean(FLOW_API_KEY && FLOW_SECRET_KEY);

/**
 * Firma un conjunto de parámetros según el esquema de Flow:
 * se concatenan los pares clave+valor ordenados alfabéticamente y
 * se firma con HMAC-SHA256 usando el secret key.
 */
export function signParams(params: Record<string, string | number>): string {
  const sorted = Object.keys(params).sort();
  const toSign = sorted.map((key) => `${key}${params[key]}`).join("");
  return crypto
    .createHmac("sha256", FLOW_SECRET_KEY)
    .update(toSign)
    .digest("hex");
}

/**
 * Crea una orden de pago en Flow y devuelve la URL de redirección
 * (`url` + `token`) a la que se debe enviar al usuario.
 */
export async function createFlowPayment(input: {
  commerceOrder: string;
  subject: string;
  amount: number; // CLP, entero
  email: string;
  urlConfirmation: string;
  urlReturn: string;
}): Promise<{ url: string; token: string; flowOrder: number }> {
  if (!isFlowConfigured) {
    throw new Error("Flow.cl no está configurado (faltan credenciales).");
  }

  const params: Record<string, string | number> = {
    apiKey: FLOW_API_KEY,
    commerceOrder: input.commerceOrder,
    subject: input.subject,
    currency: "CLP",
    amount: input.amount,
    email: input.email,
    urlConfirmation: input.urlConfirmation,
    urlReturn: input.urlReturn,
  };

  const s = signParams(params);
  const body = new URLSearchParams(
    Object.entries({ ...params, s }).map(([k, v]) => [k, String(v)])
  );

  const res = await fetch(`${FLOW_API_URL}/payment/create`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Error creando pago en Flow (${res.status}): ${detail}`);
  }

  const data = (await res.json()) as {
    url: string;
    token: string;
    flowOrder: number;
  };

  // Flow devuelve la URL base; el destino final es url + "?token=" + token.
  return { url: `${data.url}?token=${data.token}`, token: data.token, flowOrder: data.flowOrder };
}
