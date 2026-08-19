"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "./Logo";
import { useUser } from "@/lib/useUser";

/** Header global: logo Prisma 137, navbar y botones de autenticación. */
export default function Header() {
  const [open, setOpen] = useState(false);
  const { user, isPremium, signOut } = useUser();
  const router = useRouter();

  // El Dashboard solo es visible para usuarios Premium.
  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/#pricing", label: "Planes" },
    ...(user ? [{ href: "/cuenta", label: "Mi cuenta" }] : []),
    ...(isPremium ? [{ href: "/dashboard", label: "Dashboard" }] : []),
  ];

  async function handleSignOut() {
    await signOut();
    setOpen(false);
    router.push("/");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Logo />

        {/* Navegación desktop */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-muted transition-colors hover:text-signal-600"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Auth desktop */}
        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <span className="max-w-[160px] truncate text-sm text-muted">
                {user.email}
              </span>
              <button
                onClick={handleSignOut}
                className="text-sm font-medium text-muted transition-colors hover:text-risk"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-muted transition-colors hover:text-signal-600"
              >
                Iniciar sesión
              </Link>
              <Link href="/login" className="btn-primary !px-5 !py-2 text-sm">
                Registrarse
              </Link>
            </>
          )}
        </div>

        {/* Toggle móvil */}
        <button
          className="rounded-lg p-2 text-muted hover:bg-cream-100 md:hidden"
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
        <div className="border-t border-line bg-white px-4 py-4 md:hidden">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block text-sm font-medium text-muted hover:text-signal-600"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="flex flex-col gap-3 pt-2">
              {user ? (
                <>
                  <span className="truncate text-sm text-muted">{user.email}</span>
                  <button onClick={handleSignOut} className="btn-secondary !py-2 text-sm">
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="btn-secondary !py-2 text-sm"
                    onClick={() => setOpen(false)}
                  >
                    Iniciar sesión
                  </Link>
                  <Link
                    href="/login"
                    className="btn-primary !py-2 text-sm"
                    onClick={() => setOpen(false)}
                  >
                    Registrarse
                  </Link>
                </>
              )}
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
