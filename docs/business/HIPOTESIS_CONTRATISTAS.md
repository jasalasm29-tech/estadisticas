# Hipótesis primaria — Contratista pyme

> Reabre parcialmente la decisión D-006. Ahí se descartó el mercado de control
> documental de contratistas por saturación competitiva. La objeción del fundador es
> correcta y se acepta: *"competidores vamos a tener siempre, hay que hacerlo mejor"*.
> Lo que se reabre **no es el mismo mercado**: es el lado opuesto de la mesa.

## La distinción que cambia todo

Los 10-12 competidores detectados (Trazit, Vigenty, Zerty, ControlDoc, Prevsis,
PreveSafe, FlowDocs, Validate, Verifty, Contratistas Online) más Avetta/Achilles y SAP
Ariba, **le venden al mandante**: la empresa grande que quiere protegerse legalmente.

Nadie le vende con foco de producto **al contratista chico**, que tiene el problema
inverso y no lo eligió.

| | Mandante (mercado servido) | Contratista pyme (hipótesis) |
| --- | --- | --- |
| Qué quiere | Protegerse de la responsabilidad solidaria | Que le dejen entrar a faena y le paguen |
| Su dolor | Verificar N contratistas | Subir los **mismos papeles** a N portales distintos |
| Quién le vende hoy | 12 competidores + ACHS gratis | Servicios artesanales de outsourcing |
| Ticket | Enterprise | Sin resolver |

Cita del informe de investigación:

> "Cada mandante tiene su propio portal, así que una PYME contratista que trabaja para
> varios mandantes debe re-cargar los mismos documentos en N sistemas distintos. Esto
> generó un mercado de servicios tercerizados donde la PYME contratista **paga a un
> tercero** para que administre sus cuentas en múltiples portales de mandantes."

**Que hoy se resuelva pagándole a una persona es exactamente la señal buscada.** Hay
presupuesto, hay recurrencia mensual, y la solución actual es manual. Es el patrón
"si una empresa paga a alguien para hacer una tarea repetitiva, se puede automatizar".

## Por qué el dolor es caro (evidencia)

- **Ley 20.123:** el mandante responde **solidariamente** por las obligaciones laborales
  y previsionales del contratista. Para degradarla a subsidiaria ejerce el *derecho a
  información* (exigir F30/F30-1) y el **derecho de retención de pago**.
  → Traducción para el contratista: **papeles incompletos = pago retenido.**
- **F30-1:** certificado por obra/faena de la Dirección del Trabajo, declarando que todos
  los trabajadores que ingresaron están al día. Se tramita por el portal "Mi DT". El ciclo
  es mensual porque las cotizaciones son mensuales.
- **Acreditación por trabajador:** contrato, exámenes ocupacionales, cursos de seguridad
  vigentes según cargo, EPP, inducción, liquidaciones y comprobantes de cotizaciones.
- **Codelco cuantificó su proceso de acreditación en 27,5 días**, con meta de bajarlo a 10
  y un ahorro proyectado de **US$ 28,4 millones al año**. Ese costo también lo sufre el
  contratista, del otro lado.
- **>1.000 vacantes activas** de "control documental" en Computrabajo, con cargos formales
  como "Encargado de Acreditación".

## Las 3 hipótesis a testear

- **C1 — Fragmentación.** Subir los mismos papeles a cada portal, y que se venzan sin
  aviso.
- **C2 — Consecuencia con monto.** Trabajador rechazado en portería, o pago retenido por
  documentación incompleta. **Aquí está el número en pesos.**
- **C3 — Ciclo mensual.** F30/F30-1 cada mes, control de exámenes y cursos vigentes.

## Lo que NO está verificado (leer antes de invertir tiempo)

Honestidad sobre el estado real de esta hipótesis:

1. **No se verificó cuánto paga hoy un contratista** por estos servicios artesanales.
   Sin ese dato, el ticket de UF 5-9 es una suposición.
2. **No se verificó si los portales de los mandantes permiten integración.** Si son
   cerrados y sin API, la automatización real puede ser imposible y el producto quedaría
   reducido a un gestor de vencimientos. Es el riesgo técnico #1.
3. **MinPass / Mine-Pass** aparecieron como "pasaporte digital de acreditación minera"
   pero no alcanzó el presupuesto de búsqueda para verificarlos. **Podrían ser exactamente
   este producto ya construido.** Verificar antes que cualquier otra cosa.
4. **Avetta ya opera este modelo** (el contratista paga y comparte documentos con muchos
   clientes) con fee de registro de USD 149. Es caro y enterprise, pero existe.

> Las 40 conversaciones responden 1 y 2. La búsqueda web de la próxima sesión responde
> 3 y 4. **Ninguna línea de código antes de eso.**

## Dónde encontrarlos

Sin capital y sin red, buscando empresas chicas que prestan servicios a grandes:

1. **Mercado Público** — tiene API pública documentada y 118.000 proveedores del Estado,
   91% mipymes. Filtrar por rubros de servicios industriales y construcción.
2. Gremios sectoriales: **CChC** (construcción), **Achilog/ALOG** (logística),
   proveedores mineros regionales (Antofagasta, Calama, Rancagua, Copiapó).
3. Grupos de prevencionistas de riesgos en Facebook y LinkedIn: son quienes sufren el
   dolor a diario.
4. Empresas de servicios industriales con web propia en zonas mineras.

**No comprar bases ni hacer scraping de LinkedIn** (D-004).

## Ventaja de este segmento sobre el corporativo

El contratista pyme es **dueño-operador**: contesta el teléfono a las 20:00. Un Gerente de
Prevención de Codelco, no. Eso es lo que hace vendible este segmento con jornada laboral
completa, y es la razón por la que se prefiere sobre el lado mandante — no sólo la
competencia.
