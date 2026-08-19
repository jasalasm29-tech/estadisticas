"use client";

import { useEffect } from "react";

/** Error boundary global del App Router. */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // En producción aquí se reportaría a un servicio de observabilidad.
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-32 text-center">
      <h1 className="text-2xl font-bold text-navy-800">Algo salió mal</h1>
      <p className="mt-2 text-muted">
        Ocurrió un error inesperado. Inténtalo nuevamente.
      </p>
      <button onClick={reset} className="btn-primary mt-6">
        Reintentar
      </button>
    </div>
  );
}
