# Registro de decisiones

Formato: cada decisión importante queda con fecha, contexto, decisión, razón y evidencia.
Las decisiones no se borran: si se revierten, se agrega una entrada nueva que la anula.

---

## D-001 — Matar PRISM (apuestas deportivas)

- **Fecha:** 2026-08-14
- **Estado:** DECIDIDA — matar
- **Contexto:** el repositorio contenía PRISM, un SaaS B2C de recomendaciones de apuestas
  deportivas a CLP 6.990/mes (≈ USD 7,7) + Google AdSense, con Next.js 14, Supabase,
  Flow.cl y autenticación por niveles ya construidos.

### Decisión
Se descarta PRISM como negocio. No se repara, no se relanza, no se pivota dentro del
rubro apuestas. Se conserva y reutiliza su infraestructura técnica.

### Razones, por orden de gravedad

**1. El motor de recomendaciones es falso. (Verificado directamente en el código.)**

En `lib/engine.ts:14-36`, tanto la probabilidad como la cuota se generan con:

```ts
function seeded(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}
const probability = Math.round(50 + r1 * 40);   // 50-90 %
const odds = Number((1.3 + r2 * 3).toFixed(2)); // 1.30 - 4.30
const expectedValue = Number(((p * odds - 1) * 100).toFixed(1));
```

La "probabilidad" y la "cuota" son ruido determinista derivado del **ID del partido**
(`Math.sin(id)`), sin relación con forma, estadísticas ni cuotas de mercado. El
`expectedValue` multiplica dos números inventados y el sistema **filtra y muestra sólo
los de EV positivo** a un usuario que paga.

Esto no es un placeholder de desarrollo: `POST /api/recommendations/sync` los persiste y
el dashboard Premium los muestra como "análisis estadístico" y "Expected Value". Cobrar
por esto es, como mínimo, publicidad engañosa ante SERNAC/Ley del Consumidor, y expone a
demanda si un usuario pierde dinero siguiendo la señal.

**Esta sola razón basta para no cobrar ni un peso por el producto en su forma actual.**

**2. Las apuestas online son ilegales por defecto en Chile, con jurisprudencia activa.**
La Tercera Sala de la Corte Suprema (rol 18.080-2025, 30-sep-2025) resolvió que los juegos
online están prohibidos salvo autorización legal expresa, y ordenó a los ISP bloquear
sitios de apuestas no autorizados. En agosto de 2026 se ordenó bloqueo permanente por DNS.
El proyecto que regularía el mercado (Boletín 14.838-03) sigue en trámite en el Senado con
~500 indicaciones pendientes: **no hay ley vigente que habilite el mercado.**

**3. No existe canal de adquisición pagada legal.** Las políticas de Google clasifican
explícitamente "tips, odds, handicapping" como contenido de gambling. Eso simultáneamente
(a) hace que el uso de AdSense descrito en el README viole las políticas de Google
Publisher, con riesgo de suspensión de cuenta y arrastre de cuentas vinculadas, y
(b) cierra Google Ads y Meta Ads, que exigen certificación de gambling con licencia local
vigente — imposible en un país sin ley de apuestas online.

**4. La aritmética no cierra.** A CLP 6.990/mes se necesitan **~1.310 suscriptores pagados
simultáneos** para USD 10.000 MRR. Con churn de B2C de suscripción (6,5%–15% mensual según
benchmark aplicado), la base pierde entre 85 y ~195 suscriptores al mes sólo para
mantenerse plana — sin canales pagados disponibles.

**5. Compite contra gratis.** Decenas de canales de Telegram de pronósticos gratuitos
operan en Chile/LatAm, y las propias casas de apuestas regalan estadísticas y cuotas como
gancho, porque monetizan el spread. No hay respuesta defendible a "¿por qué pagaría por
esto?".

### Agravantes
- La ludopatía en Chile pasó de 2,3% (2018) a 8,7% (2022); 26% de escolares/jóvenes apostó
  en el último año. La presión regulatoria y reputacional sobre el rubro va a **aumentar**.
- `football-data.org` restringe el uso comercial a planes pagos: el plan gratuito del
  `.env.example` no cubre monetizar un producto de pago.

### Lo que NO pudimos verificar
Si Flow.cl y Transbank prohíben explícitamente el rubro apuestas/pronósticos en sus
términos: el acceso directo a sus sitios está bloqueado por el proxy del entorno.
Hay evidencia indirecta (los bancos chilenos bloquean por defecto la categoría "gambling"
y las casas de apuestas operan vía intermediarios en vez de contrato directo con
Transbank), pero **no es verificación primaria**.

### Activos que se conservan
El problema fue 100% de mercado y legalidad, **no de ingeniería**. Se reutiliza:

| Activo | Archivos |
| --- | --- |
| Auth SSR + gating por rol | `middleware.ts`, `lib/supabase/server.ts`, `lib/supabase/client.ts`, `lib/useUser.ts` |
| Cobro recurrente en CLP (Flow.cl, HMAC-SHA256, webhook) | `lib/flow.ts`, `app/api/checkout/route.ts`, `app/api/checkout/confirm/route.ts`, `components/PremiumCheckout.tsx` |
| Modelo de suscripción + RLS | `lib/subscriptions.ts`, `supabase/migrations/0001_init.sql` |
| UI de dashboard | `components/StatCard.tsx`, `DashboardCharts.tsx`, tablas |

Se descarta sin reutilizar: `lib/engine.ts` completo, toda la narrativa de Expected
Value/bankroll, `lib/football.ts` y `AdSlot.tsx`.

> La integración Flow.cl end-to-end es el activo más valioso: es la pieza que más tarda en
> construirse para cualquier SaaS que cobre en CLP, y es directamente portable.

---

## D-002 — Descartar Licitaciones / Mercado Público

- **Fecha:** 2026-08-14
- **Estado:** DECIDIDA — descartar
- **Razón:** categoría comoditizada con ≥6 actores ya operando con IA (Vendify, AlertasMP,
  Licitados, LicitaLab, Fondos y Licitaciones, Licitaciones.cl) y ticket de
  **CLP 14.990–34.990/mes (USD 16–38)** → ~333 clientes para USD 10K MRR.
  Sin cuña, sin ticket, sin barrera de entrada.

---

## D-003 — Cotizar en UF, no en CLP

- **Fecha:** 2026-08-14
- **Estado:** DECIDIDA
- **Razón:** el software B2B chileno se cotiza mayoritariamente en UF (Bsale, Nubox,
  Laudus, Confirmer360). La UF se reajusta por IPC (+2,81% en lo que va de 2026), lo que
  produce un **aumento de precio automático sin negociación ni anuncio**. Es la norma del
  mercado, está socialmente aceptada, y protege el margen frente a la inflación chilena.
- **Consecuencia:** todo el pricing se define en UF; CLP y USD son sólo referencias.

---

## D-004 — No automatizar LinkedIn

- **Fecha:** 2026-08-14
- **Estado:** DECIDIDA
- **Razón:** los Términos de LinkedIn prohíben el scraping y la automatización de
  conexiones y mensajes, con enforcement real y documentado (Apollo.io y Seamless.ai
  fueron removidos de LinkedIn en marzo de 2025). El riesgo es la suspensión de la cuenta
  que sostiene el canal. Se usará LinkedIn de forma manual/orgánica para marca y contenido,
  nunca automatizado.
- **Nota:** además, no hay evidencia de que ninguna SaaS B2B chilena exitosa (Buk, Talana,
  Toku, Fintoc, SimpliRoute, Xepelin, Rankmi) haya escalado vía automatización de LinkedIn,
  cold email masivo ni ads genéricos. El patrón verificable es founder-led sales +
  referidos + canal contador.

---

## D-005 — Descartar cobranza B2B automatizada

- **Fecha:** 2026-08-14
- **Estado:** DECIDIDA — descartar
- **Razón:** el mercado ya resolvió el tramo automatizable y a precio muy inferior al
  supuesto. **Xepelin regala** la gestión de cobros y pagos con recordatorios multicanal
  (la subsidia con su negocio de factoring). **Bemmbo** cobra 3 UF/mes (~USD 115),
  **Chipax** 2–3 UF/mes, y **Duemint** lleva desde 2017 en el nicho. El tramo NO
  automatizable (mora dura: 56% del stock tiene +24 meses de atraso) lo capturan agencias
  tradicionales con success fee de 3–19% del monto recuperado — un negocio de negociación
  humana y vía judicial, no de software.
- **Lo que sí quedó verificado:** Ley 21.131 obliga a pagar en 30 días corridos con mora e
  interés automáticos; los pactos de plazo mayor deben inscribirse en un registro público
  del Ministerio de Economía en 5 días hábiles o se tienen por no escritos.
- **Matiz sin verificar:** si las restricciones de cobranza extrajudicial de la Ley 21.320
  (máx. 2 contactos/semana) aplican al B2B. Modifican la Ley 19.496 (del *consumidor*), por
  lo que probablemente no apliquen entre empresas — pero es **inferencia, no hecho
  verificado**. Relevante si alguna vez se retoma este espacio.

---

## D-006 — Descartar control documental de contratistas

- **Fecha:** 2026-08-14
- **Estado:** DECIDIDA — descartar
- **Razón:** el dolor es enorme y está brutalmente bien documentado — Ley 20.123 impone
  responsabilidad **solidaria** al mandante; **Codelco cuantificó en US$ 28,4 millones/año**
  el costo de sus tiempos de acreditación (27,5 días, meta de bajar a 10); Sernageomin
  paralizó El Teniente por resolución tras seis fallecidos; hay >1.000 vacantes activas de
  "control documental" en Computrabajo. **Pero la competencia es aplastante:** al menos
  10–12 actores chilenos específicos (Trazit, Vigenty, Zerty, ControlDoc, Prevsis,
  PreveSafe, FlowDocs, Validate, Verifty, Contratistas Online, Serres), más
  **Avetta/Achilles** (multinacional que ya opera exactamente el modelo "el contratista
  paga y comparte sus documentos con muchos mandantes"), más **SAP Ariba**, más **ACHS**
  regalando un módulo a sus empresas afiliadas, más las grandes mineras construyendo
  sistemas propios (Codelco). Varios competidores locales **ya usan IA** como
  diferenciador — el mismo ángulo que usaríamos nosotros.
- **Cuña que sí sobrevive (documentada, no elegida):** el lado **contratista PYME** y el
  problema de fragmentación N-a-N (un mismo set de documentos recargado en el portal
  propietario de cada mandante), hoy resuelto artesanalmente por servicios de outsourcing.
  Se descarta igualmente por incompatibilidad con las restricciones del fundador (ver
  D-007): vender a miles de PYMEs contratistas fragmentadas exige volumen comercial en
  horario hábil.

---

## D-007 — Reencuadre por restricciones reales del fundador

- **Fecha:** 2026-08-14
- **Estado:** DECIDIDA — cambia el criterio de selección de toda oportunidad futura

### Contexto nuevo (declarado por el fundador, no inferido)

| Restricción | Valor |
| --- | --- |
| Capital disponible | **CLP 0** |
| Empleo | Jornada completa, **lunes a viernes 08:00–17:30** |
| Disponibilidad | Tardes-noches y fines de semana, online |
| Red de contactos B2B | **Ninguna** |
| Experiencia real | **Retail, e-commerce y logística** |
| Conocidos con negocio | Dueños de PYME pequeñas (rubro belleza, p. ej. manicuristas) |
| Situación | Urgencia de ingresos (bono comprometido de CLP 320.000 que no será pagado) |

### Decisión

Se **invalida el criterio de selección usado hasta ahora** y se agregan dos filtros
eliminatorios que ninguna oportunidad puede saltarse:

**Filtro 1 — El comprador debe ser alcanzable fuera del horario de oficina.**
Un Gerente de Operaciones minero, un CFO o un Compliance Officer atienden entre 9 y 18 h.
Un fundador que trabaja 08:00–17:30 **no puede venderles**. Esto elimina de raíz toda
venta corporativa, sin importar cuán bueno sea el dolor. Sobreviven los
**dueños-operadores**: sellers de e-commerce, PYMEs de servicios, comercios — gente que
responde mensajes a las 21:00 porque el negocio es suyo.

**Filtro 2 — Capital cero significa que el producto no puede preceder al ingreso.**
No hay presupuesto para construir seis meses y después vender. La secuencia obligatoria es
**vender primero, construir después**: servicio productizado operado manualmente con IA por
debajo, que se convierte en software sólo cuando ya hay alguien pagando.

### Consecuencia sobre las oportunidades ya investigadas

Las seis analizadas (Ley 21.719, monitoreo SII, licitaciones, Ley Karin, cobranza,
contratistas) **fallan el Filtro 1**: todas venden a cargos corporativos en horario hábil.
Aunque alguna hubiera sobrevivido al análisis competitivo, habría muerto aquí.

El único terreno que pasa ambos filtros y coincide con la experiencia real del fundador es
**retail / e-commerce / logística, vendiendo a dueños-operadores**.

### Sobre el objetivo de USD 10.000 MRR

Se mantiene como objetivo, pero con horizonte honesto de **~22 meses** en el escenario
realista (ver `docs/business/MODELO_FINANCIERO.md`), no de 3 a 6 meses. El hito operativo
inmediato pasa a ser **un cliente pagando en 60 días**, que por sí solo reemplaza el bono
perdido. Sostener lo contrario sería fabricar una proyección — el mismo defecto por el que
se mató PRISM.
