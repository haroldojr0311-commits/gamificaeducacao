/* Demonstração gratuita: 5 minutos por dia em cada jogo, sem cadastro.
   O tempo só conta com a página aberta e visível. Para liberar tudo: degustação ou Plano Pró. */
(function(){
  var s = document.currentScript, id = (s && s.getAttribute('data-id')) || 'demo';
  var TOTAL = 300, hoje = new Date().toISOString().slice(0, 10), chave = 'demo:' + id + ':' + hoje, usado = 0;
  try{ usado = parseInt(localStorage.getItem(chave) || '0', 10) || 0; }catch(e){}
  var fim = false;
  var selo = document.createElement('div');
  selo.setAttribute('style', 'position:fixed;right:10px;bottom:10px;z-index:2147483000;background:#1d2b53;color:#fff;font:700 14px/1.2 system-ui,sans-serif;padding:8px 14px;border-radius:999px;box-shadow:0 4px 14px rgba(0,0,0,.35);border:2px solid #ffd23f');
  selo.setAttribute('aria-label', 'Demonstração gratuita');
  function fmt(t){ var m = Math.floor(t / 60), x = t % 60; return m + ':' + (x < 10 ? '0' : '') + x; }
  function desenhar(){ selo.textContent = '▶️ Demo grátis · ' + fmt(Math.max(0, TOTAL - usado)); }
  function terminar(){
    if(fim) return; fim = true; selo.remove();
    var o = document.createElement('div');
    o.setAttribute('role', 'dialog'); o.setAttribute('aria-modal', 'true'); o.setAttribute('aria-label', 'Fim da demonstração');
    o.setAttribute('style', 'position:fixed;inset:0;z-index:2147483647;background:rgba(15,23,48,.94);display:grid;place-items:center;padding:20px;font-family:system-ui,sans-serif');
    o.innerHTML = '<div style="background:#fff;color:#1d2b53;max-width:460px;width:100%;border-radius:22px;padding:26px;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,.5)">'
      + '<div style="font-size:54px" aria-hidden="true">⏱️</div>'
      + '<h2 style="margin:6px 0 8px;font-size:1.5rem">Acabou a demonstração!</h2>'
      + '<p style="margin:0 0 18px;font-size:1.05rem;line-height:1.5">Gostou? Faça a <b>degustação grátis de 5 minutos</b> com todos os jogos, ou veja o catálogo completo. Amanhã você pode jogar a demonstração de novo.</p>'
      + '<a href="../#degustacao" style="display:block;background:#ffd23f;color:#1d2b53;font-weight:800;text-decoration:none;padding:14px;border-radius:14px;margin-bottom:10px;border:2px solid #e0ad00">⏱️ Fazer a degustação grátis</a>'
      + '<a href="../catalogo/" style="display:block;background:#fff;color:#1d2b53;font-weight:800;text-decoration:none;padding:14px;border-radius:14px;border:2px solid #cfd8ec">📚 Ver o catálogo</a></div>';
    document.body.appendChild(o);
    var a = o.querySelector('a'); if(a) a.focus();
  }
  function bloquearTeclas(ev){ if(fim){ ev.stopPropagation(); ev.preventDefault(); } }
  ['keydown', 'keyup', 'keypress'].forEach(function(t){ document.addEventListener(t, function(ev){ if(fim && ev.target && ev.target.closest && ev.target.closest('[role=dialog]')) return; bloquearTeclas(ev); }, true); });
  if(usado >= TOTAL){ document.addEventListener('DOMContentLoaded', terminar); if(document.readyState !== 'loading') terminar(); return; }
  function iniciar(){
    document.body.appendChild(selo); desenhar();
    setInterval(function(){
      if(fim || document.hidden) return;
      usado++; try{ localStorage.setItem(chave, String(usado)); }catch(e){}
      desenhar(); if(usado >= TOTAL) terminar();
    }, 1000);
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar); else iniciar();
})();
