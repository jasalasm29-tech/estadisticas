---
name: marca-prisma-137
description: Kit de marca de Prisma 137 (análisis estadístico deportivo). Paleta, tipografía, logo, voz, reglas de contenido y de redes. Usar SIEMPRE que se diseñe, escriba o planifique cualquier cosa para Prisma 137 — web, redes, presentaciones, correos o producto — o cuando se mencione Prisma 137, prisma137 o la app de estadísticas deportivas.
---

# Marca Prisma 137

Manual completo: `brand/BRAND.md`. Tokens: `brand/tokens/`. Logo: `brand/logo/`.
Redes: `brand/social/`. **Este archivo es el resumen operativo; ante duda, gana
`brand/BRAND.md`.**

## Qué es

Plataforma de análisis estadístico deportivo. Probabilidad, valor esperado y
gestión de riesgo sobre datos reales de fútbol.

- **Frase fundacional:** *La luz entra entera. Sale ordenada.*
- **Posicionamiento:** un prisma no crea la luz, la descompone. Nosotros
  descomponemos el ruido deportivo en señal.
- **137:** el inverso de la constante de estructura fina (α ≈ 1/137).
- **Mascota:** *Alfa*, el robot con telescopio.

Somos analistas de datos, **no tipsters**. Nunca prometemos resultados.

## Paleta — usa solo esto

| Nombre | Hex | Clase | Rol |
| --- | --- | --- | --- |
| Prisma Navy | `#152B4F` | `navy-800` | Base: fondos oscuros, texto, contornos |
| Azul Señal | `#2E6FD8` | `signal-500` | Acento primario: CTA, links, dato clave |
| Crema Lente | `#F5F1E6` | `cream-100` | Fondo cálido |
| Bronce Telescopio | `#C08A3E` | `bronze-500` | Premium y detalle |

Escalas completas en `tailwind.config.ts`: `navy-{950..600}`, `signal-{700..100}`,
`bronze-{700..100}`, `cream-{50,100,200}`, más `ink`, `muted`, `line`.

**Semánticos, solo para datos:** `value` `#159B6B` (EV+/ganancia) ·
`risk` `#D24B3E` (pérdida) · `warn` `#E0A32E` (aviso). Nunca decorativos.

**Proporción 60/25/10/5:** 60 % crema · 25 % navy · 10 % azul señal · 5 % bronce.
Un solo acento bronce por pieza.

**Contraste (verificado):** `signal-600` sobre blanco = 6.5:1 ✅ · `signal-500`
sobre blanco = 4.8:1 ✅ · **`bronze-500` sobre blanco = 3.0:1 ❌ solo ≥24 px o
decorativo** · `bronze-500` sobre `navy-800` = 4.7:1 ✅ · crema sobre navy = 12.5:1 ✅.

**Gradiente:** `bg-prisma` (navy→señal→bronce) solo decorativo.
`bg-prisma-signal` (navy→señal) para texto: el bronce no alcanza contraste.

## Tipografía

- **Poppins** 600/700 — titulares y wordmark. `font-display`, `letter-spacing: -0.02em`.
- **Inter** 400/500/600 — cuerpo, UI, tablas.
- Números en tablas: clase `.tabular` (`tabular-nums`). Innegociable.
- Máximo dos pesos por pieza. Jerarquía por tamaño y color, no por peso.

## Logo

- **Isotipo** (`brand/logo/prisma137-isotipo.svg`) — marca de trabajo. Mín. 24 px.
- **Emblema circular** — avatares recortados en círculo, sellos. Mín. 16 px.
- **Lockup** — isotipo + `PRISMA` navy + `137` **bronce**. El 137 siempre en bronce.
- **Favicon** — cuadrado navy con prisma crema.
- **Alfa (mascota)** — solo ≥96 px: avatar de IG, ilustración, estados vacíos.
  Nunca como favicon ni logo formal.
- Área de respeto: el alto de la "P". Nunca rotar, deformar, ni recolorear.

## Forma

Radios 8/14/20/28 px · sombras azuladas `rgba(21,43,79,…)`, nunca negras ·
iconos de línea 2 px con extremos redondeados (Lucide/Phosphor) · una serie de
gráfico = azul señal; dos = azul + bronce.

## Voz

**Preciso, calmado, sin humo.** Español neutro con base chilena, tuteo.

| Sí | No |
| --- | --- |
| "EV +4,2 % sobre 1 200 partidos." | "¡PICK GARANTIZADO! 🔥" |
| "Esta semana perdimos. Esto aprendimos." | Silencio tras una mala racha |
| "Probabilidad estimada: 58 %." | "Es seguro." |

Reglas: todo número lleva muestra y ventana temporal · nunca prometas
resultados · publica las pérdidas · toda pieza que mencione apuestas lleva
**+18 y juego responsable**.

## Redes

**Posicionamiento público: empresa de análisis de datos, no servicio de
apuestas.** Meta y LinkedIn restringen contenido de juego; además nos separa
del ruido de los tipsters. Nada de "picks", "tips" ni capturas de boletos.

- **Pilares:** Método 30 % · Señal 25 % · Transparencia 20 % · Riesgo 15 % · Producto 10 %.
- **Regla 5:1** — cinco piezas que dan por cada una que pide.
- **Feed:** cuadrícula A (navy) / B (crema) / C (gradiente, máx. 1 de cada 9).
- **Instagram:** máx. 5 hashtags, gancho en los primeros 125 caracteres.
- **LinkedIn:** 3–5 hashtags, gancho en los primeros 210, links en el primer comentario.
- Plantillas listas en `brand/social/plantillas/` · PNG en `brand/social/export/`.

## Antes de entregar cualquier pieza

- [ ] Solo colores de la paleta, proporción 60/25/10/5
- [ ] Contraste AA verificado (ojo con el bronce sobre claro)
- [ ] Poppins en títulos, Inter en cuerpo, `.tabular` en números
- [ ] Un solo acento bronce
- [ ] Logo con área de respeto y tamaño mínimo
- [ ] Si menciona apuestas: +18 y juego responsable
- [ ] Ningún número sin su muestra ni ventana temporal
