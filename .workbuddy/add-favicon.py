import re
from pathlib import Path

root = Path(r'D:/Projects/demos/front_end/indie-lab')
files = [root / 'index.html'] + sorted((root / 'articles').glob('*.html'))
snip = (
    '  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />\n'
    '  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />\n'
)
ok = skip = 0
for f in files:
    t = f.read_text(encoding='utf-8')
    if 'favicon.svg' in t:
        print('skip', f.name)
        skip += 1
        continue
    m = re.search(r'[ \t]*<link rel="stylesheet"[^\n]*\n', t)
    if not m:
        print('NO ANCHOR', f.name)
        continue
    f.write_text(t[:m.end()] + snip + t[m.end():], encoding='utf-8')
    print('ok  ', f.name)
    ok += 1
print(f'done: {ok} injected, {skip} skipped, {len(files)} total')
