# PRISM 🔷

**Transforma datos en decisiones inteligentes.**

PRISM es una plataforma de análisis deportivo y recomendaciones de apuestas
inteligentes construida con Next.js 14. Combina modelos estadísticos, gestión
de bankroll y seguimiento de ROI en una interfaz moderna con dark mode y
glassmorphism.

## ✨ Características

- 📊 **Análisis** estadístico de partidos
- 🎯 **Recomendaciones** con probabilidad y Expected Value
- 💰 Gestión de **bankroll**
- 📈 Seguimiento de **ROI** semanal
- 🔔 **Alertas** de oportunidades de valor
- 🚀 Arquitectura **escalable** en la nube

## 🛠 Stack tecnológico

| Tecnología | Uso |
| --- | --- |
| [Next.js 14](https://nextjs.org/) (App Router) | Framework |
| React 18 + TypeScript | UI / tipado |
| [Tailwind CSS](https://tailwindcss.com/) | Estilos |
| [Supabase](https://supabase.com/) (PostgreSQL) | Base de datos |
| [Recharts](https://recharts.org/) | Gráficos |
| [Flow.cl](https://www.flow.cl/) | Pagos en CLP |
| [next-themes](https://github.com/pacocoursey/next-themes) | Dark mode |

## 🎨 Diseño

- **Colores Google:** Azul `#4285F4`, Rojo `#EA4335`, Amarillo `#FBBC05`, Verde `#34A853`
- **Tipografía:** Inter
- **Estilo:** Tema claro, glassmorphism suave, acentos multicolor estilo Google

## 📡 Datos reales

El dashboard intenta leer **datos en vivo** y cae a datos de ejemplo si no hay
configuración (lo verás indicado con el badge "Datos en vivo" / "Datos de ejemplo"):

- **Recomendaciones** — `lib/recommendations.ts` lee la tabla `recommendations`
  de Supabase. Ejecuta `supabase/seed.sql` para poblarla.
- **Partidos reales** — `lib/football.ts` + `GET /api/matches` traen los próximos
  partidos desde [Football-Data.org](https://www.football-data.org/) usando
  `FOOTBALL_DATA_API_KEY`.

Para activar datos reales en Vercel: configura `NEXT_PUBLIC_SUPABASE_URL`,
`NEXT_PUBLIC_SUPABASE_ANON_KEY` y `FOOTBALL_DATA_API_KEY` en las variables de
entorno del proyecto, aplica las migraciones y el seed.

## 📁 Estructura

```
app/
  layout.tsx          # Layout raíz (Header, Footer, ThemeProvider)
  page.tsx            # Home (hero, features, pricing, CTA)
  globals.css         # Estilos globales + utilidades
  error.tsx           # Error boundary
  loading.tsx         # Loading state
  not-found.tsx       # 404
  dashboard/
    page.tsx          # Dashboard (stats, charts, tabla)
components/
  Header.tsx          # Header con navbar + auth
  Footer.tsx          # Footer con links y redes
  Logo.tsx            # Logo PRISM
  ThemeProvider.tsx   # Proveedor de dark mode
  StatCard.tsx        # Card de métrica
  RecommendationCard.tsx     # Card de recomendación (móvil)
  RecommendationsTable.tsx   # Tabla con filtros
  DashboardCharts.tsx        # LineChart + PieChart
  PremiumCheckout.tsx        # Botón de suscripción (Flow.cl)
lib/
  supabase.ts         # Cliente Supabase
  types.ts            # Tipos TypeScript
  ui.ts               # Estilos de badges
  mockData.ts         # Datos de ejemplo
```

## 🚀 Setup

### 1. Requisitos

- Node.js 18.17+
- npm / pnpm / yarn

### 2. Instalación

```bash
npm install
```

### 3. Variables de entorno

Copia el archivo de ejemplo y completa los valores:

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
FOOTBALL_DATA_API_KEY=
NEXT_PUBLIC_FLOW_API_KEY=
FLOW_SECRET_KEY=
FLOW_COMMERCE_CODE=
NEXT_PUBLIC_GOOGLE_ADSENSE_ID=
```

> La app funciona con **datos mock** aunque no configures Supabase, ideal para
> desarrollo y demo.

### 4. Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

### 5. Producción

```bash
npm run build
npm start
```

## 💳 Pagos (Flow.cl)

La integración con Flow.cl ya está implementada:

- `lib/flow.ts` — firma HMAC-SHA256 de parámetros y `createFlowPayment`.
- `POST /api/checkout` — crea la orden Premium ($6.990 CLP) y devuelve la URL de pago.
- `POST /api/checkout/confirm` — webhook (`urlConfirmation`) que valida el estado
  real del pago vía `getStatus`.
- `PremiumCheckout` llama a `/api/checkout` y redirige al usuario a Flow.

Usa el sandbox (`sandbox.flow.cl`) en desarrollo y producción real en `NODE_ENV=production`.
Configura `NEXT_PUBLIC_FLOW_API_KEY` y `FLOW_SECRET_KEY`.

El webhook ya **persiste el estado Premium en Supabase**: al crear la orden se
registra como `pending` y, al confirmarse el pago, `activatePremium()` marca la
orden como `paid` y activa `is_premium` en el perfil por 30 días.

## 🗄️ Base de datos (Supabase)

El esquema está en `supabase/migrations/0001_init.sql` (tablas `profiles`,
`subscriptions`, `recommendations` con Row Level Security). Aplícalo con:

```bash
# vía Supabase CLI
supabase db push
# o pega el SQL en el SQL Editor del dashboard de Supabase
```

Requiere `SUPABASE_SERVICE_ROLE_KEY` (solo servidor) para que el webhook pueda
escribir omitiendo RLS. Si Supabase no está configurado, la app sigue
funcionando con datos mock.

## ⚠️ Juego responsable

Esta plataforma es informativa. Las apuestas implican riesgo y PRISM no
garantiza ganancias. Juega con responsabilidad. +18.

## 📄 Licencia

Uso privado. Todos los derechos reservados © PRISM.
