"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface Preferences {
  favoriteSport?: string;
  riskTolerance?: string;
}

/** Formulario de preferencias y opt-in de correo para usuarios gratuitos. */
export default function PreferencesForm({
  initialMarketing,
  initialPreferences,
}: {
  initialMarketing: boolean;
  initialPreferences: Preferences;
}) {
  const [marketing, setMarketing] = useState(initialMarketing);
  const [favoriteSport, setFavoriteSport] = useState(
    initialPreferences.favoriteSport ?? "futbol"
  );
  const [riskTolerance, setRiskTolerance] = useState(
    initialPreferences.riskTolerance ?? "medium"
  );
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    setError(null);
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Sesión no encontrada.");

      const { error } = await supabase
        .from("profiles")
        .update({
          marketing_opt_in: marketing,
          preferences: { favoriteSport, riskTolerance },
        })
        .eq("id", user.id);
      if (error) throw error;
      setSaved(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo guardar.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="glass mt-6 p-6">
      <h2 className="font-semibold text-gray-900">Preferencias</h2>
      <p className="mt-1 text-sm text-gray-600">
        Personaliza tus recomendaciones y comunicaciones.
      </p>

      <div className="mt-6 space-y-5">
        <div>
          <label htmlFor="sport" className="block text-sm font-medium text-gray-700">
            Deporte favorito
          </label>
          <select
            id="sport"
            value={favoriteSport}
            onChange={(e) => setFavoriteSport(e.target.value)}
            className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2.5 text-gray-900 outline-none focus:border-google-blue focus:ring-2 focus:ring-google-blue/20"
          >
            <option value="futbol">Fútbol</option>
            <option value="basket">Básquetbol</option>
            <option value="tenis">Tenis</option>
          </select>
        </div>

        <div>
          <label htmlFor="risk" className="block text-sm font-medium text-gray-700">
            Tolerancia al riesgo
          </label>
          <select
            id="risk"
            value={riskTolerance}
            onChange={(e) => setRiskTolerance(e.target.value)}
            className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2.5 text-gray-900 outline-none focus:border-google-blue focus:ring-2 focus:ring-google-blue/20"
          >
            <option value="low">Baja</option>
            <option value="medium">Media</option>
            <option value="high">Alta</option>
          </select>
        </div>

        <label className="flex items-start gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={marketing}
            onChange={(e) => setMarketing(e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-google-blue"
          />
          <span>Quiero recibir novedades y recomendaciones por correo.</span>
        </label>

        {error && <p className="text-sm text-google-red">{error}</p>}
        {saved && <p className="text-sm text-google-green">Preferencias guardadas.</p>}

        <button onClick={handleSave} disabled={saving} className="btn-primary disabled:opacity-60">
          {saving ? "Guardando…" : "Guardar preferencias"}
        </button>
      </div>
    </div>
  );
}
