// Arma una versión de un solo archivo (sin servidor) para GitHub Pages: el logo y el ícono van incrustados.
'use strict';
const fs = require('node:fs');
const path = require('node:path');

const pub = f => path.join(__dirname, 'public', f);
const logo = 'data:image/png;base64,' + fs.readFileSync(pub('logo-160.png')).toString('base64');
const icon = 'data:image/svg+xml;base64,' + fs.readFileSync(pub('icon.svg')).toString('base64');
// El logo va una sola vez y se asigna a todas las imágenes al cargar, para que el archivo quede liviano.
const html = fs.readFileSync(pub('index.html'), 'utf8')
  .replaceAll('src="logo.png"', 'data-logo')
  .replace('</body>', `<script>document.querySelectorAll('[data-logo]').forEach(i => { i.src = '${logo}'; });</script>\n</body>`)
  .replace('href="icon.svg"', `href="${icon}"`);

// docs/index.html es lo que publica GitHub Pages; dist/ es la copia suelta para guardar donde se quiera.
for (const out of [path.join(__dirname, 'docs', 'index.html'), path.join(__dirname, 'dist', 'Kingblack Nutricion.html')]) {
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
  console.log(`Listo: ${out} (${Math.round(html.length / 1024)} KB)`);
}
