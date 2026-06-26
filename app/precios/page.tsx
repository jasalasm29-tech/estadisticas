import type { Metadata } from "next";
import Link from "next/link";
import PremiumCheckout from "@/components/PremiumCheckout";
import { getSessionUser } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Hazte Premium · PRISM",
  description: "Desbloquea el dashboard y las recomendaciones ilimitadas de PRISM.",
};

export const dynamic = "force-dynamic";

const premiumFeatures = [
  "Dashboard completo con métricas y gráficos",
  "Recomendaciones ilimitadas con Expected Value",
  "Partidos y resultados en vivo",
  "Histórico ilimitado + alertas",
  "Gestión de bankroll",
  "Soporte prioritario",
];

export default async function PreciosPage() {
  const { user, isPremium } = await getSessionUser();

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <span className="glass inline-block px-4 py-1.5 text-sm font-medium text-google-blue">
          Plan Premium
        </span>
        <h1 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">
          Desbloquea todo PRISM
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-gray-600">
          {isPremium
            ? "Ya eres Premium. ¡Gracias! Accede a tu dashboard."
            : "El dashboard y las recomendaciones en vivo son exclusivas de Premium."}
        </p>
      </div>

      <div className="glass mt-10 p-8" style={{ borderTop: "3px solid #4285F4" }}>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-extrabold text-gray-900">$6.990</span>
          <span className="text-gray-500">CLP / mes</span>
        </div>

        <ul className="mt-6 space-y-3">
          {premiumFeatures.map((f) => (
            <li key={f} className="flex items-center gap-3 text-sm text-gray-700">
              <span className="text-google-green">✓</span>
              {f}
            </li>
          ))}
        </ul>

        <div className="mt-8">
          {isPremium ? (
            <Link href="/dashboard" className="btn-primary w-full">
              Ir al Dashboard
            </Link>
          ) : user ? (
            <PremiumCheckout className="btn-primary w-full" />
          ) : (
            <Link href="/login?next=/precios" className="btn-primary w-full">
              Regístrate para continuar
            </Link>
          )}
        </div>

        {!user && !isPremium && (
          <p className="mt-4 text-center text-xs text-gray-500">
            ¿Aún no tienes cuenta? El registro es gratis.
          </p>
        )}
      </div>
    </div>
  );
}
