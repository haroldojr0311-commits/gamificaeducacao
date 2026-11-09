"""Cria a versão de demonstração aberta (5 min/dia) de um jogo.
Uso: python3 _ferramentas/criar_demo.py <id-do-catalogo> <arquivo-do-jogo.html>
Escreve demo/<id>.html (sem indexação) e confira se o id está em turma/demos.json."""
import os, re, sys
raiz = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
id_, arq = sys.argv[1], sys.argv[2]
assert re.fullmatch(r'[a-z0-9-]{2,60}', id_), 'id inválido'
h = open(arq, encoding='utf-8').read()
h = re.sub(r'<meta name="robots"[^>]*>', '', h)
h = re.sub(r'<head[^>]*>', lambda m: m.group(0) + '\n<meta name="robots" content="noindex">', h, count=1, flags=re.I)
assert '</body>' in h.lower(), 'sem </body>'
i = h.lower().rindex('</body>')
h = h[:i] + f'<script src="demo.js" data-id="{id_}"></script>\n<script src="../estat.js" defer></script>\n' + h[i:]
os.makedirs(os.path.join(raiz, 'demo'), exist_ok=True)
open(os.path.join(raiz, 'demo', id_ + '.html'), 'w', encoding='utf-8').write(h)
print('demo criada:', id_, f'{len(h)/1024:.0f} KB')
