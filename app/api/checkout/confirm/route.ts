import { NextRequest, NextResponse } from "next/server";
import { FLOW_API_URL, isFlowConfigured, signParams } from "@/lib/flow";

const FLOW_API_KEY = process.env.NEXT_PUBLIC_FLOW_API_KEY ?? "";

/**
 * POST /api/checkout/confirm
 * Webhook de confirmación (urlConfirmation) que Flow llama tras el pago.
 * Recibe `token` (form-urlencoded), consulta el estado real del pago y,
 * si está pagado (status === 2), debe activar la suscripción del usuario.
 */
export async function POST(req: NextRequest) {
  if (!isFlowConfigured) {
    return NextResponse.json({ error: "Flow no configurado." }, { status: 503 });
  }

  try {
    const form = await req.formData();
    const token = String(form.get("token") ?? "");
    if (!token) {
      return NextResponse.json({ error: "Falta token." }, { status: 400 });
    }

    // Consultar el estado del pago firmando los parámetros.
    const params = { apiKey: FLOW_API_KEY, token };
    const s = signParams(params);
    const query = new URLSearchParams({ ...params, s }).toString();

    const res = await fetch(`${FLOW_API_URL}/payment/getStatus?${query}`);
    const data = (await res.json()) as { status: number; commerceOrder: string };

    if (data.status === 2) {
      // Pago confirmado: activar la suscripción Premium del usuario.
      // TODO: persistir en Supabase el estado premium de la cuenta asociada
      // a data.commerceOrder.
      console.log(`Pago confirmado para orden ${data.commerceOrder}`);
    }

    // Flow espera un 200 para considerar entregada la confirmación.
    return new NextResponse("OK", { status: 200 });
  } catch (err) {
    console.error("Confirm error:", err);
    return new NextResponse("error", { status: 500 });
  }
}
