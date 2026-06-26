import Link from "next/link";

/** Página 404 personalizada. */
export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-32 text-center">
      <span className="text-6xl font-extrabold text-gradient">404</span>
      <h1 className="mt-4 text-2xl font-bold text-gray-900">Página no encontrada</h1>
      <p className="mt-2 text-gray-600">
        La página que buscas no existe o fue movida.
      </p>
      <Link href="/" className="btn-primary mt-6">
        Volver al inicio
      </Link>
    </div>
  );
}
