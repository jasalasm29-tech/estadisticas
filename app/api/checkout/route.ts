import { NextRequest, NextResponse } from "next/server";
import { createFlowPayment, isFlowConfigured } from "@/lib/flow";

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

    const origin = req.nextUrl.origin;
    const commerceOrder = `PRISM-${Date.now()}`;

    const { url } = await createFlowPayment({
      commerceOrder,
      subject: "PRISM Premium - Suscripción mensual",
      amount: PREMIUM_PRICE_CLP,
      email: email ?? "cliente@prism.cl",
      urlConfirmation: `${origin}/api/checkout/confirm`,
      urlReturn: `${origin}/dashboard?payment=return`,
    });

    return NextResponse.json({ url });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json(
      { error: "No se pudo iniciar el pago. Inténtalo más tarde." },
      { status: 500 }
    );
  }
}
