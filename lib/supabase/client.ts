"use client";

import { createBrowserClient } from "@supabase/ssr";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const isSupabaseConfigured = Boolean(url && anonKey);

/**
 * Cliente Supabase para el navegador (gestiona la sesión vía cookies,
 * compatible con el lado servidor de Next.js).
 */
export function createClient() {
  return createBrowserClient(url, anonKey);
}
