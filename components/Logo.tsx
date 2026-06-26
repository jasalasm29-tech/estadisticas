import Link from "next/link";

/** Logo PRISM: "P" en gradiente multicolor + wordmark con letras estilo Google. */
export default function Logo({ href = "/" }: { href?: string }) {
  // Colores Google aplicados letra a letra al wordmark.
  const letters = [
    { c: "P", color: "#4285F4" },
    { c: "R", color: "#EA4335" },
    { c: "I", color: "#FBBC05" },
    { c: "S", color: "#34A853" },
    { c: "M", color: "#4285F4" },
  ];

  return (
    <Link href={href} className="flex items-center gap-2" aria-label="PRISM inicio">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-prism-gradient text-lg font-extrabold text-white shadow-lg shadow-google-blue/30">
        P
      </span>
      <span className="text-xl font-bold tracking-tight">
        {letters.map((l, i) => (
          <span key={i} style={{ color: l.color }}>
            {l.c}
          </span>
        ))}
      </span>
    </Link>
  );
}
