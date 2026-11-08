# Mural Turbo — etapas

Já feito (MVP + acesso):
- Lista de murais, criação, edição e exclusão
- Publicações de texto, imagem e link; layouts Grade, Colunas, Linha do tempo e Lista
- Código de acesso de 6 caracteres, permissão (só leitura / pode publicar) e aprovação antes de publicar
- Leitura e publicação só por funções seguras no banco; limite de 20 publicações por minuto em cada mural

Etapa 2 (feita):
- [x] Limite de tentativas para o código (20 erros em 15 minutos, por mural e por endereço de rede)
- [x] Upload de arquivos (imagem, PDF e documentos) com limite de tamanho e compressão de imagens no navegador
- [x] Áudio (upload ou gravação pelo navegador)
- [x] Vídeo (upload, ou link do YouTube/Vimeo incorporado)
- [x] Reações (curtir, aplaudir, dúvida) com contador
- [x] Comentários por publicação
- [x] QR Code do mural, para projetar ou imprimir
- [x] Exportar / salvar em PDF com layout limpo (pela impressão do navegador)
- [x] Modo apresentação em tela cheia, com transição automática entre as publicações

Limitações conhecidas:
- [ ] Teste completo com o Supabase real ainda não foi feito (o teste usou um simulador do banco)
- [ ] O limite de tentativas é por endereço de rede: escolas com um único IP podem bloquear vários alunos juntos
- [ ] Upload de arquivo para pastas de murais existentes é aberto a quem tiver o endereço; a proteção atual é só tipo e tamanho do arquivo

Próximas ideias (ainda não pedidas):
- [ ] Desenho livre / anotação com caneta
- [ ] Busca e filtro por tipo de publicação e por autor
- [ ] Arrastar e soltar para reordenar
- [ ] Modo escuro
