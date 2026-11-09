#!/usr/bin/env python3
"""Prüft ein Drehbuch gegen die Bibliothek und erstellt auf Wunsch einen Kontaktbogen.

  python3 werkzeuge/pruefen.py drehbuecher/guertel.json            -> nur Prüfung (braucht Node.js)
  python3 werkzeuge/pruefen.py drehbuecher/guertel.json --bilder   -> zusätzlich Kontaktbogen-PNG
         --zeiten 1,4.5,12   eigene Zeitpunkte statt 12 gleichmäßig verteilter
         -o bogen.png        Zielpfad (Standard: dist/<ID>-kontaktbogen.png)

Prüfung: Fehlen Figuren, Gesten, Kulissen, Requisiten oder Gegenstände in der Bibliothek?
Passen IDs, Zeiten, Szenen und Kamera? Kontaktbogen: braucht Playwright + Chromium und Pillow.
Exit-Code 1, wenn Fehler gefunden wurden.
"""
import json, sys, subprocess, pathlib, shutil, tempfile

ROOT = pathlib.Path(__file__).resolve().parent.parent
MODULE = ['basis', 'kulissen', 'requisiten', 'figuren-v2', 'figuren-orga', 'gegenstaende', 'gesten']

def bibliothek():
    """Lädt die Bibliothek in Node (ohne Browser) und liest die Namen aller Bausteine aus."""
    code = "const vm=require('vm');const fs=require('fs');const ctx={document:{getElementById:()=>null,querySelectorAll:()=>[]},console};vm.createContext(ctx);"
    code += ''.join(f"vm.runInContext(fs.readFileSync({json.dumps(str(ROOT / 'bibliothek' / (m + '.js')))},'utf8'),ctx);" for m in MODULE)
    code += ("console.log(JSON.stringify(vm.runInContext('({figuren:Object.keys(FIGUREN),gesten:Object.keys(GESTEN),"
             "kulissen:Object.keys(KULISSEN),requisiten:Object.keys(REQUISITEN),gegenstaende:Object.keys(GEGENSTAENDE),"
             "arten:Object.keys(GEGENSTAND_ARTEN),brauen:Object.keys(BRAUEN),mund:Object.keys(MUND)})',ctx)));")
    out = subprocess.run(['node', '-e', code], capture_output=True, text=True)
    if out.returncode:
        sys.exit('Bibliothek lässt sich nicht laden:\n' + out.stderr)
    return {k: set(v) for k, v in json.loads(out.stdout).items()}

def pruefe(db, lib):
    F, W = [], []  # Fehler, Warnungen
    dauer = db['episode']['dauer']
    ids = {b['id'] for b in db['besetzung']}
    szenen = db.get('szenen') or [{'kulisse': db.get('kulisse')}]
    for s in szenen:
        k = s.get('kulisse') or db.get('kulisse')
        if not k: F.append(f"Szene {s.get('id', '?')}: keine Kulisse"); continue
        if k['id'] not in lib['kulissen']: F.append(f"Kulisse fehlt: {k['id']}")
        for r in k.get('requisiten', []):
            if r['id'] not in lib['requisiten']: F.append(f"Requisite fehlt: {r['id']}")
    if db.get('szenen'):
        S = sorted(db['szenen'], key=lambda s: s['von'])
        if S[0]['von'] > 0: F.append('Szenen: keine Szene ab 0 s')
        for a, b in zip(S, S[1:]):
            if abs(a['bis'] - b['von']) > 1e-6: F.append(f"Szenen: Lücke oder Überlappung bei {a['bis']} / {b['von']} s")
        if S[-1]['bis'] < dauer: W.append('Szenen: letzte Szene endet vor dem Episodenende')
        for s in S:
            for i in (s.get('besetzung') or {}):
                if i not in {b['id'] for b in db['besetzung']}: F.append(f"Szene {s.get('id', '?')}: unbekannte Figur-ID {i}")
        for i, a in enumerate(db['aktionen']):
            if not any(s['von'] - 1e-6 <= a['von'] and a['bis'] <= s['bis'] + 1e-6 for s in S):
                W.append(f"Aktion {i + 1} ({a.get('geste')}): reicht über einen Schnitt")
    for b in db['besetzung']:
        if b['figur'] not in lib['figuren']: F.append(f"Figur fehlt: {b['figur']}")
        if b.get('hand_rechts') and b['hand_rechts'] not in lib['gegenstaende']: F.append(f"Gegenstand fehlt: {b['hand_rechts']}")
        if isinstance(b.get('brauen'), str) and b['brauen'] not in lib['brauen']: F.append(f"Brauen-Vorlage fehlt: {b['brauen']}")
    gg = {g['id'] for g in db.get('gegenstaende', [])}
    for g in db.get('gegenstaende', []):
        if g['art'] not in lib['arten']: F.append(f"Gegenstand-Art fehlt: {g['art']}")
    for i, a in enumerate(db['aktionen']):
        wo = f"Aktion {i + 1} ({a.get('geste')})"
        wer = a['wer'] if isinstance(a['wer'], list) else [a['wer']]
        if a.get('geste') not in lib['gesten']: F.append(f"Geste fehlt: {a.get('geste')}")
        for w in wer:
            if w not in ids: F.append(f"{wo}: unbekannte Figur-ID {w}")
        if 'bis' not in a: F.append(f"{wo}: 'bis' fehlt")
        elif a['bis'] <= a['von']: F.append(f"{wo}: 'bis' liegt nicht nach 'von'")
        elif a['von'] > dauer: W.append(f"{wo}: beginnt nach Episodenende")
        if a.get('geste') == 'tragen' and a.get('gegenstand') not in gg: F.append(f"{wo}: Gegenstand {a.get('gegenstand')} nicht unter 'gegenstaende'")
        if a.get('geste') == 'fallen-lassen' and a.get('gegenstand') not in lib['gegenstaende']: F.append(f"Gegenstand fehlt: {a.get('gegenstand')}")
        for k in ('wert', 'brauen'):
            v = a.get(k)
            if a.get('geste') in ('brauen', 'zucken', 'mund', 'auftauchen') and isinstance(v, str) and v not in lib['brauen'] | lib['mund']:
                F.append(f"{wo}: unbekannter Wert '{v}'")
    for d in db.get('dialog', []):
        if d.get('aus_dem_off'): continue
        if d['wer'] not in ids: F.append(f"Dialog {d.get('text') or d.get('laut')}: unbekannte Figur-ID {d['wer']}")
    kam = sorted(db['kamera'], key=lambda k: k['von'])
    if not kam or kam[0]['von'] > 0: F.append('Kamera: keine Einstellung ab 0 s')
    for a, b in zip(kam, kam[1:]):
        if abs(a['bis'] - b['von']) > 1e-6: W.append(f"Kamera: Lücke oder Überlappung bei {a['bis']} / {b['von']} s")
    if kam and kam[-1]['bis'] < dauer: W.append('Kamera: letzte Einstellung endet vor dem Episodenende (bleibt stehen)')
    sprecher = {d.get('wer') for d in db.get('dialog', []) if d.get('wer')}
    pegel = (db.get('analyse') or {}).get('pegel', {})
    if sprecher and not pegel: W.append("Keine Pegeldaten unter 'analyse' – Münder plappern gleichmäßig statt nach dem Ton")
    return F, W

def kontaktbogen(pfad, db, zeiten, ziel):
    try:
        from playwright.sync_api import sync_playwright
        from PIL import Image, ImageDraw
    except ImportError:
        sys.exit('Für den Kontaktbogen: pip install playwright pillow && playwright install chromium')
    sys.path.insert(0, str(ROOT / 'werkzeuge'))
    from buendeln import buendeln
    tmp = pathlib.Path(tempfile.mkdtemp()) / 'player.html'
    tmp.write_text(buendeln([pfad]), encoding='utf-8')
    chrome = next((p for p in (shutil.which('chromium'), shutil.which('google-chrome'), shutil.which('chromium-browser')) if p), None)
    bilder = []
    with sync_playwright() as p:
        b = p.chromium.launch(executable_path=chrome, args=['--no-sandbox']) if chrome else p.chromium.launch()
        pg = b.new_page(viewport={'width': 1280, 'height': 720})
        fehler = []
        pg.on('pageerror', lambda e: fehler.append(str(e)))
        pg.goto(tmp.as_uri() + '?render'); pg.wait_for_function('window.HAGNE_BEREIT===true'); pg.wait_for_timeout(600)
        for i, t in enumerate(zeiten):
            pg.evaluate(f'renderAt({t})'); f = tmp.parent / f'{i:03d}.png'; pg.screenshot(path=str(f)); bilder.append((t, f))
        b.close()
    w, h, sp = 480, 270, 4
    bogen = Image.new('RGB', (w * sp, h * ((len(bilder) + sp - 1) // sp)), 'black'); d = ImageDraw.Draw(bogen)
    for i, (t, f) in enumerate(bilder):
        x, y = (i % sp) * w, (i // sp) * h
        bogen.paste(Image.open(f).resize((w, h)), (x, y)); d.rectangle([x, y, x + 64, y + 18], fill='black'); d.text((x + 5, y + 4), f'{t:.1f} s', fill='yellow')
    ziel.parent.mkdir(parents=True, exist_ok=True); bogen.save(ziel)
    return fehler

if __name__ == '__main__':
    args = sys.argv[1:]
    if not args: sys.exit(__doc__)
    pfad = pathlib.Path(args[0]); db = json.loads(pfad.read_text(encoding='utf-8'))
    F, W = pruefe(db, bibliothek())
    e = db['episode']
    print(f"{e['id']} „{e['titel']}“: {len(db['besetzung'])} Figuren, {len(db['aktionen'])} Aktionen, {e['dauer']} s")
    for x in F: print('  FEHLER   ', x)
    for x in W: print('  Hinweis  ', x)
    if not F and not W: print('  alles in Ordnung')
    if '--bilder' in args:
        if '--zeiten' in args: zeiten = [float(z) for z in args[args.index('--zeiten') + 1].split(',')]
        else: zeiten = [round(e['dauer'] * (i + 0.5) / 12, 2) for i in range(12)]
        ziel = pathlib.Path(args[args.index('-o') + 1]) if '-o' in args else ROOT / 'dist' / f"{e['id']}-kontaktbogen.png"
        js = kontaktbogen(pfad, db, zeiten, ziel)
        print(f'  Kontaktbogen: {ziel}' + (f'  (JS-Fehler: {js})' if js else ''))
    sys.exit(1 if F else 0)
