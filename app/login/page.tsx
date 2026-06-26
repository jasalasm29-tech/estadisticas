"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

type Mode = "signin" | "signup";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!isSupabaseConfigured || !supabase) {
      setError("Autenticación no disponible: Supabase no está configurado.");
      return;
    }

    setLoading(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.push("/dashboard");
        router.refresh();
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMessage("Revisa tu correo para confirmar la cuenta.");
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
          {mode === "signin" ? "Iniciar sesión" : "Crear cuenta"}
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          {mode === "signin"
            ? "Accede a tu dashboard de PRISM."
            : "Empieza gratis en segundos."}
        </p>

        {/* Tabs */}
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

          {error && <p className="text-sm text-google-red">{error}</p>}
          {message && <p className="text-sm text-google-green">{message}</p>}

          <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
            {loading ? "Procesando…" : mode === "signin" ? "Entrar" : "Crear cuenta"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-gray-500">
          Al continuar aceptas los{" "}
          <Link href="#" className="text-google-blue hover:underline">
            términos
          </Link>{" "}
          de PRISM.
        </p>
      </div>
    </div>
  );
}
