# Web Talleres AutoConcept

Web estática de una sola página, sin base de datos ni backend. Lo que se publica es la carpeta `public/`.

## Desplegar en Cloudflare Pages
1. Cloudflare → Workers & Pages → Create → Pages → Connect to Git → este repositorio (rama `autoconcept` o `main`).
2. Framework preset: **None** · Build command: *(vacío)* · **Build output directory: `public`**.
3. Añadir el dominio personalizado (Custom domains) y, en el DNS de Cloudflare, dejar el proxy activado.
4. En SSL/TLS: modo **Full (strict)**, activar *Always Use HTTPS* y *Automatic HTTPS Rewrites*. Activar HSTS desde Cloudflare solo cuando el dominio funcione bien por HTTPS (el fichero `_headers` ya lo envía).
5. Alternativa sin Git: `npx wrangler pages deploy public --project-name autoconcept`.

## Seguridad (ya incluida en `public/_headers`)
- **CSP estricta**: `default-src 'none'`, scripts y estilos solo del propio dominio (sin `unsafe-inline`, sin `eval`), imágenes y fuentes propias. Único tercero permitido: el iframe de Google Maps, que solo se carga al pulsar «Ver mapa».
- HSTS (2 años, preload), `nosniff`, `X-Frame-Options: DENY` + `frame-ancestors 'none'`, `Referrer-Policy`, `Permissions-Policy` (sin cámara, micrófono, geolocalización…), COOP same-origin.
- Sin dependencias externas: fuente, fotos, CSS y JS alojados en la propia web. Sin cookies, sin analítica, sin formularios que envíen datos a un servidor (el formulario abre WhatsApp o el correo).
- Caché larga e inmutable para `/assets/*`; el HTML siempre se revalida.
- `404.html`, `robots.txt`, `sitemap.xml` y `.well-known/security.txt` incluidos. **Si cambia el dominio**, actualizar `canonical`, `og:url`, `og:image` e `hasMap`/`url` del JSON-LD en `index.html`, y `robots.txt`, `sitemap.xml` y `security.txt`.
- Si se añade algo nuevo (analítica, vídeo, otro mapa…), hay que ampliar la CSP en `_headers`; con estilos o scripts en línea el navegador los bloqueará. Para estilos dinámicos usar `data-css="--var:valor"`.

## Estructura de `public/`
- `index.html`: la página. `assets/css/styles.css` y `assets/js/main.js` (+ `boot.js`).
- `assets/img/`: logotipos (`logo.png`, `logo-blanco.png`, `marca.png`), iconos y `og-image.jpg`. El logo es el original de su web (513 px): **pedir el vectorial al cliente**.
- `assets/img/fotos/`: fotografías de ambiente en WebP (origen Unsplash, licencia libre para uso comercial). **Lo ideal es sustituirlas por fotos reales del taller**, manteniendo nombres y proporciones (hero 16:9, taller 1:1, manos/aceite/rueda 4:5).
- `assets/fonts/`: Archivo variable (licencia OFL), autoalojada.

## Qué editar
- **Colores**: variables al principio de `styles.css` (`--red` #D8241C).
- **Horario y festivos**: bloque `CONFIGURACIÓN` al inicio de `main.js`. El horario también aparece como texto en barra superior, menú móvil, pie y JSON-LD. Revisar festivos cada año.
- **Opiniones**: nota 4,8 y 101 opiniones (Google Maps, 9-oct-2026); actualizar de vez en cuando.

## Datos a confirmar con el cliente
- Teléfono 976 57 19 03 · WhatsApp 672 68 75 54 · info@autoconcept.es · Calle Meridiano, 2, Local · 50016 Santa Isabel, Zaragoza · CIF B-99467847
- **Horario L–V 8:00–17:00** (Google Maps); su web antigua decía 8–13 y 15–19: confirmar.
- Recogida a domicilio, pago con tarjeta y entrada accesible.
