# Reservas (Cal.com) — puesta en marcha

La página `reservas.html` ya está montada y los botones "Reservar" del sitio apuntan a ella.
Falta **una sola cosa tuya** (la cuenta) y **una línea mía/tuya** (tu enlace) para activarla.

## Lo que tienes que hacer tú (~5–10 min)
1. **Crea una cuenta gratis** en <https://cal.com> con `live.unavarra@gmail.com`. Elige un usuario, p. ej. **`live-lab`** → tu enlace será `cal.com/live-lab`.
2. **Conecta tu Google Calendar**: *Settings ▸ Connected calendars ▸ Google Calendar* (autoriza tu cuenta). Así las reservas se bloquean en tu calendario y evita solapamientos.
3. **Disponibilidad**: *Availability* → Lunes a Viernes, **09:00–18:00**.
4. **Crea los tipos de cita** (*Event Types*) con su duración. Propuesta a partir de vuestros servicios:

   | Tipo de cita | Duración |
   |---|---|
   | Valoración de habilidades motrices básicas | 60 min |
   | Valoración de la condición física | 60 min |
   | Valoración de la función ejecutiva | 60 min |
   | Ciclo 24 h (actividad física, sedentarismo y sueño) | 60 min |
   | Pack valoración integral · infanto-juvenil | 150 min |
   | Desarrollo deportivo a largo plazo (13–16) | (a definir) |
   | Pack de actividad inicial | (a definir) |
   | Valoración del rendimiento (LIVEperformance) | 90 min (a confirmar) |
   | Primer contacto / consulta | 30 min |

   *(Ajusta nombres y duraciones a tu gusto; los de LIVEperformance los afinamos cuando cierres protocolos.)*
5. (Opcional) En *Settings* pon **idioma español** y tu zona horaria (Europe/Madrid).

## Lo que activo yo (o tú, en 1 línea)
En `reservas.html`, arriba del script, hay esta línea:
```js
const CAL_LINK = "";
```
Pon ahí tu enlace y la agenda aparece embebida automáticamente:
- **Perfil completo** (el visitante elige el servicio): `const CAL_LINK = "live-lab";`
- **Un servicio concreto**: `const CAL_LINK = "live-lab/valoracion";` (usa el *slug* del event type)

Pásame tu usuario/slug y lo dejo puesto, o cámbialo tú (es solo esa línea).

## Privacidad (RGPD)
Cal.com es contenido de terceros (carga su script). Ya está **añadido a la política de cookies** (`legal.html`). Cuando lo actives, conviene que solo cargue **tras consentimiento** del banner de cookies (dímelo y lo conecto al banner, igual que haremos con Analytics).
