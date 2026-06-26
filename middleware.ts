import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

/**
 * Refresca la sesión de Supabase en cada request y protege /dashboard:
 * - sin sesión → redirige a /login
 * - sin Premium → redirige a /precios
 */
export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  // Si Supabase no está configurado, no hay auth: dejar pasar.
  if (!url || !anonKey) return response;

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;

  // Rutas que exigen sesión + Premium.
  if (path.startsWith("/dashboard")) {
    if (!user) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("next", path);
      return NextResponse.redirect(loginUrl);
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("is_premium, premium_until")
      .eq("id", user.id)
      .single();

    const isPremium = Boolean(
      profile?.is_premium &&
        (!profile.premium_until || new Date(profile.premium_until) > new Date())
    );

    if (!isPremium) {
      return NextResponse.redirect(new URL("/precios", request.url));
    }
  }

  // /cuenta exige al menos sesión.
  if (path.startsWith("/cuenta") && !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/cuenta/:path*"],
};
