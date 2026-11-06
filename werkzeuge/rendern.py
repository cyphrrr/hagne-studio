#!/usr/bin/env python3
"""Rendert ein Drehbuch Bild für Bild (12 fps Legetrick) zu einem MP4 mit Ton.

  python3 werkzeuge/rendern.py drehbuecher/guertel.json
         --ton pfad.mp3      Tonspur (Standard: ton/<ton.mix aus dem Drehbuch>, falls vorhanden)
         --von 20 --bis 30   nur einen Ausschnitt rendern (zum Testen)
         --hoehe 720         kleinere Auflösung (Standard 1080)
         -o folge.mp4        Zielpfad (Standard: dist/<ID>.mp4)

Braucht Playwright + Chromium und ffmpeg.
"""
import json, sys, subprocess, pathlib, shutil, tempfile

ROOT = pathlib.Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / 'werkzeuge'))
from buendeln import buendeln

def opt(args, name, default=None):
    return args[args.index(name) + 1] if name in args else default

def main(args):
    if not args: sys.exit(__doc__)
    pfad = pathlib.Path(args[0]); db = json.loads(pfad.read_text(encoding='utf-8'))
    e = db['episode']; fps = e.get('fps', 12)
    von = float(opt(args, '--von', 0)); bis = min(float(opt(args, '--bis', e['dauer'])), e['dauer'])
    hoehe = int(opt(args, '--hoehe', 1080)); breite = round(hoehe * 16 / 9 / 2) * 2
    ziel = pathlib.Path(opt(args, '-o', ROOT / 'dist' / f"{e['id']}.mp4")); ziel.parent.mkdir(parents=True, exist_ok=True)
    ton = opt(args, '--ton')
    if not ton and db.get('ton', {}).get('mix'):
        for kandidat in (ROOT / 'ton' / db['ton']['mix'], pfad.parent / db['ton']['mix']):
            if kandidat.exists(): ton = str(kandidat); break
    from playwright.sync_api import sync_playwright
    tmp = pathlib.Path(tempfile.mkdtemp()) / 'player.html'
    tmp.write_text(buendeln([pfad]), encoding='utf-8')
    cmd = ['ffmpeg', '-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', str(fps), '-i', '-']
    if ton: cmd += ['-ss', str(von), '-i', ton]
    cmd += ['-r', '24', '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '20', '-pix_fmt', 'yuv420p']
    if ton: cmd += ['-c:a', 'aac', '-b:a', '192k', '-shortest']
    cmd += [str(ziel)]
    ff = subprocess.Popen(cmd, stdin=subprocess.PIPE)
    chrome = next((p for p in (shutil.which('chromium'), shutil.which('google-chrome'), shutil.which('chromium-browser')) if p), None)
    n0, n1 = round(von * fps), round(bis * fps)
    with sync_playwright() as p:
        b = p.chromium.launch(executable_path=chrome, args=['--no-sandbox']) if chrome else p.chromium.launch()
        pg = b.new_page(viewport={'width': breite, 'height': hoehe})
        pg.goto(tmp.as_uri() + '?render'); pg.wait_for_function('window.HAGNE_BEREIT===true'); pg.wait_for_timeout(800)
        for f in range(n0, n1):
            pg.evaluate(f'renderAt({f / fps})')
            ff.stdin.write(pg.screenshot(type='png'))
            if (f - n0) % (fps * 5) == 0: print(f'  {f / fps:5.1f} s / {bis:.1f} s', flush=True)
        b.close()
    ff.stdin.close(); ff.wait()
    print(f"{ziel}  ({n1 - n0} Bilder, {'mit' if ton else 'ohne'} Ton)")

if __name__ == '__main__':
    main(sys.argv[1:])
