# -*- coding: utf-8 -*-
from pathlib import Path

root = Path(__file__).resolve().parent.parent
snippet_root = '<script src="js/site-config.js"></script>\n<script src="js/schema-manifest.js"></script>\n'
snippet_sub = '<script src="../js/site-config.js"></script>\n<script src="../js/schema-manifest.js"></script>\n'

for html in root.rglob('*.html'):
    if 'fragments' in html.parts or html.name == 'index.html':
        continue
    if 'conditions/central-hk.html' in str(html).replace('\\', '/'):
        continue
    text = html.read_text(encoding='utf-8')
    if 'site-config.js' in text:
        continue
    if '../js/search-index.js' in text:
        text = text.replace('<script src="../js/search-index.js"></script>', snippet_sub + '<script src="../js/search-index.js"></script>', 1)
    elif '<script src="js/search-index.js"></script>' in text:
        text = text.replace('<script src="js/search-index.js"></script>', snippet_root + '<script src="js/search-index.js"></script>', 1)
    elif '<script src="js/dongfang.js"></script>' in text:
        text = text.replace('<script src="js/dongfang.js"></script>', snippet_root + '<script src="js/dongfang.js"></script>', 1)
    elif '<script src="../js/dongfang.js"></script>' in text:
        text = text.replace('<script src="../js/dongfang.js"></script>', snippet_sub + '<script src="../js/dongfang.js"></script>', 1)
    html.write_text(text, encoding='utf-8')
    print('updated', html.relative_to(root))
