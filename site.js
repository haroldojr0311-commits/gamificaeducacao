/* Funções públicas do site: depoimentos, aviso de novidades e cancelamento.
   Usa a chave pública do portal (mesma de turma/supabase-config.js, feita para ficar no navegador).
   Toda a segurança está no banco: cada função valida os dados e limita abusos. */
(function(){
  var URL_ = "https://ujzmqpsxfxpxehasoxbq.supabase.co", KEY_ = "sb_publishable_wEtFV7CnN28YKIAclZfPQg_QVkVJPVn";
  function rpc(nome, args){
    return fetch(URL_ + '/rest/v1/rpc/' + nome, {method: 'POST', headers: {'Content-Type': 'application/json', apikey: KEY_, Authorization: 'Bearer ' + KEY_}, body: JSON.stringify(args || {})})
      .then(function(r){ return r.json().catch(function(){ return null; }).then(function(j){
        if(!r.ok) throw new Error((j && j.message) || 'Não foi possível concluir agora. Tente de novo.');
        return j; }); });
  }
  function esc(s){ return String(s || '').replace(/[&<>"]/g, function(c){ return {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c]; }); }
  function mostrarDep(listaId, cardId, max, jsonUrl){
    Promise.all([
      rpc('depoimentos_publicos').catch(function(){ return []; }),
      fetch(jsonUrl, {cache: 'no-store'}).then(function(r){ return r.ok ? r.json() : []; }).catch(function(){ return []; })
    ]).then(function(p){
      var L = (p[0] || []).concat(p[1] || []).slice(0, max); if(!L.length) return;
      document.getElementById(listaId).innerHTML = '<div class="grade">' + L.map(function(d){
        return '<div class="item" style="padding:14px"><p style="-webkit-line-clamp:unset;color:#1d2b53">“' + esc(d.texto) + '”</p><p style="margin-top:8px"><b>' + esc(d.nome) + '</b>' + (d.funcao ? '<br>' + esc(d.funcao) : '') + '</p></div>'; }).join('') + '</div>';
      var c = cardId && document.getElementById(cardId); if(c) c.hidden = false;
    });
  }
  function ligar(formId, enviar){
    var f = document.getElementById(formId); if(!f) return;
    var st = f.querySelector('.status'), bt = f.querySelector('button[type=submit]');
    f.addEventListener('submit', function(ev){
      ev.preventDefault();
      var d = new FormData(f);
      if(d.get('site')){ st.className = 'status ok'; st.textContent = '✅ Enviado!'; return; }   /* campo-isca contra robôs */
      st.className = 'status'; st.textContent = 'Enviando…'; bt.disabled = true;
      enviar(d).then(function(m){ st.className = 'status ok'; st.textContent = m; f.reset(); })
        .catch(function(e){ st.className = 'status erro'; st.textContent = e.message; })
        .then(function(){ bt.disabled = false; });
    });
  }
  window.GamificaAPI = {rpc: rpc};
  window.GamificaDep = {mostrar: mostrarDep};
  window.GamificaForms = {
    depoimento: function(id){ ligar(id, function(d){ return rpc('enviar_depoimento', {p_nome: d.get('nome'), p_funcao: d.get('funcao'), p_texto: d.get('texto')}).then(function(){ return '✅ Obrigado! Seu depoimento será publicado depois que o professor Haroldo aprovar.'; }); }); },
    avisos: function(id){ ligar(id, function(d){ return rpc('assinar_novidades', {p_email: d.get('email')}).then(function(){ return '✅ Pronto! Você vai receber um e-mail quando sair novidade.'; }); }); },
    cancelar: function(id){ ligar(id, function(d){ return rpc('cancelar_novidades', {p_email: d.get('email')}).then(function(){ return '✅ Cadastro cancelado. Você não vai mais receber avisos.'; }); }); }
  };
})();
