# Kingblack Nutrición — contexto para Claude

Respondé siempre en **español rioplatense** (vos, "tocá", "cargá"), también en los mensajes intermedios.

## Qué es

Dashboard del gimnasio **Kingblack** para el asesoramiento nutricional. La nutricionista
(Lic. Girgenti Nora Vanesa) carga los datos del cliente, arma los platos y descarga un **PDF para
subir a la ficha del cliente en EVO** (el sistema de gestión del gimnasio). No hay envío por mail:
se sacó a pedido (no se pudo configurar Gmail). No hay base de datos ni servidor en producción.

- **Publicado:** https://kingblackgym-prog.github.io/nutricion/ (GitHub Pages, gratis)
- **Repositorio:** https://github.com/kingblackgym-prog/nutricion (público; Pages sirve `main` → `/docs`)
- **Datos de clientes:** nunca salen del navegador. Se guarda un borrador en `localStorage`
  (`kb-nutricion-borrador`) hasta tocar "Nuevo informe". No agregar nada que los suba a internet.

## Qué tiene el dashboard

1. **Datos del cliente:** nombre, apellido, edad, fecha, peso, altura → **IMC automático** con
   categoría OMS y color; objetivo; profesional (viene con "Lic. Girgenti Nora Vanesa").
2. **Platos de almuerzo y cena** como gráficos de dona con % por grupo: Vegetales y frutas,
   Proteínas, Carbohidratos, Grasas saludables. Al mover una porción las demás se reacomodan para
   sumar 100 %. Debajo de cada grupo hay botones con los alimentos del modelo: tocarlos los agrega.
   Botones "Usar % del modelo" (50/25/25/0) y "Copiar a cena".
3. **Ejemplos de desayuno y merienda** (texto libre).
4. **Pautas generales** (13 casillas, todas marcadas por defecto) — salen de la hoja original en papel.
5. **Indicaciones personalizadas** (texto libre).
6. **Modelos de plato** (de las láminas de la nutricionista): listas de alimentos por grupo para
   *Almuerzos y cenas* y *Desayunos y meriendas*, opcionales (infusiones, endulzantes, especias) y dos
   **ejemplos completos editables** (almuerzo/cena y merienda). Una casilla decide si van al PDF.

**PDF** (A4, se genera en el navegador con html2canvas + jsPDF):
hoja 1 datos + IMC + platos · hoja 2 desayuno/merienda + pautas + indicaciones ·
hojas 3 y 4 modelos de almuerzos/cenas y desayunos/meriendas (opcionales).
Nombre del archivo: `Nutricion - Apellido Nombre - AAAA-MM-DD.pdf`.

## Archivos

| Archivo | Para qué |
|---|---|
| `public/index.html` | **Todo el dashboard** (HTML + CSS + JS en un archivo). Acá se edita. |
| `public/logo.png`, `logo-160.png`, `icon.svg` | Logo corona blanco (sobre fondo oscuro) y favicon |
| `build.js` | Arma la versión de **un solo archivo** con el logo incrustado → `docs/index.html` (lo que publica GitHub Pages) y `dist/Kingblack Nutricion.html` (copia suelta) |
| `docs/index.html` | **Generado, no editar a mano.** Se regenera con `npm run build` |
| `server.js` | Servidor local sin dependencias para probar en http://localhost:3100 |
| `referencias/` | Material original (solo en el .zip, no está en GitHub): `hoja-original-nora.pdf`, la planilla en papel de la que salió el dashboard |

Sin dependencias de npm. Librerías por CDN: html2canvas 1.4.1 y jsPDF 2.5.1 (cdnjs), fuente Outfit (Google Fonts).

## Cómo trabajar

```bash
npm start          # probar en http://localhost:3100 (necesita Node 22 o más)
npm run build      # regenerar docs/index.html después de cada cambio
git add -A && git commit -m "…" && git push   # publica: en 1–2 minutos se actualiza el link
```

Antes de publicar, probá siempre: cargá un cliente de prueba, revisá la vista previa y generá el
PDF (sin que se corte nada en ninguna hoja). Borrá el borrador de prueba después.

## Estilo Kingblack (obligatorio en este y cualquier proyecto Kingblack)

Sale de la lámina "Planes y servicios 2026" del gimnasio (planes Básico y Black). Las láminas de los
modelos de plato de la nutricionista ya están volcadas en el código (`MODELS` en `public/index.html`).

- **Colores:** fondo `#FCFCFC` / blanco · carbón cálido `#2C2828` (textos, pills, franja inferior) ·
  amarillo `#F4C93C` (único acento: tildes en círculo, palabra destacada, botón principal) ·
  grises `#A3A3A3` (etiquetas), `#E8E8E8` (divisores), `#F4F4F4` (chips). Nada de dorados ni otros acentos.
- **Tipografía:** Outfit 400–900. Títulos 800 grandes con tracking apretado. Etiquetas chicas en
  MAYÚSCULAS, 600, letter-spacing ~.2em, gris. Marca y pills en 800–900 *cursiva* MAYÚSCULA.
- **Encabezado:** wordmark `KINGBLACK®` cursiva a la izquierda; etiqueta gris espaciada a la derecha.
  Eyebrow centrado con línea debajo + título grande centrado.
- **Cards:** blancas, radio ~24px, borde 1px muy claro, sombra suave. Pill carbón con texto blanco en
  cursiva. Números enormes 800 con la unidad chica en gris. Listas con tilde negra dentro de círculo amarillo.
- **Franja inferior** carbón: logo corona blanco, slogan "Sentite bien, *sentite como en casa.*"
  (la segunda parte en amarillo y cursiva), `KINGBLACK.COM.AR` espaciado en gris y número de página grande ("2.").
- Diseño claro por defecto.

**Colores de los grupos del plato** (validados para daltonismo, no cambiarlos sin revalidar):
vegetales `#2e8a4f`, proteínas `#3a6fd0`, carbohidratos `#c4861b`, grasas `#b04a9a`, con el % escrito
sobre cada porción.

## Trampas conocidas (html2canvas)

- No usar `box-shadow` dentro de las hojas del PDF (`.page`): html2canvas lo dibuja como bloques grises.
  Las cards del PDF usan solo borde.
- El slogan de la franja necesita `white-space:nowrap` (la cursiva sintética se mide distinto y se corta).
- La vista previa está escalada con `transform`; `buildPdf()` lo saca antes de capturar y lo vuelve a poner.
- Las hojas miden 794×1123 px (A4 a 96 dpi). Si agregás contenido, verificá que `.page .body` no desborde.

## Reglas

- No volver a agregar envío por mail ni nada que mande datos de clientes a un servidor sin que lo pidan.
- No subir `referencias/` a GitHub: el repo es público y es material interno del gimnasio.
- No guardar contraseñas ni tokens en el proyecto.
- Los textos de las pautas y las listas de alimentos son de la nutricionista: no inventar ni cambiar
  contenido nutricional sin que lo pidan; los ejemplos completos sí son editables desde el dashboard.
