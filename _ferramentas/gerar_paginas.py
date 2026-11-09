#!/usr/bin/env python3
"""Gera as páginas públicas do site a partir de turma/jogos.js:
   catalogo/ (lista e uma página por aplicação), como-funciona.html, privacidade.html,
   termos.html, sitemap.xml e robots.txt.  Rode sempre que o catálogo mudar:
       python3 _ferramentas/gerar_paginas.py
"""
import json, os, re, subprocess, html, datetime, urllib.parse

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = 'https://gamificaeducacao.com.br'
ZAP = '5515988026805'
HOJE = datetime.date.today().isoformat()

J = json.loads(subprocess.run(['node', '-e', "global.window={};require(process.argv[1]);console.log(JSON.stringify(window.JOGOS))",
                               os.path.join(RAIZ, 'turma', 'jogos.js')], capture_output=True, text=True, check=True).stdout)
J.pop('demo-porcentagem', None)
e = lambda s: html.escape(str(s or ''), quote=True)
def tipo(v): return v.get('tipo') or ('ferramenta' if v.get('ferramenta') else 'jogo')
NOME_TIPO = {'jogo': 'Jogo', 'simulador': 'Simulador', 'ferramenta': 'Ferramenta do professor'}
ICONE_TIPO = {'jogo': '🎮', 'simulador': '🔬', 'ferramenta': '🧰'}
COR = {'amarelo': '#ffe27a', 'coral': '#ffb4a6', 'verde': '#a6e4c6', 'azul': '#b9d4ff', 'lilas': '#d8c9ff', 'laranja': '#ffc88a'}
NIVEIS = ['Fundamental 1', 'Fundamental 2', 'Ensino Médio', 'Superior']
cont = {t: sum(1 for v in J.values() if tipo(v) == t) for t in NOME_TIPO}
TOTAL = len(J)

CSS = """
:root{--chao:#f3f6fb;--q:rgba(47,91,170,.11);--tinta:#1d2b53;--tinta2:#55627f;--linha:#d9e1ee;--marca:#ffd23f;--azul:#2f63d6;--verde:#12865f;--fd:'Fredoka','Nunito',system-ui,sans-serif;--fc:'Nunito',system-ui,-apple-system,'Segoe UI',Roboto,sans-serif}
*{box-sizing:border-box}html,body{margin:0}
body{background-color:var(--chao);background-image:linear-gradient(var(--q) 1px,transparent 1px),linear-gradient(90deg,var(--q) 1px,transparent 1px);background-size:26px 26px;color:var(--tinta);font-family:var(--fc);font-size:17px;line-height:1.6}
h1,h2,h3{font-family:var(--fd);font-weight:600;line-height:1.2;margin:0 0 10px}
a{color:var(--azul)}
.topo{background:linear-gradient(135deg,#1d2b53,#2f4aa0);color:#fff;padding:14px 16px}
.topo .in{max-width:1080px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}
.topo a.marca{color:#fff;text-decoration:none;font-family:var(--fd);font-size:1.5rem;font-weight:700}.topo a.marca span{color:var(--marca)}
.topo nav{display:flex;gap:6px;flex-wrap:wrap}
.topo nav a{color:#fff;text-decoration:none;font-weight:800;padding:7px 12px;border-radius:999px;background:rgba(255,255,255,.12);font-size:15px}
.topo nav a.cta{background:var(--marca);color:#1d2b53}
main{max-width:1080px;margin:0 auto;padding:22px 16px 40px}
.card{background:#fff;border:2px solid var(--linha);border-radius:18px;padding:22px;margin-bottom:18px}
.hero{text-align:center;padding:30px 20px}
.hero h1{font-size:clamp(1.8rem,4.5vw,2.8rem)}
.sub{color:var(--tinta2)}
.numeros{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px;margin:18px 0 0}
.numeros div{background:#f7f9fd;border:2px solid var(--linha);border-radius:14px;padding:12px;text-align:center}
.numeros b{display:block;font-family:var(--fd);font-size:2.2rem;line-height:1.1}
.bt{display:inline-block;text-decoration:none;font-weight:800;border-radius:14px;padding:13px 20px;background:var(--marca);color:#1d2b53;border:2px solid #e0ad00;box-shadow:0 3px 0 #e0ad00;margin:4px}
.bt.sec{background:#fff;border-color:var(--linha);box-shadow:0 3px 0 var(--linha)}
.grade{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:14px}
.item{position:relative;display:flex;flex-direction:column;background:#fff;border:2px solid var(--linha);border-radius:14px;overflow:hidden;text-decoration:none;color:var(--tinta);transition:transform .15s}
.item:hover{transform:translateY(-3px)}
.item .nota{height:80px;display:grid;place-items:center;font-size:40px;position:relative}
.item .nota small{position:absolute;left:8px;top:7px;font-size:12px;font-weight:800;background:rgba(255,255,255,.7);border-radius:99px;padding:1px 8px}
.item .c{padding:10px 12px 14px}.item h3{font-size:1.05rem;margin:0 0 4px}.item p{margin:0;font-size:14px;color:var(--tinta2);display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
.filtros{display:flex;gap:6px;flex-wrap:wrap;margin:0 0 14px}
.filtros button{font:inherit;font-weight:800;font-size:14px;border:2px solid var(--linha);background:#fff;border-radius:999px;padding:6px 12px;cursor:pointer;color:var(--tinta)}
.filtros button[aria-pressed=true]{background:#1d2b53;color:#fff;border-color:#1d2b53}
.tags{display:flex;gap:6px;flex-wrap:wrap;margin:8px 0}
.tag{background:#eef2ff;border-radius:999px;padding:3px 11px;font-weight:800;font-size:14px}
.cab-app{display:grid;grid-template-columns:130px minmax(0,1fr);gap:20px;align-items:center}
.cab-app .nota{height:130px;border-radius:16px;display:grid;place-items:center;font-size:64px}
@media(max-width:600px){.cab-app{grid-template-columns:1fr}.cab-app .nota{height:100px}}
details{border:2px solid var(--linha);border-radius:14px;padding:12px 16px;margin-bottom:10px;background:#fff}
details summary{font-weight:800;cursor:pointer}
details p{margin:8px 0 0}
.passos{counter-reset:p;display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px}
.passos div{background:#f7f9fd;border:2px solid var(--linha);border-radius:14px;padding:14px;position:relative;padding-top:42px}
.passos div::before{counter-increment:p;content:counter(p);position:absolute;left:14px;top:10px;width:28px;height:28px;border-radius:50%;background:var(--marca);font-weight:900;display:grid;place-items:center}
.legal h2{font-size:1.25rem;margin-top:22px}.legal li{margin:4px 0}
footer{text-align:center;color:var(--tinta2);font-size:14px;padding:20px 16px 30px}
footer a{margin:0 6px}
.pular{position:absolute;left:-9999px;top:8px;background:#ffd23f;color:#1d2b53;font-weight:800;padding:10px 16px;border-radius:12px;z-index:100;text-decoration:none}
.pular:focus{left:8px}
a:focus-visible,button:focus-visible,summary:focus-visible{outline:3px solid #2f63d6;outline-offset:2px}
.topo a:focus-visible{outline-color:#ffd23f}
button.bt{font:inherit;cursor:pointer}
.selo-demo{position:absolute;top:8px;right:8px;z-index:2;background:#12865f;color:#fff;font-weight:800;font-size:.75rem;padding:4px 10px;border-radius:999px}
.form label{display:block;font-weight:800;margin-top:12px}
.form input[type=text],.form input[type=email],.form textarea{width:100%;font:inherit;padding:12px;border:2px solid var(--linha);border-radius:12px;background:#fff;color:var(--tinta)}
.form textarea{min-height:110px;resize:vertical}
.form .check{display:flex;gap:10px;align-items:flex-start;font-weight:600}
.form .check input{margin-top:6px;width:20px;height:20px;flex:none}
.form .hp{position:absolute;left:-9999px;height:0;overflow:hidden}
.form .bt{margin-top:14px}
.status{margin:10px 0 0;font-weight:700;min-height:1.4em}.status.ok{color:#0b6b4a}.status.erro{color:#b3261e}
.compartilhar{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin-top:14px}
.compartilhar .ok{font-weight:800;color:#0b6b4a}
.novi{display:grid;gap:12px}.novi article{border:2px solid var(--linha);border-radius:16px;padding:14px 16px;background:#fff}
.novi time{font-size:.85rem;font-weight:800;color:var(--tinta2)}.novi h3{margin:4px 0}.novi p{margin:6px 0 0}
@media (prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important;scroll-behavior:auto!important}}
"""

def pagina(titulo, desc, corpo, caminho, extra_head='', absoluto=False):
    url = SITE + '/' + caminho
    prefixo = '/' if absoluto else ('../' * caminho.count('/') or './')
    # imagem de pré-visualização própria da aplicação (og/<slug>.png), se existir; senão, a capa do site
    slug = os.path.basename(caminho)[:-5]
    tem_og = caminho.startswith('catalogo/') and caminho != 'catalogo/index.html' and os.path.exists(os.path.join(RAIZ, 'og', slug + '.png'))
    imagem = f'{SITE}/og/{slug}.png' if tem_og else f'{SITE}/capa.png?v=3'
    trilha = [('Início', SITE + '/')]
    if caminho.startswith('catalogo/') and caminho != 'catalogo/': trilha += [('Catálogo', SITE + '/catalogo/'), (titulo.split(' · ')[0].split(':')[0], url)]
    elif caminho not in ('', '404.html'): trilha += [(titulo.split(' · ')[0], url)]
    migalhas = {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
        {"@type": "ListItem", "position": n + 1, "name": nome, "item": link} for n, (nome, link) in enumerate(trilha)]}
    extra_head += '<script type="application/ld+json">' + json.dumps(migalhas, ensure_ascii=False) + '</script>'
    return f"""<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{e(titulo)}</title>
<meta name="description" content="{e(desc)}">
<link rel="canonical" href="{url}">
<link rel="icon" href="{prefixo}favicon.ico?v=3" sizes="any">
<link rel="icon" type="image/svg+xml" href="{prefixo}icone.svg?v=3">
<link rel="apple-touch-icon" href="{prefixo}icone-180.png?v=3">
<link rel="manifest" href="{prefixo}manifest.webmanifest">
<meta name="theme-color" content="#1d2b53">
<meta property="og:type" content="website"><meta property="og:site_name" content="Gamifica Educação"><meta property="og:locale" content="pt_BR">
<meta property="og:title" content="{e(titulo)}"><meta property="og:description" content="{e(desc)}"><meta property="og:url" content="{url}">
<meta property="og:image" content="{imagem}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="{imagem}">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Nunito:wght@400;600;700;800&display=swap">
<style>{CSS}</style>
{extra_head}
</head>
<body>
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
<header class="topo"><div class="in"><a class="marca" href="{prefixo}">Gamifica <span>Educação</span></a>
<nav><a href="{prefixo}catalogo/">Catálogo</a><a href="{prefixo}mural/">Mural</a><a href="{prefixo}como-funciona.html">Como funciona</a><a class="cta" href="{prefixo}">Entrar · degustação grátis</a></nav></div></header>
<main id="conteudo">
{corpo}
</main>
<footer>Desenvolvido por <i>Prof. Dr. Haroldo Aleixo de Lima Junior</i><br>
<a href="{prefixo}catalogo/">Catálogo</a>·<a href="{prefixo}mural/">Mural Eletrônico</a>·<a href="{prefixo}novidades.html">Novidades</a>·<a href="{prefixo}como-funciona.html">Como funciona</a>·<a href="{prefixo}privacidade.html">Privacidade</a>·<a href="{prefixo}termos.html">Termos de uso</a>·<a href="https://wa.me/{ZAP}" target="_blank" rel="noopener">Contato</a></footer>
{COPIAR_JS}
<script src="{prefixo}site.js" defer></script>
<script src="{prefixo}estat.js" defer></script>
<script>if('serviceWorker' in navigator) navigator.serviceWorker.register('{prefixo}sw.js').catch(function(){{}});</script>
</body>
</html>
"""

DEMOS_SET = set(json.load(open(os.path.join(RAIZ, 'turma', 'demos.json'), encoding='utf-8')))
def cartao(k, v, pref=''):
    selo = '<span class="selo-demo">▶️ Demo grátis</span>' if k in DEMOS_SET else ''
    return (f'<a class="item" href="{pref}{e(k)}.html" data-tipo="{tipo(v)}" data-nivel="{e("|".join(v.get("nivel", [])))}">{selo}'
            f'<div class="nota" style="background:{COR.get(v.get("cor"), "#ffe27a")}"><small>{e(v.get("tema", ""))}</small>{e(v.get("emoji", "🎲"))}</div>'
            f'<div class="c"><h3>{e(v["nome"])}</h3><p>{e(v.get("desc", ""))}</p></div></a>')

COPIAR_JS = """<script>document.addEventListener('click',function(ev){var b=ev.target.closest('[data-copiar]');if(!b)return;var u=b.getAttribute('data-copiar'),ok=b.parentNode.querySelector('.ok');function f(){if(ok){ok.textContent='✅ Link copiado!';setTimeout(function(){ok.textContent='';},2500);}}
if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(u).then(f).catch(f);}else{var t=document.createElement('textarea');t.value=u;document.body.appendChild(t);t.select();try{document.execCommand('copy');}catch(e){}document.body.removeChild(t);f();}});</script>"""

DEMOS = json.load(open(os.path.join(RAIZ, 'turma', 'demos.json'), encoding='utf-8'))
for _d in DEMOS: assert _d in J and os.path.exists(os.path.join(RAIZ, 'demo', _d + '.html')), 'demo inexistente: ' + _d
ordenados = sorted(J.items(), key=lambda kv: kv[1]['nome'].lower())
os.makedirs(os.path.join(RAIZ, 'catalogo'), exist_ok=True)
numeros = (f'<div class="numeros"><div><b>{TOTAL}</b>aplicações</div><div><b>{cont["jogo"]}</b>jogos</div>'
           f'<div><b>{cont["simulador"]}</b>simuladores</div><div><b>{cont["ferramenta"]}</b>ferramentas do professor</div></div>')

# ---------- catálogo ----------
filtros = ('<div class="filtros" id="fTipo">' + ''.join(f'<button type="button" data-t="{t}" aria-pressed="{"true" if t == "todos" else "false"}">{n}</button>'
           for t, n in [('todos', 'Todos'), ('jogo', '🎮 Jogos'), ('simulador', '🔬 Simuladores'), ('ferramenta', '🧰 Ferramentas')]) + '</div>'
           '<div class="filtros" id="fNivel">' + ''.join(f'<button type="button" data-n="{n}" aria-pressed="{"true" if n == "todos" else "false"}">{"Todos os níveis" if n == "todos" else n}</button>'
           for n in ['todos'] + NIVEIS) + '</div>')
corpo = (f'<div class="card hero"><h1>Catálogo de aplicações</h1><p class="sub">Jogos, simuladores e ferramentas para usar em sala de aula, no projetor ou no celular dos alunos.</p>{numeros}<p style="margin-top:16px"><a class="bt" href="../#degustacao">⏱️ Experimentar grátis</a><a class="bt sec" href="../novidades.html">🆕 Novidades</a></p></div>'
         '<div class="card" id="demos"><h2>▶️ Demonstrações grátis</h2><p class="sub">Jogue 5 minutos por dia em cada jogo, sem cadastro.</p><p>' + ''.join(f'<a class="bt" href="../demo/{d}.html">▶️ {e(J[d]["nome"])}</a>' for d in DEMOS) + '</p></div>'
         f'<div class="card">{filtros}<div class="grade" id="grade">{"".join(cartao(k, v) for k, v in ordenados)}</div></div>'
         """<script>
(function(){var t='todos',n='todos';function f(){document.querySelectorAll('#grade .item').forEach(function(a){var ok=(t==='todos'||a.dataset.tipo===t)&&(n==='todos'||a.dataset.nivel.split('|').indexOf(n)>=0);a.style.display=ok?'':'none';});}
document.querySelectorAll('#fTipo button').forEach(function(b){b.onclick=function(){t=b.dataset.t;document.querySelectorAll('#fTipo button').forEach(function(x){x.setAttribute('aria-pressed',x===b);});f();};});
document.querySelectorAll('#fNivel button').forEach(function(b){b.onclick=function(){n=b.dataset.n;document.querySelectorAll('#fNivel button').forEach(function(x){x.setAttribute('aria-pressed',x===b);});f();};});})();
</script>
<div class="card" id="depCat" hidden><h2>O que dizem os professores</h2><div id="listaDepCat"></div></div>
<script>
window.addEventListener('DOMContentLoaded',function(){GamificaDep.mostrar('listaDepCat','depCat',6,'../depoimentos.json');});
</script>""")
open(os.path.join(RAIZ, 'catalogo', 'index.html'), 'w').write(pagina(f'Catálogo: {TOTAL} jogos, simuladores e ferramentas educacionais · Gamifica Educação',
    f'{TOTAL} aplicações educacionais: {cont["jogo"]} jogos, {cont["simulador"]} simuladores e {cont["ferramenta"]} ferramentas para o professor, do Fundamental ao Superior.', corpo, 'catalogo/'))

USO = {'jogo': ['Jogue no projetor com a turma toda ou deixe cada aluno jogar no celular.', 'Em “Atribuir tarefas”, gere um link: os alunos jogam sem login e a nota chega para você em “Turmas e notas”.'],
       'simulador': ['Projete e explore com a turma: mude os valores e peça que os alunos façam previsões antes de ver o resultado.', 'Use como laboratório em duplas, no computador ou no celular.'],
       'ferramenta': ['Ferramenta para o dia a dia do professor: abra no computador da sala ou no celular.', 'Funciona direto no navegador, sem instalar nada.']}
for k, v in ordenados:
    t = tipo(v)
    rel = [kv for kv in ordenados if kv[0] != k and (kv[1].get('conteudo') == v.get('conteudo') or kv[1].get('tema') == v.get('tema')) and tipo(kv[1]) == t][:4]
    if len(rel) < 4: rel += [kv for kv in ordenados if kv[0] != k and tipo(kv[1]) == t and kv not in rel][:4 - len(rel)]
    niveis = ''.join(f'<span class="tag">{e(n)}</span>' for n in v.get('nivel', []))
    nivs = v.get('nivel', [])
    nivel_txt = (' e '.join(nivs) if len(nivs) <= 2 else ', '.join(nivs[:-1]) + ' e ' + nivs[-1]) or 'todos os níveis'
    tipo_min = {'jogo': 'jogo educativo', 'simulador': 'simulador educativo', 'ferramenta': 'ferramenta para professores'}[t]
    art, indic = {'jogo': ('um', 'indicado'), 'simulador': ('um', 'indicado'), 'ferramenta': ('uma', 'indicada')}[t]
    tema_ok = v.get('tema') and 'ferramenta' not in v['tema'].lower()
    base_t = f'{v["nome"]}: {tipo_min}' + ((f' de {v["tema"]}' if t != 'ferramenta' else f' · {v["tema"]}') if tema_ok else '')
    titulo_pag = base_t + ' · Gamifica Educação' if len(base_t) <= 48 else base_t
    cauda = f' {tipo_min.capitalize()} {indic} para {nivel_txt}. Funciona no celular, tablet e computador.'
    desc_pag = (v.get('desc', '') + cauda) if len(v.get('desc', '') + cauda) <= 300 else v.get('desc', '')[:300]
    tema_txt = ((f' de {e(v["tema"])}' if t != 'ferramenta' else f' ({e(v["tema"])})') if tema_ok else '')
    url_pag = f'{SITE}/catalogo/{k}.html'
    zap_txt = urllib.parse.quote(f'{v["nome"]}: {v.get("desc", "")[:110]} {url_pag}')
    compartilhar = (f'<div class="compartilhar"><a class="bt sec" target="_blank" rel="noopener" href="https://wa.me/?text={zap_txt}">📲 Compartilhar no WhatsApp</a>'
                    f'<button type="button" class="bt sec" data-copiar="{url_pag}">📋 Copiar link</button><span class="ok" role="status" aria-live="polite"></span></div>')
    ld = {"@context": "https://schema.org", "@type": "LearningResource", "name": v['nome'], "description": v.get('desc', ''), "inLanguage": "pt-BR",
          "learningResourceType": NOME_TIPO[t], "educationalLevel": v.get('nivel', []), "url": f"{SITE}/catalogo/{k}.html",
          "provider": {"@type": "Person", "name": "Prof. Dr. Haroldo Aleixo de Lima Junior"}}
    if v.get('tema'): ld["about"] = v['tema']
    if v.get('bncc'): ld["educationalAlignment"] = [{"@type": "AlignmentObject", "alignmentType": "teaches", "educationalFramework": "BNCC", "targetName": c} for c in v['bncc']]
    corpo = (f'<p><a href="./">← Voltar ao catálogo</a></p><div class="card"><div class="cab-app"><div class="nota" style="background:{COR.get(v.get("cor"), "#ffe27a")}">{e(v.get("emoji", "🎲"))}</div>'
             f'<div><div class="tags"><span class="tag">{ICONE_TIPO[t]} {NOME_TIPO[t]}</span>{"<span class=tag>" + e(v["tema"]) + "</span>" if v.get("tema") else ""}</div><h1>{e(v["nome"])}</h1><p>{e(v.get("desc", ""))}</p>'
             f'<div class="tags">{niveis}</div>'
             + (f'<p style="margin:8px 0 0;font-size:15px"><b>Habilidades da BNCC:</b> {", ".join(e(c) for c in v["bncc"])}</p>' if v.get('bncc') else '') +
             '</div></div></div>'
             f'<div class="card"><h2>Para quem é</h2><p><b>{e(v["nome"])}</b> é {art} {tipo_min}{tema_txt} {indic} para <b>{e(nivel_txt)}</b>. Funciona no celular, no tablet e no computador, direto no navegador, sem instalar nada.</p></div>'
             f'<div class="card"><h2>Como usar em aula</h2><ul>{"".join("<li>" + x + "</li>" for x in USO[t])}</ul>'
             f'<p>{(f"<a class=\"bt\" href=\"../demo/{k}.html\">▶️ Jogar demonstração grátis (5 min)</a>") if k in DEMOS_SET else ""}<a class="bt" href="{('..' + v['link']) if v.get('link') else '../'}">🚀 {'Abrir' if v.get('link') else 'Abrir no portal'}</a><a class="bt sec" href="../#degustacao">⏱️ Fazer a degustação grátis</a></p>{compartilhar}'
             f'<p class="sub" style="font-size:15px">O acesso completo é pelo Plano Pró. Alunos não precisam de login: usam o link que o professor envia.</p></div>'
             f'<div class="card"><h2>Veja também</h2><div class="grade">{"".join(cartao(a, b) for a, b in rel)}</div></div>')
    open(os.path.join(RAIZ, 'catalogo', k + '.html'), 'w').write(pagina(titulo_pag, desc_pag, corpo, f'catalogo/{k}.html',
        '<script type="application/ld+json">' + json.dumps(ld, ensure_ascii=False) + '</script>'))

# ---------- como funciona ----------
FAQ = [
    ('O que é o Gamifica Educação?', f'Um portal com {TOTAL} aplicações educacionais: jogos, simuladores e ferramentas para o professor. Tudo funciona direto no navegador, no computador, no tablet ou no celular, sem instalar nada.'),
    ('Para quais séries serve?', 'Há aplicações para o Fundamental 1, o Fundamental 2, o Ensino Médio e o Superior. No portal, use o filtro “Nível” para ver as recomendadas para cada etapa.'),
    ('Só tem Matemática?', 'A maior parte das aplicações é de Matemática, mas muitas servem para qualquer disciplina: Quiz Ao Vivo, Enquete e Nuvem de Palavras, Bingo, Caça-palavras, Sorteador, Cronômetro, Mapa da sala, Leitor de gabaritos e os jogos com editor (como o “Crie o seu” do Ligar e Classificar).'),
    ('Como funciona a degustação grátis?', 'Na tela de entrada, toque em “Degustação grátis”: você navega pelo portal por alguns minutos para conhecer as aplicações. Na degustação não é possível atribuir tarefas e nada fica salvo.'),
    ('Quanto custa o Plano Pró?', 'R$ 10,00 por mês. Você escolhe de 1 a 12 meses e paga por Pix ou cartão pelo Mercado Pago. O login e a senha aparecem na tela assim que o pagamento é aprovado.'),
    ('Posso usar em mais de um aparelho?', 'O login funciona em um aparelho por vez. Se você entrar em outro aparelho, o anterior é desconectado.'),
    ('Os alunos precisam de login ou de cadastro?', 'Não. Em “Atribuir tarefas” você gera um link (ou QR code). O aluno abre, digita o nome e a turma, joga, e a nota chega para você em “Turmas e notas”, com planilha e relatório em Word.'),
    ('Como funcionam o Quiz Ao Vivo e a Enquete?', 'Você projeta a tela e os alunos entram pelo celular com um código: gamificaeducacao.com.br/vivo (quiz) ou gamificaeducacao.com.br/enquete (enquete e nuvem de palavras). As respostas aparecem no projetor na hora.'),
    ('Funciona no celular?', 'Sim. As aplicações se adaptam à tela do celular e do tablet. Você também pode instalar o site como aplicativo: no celular, abra o menu do navegador e toque em “Adicionar à tela inicial”.'),
    ('Posso imprimir atividades?', 'Sim. Várias ferramentas geram material para imprimir ou salvar em PDF: fichas de tabuada e cálculo mental, planificação de sólidos para montar, desenhos no plano cartesiano, provas, caça-palavras, sudoku e bingo.'),
]
ld_faq = {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in FAQ]}
corpo = (f'<div class="card hero"><h1>Como funciona</h1><p class="sub">Aprender de um jeito lúdico, com jogos, simuladores e ferramentas prontos para a sala de aula.</p>{numeros}'
         f'<p style="margin-top:18px"><a class="bt" href="./#degustacao">⏱️ Fazer a degustação grátis</a><a class="bt sec" href="catalogo/">Ver o catálogo</a></p></div>'
         '<div class="card"><h2>Em 4 passos</h2><div class="passos">'
         '<div><b>Entre no portal</b><br>Faça a degustação grátis ou entre com o seu login do Plano Pró.</div>'
         '<div><b>Escolha a aplicação</b><br>Filtre por nível (Fundamental 1 ao Superior) e por conteúdo, ou busque pelo nome. Guarde as preferidas na ⭐.</div>'
         '<div><b>Use em aula</b><br>Projete para a turma, deixe os alunos jogarem no celular ou imprima as fichas.</div>'
         '<div><b>Acompanhe as notas</b><br>Atribua tarefas por link ou QR code e veja as notas em “Turmas e notas”, com planilha e relatório.</div>'
         '</div></div>'
         '<div class="card"><h2>Perguntas frequentes</h2>' + ''.join(f'<details><summary>{e(q)}</summary><p>{e(a)}</p></details>' for q, a in FAQ) + '</div>'
         '<div class="card" id="depoimentos"><h2>Depoimentos de professores</h2><div id="listaDep"></div>'
         '<p>Usou o Gamifica Educação com a sua turma? <b>Conte como foi!</b> Seu depoimento aparece aqui depois de aprovado.</p>'
         '<form class="form" id="fDep" novalidate><label for="dnome">Seu nome</label><input id="dnome" name="nome" type="text" maxlength="80" required autocomplete="name">'
         '<label for="dfun">Sua função (opcional)</label><input id="dfun" name="funcao" type="text" maxlength="80" placeholder="Ex.: Professora de Matemática, Ensino Médio">'
         '<label for="dtxt">Seu depoimento (até 500 letras, sem links)</label><textarea id="dtxt" name="texto" maxlength="500" required></textarea>'
         '<div class="hp" aria-hidden="true"><label>Não preencha<input name="site" type="text" tabindex="-1" autocomplete="off"></label></div>'
         '<label class="check"><input type="checkbox" name="ok" required> <span>Autorizo publicar meu nome, minha função e este texto no site. Posso pedir a remoção quando quiser.</span></label>'
         '<button class="bt" type="submit">💬 Enviar meu depoimento</button><p class="status" role="status" aria-live="polite"></p></form></div>'
         """<script>
window.addEventListener('DOMContentLoaded',function(){GamificaDep.mostrar('listaDep',null,12,'depoimentos.json');GamificaForms.depoimento('fDep');});
</script>""")
open(os.path.join(RAIZ, 'como-funciona.html'), 'w').write(pagina('Como funciona · Gamifica Educação', 'Como usar o Gamifica Educação: degustação grátis, Plano Pró, tarefas por link sem login para os alunos, notas e perguntas frequentes.', corpo, 'como-funciona.html',
    '<script type="application/ld+json">' + json.dumps(ld_faq, ensure_ascii=False) + '</script>'))
if not os.path.exists(os.path.join(RAIZ, 'depoimentos.json')):
    open(os.path.join(RAIZ, 'depoimentos.json'), 'w').write('[]\n')

# ---------- novidades e feed ----------
NOVI = json.load(open(os.path.join(RAIZ, 'turma', 'novidades.json'), encoding='utf-8'))
def dt(d): a, m, dd = d.split('-'); return f'{dd}/{m}/{a}'
def link_novi(n): return (f'catalogo/{n["id"]}.html' if n.get('id') else n.get('link', 'catalogo/'))
itens = ''.join(f'<article><time datetime="{e(n["data"])}">{dt(n["data"])}</time><h3>{e(n["titulo"])}</h3><p>{e(n["texto"])}</p>'
                f'<p><a class="bt" href="{e(link_novi(n))}">Ver</a></p></article>' for n in NOVI)
zap_novi = urllib.parse.quote('Olá! Quero receber o aviso quando sair jogo novo no Gamifica Educação.')
corpo = (f'<div class="card hero"><h1>Novidades</h1><p class="sub">Jogos, simuladores e ferramentas que chegaram ao Gamifica Educação.</p></div>'
         f'<div class="card"><div class="novi">{itens}</div></div>'
         '<div class="card" id="avisos"><h2>📧 Receba um aviso por e-mail</h2><p>Quando sair jogo ou ferramenta nova, você recebe um e-mail curto com o link. Sem propaganda e sem repassar seu e-mail a ninguém.</p>'
         '<form class="form" id="fAvisos" novalidate><label for="aemail">Seu e-mail</label><input id="aemail" name="email" type="email" maxlength="120" required autocomplete="email">'
         '<div class="hp" aria-hidden="true"><label>Não preencha<input name="site" type="text" tabindex="-1" autocomplete="off"></label></div>'
         '<label class="check"><input type="checkbox" name="ok" required> <span>Concordo em receber avisos de novidades neste e-mail e posso cancelar quando quiser. Veja a <a href="privacidade.html">Política de Privacidade</a>.</span></label>'
         '<button class="bt" type="submit">📧 Quero receber os avisos</button><p class="status" role="status" aria-live="polite"></p></form>'
         f'<p>Prefere pelo WhatsApp? <a target="_blank" rel="noopener" href="https://wa.me/{ZAP}?text={zap_novi}">Peça aqui</a>. Também há o <a href="feed.xml">feed RSS</a>.</p></div>'
         '<div class="card" id="cancelar"><h2>Cancelar os avisos</h2><form class="form" id="fCancelar" novalidate><label for="cemail">E-mail cadastrado</label><input id="cemail" name="email" type="email" maxlength="120" required>'
         '<div class="hp" aria-hidden="true"><label>Não preencha<input name="site" type="text" tabindex="-1" autocomplete="off"></label></div>'
         '<button class="bt sec" type="submit">Cancelar meu cadastro</button><p class="status" role="status" aria-live="polite"></p></form></div>'
         '<script>window.addEventListener("DOMContentLoaded",function(){GamificaForms.avisos("fAvisos");GamificaForms.cancelar("fCancelar");});</script>')
open(os.path.join(RAIZ, 'novidades.html'), 'w').write(pagina('Novidades · Gamifica Educação', 'Últimos jogos, simuladores e ferramentas que chegaram ao Gamifica Educação.', corpo, 'novidades.html',
    f'<link rel="alternate" type="application/rss+xml" title="Novidades do Gamifica Educação" href="{SITE}/feed.xml">'))
def rfc(d): return datetime.datetime.strptime(d, '%Y-%m-%d').strftime('%a, %d %b %Y 12:00:00 -0300')
feed = ('<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0"><channel><title>Novidades · Gamifica Educação</title>'
        f'<link>{SITE}/novidades.html</link><description>Jogos, simuladores e ferramentas novas do Gamifica Educação.</description><language>pt-BR</language>\n'
        + ''.join(f'<item><title>{e(n["titulo"])}</title><link>{SITE}/{link_novi(n)}</link><guid isPermaLink="true">{SITE}/{link_novi(n)}</guid><pubDate>{rfc(n["data"])}</pubDate><description>{e(n["texto"])}</description></item>\n' for n in NOVI)
        + '</channel></rss>\n')
open(os.path.join(RAIZ, 'feed.xml'), 'w').write(feed)

# ---------- página 404 (o GitHub Pages usa este arquivo para endereços que não existem) ----------
corpo = ('<div class="card hero" style="text-align:center"><div style="font-size:64px" aria-hidden="true">🧭</div><h1>Ops! Não achamos esta página</h1>'
         '<p class="sub">O endereço pode estar errado ou a página mudou de lugar. Vamos voltar para um lugar conhecido?</p>'
         '<p><a class="bt" href="/">🏠 Voltar ao início</a><a class="bt sec" href="/catalogo/">📚 Ver o catálogo</a><a class="bt sec" href="/mural/">📌 Mural Eletrônico</a></p></div>')
open(os.path.join(RAIZ, '404.html'), 'w').write(pagina('Página não encontrada · Gamifica Educação', 'A página procurada não foi encontrada. Volte ao início ou veja o catálogo de jogos, simuladores e ferramentas.', corpo, '404.html',
    '<meta name="robots" content="noindex"><meta name="estat" content="off">', absoluto=True))

# ---------- privacidade e termos ----------
ATUAL = '8 de novembro de 2026'
priv = f"""<div class="card legal"><h1>Política de Privacidade</h1><p class="sub">Última atualização: {ATUAL}</p>
<p>Esta política explica quais dados o <b>Gamifica Educação</b> (gamificaeducacao.com.br) usa, para quê e como você pode exercer seus direitos, conforme a Lei Geral de Proteção de Dados (LGPD, Lei nº 13.709/2018).</p>
<h2>1. Quem é o responsável</h2><p>O site é mantido pelo Prof. Dr. Haroldo Aleixo de Lima Junior. Contato: <a href="https://wa.me/{ZAP}" target="_blank" rel="noopener">WhatsApp</a>.</p>
<h2>2. Dados dos professores (assinantes)</h2><ul>
<li><b>Cadastro:</b> nome, e-mail e login. A senha é guardada de forma criptografada pelo serviço de autenticação e não pode ser lida por ninguém.</li>
<li><b>Sessão:</b> registro do aparelho em uso, para permitir um aparelho por vez e proteger a conta.</li>
<li><b>Pagamento:</b> feito pelo Mercado Pago. O site não recebe nem guarda dados de cartão; recebe apenas a confirmação do pagamento e o período contratado.</li>
<li><b>Atividades:</b> as tarefas que o professor cria (nome, jogo e turma).</li></ul>
<h2>3. Dados dos alunos</h2><ul>
<li>Ao abrir uma tarefa enviada pelo professor, o aluno digita <b>nome e turma</b>. Junto com o resultado (acertos, nota, pontos, tempo e quantas vezes saiu da tela da atividade), esses dados ficam disponíveis <b>apenas para o professor que criou a tarefa</b>.</li>
<li>Os alunos <b>não criam conta</b> e não informam e-mail, telefone ou documentos.</li>
<li>No Quiz Ao Vivo e na Enquete, as respostas passam pelo canal em tempo real e não são gravadas no servidor do site. A enquete é anônima.</li>
<li>Recomendamos que o professor oriente os alunos a usar apenas o primeiro nome e a turma.</li></ul>
<h2>4. Dados guardados no seu aparelho</h2><p>Para conveniência, o navegador guarda no próprio aparelho informações como favoritos, aplicações usadas recentemente, recordes dos jogos, preferências e o andamento de uma tarefa. Esses dados não são enviados ao servidor e podem ser apagados limpando os dados do navegador.</p>
<h2>5. Estatísticas de visitas (anônimas)</h2><p>Para saber quais páginas são mais úteis, registramos de forma anônima: a página aberta, o site de origem (por exemplo, o Google), o tipo de aparelho (celular, tablet ou computador) e a data. <b>Não usamos cookies, não guardamos o endereço IP e não identificamos pessoas.</b> O sinal “Não rastrear” do navegador é respeitado.</p>\n<h2>6. Avisos de novidades e depoimentos (opcionais)</h2><p><b>Avisos:</b> se você se cadastrar na página de <a href="novidades.html">Novidades</a>, guardamos seu e-mail só para avisar quando sair novidade. Você cancela quando quiser na mesma página. <b>Depoimentos:</b> se você enviar um, guardamos o nome, a função e o texto que escrever, e só publicamos depois de aprovar. Para remover, fale conosco pelo WhatsApp.</p>\n<h2>7. Para que usamos os dados</h2><ul><li>Dar acesso ao portal e às aplicações contratadas;</li><li>Mostrar ao professor as notas das tarefas que ele criou;</li><li>Confirmar pagamentos e o período de acesso;</li><li>Atender pedidos de suporte;</li><li>Entender quais páginas são mais usadas, para melhorar o site.</li></ul>
<p>Não vendemos dados, não exibimos anúncios e não usamos os dados para publicidade.</p>
<h2>8. Onde os dados ficam</h2><p>O site é hospedado no GitHub Pages. O banco de dados e a autenticação usam o Supabase, e os pagamentos, o Mercado Pago. Esses serviços seguem padrões de segurança próprios e podem armazenar dados fora do Brasil.</p>
<h2>9. Por quanto tempo</h2><p>Os dados da conta ficam guardados enquanto a conta existir. O professor pode excluir a qualquer momento as tarefas e as notas que criou. Para excluir a conta e os dados ligados a ela, entre em contato.</p>
<h2>10. Seus direitos</h2><p>Você pode pedir a confirmação, o acesso, a correção ou a exclusão dos seus dados, e tirar dúvidas sobre esta política, pelo <a href="https://wa.me/{ZAP}" target="_blank" rel="noopener">WhatsApp</a>. Pedidos sobre dados de alunos podem ser feitos pelo responsável ou pelo professor da turma.</p>
<h2>11. Mudanças</h2><p>Esta política pode ser atualizada. A data da última atualização aparece no início da página.</p></div>"""
open(os.path.join(RAIZ, 'privacidade.html'), 'w').write(pagina('Política de Privacidade · Gamifica Educação', 'Quais dados o Gamifica Educação usa, para quê e como exercer seus direitos pela LGPD.', priv, 'privacidade.html'))
termos = f"""<div class="card legal"><h1>Termos de Uso</h1><p class="sub">Última atualização: {ATUAL}</p>
<p>Ao usar o <b>Gamifica Educação</b> (gamificaeducacao.com.br), você concorda com estes termos.</p>
<h2>1. O serviço</h2><p>O portal oferece jogos, simuladores e ferramentas educacionais que funcionam no navegador. O conteúdo pode ser ampliado, alterado ou reorganizado para melhorar o serviço.</p>
<h2>2. Degustação grátis</h2><p>A degustação permite conhecer o portal por tempo limitado, sem atribuir tarefas e sem salvar dados. Há um limite de degustações por e-mail.</p>
<h2>3. Plano Pró</h2><ul><li>O acesso é contratado por período (de 1 a 12 meses) e pago por Pix ou cartão pelo Mercado Pago.</li>
<li>O login é <b>pessoal e intransferível</b> e funciona em um aparelho por vez. Entrar em outro aparelho desconecta o anterior.</li>
<li>Ao fim do período contratado, o acesso é encerrado até a renovação. As tarefas e as notas já criadas continuam guardadas.</li>
<li><b>Direito de arrependimento:</b> como a compra é feita pela internet, você pode desistir em até 7 dias após a contratação e receber o valor pago de volta, conforme o art. 49 do Código de Defesa do Consumidor. Basta pedir pelo contato abaixo.</li></ul>
<h2>4. Uso adequado</h2><ul><li>Use o portal para fins educacionais.</li><li>Não compartilhe seu login, não tente burlar o limite de aparelhos nem copiar, revender ou redistribuir as aplicações.</li>
<li>O professor é responsável pelas tarefas que cria e por orientar os alunos sobre os dados que digitam (recomendamos apenas o primeiro nome e a turma).</li>
<li>No Quiz Ao Vivo e na Enquete, o professor é responsável por moderar as respostas exibidas; o site oferece filtro automático e a opção de esconder respostas.</li></ul>
<h2>5. Propriedade intelectual</h2><p>As aplicações, os textos e o visual do portal pertencem ao autor, Prof. Dr. Haroldo Aleixo de Lima Junior. O material impresso gerado pelas ferramentas (fichas, planificações, provas) pode ser usado livremente pelo professor com seus alunos.</p>
<h2>6. Disponibilidade</h2><p>Trabalhamos para manter o portal sempre no ar, mas podem ocorrer interrupções por manutenção, falhas de internet ou dos serviços de hospedagem. Algumas aplicações ao vivo dependem da conexão de todos os aparelhos.</p>
<h2>7. Privacidade</h2><p>O uso de dados segue a nossa <a href="privacidade.html">Política de Privacidade</a>.</p>
<h2>8. Contato</h2><p>Dúvidas, suporte, cancelamento ou reembolso: <a href="https://wa.me/{ZAP}" target="_blank" rel="noopener">WhatsApp</a>.</p></div>"""
open(os.path.join(RAIZ, 'termos.html'), 'w').write(pagina('Termos de Uso · Gamifica Educação', 'Termos de uso do Gamifica Educação: degustação, Plano Pró, uso adequado e direito de arrependimento.', termos, 'termos.html'))

# ---------- sitemap e robots ----------
urls = ['', 'catalogo/', 'mural/', 'novidades.html', 'como-funciona.html', 'privacidade.html', 'termos.html', 'vivo/', 'enquete/'] + [f'catalogo/{k}.html' for k, _ in ordenados]
sm = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + ''.join(
    f'  <url><loc>{SITE}/{u}</loc><lastmod>{HOJE}</lastmod></url>\n' for u in urls) + '</urlset>\n'
open(os.path.join(RAIZ, 'sitemap.xml'), 'w').write(sm)
open(os.path.join(RAIZ, 'robots.txt'), 'w').write(f'User-agent: *\nAllow: /\nDisallow: /protegido/\nDisallow: /_ferramentas/\nDisallow: /turma/\n\nSitemap: {SITE}/sitemap.xml\n')
# mantém o número de aplicações da página inicial (descrição e redes sociais) sempre igual ao do catálogo
_h = open(os.path.join(RAIZ, 'index.html'), encoding='utf-8').read()
_n = re.sub(r'\b\d+ jogos, simuladores e ferramentas educacionais', f'{TOTAL} jogos, simuladores e ferramentas educacionais', _h)
if _n != _h: open(os.path.join(RAIZ, 'index.html'), 'w', encoding='utf-8').write(_n)
print(f'{TOTAL} aplicações · {len(urls)} URLs no sitemap')
