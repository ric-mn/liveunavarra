# LIVE Lab web — análisis y roadmap

Estrategia base: **sitio estático** (HTML/CSS/JS) en GitHub Pages + **servicios de terceros / serverless solo donde haga falta backend**. No WordPress. Objetivo: web completamente funcional, optimizada para SEO y lista para campañas.

Prioridades: **P0** = imprescindible para lanzar · **P1** = necesario para SEO/anuncios · **P2** = mejoras/crecimiento.

---

## 1. Funcionalidad — que la web esté "completa"

### Contenido (P0) — necesita info real del lab
- [ ] Servicios reales en **LIVEperformance** y **LIVEdevelopment** (nombre, descripción, duración/precio si se muestra, icono).
- [ ] Stats reales (ahora +200 / 18 / 6 / 12+ son placeholders).
- [ ] Proyectos a mostrar públicamente (¿cuáles? TC-LV, SSB… con qué nivel de detalle público).
- [ ] Blog: posts reales enlazados a los papers; la home muestra 3 + botón "ver todas" inerte.
- [ ] Datos de contacto: dirección, teléfono, email, horario, ubicación (mapa).
- [ ] Fotos reales (ahora hay placeholders 📸) + logo real (ahora es texto "live").

### Páginas/secciones que el nav promete pero no existen (P0/P1)
- [ ] **Investigación** (link del nav → ahora apunta a #proyectos). Decidir: sección propia (líneas de investigación, publicaciones) o quitarla.
- [ ] **Blog**: listado completo + páginas de cada post (o enlazar a donde vivan).
- [ ] (Opcional) páginas de detalle por servicio.

### Elementos interactivos hoy inertes (P0)
- [ ] Botones (Reservar, Quiero una evaluación, Ver disponibilidad, Ver estudios, Ver publicaciones) → destino/acción real.
- [ ] **Sistema de reservas** (el CTA central) → embeber Google Appointment Scheduling o Cal.com con sincronización a Google Calendar.
- [ ] **Formulario de contacto**: GitHub Pages no procesa formularios → usar **Formspree / Web3Forms** (gratis) o función serverless. Botón **WhatsApp Business** (muy efectivo para servicio local en España).

### Legal — OBLIGATORIO en España (P0, bloquea lanzar con anuncios/analytics)
- [x] **Aviso legal**, **Política de privacidad**, **Política de cookies** → `legal.html` (titular UPNA, CIF Q3150012G, DPD oficial, hosting GitHub). Footer cableado en todas las páginas. _Pendiente: validación por Asesoría Jurídica/DPD UPNA + rellenar encargados según herramientas finales._
- [x] **Banner de consentimiento de cookies** → `cookies.js` (RGPD/AEPD: aceptar/rechazar/configurar al mismo nivel, granular, revocable; no carga nada hasta consentir; enlace "Configurar cookies" en footer).

---

## 2. SEO

### Técnico on-page (P1) — esto lo implemento yo
- [x] `<title>` y `meta description` únicos por página (index, servicios, legal).
- [x] **Open Graph + Twitter Card**. **og-image.png (1200×630)** creada ✓.
- [x] URLs canónicas.
- [x] **JSON-LD structured data**: `SportsActivityLocation` + `WebSite` (home), `BreadcrumbList`, `Blog`/`Article` (blog) y `FAQPage` (faq). _Falta geo/teléfono/horario cuando se confirmen._
- [x] `sitemap.xml` + `robots.txt`.
- [x] favicon + **manifest + iconos PNG (192/512/apple-touch)** ✓. _Falta revisar `alt` cuando haya imágenes reales._
- [~] Rendimiento: **fuente Inter auto-alojada** ✓ (`fonts.css`, sin Google Fonts). Pendiente: imágenes WebP/AVIF + lazy-load cuando haya fotos.

### ⚠️ Decisión importante: SEO bilingüe
El toggle ES/EN actual es **JavaScript** → Google solo indexa el español. Para posicionar en **ambos idiomas** hace falta **URLs separadas por idioma** (`/` y `/en/`) con etiquetas `hreflang`. Decisión: (a) mantener toggle JS y posicionar solo en ES, o (b) generar páginas EN reales para SEO en inglés. Recomendado (b) si el inglés importa para captar deportistas internacionales.

### SEO local (P1) — clave para un lab físico
- [ ] **Google Business Profile** (ficha de Google, separada de la web pero decisiva para "test de esfuerzo Pamplona", etc.).
- [ ] NAP consistente (nombre/dirección/teléfono iguales en web y ficha) + mapa embebido.
- [ ] Páginas/contenido orientado a búsquedas locales ("valoración rendimiento Navarra"…).

---

## 3. Analítica y medición (P1 — necesario antes de anuncios)
- [~] **Decidido: Cloudflare Web Analytics** (sin cookies, sin consentimiento → mínima fricción RGPD). Pendiente: crear cuenta + pegar token al desplegar (ver `SETUP_ANALYTICS.md`).
- [ ] **Meta Pixel** (conversiones + retargeting de las campañas de Instagram).
- [ ] **Google Search Console** (verificar sitio, vigilar indexación/SEO).
- [ ] Eventos de conversión (reserva completada, formulario enviado).

---

## 4. Integraciones de marketing y crecimiento (P1/P2)
- [ ] **Instagram**: Meta Pixel (P1); opcional feed embebido + CTA "Reservar" desde la bio.
- [ ] **Strava** (P2): definir alcance — *enlazar/embeber* el club (trivial, estático) vs *traer datos* (login Strava, leer actividades → necesita **función serverless** con OAuth, no WordPress).
- [ ] **Captación de email / newsletter** (Mailchimp/Brevo embed) para leads.
- [ ] Enlaces sociales reales en el footer (ahora Instagram/Patreon placeholder).

---

## 5. Infraestructura, calidad y accesibilidad (P0/P1)
- [ ] Desplegar en **GitHub Pages** (juntos) + **dominio `live.unavarra.es`** + DNS + HTTPS.
- [ ] **Extraer CSS compartido** a `liveunavarra.css` (ahora cada página lo lleva inline → riesgo de divergencia al crecer).
- [x] Página **404** (`404.html`, noindex, bilingüe).
- [ ] **Accesibilidad (a11y)**: contraste, estados de foco, navegación por teclado, `aria`, `prefers-reduced-motion` (la animación de pulso), alt en imágenes.
- [ ] Pruebas en navegadores/móvil.

## 6. Gestión de contenido — la "respuesta a WordPress"
- [ ] Si quieres editar el blog/servicios **sin tocar código**: un **CMS headless basado en git** (Decap/Sveltia CMS) es gratis, funciona con GitHub Pages y da un panel de edición. Es el "WordPress-lite" sin servidor ni mantenimiento. (P2, si hace falta.)

---

## 7. Proyectos de futuro (negocio y captación)
- [ ] **Testimonios** de clientes/deportistas (sección con citas + nombre/foto, con consentimiento).
- [ ] **Colaboradores / partners**: sección **al final de la home, con sus logos**, cuando los tengamos (clubes, marcas e instituciones colaboradoras).
- [ ] **Patrocinio de pruebas deportivas**: ofrecer patrocinio a organizadores de eventos a cambio de **sortear pruebas de esfuerzo** entre los participantes (captación de leads + visibilidad). Definir mecánica del sorteo, landing de captación y bases legales del sorteo.
- [ ] **Portal de resultados con login** (PAUSADO): que el cliente consulte sus resultados e imprima su informe. Requiere backend (Supabase/Firebase) + **RGPD de datos de salud — art. 9** → validación previa de DPD/Asesoría UPNA. Alternativa ligera: informe por enlace/código privado.
- [x] **FAQ** (`faq.html`, bilingüe + `FAQPage`, respuestas aprobadas). **Enlazada en el pie** de todas las páginas.

---

## Lo que necesito de ti (contenido + cuentas + decisiones)
**Contenido:** servicios reales por sección · stats reales · proyectos públicos · datos de contacto (dirección/tel/email/horario) · logo y fotos reales.
**Cuentas/accesos:** ¿usáis **Google Workspace**? (para reservas/Calendar) · cuenta **Meta Business / Instagram** (Pixel + ads) · **Strava** (club o app API) · acceso al **DNS de live.unavarra.es** · cuenta **GitHub**.
**Decisiones:** (1) SEO bilingüe — ¿páginas `/en/` reales o solo ES? · (2) herramienta de reservas (Google Appointment vs Cal.com) · (3) qué significa exactamente "coordinar con Strava" · (4) Analytics: GA4 vs Plausible/Cloudflare (privacy-friendly).

## Orden propuesto
1. **Cerrar contenido** (servicios, contacto, stats) — lo tuyo.
2. **SEO-ready técnico + legal** (meta/OG/schema/sitemap + privacidad/cookies) — lo mío.
3. **Reservas** (embed + Google Calendar).
4. **Analítica + Meta Pixel** (deja la web lista para campañas).
5. **Desplegar** en GitHub Pages + `live.unavarra.es`.
6. Luego: Strava, newsletter, CMS, SEO bilingüe si procede.
