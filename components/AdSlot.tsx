"use client";

import { useEffect } from "react";

const ADSENSE_ID = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID ?? "";

interface AdSlotProps {
  /** ID del bloque de anuncio creado en AdSense (data-ad-slot). */
  slot?: string;
  /** Formato del anuncio. */
  format?: string;
  /** Etiqueta visible del espacio. */
  label?: string;
  className?: string;
}

/**
 * Espacio para anuncios de Google AdSense.
 * - Si `NEXT_PUBLIC_GOOGLE_ADSENSE_ID` está configurado, renderiza el bloque real.
 * - Si no, muestra un placeholder para que el espacio quede reservado en el layout.
 */
export default function AdSlot({
  slot = "",
  format = "auto",
  label = "Publicidad",
  className = "",
}: AdSlotProps) {
  const enabled = Boolean(ADSENSE_ID && slot);

  useEffect(() => {
    if (!enabled) return;
    try {
      // @ts-expect-error adsbygoogle es inyectado por el script de AdSense
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Silencioso: el bloque o el bloqueador puede no estar disponible.
    }
  }, [enabled]);

  return (
    <div
      className={`w-full ${className}`}
      role="complementary"
      aria-label="Espacio publicitario"
    >
      <p className="mb-1 text-center text-[10px] uppercase tracking-widest text-muted/70">
        {label}
      </p>

      {enabled ? (
        <ins
          className="adsbygoogle block"
          style={{ display: "block" }}
          data-ad-client={ADSENSE_ID}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      ) : (
        // Placeholder: reserva el espacio del anuncio cuando AdSense no está activo.
        <div className="flex min-h-[90px] items-center justify-center rounded-xl border border-dashed border-line bg-cream-50 text-sm text-muted/70">
          Espacio reservado para Google AdSense
        </div>
      )}
    </div>
  );
}
