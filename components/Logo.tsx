import Link from "next/link";

/**
 * Logo Prisma 137: isotipo (haz refractado por el prisma) + wordmark.
 * Geometría idéntica a brand/logo/prisma137-lockup-horizontal.svg — si cambias
 * una, cambia la otra.
 */
export default function Logo({
  href = "/",
  variant = "light",
}: {
  href?: string;
  /** "light" = sobre fondo claro · "dark" = sobre navy */
  variant?: "light" | "dark";
}) {
  const dark = variant === "dark";
  const beam = dark ? "#F5F1E6" : "#152B4F";
  const prism = dark ? "#F5F1E6" : "#2E6FD8";
  const rayTop = dark ? "#8FB6F0" : "#5A92E6";
  const rayMid = dark ? "#5A92E6" : "#2E6FD8";

  return (
    <Link
      href={href}
      className="flex items-center gap-2.5"
      aria-label="Prisma 137 · inicio"
    >
      <svg
        viewBox="0 0 96 64"
        className="h-6 w-9 flex-none"
        fill="none"
        strokeWidth={5.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M0 32 H38" stroke={beam} />
        <path d="M48 9 L69 55 H27 Z" stroke={prism} />
        <path d="M60 33 L96 13" stroke={rayTop} />
        <path d="M60 33 L96 33" stroke={rayMid} />
        <path d="M60 33 L96 53" stroke="#C08A3E" />
      </svg>
      <span
        className={`font-display text-xl font-bold tracking-tight ${
          dark ? "text-cream-100" : "text-navy-800"
        }`}
      >
        PRISMA{" "}
        <span className={dark ? "text-bronze-300" : "text-bronze-500"}>137</span>
      </span>
    </Link>
  );
}
