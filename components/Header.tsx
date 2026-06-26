"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/#pricing", label: "Planes" },
];

/** Header global: logo PRISM, navbar y botones de autenticación. */
export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Logo />

        {/* Navegación desktop */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-gray-600 transition-colors hover:text-google-blue"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Auth desktop */}
        <div className="hidden items-center gap-3 md:flex">
          <button className="text-sm font-medium text-gray-600 transition-colors hover:text-google-blue">
            Iniciar sesión
          </button>
          <Link href="/dashboard" className="btn-primary !px-5 !py-2 text-sm">
            Registrarse
          </Link>
        </div>

        {/* Toggle móvil */}
        <button
          className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menú"
          aria-expanded={open}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </nav>

      {/* Menú móvil */}
      {open && (
        <div className="border-t border-gray-200 bg-white px-4 py-4 md:hidden">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block text-sm font-medium text-gray-600 hover:text-google-blue"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="flex flex-col gap-3 pt-2">
              <button className="btn-secondary !py-2 text-sm">Iniciar sesión</button>
              <Link
                href="/dashboard"
                className="btn-primary !py-2 text-sm"
                onClick={() => setOpen(false)}
              >
                Registrarse
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
