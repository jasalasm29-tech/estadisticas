/** Estado de carga global mostrado durante la navegación. */
export default function Loading() {
  return (
    <div className="flex items-center justify-center py-32">
      <div
        className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-google-blue"
        role="status"
        aria-label="Cargando"
      />
    </div>
  );
}
