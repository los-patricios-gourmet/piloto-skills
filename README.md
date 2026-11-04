# Los Patricios Gourmet — piloto experimental v3

Nueva dirección visual y de UX sobre el piloto existente. Vitrina interactiva con fotografía a gran escala: cambia de ingrediente, elige una presentación y añádela al carrito desde la portada. Conserva Next.js, React, TypeScript, exportación estática y las rutas originales. Sin commits ni cambios enviados a GitHub durante este encargo.

## Ejecutar

```sh
npm ci
npm run dev
```

Para revisar exactamente el resultado de producción:

```sh
npm run build
npm run preview
```

La vista previa abre en http://127.0.0.1:3100/pe/. El servidor de `scripts/preview.mjs` también resuelve los segmentos RSC que Next.js 16.4 exporta como directorios en Windows. Solo escucha en loopback.

## Recorridos

- `/`: presentación y elección entre Perú y Chile.
- `/pe/`, `/cl/`: vitrina con ingrediente, presentación, precio y compra de prueba; colección editorial y relato de marca.
- `/[country]/catalogo/`: filtros, búsqueda y recuperación cuando no hay resultados.
- `/[country]/producto/[slug]/`: ficha y variantes de peso fijo.
- `/[country]/carrito/`: cantidades, subtotal y eliminación. Carrito por país, limitado al stock de muestra.
- `/[country]/checkout/`: contacto, dirección y confirmación de una simulación. Sin campos de tarjeta, pagos, pedidos ni transmisión de datos personales.
- `/admin-demo/`: catálogo, ajustes de stock, estados de pedidos ficticios e información de delivery. Sin persistencia administrativa.

Perú tiene caviar y trufas en PEN. Chile añade Wagyu y foie gras en CLP. El cambio de país conserva las selecciones separadas.

## Diseño e implementación

Taste Skill aporta dirección y revisión en navegador. Impeccable organiza contexto, contrato visual, control mecánico y revisión independiente. Emil Design Engineering orienta feedback, curvas de transición, accesibilidad y reducción del movimiento. La clienta eligió exploración interactiva y construcción directa en código.

La identidad conserva los colores oficiales, Bebas Neue y Montserrat alojadas localmente y las aplicaciones autorizadas del logotipo recortadas del manual, sin redibujar. Open Sans permanece entre las familias autorizadas del manual; esta versión utiliza dos familias para concentrar la jerarquía.

- `src/app/editorial.css`: tokens, vitrina, capítulos y navegación.
- `src/app/commerce.css`: catálogo, producto, carrito, checkout y administración.
- `src/app/responsive.css`: adaptaciones y movimiento reducido.
- `src/data/markets.ts`: datos de muestra tipados, preparados para reemplazarlos por una API.
- `PRODUCT.md`, `DESIGN.md`: producto y sistema visual.
- `.impeccable/storefront-brief.md`: decisiones de esta portada.

## Validación

`npm run build` y `npm run typecheck`. Las pruebas de navegador se conservan en `.impeccable/review/functional-checks.json` y las de movimiento en `motion-checks.json`. Los scripts `verify-browser.mjs`, `capture.mjs` y `verify-motion.mjs` requieren la instalación local de Taste Skill, Node 22 y Chrome/Edge. Los informes de diseño están en `.taste-skill/after`, `.taste-skill/chile` y `.taste-skill/admin`.

El sistema operativo de revisión tiene activado `prefers-reduced-motion: reduce`. Se respetó esa preferencia y se verificaron las animaciones por separado emulando `no-preference`.

## Material de demostración

Las cuatro fotografías generadas existentes, nombres, presentaciones, precios, stock y pedidos son provisionales. Las fuentes incluyen sus licencias SIL Open Font License en `public/fonts/`. Los orígenes de las imágenes constan en `ASSETS.md` y en sus metadatos. Antes de producción se necesitan imágenes y catálogo reales, cobertura y tarifas de delivery, backend, protección administrativa, Mercado Pago e infraestructura confirmada por TI.
