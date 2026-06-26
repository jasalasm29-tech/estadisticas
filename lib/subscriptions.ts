import { getSupabaseAdmin } from "./supabase";

// Helpers de persistencia para órdenes y suscripciones Premium (server-only).

/** Registra una orden recién creada en estado `pending`. */
export async function createPendingSubscription(input: {
  commerceOrder: string;
  email: string;
  amount: number;
  flowOrder?: number;
}): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("subscriptions").insert({
    commerce_order: input.commerceOrder,
    email: input.email,
    amount: input.amount,
    flow_order: input.flowOrder ?? null,
    status: "pending",
  });
  if (error) throw new Error(`No se pudo crear la suscripción: ${error.message}`);
}

/**
 * Marca una orden como pagada y activa el estado Premium del perfil
 * asociado al email durante 30 días. Idempotente respecto al estado.
 */
export async function activatePremium(commerceOrder: string): Promise<void> {
  const supabase = getSupabaseAdmin();

  // Actualiza la orden y recupera el email asociado.
  const { data: sub, error: subErr } = await supabase
    .from("subscriptions")
    .update({ status: "paid", updated_at: new Date().toISOString() })
    .eq("commerce_order", commerceOrder)
    .select("email")
    .single();

  if (subErr) throw new Error(`No se pudo actualizar la orden: ${subErr.message}`);
  if (!sub?.email) return;

  const premiumUntil = new Date();
  premiumUntil.setDate(premiumUntil.getDate() + 30);

  const { error: profErr } = await supabase
    .from("profiles")
    .update({ is_premium: true, premium_until: premiumUntil.toISOString() })
    .eq("email", sub.email);

  if (profErr) throw new Error(`No se pudo activar Premium: ${profErr.message}`);
}

/** Marca una orden como rechazada/cancelada. */
export async function rejectSubscription(commerceOrder: string): Promise<void> {
  const supabase = getSupabaseAdmin();
  await supabase
    .from("subscriptions")
    .update({ status: "rejected", updated_at: new Date().toISOString() })
    .eq("commerce_order", commerceOrder);
}
