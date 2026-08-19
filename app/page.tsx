import Link from "next/link";
import PremiumCheckout from "@/components/PremiumCheckout";
import AdSlot from "@/components/AdSlot";

/** Iconos de línea, trazo 2px y extremos redondeados — ver brand/BRAND.md §5. */
const icons: Record<string, string> = {
  analisis: "M4 19V5M4 19h16M8 16V9M12 16v-4M16 16V6",
  recomendaciones: "M12 3v3M12 18v3M3 12h3M18 12h3M12 8a4 4 0 100 8 4 4 0 000-8z",
  bankroll: "M3 8h18v10a2 2 0 01-2 2H5a2 2 0 01-2-2V8zM3 8l3-4h12l3 4M12 12v4",
  roi: "M4 18l5-6 4 3 7-9M20 6h-4M20 6v4",
  alertas: "M18 9a6 6 0 10-12 0c0 5-2 6-2 6h16s-2-1-2-6M10.5 20a2 2 0 003 0",
  escalable: "M12 3l7 4v10l-7 4-7-4V7l7-4zM12 3v18M5 7l7 4 7-4",
};

const features = [
  {
    title: "Análisis",
    desc: "Modelos estadísticos que procesan datos históricos y en vivo de cada partido.",
    icon: "analisis",
    color: "#2E6FD8",
  },
  {
    title: "Recomendaciones",
    desc: "Sugerencias de apuestas con probabilidad y Expected Value calculados.",
    icon: "recomendaciones",
    color: "#1F5BB8",
  },
  {
    title: "Bankroll",
    desc: "Gestión inteligente de tu capital para proteger tus inversiones.",
    icon: "bankroll",
    color: "#C08A3E",
  },
  {
    title: "ROI",
    desc: "Seguimiento de retorno sobre inversión semana a semana.",
    icon: "roi",
    color: "#5A92E6",
  },
  {
    title: "Alertas",
    desc: "Notificaciones en tiempo real cuando aparece una oportunidad de valor.",
    icon: "alertas",
    color: "#17478F",
  },
  {
    title: "Escalable",
    desc: "Plataforma cloud lista para crecer contigo, sin límites.",
    icon: "escalable",
    color: "#2B4C80",
  },
];

const freeFeatures = [
  "3 recomendaciones diarias",
  "Dashboard básico",
  "Histórico de 7 días",
  "Soporte por comunidad",
];

const premiumFeatures = [
  "Recomendaciones ilimitadas",
  "Análisis avanzado y EV completo",
  "Histórico ilimitado + alertas",
  "Gestión de bankroll",
  "Soporte prioritario",
];

export default function HomePage() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-prisma opacity-10 blur-3xl" />
        <div className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8 lg:py-32">
          <span className="glass inline-block px-4 py-1.5 text-sm font-medium text-signal-600">
            Análisis estadístico deportivo
          </span>
          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-extrabold tracking-tight text-navy-800 sm:text-5xl lg:text-6xl">
            Convertimos ruido deportivo en{" "}
            <span className="text-gradient">señal estadística</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
            Un prisma no crea la luz: la descompone. Probabilidad, valor esperado
            y gestión de riesgo sobre datos reales — con el método y el histórico
            completo a la vista.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/login" className="btn-primary">
              Registrarse gratis
            </Link>
            <Link href="#features" className="btn-secondary">
              Ver características
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-navy-800 sm:text-4xl">
            Todo lo que necesitas para decidir mejor
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted">
            Herramientas profesionales al alcance de cualquier apostador.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="glass p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              style={{ borderTop: `3px solid ${f.color}` }}
            >
              <svg
                viewBox="0 0 24 24"
                className="h-8 w-8"
                fill="none"
                stroke={f.color}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d={icons[f.icon]} />
              </svg>
              <h3 className="mt-4 text-lg font-semibold text-navy-800">{f.title}</h3>
              <p className="mt-2 text-sm text-muted">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Anuncio (banner) */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME} />
      </div>

      {/* PRICING */}
      <section id="pricing" className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-navy-800 sm:text-4xl">Planes simples</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted">
            Empieza gratis y mejora cuando lo necesites.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {/* Plan Gratuito */}
          <div className="glass flex flex-col p-8">
            <h3 className="text-xl font-semibold text-navy-800">Plan Gratuito</h3>
            <p className="mt-2 text-sm text-muted">Para empezar a explorar.</p>
            <p className="mt-6">
              <span className="text-4xl font-extrabold text-navy-800">$0</span>
              <span className="text-muted"> CLP / mes</span>
            </p>
            <ul className="mt-6 flex-1 space-y-3">
              {freeFeatures.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-navy-700">
                  <span className="text-value">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/login" className="btn-secondary mt-8 w-full">
              Comenzar gratis
            </Link>
          </div>

          {/* Plan Premium */}
          <div className="glass relative flex flex-col p-8 shadow-lg" style={{ borderTop: "3px solid #C08A3E" }}>
            <span className="absolute -top-3 right-6 rounded-full bg-navy-800 px-3 py-1 text-xs font-semibold text-bronze-300">
              Recomendado
            </span>
            <h3 className="text-xl font-semibold text-bronze-700">Premium</h3>
            <p className="mt-2 text-sm text-muted">Para apostadores serios.</p>
            <p className="mt-6">
              <span className="text-4xl font-extrabold text-navy-800">$6.990</span>
              <span className="text-muted"> CLP / mes</span>
            </p>
            <ul className="mt-6 flex-1 space-y-3">
              {premiumFeatures.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-navy-700">
                  <span className="text-signal-600">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <PremiumCheckout className="btn-premium w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Anuncio (banner inferior) */}
      <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_FOOTER} label="Publicidad" />
      </div>

      {/* CTA final */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="glass overflow-hidden p-10 text-center sm:p-16">
          <h2 className="text-3xl font-bold text-navy-800 sm:text-4xl">
            ¿Listo para apostar con cabeza?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Únete a Prisma 137 y empieza a transformar datos en decisiones inteligentes
            hoy mismo.
          </p>
          <div className="mt-8">
            <Link href="/login" className="btn-primary">
              Registrarse gratis
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
