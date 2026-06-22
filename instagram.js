/* LIVE Lab — render del feed de Instagram.
 * Lee instagram.json (generado por la GitHub Action) y pinta las últimas publicaciones.
 * No usa ningún token: el token vive solo en la capa serverless (GitHub Actions secret).
 * Si no hay datos, oculta la sección con elegancia. */
(function () {
  "use strict";
  var grid = document.getElementById("ig-grid");
  if (!grid) return;
  var MAX = 4;

  function esc(s) {
    return (s || "").replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function hideSection() {
    var s = document.getElementById("ig-card");
    if (s) s.style.display = "none";
  }

  function render(posts) {
    if (!posts || !posts.length) { hideSection(); return; }
    grid.innerHTML = "";
    posts.slice(0, MAX).forEach(function (p) {
      var a = document.createElement("a");
      a.className = "ig-item";
      a.href = p.permalink || "#";
      a.target = "_blank";
      a.rel = "noopener";
      var cap = esc(p.caption || "").slice(0, 110);
      var media = p.media_url || (p.media_type === "VIDEO" ? p.thumbnail_url : "");
      if (media) {
        a.innerHTML = '<img loading="lazy" src="' + esc(media) + '" alt="' +
          (cap || "Instagram") + '"><span class="ig-cap">' + cap + "</span>";
      } else {
        a.innerHTML = '<span class="ig-ph">' + (cap || "📷") + "</span>";
      }
      grid.appendChild(a);
    });
  }

  fetch("instagram.json", { cache: "no-store" })
    .then(function (r) { if (!r.ok) throw 0; return r.json(); })
    .then(function (d) {
      render(d.posts || []);
      if (d.profile && d.profile.username) {
        var f = document.getElementById("ig-follow");
        if (f) f.href = "https://instagram.com/" + d.profile.username;
      }
    })
    .catch(hideSection);
})();
