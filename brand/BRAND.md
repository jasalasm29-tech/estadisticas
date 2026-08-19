# Manual de marca — Prisma 137

> Versión 1.0 · Documento vivo. Si algo aquí choca con una decisión de diseño
> puntual, gana este documento. Los valores exactos viven en
> [`tokens/prisma-137.css`](tokens/prisma-137.css) y
> [`tokens/prisma-137.tokens.json`](tokens/prisma-137.tokens.json).

---

## 1. Qué es Prisma 137

**Prisma 137 convierte ruido deportivo en señal estadística.**

Analizamos datos de partidos, calculamos probabilidad y valor esperado, y
entregamos una lectura clara de dónde el mercado se equivoca. No vendemos
certezas: vendemos método, transparencia y control de riesgo.

### El nombre

| Parte | Significado |
| --- | --- |
| **Prisma** | Un prisma no crea la luz: la **descompone**. Toma algo que parece uniforme —el partido, la cuota— y separa lo que hay dentro. Eso es exactamente lo que hace el producto con los datos. |
| **137** | El inverso de la **constante de estructura fina** (α ≈ 1/137), el número adimensional más famoso de la física: aparece en todas partes y nadie sabe de dónde sale. Es nuestro guiño a la disciplina de medir antes de opinar. |

**Frase fundacional:** *La luz entra entera. Sale ordenada.*

### Posicionamiento en una línea

> Prisma 137 es la plataforma de análisis estadístico deportivo para quien
> quiere decidir con datos, no con corazonadas.

### Lo que somos y lo que no

| Somos | No somos |
| --- | --- |
| Analistas de datos | Tipsters |
| Probabilidad y valor esperado | Promesas de ganancia |
| Gestión de bankroll y riesgo | "Sistemas infalibles" |
| Transparencia del método y del histórico | Cherry-picking de aciertos |

---

## 2. Sistema de identidad

Tenemos **cuatro piezas**, cada una con su trabajo. No son intercambiables.

### 2.1 La mascota — *Alfa*

El robot con telescopio. Es la cara amable de la marca: curiosa, precisa,
optimista. Se llama **Alfa** (por α, la constante).

- **Úsala en:** avatar de Instagram, ilustración editorial, onboarding,
  estados vacíos, error 404, stickers, merch.
- **No la uses en:** favicon, tamaños bajo 96 px, marcas de agua, ni como
  logo en documentos formales. Es demasiado detallada para escalar.
- Archivo original: el PNG que ya tienes. Guárdalo en `brand/logo/` como
  `prisma137-alfa.png` cuando lo subas al repo.

### 2.2 El isotipo — el prisma refractando

Marca escalable, derivada del emblema triangular del pecho de Alfa. Un haz
navy entra, tres rayos salen (azul claro, azul señal, bronce).

`logo/prisma137-isotipo.svg` · `-crema.svg` (fondo oscuro) · `-mono.svg` (`currentColor`)

Es **el logo de trabajo**: header del sitio, presentaciones, documentos, PDF.

### 2.3 El emblema — isotipo en círculo

`logo/prisma137-badge.svg`. El anillo retoma el círculo del logo original.
Para sellos, avatares pequeños de plataformas que recortan en círculo, y
badges dentro del producto.

### 2.4 El wordmark y los lockups

`logo/prisma137-wordmark.svg` · `-lockup-horizontal.svg` · `-lockup-vertical.svg`

**PRISMA** en navy, **137** en bronce. Siempre. El bronce en el número es lo
que hace memorable el nombre — no lo pintes todo del mismo color.

> ⚠️ Los SVG de texto usan `font-family` en vez de trazos vectorizados. Para
> imprenta o para entregar el logo a un tercero, exporta una versión con la
> tipografía convertida a curvas.

### 2.5 Reglas de uso (todas las piezas)

- **Área de respeto:** el alto de la letra "P" del wordmark en los cuatro lados.
- **Tamaño mínimo:** isotipo 24 px de alto · lockup horizontal 120 px de ancho.
- **Fondos permitidos:** blanco, Crema Lente, Navy 800/900/950, y foto con
  overlay navy al 60 % mínimo.
- **Prohibido:** rotarlo, deformarlo, añadirle sombra o contorno, recolorearlo
  fuera de la paleta, meterlo en una caja de color que no sea de la paleta, o
  usar la mascota y el isotipo juntos en la misma pieza compitiendo por jerarquía.

---

## 3. Color

### 3.1 Los cuatro colores núcleo

| Color | Hex | Rol |
| --- | --- | --- |
| **Prisma Navy** | `#152B4F` | Base. Fondos oscuros, texto, contornos. Es el color que "es" la marca. |
| **Azul Señal** | `#2E6FD8` | Acento primario. CTA, links, el dato que importa. |
| **Crema Lente** | `#F5F1E6` | Fondo cálido. Lo que impide que la marca se vea fría y corporativa. |
| **Bronce Telescopio** | `#C08A3E` | Premium y detalle. El número 137, el plan de pago, el subrayado. |

### 3.2 Proporción — la regla 60/25/10/5

```
60 %  Crema / blanco  →  fondo, respiro
25 %  Navy            →  texto, bloques, contraste
10 %  Azul Señal      →  acentos, CTA, links
 5 %  Bronce          →  un solo detalle por pieza
```

Si una pieza tiene dos acentos bronce compitiendo, uno sobra.

### 3.3 Semánticos (solo para datos)

`#159B6B` valor / EV+ · `#D24B3E` riesgo / pérdida · `#E0A32E` aviso

Nunca uses verde o rojo como color decorativo. En este producto significan algo.

### 3.4 Accesibilidad — verificado, no estimado

| Combinación | Ratio | Veredicto |
| --- | --- | --- |
| `signal-600` `#1F5BB8` sobre blanco | 6.47:1 | ✅ AA texto normal |
| `signal-500` `#2E6FD8` sobre blanco | 4.79:1 | ✅ AA texto normal (justo) |
| **Bronce `#C08A3E` sobre blanco** | **3.02:1** | ❌ **Solo ≥24 px o decorativo** |
| Bronce sobre Navy 800 | 4.67:1 | ✅ AA texto normal |
| Crema sobre Navy 800 | 12.5:1 | ✅ AAA |
| Navy 800 sobre Crema | 12.5:1 | ✅ AAA |

**Regla práctica:** para links y texto pequeño usa `signal-600`, no `signal-500`.
El bronce nunca lleva texto pequeño sobre fondo claro.

### 3.5 Gradiente de marca

```css
linear-gradient(120deg, #152B4F 0%, #2E6FD8 45%, #5A92E6 70%, #C08A3E 100%)
```

Es la refracción del prisma hecha color. Úsalo con moderación: portada, un
bloque hero, el borde superior de una tarjeta destacada. **Nunca** detrás de
texto de lectura.

---

## 4. Tipografía

| Uso | Fuente | Pesos |
| --- | --- | --- |
| Titulares, wordmark, números grandes | **Poppins** | 600, 700 |
| Cuerpo, UI, tablas | **Inter** | 400, 500, 600 |
| Código, cuotas en bruto | **JetBrains Mono** | 400 |

Ambas están en Google Fonts y en `next/font`. Poppins es geométrica y redonda:
rima con la forma de Alfa. Inter es el caballo de batalla para datos densos.

### Reglas

- **Números en tablas siempre con `font-variant-numeric: tabular-nums`.** Si
  las columnas de cuotas bailan, la tabla pierde credibilidad.
- Titulares con `letter-spacing: -0.02em`. Poppins respira mucho por defecto.
- Máximo **dos pesos por pieza**. Jerarquía por tamaño y color, no por peso.
- Ancho de línea de lectura: 60–75 caracteres.

### Escala

| Token | Tamaño | Uso |
| --- | --- | --- |
| Display | 48–64 px | Hero, portada de carrusel |
| H1 | 36 px | Título de página |
| H2 | 28 px | Sección |
| H3 | 20 px | Tarjeta |
| Body | 16 px | Texto |
| Small | 14 px | Metadatos |
| Micro | 12 px | Legal, disclaimers |

---

## 5. Forma, foto e iconografía

- **Radios:** 8 / 14 / 20 / 28 px. Alfa es redondo; la interfaz también.
- **Sombras azuladas, nunca negras.** `rgba(21, 43, 79, …)`.
- **Iconos:** trazo de 2 px, extremos redondeados, mismo grosor que el isotipo.
  Librerías compatibles: Lucide, Phosphor (weight `regular`).
- **Gráficos:** una serie = Azul Señal. Dos series = Azul Señal + Bronce. Tres
  o más = azul 600/500/400 + bronce. Nunca la paleta semántica para series.
- **Fotografía:** deportiva, real, con overlay navy 60–80 % para que el texto
  respire. Evita stock de "hombre de traje señalando gráficos".

---

## 6. Voz y tono

### Cómo suena Prisma 137

**Preciso, calmado, sin humo.** Hablamos como un analista que respeta tu
dinero y tu inteligencia. Nunca gritamos.

| Sí | No |
| --- | --- |
| "EV +4,2 % sobre 1 200 partidos." | "¡PICK GARANTIZADO! 🔥🔥" |
| "El modelo se equivocó esta semana. Esto es lo que aprendimos." | (silencio tras una mala racha) |
| "Esto no es asesoría financiera. Apuesta lo que puedas perder." | "Multiplica tu bankroll x10." |
| "Probabilidad estimada: 58 %." | "Es seguro." |

### Reglas de escritura

1. **Números siempre con contexto.** "62 % de acierto" no dice nada sin
   muestra ni ventana temporal.
2. **Nunca prometas resultados.** Ni implícitamente.
3. **Publica las pérdidas.** Es nuestra única ventaja real frente a los
   tipsters, y es la que construye confianza a doce meses.
4. **Español neutro con base chilena.** Tuteo. Sin jerga de foro.
5. **Juego responsable en toda pieza que mencione apuestas.** +18.

---

## 7. Aplicación en producto

Los tokens ya están cableados en `tailwind.config.ts` y `app/globals.css`.

**Escalas disponibles:** `navy-{950,900,800,700,600}` ·
`signal-{700,600,500,400,300,100}` · `bronze-{700,500,300,100}` ·
`cream-{50,100,200}` · `ink` · `muted` · `line` · `value` · `risk` · `warn`.

> ⚠️ El Azul Señal se llama **`signal-*`**, no `blue-*`: Tailwind ya trae su
> propia escala `blue` y sobrescribirla haría que un `blue-500` accidental
> pasara por color de marca.

**Utilidades propias:**

```
bg-prisma            gradiente completo (decorativo)
bg-prisma-signal     gradiente navy→señal (apto para texto)
.glass               superficie base
.text-gradient       texto en gradiente señal
.btn-primary         CTA en azul señal
.btn-secondary       borde
.btn-premium         navy + bronce (Premium)
.tabular             tabular-nums — obligatorio en cifras
shadow-soft / shadow-card / shadow-lift    sombras azuladas
```

Usa siempre las clases de la escala. Un hex suelto en un componente es un bug.

---

## 8. Checklist antes de publicar cualquier pieza

- [ ] ¿Usa solo colores de la paleta?
- [ ] ¿Respeta la proporción 60/25/10/5?
- [ ] ¿El texto pasa contraste AA sobre su fondo?
- [ ] ¿Poppins en títulos, Inter en cuerpo, `tabular-nums` en números?
- [ ] ¿Hay exactamente un acento bronce?
- [ ] ¿El logo tiene su área de respeto y su tamaño mínimo?
- [ ] Si menciona apuestas: ¿lleva disclaimer y +18?
- [ ] ¿Algún número sin su muestra o ventana temporal?
