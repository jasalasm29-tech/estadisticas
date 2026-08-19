import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient, getSessionUser } from "@/lib/supabase/server";
import PreferencesForm from "@/components/PreferencesForm";

export const metadata: Metadata = {
  title: "Mi cuenta · Prisma 137",
  description: "Gestiona tu cuenta y preferencias en Prisma 137.",
};

export const dynamic = "force-dynamic";

export default async function CuentaPage() {
  const { user, isPremium } = await getSessionUser();
  if (!user) redirect("/login?next=/cuenta");

  const supabase = createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("marketing_opt_in, terms_accepted, preferences")
    .eq("id", user.id)
    .single();

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-navy-800">Mi cuenta</h1>
      <p className="mt-1 text-muted">{user.email}</p>

      {/* Estado del plan */}
      <div className="glass mt-8 flex items-center justify-between p-6">
        <div>
          <p className="text-sm text-muted">Tu plan</p>
          <p className="text-lg font-semibold text-navy-800">
            {isPremium ? "Premium" : "Gratuito"}
          </p>
        </div>
        {isPremium ? (
          <Link href="/dashboard" className="btn-primary !py-2 text-sm">
            Ir al Dashboard
          </Link>
        ) : (
          <Link href="/precios" className="btn-primary !py-2 text-sm">
            Hazte Premium
          </Link>
        )}
      </div>

      {/* Preferencias */}
      <PreferencesForm
        initialMarketing={profile?.marketing_opt_in ?? false}
        initialPreferences={profile?.preferences ?? {}}
      />
    </div>
  );
}
