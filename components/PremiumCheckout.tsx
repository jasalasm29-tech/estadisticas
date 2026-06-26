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
      // TODO: llamar al endpoint que crea la orden en Flow.cl y redirigir
      // a la URL de pago devuelta. Ejemplo:
      // const res = await fetch("/api/checkout", { method: "POST" });
      // const { url } = await res.json();
      // window.location.href = url;
      await new Promise((r) => setTimeout(r, 1200));
      alert("Integración de pago con Flow.cl pendiente de configurar.");
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
