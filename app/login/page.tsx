"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

type Mode = "signin" | "signup";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") ?? "/cuenta";

  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [marketing, setMarketing] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!isSupabaseConfigured) {
      setError("Autenticación no disponible: Supabase no está configurado.");
      return;
    }
    if (mode === "signup" && !terms) {
      setError("Debes aceptar los términos para registrarte.");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.push(next);
        router.refresh();
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { terms_accepted: terms, marketing_opt_in: marketing },
          },
        });
        if (error) throw error;
        setMessage(
          "Cuenta creada. Revisa tu correo para confirmarla y empezar gratis."
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocurrió un error.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-12">
      <div className="glass p-8">
        <h1 className="text-2xl font-bold text-gray-900">
          {mode === "signin" ? "Iniciar sesión" : "Crear cuenta gratis"}
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          {mode === "signin"
            ? "Accede a tu cuenta de PRISM."
            : "Regístrate gratis y guarda tus preferencias."}
        </p>

        <div className="mt-6 flex gap-2 rounded-xl bg-gray-100 p-1">
          {(["signin", "signup"] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => {
                setMode(m);
                setError(null);
                setMessage(null);
              }}
              className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                mode === m ? "bg-white text-google-blue shadow-sm" : "text-gray-500"
              }`}
            >
              {m === "signin" ? "Entrar" : "Registrarse"}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2.5 text-gray-900 outline-none transition-colors focus:border-google-blue focus:ring-2 focus:ring-google-blue/20"
              placeholder="tu@correo.cl"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2.5 text-gray-900 outline-none transition-colors focus:border-google-blue focus:ring-2 focus:ring-google-blue/20"
              placeholder="••••••••"
            />
          </div>

          {mode === "signup" && (
            <div className="space-y-2">
              <label className="flex items-start gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={terms}
                  onChange={(e) => setTerms(e.target.checked)}
                  className="mt-0.5 h-4 w-4 accent-google-blue"
                />
                <span>
                  Acepto los{" "}
                  <Link href="#" className="text-google-blue hover:underline">
                    términos y la política de privacidad
                  </Link>
                  .
                </span>
              </label>
              <label className="flex items-start gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                  className="mt-0.5 h-4 w-4 accent-google-blue"
                />
                <span>Quiero recibir novedades y recomendaciones por correo.</span>
              </label>
            </div>
          )}

          {error && <p className="text-sm text-google-red">{error}</p>}
          {message && <p className="text-sm text-google-green">{message}</p>}

          <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
            {loading ? "Procesando…" : mode === "signin" ? "Entrar" : "Crear cuenta"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
