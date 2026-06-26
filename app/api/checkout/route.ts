import { NextRequest, NextResponse } from "next/server";
import { createFlowPayment, isFlowConfigured } from "@/lib/flow";
import { isSupabaseAdminConfigured } from "@/lib/supabase";
import { createPendingSubscription } from "@/lib/subscriptions";

// Precio del plan Premium en CLP.
const PREMIUM_PRICE_CLP = 6990;

/**
 * POST /api/checkout
 * Crea una orden de pago Premium en Flow.cl y devuelve la URL de redirección.
 * Body opcional: { email?: string }
 */
export async function POST(req: NextRequest) {
  if (!isFlowConfigured) {
    return NextResponse.json(
      { error: "Pagos no disponibles: Flow.cl no está configurado." },
      { status: 503 }
    );
  }

  try {
    const { email } = await req.json().catch(() => ({ email: undefined }));
    const customerEmail = email ?? "cliente@prism.cl";

    const origin = req.nextUrl.origin;
    const commerceOrder = `PRISM-${Date.now()}`;

    const { url, flowOrder } = await createFlowPayment({
      commerceOrder,
      subject: "PRISM Premium - Suscripción mensual",
      amount: PREMIUM_PRICE_CLP,
      email: customerEmail,
      urlConfirmation: `${origin}/api/checkout/confirm`,
      urlReturn: `${origin}/dashboard?payment=return`,
    });

    // Registra la orden pendiente si Supabase está configurado.
    if (isSupabaseAdminConfigured) {
      try {
        await createPendingSubscription({
          commerceOrder,
          email: customerEmail,
          amount: PREMIUM_PRICE_CLP,
          flowOrder,
        });
      } catch (e) {
        // No bloquea el pago; la confirmación puede re-crear el registro.
        console.error("No se pudo registrar la orden pendiente:", e);
      }
    }

    return NextResponse.json({ url });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json(
      { error: "No se pudo iniciar el pago. Inténtalo más tarde." },
      { status: 500 }
    );
  }
}
