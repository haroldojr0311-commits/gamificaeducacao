// Catálogo do portal Gamifica Educação.
// Os arquivos dos jogos ficam CIFRADOS na pasta protegido/ (só o servidor abre).
// Para incluir um jogo novo: node _ferramentas/proteger.mjs <id> <arquivo.html> e acrescente um item aqui.
// cor: amarelo | coral | verde | azul | lilas | laranja
// ferramenta: true = aparece só para quem tem conta (não vira atividade de turma).
// tipo: "simulador" | "ferramenta" (aba onde aparece; sem tipo = Jogos). conteudo: agrupa os jogos na aba Jogos.
window.JOGOS = {
  "aventura-do-pi": {
    nivel: ["Fundamental 2"],
    nome: "Aventura do Pi",
    tema: "Geometria plana",
    desc: "Plataforma com portões de perímetro e área das figuras planas.",
    emoji: "🥧", cor: "laranja",
    conteudo: "Geometria"
  },
  "dossie-geometrico": {
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
    nivel: ["Fundamental 2", "Ensino Médio"],
    nome: "Orçamento em Família",
    tema: "Educação Financeira",
    desc: "Cuide do dinheiro de uma família por 6 meses: contas, imprevistos, golpes e ranking.",
    emoji: "🏠", cor: "verde",
    conteudo: "Educação Financeira"
  },
  "invasao-alienigena": {
    nivel: ["Fundamental 2"],
    nome: "Invasão Alienígena",
    tema: "Porcentagem",
    desc: "Calcule porcentagens para defender a Terra dos invasores.",
    emoji: "👾", cor: "azul",
    conteudo: "Proporção e porcentagem"
  },
  "estatistica-agrupados": {
    nivel: ["Fundamental 2", "Ensino Médio"],
    nome: "Laboratório Estatístico",
    tema: "Estatística",
    desc: "Roteiro completo e escolhido pelo professor ou aluno: média, moda, rol e mediana, tabelas de frequência, medidas da tabela, histograma e polígono, desvio médio, variância, desvio padrão e coeficiente de variação.",
    emoji: "📊", cor: "amarelo",
    conteudo: "Estatística e probabilidade"
  },
  "laboratorio-de-funcoes": {
    nivel: ["Ensino Médio"],
    nome: "Laboratório de Funções",
    tema: "Função do 2º grau",
    desc: "Raízes, vértice e gráfico da parábola, passo a passo.",
    emoji: "📈", cor: "azul",
    conteudo: "Funções e trigonometria"
  },
  "laboratorio-de-exponenciais": {
    nivel: ["Ensino Médio"],
    nome: "Laboratório de Exponenciais",
    tema: "Função exponencial",
    desc: "Crescimento, juros compostos e meia-vida: mude os controles, veja o gráfico e vença o desafio.",
    emoji: "🧪", cor: "verde",
    conteudo: "Funções e trigonometria"
  },
  "geometria-espacial-3d": {
    nivel: ["Ensino Médio"],
    nome: "Missão Geometria Espacial 3D",
    tema: "Geometria espacial",
    desc: "Conte vértices, arestas e faces dos sólidos girando em 3D.",
    emoji: "🧊", cor: "lilas",
    conteudo: "Geometria"
  },
  "show-da-proporcao": {
    nivel: ["Fundamental 2"],
    nome: "Show da Proporção",
    tema: "Proporcionalidade",
    desc: "Show de perguntas de regra de três valendo um milhão.",
    emoji: "🎤", cor: "amarelo",
    conteudo: "Proporção e porcentagem"
  },
  "uno-potenciacao": {
    nivel: ["Fundamental 2"],
    nome: "UNO da Potenciação",
    tema: "Potências",
    desc: "UNO contra o Prof. Robô com perguntas relâmpago de potências.",
    emoji: "🃏", cor: "coral",
    conteudo: "Números e operações"
  },
  "uno-radiciacao": {
    nivel: ["Fundamental 2"],
    nome: "UNO da Radiciação",
    tema: "Raízes",
    desc: "UNO contra o Prof. Robô com perguntas relâmpago de raízes.",
    emoji: "🃏", cor: "verde",
    conteudo: "Números e operações"
  },
  "uno-fracoes-decimais": {
    nivel: ["Fundamental 2"],
    nome: "UNO de Frações e Decimais",
    tema: "Frações",
    desc: "UNO contra o Prof. Robô: transforme frações em decimais.",
    emoji: "🃏", cor: "laranja",
    conteudo: "Números e operações"
  },
  "roda-gigante": {
    nivel: ["Ensino Médio"],
    nome: "Roda-Gigante Trigonométrica",
    tema: "Trigonometria",
    desc: "A cabine gira e a altura vira gráfico: seno, cosseno, quadrantes e ângulos notáveis.",
    emoji: "🎡", cor: "lilas",
    conteudo: "Funções e trigonometria"
  },
  "leitor-gabaritos": {
    nome: "Leitor de Gabaritos",
    tema: "Ferramenta do professor",
    desc: "Corrija cartões-resposta pela câmera do celular e veja as notas.",
    emoji: "📷", cor: "azul", ferramenta: true,
    tipo: "ferramenta"
  },
  "mapa-da-sala": {
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
    nivel: ["Ensino Médio"],
    nome: "Laboratório de Probabilidade",
    tema: "Probabilidade",
    desc: "Lance dados e moedas, sorteie cartas e compare o observado com o teórico.",
    emoji: "🎲", cor: "lilas", ferramenta: true,
    tipo: "simulador"
  },
  "caca-palavras": {
    nome: "Caça-Palavras Gerador",
    tema: "Ferramenta do professor",
    desc: "Cole um texto, gere a grade de palavras-chave e imprima com ou sem gabarito.",
    emoji: "🔤", cor: "lilas", ferramenta: true,
    tipo: "ferramenta"
  },
  "gerador-qrcode": {
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
    nome: "Sorteador de Alunos e Grupos",
    tema: "Ferramenta do professor",
    desc: "Sorteie quem responde (sem repetir) e forme grupos com líder em um toque.",
    emoji: "🎲", cor: "verde", ferramenta: true,
    tipo: "ferramenta"
  },
  "calculadora-notas": {
    nome: "Calculadora de Notas e Médias",
    tema: "Ferramenta do professor",
    desc: "Escolha as avaliações e os pesos, cole os nomes, digite as notas e veja quem foi aprovado.",
    emoji: "🧮", cor: "azul", ferramenta: true,
    tipo: "ferramenta"
  },
  "cronometro": {
    nome: "Cronômetro de Atividades",
    tema: "Ferramenta do professor",
    desc: "Contagem regressiva grande para projetar, com cores de alerta e alarme no fim.",
    emoji: "⏱️", cor: "laranja", ferramenta: true,
    tipo: "ferramenta"
  },
  "bingo": {
    nome: "Bingo Matemático",
    tema: "Ferramenta do professor",
    desc: "Sorteie contas no telão com narração de locutor; os alunos calculam e marcam a resposta na cartela impressa.",
    emoji: "🎯", cor: "coral", ferramenta: true,
    tipo: "ferramenta"
  },
  "geoplano": {
    nivel: ["Fundamental 2"],
    nome: "Geoplano Digital",
    tema: "Geometria plana",
    desc: "Estique elásticos nos pinos: área, perímetro, Pitágoras e simetria, com 10 desafios.",
    emoji: "📐", cor: "laranja",
    tipo: "simulador", conteudo: "Geometria"
  },
  "domino-equivalencias": {
    nivel: ["Fundamental 2"],
    nome: "Dominó de Equivalências",
    tema: "Frações, decimais e %",
    desc: "Dominó contra o robô: encaixe frações, decimais, porcentagens e desenhos que valem o mesmo.",
    emoji: "🁫", cor: "azul",
    conteudo: "Números e operações"
  },
  "cofre-combinacoes": {
    nivel: ["Ensino Médio"],
    nome: "Cofre das Combinações",
    tema: "Análise combinatória",
    desc: "Abra 10 cofres resolvendo problemas de princípio multiplicativo, fatorial, permutação, arranjo e combinação.",
    emoji: "🔐", cor: "lilas",
    conteudo: "Estatística e probabilidade"
  },
  "escada-progressoes": {
    nivel: ["Ensino Médio"],
    nome: "Escada das Progressões",
    tema: "PA e PG",
    desc: "Suba 10 degraus resolvendo PA e PG: próximo termo, razão, termo geral, soma e problemas do dia a dia.",
    emoji: "🪜", cor: "amarelo",
    conteudo: "Álgebra"
  },
  "batalha-naval": {
    nivel: ["Fundamental 2"],
    nome: "Batalha Naval Cartesiana",
    tema: "Plano cartesiano",
    desc: "Batalha naval contra o robô: leia e localize pontos (x, y), com radar de distância e ponto médio.",
    emoji: "🚢", cor: "azul",
    conteudo: "Geometria"
  },
  "balanca-equacoes": {
    nivel: ["Fundamental 2"],
    nome: "Balança das Equações",
    tema: "Equações do 1º grau",
    desc: "Equilibre a balança fazendo a mesma operação nos dois lados até deixar o x sozinho.",
    emoji: "⚖️", cor: "verde",
    conteudo: "Álgebra"
  },
  "missao-trigonometria": {
    nivel: ["Ensino Médio"],
    nome: "Missão Trigonometria",
    tema: "Seno, cosseno e tangente",
    desc: "Meça prédios, rampas, escadas e pipas usando o triângulo retângulo e os ângulos notáveis.",
    emoji: "📐", cor: "azul",
    conteudo: "Funções e trigonometria"
  },
  "supermercado-inteligente": {
    nivel: ["Fundamental 2"],
    nome: "Supermercado Inteligente",
    tema: "Preço por unidade, desconto e troco",
    desc: "Compare embalagens, calcule descontos, promoções leve 3 pague 2 e o troco certo.",
    emoji: "🛒", cor: "verde",
    conteudo: "Educação Financeira"
  },
  "armadilha-cartao": {
    nivel: ["Ensino Médio", "Superior"],
    nome: "Armadilha do Cartão",
    tema: "Juros compostos",
    desc: "Simule o rotativo mês a mês: pagar o mínimo, parcelar e ver os juros sobre juros crescerem.",
    emoji: "💳", cor: "lilas",
    conteudo: "Educação Financeira"
  },
  "geoar-solidos-ar": {
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
    nome: "Gerador de Provas",
    tema: "Ferramenta do professor",
    desc: "Monte provas e simulados de Matemática inspirados em Prova Paulista, Provão Paulista, SAEB e SARESP, com gabarito.",
    emoji: "📝", cor: "lilas", ferramenta: true,
    tipo: "ferramenta"
  },
  "gerador-sudoku": {
    nome: "Gerador de Sudoku",
    tema: "Ferramenta do professor",
    desc: "Gere folhas de Sudoku para imprimir em 4 níveis (fácil, médio, difícil e especialista), com gabarito e 4 jogos por folha A4.",
    emoji: "🧩", cor: "verde", ferramenta: true,
    tipo: "ferramenta"
  },
  "campeonato-tarefas": {
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
    nivel: ["Fundamental 2", "Ensino Médio", "Superior"],
    nome: "Torre de Hanói",
    tema: "Matemática",
    desc: "Jogo de Torre de Hanói em 3D, com a história da lenda, a matemática por trás (recursão e 2ⁿ − 1), gráfico e desafios com pontuação.",
    emoji: "🗼", cor: "verde", ferramenta: false, conteudo: "Desafios"
  },
  "fazenda-contagem": {
    nivel: ["Fundamental 1"],
    nome: "Fazenda da contagem",
    tema: "Fundamental 1",
    desc: "Conte os animais da fazenda e toque no número certo. Três fases, de 1 a 5, de 1 a 10 e de 6 a 15.",
    emoji: "🐄", cor: "amarelo", ferramenta: false, conteudo: "Anos iniciais"
  },
  "corrida-dezenas": {
    nivel: ["Fundamental 1"],
    nome: "Corrida das dezenas",
    tema: "Fundamental 1",
    desc: "Monte o número com o material dourado (barras de 10 e cubinhos de 1), confira no quadro de valor de lugar e leve o corredor até a chegada.",
    emoji: "🏃", cor: "verde", ferramenta: false, conteudo: "Anos iniciais"
  },
  "monte-desenho": {
    nivel: ["Fundamental 1"],
    nome: "Monte o desenho",
    tema: "Fundamental 1",
    desc: "Descubra quadrado, retângulo, triângulo e círculo e monte um desenho com eles. Perguntas e desenhos diferentes a cada partida (casinha, foguete, barco, robô e parque).",
    emoji: "🔷", cor: "azul", ferramenta: false, conteudo: "Anos iniciais"
  },
  "relogio-horas": {
    nivel: ["Fundamental 1"],
    nome: "Relógio das horas",
    tema: "Fundamental 1",
    desc: "Ajuste o relógio de ponteiros para as horas em ponto e meia hora pedidas.",
    emoji: "⏰", cor: "lilas", ferramenta: false, conteudo: "Anos iniciais"
  },
  "quebra-cabeca-soma": {
    nivel: ["Fundamental 1"],
    nome: "Quebra-cabeça da soma",
    tema: "Fundamental 1",
    desc: "Escolha duas peças que somam o número pedido. Cinco rodadas, de 5 a 15, com a conta montada na tela e dica quando falta ou passa.",
    emoji: "🧩", cor: "coral", ferramenta: false, conteudo: "Anos iniciais"
  },
  "cartesiano-desenhos": {
    nome: "Plano Cartesiano · Desenhos",
    tema: "Plano cartesiano",
    desc: "Localize pontos pelas coordenadas (x, y) e descubra figuras ligando os pontos. Crie seu próprio desenho e imprima a atividade para os alunos.",
    emoji: "📍", cor: "azul", ferramenta: false, conteudo: "Geometria", nivel: ["Fundamental 2"]
  },
  "memoria-horas": {
    nome: "Memória das horas",
    tema: "Horas e relógio",
    desc: "Encontre o par: a hora escrita e o relógio que mostra essa hora. Até 18 pares, com meias horas, pontos, espiada e recorde.",
    emoji: "🧠", cor: "lilas", ferramenta: false, conteudo: "Anos iniciais", nivel: ["Fundamental 1"]
  },
  "memoria-areas": {
    nome: "Memória das áreas",
    tema: "Áreas de figuras planas",
    desc: "Relacione 12 figuras planas às fórmulas da área, do quadrado ao setor circular, com legenda do que significa cada letra.",
    emoji: "📐", cor: "coral", ferramenta: false, conteudo: "Geometria", nivel: ["Fundamental 2", "Ensino Médio"]
  },
  "memoria-fracoes-equivalentes": {
    nome: "Memória das frações equivalentes",
    tema: "Frações equivalentes",
    desc: "Grupos de três frações equivalentes, como 1/2, 2/4 e 4/8. Até 12 grupos (36 cartas).",
    emoji: "🧠", cor: "verde", ferramenta: false, conteudo: "Números e operações", nivel: ["Fundamental 2"]
  },
  "memoria-fracao-decimal-porcentagem": {
    nome: "Memória: fração, decimal e %",
    tema: "Frações, decimais e porcentagem",
    desc: "Junte fração, decimal e porcentagem do mesmo valor, como 1/4, 0,25 e 25%. Até 12 grupos (36 cartas).",
    emoji: "🧠", cor: "amarelo", ferramenta: false, conteudo: "Proporção e porcentagem", nivel: ["Fundamental 2"]
  },
  "memoria-potencia-valor": {
    nome: "Memória das potências",
    tema: "Potências",
    desc: "Relacione cada potência ao seu valor, como 2³ com 8. Até 20 pares.",
    emoji: "🧠", cor: "azul", ferramenta: false, conteudo: "Números e operações", nivel: ["Fundamental 2"]
  },
  "memoria-raiz-valor": {
    nome: "Memória das raízes",
    tema: "Raízes quadradas",
    desc: "Relacione cada raiz quadrada ao seu valor, de √1 a √400. Até 20 pares.",
    emoji: "🧠", cor: "lilas", ferramenta: false, conteudo: "Números e operações", nivel: ["Fundamental 2"]
  },
  "memoria-equacao-solucao": {
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
    nome: "Gamifica Cards",
    tema: "Ferramenta do professor",
    desc: "Quiz com cartões impressos: o celular do professor lê as respostas da turma (alunos sem celular e sem internet). Anexe perguntas do Word, Excel ou texto e a app monta os slides e os relatórios. Projete pelo celular ou pelo computador (gamificaeducacao.com.br/tela).",
    emoji: "🃏", cor: "lilas", ferramenta: true,
    tipo: "ferramenta"
  }
};
