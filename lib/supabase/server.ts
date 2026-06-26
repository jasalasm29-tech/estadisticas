import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const isSupabaseConfigured = Boolean(url && anonKey);

/**
 * Cliente Supabase para Server Components / Route Handlers.
 * Lee y escribe la sesión desde las cookies del request.
 */
export function createClient() {
  const cookieStore = cookies();

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Llamado desde un Server Component: lo maneja el middleware.
        }
      },
    },
  });
}

/**
 * Devuelve el usuario actual y su perfil (con estado premium).
 * Si Supabase no está configurado, devuelve sesión nula.
 */
export async function getSessionUser() {
  if (!isSupabaseConfigured) return { user: null, isPremium: false };

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { user: null, isPremium: false };

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_premium, premium_until")
    .eq("id", user.id)
    .single();

  const isPremium = Boolean(
    profile?.is_premium &&
      (!profile.premium_until || new Date(profile.premium_until) > new Date())
  );

  return { user, isPremium };
}
