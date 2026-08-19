# Kit de marca — Prisma 137

```
brand/
├── BRAND.md                          ← empieza aquí: manual completo
├── tokens/
│   ├── prisma-137.css                CSS custom properties
│   └── prisma-137.tokens.json        tokens en JSON (para Figma, scripts, etc.)
├── logo/
│   ├── prisma137-isotipo.svg         marca de trabajo (+ -crema, -mono)
│   ├── prisma137-badge.svg           emblema circular (+ -crema)
│   ├── prisma137-favicon.svg         cuadrado navy, legible a 16 px
│   ├── prisma137-wordmark.svg        PRISMA 137
│   ├── prisma137-lockup-horizontal.svg   (+ -crema)
│   ├── prisma137-lockup-vertical.svg
│   └── prisma137-avatar-linkedin.svg 300×300 listo para subir
└── social/
    ├── PERFILES.md                   bios, medidas y checklist de IG y LinkedIn
    ├── CONTENIDO.md                  pilares, ritmo semanal, sistema de feed
    ├── plantillas/
    │   ├── plantillas.html           artboards a tamaño real
    │   └── render.mjs                exporta los artboards a PNG
    └── export/                       PNG listos para subir
```

## Cómo usarlo

**Diseñando algo nuevo** → lee `BRAND.md`. La checklist final es el filtro.

**Escribiendo para redes** → `social/CONTENIDO.md` (qué publicar) y
`social/PERFILES.md` (cómo están configurados los perfiles).

**Tocando el producto** → los tokens ya están en `tailwind.config.ts` y
`app/globals.css`. Usa las clases (`navy-800`, `signal-500`, `bronze-500`,
`cream-100`). Un hex suelto en un componente es un bug.

**Regenerando los PNG de redes** tras editar `plantillas.html`:

```bash
npm i -D playwright-core
node brand/social/plantillas/render.mjs
```

## Pendientes

- [ ] Subir el PNG original de **Alfa** (el robot con telescopio) como
      `brand/logo/prisma137-alfa.png` — es la foto de perfil de Instagram.
- [ ] Exportar una versión del wordmark con la tipografía **convertida a curvas**
      para imprenta y para entregar a terceros. Los SVG actuales referencian
      Poppins por nombre.
- [ ] Diseñar las 5 portadas de destacadas de Instagram (`social/PERFILES.md`).
- [ ] Imagen OG (1200×630) para la web.
