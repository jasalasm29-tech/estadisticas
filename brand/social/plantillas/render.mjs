#!/usr/bin/env node
/**
 * Exporta cada artboard de plantillas.html a PNG a tamaño real.
 *
 *   npm i -D playwright-core   # el binario de Chromium ya suele estar en el entorno
 *   node brand/social/plantillas/render.mjs [--out brand/social/export]
 *
 * Si Chromium no está en la ruta por defecto, pásalo con CHROMIUM_PATH.
 */
import { chromium } from "playwright-core";
import { mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const outArg = process.argv.indexOf("--out");
const outDir = resolve(outArg > -1 ? process.argv[outArg + 1] : join(here, "../export"));

const CANDIDATES = [
  process.env.CHROMIUM_PATH,
  "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
  "/usr/bin/chromium",
  "/usr/bin/google-chrome",
].filter(Boolean);
const executablePath = CANDIDATES.find((p) => existsSync(p));

// Cada artboard: nombre de archivo, índice del contenedor .art, y tamaño exacto
// de exportación. El tamaño se fija a mano porque el screenshot por elemento
// redondea hacia arriba y saca PNG de 1081 px.
const SHOTS = [
  ["ig-post-navy", 0, 1080, 1080],
  ["ig-post-crema", 1, 1080, 1080],
  ["ig-carrusel-portada", 2, 1080, 1350],
  ["ig-story", 3, 1080, 1920],
  ["li-banner", 4, 1128, 191],
];

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch(executablePath ? { executablePath } : {});
const page = await browser.newPage({ deviceScaleFactor: 1 });
await page.goto("file://" + join(here, "plantillas.html"));
// Los artboards se muestran reducidos con zoom; para exportar hay que quitarlo.
await page.addStyleTag({ content: ".scale-30,.scale-25,.scale-50{zoom:1 !important}" });
await page.waitForLoadState("networkidle");
await page.evaluate(() => document.fonts.ready);

const arts = await page.$$(".art > div");
for (const [name, i, width, height] of SHOTS) {
  if (!arts[i]) {
    console.warn(`⚠  artboard ${i} (${name}) no encontrado — ¿cambió plantillas.html?`);
    continue;
  }
  const box = await arts[i].boundingBox();
  const file = join(outDir, `${name}.png`);
  await page.screenshot({
    path: file,
    fullPage: true,
    clip: { x: Math.round(box.x), y: Math.round(box.y), width, height },
  });
  console.log("✓", `${name}.png`, `${width}×${height}`);
}

await browser.close();
