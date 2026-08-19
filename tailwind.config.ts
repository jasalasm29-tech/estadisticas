import type { Config } from "tailwindcss";

/**
 * Paleta Prisma 137. Fuente de verdad: brand/tokens/prisma-137.tokens.json
 * y el manual en brand/BRAND.md. No añadas hex sueltos en componentes:
 * si un color no está aquí, no es de la marca.
 */
const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Prisma Navy — color base de marca
        navy: {
          950: "#0A1730",
          900: "#0F2140",
          800: "#152B4F",
          700: "#1E3A66",
          600: "#2B4C80",
        },
        // Azul Señal — acento primario (CTA, links, dato destacado)
        signal: {
          700: "#17478F",
          600: "#1F5BB8", // usa este para texto pequeño sobre claro (AA 6.5:1)
          500: "#2E6FD8",
          400: "#5A92E6",
          300: "#8FB6F0",
          100: "#DCE8FB",
        },
        // Bronce Telescopio — premium y detalle. Sobre fondo claro solo ≥24px.
        bronze: {
          700: "#8E6229",
          500: "#C08A3E",
          300: "#DEB77E",
          100: "#F4E7D2",
        },
        // Crema Lente — fondo cálido
        cream: {
          50: "#FBF9F4",
          100: "#F5F1E6",
          200: "#E9E2D1",
        },
        // Neutros derivados del navy (nunca gris puro)
        ink: "#0F2140",
        muted: "#5B6B85",
        line: "#DDE3EC",
        // Semánticos: solo para datos, nunca decorativos
        value: "#159B6B",
        risk: "#D24B3E",
        warn: "#E0A32E",
      },
      fontFamily: {
        display: ["var(--font-poppins)", "Poppins", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        // Refracción del prisma: navy → señal → bronce
        prisma:
          "linear-gradient(120deg, #152B4F 0%, #2E6FD8 45%, #5A92E6 70%, #C08A3E 100%)",
        "prisma-signal":
          "linear-gradient(120deg, #1F5BB8 0%, #2E6FD8 50%, #5A92E6 100%)",
      },
      boxShadow: {
        // Sombras azuladas, nunca negras
        soft: "0 1px 2px rgba(15, 33, 64, 0.06)",
        card: "0 8px 24px -8px rgba(21, 43, 79, 0.18)",
        lift: "0 24px 48px -16px rgba(21, 43, 79, 0.28)",
      },
      borderRadius: {
        md: "14px",
        lg: "20px",
        xl: "28px",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.5s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
