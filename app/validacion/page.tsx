"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  CLP,
  DOLORES,
  ESTADOS,
  Estado,
  META_CONVERSACIONES,
  META_PROSPECTOS,
  PLANTILLAS,
  PREGUNTAS,
  Prospecto,
  SEGMENTOS,
  Segmento,
  UMBRAL_DOLOR,
  calcularMetricas,
  cargar,
  entrevistaVacia,
  guardar,
  prospectoVacio,
  renderPlantilla,
} from "@/lib/validacion";

type Tab = "prospectos" | "patron" | "guia";

export default function ValidacionPage() {
  const [prospectos, setProspectos] = useState<Prospecto[]>([]);
  const [seleccionado, setSeleccionado] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("prospectos");
  const [listo, setListo] = useState(false);

  useEffect(() => {
    setProspectos(cargar());
    setListo(true);
  }, []);

  useEffect(() => {
    if (listo) guardar(prospectos);
  }, [prospectos, listo]);

  const metricas = useMemo(() => calcularMetricas(prospectos), [prospectos]);
  const actual = prospectos.find((p) => p.id === seleccionado) ?? null;

  function actualizar(id: string, cambios: Partial<Prospecto>) {
    setProspectos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...cambios } : p))
    );
  }

  function agregar(segmento: Segmento) {
    const nuevo = prospectoVacio(segmento);
    setProspectos((prev) => [nuevo, ...prev]);
    setSeleccionado(nuevo.id);
    setTab("prospectos");
  }

  function eliminar(id: string) {
    setProspectos((prev) => prev.filter((p) => p.id !== id));
    if (seleccionado === id) setSeleccionado(null);
  }

  if (!listo) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-16">
        <p className="text-gray-500">Cargando…</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">
          Validación <span className="text-gradient">14 días</span>
        </h1>
        <p className="mt-2 max-w-2xl text-gray-600">
          El objetivo de esta pantalla no es construir producto. Es descubrir si
          existe un dolor por el que alguien pague. Al día 14 hay una decisión.
        </p>
      </header>

      <MetricasStrip metricas={metricas} />

      {metricas.alertas.length > 0 && (
        <section className="mb-8 space-y-3">
          {metricas.alertas.map((a, i) => (
            <div
              key={i}
              className="rounded-xl border border-google-red/30 bg-red-50 p-4 text-sm text-red-900"
            >
              <strong className="font-semibold">Criterio de muerte activado. </strong>
              {a}
            </div>
          ))}
        </section>
      )}

      <nav className="mb-6 flex flex-wrap gap-2">
        {(
          [
            ["prospectos", "Prospectos"],
            ["patron", "Patrón de dolores"],
            ["guia", "Guion y mensajes"],
          ] as [Tab, string][]
        ).map(([id, label]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${
              tab === id
                ? "bg-google-blue text-white"
                : "border border-gray-300 bg-white text-gray-700 hover:border-google-blue hover:text-google-blue"
            }`}
          >
            {label}
          </button>
        ))}
        <div className="ml-auto flex gap-2">
          <ExportarImportar prospectos={prospectos} onImportar={setProspectos} />
          {SEGMENTOS.map((s) => (
            <button
              key={s.id}
              onClick={() => agregar(s.id)}
              className="btn-primary px-4 py-2 text-sm"
              title={s.descripcion}
            >
              + {s.label}
            </button>
          ))}
        </div>
      </nav>

      {tab === "prospectos" && (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
          <ListaProspectos
            prospectos={prospectos}
            seleccionado={seleccionado}
            onSeleccionar={setSeleccionado}
          />
          {actual ? (
            <DetalleProspecto
              key={actual.id}
              prospecto={actual}
              onCambio={(c) => actualizar(actual.id, c)}
              onEliminar={() => eliminar(actual.id)}
            />
          ) : (
            <div className="glass flex min-h-[300px] items-center justify-center p-8 text-center text-gray-500">
              <p>
                Selecciona un prospecto de la lista, o agrega uno nuevo para
                empezar.
                <br />
                <span className="text-sm">
                  Meta: {META_PROSPECTOS} en lista, {META_CONVERSACIONES}{" "}
                  conversaciones.
                </span>
              </p>
            </div>
          )}
        </div>
      )}

      {tab === "patron" && <Patron metricas={metricas} />}
      {tab === "guia" && <Guia />}
    </main>
  );
}

function MetricasStrip({
  metricas,
}: {
  metricas: ReturnType<typeof calcularMetricas>;
}) {
  const items = [
    { label: "En lista", value: `${metricas.total}`, meta: `de ${META_PROSPECTOS}` },
    {
      label: "Contactados",
      value: `${metricas.contactados}`,
      meta: `de ${META_CONVERSACIONES}`,
    },
    {
      label: "Tasa de respuesta",
      value: `${metricas.tasaRespuesta.toFixed(0)}%`,
      meta: "mínimo 10%",
    },
    { label: "Entrevistas", value: `${metricas.entrevistados}`, meta: "" },
    {
      label: "Pagando",
      value: `${metricas.pagando}`,
      meta: "meta: 1",
      destacar: metricas.pagando > 0,
    },
  ];

  return (
    <section className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-5">
      {items.map((i) => (
        <div
          key={i.label}
          className={`glass p-4 ${
            i.destacar ? "border-google-green/50 bg-green-50/80" : ""
          }`}
        >
          <p className="text-xs font-medium text-gray-500">{i.label}</p>
          <p
            className={`mt-1 text-2xl font-bold ${
              i.destacar ? "text-google-green" : "text-gray-900"
            }`}
          >
            {i.value}
          </p>
          {i.meta && <p className="text-xs text-gray-400">{i.meta}</p>}
        </div>
      ))}
    </section>
  );
}

function ListaProspectos({
  prospectos,
  seleccionado,
  onSeleccionar,
}: {
  prospectos: Prospecto[];
  seleccionado: string | null;
  onSeleccionar: (id: string) => void;
}) {
  const [filtro, setFiltro] = useState<Estado | "todos">("todos");

  const visibles =
    filtro === "todos"
      ? prospectos
      : prospectos.filter((p) => p.estado === filtro);

  return (
    <div className="glass p-4">
      <select
        value={filtro}
        onChange={(e) => setFiltro(e.target.value as Estado | "todos")}
        className="mb-4 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
      >
        <option value="todos">Todos ({prospectos.length})</option>
        {ESTADOS.map((e) => (
          <option key={e.id} value={e.id}>
            {e.label} ({prospectos.filter((p) => p.estado === e.id).length})
          </option>
        ))}
      </select>

      <ul className="max-h-[560px] space-y-2 overflow-y-auto">
        {visibles.length === 0 && (
          <li className="py-8 text-center text-sm text-gray-400">
            Sin prospectos aquí todavía.
          </li>
        )}
        {visibles.map((p) => {
          const estado = ESTADOS.find((e) => e.id === p.estado)!;
          return (
            <li key={p.id}>
              <button
                onClick={() => onSeleccionar(p.id)}
                className={`w-full rounded-xl border p-3 text-left transition-colors ${
                  seleccionado === p.id
                    ? "border-google-blue bg-blue-50/50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="font-semibold text-gray-900">
                    {p.tienda || p.nombre || "Sin nombre"}
                  </span>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold ${estado.color}`}
                  >
                    {estado.label}
                  </span>
                </div>
                <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wide text-gray-400">
                  {SEGMENTOS.find((s) => s.id === p.segmento)?.label}
                </p>
                {p.canales && (
                  <p className="mt-1 text-xs text-gray-500">{p.canales}</p>
                )}
                {p.dolores.length > 0 && (
                  <p className="mt-1 text-xs text-purple-600">
                    {p.dolores.length} dolor{p.dolores.length > 1 ? "es" : ""}{" "}
                    etiquetado{p.dolores.length > 1 ? "s" : ""}
                  </p>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function DetalleProspecto({
  prospecto,
  onCambio,
  onEliminar,
}: {
  prospecto: Prospecto;
  onCambio: (cambios: Partial<Prospecto>) => void;
  onEliminar: () => void;
}) {
  const plantillas = PLANTILLAS.filter(
    (t) => t.segmento === prospecto.segmento || t.segmento === "ambos"
  );
  const dolores = DOLORES.filter(
    (d) => d.segmento === prospecto.segmento || d.segmento === "ambos"
  );

  const [plantilla, setPlantilla] = useState(plantillas[0].id);
  const [copiado, setCopiado] = useState(false);

  const tpl = plantillas.find((t) => t.id === plantilla) ?? plantillas[0];
  const dolorPrincipal =
    DOLORES.find((d) => d.id === prospecto.dolores[0])?.label ?? "…";
  const seg = SEGMENTOS.find((s) => s.id === prospecto.segmento)!;
  const mensaje = renderPlantilla(tpl.texto, prospecto, {
    dolor: dolorPrincipal,
  });

  async function copiar() {
    await navigator.clipboard.writeText(mensaje);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 1800);
  }

  function toggleDolor(id: string) {
    const tiene = prospecto.dolores.includes(id);
    onCambio({
      dolores: tiene
        ? prospecto.dolores.filter((d) => d !== id)
        : [...prospecto.dolores, id],
    });
  }

  const entrevista = prospecto.entrevista;

  return (
    <div className="glass space-y-6 p-5">
      <div className="rounded-xl bg-gray-50 px-3 py-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-google-blue">
          {seg.label}
        </span>
        <p className="mt-0.5 text-xs text-gray-500">{seg.descripcion}</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Campo
          label="Persona"
          value={prospecto.nombre}
          onChange={(v) => onCambio({ nombre: v })}
          placeholder="Nombre de pila"
        />
        <Campo
          label="Empresa"
          value={prospecto.tienda}
          onChange={(v) => onCambio({ tienda: v })}
          placeholder="Nombre del negocio"
        />
        <Campo
          label={
            prospecto.segmento === "contratista"
              ? "Mandantes a los que presta servicios"
              : "Canales donde vende"
          }
          value={prospecto.canales}
          onChange={(v) => onCambio({ canales: v })}
          placeholder={
            prospecto.segmento === "contratista"
              ? "Codelco, Anglo American, constructora X"
              : "MercadoLibre, Shopify, Falabella"
          }
        />
        <Campo
          label="Contacto"
          value={prospecto.contacto}
          onChange={(v) => onCambio({ contacto: v })}
          placeholder="@instagram / correo / +569"
        />
        <Campo
          label="Dónde lo encontré"
          value={prospecto.fuente}
          onChange={(v) => onCambio({ fuente: v })}
          placeholder="Grupo de Facebook de sellers"
        />
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-gray-500">
            Estado
          </span>
          <select
            value={prospecto.estado}
            onChange={(e) => {
              const nuevo = e.target.value as Estado;
              onCambio({
                estado: nuevo,
                fechaContacto:
                  nuevo !== "por_contactar" && !prospecto.fechaContacto
                    ? new Date().toISOString().slice(0, 10)
                    : prospecto.fechaContacto,
              });
            }}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
          >
            {ESTADOS.map((e) => (
              <option key={e.id} value={e.id}>
                {e.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <section>
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900">
            Mensaje listo para enviar
          </h3>
          <select
            value={plantilla}
            onChange={(e) => setPlantilla(e.target.value)}
            className="rounded-lg border border-gray-300 px-2 py-1 text-xs"
          >
            {plantillas.map((t) => (
              <option key={t.id} value={t.id}>
                {t.canal}
              </option>
            ))}
          </select>
        </div>
        <pre className="whitespace-pre-wrap rounded-xl bg-gray-50 p-3 text-sm text-gray-800">
          {mensaje}
        </pre>
        <button
          onClick={copiar}
          className="btn-secondary mt-2 px-4 py-2 text-sm"
        >
          {copiado ? "Copiado ✓" : "Copiar mensaje"}
        </button>
        <p className="mt-2 text-xs text-gray-400">
          Personalízalo antes de enviar. 40 mensajes escritos a mano convierten
          más que 400 automatizados — y no arriesgan tus cuentas.
        </p>
      </section>

      <section>
        <h3 className="mb-2 text-sm font-semibold text-gray-900">
          Dolores que mencionó
        </h3>
        <div className="flex flex-wrap gap-2">
          {dolores.map((d) => {
            const activo = prospecto.dolores.includes(d.id);
            return (
              <button
                key={d.id}
                onClick={() => toggleDolor(d.id)}
                className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                  activo
                    ? "border-purple-400 bg-purple-50 font-semibold text-purple-700"
                    : "border-gray-300 text-gray-600 hover:border-gray-400"
                }`}
              >
                {d.hipotesis && (
                  <span className="mr-1 font-mono text-[10px] opacity-60">
                    {d.hipotesis}
                  </span>
                )}
                {d.label}
              </button>
            );
          })}
        </div>
        <p className="mt-2 text-xs text-gray-400">
          Etiqueta sólo lo que mencionó <em>espontáneamente</em>. Si se lo
          sugeriste tú, no cuenta.
        </p>
      </section>

      <section>
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900">Entrevista</h3>
          {!entrevista && (
            <button
              onClick={() =>
                onCambio({ entrevista: entrevistaVacia(), estado: "entrevistado" })
              }
              className="btn-secondary px-3 py-1 text-xs"
            >
              Registrar entrevista
            </button>
          )}
        </div>

        {entrevista && (
          <div className="space-y-4">
            {PREGUNTAS.map((q, i) => (
              <div key={q.campo}>
                <p className="text-xs font-medium text-gray-700">
                  {i + 1}. {q.texto}
                </p>
                {q.nota && (
                  <p className="mt-0.5 text-[11px] text-google-red">{q.nota}</p>
                )}
                <textarea
                  value={entrevista[q.campo] as string}
                  onChange={(e) =>
                    onCambio({
                      entrevista: { ...entrevista, [q.campo]: e.target.value },
                    })
                  }
                  rows={2}
                  placeholder="Sus palabras exactas, no tu resumen"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                />
              </div>
            ))}
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-gray-700">
                Monto que declara haber perdido (CLP)
              </span>
              <input
                type="number"
                value={entrevista.montoPerdidoClp ?? ""}
                onChange={(e) =>
                  onCambio({
                    entrevista: {
                      ...entrevista,
                      montoPerdidoClp:
                        e.target.value === "" ? null : Number(e.target.value),
                    },
                  })
                }
                placeholder="0"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              />
            </label>
          </div>
        )}
      </section>

      <section>
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-gray-500">
            Notas
          </span>
          <textarea
            value={prospecto.notas}
            onChange={(e) => onCambio({ notas: e.target.value })}
            rows={3}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
          />
        </label>
      </section>

      <button
        onClick={onEliminar}
        className="text-xs text-gray-400 hover:text-google-red"
      >
        Eliminar prospecto
      </button>
    </div>
  );
}

function Campo({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-gray-500">
        {label}
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
      />
    </label>
  );
}

function Patron({
  metricas,
}: {
  metricas: ReturnType<typeof calcularMetricas>;
}) {
  const max = Math.max(...metricas.ranking.map((r) => r.n), UMBRAL_DOLOR);

  return (
    <div className="space-y-6">
      <div className="glass p-5">
        <h2 className="mb-1 text-lg font-bold">Dolores más mencionados</h2>
        <p className="mb-5 text-sm text-gray-600">
          Un dolor necesita <strong>{UMBRAL_DOLOR} menciones espontáneas</strong>{" "}
          para considerarse real. Por debajo de eso puede ser casualidad o sesgo
          de quien pregunta.
        </p>

        {metricas.ranking.length === 0 ? (
          <p className="py-8 text-center text-sm text-gray-400">
            Todavía no hay dolores etiquetados. Aparecerán aquí a medida que
            registres entrevistas.
          </p>
        ) : (
          <ul className="space-y-3">
            {metricas.ranking.map((d) => {
              const supera = d.n >= UMBRAL_DOLOR;
              return (
                <li key={d.id}>
                  <div className="mb-1 flex items-baseline justify-between gap-3">
                    <span className="text-sm text-gray-800">
                      {d.hipotesis && (
                        <span className="mr-1.5 font-mono text-xs text-gray-400">
                          {d.hipotesis}
                        </span>
                      )}
                      {d.label}
                    </span>
                    <span
                      className={`shrink-0 text-sm font-bold ${
                        supera ? "text-google-green" : "text-gray-500"
                      }`}
                    >
                      {d.n}
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className={`h-full rounded-full ${
                        supera ? "bg-google-green" : "bg-google-blue/50"
                      }`}
                      style={{ width: `${(d.n / max) * 100}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="glass p-5">
        <h2 className="mb-3 text-lg font-bold">Dinero declarado en juego</h2>
        <p className="text-3xl font-bold text-google-green">
          {CLP.format(metricas.montoTotalDeclarado)}
        </p>
        <p className="mt-2 text-sm text-gray-600">
          Suma de lo que los entrevistados dicen haber perdido por problemas
          operacionales. Es el argumento de venta más fuerte que vas a tener, y
          sale de su boca, no de la tuya.
        </p>
      </div>
    </div>
  );
}

function Guia() {
  return (
    <div className="space-y-6">
      <div className="glass p-5">
        <h2 className="mb-3 text-lg font-bold">Las 5 preguntas</h2>
        <ol className="space-y-3">
          {PREGUNTAS.map((q, i) => (
            <li key={q.campo} className="text-sm">
              <span className="font-semibold text-gray-900">
                {i + 1}. {q.texto}
              </span>
              {q.nota && (
                <p className="mt-0.5 text-xs text-google-red">{q.nota}</p>
              )}
            </li>
          ))}
        </ol>
      </div>

      <div className="glass p-5">
        <h2 className="mb-3 text-lg font-bold">Plantillas</h2>
        <div className="space-y-4">
          {PLANTILLAS.map((t) => (
            <div key={t.id}>
              <h3 className="mb-1 text-sm font-semibold text-google-blue">
                {t.canal}
                <span className="ml-2 font-normal text-gray-400">
                  {t.segmento === "ambos"
                    ? "· ambos segmentos"
                    : `· ${SEGMENTOS.find((s) => s.id === t.segmento)?.label}`}
                </span>
              </h3>
              <pre className="whitespace-pre-wrap rounded-xl bg-gray-50 p-3 text-xs text-gray-700">
                {t.texto}
              </pre>
            </div>
          ))}
        </div>
      </div>

      <div className="glass p-5">
        <h2 className="mb-3 text-lg font-bold">Qué NO hacer estos 14 días</h2>
        <ul className="list-inside list-disc space-y-1.5 text-sm text-gray-700">
          <li>No construir producto.</li>
          <li>No diseñar logo, marca ni landing.</li>
          <li>No comprar dominio, herramientas ni publicidad. El presupuesto es CLP 0.</li>
          <li>
            No automatizar el envío: 40 mensajes a mano convierten más que 400
            automatizados.
          </li>
          <li>No hablar de &quot;IA&quot;. Al seller le importa el resultado.</li>
        </ul>
      </div>
    </div>
  );
}

function ExportarImportar({
  prospectos,
  onImportar,
}: {
  prospectos: Prospecto[];
  onImportar: (p: Prospecto[]) => void;
}) {
  const input = useRef<HTMLInputElement>(null);

  function exportar() {
    const blob = new Blob([JSON.stringify(prospectos, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `validacion-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function importar(archivo: File) {
    const lector = new FileReader();
    lector.onload = () => {
      try {
        const datos = JSON.parse(String(lector.result)) as Prospecto[];
        if (Array.isArray(datos)) onImportar(datos);
      } catch {
        alert("El archivo no tiene el formato esperado.");
      }
    };
    lector.readAsText(archivo);
  }

  return (
    <>
      <button onClick={exportar} className="btn-secondary px-3 py-2 text-sm">
        Respaldar
      </button>
      <button
        onClick={() => input.current?.click()}
        className="btn-secondary px-3 py-2 text-sm"
      >
        Restaurar
      </button>
      <input
        ref={input}
        type="file"
        accept="application/json"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) importar(f);
          e.target.value = "";
        }}
      />
    </>
  );
}
