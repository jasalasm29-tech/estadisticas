# Modelo financiero — el camino matemático a USD 10.000 MRR

Base: USD/CLP = **912**, UF = **CLP 40.846** (verificados, 2026-08-14).
**USD 10.000 MRR = CLP 9.120.000/mes.**

## 1. Las combinaciones posibles

| Ticket | En UF | En CLP/mes | Clientes para USD 10K MRR |
| --- | --- | --- | --- |
| USD 134 | UF 3 | 122.538 | **75** |
| USD 224 | UF 5 | 204.230 | **45** |
| USD 403 | UF 9 | 367.614 | **25** |
| USD 537 | UF 12 | 490.152 | **19** |
| USD 806 | UF 18 | 735.228 | **12** |

Regla derivada de la investigación de pricing: por encima de **UF 3–5** el mercado chileno
deja de publicar precio y pasa a venta consultiva ("contáctanos"). Es decir, **UF 9 exige
una conversación con un humano**. Ese hecho es el que gobierna todo lo demás.

**Objetivo de diseño: 25 clientes × UF 9.** Pocos clientes de alto valor, como pide el
mandato. 75 clientes a UF 3 es peor: 3 veces más ventas, 3 veces más soporte, mismo dinero.

## 2. Estructura de costos (a 25 clientes)

| Concepto | USD/mes | Nota |
| --- | --- | --- |
| Vercel | 0–20 | Plan hobby alcanza al inicio |
| Supabase | 0–25 | Free tier hasta ~500MB y 50K MAU |
| Dominio | ~1 | ~USD 12/año amortizado |
| APIs de IA (LLM) | 30–80 | Depende del volumen de documentos procesados |
| Correo transaccional | 0–20 | Resend/Postmark |
| **Total infraestructura** | **~USD 60–150** | |

- **Margen bruto: ~98%.** Es la ventaja estructural de este tipo de negocio.
- **Comisión de Flow.cl:** NO VERIFICADA en esta investigación (el sitio está bloqueado por
  el proxy del entorno). Asumir un ~3–4% + IVA por transacción hasta confirmarlo. A 25
  clientes × UF 9 eso son ~USD 300–400/mes, y **es el mayor costo variable del negocio** —
  hay que verificarlo antes de fijar precio final.
- **Punto de equilibrio: el primer cliente.** Un cliente a UF 9 (USD 403) cubre toda la
  infraestructura con holgura. Esto es lo que hace viable el negocio con capital cero.

## 3. CAC, LTV y payback — y por qué aquí son atípicos

Con **capital de inversión cero**, no hay adquisición pagada. El CAC no se paga en dinero,
se paga en **horas del fundador**.

| Métrica | Valor | Cómo se calcula |
| --- | --- | --- |
| CAC monetario | **~USD 0–20** | Sólo costo de herramientas; sin ads |
| CAC real | **~6–12 horas** de trabajo por cliente cerrado | Prospección + mensajes + demo + onboarding |
| Churn mensual esperado | **3–5%** | B2B con integración operativa; asunción, no dato medido |
| Vida media del cliente | **20–33 meses** | 1 / churn |
| LTV a UF 9 | **USD 8.000–13.000** | ARPA × vida media |
| LTV/CAC | Irrelevante en dinero | El límite real es el tiempo, no el capital |
| Payback | **Inmediato** | No hay gasto de adquisición que recuperar |

> El cuello de botella de este negocio **no es el dinero: son las horas disponibles del
> fundador.** Todo el diseño debe optimizar horas por cliente cerrado, no CAC en dólares.

## 4. Escenarios — con la restricción real de tiempo

Restricción declarada por el fundador: **trabaja de lunes a viernes de 8:00 a 17:30**.
Disponibilidad real: tardes-noches y fines de semana. Capital: **CLP 0**.

Esto impone un límite duro: **no puede tomar reuniones en horario hábil**, que es cuando
un Gerente de Operaciones o un CFO chileno atiende. La consecuencia estratégica está en
`docs/decisions/DECISION_LOG.md` (D-007): el ICP debe ser gente **alcanzable fuera del
horario de oficina** — dueños-operadores, no ejecutivos corporativos.

Supuesto de capacidad: **~10 h/semana efectivas**, de las cuales ~6 comercializables.
A 6–12 horas por cliente cerrado, el techo teórico es **~2 clientes nuevos/mes** en régimen,
menos durante la rampa de aprendizaje.

### Escenario PESIMISTA
| Mes | Clientes | MRR (USD) |
| --- | --- | --- |
| 3 | 0 | 0 |
| 6 | 1 | 403 |
| 12 | 4 | 1.612 |
| 18 | 7 | 2.821 |
| 24 | 9 | 3.627 |

No se alcanza USD 10K. Se estabiliza en ~USD 3.600/mes (**CLP 3,3 millones/mes**).
Nota: aun este escenario "fracasado" **triplica el bono perdido de CLP 320.000**.

### Escenario REALISTA (principal)
| Mes | Clientes | MRR (USD) | Hito |
| --- | --- | --- | --- |
| 2 | 1 | 403 | **Primer cliente pagando** |
| 4 | 3 | 1.209 | **USD 1.000/mes** |
| 8 | 8 | 3.224 | **USD 3.000/mes** |
| 13 | 13 | 5.239 | **USD 5.000/mes** |
| 22 | 25 | 10.075 | **USD 10.000/mes** |

Supone: 1 cliente/mes los primeros 6 meses, 1,5/mes hasta el mes 14, 2/mes con referidos
después, y churn de 4% mensual ya descontado.

**Tiempo a USD 10.000 MRR: ~22 meses.** No 3, no 6.

### Escenario OPTIMISTA
| Mes | Clientes | MRR (USD) | Hito |
| --- | --- | --- | --- |
| 1 | 1 | 403 | Primer cliente |
| 3 | 4 | 1.612 | USD 1.000 |
| 6 | 9 | 3.627 | USD 3.000 |
| 9 | 14 | 5.642 | USD 5.000 |
| 15 | 25 | 10.075 | **USD 10.000** |

Requiere que el canal de referidos funcione temprano y que el fundador libere más horas
(por ejemplo, dejando el empleo una vez el MRR cubra su sueldo — lo que ocurre alrededor
del mes 8–10 en este escenario).

## 5. El hito que importa primero

No es USD 10.000. Es esto:

```
Bono perdido:            CLP 320.000
Un cliente a UF 8:       CLP 326.768
                         ─────────────
                         UN cliente lo reemplaza
```

**Meta 1 (60 días): un cliente pagando.** Todo lo demás es consecuencia.
Un negocio con 1 cliente real vale infinitamente más que un plan con 25 clientes imaginarios.

## 6. Criterios de muerte (definidos ANTES de empezar)

Se abandona la hipótesis si:

| Señal | Umbral | Plazo |
| --- | --- | --- |
| Nadie responde | <10% de tasa de respuesta en 40 conversaciones | 30 días |
| Interés sin dinero | 5+ conversaciones "interesantes" y 0 dispuestos a pagar | 45 días |
| Nadie paga | 3 pilotos gratis y 0 conversiones a pago | 60 días |
| Precio imposible | Nadie acepta más de UF 2 | 45 días |
| El dolor no existe | Los entrevistados no reconocen el problema como propio | 21 días |

Si se cumple cualquiera: **no se sigue construyendo código.** Se cambia ICP, oferta o
precio, o se mata la hipótesis. La regla del mandato es explícita y aquí queda operativa:
*no seguir porque ya se escribió código.*

## 7. Advertencia honesta sobre este modelo

Los escenarios de arriba son **aritmética condicionada a supuestos**, no predicciones.
Los supuestos frágiles, en orden de riesgo:

1. **Que exista un cliente dispuesto a pagar UF 9/mes.** No está validado. Ninguna de las
   seis oportunidades investigadas sobrevivió al análisis competitivo, así que la oferta
   concreta **todavía no existe**. Todo el modelo se apoya en encontrarla.
2. **Que 6–12 horas basten para cerrar un cliente.** Sin historial propio, es una
   estimación. Podría ser el doble.
3. **Churn de 4%.** Inventado por analogía, no medido.
4. **Que el fundador sostenga ~10 h/semana durante 22 meses** mientras trabaja jornada
   completa. Es el supuesto más frágil de todos, y no es técnico ni comercial: es humano.

> Presentar estos números como un plan garantizado sería exactamente el error que hizo que
> matáramos PRISM: vender una proyección fabricada como si fuera análisis.
> Son un mapa de lo que *tendría que ocurrir*, no de lo que va a ocurrir.
