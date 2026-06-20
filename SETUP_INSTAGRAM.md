# Feed de Instagram — puesta en marcha

El feed de la home se alimenta de `instagram.json`. En local hay un `instagram.json` **de ejemplo**;
en producción lo regenera sola una **GitHub Action** (`.github/workflows/instagram.yml`) que lee tu
token desde *Secrets* y guarda las últimas publicaciones. **El token nunca va en el código.**

## Arquitectura
```
Instagram Graph API ──(token en GitHub Secret)──> GitHub Action (cada 6 h)
        └─> scripts/fetch_instagram.py ──> instagram.json ──> la web (instagram.js) lo pinta
```

## Pasos (una sola vez, al desplegar)

1. **Cuenta Business o Creator.** En la app de Instagram: *Configuración ▸ Tipo de cuenta ▸
   cambiar a profesional*. Vincúlala a una **página de Facebook** (requisito de la Graph API).

2. **App de Meta.** En <https://developers.facebook.com> crea una app, añade el producto
   **Instagram** y completa el flujo *Instagram API*. Ahí autorizas tu cuenta y obtienes un
   **token de larga duración** (~60 días). *(Meta cambia los nombres de estos flujos cada cierto
   tiempo; sigue la documentación oficial vigente en ese momento.)*

3. **Guarda el token como secreto del repo** (no en el código):
   GitHub ▸ tu repo ▸ **Settings ▸ Secrets and variables ▸ Actions ▸ New repository secret**
   - Nombre: `IG_TOKEN`
   - Valor: el token de larga duración

4. **Lanza la Action** una vez a mano: pestaña **Actions ▸ "Actualizar feed de Instagram" ▸
   Run workflow**. Generará `instagram.json` real y, a partir de ahí, se actualiza cada 6 horas.

## Renovación del token (importante)
El token de larga duración caduca a los **~60 días**. Para refrescarlo (extiende otros 60):
```
curl -s "https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=TU_TOKEN"
```
Copia el `access_token` devuelto y **actualiza el secreto `IG_TOKEN`**. (Conviene ponerse un
recordatorio cada ~50 días; si el lab quiere, se puede automatizar con un segundo workflow + un PAT.)

## Privacidad (RGPD)
- La web solo lee `instagram.json` desde **nuestro propio dominio** (primera parte).
- Pero las **imágenes** se sirven desde el CDN de Meta (`*.cdninstagram.com`) → eso es una
  petición a un **tercero** (Meta ve la IP del visitante). Antes de publicar el feed en vivo:
  - añadir una fila "Instagram / Meta" en la tabla de la **Política de cookies** (`legal.html`), y
  - **opción más limpia**: que la Action **descargue las imágenes** y las aloje en el repo
    (`/ig-media/`), de modo que todo sea de primera parte y no haya llamada a Meta desde el navegador.
    (Pídemelo y lo añado al script.)

## Cambiar el usuario mostrado
El botón "Seguir" y los enlaces usan el `username` que devuelve la API. Mientras tanto, en
`instagram.json` (ejemplo) y en el botón de la home está como placeholder **`live.lab`** —
dime el handle real y lo ajusto.
