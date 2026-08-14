# Hallazgos verificados — investigación primaria (Opus, orquestador)

> Regla de esta base de conocimiento: **cada afirmación lleva fuente o se marca como inferencia.**
> Nada de números inventados. Si no hay evidencia, se escribe "SIN EVIDENCIA".

Fecha de investigación: 2026-08-14

## Limitación metodológica (declarada)

El entorno de ejecución bloquea el fetch directo a dominios arbitrarios (egress proxy).
La investigación se hizo vía búsqueda web, que devuelve contenido resumido de las páginas.
Consecuencia: los precios y datos citados provienen de resúmenes de páginas reales, no de
lectura directa del HTML. **Antes de fijar pricing definitivo hay que reverificar
manualmente las páginas de precios de los competidores.** Está anotado como riesgo.

## Indicadores macro (base para todo modelo financiero)

| Indicador | Valor | Fecha | Fuente |
| --- | --- | --- | --- |
| Dólar observado | CLP 911,77 | 2026-08-10 | Banco Central vía Portal Innova |
| USD/CLP mercado | 913,83 | 2026-08-11 | Bloomberg Línea |
| UF | CLP 40.846,11 | 2026-08-10 | Indicadores económicos Chile |
| **1 UF ≈ USD** | **≈ 44,8** | 2026-08-14 | cálculo propio (40.846 / 912) |

Se usa **USD/CLP = 912** y **UF = CLP 40.846** en todos los modelos.

Nota estratégica: en Chile el software B2B se cotiza frecuentemente **en UF**, no en CLP.
La UF se reajusta por inflación (IPC) → es un **mecanismo de aumento de precio automático
y socialmente aceptado**. Cotizar en UF es una decisión de pricing, no un detalle contable.

## Hallazgo 1 — Ley 21.719 de Protección de Datos Personales: deadline duro

**Evidencia:**
- Publicada en el Diario Oficial el **13 de diciembre de 2024**.
- **Entra en vigencia el 1 de diciembre de 2026** → a la fecha de esta investigación
  faltan **~3,5 meses**.
- Aplica a **toda organización pública o privada que trate datos personales en Chile,
  sin importar su tamaño**.
- Crea la **Agencia de Protección de Datos Personales** con facultades de fiscalizar,
  sancionar y ordenar medidas correctivas.
- Multa máxima **20.000 UTM** (≈ CLP 1.400 millones); reincidencia hasta **4% de los
  ingresos anuales**.
- **Excepción crítica para el modelo de negocio:** durante el primer año
  (dic-2026 → dic-2027) las **PYMEs sólo reciben amonestaciones, no multas**.

**Obligaciones operacionales que crea (esto es lo que importa comercialmente):**
1. **RAT** — Registro de Actividades de Tratamiento (arts. 16 y 17). Documento vivo.
2. **DPO** — Delegado de Protección de Datos en organizaciones que traten datos
   "de manera significativa".
3. **Notificación de brechas** a la Agencia dentro de **72 horas**.
4. **Derechos ARSOP** (Acceso, Rectificación, Supresión, Oposición, Portabilidad):
   plazo de **30 días corridos** para responder por escrito, prorrogable una vez por
   30 días más. **Excepción: bloqueo temporal de datos → 2 días hábiles.**
5. EIPD / evaluaciones de impacto, bases de licitud, gestión de proveedores,
   consentimientos, transferencias internacionales.

Fuentes: Diario Oficial vía múltiples análisis legales (codigolegal.cl, asentic.cl,
araya.cl, preyproject.com, yourdevs.net, xmslatam.com), ciberlex.cl y leydedatos.com
para plazos ARSOP.

**Por qué importa:** es el patrón clásico de "negocio aburrido con deadline regulatorio":
presupuesto forzado + urgencia + recurrencia + comprador identificable. Es la misma ola
que GDPR creó en Europa en 2018.

## Hallazgo 2 — El mercado NO está preparado (demanda insatisfecha medida)

**Encuesta PwC Chile (2025), 87 gerentes y directivos:**
- Sólo **13%** se considera **muy preparada**.
- **74%** **no tiene visibilidad completa** de sus tratamientos de datos personales.
- **33%** se reconoce **poco preparada**.

En e-commerce: 68% usa personalización basada en datos pero sólo **22%** tiene políticas
de privacidad actualizadas para la nueva ley.

Se cita además que un proyecto serio de cumplimiento **toma entre 9 y 12 meses** — es
decir, a agosto 2026 **ya es tarde para hacerlo "bien"**, lo que empuja la demanda hacia
soluciones rápidas.

Fuentes: PwC Chile (Encuesta de Protección de Datos Personales), factorit.com,
privacyengine.cl.

**Lectura honesta:** el dato "74% sin visibilidad" es exactamente el dolor que resuelve
un RAT. La demanda es real y medida, no inferida.

## Hallazgo 3 — Pricing de la categoría: VALIDADO y alto

Precios publicados encontrados:

| Producto | Plan | Precio | USD/mes (UF=40.846, USD=912) |
| --- | --- | --- | --- |
| Confirmer360 | Esencial | 5 UF/mes | ≈ USD 224 |
| Confirmer360 | Profesional | 8 UF/mes | ≈ USD 358 |
| Confirmer360 | Empresarial | 18 UF/mes | ≈ USD 806 |
| PrivacyEngine | Entrada | desde 1 UF/mes (CLP 40.645) | ≈ USD 45 |
| PrivacyEngine | Overage | UF 0,08–0,12 por solicitud adicional | ≈ USD 3,6–5,4 |

**Conclusión de pricing:** el rango **USD 200–800/mes está publicado y vigente** en esta
categoría en Chile. No hay que adivinar el willingness to pay: está impreso.
Con ticket de USD 400/mes, **25 clientes = USD 10.000 MRR**.

Nota: PrivacyEngine usa **pricing por operación** (por solicitud ARSOP) con overage.
Es un modelo relevante: escala con el uso y elimina la discusión de precio inicial.

## Hallazgo 4 — La categoría YA tiene competencia (señal doble)

Actores chilenos detectados vendiendo cumplimiento Ley 21.719:
- **Confirmer360 / Confiden360** — software ISO + Ley 21.719 con IA, RAT, ARSOP, EIPD,
  brechas 72h, transferencias internacionales. Precios públicos en UF.
- **PDP Suite** — SaaS chileno: consentimientos, ARSO, RAT, riesgos, gestión documental,
  licencia perpetua o suscripción, + "DPO as a Service".
- **PrivacyEngine.cl** — enfocado en automatizar ARCO+ para **e-commerce**.
- **DPO Partners** — consultoría: madurez, RAT, EIPD, LIA, TIA, DPO externo, auditorías.
- **Legalfit, Ciberlex, Alayia Trust, FideliNorm, Blackdoor, TW Group, Prey** — contenido
  y/o servicios alrededor de la ley.

**Interpretación (importante, es ambigua):**
- Señal POSITIVA: si varios venden con precios altos y públicos, el mercado paga.
- Señal NEGATIVA: **llegamos tarde a una fiebre del oro de compliance.** Entrar con un
  producto genérico "otro software de RAT" a 3,5 meses del deadline, contra actores que
  ya tienen contenido posicionado y equipos comerciales, es una mala apuesta.

→ Esto NO se decide aquí. Se decide con el input del Red Team y de los agentes de dolor,
  competencia y distribución. Si no aparece una cuña defendible, esta oportunidad
  **no se elige** por más atractivo que sea el deadline.

## Hallazgo 5 — Contexto laboral: Ley 40 horas (dolor secundario, ya resuelto)

- Ley 21.561: el **26 de abril de 2026** entró en vigencia la baja de 44 → **42 horas**.
- Todo empleador debe llevar registro de asistencia con **sistema autorizado por la
  Dirección del Trabajo**; registros trazables y respaldos.
- DT realizó **+140.000 fiscalizaciones** en 2024. Multas de **3 a 60 UTM por trabajador
  afectado**.
- Impacta a **+5 millones de trabajadores** del sector privado.

Fuentes: CNN Chile, Dirección del Trabajo, Ministerio del Trabajo, Talana, Softland, Buk.

**Lectura honesta:** el dolor es real y grande, **pero la categoría está saturada y bien
servida** (Buk, Talana, Rankmi, Geovictoria, Rex+, Softland) y además requiere
**autorización de la Dirección del Trabajo** para el sistema de registro — barrera de
entrada regulatoria en nuestra contra, no a nuestro favor. **Descartar como producto
principal.** Sirve como contexto de que el mercado chileno sí reacciona a deadlines
regulatorios comprando software.

## Activo preexistente en el repositorio

El repo contiene **PRISM**: SaaS B2C de recomendaciones de apuestas deportivas,
Next.js 14 + Supabase + Flow.cl, a CLP 6.990/mes (≈ USD 7,7) + Google AdSense.

Observación aritmética inmediata (no requiere investigación):
para USD 10.000 MRR a CLP 6.990/mes se necesitan **≈ 1.300 suscriptores pagados
simultáneos** en Chile, en una categoría B2C de altísimo churn. Sometido a auditoría
del Red Team (regulatoria, de plataformas de pago, de AdSense y económica).
