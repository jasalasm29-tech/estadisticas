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
