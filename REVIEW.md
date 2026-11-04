# Revisión visual del piloto experimental

## Dirección

Taste Skill: **The object, large**, semilla `221441282`. La vitrina fotográfica se eligió para acercar el producto y permitir comprar desde la portada. Impeccable: referencia `seed:273d91edf8a53111`. El usuario eligió exploración interactiva y construcción directa en código.

Idea: la selección de ingredientes de Los Patricios, distinta entre Perú y Chile, se convierte en una vitrina fotográfica operable. La interacción principal cambia ingrediente, peso y precio y añade la variante elegida al carrito del país correspondiente.

Adaptaciones justificadas: las fotografías existentes son bodegones completos, por lo que se conservan sus fondos; no se fabrican recortes transparentes. Se evita tapar titulares con imágenes y se sustituye el retrato recortado del esquema por fotografía real del recurso de trufas. Se mantiene el cierre dividido entre fotografía y menú. No hubo nuevas búsquedas, imágenes de terceros, vídeos ni generación de imágenes en esta versión.

## Comparación

| Before | After | Why |
| --- | --- | --- |
| Hero informativo con enlace al catálogo | Vitrina que cambia de ingrediente, peso y precio y permite añadirlo | La exploración pasa a formar parte de la compra |
| Categorías repetidas encima de títulos | Nombre del producto y precio debajo | Menos redundancia y jerarquía más clara |
| Flechas de texto mezcladas | Iconos SVG con trazo común | Consistencia entre tienda y administración |
| Entradas idénticas en numerosos bloques | Movimiento selectivo; el contenido tranquilo permanece quieto | El movimiento refuerza la jerarquía y no retrasa las tareas |
| Tipografías externas | Fuentes locales con sus licencias | Composición estable durante la demostración |
| Carrito con límite genérico de 99 | Cantidades acotadas al stock de cada variante | La simulación respeta la lógica comercial |

## Comprobaciones

- Build de producción y TypeScript correctos; 18 páginas generadas.
- 99 comprobaciones funcionales en navegador, registradas en `.impeccable/review/functional-checks.json`.
- Navegación y estados a 1440, 768 y 390 px: filtros, búsqueda vacía, variantes, cantidades, aislamiento por país, formularios requeridos, confirmación ficticia, inventario, estados administrativos, Escape y restauración de foco.
- Detector mecánico Impeccable: `[]`.
- Lint Taste: 0 FAIL, 0 WARN. Excepciones explícitas: familia oficial Montserrat, separadores en listas administrativas, controles de formulario y scrims exclusivamente sobre fotografías.
- Inspector Taste: Perú 0 FAIL y 3 WARN; Chile 0 FAIL y 2 WARN; administración 0 FAIL y 0 WARN, a los tres anchos.
- El sistema operativo tiene movimiento reducido activado. La excepción `still-page` respeta esa preferencia. Se comprobaron por separado la fotografía animada y las entradas selectivas emulando `no-preference`.
- Procedencia incrustada: 8 PNG, ninguno sin metadatos.

## Avisos visuales conservados

La escala tipográfica fluida y el nombre monumental del ingrediente generan más de cinco tamaños calculados; se conserva para distinguir claramente las jerarquías. La fotografía de borde a borde en el relato de marca activa un aviso de márgenes, mientras el texto mantiene sus márgenes compartidos. No se dispone de metraje verificado del catálogo; se utiliza un movimiento lento sobre la fotografía de muestra en lugar de introducir un vídeo ajeno al negocio.

## Material pendiente

Se reutilizan `caviar-piloto.png`, `trufas-piloto.png`, `wagyu-piloto.png` y `foie-gras-piloto.png`: imágenes generadas preexistentes, no fotografías verificadas del catálogo. Su condición se declara en el pie del sitio y su origen en `ASSETS.md`. No hay imágenes de colecciones abiertas ni créditos externos que atribuir. Los logos son recortes del manual oficial. Las fuentes locales conservan las licencias SIL Open Font License.

Antes de producción deben confirmarse o reemplazarse las fotografías, los nombres de selección, los pesos, los precios, el stock, los pedidos ficticios y la configuración de delivery. Backend, autenticación, pagos y hosting siguen fuera del piloto.

## Estado de entrega

Implementación local. Sin commits, push ni despliegue público.

## Evaluación y revisión independiente

Autoevaluación de la última ronda: diseño 8, usabilidad 8, creatividad 7 y contenido 7; ponderación total **7,7/10**. La creatividad se limita por un recurso comercial reutilizable y la fotografía disponible; el detalle de la crítica está en `.taste-skill/critique.md`.

La revisión independiente final emitió `disposition: ship` para las cuatro correcciones solicitadas, puntuadas como resueltas: categorías repetidas, coherencia de iconos, entradas repetitivas y referencia del contrato. Ese veredicto se limita a esas correcciones; no se presenta como una nueva auditoría exhaustiva de toda la web.

La vista local existente permanece en `http://localhost:3000/pe/`. El servidor temporal de producción en el puerto 3100 se cerró tras las comprobaciones; puede iniciarse de nuevo con `npm run preview`.
