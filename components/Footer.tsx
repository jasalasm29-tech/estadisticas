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
    <footer className="border-t border-white/10 bg-[#0B1120]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-gray-400">
              Transforma datos en decisiones inteligentes.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-white">{title}</h3>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 transition-colors hover:text-cyan"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} PRISM. Todos los derechos reservados.
          </p>
          <div className="flex gap-4">
            {["Twitter", "Instagram", "LinkedIn"].map((social) => (
              <a
                key={social}
                href="#"
                aria-label={social}
                className="text-gray-400 transition-colors hover:text-cyan"
              >
                <span className="sr-only">{social}</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </a>
            ))}
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-gray-600">
          Juega con responsabilidad. +18. PRISM no garantiza ganancias.
        </p>
      </div>
    </footer>
  );
}
