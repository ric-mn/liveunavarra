#!/usr/bin/env python3
"""Descarga las últimas publicaciones de Instagram (Graph API) y escribe instagram.json.

El token se lee de la variable de entorno IG_TOKEN (un *secret* de GitHub Actions).
NUNCA se escribe el token en el código ni en el JSON de salida.

Uso local (solo para pruebas, no commitees el token):
    IG_TOKEN=xxxx python3 scripts/fetch_instagram.py
"""
from __future__ import annotations

import datetime
import json
import os
import sys
import urllib.parse
import urllib.request

TOKEN = os.environ.get("IG_TOKEN")
LIMIT = int(os.environ.get("IG_LIMIT", "9"))
OUT = os.environ.get("IG_OUT", "instagram.json")
FIELDS = "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp"
BASE = "https://graph.instagram.com"


def _get(url: str) -> dict:
    req = urllib.request.Request(url, headers={"User-Agent": "liveunavarra-feed"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.load(r)


def main() -> None:
    if not TOKEN:
        print("ERROR: IG_TOKEN no está definido.", file=sys.stderr)
        sys.exit(1)

    me = _get(f"{BASE}/me?" + urllib.parse.urlencode(
        {"fields": "username", "access_token": TOKEN}))
    media = _get(f"{BASE}/me/media?" + urllib.parse.urlencode(
        {"fields": FIELDS, "limit": LIMIT, "access_token": TOKEN}))

    posts = []
    for m in media.get("data", []):
        posts.append({
            "id": m.get("id"),
            "caption": (m.get("caption") or "").strip(),
            "media_type": m.get("media_type"),
            "media_url": m.get("media_url"),
            "thumbnail_url": m.get("thumbnail_url"),
            "permalink": m.get("permalink"),
            "timestamp": m.get("timestamp"),
        })

    data = {
        "profile": {"username": me.get("username")},
        "updated": datetime.datetime.utcnow().replace(microsecond=0).isoformat() + "Z",
        "posts": posts,
    }
    with open(OUT, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write("\n")
    print(f"OK: {len(posts)} publicaciones escritas en {OUT}")


if __name__ == "__main__":
    main()
