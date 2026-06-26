import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Cliente Supabase para acceso a la base de datos PostgreSQL.
// Las variables se cargan desde el entorno (ver .env.example).
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

/**
 * Cliente Supabase compartido. Si las variables de entorno no están
 * configuradas (por ejemplo, en desarrollo con datos mock), el cliente
 * será `null` para evitar errores en tiempo de ejecución.
 */
export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

/** Indica si Supabase está configurado correctamente. */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

// Cliente admin (service role) para uso EXCLUSIVO en el servidor.
// Omite Row Level Security; nunca debe exponerse al cliente.
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

/**
 * Devuelve un cliente Supabase con privilegios de servicio para operaciones
 * de backend (p. ej. el webhook de confirmación de pago). Lanza si no está
 * configurado para evitar usarlo silenciosamente sin permisos.
 */
export function getSupabaseAdmin(): SupabaseClient {
  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "Supabase admin no está configurado (faltan URL o SUPABASE_SERVICE_ROLE_KEY)."
    );
  }
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/** Indica si el cliente admin de Supabase puede usarse. */
export const isSupabaseAdminConfigured = Boolean(supabaseUrl && serviceRoleKey);
