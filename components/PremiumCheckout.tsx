"use client";

import { useState } from "react";

/**
 * Botón de suscripción Premium. En producción inicia el flujo de pago
 * de Flow.cl (CLP). Aquí simula el estado de carga / éxito.
 */
export default function PremiumCheckout({
  label = "Suscribirme a Premium",
  className = "btn-primary",
}: {
  label?: string;
  className?: string;
}) {
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    setLoading(true);
    try {
      // Crea la orden en Flow.cl y redirige a la URL de pago devuelta.
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });

      if (!res.ok) {
        const { error } = await res.json().catch(() => ({ error: "" }));
        alert(error || "No se pudo iniciar el pago. Inténtalo más tarde.");
        return;
      }

      const { url } = await res.json();
      if (url) {
        window.location.href = url;
      }
    } catch {
      alert("Error de red al iniciar el pago.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className={`${className} disabled:cursor-not-allowed disabled:opacity-60`}
    >
      {loading ? "Procesando…" : label}
    </button>
  );
}
