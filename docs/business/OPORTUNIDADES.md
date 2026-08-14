# Embudo de oportunidades — 20 → 10 → 5 → 3 → 1

Base de evidencia: `docs/research/00-hallazgos-verificados.md` + informes de los agentes
de dolor, pricing, distribución y red team.

Criterio de puntuación (0–100), ponderado hacia lo que realmente determina llegar a
USD 10.000 MRR:

| Factor | Peso | Por qué |
| --- | --- | --- |
| Capacidad y disposición de pago | 20% | Sin presupuesto no hay negocio |
| Facilidad de encontrar y alcanzar al comprador | 20% | El cuello de botella real es distribución, no producto |
| Baja competencia / cuña defendible | 15% | Entrar tarde a una categoría llena es la forma #1 de fracasar |
| Recurrencia genuina (¿por qué pagan el mes 7?) | 15% | MRR ≠ proyecto one-shot |
| Potencial de automatización (poco trabajo humano) | 10% | Restricción explícita del usuario |
| Velocidad a MVP vendible | 10% | Menos meses sin ingresos |
| Riesgo regulatorio / de plataforma | 10% | PRISM murió exactamente aquí |

## Las 20 oportunidades

| # | Oportunidad | Dolor (evidencia) | Puntaje | Corte |
| --- | --- | --- | --- | --- |
| 1 | Cumplimiento Ley 21.719 (RAT, ARSOP, brechas 72h) | Dura: deadline 1-dic-2026, PwC 13% preparadas | 72 | **TOP 3** |
| 2 | Monitoreo SII de facturas recibidas/rechazadas (ventana 8 días) | Dura: acuse tácito irrevocable, pérdida directa de caja | 74 | **TOP 3** |
| 3 | Monitoreo y calificación de licitaciones (Mercado Público) | API pública real, 118.000 proveedores, 91% mipymes | 68 | **TOP 3** |
| 4 | Ley Karin — gestión de investigaciones de denuncias | Dura: 66.596 solicitudes DT, 1.758 multas | 58 | Top 5 |
| 5 | Antifraude en cesión de facturas / factoring | Paso obligatorio en cada operación | 57 | Top 5 |
| 6 | Cobranza automatizada para PYME | Dura: 248.000 negocios morosos, 4,9M documentos | 54 | Top 10 |
| 7 | Automatización de reportes KPI desde ERP | Ofertas laborales pidiendo explícitamente "automatización" | 52 | Top 10 |
| 8 | Ley 40 horas — rediseño de turnos (servicio) | Dura: hitos 2026-2028, +5M trabajadores | 49 | Top 10 |
| 9 | Sincronización marketplace Falabella ↔ Shopify | Dura: app oficial 2,5/5, catálogos caídos | 47 | Top 10 |
| 10 | Control de despachos (Excel → TMS ligero) | Media: demanda de plantillas Excel como proxy | 44 | Top 10 |
| 11 | WhatsApp para PYME (segmento medio desatendido) | Media: brecha entre gratis y API cara | 42 | Corte |
| 12 | Gestión documental para construcción | +1.000 vacantes "control documental" | 40 | Corte |
| 13 | Gestión de reclamos de última milla | Chilexpress 31,2% de resolución | 38 | Corte |
| 14 | DPO externo automatizado (as a service) | Derivada de #1, ya ofrecido por PDP Suite/DPO Partners | 37 | Corte |
| 15 | Portal ARSOP embebido para e-commerce | PrivacyEngine ya lo hace exactamente | 35 | Corte |
| 16 | Conciliación bancaria automática | **Ya resuelto** por ERPs baratos y plantillas gratis | 30 | Corte |
| 17 | Alternativa "bien soportada" a ERPs contables | Dolor real pero requiere construir un ERP completo | 26 | Corte |
| 18 | Prospección B2B legal con datos SII (vender la máquina) | Se vuelve ilegal-ish tras 1-dic-2026 (opt-in) | 24 | Corte |
| 19 | Liquidaciones de sueldo PYME | **Ya resuelto**: Buk, Talana, Rankmi, mercado maduro | 18 | Corte |
| 20 | Boletas de honorarios / cheques | Bajo valor; cheques cayeron 88,7% en una década | 8 | **Descarte total** |

## Descartes explícitos y su razón

- **#19, #16 — mercados ya resueltos.** Buk/Talana/Rankmi en remuneraciones y los ERPs
  en conciliación. Entrar ahí es competir en producto contra empresas financiadas, sin
  cuña. Regla del usuario: nada de "SaaS genérico".
- **#20 — mercado en extinción.** El uso de cheques cayó de 6,6M (2016) a 744.000 (2026).
  No se construye sobre una base que desaparece.
- **#8 — barrera regulatoria EN CONTRA.** Los sistemas de control de asistencia requieren
  autorización de la Dirección del Trabajo (Res. Ex. N°38). La regulación protege a los
  actores existentes, no a nosotros.
- **#18 — se autodestruye con el deadline.** La Ley 21.719 exige consentimiento explícito
  desde el 1-dic-2026. Construir un negocio de prospección outbound justo cuando el marco
  legal se endurece es apostar contra la corriente.
- **#17 — alcance imposible.** "ERP mejor soportado" significa construir un ERP. Viola el
  principio 80/20 y el "first customer first".
- **#15, #14 — ocupados.** PrivacyEngine y PDP Suite/DPO Partners ya venden exactamente eso.

## Top 5 tras el segundo corte

1. **Monitoreo SII de facturas (ventana de 8 días)** — 74
2. **Cumplimiento Ley 21.719** — 72
3. **Monitoreo de licitaciones Mercado Público** — 68
4. **Ley Karin — investigaciones** — 58
5. **Antifraude en cesión de facturas** — 57

### Por qué caen #4 y #5

**#4 Ley Karin — problema de FRECUENCIA, no de dolor.** El dolor por caso es intenso y hay
multas reales (1.758). Pero una empresa de 40 personas puede pasar un año sin ninguna
denuncia. Un SaaS que solo aporta valor cuando ocurre un evento raro tiene una pregunta
sin respuesta: *¿por qué me cobras el mes en que no pasó nada?* Se convierte en seguro, no
en software, y vender seguros exige una licencia que no tenemos. Además, guiar una
investigación de acoso laboral implica responsabilidad legal directa sobre un proceso
sensible: un error del software daña a una persona real y expone a juicio. Descartado por
riesgo desproporcionado frente al retorno.

**#5 Antifraude en cesión — mercado demasiado concentrado.** Los compradores serían las
empresas de factoring, que en Chile son pocas, grandes, y ya tienen equipos de riesgo y
proveedores (Cesión DTE, Sovos, Laudus). Un TAM de decenas de clientes con ciclos de venta
enterprise de 6+ meses no es compatible con llegar a USD 10K MRR con un operador solo.
Se mantiene como *funcionalidad* futura dentro de #2, no como negocio propio.

## TOP 3 → a validación y Red Team

Las tres finalistas pasan a validación con investigación dirigida. La regla es que
**ninguna se elige por ser atractiva en el papel**: cada una tiene una pregunta que puede
matarla, y la respuesta a esa pregunta decide.

| # | Oportunidad | La pregunta que puede matarla |
| --- | --- | --- |
| 2 | Monitoreo SII de facturas | ¿Los ERPs ya lo incluyen gratis? ¿Se puede acceder al RCV de un cliente de forma legal y sin custodiar credenciales? |
| 1 | Cumplimiento Ley 21.719 | ¿Puede un entrante sin marca ni abogados ganar en una compra de riesgo legal, entrando 3,5 meses antes del deadline, contra 10+ actores? ¿Hay recurrencia después de diciembre? |
| 3 | Licitaciones Mercado Público | ¿Ya está resuelto por actores existentes? ¿El proveedor mipyme tiene capacidad de pago? |

### #3 Licitaciones — MUERTA (resuelta antes de gastar un agente)

Búsqueda directa: la categoría ya tiene al menos seis actores activos —
**Vendify, AlertasMP, Licitados, LicitaLab, Fondos y Licitaciones, Licitaciones.cl** —
varios de ellos ya con IA (lectura de bases, match automático, generación de propuesta,
alertas por WhatsApp en menos de 1 minuto).

El dato que la mata es el **precio**: Vendify **CLP 14.990–34.990/mes**, Licitados
**desde CLP 14.990/mes** → **USD 16–38/mes**.

> Para USD 10.000 MRR a USD 30/mes se necesitan **~333 clientes pagando simultáneamente**.

Categoría comoditizada, ticket bajo, seis competidores con IA ya desplegada y sin barrera
de entrada. Es exactamente el perfil que el mandato ordena descartar. **Eliminada.**

Fuentes: vendify.cl, alertasmp.cl, licitados.cl, licitalab.cl, chilecompra.cl/api.

### #2 Monitoreo SII de facturas — MUERTA (validada y descartada)

El dolor y el marco legal se **confirmaron con evidencia dura**:
- Plazo de **8 días corridos** (no hábiles), contados desde que el SII recibe el documento
  (Circular N°4 del SII, 11-ene-2017).
- Ley 19.983 (mérito ejecutivo) + Ley 20.956 (eliminó el acuse expreso). Al vencer el
  plazo: aceptación irrevocable, mérito ejecutivo y habilitación para cesión a factoring,
  perdiendo el deudor sus excepciones personales frente al cesionario.
- Fraude real y documentado: hackeo de claves SII en La Araucanía (feb-2026) con 17
  facturas falsas por ~CLP 200 millones cedidas a factoring; Antofagasta Minerals, CLP 373
  millones en facturas falsas; Walmart vs. 10 factorings por 209 facturas cedidas.

**Y aun así la oportunidad está muerta, por competencia.** La funcionalidad exacta ya se
vende con ese nombre:

| Actor | Producto |
| --- | --- |
| **Sovos** (multinacional de compliance fiscal, años en Chile) | Módulo **"Reclamaciones Factura"**: revisión y reclamo masivo con alertas y reglas preventivas dentro de la ventana de 8 días |
| EasyTax | **"DTE Flow"**: acepta y reclama automáticamente según reglas, con auditoría antifraude |
| Gosocket | Aceptación/rechazo/reclamo con registro directo en el SII |
| Nubox | Notificaciones automáticas de documentos pendientes — **incluido** en su plan contable |
| Defontana | Portal de proveedores con estado de aceptación/rechazo |

El foso técnico también es cero: el acceso al RCV ya está comoditizado por SimpleAPI,
ApiPyme, APISII y otros, y el SII ofrece el mecanismo de **representante electrónico**
(delegación sin compartir clave tributaria), usado hace años por proveedores establecidos.

Además, **no se encontró evidencia** de que exista un rol laboral dedicado a revisar
facturas dentro del plazo de 8 días — señal de que hoy se resuelve como tarea rutinaria
del área contable, no como dolor agudo que justifique una compra nueva.

> Competir de frente contra una multinacional de compliance fiscal, con la feature
> regalada dentro de los ERPs dominantes y sin foso técnico, no tiene tesis de entrada.
> **Eliminada.**

---

## Estado del embudo

| Oportunidad | Estado |
| --- | --- |
| #3 Licitaciones | ☠ Muerta — comoditizada, ticket USD 16–38 |
| #2 Monitoreo SII facturas | ☠ Muerta — Sovos/EasyTax/Gosocket + incluida en ERPs |
| #1 Ley 21.719 | ⏳ En Red Team |

**Lección transversal que emerge de matar dos finalistas:** en Chile, casi toda *categoría
de software* B2B evidente ya está servida. El patrón repetido es que los incumbentes venden
**una herramienta**, mientras el cliente sigue sin tener **a la persona que la use** — la
encuesta PwC lo muestra: 74% no tiene siquiera visibilidad de sus tratamientos de datos.
La oportunidad, si existe, no es una categoría nueva: es un **servicio productizado** que
entrega el trabajo hecho, con software y IA por debajo, en un espacio donde los tenedores
del presupuesto hoy sólo pueden elegir entre una herramienta que no saben operar y una
consultora que cobra precios de consultora.
