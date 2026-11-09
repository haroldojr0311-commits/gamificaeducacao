// Catálogo do portal Gamifica Educação.
// Os arquivos dos jogos ficam CIFRADOS na pasta protegido/ (só o servidor abre).
// Para incluir um jogo novo: node _ferramentas/proteger.mjs <id> <arquivo.html> e acrescente um item aqui.
// cor: amarelo | coral | verde | azul | lilas | laranja
// ferramenta: true = aparece só para quem tem conta (não vira atividade de turma).
// bncc: códigos de habilidade da BNCC (Matemática) atendidos.
// tipo: "simulador" | "ferramenta" (aba onde aparece; sem tipo = Jogos). conteudo: agrupa os jogos na aba Jogos.
window.JOGOS = {
  "aventura-do-pi": {
    bncc: ["EF07MA31", "EF07MA33", "EF08MA19"],
    nivel: ["Fundamental 2"],
    nome: "Aventura do Pi",
    tema: "Geometria plana",
    desc: "Plataforma com portões de perímetro e área das figuras planas.",
    emoji: "🥧", cor: "laranja",
    conteudo: "Geometria"
  },
  "dossie-geometrico": {
    bncc: ["EF06MA17"],
    nivel: ["Fundamental 2", "Ensino Médio"],
    nome: "Dossiê Geométrico",
    tema: "Figuras e sólidos",
    desc: "Investigação: abra as pistas e descubra qual é a figura geométrica.",
    emoji: "🕵️", cor: "coral",
    conteudo: "Geometria"
  },
  "projeto-omega": {
    nivel: ["Fundamental 2", "Ensino Médio"],
    nome: "Projeto Ômega",
    tema: "Escape room",
    desc: "Resolva os enigmas das 4 portas antes que o tempo acabe.",
    emoji: "🔐", cor: "lilas",
    conteudo: "Desafios"
  },
  "forca-financeira": {
    nivel: ["Fundamental 2", "Ensino Médio"],
    nome: "Forca Financeira",
    tema: "Educação Financeira",
    desc: "Adivinhe 10 termos de educação financeira antes que as moedas acabem.",
    emoji: "💰", cor: "verde",
    conteudo: "Educação Financeira"
  },
  "orcamento-em-familia": {
    bncc: ["EM13MAT203"],
    nivel: ["Fundamental 2", "Ensino Médio"],
    nome: "Orçamento em Família",
    tema: "Educação Financeira",
    desc: "Cuide do dinheiro de uma família por 6 meses: contas, imprevistos, golpes e ranking.",
    emoji: "🏠", cor: "verde",
    conteudo: "Educação Financeira"
  },
  "invasao-alienigena": {
    bncc: ["EF06MA13", "EF07MA02"],
    nivel: ["Fundamental 2"],
    nome: "Invasão Alienígena",
    tema: "Porcentagem",
    desc: "Calcule porcentagens para defender a Terra dos invasores.",
    emoji: "👾", cor: "azul",
    conteudo: "Proporção e porcentagem"
  },
  "estatistica-agrupados": {
    bncc: ["EF08MA25", "EM13MAT316", "EM13MAT406"],
    nivel: ["Fundamental 2", "Ensino Médio"],
    nome: "Laboratório Estatístico",
    tema: "Estatística",
    desc: "Roteiro completo e escolhido pelo professor ou aluno: média, moda, rol e mediana, tabelas de frequência, medidas da tabela, histograma e polígono, desvio médio, variância, desvio padrão e coeficiente de variação.",
    emoji: "📊", cor: "amarelo",
    conteudo: "Estatística e probabilidade"
  },
  "laboratorio-de-funcoes": {
    bncc: ["EM13MAT302", "EM13MAT402", "EM13MAT503"],
    nivel: ["Ensino Médio"],
    nome: "Laboratório de Funções",
    tema: "Função do 2º grau",
    desc: "Raízes, vértice e gráfico da parábola, passo a passo.",
    emoji: "📈", cor: "azul",
    conteudo: "Funções e trigonometria"
  },
  "laboratorio-de-exponenciais": {
    bncc: ["EM13MAT303", "EM13MAT304"],
    nivel: ["Ensino Médio"],
    nome: "Laboratório de Exponenciais",
    tema: "Função exponencial",
    desc: "Crescimento, juros compostos e meia-vida: mude os controles, veja o gráfico e vença o desafio.",
    emoji: "🧪", cor: "verde",
    conteudo: "Funções e trigonometria"
  },
  "geometria-espacial-3d": {
    bncc: ["EF06MA17"],
    nivel: ["Ensino Médio"],
    nome: "Missão Geometria Espacial 3D",
    tema: "Geometria espacial",
    desc: "Conte vértices, arestas e faces dos sólidos girando em 3D.",
    emoji: "🧊", cor: "lilas",
    conteudo: "Geometria"
  },
  "show-da-proporcao": {
    bncc: ["EF07MA17", "EF09MA08"],
    nivel: ["Fundamental 2"],
    nome: "Show da Proporção",
    tema: "Proporcionalidade",
    desc: "Show de perguntas de regra de três valendo um milhão.",
    emoji: "🎤", cor: "amarelo",
    conteudo: "Proporção e porcentagem"
  },
  "uno-potenciacao": {
    bncc: ["EF08MA01"],
    nivel: ["Fundamental 2"],
    nome: "UNO da Potenciação",
    tema: "Potências",
    desc: "UNO contra o Prof. Robô com perguntas relâmpago de potências.",
    emoji: "🃏", cor: "coral",
    conteudo: "Números e operações"
  },
  "uno-radiciacao": {
    bncc: ["EF08MA02"],
    nivel: ["Fundamental 2"],
    nome: "UNO da Radiciação",
    tema: "Raízes",
    desc: "UNO contra o Prof. Robô com perguntas relâmpago de raízes.",
    emoji: "🃏", cor: "verde",
    conteudo: "Números e operações"
  },
  "uno-fracoes-decimais": {
    bncc: ["EF06MA08"],
    nivel: ["Fundamental 2"],
    nome: "UNO de Frações e Decimais",
    tema: "Frações",
    desc: "UNO contra o Prof. Robô: transforme frações em decimais.",
    emoji: "🃏", cor: "laranja",
    conteudo: "Números e operações"
  },
  "roda-gigante": {
    bncc: ["EM13MAT306"],
    nivel: ["Ensino Médio"],
    nome: "Roda-Gigante Trigonométrica",
    tema: "Trigonometria",
    desc: "A cabine gira e a altura vira gráfico: seno, cosseno, quadrantes e ângulos notáveis.",
    emoji: "🎡", cor: "lilas",
    conteudo: "Funções e trigonometria"
  },
  "leitor-gabaritos": {
    nivel: ["Fundamental 2", "Ensino Médio", "Superior"],
    nome: "Leitor de Gabaritos",
    tema: "Ferramenta do professor",
    desc: "Corrija cartões-resposta pela câmera do celular e veja as notas.",
    emoji: "📷", cor: "azul", ferramenta: true,
    tipo: "ferramenta"
  },
  "mapa-da-sala": {
    nivel: ["Fundamental 1", "Fundamental 2", "Ensino Médio", "Superior"],
    nome: "Mapa da Sala",
    tema: "Ferramenta do professor",
    desc: "Organize os grupos da sala por nível e imprima o mapa.",
    emoji: "🗺️", cor: "verde", ferramenta: true,
    tipo: "ferramenta"
  },
  "urna-eletronica": {
    nivel: ["Fundamental 2", "Ensino Médio"],
    nome: "Urna Eletrônica",
    tema: "Simulador",
    desc: "Simulador de votação com boletim de urna e zerésima.",
    emoji: "🗳️", cor: "amarelo", ferramenta: true,
    tipo: "simulador"
  },
  "laboratorio-probabilidade": {
    bncc: ["EF08MA22", "EM13MAT511"],
    nivel: ["Ensino Médio"],
    nome: "Laboratório de Probabilidade",
    tema: "Probabilidade",
    desc: "Lance dados e moedas, sorteie cartas e compare o observado com o teórico.",
    emoji: "🎲", cor: "lilas", ferramenta: true,
    tipo: "simulador"
  },
  "caca-palavras": {
    nivel: ["Fundamental 1", "Fundamental 2", "Ensino Médio"],
    nome: "Caça-Palavras Gerador",
    tema: "Ferramenta do professor",
    desc: "Cole um texto, gere a grade de palavras-chave e imprima com ou sem gabarito.",
    emoji: "🔤", cor: "lilas", ferramenta: true,
    tipo: "ferramenta"
  },
  "gerador-qrcode": {
    nivel: ["Fundamental 1", "Fundamental 2", "Ensino Médio", "Superior"],
    nome: "Gerador de QR Code",
    tema: "Ferramenta",
    desc: "Crie QR Codes com links ou textos e baixe a imagem em PNG.",
    emoji: "🔳", cor: "coral", ferramenta: true,
    tipo: "ferramenta"
  },
  "derivada-integral": {
    nivel: ["Superior"],
    nome: "Derivada e Integral",
    tema: "Cálculo",
    desc: "Veja no gráfico a integral definida como área e a derivada como inclinação.",
    emoji: "∫", cor: "azul", ferramenta: true,
    tipo: "simulador"
  },
  "sorteador": {
    nivel: ["Fundamental 1", "Fundamental 2", "Ensino Médio", "Superior"],
    nome: "Sorteador de Alunos e Grupos",
    tema: "Ferramenta do professor",
    desc: "Sorteie quem responde (sem repetir) e forme grupos com líder em um toque.",
    emoji: "🎲", cor: "verde", ferramenta: true,
    tipo: "ferramenta"
  },
  "calculadora-notas": {
    nivel: ["Fundamental 2", "Ensino Médio", "Superior"],
    nome: "Calculadora de Notas e Médias",
    tema: "Ferramenta do professor",
    desc: "Escolha as avaliações e os pesos, cole os nomes, digite as notas e veja quem foi aprovado.",
    emoji: "🧮", cor: "azul", ferramenta: true,
    tipo: "ferramenta"
  },
  "cronometro": {
    nivel: ["Fundamental 1", "Fundamental 2", "Ensino Médio", "Superior"],
    nome: "Cronômetro de Atividades",
    tema: "Ferramenta do professor",
    desc: "Contagem regressiva grande para projetar, com cores de alerta e alarme no fim.",
    emoji: "⏱️", cor: "laranja", ferramenta: true,
    tipo: "ferramenta"
  },
  "bingo": {
    nivel: ["Fundamental 1", "Fundamental 2", "Ensino Médio"],
    nome: "Bingo Matemático",
    tema: "Ferramenta do professor",
    desc: "Sorteie contas no telão com narração de locutor; os alunos calculam e marcam a resposta na cartela impressa.",
    emoji: "🎯", cor: "coral", ferramenta: true,
    tipo: "ferramenta"
  },
  "geoplano": {
    bncc: ["EF07MA31", "EF08MA19", "EF09MA14"],
    nivel: ["Fundamental 2"],
    nome: "Geoplano Digital",
    tema: "Geometria plana",
    desc: "Estique elásticos nos pinos: área, perímetro, Pitágoras e simetria, com 10 desafios.",
    emoji: "📐", cor: "laranja",
    tipo: "simulador", conteudo: "Geometria"
  },
  "domino-equivalencias": {
    bncc: ["EF05MA06", "EF06MA08"],
    nivel: ["Fundamental 2"],
    nome: "Dominó de Equivalências",
    tema: "Frações, decimais e %",
    desc: "Dominó contra o robô: encaixe frações, decimais, porcentagens e desenhos que valem o mesmo.",
    emoji: "🁫", cor: "azul",
    conteudo: "Números e operações"
  },
  "cofre-combinacoes": {
    bncc: ["EM13MAT310"],
    nivel: ["Ensino Médio"],
    nome: "Cofre das Combinações",
    tema: "Análise combinatória",
    desc: "Abra 10 cofres resolvendo problemas de princípio multiplicativo, fatorial, permutação, arranjo e combinação.",
    emoji: "🔐", cor: "lilas",
    conteudo: "Estatística e probabilidade"
  },
  "escada-progressoes": {
    bncc: ["EM13MAT507", "EM13MAT508"],
    nivel: ["Ensino Médio"],
    nome: "Escada das Progressões",
    tema: "PA e PG",
    desc: "Suba 10 degraus resolvendo PA e PG: próximo termo, razão, termo geral, soma e problemas do dia a dia.",
    emoji: "🪜", cor: "amarelo",
    conteudo: "Álgebra"
  },
  "batalha-naval": {
    bncc: ["EF05MA15", "EF06MA16"],
    nivel: ["Fundamental 2"],
    nome: "Batalha Naval Cartesiana",
    tema: "Plano cartesiano",
    desc: "Batalha naval contra o robô: leia e localize pontos (x, y), com radar de distância e ponto médio.",
    emoji: "🚢", cor: "azul",
    conteudo: "Geometria"
  },
  "balanca-equacoes": {
    bncc: ["EF07MA18"],
    nivel: ["Fundamental 2"],
    nome: "Balança das Equações",
    tema: "Equações do 1º grau",
    desc: "Equilibre a balança fazendo a mesma operação nos dois lados até deixar o x sozinho.",
    emoji: "⚖️", cor: "verde",
    conteudo: "Álgebra"
  },
  "missao-trigonometria": {
    bncc: ["EM13MAT308"],
    nivel: ["Ensino Médio"],
    nome: "Missão Trigonometria",
    tema: "Seno, cosseno e tangente",
    desc: "Meça prédios, rampas, escadas e pipas usando o triângulo retângulo e os ângulos notáveis.",
    emoji: "📐", cor: "azul",
    conteudo: "Funções e trigonometria"
  },
  "supermercado-inteligente": {
    bncc: ["EF06MA13", "EF07MA02"],
    nivel: ["Fundamental 2"],
    nome: "Supermercado Inteligente",
    tema: "Preço por unidade, desconto e troco",
    desc: "Compare embalagens, calcule descontos, promoções leve 3 pague 2 e o troco certo.",
    emoji: "🛒", cor: "verde",
    conteudo: "Educação Financeira"
  },
  "armadilha-cartao": {
    bncc: ["EM13MAT203", "EM13MAT303"],
    nivel: ["Ensino Médio", "Superior"],
    nome: "Armadilha do Cartão",
    tema: "Juros compostos",
    desc: "Simule o rotativo mês a mês: pagar o mínimo, parcelar e ver os juros sobre juros crescerem.",
    emoji: "💳", cor: "lilas",
    conteudo: "Educação Financeira"
  },
  "geoar-solidos-ar": {
    bncc: ["EF06MA17"],
    nivel: ["Ensino Médio"],
    nome: "GeoAR · Sólidos na Sua Sala",
    tema: "Geometria espacial",
    desc: "Sólidos geométricos em realidade aumentada: veja, gire e conte faces, arestas e vértices na sua sala. Com fórmulas e desafios.",
    emoji: "🧊", cor: "verde",
    tipo: "simulador", conteudo: "Geometria espacial"
  },
  "bioar-biologia-ar": {
    nivel: ["Ensino Médio"],
    nome: "BioAR · Biologia em Realidade Aumentada",
    tema: "Biologia celular",
    desc: "Células, DNA, vírus, bactérias, neurônio e hemácia em 3D: gire, corte, use o raio-X e toque nas estruturas para ver o nome e a função.",
    emoji: "🧬", cor: "verde",
    tipo: "simulador", conteudo: "Biologia celular"
  },
  "demo-porcentagem": {
    nivel: ["Fundamental 2"],
    nome: "Quiz de teste",
    tema: "Porcentagem",
    desc: "Jogo curto (5 perguntas) para você testar o envio de notas.",
    emoji: "🧪", cor: "azul",
    conteudo: "Proporção e porcentagem"
  },
  "gerador-provas": {
    nivel: ["Fundamental 2", "Ensino Médio", "Superior"],
    nome: "Gerador de Provas",
    tema: "Ferramenta do professor",
    desc: "Monte provas e simulados de Matemática inspirados em Prova Paulista, Provão Paulista, SAEB e SARESP, com gabarito.",
    emoji: "📝", cor: "lilas", ferramenta: true,
    tipo: "ferramenta"
  },
  "gerador-sudoku": {
    nivel: ["Fundamental 1", "Fundamental 2", "Ensino Médio"],
    nome: "Gerador de Sudoku",
    tema: "Ferramenta do professor",
    desc: "Gere folhas de Sudoku para imprimir em 4 níveis (fácil, médio, difícil e especialista), com gabarito e 4 jogos por folha A4.",
    emoji: "🧩", cor: "verde", ferramenta: true,
    tipo: "ferramenta"
  },
  "campeonato-tarefas": {
    nivel: ["Fundamental 1", "Fundamental 2", "Ensino Médio"],
    nome: "Campeonato de Tarefas",
    tema: "Ferramenta do professor",
    desc: "Marcador de tarefas das turmas com tabela de classificação estilo campeonato, pódio, nota final e exportação em Word e Excel.",
    emoji: "🏆", cor: "amarelo", ferramenta: true,
    tipo: "ferramenta"
  },
  "jogo-dama": {
    nivel: ["Fundamental 2", "Ensino Médio", "Superior"],
    nome: "Dama · Campeonato",
    tema: "Jogo de estratégia",
    desc: "Dama para dois jogadores ou contra a máquina em 3 níveis, com relógio por jogador e campeonato com chaveamento, sorteio, partida única ou melhor de três.",
    emoji: "♟️", cor: "coral", ferramenta: false, conteudo: "Jogos de tabuleiro"
  },
  "jogo-xadrez": {
    nivel: ["Fundamental 2", "Ensino Médio", "Superior"],
    nome: "Xadrez · Campeonato",
    tema: "Jogo de estratégia",
    desc: "Xadrez com peças em 3D: partida rápida, contra a máquina em 3 níveis e campeonato com chaveamento, sorteio e melhor de três.",
    emoji: "♞", cor: "azul", ferramenta: false, conteudo: "Jogos de tabuleiro"
  },
  "jogo-hanoi": {
    bncc: ["EF08MA10"],
    nivel: ["Fundamental 2", "Ensino Médio", "Superior"],
    nome: "Torre de Hanói",
    tema: "Matemática",
    desc: "Jogo de Torre de Hanói em 3D, com a história da lenda, a matemática por trás (recursão e 2ⁿ − 1), gráfico e desafios com pontuação.",
    emoji: "🗼", cor: "verde", ferramenta: false, conteudo: "Desafios"
  },
  "fazenda-contagem": {
    bncc: ["EF01MA01", "EF01MA02"],
    nivel: ["Fundamental 1"],
    nome: "Fazenda da contagem",
    tema: "Fundamental 1",
    desc: "Conte os animais da fazenda e toque no número certo. Três fases, de 1 a 5, de 1 a 10 e de 6 a 15.",
    emoji: "🐄", cor: "amarelo", ferramenta: false, conteudo: "Anos iniciais"
  },
  "corrida-dezenas": {
    bncc: ["EF01MA07", "EF02MA04"],
    nivel: ["Fundamental 1"],
    nome: "Corrida das dezenas",
    tema: "Fundamental 1",
    desc: "Monte o número com o material dourado (barras de 10 e cubinhos de 1), confira no quadro de valor de lugar e leve o corredor até a chegada.",
    emoji: "🏃", cor: "verde", ferramenta: false, conteudo: "Anos iniciais"
  },
  "monte-desenho": {
    bncc: ["EF01MA14"],
    nivel: ["Fundamental 1"],
    nome: "Monte o desenho",
    tema: "Fundamental 1",
    desc: "Descubra quadrado, retângulo, triângulo e círculo e monte um desenho com eles. Perguntas e desenhos diferentes a cada partida (casinha, foguete, barco, robô e parque).",
    emoji: "🔷", cor: "azul", ferramenta: false, conteudo: "Anos iniciais"
  },
  "relogio-horas": {
    bncc: ["EF02MA19", "EF03MA23"],
    nivel: ["Fundamental 1"],
    nome: "Relógio das horas",
    tema: "Fundamental 1",
    desc: "Ajuste o relógio de ponteiros para as horas em ponto e meia hora pedidas.",
    emoji: "⏰", cor: "lilas", ferramenta: false, conteudo: "Anos iniciais"
  },
  "quebra-cabeca-soma": {
    bncc: ["EF01MA06", "EF02MA05"],
    nivel: ["Fundamental 1"],
    nome: "Quebra-cabeça da soma",
    tema: "Fundamental 1",
    desc: "Escolha duas peças que somam o número pedido. Cinco rodadas, de 5 a 15, com a conta montada na tela e dica quando falta ou passa.",
    emoji: "🧩", cor: "coral", ferramenta: false, conteudo: "Anos iniciais"
  },
  "cartesiano-desenhos": {
    bncc: ["EF05MA15", "EF06MA16"],
    nome: "Plano Cartesiano · Desenhos",
    tema: "Plano cartesiano",
    desc: "Localize pontos pelas coordenadas (x, y) e descubra figuras ligando os pontos. Crie seu próprio desenho e imprima a atividade para os alunos.",
    emoji: "📍", cor: "azul", ferramenta: false, conteudo: "Geometria", nivel: ["Fundamental 2"]
  },
  "memoria-horas": {
    bncc: ["EF03MA23"],
    nome: "Memória das horas",
    tema: "Horas e relógio",
    desc: "Encontre o par: a hora escrita e o relógio que mostra essa hora. Até 18 pares, com meias horas, pontos, espiada e recorde.",
    emoji: "🧠", cor: "lilas", ferramenta: false, conteudo: "Anos iniciais", nivel: ["Fundamental 1"]
  },
  "memoria-areas": {
    bncc: ["EF07MA31", "EF08MA19"],
    nome: "Memória das áreas",
    tema: "Áreas de figuras planas",
    desc: "Relacione 12 figuras planas às fórmulas da área, do quadrado ao setor circular, com legenda do que significa cada letra.",
    emoji: "📐", cor: "coral", ferramenta: false, conteudo: "Geometria", nivel: ["Fundamental 2", "Ensino Médio"]
  },
  "memoria-fracoes-equivalentes": {
    bncc: ["EF05MA04", "EF06MA07"],
    nome: "Memória das frações equivalentes",
    tema: "Frações equivalentes",
    desc: "Grupos de três frações equivalentes, como 1/2, 2/4 e 4/8. Até 12 grupos (36 cartas).",
    emoji: "🧠", cor: "verde", ferramenta: false, conteudo: "Números e operações", nivel: ["Fundamental 2"]
  },
  "memoria-fracao-decimal-porcentagem": {
    bncc: ["EF05MA06", "EF06MA08"],
    nome: "Memória: fração, decimal e %",
    tema: "Frações, decimais e porcentagem",
    desc: "Junte fração, decimal e porcentagem do mesmo valor, como 1/4, 0,25 e 25%. Até 12 grupos (36 cartas).",
    emoji: "🧠", cor: "amarelo", ferramenta: false, conteudo: "Proporção e porcentagem", nivel: ["Fundamental 2"]
  },
  "memoria-potencia-valor": {
    bncc: ["EF08MA01"],
    nome: "Memória das potências",
    tema: "Potências",
    desc: "Relacione cada potência ao seu valor, como 2³ com 8. Até 20 pares.",
    emoji: "🧠", cor: "azul", ferramenta: false, conteudo: "Números e operações", nivel: ["Fundamental 2"]
  },
  "memoria-raiz-valor": {
    bncc: ["EF08MA02"],
    nome: "Memória das raízes",
    tema: "Raízes quadradas",
    desc: "Relacione cada raiz quadrada ao seu valor, de √1 a √400. Até 20 pares.",
    emoji: "🧠", cor: "lilas", ferramenta: false, conteudo: "Números e operações", nivel: ["Fundamental 2"]
  },
  "memoria-equacao-solucao": {
    bncc: ["EF07MA18"],
    nome: "Memória das equações",
    tema: "Equações do 1º grau",
    desc: "Relacione cada equação do 1º grau ao valor de x, com soluções de 1 a 20. Até 20 pares.",
    emoji: "🧠", cor: "coral", ferramenta: false, conteudo: "Álgebra", nivel: ["Fundamental 2"]
  },
  "quiz-halloween": {
    nome: "Quiz Assombrado · Halloween",
    tema: "Quiz de Halloween",
    desc: "15 desafios de matemática com tema de Halloween no estilo quiz de auditório: tempo, pontos por rapidez, bônus de sequência, explicações e ranking.",
    emoji: "🎃", cor: "coral", ferramenta: false, conteudo: "Desafios", nivel: ["Fundamental 2"]
  },
  "gamifica-cards": {
    nivel: ["Fundamental 2", "Ensino Médio"],
    nome: "Gamifica Cards",
    tema: "Ferramenta do professor",
    desc: "Quiz com cartões impressos: o celular do professor lê as respostas da turma (alunos sem celular e sem internet). Anexe perguntas do Word, Excel ou texto e a app monta os slides e os relatórios. Projete pelo celular ou pelo computador (gamificaeducacao.com.br/tela).",
    emoji: "🃏", cor: "lilas", ferramenta: true,
    tipo: "ferramenta"
  },
  "tabuada-turbo": {
    bncc: ["EF03MA03", "EF04MA04"],
    nome: "Tabuada Turbo",
    tema: "Tabuada",
    desc: "Treine a tabuada de multiplicação e de divisão: treino com dica de bolinhas, contra o relógio (60 s), duelo para dois jogadores e ranking da turma, com cronômetro por aluno, pódio e impressão do resultado.",
    emoji: "✖️", cor: "amarelo", ferramenta: false, conteudo: "Números e operações", nivel: ["Fundamental 1", "Fundamental 2"]
  },
  "potencia-raiz-turbo": {
    nome: "Potência e Raiz Turbo",
    tema: "Potenciação e radiciação",
    desc: "Treine quadrados, cubos, potências e raízes quadradas e cúbicas: treino com dica e tabela de apoio, contra o relógio (60 s), duelo para dois jogadores e ranking da turma com cronômetro, pódio e impressão.",
    emoji: "🔺", cor: "lilas", ferramenta: false, conteudo: "Números e operações", nivel: ["Fundamental 2", "Ensino Médio"]
  },
  "quiz-ao-vivo": {
    nivel: ["Fundamental 1", "Fundamental 2", "Ensino Médio", "Superior"],
    nome: "Quiz Ao Vivo",
    tema: "Quiz em tempo real",
    desc: "Você projeta, os alunos respondem pelo celular em gamificaeducacao.com.br/vivo com um código. Pontos por rapidez, ranking a cada pergunta, pódio e planilha de resultados. Use perguntas prontas ou crie as suas.",
    emoji: "📡", cor: "lilas", ferramenta: true
  },
  "calculadora-grafica": {
    bncc: ["EF09MA06", "EM13MAT302", "EM13MAT402", "EM13MAT306"],
    nivel: ["Fundamental 2", "Ensino Médio", "Superior"],
    nome: "Calculadora Gráfica",
    tema: "Funções",
    desc: "Digite qualquer função e mexa nos controles deslizantes (a, b, c…) para ver o gráfico mudar. Modelos de afim, quadrática, cúbica, exponencial, logarítmica, modular, seno, cosseno, tangente, raiz e hipérbole, com raízes, vértice e tabela de valores.",
    emoji: "📈", cor: "azul", ferramenta: true,
    tipo: "simulador"
  },
  "fracoes-visuais": {
    bncc: ["EF05MA04", "EF05MA05", "EF06MA07", "EF06MA10"],
    nivel: ["Fundamental 1", "Fundamental 2"],
    nome: "Frações Visuais",
    tema: "Frações",
    desc: "Simulador com pizzas e barras: compare frações (com reta numérica), descubra equivalentes cortando os pedaços, some e subtraia passo a passo com MMC. Termina com um desafio de 10 questões.",
    emoji: "🍕", cor: "laranja", ferramenta: false,
    tipo: "simulador"
  },
  "material-dourado": {
    bncc: ["EF02MA04", "EF03MA01", "EF03MA05"],
    nivel: ["Fundamental 1"],
    nome: "Material Dourado e Ábaco",
    tema: "Sistema de numeração",
    desc: "Monte números com cubinhos, barras, placas e cubo (ou no ábaco) e veja o valor posicional. Faça adição com reserva e subtração com empréstimo passo a passo, junto com a conta armada. Termina com desafio.",
    emoji: "🟨", cor: "amarelo", ferramenta: false,
    tipo: "simulador"
  },
  "lousa-geometria": {
    bncc: ["EF06MA27", "EF07MA24", "EF08MA15", "EF08MA17"],
    nivel: ["Fundamental 2", "Ensino Médio"],
    nome: "Lousa de Geometria",
    tema: "Construções geométricas",
    desc: "Régua, compasso e transferidor na tela, com ímã nos pontos e cruzamentos. 6 construções guiadas com correção automática: triângulo equilátero, mediatriz, bissetriz, ângulo de 60°, triângulo 3-4-5 e soma dos ângulos do triângulo.",
    emoji: "📐", cor: "verde", ferramenta: false,
    tipo: "simulador", conteudo: "Geometria"
  },
  "enquete-ao-vivo": {
    nivel: ["Fundamental 1", "Fundamental 2", "Ensino Médio", "Superior"],
    nome: "Enquete e Nuvem de Palavras Ao Vivo",
    tema: "Enquete em tempo real",
    desc: "Estilo Mentimeter: os alunos respondem anônimos pelo celular em gamificaeducacao.com.br/enquete e o resultado aparece no projetor na hora. Múltipla escolha, nuvem de palavras, escala de 1 a 5 e mural de respostas, com filtro de palavrões.",
    emoji: "📊", cor: "azul", ferramenta: true,
    tipo: "ferramenta"
  },
  "fichas-tabuada": {
    bncc: ["EF03MA03", "EF03MA05", "EF04MA04"],
    nivel: ["Fundamental 1", "Fundamental 2"],
    nome: "Fichas de Tabuada e Cálculo Mental",
    tema: "Ferramenta do professor",
    desc: "Gere fichas para imprimir: tabuadas, número que falta, tabela pitagórica, adição e subtração mental, dobro e metade, ×÷ por 10/100/1000, porcentagem, expressões, potências e raízes. Várias versões, letra grande e gabarito separado.",
    emoji: "🖨️", cor: "lilas", ferramenta: true,
    tipo: "ferramenta"
  },
  "ligar-classificar": {
    bncc: ["EF08MA01", "EF08MA02", "EF09MA03"],
    nivel: ["Fundamental 2", "Ensino Médio"],
    nome: "Ligar e Classificar: Potências e Raízes",
    tema: "Potenciação e radiciação",
    desc: "Ligue colunas (potências, raízes, propriedades, bases negativas e frações) e arraste cartões para categorias (quadrado perfeito, mesmo valor, sinal, raiz exata). Com combo, estrelas e dicas. Tem editor para criar o seu jogo de qualquer matéria.",
    emoji: "🔗", cor: "lilas", ferramenta: false, conteudo: "Números e operações"
  },
  "mural-eletronico": {
    nivel: ["Fundamental 1", "Fundamental 2", "Ensino Médio", "Superior"],
    nome: "Mural Eletrônico",
    tema: "Mural colaborativo",
    desc: "Mural da turma no estilo Padlet: texto, imagem, áudio, vídeo, links e arquivos, com comentários, reações, código de acesso, QR Code, PDF e modo apresentação. Os alunos postam pelo celular, sem criar conta.",
    emoji: "📌", cor: "amarelo", ferramenta: true,
    tipo: "ferramenta", link: "/mural/"
  },
  "planificacao-solidos": {
    bncc: ["EF04MA17", "EF05MA16", "EF06MA17", "EM13MAT309"],
    nivel: ["Fundamental 1", "Fundamental 2", "Ensino Médio"],
    nome: "Planificação de Sólidos",
    tema: "Geometria espacial",
    desc: "15 sólidos em 3D (cubo, paralelepípedo, prismas, pirâmides, os 5 de Platão, cilindro e cone) que abrem e fecham animados. Mude as medidas, veja faces, vértices, arestas, Euler, área e volume, e imprima a planificação com abas para montar. Tem desafio.",
    emoji: "🧊", cor: "azul", ferramenta: false,
    tipo: "simulador", conteudo: "Geometria espacial"
  },
  "lojinha-troco": {
    nivel: ["Fundamental 1", "Fundamental 2"],
    bncc: ["EF02MA20", "EF03MA24", "EF05MA07"],
    nome: "Lojinha do Troco",
    tema: "Sistema monetário",
    desc: "Dinheiro de brinquedo com cédulas e moedas: conte quanto tem no balcão, pague a conta certinha, dê o troco com o dinheiro do caixa e calcule o troco de várias compras. 4 níveis com dicas e estrelas.",
    emoji: "🏪", cor: "verde", ferramenta: false, conteudo: "Anos iniciais"
  },
  "financiamento-sac-price": {
    nivel: ["Ensino Médio", "Superior"],
    bncc: ["EM13MAT203", "EM13MAT303"],
    nome: "Financiamento: SAC × Price",
    tema: "Sistemas de amortização",
    desc: "Digite valor, taxa (ao mês ou ao ano) e parcelas: veja lado a lado o SAC e a Price, com tabela de amortização, gráfico de juros e amortização, saldo devedor e planilha. Desafio de 8 questões que envia a nota.",
    emoji: "🏦", cor: "lilas", ferramenta: false,
    tipo: "simulador", conteudo: "Educação Financeira"
  },
  "calculadora-imc": {
    nivel: ["Ensino Médio"],
    nome: "Simulador de IMC",
    tema: "Saúde e Educação Física",
    desc: "Calcule o IMC, veja a classificação da OMS e a faixa de massa adequada. Tem passo a passo, desafio e atividade.",
    emoji: "⚖️", cor: "azul", ferramenta: true,
    tipo: "simulador"
  },
  "calculo-proteina": {
    nivel: ["Ensino Médio"],
    nome: "Simulador de Proteína Diária",
    tema: "Saúde e Educação Física",
    desc: "Descubra quantos gramas de proteína por dia e como dividir nas refeições, conforme massa e objetivo.",
    emoji: "🥩", cor: "laranja", ferramenta: true,
    tipo: "simulador"
  },
  "calculo-agua": {
    nivel: ["Ensino Médio"],
    nome: "Simulador de Hidratação",
    tema: "Saúde e Educação Física",
    desc: "Calcule quanta água beber por dia, com exercício e clima, e acompanhe os copos do seu dia.",
    emoji: "💧", cor: "verde", ferramenta: true,
    tipo: "simulador"
  },
  "tesouro-das-integrais": {
    nivel: ["Ensino Médio", "Superior"],
    nome: "Tesouro das Integrais",
    tema: "Integral definida",
    desc: "Aventura em 10 fases: resolva integrais definidas passo a passo, ganhe estrelas e suba no ranking. Gera relatório em Word, PDF e Excel.",
    emoji: "🧭", cor: "lilas",
    conteudo: "Cálculo"
  }
};
