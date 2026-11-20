# Ferramentas do portal Gamefica Ação Matemática

O site é UM só: `index.html` (login, jogos, turmas e notas, administração).
Os alunos usam `turma/jogar.html?a=CÓDIGO` (link gerado na aba "Turmas e notas").

## Como funciona a proteção
- Contas e sessões ficam no Supabase (projeto "Gamefica teste").
  - `perfis`: quem pode entrar (papel admin/assinante, ativo, validade).
  - `sessoes`: um aparelho por conta. Ao entrar em outro aparelho, o anterior é desconectado.
  - `acessos`: histórico de entradas e desconexões (aparece na aba Administração).
- Os jogos ficam CIFRADOS em `protegido/<id>.json`. Só a função `jogo` do Supabase
  (que guarda a chave privada na tabela `segredos`) consegue abrir, e só para:
  - conta ativa com a sessão válida; ou
  - aluno com o código de uma atividade aberta.
- A função `admin-contas` cria contas, troca senhas e exclui contas (só para o administrador).
- Login sem @ vira `login@contas.gamefica.example.com` (nenhum e-mail é enviado).

## Publicar um jogo novo ou atualizado
1. `node _ferramentas/proteger.mjs <id> <arquivo.html>` (embute a ponte e cifra).
2. Acrescente/atualize o item em `turma/jogos.js` (nome, tema, desc, emoji, cor; `ferramenta: true` para ferramentas).
3. Para o jogo mandar nota na turma, ele deve chamar `GAMIFICA.enviar(acertos, total, pontos)` ao terminar
   (veja `_ferramentas/ponte-portal.js`). Dentro do portal o jogo abre em "modo livre" (`#livre`) e não envia nota.

## Checklist a cada jogo, simulador ou ferramenta nova (sempre, sem esperar pedido)
1. Cifrar: `node _ferramentas/proteger.mjs <id> <arquivo.html>`.
2. `turma/jogos.js`: nome, tema (assunto, nunca a etapa), desc, emoji, cor, nivel (Fundamental 1, Fundamental 2, Ensino Médio, Superior),
   conteudo (obrigatório para jogos e simuladores), bncc quando houver código claro, tipo/ferramenta.
3. Conteúdo novo? Acrescentar em `ICONE_CONTEUDO` e `ORDEM_CONTEUDOS` no `index.html`.
4. Jogo e simulador atribuíveis devem chamar `GAMIFICA.enviar(acertos, total, pontos)` ao terminar.
5. Novidade em `turma/novidades.json` (data, hora, titulo, texto, link, jogo).
6. Trocar o `?v=` do jogos.js no `index.html` e a VERSAO do `sw.js`.
7. `python3 _ferramentas/gerar_paginas.py`: gera catálogo, sitemap, contagens e rodapé e CONFERE o catálogo.
   Se aparecer "⚠ PENDÊNCIAS", corrigir antes de publicar.

## Arquivos antigos
- `portal-antigo-cifrado.html`: o portal anterior (login no navegador), guardado só como cópia de segurança.
- `portal-fonte.html`, `construir.py`, `correio.mjs`: ferramentas do portal antigo (não usadas pelo site novo).
- Ao mudar `turma/jogos.js`, troque o `?v=` na linha do `index.html` que carrega o jogos.js (evita cartão antigo no cache).
- `publicados.json`: arquivos da pasta HTMLs do professor que já foram publicados.

## Retomar o jogo depois de recarregar (aluno)
- A página do aluno guarda nome, turma e o estado da tentativa (localStorage, por atividade) e mostra "Continuar a atividade".
- Para o jogo voltar exatamente de onde parou, ele precisa chamar `GAMIFICA.salvarEstado({...})` a cada fase/pergunta e,
  ao abrir, ler `GAMIFICA.estado` (via `GAMIFICA.aoReceberAluno`). Jogos sem isso reabrem do início.
- Ao enviar a nota, a página mostra os parabéns com mensagem de incentivo conforme a nota.

## Capturas de tela dos cartões
- Imagem real da atividade em `capturas/<id>.webp` (640×400). O catálogo (`gerar_paginas.py`) usa sozinho quando o arquivo existe.
- Na página inicial e no portal, acrescente o id em `CAPTURAS` no `index.html`.
- Página "Sobre" (`sobre.html`, foto em `sobre-foto.jpg`) é gerada pelo `gerar_paginas.py`.

## Catálogo: busca e imagens de compartilhamento (nov/2026)
- O catálogo tem busca (nome, tema, conteúdo, descrição, BNCC), sem acento e aceitando singular/plural. Endereço com busca: `catalogo/?q=frações`.
- `gerar_paginas.py` cria sozinho `og/<id>.png` para quem ainda não tem imagem de compartilhamento (precisa do Pillow).
- Os cartões mostram no máximo 3 linhas de descrição; o texto completo fica na página da atividade.
