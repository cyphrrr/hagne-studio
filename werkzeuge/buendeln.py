#!/usr/bin/env python3
"""Bündelt Player, Bibliothek und Drehbücher zu einer einzigen HTML-Datei.

Die Datei läuft ohne Webserver (Doppelklick, auch offline auf der Party).
Die Tonspur (ton.mix im Drehbuch) wird neben der Datei erwartet oder im Player über „Ton laden“ gewählt.

  python3 werkzeuge/buendeln.py                      -> dist/HAGNE-PLAYER.html mit allen Folgen
  python3 werkzeuge/buendeln.py drehbuecher/x.json   -> nur diese Folge(n)
  python3 werkzeuge/buendeln.py -o pfad.html ...     -> anderer Zielpfad
"""
import json, re, sys, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent

def drehbuecher(args):
    if args:
        return [pathlib.Path(a) for a in args]
    idx = json.loads((ROOT / 'drehbuecher/index.json').read_text(encoding='utf-8'))
    return [ROOT / 'drehbuecher' / f['datei'] for f in idx['folgen']]

def buendeln(pfade):
    html = (ROOT / 'index.html').read_text(encoding='utf-8')
    tags = ''.join('<script type="application/json" class="drehbuch">'
                   + json.dumps(json.loads(p.read_text(encoding='utf-8')), ensure_ascii=False, separators=(',', ':'))
                   + '</script>\n' for p in pfade)
    def inline(m):
        return '<script>\n' + (ROOT / m.group(1)).read_text(encoding='utf-8') + '</script>'
    erster = html.index('<script src=')
    html = html[:erster] + tags + html[erster:]
    return re.sub(r'<script src="([^"]+)"></script>', inline, html)

if __name__ == '__main__':
    args = sys.argv[1:]
    ziel = ROOT / 'dist/HAGNE-PLAYER.html'
    if '-o' in args:
        i = args.index('-o'); ziel = pathlib.Path(args[i + 1]); del args[i:i + 2]
    ziel.parent.mkdir(parents=True, exist_ok=True)
    ziel.write_text(buendeln(drehbuecher(args)), encoding='utf-8')
    print(f'{ziel} ({ziel.stat().st_size // 1024} KB)')
