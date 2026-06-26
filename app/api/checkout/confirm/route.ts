import { NextRequest, NextResponse } from "next/server";
import { FLOW_API_URL, isFlowConfigured, signParams } from "@/lib/flow";
import { isSupabaseAdminConfigured } from "@/lib/supabase";
import { activatePremium, rejectSubscription } from "@/lib/subscriptions";

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

    // Estados de Flow: 1=pendiente, 2=pagado, 3=rechazado, 4=anulado.
    if (isSupabaseAdminConfigured && data.commerceOrder) {
      if (data.status === 2) {
        await activatePremium(data.commerceOrder);
      } else if (data.status === 3 || data.status === 4) {
        await rejectSubscription(data.commerceOrder);
      }
    }

    // Flow espera un 200 para considerar entregada la confirmación.
    return new NextResponse("OK", { status: 200 });
  } catch (err) {
    console.error("Confirm error:", err);
    return new NextResponse("error", { status: 500 });
  }
}
