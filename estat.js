/* Estatísticas de visitas do Gamifica Educação — anônimas, sem cookies e sem guardar IP.
   Registra só: página, site de origem (ex.: google.com), tipo de aparelho e data.
   Respeita o sinal "Não rastrear" do navegador. A chave abaixo é a mesma chave pública
   de turma/supabase-config.js (feita para ficar no navegador). */
(function(){
  try{
    if(navigator.doNotTrack === '1' || window.doNotTrack === '1') return;
    if(document.querySelector('meta[name="estat"][content="off"]')) return;
    if(location.protocol === 'file:' || /^(localhost|127\.|\[::1\])/.test(location.hostname)) return;
    var pag = location.pathname.replace(/index\.html$/, '').replace(/\/{2,}/g, '/') || '/';
    var chave = 'gv:' + pag;
    try{ if(sessionStorage.getItem(chave)) return; sessionStorage.setItem(chave, '1'); }catch(e){}
    var origem = '';
    try{ origem = document.referrer ? new URL(document.referrer).hostname : ''; }catch(e){}
    if(origem === location.hostname) origem = 'interno';
    var URL_ = "https://ujzmqpsxfxpxehasoxbq.supabase.co", KEY_ = "sb_publishable_wEtFV7CnN28YKIAclZfPQg_QVkVJPVn";
    fetch(URL_ + '/rest/v1/rpc/registrar_visita', {
      method: 'POST', keepalive: true,
      headers: {'Content-Type': 'application/json', apikey: KEY_, Authorization: 'Bearer ' + KEY_},
      body: JSON.stringify({p_pagina: pag, p_origem: origem, p_largura: window.innerWidth || 0})
    }).catch(function(){});
  }catch(e){}
})();
