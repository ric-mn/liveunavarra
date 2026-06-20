# LIVE Lab — sitio web

Web estática del **LIVE Lab** (Laboratorio Integral de Valoración y Ejercicio, UPNA).
Sin dependencias ni build: HTML + CSS + JS plano. Bilingüe (ES/EN) y responsive.

> Repositorio **independiente** del workspace privado de ciencia (JARVIS/papers). Será **público** para poder usar GitHub Pages gratis. **No subir nunca claves, contraseñas ni credenciales aquí.**

## Estructura
- `index.html` — Home (hero, stats, servicios resumen, coste cero, proyectos, blog, footer).
- `performance.html` — Página de servicios **LIVE**performance (rendimiento deportivo).
- `development.html` — Página de servicios **LIVE**development (valoración y desarrollo; foco infanto-juvenil).
- `legal.html` — Aviso legal + Política de privacidad + Política de cookies (titular: UPNA).
- `cookies.js` — banner de consentimiento de cookies (RGPD/AEPD). No carga analítica/píxel hasta consentir.
- `favicon.svg` — favicon vectorial con el degradado de marca.
- `robots.txt` / `sitemap.xml` — SEO técnico (rastreo + mapa del sitio).
- `.nojekyll` — evita que GitHub Pages procese el sitio con Jekyll (servimos HTML tal cual).

> **Pendiente antes de publicar:** crear `og-image.png` (1200×630, ideal una foto del lab) que ya está referenciada en las metaetiquetas Open Graph/Twitter. Y, cuando se integren analítica/píxel/reservas, definir `window.loadAnalytics()` / `window.loadAds()` en la página (cookies.js las invoca solo si hay consentimiento) y completar los campos en rojo de `legal.html`.

## Ver en local
```bash
python3 -m http.server 8000 --directory .
# → http://localhost:8000/  ·  /performance.html  ·  /development.html  ·  /legal.html
```

## Publicar en GitHub Pages (lo haremos juntos)
1. Crear un repositorio **público** nuevo en GitHub (p. ej. `liveunavarra`).
2. Subir el contenido de esta carpeta:
   ```bash
   git init && git add . && git commit -m "LIVE Lab web v1"
   git branch -M main
   git remote add origin https://github.com/<usuario>/liveunavarra.git
   git push -u origin main
   ```
3. En el repo: **Settings ▸ Pages ▸ Build and deployment ▸ Source: Deploy from a branch ▸ `main` / root** → Save.
4. En 1–2 min estará en `https://<usuario>.github.io/liveunavarra/`.
5. **Dominio propio (subdominio cedido por la UPNA):** ya configurado — archivo `CNAME` en la raíz del repo con `live.unavarra.es`. Falta que el servicio de informática de la UPNA cree en su DNS un registro **CNAME** `live` → `<usuario>.github.io` (un subdominio usa CNAME, no registros A — esos son solo para dominios raíz/apex). Una vez propague el DNS, en Settings ▸ Pages ▸ Custom domain confirmar `live.unavarra.es` y activar "Enforce HTTPS" (tarda unos minutos en emitir el certificado).

## Pendiente (roadmap)
- Servicios reales en cada sección (LIVEperformance / LIVEdevelopment).
- Reservas + sincronización con Google Calendar (Google Appointment Scheduling embebido, o Cal.com).
- Contenido real (stats, proyectos, blog enlazado a papers).
- Posible extracción del CSS compartido a `liveunavarra.css` (ahora cada página lo lleva inline).
