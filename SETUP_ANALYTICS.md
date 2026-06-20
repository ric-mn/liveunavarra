# Analítica — puesta en marcha (al desplegar)

**Decisión:** **Cloudflare Web Analytics** — gratis, **sin cookies**, sin datos personales
identificables y orientada a la privacidad. Es la opción más limpia para un sitio estático en
GitHub Pages y para el RGPD (al no usar cookies ni rastrear, **no requiere banner de consentimiento**).

Por eso el banner de cookies del sitio ya solo pide consentimiento para **contenido externo**
(mapas y Cal.com), y `legal.html` describe la analítica como agregada y sin cookies.

## Pasos (una sola vez, al desplegar)
1. Crea una cuenta gratuita en <https://dash.cloudflare.com> → sección **Web Analytics**.
2. **Add a site** → escribe el dominio (p. ej. `live.unavarra.es`).
3. Cloudflare te da un fragmento `<script>` con un **token** (`data-cf-beacon='{"token":"..."}'`).
4. Pásamelo (o pégalo tú) **justo antes de `</body>`** en las páginas. Yo lo añado a las 8 de una vez.
   - Es una sola línea; el token de Web Analytics **no es secreto** (va en el HTML público), a
     diferencia del token de Instagram (ese sí va en *Secrets*, nunca en el código).

## Alternativas (si en el futuro quieres un panel propio)
- **Plausible** (de pago ~9 €/mes o autoalojado): panel sencillo, sin cookies, UE.
- **Umami** (open-source, autoalojado): requiere un pequeño servidor/base de datos.

Mientras no se despliegue, **no hay analítica activa** y no falta nada: se conecta el día del lanzamiento.
