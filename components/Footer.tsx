import Link from "next/link";
import Logo from "./Logo";

const footerLinks = {
  Producto: [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/#features", label: "Características" },
    { href: "/#pricing", label: "Planes" },
  ],
  Empresa: [
    { href: "#", label: "Sobre nosotros" },
    { href: "#", label: "Contacto" },
    { href: "#", label: "Blog" },
  ],
  Legal: [
    { href: "#", label: "Términos" },
    { href: "#", label: "Privacidad" },
    { href: "#", label: "Juego responsable" },
  ],
};

/** Footer global: links, copyright y redes sociales. */
export default function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-muted">
              Convertimos ruido deportivo en señal estadística.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-navy-800">{title}</h3>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-signal-600"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 sm:flex-row">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} Prisma 137. Todos los derechos reservados.
          </p>
          <div className="flex gap-4">
            {["Twitter", "Instagram", "LinkedIn"].map((social) => (
              <a
                key={social}
                href="#"
                aria-label={social}
                className="text-muted/70 transition-colors hover:text-signal-600"
              >
                <span className="sr-only">{social}</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </a>
            ))}
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-muted">
          Juega con responsabilidad. +18. Prisma 137 no garantiza ganancias.
        </p>
      </div>
    </footer>
  );
}
