import Link from "next/link";
import PremiumCheckout from "@/components/PremiumCheckout";
import AdSlot from "@/components/AdSlot";

const features = [
  {
    title: "Análisis",
    desc: "Modelos estadísticos que procesan datos históricos y en vivo de cada partido.",
    icon: "📊",
    color: "#4285F4",
  },
  {
    title: "Recomendaciones",
    desc: "Sugerencias de apuestas con probabilidad y Expected Value calculados.",
    icon: "🎯",
    color: "#EA4335",
  },
  {
    title: "Bankroll",
    desc: "Gestión inteligente de tu capital para proteger tus inversiones.",
    icon: "💰",
    color: "#FBBC05",
  },
  {
    title: "ROI",
    desc: "Seguimiento de retorno sobre inversión semana a semana.",
    icon: "📈",
    color: "#34A853",
  },
  {
    title: "Alertas",
    desc: "Notificaciones en tiempo real cuando aparece una oportunidad de valor.",
    icon: "🔔",
    color: "#4285F4",
  },
  {
    title: "Escalable",
    desc: "Plataforma cloud lista para crecer contigo, sin límites.",
    icon: "🚀",
    color: "#34A853",
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
        <div className="pointer-events-none absolute inset-0 bg-prism-gradient opacity-10 blur-3xl" />
        <div className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8 lg:py-32">
          <span className="glass inline-block px-4 py-1.5 text-sm font-medium text-google-blue">
            Análisis deportivo basado en datos
          </span>
          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            <span className="text-gradient">PRISM</span> — Transforma datos en
            decisiones inteligentes
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Recomendaciones de apuestas respaldadas por estadística, control de
            bankroll y seguimiento de ROI. Todo en una plataforma moderna.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/dashboard" className="btn-primary">
              Acceder al Dashboard
            </Link>
            <Link href="#features" className="btn-secondary">
              Ver Análisis
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Todo lo que necesitas para decidir mejor
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
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
              <div className="text-3xl">{f.icon}</div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">{f.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{f.desc}</p>
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
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Planes simples</h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Empieza gratis y mejora cuando lo necesites.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {/* Plan Gratuito */}
          <div className="glass flex flex-col p-8">
            <h3 className="text-xl font-semibold text-gray-900">Plan Gratuito</h3>
            <p className="mt-2 text-sm text-gray-600">Para empezar a explorar.</p>
            <p className="mt-6">
              <span className="text-4xl font-extrabold text-gray-900">$0</span>
              <span className="text-gray-500"> CLP / mes</span>
            </p>
            <ul className="mt-6 flex-1 space-y-3">
              {freeFeatures.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-gray-700">
                  <span className="text-google-green">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/dashboard" className="btn-secondary mt-8 w-full">
              Comenzar gratis
            </Link>
          </div>

          {/* Plan Premium */}
          <div className="glass relative flex flex-col p-8 shadow-lg" style={{ borderTop: "3px solid #4285F4" }}>
            <span className="absolute -top-3 right-6 rounded-full bg-prism-gradient px-3 py-1 text-xs font-semibold text-white">
              Recomendado
            </span>
            <h3 className="text-xl font-semibold text-gradient">Premium</h3>
            <p className="mt-2 text-sm text-gray-600">Para apostadores serios.</p>
            <p className="mt-6">
              <span className="text-4xl font-extrabold text-gray-900">$6.990</span>
              <span className="text-gray-500"> CLP / mes</span>
            </p>
            <ul className="mt-6 flex-1 space-y-3">
              {premiumFeatures.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-gray-700">
                  <span className="text-google-blue">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <PremiumCheckout className="btn-primary w-full" />
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
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            ¿Listo para apostar con cabeza?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-600">
            Únete a PRISM y empieza a transformar datos en decisiones inteligentes
            hoy mismo.
          </p>
          <div className="mt-8">
            <Link href="/dashboard" className="btn-primary">
              Acceder al Dashboard
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
