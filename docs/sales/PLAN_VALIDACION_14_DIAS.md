# Plan de validación — 14 días, costo CLP 0

**Objetivo:** NO construir. Descubrir si existe un dolor por el que un seller chileno pague
UF 5–9/mes. Al día 14 hay una decisión: construir algo concreto, o cambiar de hipótesis.

**Regla que gobierna todo:** no se escribe una línea de código de producto hasta que
alguien diga *"sí, te pago por eso"*. El repositorio ya tiene auth, cobros y dashboard
listos — cuando haya que construir, se construye rápido. Antes, no.

## Por qué este terreno y no otro

Es el único que pasa los dos filtros eliminatorios de D-007 **y** coincide con la
experiencia real del fundador:

| Requisito | E-commerce / logística |
| --- | --- |
| ¿El comprador atiende después de las 18:00? | **Sí.** Un seller es dueño-operador; responde a las 22:00 porque el negocio es suyo |
| ¿Se puede vender sin capital? | **Sí.** Servicio productizado antes que software |
| ¿El fundador entiende el negocio? | **Sí.** Es su experiencia laboral real |
| ¿Se puede llegar a ellos sin red de contactos? | **Sí.** Comunidades públicas de sellers, no directorios corporativos |

## Las 3 hipótesis de dolor a testear

Las tres salieron de la investigación con evidencia, no de una lluvia de ideas.

### H1 — Sincronización de marketplaces
Evidencia: la app oficial de Falabella para Shopify tiene **2,5/5 estrellas**, con
comentarios como *"la sincronización casi nunca funciona"* y *"simplemente no funciona"*;
un vendedor abrió **4 tickets en 10 días sin respuesta y perdió la mitad de su catálogo**.
Ya existen integradores (Multivende, Middify, VAGO Cloud, Astroselling) — hay que descubrir
**qué siguen haciendo a mano pese a pagarlos**.

### H2 — Reclamos y trazabilidad de última milla
Evidencia: tasa de resolución de reclamos **Chilexpress 31,2%**, **Starken 67,7%**. El
seller queda atrapado entre el cliente final que reclama y un courier que no responde.
Enviame y Shipit resuelven el despacho, **no el post-entrega**.

### H3 — Control de despachos y pedidos en Excel
Evidencia: ofertas laborales de "administrativo de control logístico" que piden
explícitamente *"generar reportes en Excel y mantener registros"*, y un mercado activo de
plantillas Excel para *"calcular automáticamente los días de atraso en pedidos demorados"*.
La demanda de plantillas es el mejor proxy de que el proceso sigue siendo manual.

## La herramienta

El plan se opera desde `/validacion` en la app del repo:

```bash
npm install
npm run dev
# abrir http://localhost:3000/validacion
```

No requiere Supabase, ni cuenta, ni configuración, ni conexión: guarda todo en
`localStorage` del navegador. **Costo CLP 0, funciona de inmediato.**

Qué hace, y por qué cada cosa:

| Función | Para qué |
| --- | --- |
| Pipeline de prospectos | Que no se pierda ninguna de las 40 conversaciones |
| Mensaje autogenerado por canal | Elimina la fricción de redactar 40 veces; se personaliza y se copia |
| Guion de las 5 preguntas | Registrar **palabras textuales**, que después son el copy de la landing |
| Etiquetado de dolores | Contar menciones **espontáneas** para detectar el patrón |
| Ranking de dolores | Ver cuál cruza el umbral de 8 menciones |
| Suma de dinero declarado | El argumento de venta más fuerte, dicho por el cliente y no por ti |
| **Criterios de muerte automáticos** | La app avisa sola cuando toca matar la hipótesis, para que la decisión no dependa del ánimo del día |
| Respaldar / Restaurar | Exporta JSON para no perder el trabajo si se limpia el navegador |

> Úsala en local (`npm run dev`). No hace falta desplegarla, y no desplegarla es
> también la opción de costo cero.

**Nota de datos personales:** vas a guardar nombres y contactos de personas reales.
Están sólo en tu navegador y tú eres el responsable del tratamiento. Por eso todas las
plantillas incluyen una salida explícita ("si no quieres que te escriba, dímelo"): hoy
lo pide la Ley 19.628 y desde el **1 de diciembre de 2026** la Ley 21.719 endurece la
exigencia a consentimiento explícito. Respeta cada baja a la primera.

## Días 1–2 — Construir la lista (0 pesos)

Meta: **60 sellers chilenos** identificables y contactables.

Fuentes legales y públicas:
1. Comunidades de sellers: grupos de Facebook de vendedores de MercadoLibre Chile,
   Falabella Seller, Shopify Chile; subreddits chilenos de emprendimiento.
2. Tiendas Shopify/Jumpseller chilenas visibles públicamente (su web trae correo y a
   menudo WhatsApp).
3. Sellers activos en MercadoLibre Chile y Falabella Marketplace con catálogo grande
   (señal de volumen = señal de dolor).
4. Instagram de tiendas chilenas que venden y despachan.

Registrar en una planilla: nombre, tienda, canales donde vende, tamaño estimado de
catálogo, contacto, fecha de contacto, respuesta.

> **No comprar bases de datos. No hacer scraping de LinkedIn** (D-004). El régimen actual
> de la Ley 19.628 permite contacto comercial identificándose y ofreciendo vía de baja,
> pero eso **cambia el 1 de diciembre de 2026**, cuando la Ley 21.719 exige consentimiento
> explícito. Hay ventana, y hay que usarla con prolijidad.

## Días 3–10 — 40 conversaciones (no ventas)

**Esto no es outreach de venta. Es investigación.** No se menciona producto ni precio.

Mensaje base (personalizar cada uno — la personalización real es lo que hace que
respondan):

> Hola [nombre], vi que vendes en [canal] hace tiempo. Trabajo en logística y e-commerce y
> estoy investigando qué es lo que más tiempo les quita a los que venden en varios canales
> a la vez.
>
> ¿Te puedo hacer una sola pregunta? ¿Qué cosa haces todas las semanas a mano que sientes
> que debería estar automatizada?
>
> No te estoy vendiendo nada — estoy investigando. Si prefieres que no te escriba más,
> dímelo y no lo hago.

Las 5 preguntas de descubrimiento (si contestan, en llamada nocturna o por chat):

1. Cuéntame tu semana. ¿Qué haces todos los días que preferirías no hacer?
2. ¿Cuál fue la última vez que perdiste una venta o plata por un tema operacional?
   ¿Cuánto fue?
3. ¿Qué herramientas pagas hoy y cuánto? ¿Qué es lo que igual haces a mano pese a pagarlas?
4. Si pudieras contratar a alguien 4 horas a la semana sólo para una tarea, ¿cuál sería?
5. ¿Alguna vez buscaste una herramienta para eso y no la encontraste, o la encontraste y no
   te sirvió? ¿Por qué?

**La pregunta 2 es la más importante:** un dolor con monto en pesos es un dolor que se
puede cobrar. Un dolor sin monto es una molestia.

Anotar respuestas textuales, no resúmenes. Las palabras exactas del cliente son después el
copy de la landing.

## Días 11–12 — Encontrar el patrón

Buscar un dolor que cumpla **las cuatro** condiciones:

| Condición | Umbral |
| --- | --- |
| Frecuencia | Ocurre al menos semanalmente |
| Costo | Cuesta dinero o ≥4 horas al mes, y el cliente lo puede cuantificar |
| Repetición | Lo mencionan **≥8 de 40** entrevistados espontáneamente |
| Vacío | No está resuelto por lo que ya pagan |

Si ningún dolor cumple las cuatro: **no hay negocio en esta hipótesis.** Se vuelve al top 10
de `OPORTUNIDADES.md`. Eso no es fracaso: es haber gastado 12 días en vez de 6 meses.

## Días 13–14 — La venta antes del producto

A los que más dolor mostraron, oferta directa de **piloto pagado**:

> Esto que me contaste lo puedo resolver. Te lo dejo funcionando en 2 semanas.
> El primer mes son UF 3 y si no te sirve, no sigues.
> Después son UF 6 al mes. ¿Lo hacemos?

Por qué **cobrar desde el piloto** y no regalarlo:
- Un piloto gratis no valida nada: la gente acepta cualquier cosa gratis.
- UF 3 (~CLP 122.500) filtra curiosos de compradores.
- El precio de entrada bajo con salto a UF 6 ancla el precio real desde el principio.

**Se puede entregar el primer mes a mano.** Literalmente el fundador haciendo el trabajo
con planillas y scripts sueltos. Eso es correcto y deliberado: se automatiza lo que ya
está pagado, nunca antes.

## Criterios de decisión al día 14

| Resultado | Acción |
| --- | --- |
| ≥1 cliente pagando | **Construir.** Se activa el MVP sobre el repo existente |
| 0 pagos pero ≥3 pilotos comprometidos | Extender 14 días, ajustar oferta |
| Interés alto, 0 disposición a pagar | El dolor es molestia, no problema. Cambiar hipótesis |
| <10% de respuesta en 40 mensajes | El canal o el mensaje están mal. Cambiar canal antes que producto |
| Ningún dolor repetido ≥8 veces | Volver al top 10 de oportunidades |

## Qué NO hacer en estos 14 días

- No construir producto.
- No diseñar logo, marca ni landing bonita.
- No comprar dominio, herramientas ni publicidad (**el presupuesto es CLP 0 y debe seguir
  siéndolo**).
- No automatizar el outreach: 40 mensajes personalizados a mano convierten muchísimo más
  que 400 automatizados, y no arriesgan cuentas.
- No hablar de "IA" con el cliente. Al seller le importa el resultado, no la tecnología.

## Costo total del plan

**CLP 0.** El único insumo es tiempo del fundador: ~10 horas por semana durante 2 semanas,
en horario de tarde-noche, que es exactamente cuando el seller responde.
