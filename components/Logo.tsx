import Link from "next/link";

/** Logo PRISM: "P" en gradiente cyan/magenta + wordmark. */
export default function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="flex items-center gap-2" aria-label="PRISM inicio">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-prism-gradient text-lg font-extrabold text-white shadow-lg shadow-cyan/30">
        P
      </span>
      <span className="text-xl font-bold tracking-tight text-gradient">PRISM</span>
    </Link>
  );
}
