/* Identificação do aluno e resultado final para jogos abertos no modo livre (página principal).
   Funciona com qualquer jogo, inclusive os já publicados: o portal acompanha o GAMIFICA do jogo.
   - Antes de começar, pede nome completo e série/turma.
   - Quando o jogo chama GAMIFICA.enviar(acertos, total, pontos), mostra o resultado final
     (nome, série, atividade, acertos, nota de 0 a 10, pontos, data) com botão para baixar em Word.
   No portal do aluno (turma/jogar.html) a identificação e o resultado já são feitos pela própria página. */
(function(){
  'use strict';

  function esc(s){ return String(s).replace(/[&<>"]/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }
  function nota1(n){ return Number(n).toFixed(1).replace('.', ','); }

  function baixarWord(d){
    var linhas = [['Aluno(a)', d.aluno], ['Série / turma', d.serie], ['Atividade', d.atividade], ['Acertos', d.acertos + ' de ' + d.total], ['Nota (0 a 10)', nota1(d.nota)], ['Pontos', d.pontos], ['Data', d.data]];
    var tr = linhas.map(function(l){ return '<tr><td style="background:#eef0fb;font-weight:bold;width:35%;border:1px solid #b8c0d9;padding:6px">' + esc(l[0]) + '</td><td style="border:1px solid #b8c0d9;padding:6px">' + esc(l[1]) + '</td></tr>'; }).join('');
    var html = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="utf-8"><title>Resultado final</title></head><body style="font-family:Arial,sans-serif">' +
      '<h1 style="color:#1d2b53">Resultado final da atividade</h1><p style="color:#5d6785">Gamifica Educação</p>' +
      '<table style="border-collapse:collapse;width:100%">' + tr + '</table>' +
      '<p style="margin-top:18px;color:#5d6785;font-size:10pt">Documento gerado automaticamente ao término da atividade.</p></body></html>';
    var blob = new Blob(['\ufeff', html], {type: 'application/msword'});
    var nome = ('resultado-' + d.aluno + '-' + d.atividade).normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '').toLowerCase().slice(0, 80) + '.doc';
    var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = nome;
    document.body.appendChild(a); a.click();
    setTimeout(function(){ URL.revokeObjectURL(a.href); if(a.parentNode) a.parentNode.removeChild(a); }, 1000);
  }

  function caixa(conteudo){
    var fundo = document.createElement('div');
    fundo.setAttribute('role', 'dialog'); fundo.setAttribute('aria-modal', 'true');
    fundo.style.cssText = 'position:fixed;inset:0;z-index:2147483600;background:rgba(15,23,42,.72);display:flex;align-items:center;justify-content:center;padding:14px;font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif';
    var c = document.createElement('div');
    c.style.cssText = 'background:#fff;color:#1b2440;border-radius:18px;max-width:430px;width:100%;padding:20px;box-shadow:0 20px 50px rgba(0,0,0,.4);max-height:92vh;overflow:auto';
    c.appendChild(conteudo);
    fundo.appendChild(c); document.body.appendChild(fundo);
    return fundo;
  }

  function botao(texto, estilo, acao){
    var b = document.createElement('button'); b.type = 'button'; b.textContent = texto;
    b.style.cssText = 'font:inherit;font-weight:800;border-radius:12px;padding:10px 14px;cursor:pointer;margin:6px 6px 0 0;border:2px solid ' + (estilo === 'sec' ? '#d5d8f5' : '#e0ad00') + ';background:' + (estilo === 'sec' ? '#eef0fb' : '#ffd23f') + ';color:' + (estilo === 'sec' ? '#5b52f0' : '#1b2440');
    b.addEventListener('click', acao);
    return b;
  }

  function pedirIdentificacao(G){
    var titulo = document.createElement('div');
    titulo.innerHTML = '<h2 style="margin:0 0 6px;font-size:1.2rem">✍️ Identificação</h2><p style="margin:0 0 12px;color:#5d6785;font-size:.95rem">Digite seu <b>nome completo</b> e sua <b>série e turma</b>. Esse é o nome que aparece no resultado final.</p>';
    var form = document.createElement('form');
    var campos = [['Nome completo', 'nome', 'Ex.: Maria Silva Souza'], ['Série e turma', 'serie', 'Ex.: 3ª série A']];
    var entradas = {};
    campos.forEach(function(c){
      var lb = document.createElement('label'); lb.textContent = c[0]; lb.style.cssText = 'display:block;font-weight:800;margin:8px 0 4px';
      var inp = document.createElement('input'); inp.type = 'text'; inp.maxLength = 80; inp.placeholder = c[2]; inp.autocomplete = c[1] === 'nome' ? 'name' : 'off';
      inp.style.cssText = 'width:100%;font:inherit;font-size:1.05rem;padding:10px 12px;border-radius:12px;border:2px solid #e1e6f0;box-sizing:border-box';
      lb.appendChild(document.createElement('br')); lb.appendChild(inp);
      form.appendChild(lb); entradas[c[1]] = inp;
    });
    var aviso = document.createElement('div'); aviso.style.cssText = 'color:#b91c1c;font-weight:700;margin-top:8px;min-height:1em';
    var ok = botao('▶️ Começar', 'pri', function(){});
    ok.type = 'submit'; form.appendChild(ok);
    var pular = botao('Agora não', 'sec', function(){});
    pular.type = 'button';
    pular.addEventListener('click', function(){ if(fundo && fundo.parentNode) fundo.parentNode.removeChild(fundo); });
    form.appendChild(pular); form.appendChild(aviso);
    form.addEventListener('submit', function(ev){
      ev.preventDefault();
      var n = entradas.nome.value.trim().replace(/\s+/g, ' ');
      var s = entradas.serie.value.trim().replace(/\s+/g, ' ');
      if(n.split(' ').length < 2 || n.length < 5){ aviso.textContent = 'Digite o nome completo (nome e sobrenome).'; return; }
      if(s.length < 2){ aviso.textContent = 'Digite a série e a turma (ex.: 3ª série A).'; return; }
      G.aluno = n; G.turma = s;
      if(fundo.parentNode) fundo.parentNode.removeChild(fundo);
    });
    var c = document.createElement('div'); c.appendChild(titulo); c.appendChild(form);
    var fundo = caixa(c);
    setTimeout(function(){ entradas.nome.focus(); }, 50);
    return fundo;
  }

  function mostrarResultado(d){
    var c = document.createElement('div');
    c.innerHTML = '<div style="font-size:2.4rem;text-align:center">🏁</div><h2 style="margin:4px 0 8px;text-align:center;font-size:1.25rem">Resultado final</h2>';
    var tb = document.createElement('table'); tb.style.cssText = 'border-collapse:collapse;width:100%;font-size:.95rem';
    [['Aluno(a)', d.aluno], ['Série / turma', d.serie], ['Atividade', d.atividade], ['Acertos', d.acertos + ' de ' + d.total], ['Nota (0 a 10)', nota1(d.nota)], ['Pontos', d.pontos], ['Data', d.data]].forEach(function(l){
      var tr = document.createElement('tr');
      tr.innerHTML = '<td style="background:#eef0fb;font-weight:800;padding:7px;border:1px solid #e1e6f0;width:40%">' + esc(l[0]) + '</td><td style="padding:7px;border:1px solid #e1e6f0">' + esc(l[1]) + '</td>';
      tb.appendChild(tr);
    });
    c.appendChild(tb);
    var linha = document.createElement('div'); linha.style.cssText = 'margin-top:12px;text-align:center';
    var fundo = null;
    linha.appendChild(botao('📄 Baixar resultado em Word', 'pri', function(){ baixarWord(d); }));
    linha.appendChild(botao('📕 Baixar em PDF', 'pri', function(){ pdf(d); }));
    linha.appendChild(botao('👍 Fechar', 'sec', function(){ if(fundo && fundo.parentNode) fundo.parentNode.removeChild(fundo); }));
    c.appendChild(linha);
    fundo = caixa(c);
  }




  /* Festa de vitória (antes do relatório) — jogos listados em FESTA_VITORIA */
  var FESTA_VITORIA = {'domino-equivalencias': true};
  var somFestaMudo = false;
  try{ somFestaMudo = localStorage.getItem('gm_festa_mudo') === '1'; }catch(e){}
  function somVitoria(){
    if(somFestaMudo) return null;
    var Ctx = window.AudioContext || window.webkitAudioContext; if(!Ctx) return null;
    var c; try{ c = new Ctx(); }catch(e){ return null; }
    var t = c.currentTime + .05, mestre = c.createGain(); mestre.gain.value = .35; mestre.connect(c.destination);
    function nota(f, ini, dur, tipo, vol){
      var o = c.createOscillator(), g = c.createGain(); o.type = tipo || 'triangle'; o.frequency.value = f;
      g.gain.setValueAtTime(0, t + ini); g.gain.linearRampToValueAtTime(vol || .5, t + ini + .02);
      g.gain.exponentialRampToValueAtTime(.001, t + ini + dur); o.connect(g); g.connect(mestre); o.start(t + ini); o.stop(t + ini + dur + .05);
    }
    /* Fanfarra: Dó-Mi-Sol-Dó agudo + acorde final */
    [[523,0,.18],[659,.16,.18],[784,.32,.18],[1047,.5,.5]].forEach(function(n){ nota(n[0], n[1], n[2], 'square', .22); nota(n[0], n[1], n[2], 'triangle', .4); });
    [523,659,784,1047].forEach(function(f){ nota(f, 1.0, 1.4, 'triangle', .25); });
    /* Palmas (ruído em rajadas) */
    var tam = c.sampleRate * .06, buf = c.createBuffer(1, tam, c.sampleRate), d = buf.getChannelData(0);
    for(var i = 0; i < tam; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / tam, 3);
    for(var k = 0; k < 26; k++){
      var src = c.createBufferSource(), g = c.createGain(), fl = c.createBiquadFilter();
      fl.type = 'bandpass'; fl.frequency.value = 1200 + Math.random() * 1500; src.buffer = buf; g.gain.value = .5 * Math.random() + .2;
      src.connect(fl); fl.connect(g); g.connect(mestre); src.start(t + 1.0 + k * .085 + Math.random() * .05);
    }
    return c;
  }
  function festaVitoria(info, depois){
    info = info || {};
    var nota = Number(info.nota) || 0, nome = String(info.aluno || '').split(' ')[0];
    if(/não identificado/i.test(info.aluno || '')) nome = '';
    var frase = nota >= 8 ? 'Você dominou as equivalências! Seu esforço fez a diferença.'
              : nota >= 6 ? 'Mandou bem! Cada partida deixa você mais craque.'
              : 'Você chegou até o fim! Persistir é o que faz campeões.';
    var fundo = document.createElement('div');
    fundo.setAttribute('role', 'dialog'); fundo.setAttribute('aria-modal', 'true'); fundo.setAttribute('aria-label', 'Você venceu');
    fundo.style.cssText = 'position:fixed;inset:0;z-index:2147483646;display:flex;align-items:center;justify-content:center;padding:16px;font-family:Fredoka,Nunito,system-ui,sans-serif;background:radial-gradient(circle at 50% 40%,#2f4aa0 0%,#1d2b53 70%);overflow:hidden;opacity:0;transition:opacity .35s';
    var st = document.createElement('style');
    st.textContent = '@keyframes gfPula{0%{transform:scale(.3) rotate(-12deg);opacity:0}60%{transform:scale(1.12) rotate(4deg);opacity:1}100%{transform:scale(1) rotate(0)}}' +
      '@keyframes gfBrilho{to{transform:rotate(360deg)}}@keyframes gfFlutua{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}' +
      '@keyframes gfSobe{from{transform:translateY(24px);opacity:0}to{transform:none;opacity:1}}';
    fundo.appendChild(st);
    var cv = document.createElement('canvas'); cv.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none';
    fundo.appendChild(cv);
    var c = document.createElement('div');
    c.style.cssText = 'position:relative;text-align:center;color:#fff;max-width:440px;width:100%';
    c.innerHTML =
      '<div style="position:relative;width:210px;height:210px;margin:0 auto;animation:gfPula .8s cubic-bezier(.2,1.4,.4,1) both">' +
        '<div style="position:absolute;inset:-40px;border-radius:50%;background:repeating-conic-gradient(rgba(255,214,90,.5) 0 10deg,transparent 10deg 20deg);animation:gfBrilho 12s linear infinite"></div>' +
        '<svg viewBox="0 0 200 200" width="210" height="210" style="position:relative;animation:gfFlutua 2.4s ease-in-out infinite .8s" aria-hidden="true">' +
          '<defs><linearGradient id="gfOuro" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff3a8"/><stop offset=".45" stop-color="#ffd23f"/><stop offset="1" stop-color="#e09a00"/></linearGradient></defs>' +
          '<path d="M52 40h96v34c0 30-22 52-48 52S52 104 52 74z" fill="url(#gfOuro)" stroke="#b97800" stroke-width="3"/>' +
          '<path d="M52 50H30c0 26 12 40 28 42M148 50h22c0 26-12 40-28 42" fill="none" stroke="#e0ad00" stroke-width="8" stroke-linecap="round"/>' +
          '<rect x="88" y="124" width="24" height="24" fill="#e0ad00"/><rect x="62" y="146" width="76" height="18" rx="5" fill="#d9442f"/><rect x="54" y="162" width="92" height="16" rx="5" fill="#a8321f"/>' +
          /* peça de dominó no troféu */
          '<g transform="translate(78 52) rotate(-8 22 30)"><rect width="44" height="60" rx="7" fill="#fff" stroke="#1d2b53" stroke-width="3"/><line x1="6" y1="30" x2="38" y2="30" stroke="#1d2b53" stroke-width="2.5"/>' +
          '<circle cx="22" cy="15" r="4.5" fill="#1d2b53"/><circle cx="12" cy="40" r="4" fill="#1d2b53"/><circle cx="32" cy="40" r="4" fill="#1d2b53"/><circle cx="12" cy="51" r="4" fill="#1d2b53"/><circle cx="32" cy="51" r="4" fill="#1d2b53"/></g>' +
          '<path d="M40 20l4 9 9 1-7 6 2 9-8-5-8 5 2-9-7-6 9-1zM165 14l3 6 6 1-5 4 1 6-5-3-5 3 1-6-5-4 6-1z" fill="#fff3a8"/>' +
        '</svg></div>' +
      '<h2 style="margin:18px 0 4px;font-size:clamp(2rem,9vw,3rem);font-weight:700;letter-spacing:.5px;color:#ffd23f;text-shadow:0 4px 0 #b97800,0 10px 24px rgba(0,0,0,.35);animation:gfSobe .5s .5s both">VOCÊ VENCEU!</h2>' +
      '<p style="margin:0 0 6px;font-size:1.25rem;font-weight:600;animation:gfSobe .5s .7s both">' + (nome ? 'Parabéns, ' + esc(nome) + '! 🎉' : 'Parabéns! 🎉') + '</p>' +
      '<p style="margin:0 auto 18px;max-width:340px;font-family:Nunito,system-ui,sans-serif;font-size:1.02rem;line-height:1.45;opacity:.95;animation:gfSobe .5s .9s both">' + esc(frase) + '</p>';
    var bt = document.createElement('button'); bt.type = 'button'; bt.textContent = '📋 Ver meu relatório';
    bt.style.cssText = 'font:inherit;font-size:1.1rem;font-weight:700;border:0;border-radius:14px;padding:13px 22px;cursor:pointer;background:#ffd23f;color:#1d2b53;box-shadow:0 5px 0 #b97800;animation:gfSobe .5s 1.1s both';
    var som = document.createElement('button'); som.type = 'button'; som.setAttribute('aria-label', 'Ligar ou desligar o som');
    som.textContent = somFestaMudo ? '🔇' : '🔊';
    som.style.cssText = 'position:absolute;top:12px;right:12px;z-index:2;font-size:1.3rem;border:0;border-radius:50%;width:44px;height:44px;cursor:pointer;background:rgba(255,255,255,.18);color:#fff';
    c.appendChild(bt); fundo.appendChild(c); fundo.appendChild(som); document.body.appendChild(fundo);
    requestAnimationFrame(function(){ fundo.style.opacity = '1'; });
    var audio = somVitoria();
    som.addEventListener('click', function(){
      somFestaMudo = !somFestaMudo; som.textContent = somFestaMudo ? '🔇' : '🔊';
      try{ localStorage.setItem('gm_festa_mudo', somFestaMudo ? '1' : '0'); }catch(e){}
      if(somFestaMudo && audio){ try{ audio.close(); }catch(e){} audio = null; }
    });
    /* Confete */
    var ctx = cv.getContext('2d'), W, H, pecas = [], cores = ['#ffd23f','#d9442f','#12865f','#2f63d6','#b9d4ff','#ffb4a6','#a6e4c6','#d8c9ff'], vivo = true;
    function tamanho(){ var r = window.devicePixelRatio || 1; W = fundo.clientWidth; H = fundo.clientHeight; cv.width = W * r; cv.height = H * r; ctx.setTransform(r, 0, 0, r, 0, 0); }
    tamanho(); window.addEventListener('resize', tamanho);
    function rajada(n, x){ for(var i = 0; i < n; i++) pecas.push({x: x, y: H + 10, vx: (Math.random() - .5) * 9, vy: -(9 + Math.random() * 9), r: Math.random() * 6.28, vr: (Math.random() - .5) * .3, w: 6 + Math.random() * 7, h: 4 + Math.random() * 6, c: cores[i % cores.length]}); }
    rajada(90, W * .2); rajada(90, W * .8);
    var chuva = setInterval(function(){ for(var i = 0; i < 6; i++) pecas.push({x: Math.random() * W, y: -10, vx: (Math.random() - .5) * 2, vy: 2 + Math.random() * 2, r: Math.random() * 6.28, vr: (Math.random() - .5) * .2, w: 6 + Math.random() * 7, h: 4 + Math.random() * 6, c: cores[(Math.random() * cores.length) | 0]}); }, 120);
    setTimeout(function(){ rajada(70, W * .5); }, 900);
    (function quadro(){
      if(!vivo) return;
      ctx.clearRect(0, 0, W, H);
      pecas = pecas.filter(function(p){ return p.y < H + 30; });
      pecas.forEach(function(p){ p.vy += .22; p.vx *= .99; p.x += p.vx; p.y += p.vy; p.r += p.vr;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = p.c; ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h * Math.abs(Math.cos(p.r * 2))); ctx.restore(); });
      requestAnimationFrame(quadro);
    })();
    var fechado = false;
    function seguir(){
      if(fechado) return; fechado = true; vivo = false; clearInterval(chuva); window.removeEventListener('resize', tamanho);
      fundo.style.opacity = '0';
      setTimeout(function(){ if(fundo.parentNode) fundo.parentNode.removeChild(fundo); if(audio){ try{ audio.close(); }catch(e){} } }, 350);
      if(typeof depois === 'function') depois();
    }
    bt.addEventListener('click', seguir);
    setTimeout(function(){ try{ bt.focus(); }catch(e){} }, 1200);
  }
  window.ResultadoJogo = window.ResultadoJogo || {};
  window.ResultadoJogo.festaVitoria = festaVitoria;
  window.ResultadoJogo.temFesta = function(id){ return !!FESTA_VITORIA[id]; };

  /* Relatório em PDF: abre a versão para impressão; em "Imprimir" escolha "Salvar como PDF" */
  function relatorioHtml(d){
    var linhas = [['Aluno(a)', d.aluno], ['Série / turma', d.serie], ['Atividade', d.atividade], ['Acertos', d.acertos + ' de ' + d.total], ['Nota (0 a 10)', nota1(d.nota)], ['Pontos', d.pontos], ['Data', d.data]];
    var tr = linhas.map(function(l){ return '<tr><th>' + esc(l[0]) + '</th><td>' + esc(l[1]) + '</td></tr>'; }).join('');
    return '<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Resultado final</title><style>' +
      'body{font-family:Arial,Helvetica,sans-serif;color:#1b2440;margin:40px}h1{color:#1d2b53;margin:0 0 4px}.sub{color:#5d6785;margin:0 0 24px}' +
      'table{border-collapse:collapse;width:100%}th,td{border:1px solid #b8c0d9;padding:10px;text-align:left}th{background:#eef0fb;width:35%}' +
      '.rod{margin-top:26px;color:#5d6785;font-size:12px}</style></head><body>' +
      '<h1>Resultado final da atividade</h1><p class="sub">Gamifica Educação</p><table>' + tr + '</table>' +
      '<p class="rod">Relatório gerado automaticamente ao término da atividade.</p></body></html>';
  }
  function pdf(d){
    var w = window.open('', '_blank');
    if(!w){ window.alert('Permita pop-ups deste site para baixar o PDF.'); return; }
    w.document.open(); w.document.write(relatorioHtml(d)); w.document.close();
    w.focus(); setTimeout(function(){ try{ w.print(); }catch(e){} }, 400);
  }

  /* Código injetado no início de cada jogo (escrito como função para não ter problema de aspas).
     - Som: todo áudio passa por um controle geral, que o botão 🔊 liga e desliga.
     - Proteção: bloqueia clique direito e atalhos de salvar/inspecionar fora dos campos de digitação. */
  function jogoPatch(){
    /* Um só botão de tela cheia: o do portal. Esconde o ⛶ que alguns jogos têm por conta própria. */
    (function esconderTelaCheia(){
      /* Seletores dos controles próprios de tela cheia e de som dos jogos. */
      var seletores = ['button[aria-label*="tela cheia" i]','button[title*="tela cheia" i]','button[aria-label*="fullscreen" i]','button[title*="fullscreen" i]','button[aria-label*="tela inteira" i]','button[title*="tela inteira" i]','#btnTela','#btn-tela','#fullscreen','#btnFullscreen','.btn-tela','.btn-fullscreen','button[aria-label~="som" i]','button[title~="som" i]','button[aria-label~="sound" i]','button[title~="sound" i]','button[aria-label~="mudo" i]','button[title~="mudo" i]','#btnSom','#btn-som','#btnSomJogo','#soundBtn'];
      var css = seletores.join(',') + '{display:none!important}';
      var st = document.createElement('style'); st.textContent = css;
      (document.head || document.documentElement).appendChild(st);
      var simbolos = ['⛶', '⤢', '⤡', '⛷', '🔊', '🔉', '🔈', '🔇'];
      /* Esconde com estilo inline (vence qualquer CSS do jogo, mesmo com !important) */
      function esconde(e){ if(e && e.style && e.style.getPropertyValue('display') !== 'none') e.style.setProperty('display', 'none', 'important'); }
      function limpa(){
        for (var j = 0; j < seletores.length; j++){
          var achados = document.querySelectorAll(seletores[j]);
          for (var a = 0; a < achados.length; a++) esconde(achados[a]);
        }
        var todos = document.querySelectorAll('body *');
        for (var i = 0; i < todos.length; i++){
          var e = todos[i];
          if (e.children.length || (e.tagName !== 'BUTTON' && e.tagName !== 'SPAN' && e.tagName !== 'A')) continue;
          var t = (e.textContent || '').replace(/[︎️\s]/g, '');
          if (!t || t.length > 4) continue;
          for (var k = 0; k < simbolos.length; k++){ if (t.indexOf(simbolos[k]) >= 0){ esconde(e); break; } }
        }
      }
      limpa();
      try{ new MutationObserver(limpa).observe(document.documentElement, {childList: true, subtree: true, attributes: true, attributeFilter: ['style', 'class']}); }catch(e){}
      document.addEventListener('DOMContentLoaded', limpa);
      window.addEventListener('load', limpa);
    })();
    var mudo = false, masters = [];
    window.__gamificaSomSet = function(m){ mudo = !!m; masters.forEach(function(g){ try{ g.gain.value = mudo ? 0 : 1; }catch(e){} }); try{ document.querySelectorAll('audio,video').forEach(function(x){ x.muted = mudo; }); }catch(e){} };
    var AC = window.AudioContext || window.webkitAudioContext;
    if (AC){
      var Patched = function(){
        var ctx = Reflect.construct(AC, arguments, Patched);
        try{
          var real = ctx.destination, master = ctx.createGain();
          master.gain.value = mudo ? 0 : 1; master.connect(real); masters.push(master);
          Object.defineProperty(ctx, 'destination', {configurable: true, get: function(){ return master; }});
        }catch(e){}
        return ctx;
      };
      Patched.prototype = Object.create(AC.prototype); Patched.prototype.constructor = Patched;
      try{ window.AudioContext = Patched; }catch(e){}
      if (window.webkitAudioContext){ try{ window.webkitAudioContext = Patched; }catch(e){} }
    }
  }
  /* Som temático para QUALQUER item: clique, acerto, erro e fim, com sons conforme o tema.
     Usa o AudioContext já ligado ao controle geral (botão 🔊 do portal). */
  function somTematico(){
    var ctx = null, ultimo = 0;
    var tema = String(window.__gamificaTema || '').toLowerCase();
    var paleta = /financ|dinheiro|juros|orcament|cart|compra|mercado|pagamento/.test(tema) ? 'moedas'
               : /espa|alien|geometr|solid|planet|gerador|3d|dado/.test(tema) ? 'espaco' : 'jogo';
    function audio(){
      if (ctx) return ctx;
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      try{ ctx = new AC(); }catch(e){ ctx = null; }
      return ctx;
    }
    function nota(f, t0, dur, tipo, vol, f2){
      var c = audio(); if (!c) return;
      try{
        if (c.state === 'suspended') c.resume();
        var t = c.currentTime + t0, o = c.createOscillator(), g = c.createGain();
        o.type = tipo || 'triangle';
        o.frequency.setValueAtTime(f, t);
        if (f2) o.frequency.exponentialRampToValueAtTime(f2, t + dur);
        g.gain.setValueAtTime(vol || 0.08, t);
        g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        o.connect(g); g.connect(c.destination);
        o.start(t); o.stop(t + dur + 0.05);
      }catch(e){}
    }
    var sons = {
      clique: function(){ nota(880, 0, .045, 'square', .025); },
      certo: function(){
        if (paleta === 'moedas'){ nota(988, 0, .10, 'square', .05); nota(1319, .09, .22, 'square', .05); }
        else if (paleta === 'espaco'){ nota(400, 0, .25, 'sine', .09, 1200); nota(1200, .22, .18, 'triangle', .07); }
        else { nota(523, 0, .12); nota(659, .1, .12); nota(784, .2, .22); }
      },
      errado: function(){
        if (paleta === 'moedas'){ nota(196, 0, .25, 'sawtooth', .05); nota(147, .2, .3, 'sawtooth', .05); }
        else if (paleta === 'espaco'){ nota(700, 0, .35, 'sine', .08, 150); }
        else { nota(220, 0, .18, 'sawtooth', .05); nota(165, .16, .25, 'sawtooth', .05); }
      },
      fim: function(){
        if (paleta === 'moedas'){ [988,1175,1319,1568].forEach(function(f,i){ nota(f, i*.09, .16, 'square', .045); }); }
        else if (paleta === 'espaco'){ [392,523,659,784,1047].forEach(function(f,i){ nota(f, i*.12, .3, 'sine', .07); }); }
        else { [523,659,784,1047].forEach(function(f,i){ nota(f, i*.13, .26); }); }
      }
    };
    /* Música de fundo em loop, gerada no navegador (sem arquivos). Começa com o item. */
    function tomAbs(f, tipo, dur, vol, ta){
      var c = audio(); if (!c) return;
      try{
        var o = c.createOscillator(), g = c.createGain();
        o.type = tipo; o.frequency.setValueAtTime(f, ta);
        g.gain.setValueAtTime(0.0001, ta);
        g.gain.linearRampToValueAtTime(vol, ta + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, ta + dur);
        o.connect(g); g.connect(c.destination);
        o.start(ta); o.stop(ta + dur + 0.05);
      }catch(e){}
    }
    var acordes = {
      jogo:   [[220, 261.63, 329.63], [174.61, 220, 261.63], [261.63, 329.63, 392], [196, 246.94, 293.66]],
      moedas: [[261.63, 329.63, 392], [196, 246.94, 293.66], [220, 261.63, 329.63], [174.61, 220, 261.63]],
      espaco: [[164.81, 196, 246.94], [261.63, 329.63, 392], [196, 246.94, 293.66], [293.66, 369.99, 440]]
    };
    var bpm = {jogo: 112, moedas: 124, espaco: 78}[paleta];
    var musicaIniciada = false;
    function iniciaMusica(c){
      if (musicaIniciada) return; musicaIniciada = true;
      var passo = 60 / bpm / 2, t0 = c.currentTime + 0.3, n = 0, proximo = t0;
      var base = acordes[paleta];
      function agenda(){
        while (proximo < c.currentTime + 0.6){
          var acorde = base[Math.floor(n / 8) % 4], pos = n % 8, ta = t0 + n * passo;
          if (pos === 0) tomAbs(acorde[0] / 2, 'sine', passo * 6, 0.08, ta);
          var nota = acorde[[0, 1, 2, 1][pos % 4]] * (pos >= 4 ? 2 : 1);
          if (paleta === 'espaco') tomAbs(nota, 'sine', passo * 3.5, 0.05, ta);
          else tomAbs(nota, 'triangle', passo * 1.6, 0.055, ta);
          n++; proximo = t0 + n * passo;
        }
      }
      agenda();
      setInterval(agenda, 120);
    }
    var tentativas = 0, timerMusica = null;
    function ligaMusica(){
      if (musicaIniciada) return;
      /* Se o próprio jogo já tem música (botão 🎵), não sobrepõe outra */
      if (document.querySelector('[id*="usica"],[aria-label*="úsica"],[title*="úsica"],[aria-label*="usic"],[title*="usic"]')) { musicaIniciada = true; return; }
      var c = audio(); if (!c) return;
      try{
        if (c.state === 'running'){ iniciaMusica(c); return; }
        c.resume().then(function(){ if (c.state === 'running') iniciaMusica(c); }).catch(function(){});
      }catch(e){}
    }
    /* Música de fundo desligada: só os efeitos curtos de acerto/erro. */

    function toca(nome){
      var agora = Date.now(); if (agora - ultimo < 250) return; ultimo = agora;
      sons[nome]();
    }
    /* Clique em botões e opções */
    document.addEventListener('click', function(e){
      var t = e.target; if (!t || !t.closest) return;
      if (t.closest('button,[role="button"],.opt,.chip,.tab,.cartao,.card,a')) toca('clique');
    }, true);
    /* Feedback: textos que aparecem na tela (acerto, erro, fim) */
    var RE_CERTO = /corre[tc]|certo|acert|parab[ée]ns|muito bem|isso mesmo|✅/i;
    var RE_ERRADO = /errad|incorret|errou|tente de novo|quase|❌/i;
    var RE_FIM = /fim de jogo|vencedor|vit[óo]ria|venceu|ganhou|resultado final|fim da (partida|atividade)|conclu[ií]d|terminou|🏆/i;
    function olha(no){
      if (!no || no.nodeType !== 1) return;
      var txt = (no.textContent || '').trim();
      if (!txt || txt.length > 140) return;
      if (RE_FIM.test(txt)) toca('fim');
      else if (RE_CERTO.test(txt)) toca('certo');
      else if (RE_ERRADO.test(txt)) toca('errado');
    }
    try{
      new MutationObserver(function(lista){
        lista.forEach(function(m){ for (var i = 0; i < m.addedNodes.length; i++) olha(m.addedNodes[i]); });
      }).observe(document.documentElement, {childList: true, subtree: true});
    }catch(e){}
  }

  function protecaoTela(){
    function campo(t){ return !!t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable); }
    document.addEventListener('contextmenu', function(e){ if(!campo(e.target)) e.preventDefault(); });
    document.addEventListener('keydown', function(e){
      var k = String(e.key || '').toLowerCase(), ctrl = e.ctrlKey || e.metaKey;
      if (e.key === 'F12' || (ctrl && (k === 'u' || k === 's')) || (ctrl && e.shiftKey && (k === 'i' || k === 'j' || k === 'c'))){
        e.preventDefault(); e.stopPropagation();
      }
    }, true);
    var st = document.createElement('style');
    st.textContent = 'body{-webkit-user-select:none;user-select:none}input,textarea,[contenteditable]{-webkit-user-select:text;user-select:text}';
    (document.head || document.documentElement).appendChild(st);
  }

  window.ResultadoJogo = window.ResultadoJogo || {};
  /* Insere o código de som/proteção antes de qualquer script do jogo */
  /* Sincroniza com a conta os dados que a ferramenta guarda no navegador.
     Roda antes da ferramenta: entrega os dados salvos na conta e envia ao site as mudanças.
     Autocontida (é copiada como texto para dentro da ferramenta) e nunca interrompe a ferramenta. */
  function sincronia(seed){
    try{
      if(!seed || !seed.ativo || window.parent === window) return;
      var real = window.localStorage;
      var sGet = Storage.prototype.getItem, sSet = Storage.prototype.setItem;
      var sDel = Storage.prototype.removeItem, sLimpa = Storage.prototype.clear;
      var rastreadas = {}, ultimo = null, timer = null;
      function snapshot(){
        var o = {};
        Object.keys(rastreadas).forEach(function(k){ var v = sGet.call(real, k); if(v !== null) o[k] = v; });
        return o;
      }
      function enviar(){
        try{
          var s = JSON.stringify(snapshot());
          if(s === ultimo) return;
          ultimo = s;
          window.parent.postMessage({gcSync: 1, dados: JSON.parse(s)}, location.origin);
        }catch(e){}
      }
      function agendar(){ clearTimeout(timer); timer = setTimeout(enviar, 700); }
      var d = seed.dados || {};
      Object.keys(d).forEach(function(k){ try{ sSet.call(real, k, d[k]); rastreadas[k] = true; }catch(e){} });
      Storage.prototype.getItem = function(k){ if(this === real){ rastreadas[k] = true; agendar(); } return sGet.call(this, k); };
      Storage.prototype.setItem = function(k, v){ var r = sSet.call(this, k, v); if(this === real){ rastreadas[k] = true; agendar(); } return r; };
      Storage.prototype.removeItem = function(k){ var r = sDel.call(this, k); if(this === real){ delete rastreadas[k]; agendar(); } return r; };
      Storage.prototype.clear = function(){ var r = sLimpa.call(this); if(this === real){ rastreadas = {}; agendar(); } return r; };
      window.addEventListener('pagehide', enviar);
      agendar();
    }catch(e){}
  }

  window.ResultadoJogo.preparar = function(html, tema, seed){
    var tag = '<script>window.__gamificaTema=' + JSON.stringify(String(tema || '')) + ';(' + jogoPatch.toString() + ')();(' + somTematico.toString() + ')();(' + protecaoTela.toString() + ')();(' + sincronia.toString() + ')(' + JSON.stringify(seed || {ativo: false}).replace(/</g, '\\u003c') + ');</script>';
    return /<head[^>]*>/i.test(html) ? html.replace(/<head[^>]*>/i, function(m){ return m + tag; }) : tag + html;
  };
  /* Proteção básica também na própria página do portal */
  window.ResultadoJogo.protegerPagina = function(){ try{ protecaoTela(); }catch(e){} };
  /* Marca d'água com o nome de quem está usando (desencoraja repasse e cópia de tela) */
  window.ResultadoJogo.marcaDagua = function(texto){
    window.ResultadoJogo.removerMarcaDagua();
    if(!texto) return null;
    var d = document.createElement('div'); d.id = 'marca-dagua'; d.setAttribute('aria-hidden', 'true');
    d.style.cssText = 'position:fixed;inset:-40%;z-index:2147483000;pointer-events:none;transform:rotate(-24deg);display:flex;flex-wrap:wrap;align-content:flex-start;gap:64px 80px;padding:30px;font:700 17px system-ui,Arial,sans-serif;color:rgba(30,41,59,.13);white-space:nowrap;user-select:none';
    for(var i = 0; i < 140; i++){ var sp = document.createElement('span'); sp.textContent = texto; d.appendChild(sp); }
    document.body.appendChild(d); return d;
  };
  window.ResultadoJogo.removerMarcaDagua = function(){ var d = document.getElementById('marca-dagua'); if(d && d.parentNode) d.parentNode.removeChild(d); };

  /* Liga/desliga o som do jogo que está no iframe */
  window.ResultadoJogo.somDoJogo = function(quadro, mudo){
    try{ if(quadro && quadro.contentWindow && quadro.contentWindow.__gamificaSomSet) quadro.contentWindow.__gamificaSomSet(mudo); }catch(e){}
  };
  /* Tela cheia do jogo (o próprio iframe ou o contêiner indicado) */
  window.ResultadoJogo.telaCheia = function(elemento){
    try{
      if(document.fullscreenElement) document.exitFullscreen();
      else if(elemento && elemento.requestFullscreen) elemento.requestFullscreen().catch(function(){});
    }catch(e){}
  };

  Object.assign(window.ResultadoJogo, {
    pdf: pdf,
    baixarWord: baixarWord,
    /* quadro: o iframe do jogo; titulo: nome da atividade (para o resultado) */
    anexar: function(quadro, titulo, id){
      quadro.addEventListener('load', function(){
        var win; try{ win = quadro.contentWindow; }catch(e){ return; }
        var G = win && win.GAMIFICA;
        if(!G || G.__resultadoLigado) return;
        G.__resultadoLigado = true;

        /* Quando o jogo termina e envia a nota, mostra o resultado final */
        var enviarOriginal = G.enviar;
        G.enviar = function(acertos, total, pontos){
          var r = typeof enviarOriginal === 'function' ? enviarOriginal.apply(G, arguments) : false;
          var a = Math.round(Number(acertos)), t = Math.round(Number(total));
          if(t >= 1 && a >= 0){
            if(a > t) a = t;
            var dados = {
              aluno: G.aluno || 'Aluno(a) não identificado', serie: G.turma || '—', atividade: titulo || 'Atividade',
              acertos: a, total: t, nota: a / t * 10, pontos: Math.max(0, Math.round(Number(pontos) || 0)),
              data: new Date().toLocaleDateString('pt-BR') + ' às ' + new Date().toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit'})
            };
            if(id && FESTA_VITORIA[id]) festaVitoria(dados, function(){ mostrarResultado(dados); });
            else mostrarResultado(dados);
          }
          return r;
        };
      });
    }
  });
})();
