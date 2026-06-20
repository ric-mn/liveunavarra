/* LIVE Lab — banner de consentimiento de cookies (RGPD / LSSI / guía AEPD-EDPB)
 * - El sitio NO usa cookies analíticas ni publicitarias. La medición de tráfico
 *   (Cloudflare Web Analytics) es agregada y SIN cookies, por lo que no requiere consentimiento.
 * - Solo el "contenido externo" (mapas de Google y la agenda de Cal.com) puede instalar
 *   cookies de terceros: se carga únicamente tras el consentimiento del usuario.
 * - Rechazar es tan fácil como aceptar; consentimiento revocable y almacenado localmente (demostrable).
 */
(function () {
  "use strict";
  var KEY = "liveunavarra-cookie-consent";
  var VERSION = 3;

  var STR = {
    es: {
      title: "Cookies",
      body: "Usamos cookies propias para el funcionamiento del sitio y, con tu permiso, para mostrar contenido externo (mapas y reservas). Puedes aceptarlas, rechazarlas o configurarlas. Más información en la ",
      policy: "Política de cookies",
      accept: "Aceptar todo",
      reject: "Rechazar todo",
      config: "Configurar",
      save: "Guardar preferencias",
      settingsTitle: "Preferencias de cookies",
      always: "Siempre activas",
      close: "Cerrar",
      cats: {
        necessary: ["Necesarias", "Imprescindibles para el funcionamiento básico del sitio. No se pueden desactivar."],
        external: ["Contenido externo", "Cargar mapas (Google Maps) y la agenda de reservas (Cal.com), que son servicios de terceros y pueden instalar cookies."]
      }
    },
    en: {
      title: "Cookies",
      body: "We use our own cookies to run the site and, with your permission, to show external content (maps and booking). You can accept, reject or configure them. More information in our ",
      policy: "Cookie policy",
      accept: "Accept all",
      reject: "Reject all",
      config: "Configure",
      save: "Save preferences",
      settingsTitle: "Cookie preferences",
      always: "Always on",
      close: "Close",
      cats: {
        necessary: ["Necessary", "Essential for the basic operation of the site. Cannot be disabled."],
        external: ["External content", "Load maps (Google Maps) and the booking calendar (Cal.com), third-party services that may set cookies."]
      }
    }
  };

  function lang() {
    var l = document.documentElement.lang;
    if (l !== "es" && l !== "en") {
      try { l = localStorage.getItem("liveunavarra-lang"); } catch (e) {}
    }
    return l === "en" ? "en" : "es";
  }

  function read() {
    try { return JSON.parse(localStorage.getItem(KEY) || "null"); } catch (e) { return null; }
  }
  function write(external) {
    var data = { v: VERSION, external: !!external, ts: new Date().toISOString() };
    try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) {}
    notify(data);
    return data;
  }
  function notify(data) {
    try { document.dispatchEvent(new CustomEvent("cookie:change", { detail: data || read() })); } catch (e) {}
  }
  // El contenido externo se carga desde cada página comprobando
  // cookieConsent.get('external') y escuchando el evento 'cookie:change'.

  // ---- styles (injected once) ----
  var CSS =
    ".ll-cc-overlay{position:fixed;inset:0;background:rgba(17,24,39,.45);z-index:9998;display:none;}" +
    ".ll-cc-overlay.open{display:block;}" +
    ".ll-cc{position:fixed;left:24px;bottom:24px;max-width:420px;width:calc(100% - 48px);" +
      "background:#FFF;border:1px solid #E5E7EB;border-radius:16px;box-shadow:0 20px 50px rgba(17,24,39,.18);" +
      "padding:22px 24px;z-index:9999;font-family:'Inter',system-ui,sans-serif;color:#4B5563;display:none;}" +
    ".ll-cc.open{display:block;}" +
    ".ll-cc h2{font-size:17px;font-weight:800;color:#111827;margin:0 0 8px;letter-spacing:-.01em;}" +
    ".ll-cc p{font-size:13.5px;line-height:1.55;margin:0 0 16px;}" +
    ".ll-cc a{color:#0EA5A0;text-decoration:underline;}" +
    ".ll-cc-actions{display:flex;gap:10px;flex-wrap:wrap;}" +
    ".ll-cc-btn{flex:1 1 auto;min-width:96px;padding:10px 14px;border-radius:9px;font-size:13.5px;font-weight:600;" +
      "cursor:pointer;border:1px solid #E5E7EB;background:#FFF;color:#111827;transition:background .15s,border-color .15s;}" +
    ".ll-cc-btn:hover{background:#F3F4F6;}" +
    ".ll-cc-btn.primary{border:none;color:#FFF;background:linear-gradient(90deg,#2DD4BF,#FB923C,#F43F5E,#818CF8);}" +
    ".ll-cc-btn.primary:hover{opacity:.92;}" +
    ".ll-cc-link{background:none;border:none;color:#4B5563;font-size:12.5px;font-weight:600;cursor:pointer;" +
      "text-decoration:underline;padding:8px 4px;flex:0 0 auto;}" +
    ".ll-cc-row{display:flex;justify-content:space-between;align-items:flex-start;gap:14px;padding:12px 0;border-top:1px solid #F3F4F6;}" +
    ".ll-cc-row h3{font-size:14px;font-weight:700;color:#111827;margin:0 0 2px;}" +
    ".ll-cc-row small{font-size:12px;color:#6B7280;line-height:1.45;display:block;}" +
    ".ll-cc-always{font-size:12px;font-weight:600;color:#6B7280;white-space:nowrap;padding-top:2px;}" +
    ".ll-sw{position:relative;width:42px;height:24px;flex:0 0 auto;margin-top:2px;}" +
    ".ll-sw input{opacity:0;width:0;height:0;position:absolute;}" +
    ".ll-sw span{position:absolute;inset:0;background:#E5E7EB;border-radius:999px;transition:background .2s;cursor:pointer;}" +
    ".ll-sw span::before{content:'';position:absolute;height:18px;width:18px;left:3px;top:3px;background:#FFF;border-radius:50%;transition:transform .2s;box-shadow:0 1px 3px rgba(0,0,0,.2);}" +
    ".ll-sw input:checked + span{background:#2DD4BF;}" +
    ".ll-sw input:checked + span::before{transform:translateX(18px);}" +
    ".ll-cc-save{margin-top:16px;}" +
    "@media(max-width:560px){.ll-cc{left:12px;right:12px;bottom:12px;width:auto;padding:18px;}.ll-cc-btn{flex:1 1 100%;}}";

  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  var overlay, banner, t;

  function buildSwitch(id, checked, disabled) {
    var wrap = el("label", "ll-sw");
    var inp = el("input");
    inp.type = "checkbox"; inp.id = id; inp.checked = checked; if (disabled) inp.disabled = true;
    wrap.appendChild(inp);
    wrap.appendChild(el("span"));
    return wrap;
  }

  function render(mode) {
    // mode: "banner" | "settings"
    t = STR[lang()];
    banner.innerHTML = "";
    var existing = read() || { external: false };

    if (mode === "settings") {
      var head = el("div");
      head.appendChild(el("h2", null, t.settingsTitle));
      banner.appendChild(head);

      var cats = [
        { id: "necessary", on: true, lock: true },
        { id: "external", on: existing.external, lock: false }
      ];
      cats.forEach(function (c) {
        var row = el("div", "ll-cc-row");
        var left = el("div");
        left.appendChild(el("h3", null, t.cats[c.id][0]));
        left.appendChild(el("small", null, t.cats[c.id][1]));
        row.appendChild(left);
        if (c.lock) {
          row.appendChild(el("span", "ll-cc-always", t.always));
        } else {
          row.appendChild(buildSwitch("ll-sw-" + c.id, c.on, false));
        }
        banner.appendChild(row);
      });

      var saveBtn = el("button", "ll-cc-btn primary ll-cc-save", t.save);
      saveBtn.style.width = "100%";
      saveBtn.addEventListener("click", function () {
        var x = document.getElementById("ll-sw-external");
        finish(x && x.checked);
      });
      banner.appendChild(saveBtn);
    } else {
      banner.appendChild(el("h2", null, t.title));
      var p = el("p", null, t.body);
      var link = el("a", null, t.policy);
      link.href = "legal.html#cookies";
      p.appendChild(link);
      p.insertAdjacentText("beforeend", ".");
      banner.appendChild(p);

      var actions = el("div", "ll-cc-actions");
      var reject = el("button", "ll-cc-btn", t.reject);
      var accept = el("button", "ll-cc-btn primary", t.accept);
      reject.addEventListener("click", function () { finish(false); });
      accept.addEventListener("click", function () { finish(true); });
      actions.appendChild(reject);
      actions.appendChild(accept);
      banner.appendChild(actions);

      var cfg = el("button", "ll-cc-link", t.config);
      cfg.addEventListener("click", function () { render("settings"); });
      banner.appendChild(cfg);
    }
  }

  function finish(external) {
    write(external);
    close();
  }
  function open(mode) {
    render(mode || "banner");
    banner.classList.add("open");
    if (mode === "settings") overlay.classList.add("open");
  }
  function close() {
    banner.classList.remove("open");
    overlay.classList.remove("open");
  }

  function init() {
    var style = el("style"); style.textContent = CSS; document.head.appendChild(style);
    overlay = el("div", "ll-cc-overlay");
    overlay.addEventListener("click", close);
    banner = el("aside", "ll-cc");
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-label", "Cookies");
    document.body.appendChild(overlay);
    document.body.appendChild(banner);

    var saved = read();
    if (saved && saved.v !== VERSION) saved = null;   // nueva versión de consentimiento → volver a preguntar
    if (!saved) open("banner");                        // primera visita / versión nueva: preguntar

    // re-render text if the user flips the site language while the dialog is open
    var lt = document.getElementById("langToggle");
    if (lt) lt.addEventListener("click", function () {
      if (banner.classList.contains("open")) {
        setTimeout(function () { render(overlay.classList.contains("open") ? "settings" : "banner"); }, 0);
      }
    });

    // public hook + delegated trigger so any [data-cookie-settings] link reopens
    // the panel (delegation survives the i18n innerHTML swap on language toggle)
    window.openCookieSettings = function () { open("settings"); };
    window.cookieConsent = {
      get: function (c) { var d = read(); return !!(d && d.v === VERSION && d[c]); },
      grant: function (c) { var d = read(); if (!d || d.v !== VERSION) d = {}; d[c] = true; write(c === "external" ? true : d.external); },
      open: function () { open("settings"); }
    };
    document.addEventListener("click", function (e) {
      var trg = e.target.closest && e.target.closest("[data-cookie-settings]");
      if (trg) { e.preventDefault(); open("settings"); }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
