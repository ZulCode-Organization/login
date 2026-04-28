export const origens = [
  { id: "amigo",    label: "Amigo / Indicação" },
  { id: "tiktok",   label: "TikTok"            },
  { id: "instagram",label: "Instagram"          },
  { id: "youtube",  label: "YouTube"            },
  { id: "google",   label: "Google"             },
  { id: "twitter",  label: "Twitter / X"        },
  { id: "linkedin", label: "LinkedIn"           },
  { id: "outro",    label: "Outro"              },
];

export const expectativas = [
  { id: "emprego",  label: "Conseguir meu primeiro emprego como dev" },
  { id: "aprender", label: "Aprender do zero de forma simples"       },
  { id: "melhorar", label: "Melhorar minhas habilidades atuais"      },
  { id: "projeto",  label: "Criar meu próprio projeto ou startup"    },
  { id: "carreira", label: "Mudar de carreira para tecnologia"       },
  { id: "hobby",    label: "Aprender programação por hobby"          },
];

export const linguagens = [
  { id: "javascript", label: "JavaScript", desc: "A linguagem da web"    },
  { id: "python",     label: "Python",     desc: "Simples e poderosa"    },
  { id: "html_css",   label: "HTML & CSS", desc: "A base da web"         },
  { id: "java",       label: "Java",       desc: "Robusta e versátil"    },
  { id: "typescript", label: "TypeScript", desc: "JS com superpoderes"   },
  { id: "kotlin",     label: "Kotlin",     desc: "Apps Android modernos" },
];

export type PerguntaQuiz = {
  categoria: string;
  pergunta: string;
  opcoes: string[];
  correta: number;
};

export const perguntasPorLinguagem: Record<string, PerguntaQuiz[]> = {
  javascript: [
    {
      categoria: "JAVASCRIPT",
      pergunta: "O que é uma variável em programação?",
      opcoes: ["Um tipo de loop", "Um espaço para armazenar dados", "Um arquivo de código", "Uma função especial"],
      correta: 1,
    },
    {
      categoria: "JAVASCRIPT",
      pergunta: "Qual palavra-chave declara uma variável que não pode ser reatribuída?",
      opcoes: ["var", "let", "const", "set"],
      correta: 2,
    },
    {
      categoria: "JAVASCRIPT",
      pergunta: "O que o método console.log() faz?",
      opcoes: ["Salva um arquivo", "Exibe uma mensagem no console", "Cria uma variável", "Envia dados para o servidor"],
      correta: 1,
    },
    {
      categoria: "JAVASCRIPT",
      pergunta: "Como criar um array em JavaScript?",
      opcoes: ["array(1, 2, 3)", "{1, 2, 3}", "[1, 2, 3]", "(1, 2, 3)"],
      correta: 2,
    },
    {
      categoria: "JAVASCRIPT",
      pergunta: "O que é uma função em JavaScript?",
      opcoes: ["Um tipo de variável", "Um bloco de código reutilizável", "Um operador matemático", "Uma estrutura de dados"],
      correta: 1,
    },
  ],
  python: [
    {
      categoria: "PYTHON",
      pergunta: "Como se imprime algo no console em Python?",
      opcoes: ["console.log()", "echo()", "print()", "show()"],
      correta: 2,
    },
    {
      categoria: "PYTHON",
      pergunta: "Como você declara uma variável em Python?",
      opcoes: ["var nome = 'João'", "let nome = 'João'", "string nome = 'João'", "nome = 'João'"],
      correta: 3,
    },
    {
      categoria: "PYTHON",
      pergunta: "O que é indentação e por que é importante em Python?",
      opcoes: ["É decorativo, sem função real", "Define blocos de código — é obrigatória", "É usada apenas em comentários", "Serve para nomear variáveis"],
      correta: 1,
    },
    {
      categoria: "PYTHON",
      pergunta: "Como se cria uma lista em Python?",
      opcoes: ["list(1, 2, 3)", "{1, 2, 3}", "(1, 2, 3)", "[1, 2, 3]"],
      correta: 3,
    },
    {
      categoria: "PYTHON",
      pergunta: "Qual palavra-chave define uma função em Python?",
      opcoes: ["function", "func", "def", "fn"],
      correta: 2,
    },
  ],
  html_css: [
    {
      categoria: "HTML",
      pergunta: "O que significa a sigla HTML?",
      opcoes: ["HyperText Markup Language", "High Text Machine Language", "HyperTool Modern Language", "Home Text Markup Language"],
      correta: 0,
    },
    {
      categoria: "HTML",
      pergunta: "Qual tag cria um título principal em uma página HTML?",
      opcoes: ["<title>", "<header>", "<h1>", "<head>"],
      correta: 2,
    },
    {
      categoria: "CSS",
      pergunta: "Qual propriedade CSS muda a cor de fundo de um elemento?",
      opcoes: ["color", "background-color", "fill", "bg-color"],
      correta: 1,
    },
    {
      categoria: "HTML",
      pergunta: "Para que serve a tag <a> em HTML?",
      opcoes: ["Adicionar imagens", "Criar formulários", "Criar links", "Adicionar áudio"],
      correta: 2,
    },
    {
      categoria: "CSS",
      pergunta: "O que é o box model no CSS?",
      opcoes: ["Um tipo de layout para grids", "A estrutura de margin, border, padding e content", "Uma ferramenta de animação", "Um seletor especial"],
      correta: 1,
    },
  ],
  java: [
    {
      categoria: "JAVA",
      pergunta: "Qual método é o ponto de entrada de um programa Java?",
      opcoes: ["start()", "run()", "main()", "init()"],
      correta: 2,
    },
    {
      categoria: "JAVA",
      pergunta: "Como se declara uma variável inteira em Java?",
      opcoes: ["var x = 5", "int x = 5;", "let x = 5", "integer x = 5;"],
      correta: 1,
    },
    {
      categoria: "JAVA",
      pergunta: "O que é uma classe em Java?",
      opcoes: ["Um tipo primitivo de dados", "Um bloco de código para funções", "Um modelo para criar objetos", "Uma instrução de controle de fluxo"],
      correta: 2,
    },
    {
      categoria: "JAVA",
      pergunta: "Como imprimir texto no console em Java?",
      opcoes: ["print('Olá')", "echo 'Olá'", "console.log('Olá')", "System.out.println('Olá');"],
      correta: 3,
    },
    {
      categoria: "JAVA",
      pergunta: "O que significa POO (Programação Orientada a Objetos)?",
      opcoes: ["Um paradigma baseado em objetos e classes", "Um tipo de banco de dados", "Uma linguagem de marcação", "Um framework Java"],
      correta: 0,
    },
  ],
  typescript: [
    {
      categoria: "TYPESCRIPT",
      pergunta: "TypeScript é um superset de qual linguagem?",
      opcoes: ["Python", "Java", "JavaScript", "C#"],
      correta: 2,
    },
    {
      categoria: "TYPESCRIPT",
      pergunta: "Como se define o tipo de uma variável em TypeScript?",
      opcoes: ["let nome: string = 'João'", "var nome = string 'João'", "string nome = 'João'", "let nome => string"],
      correta: 0,
    },
    {
      categoria: "TYPESCRIPT",
      pergunta: "O que é uma interface em TypeScript?",
      opcoes: ["Um tipo primitivo", "Um contrato que define a estrutura de um objeto", "Uma função especial", "Um módulo externo"],
      correta: 1,
    },
    {
      categoria: "TYPESCRIPT",
      pergunta: "Qual é a principal vantagem do TypeScript sobre JavaScript?",
      opcoes: ["Executa mais rápido", "Tipagem estática que detecta erros antes de rodar", "Tem mais funções nativas", "É mais fácil de aprender"],
      correta: 1,
    },
    {
      categoria: "TYPESCRIPT",
      pergunta: "O que faz o TypeScript com erros de tipo?",
      opcoes: ["Ignora os erros", "Converte automaticamente os tipos", "Alerta o desenvolvedor antes de executar", "Cria um log de erros"],
      correta: 2,
    },
  ],
  kotlin: [
    {
      categoria: "KOTLIN",
      pergunta: "Kotlin é utilizado principalmente para desenvolver o quê?",
      opcoes: ["Apps iOS", "Apps Android e backend", "Sites web", "Games 3D"],
      correta: 1,
    },
    {
      categoria: "KOTLIN",
      pergunta: "Como declarar uma variável imutável em Kotlin?",
      opcoes: ["let nome = 'João'", "var nome = 'João'", "const nome = 'João'", "val nome = 'João'"],
      correta: 3,
    },
    {
      categoria: "KOTLIN",
      pergunta: "Como se imprime algo no console em Kotlin?",
      opcoes: ["System.out.println()", "console.log()", "println()", "print.line()"],
      correta: 2,
    },
    {
      categoria: "KOTLIN",
      pergunta: "O que é null safety em Kotlin?",
      opcoes: ["Um sistema que previne erros de referência nula", "Um tipo especial de variável", "Uma biblioteca para segurança", "Um modo de debug"],
      correta: 0,
    },
    {
      categoria: "KOTLIN",
      pergunta: "Qual empresa criou a linguagem Kotlin?",
      opcoes: ["Google", "JetBrains", "Oracle", "Microsoft"],
      correta: 1,
    },
  ],
};

export type Nivel = "iniciante" | "intermediario" | "avancado";

export function calcularNivel(acertos: number, total: number): Nivel {
  const pct = acertos / total;
  if (pct >= 0.75) return "avancado";
  if (pct >= 0.4) return "intermediario";
  return "iniciante";
}

export const resultados: Record<Nivel, { titulo: string; descricao: string; emoji: string; cor: string }> = {
  iniciante: {
    titulo: "Iniciante",
    descricao: "Você está começando sua jornada! Vamos construir uma base sólida do zero, passo a passo.",
    emoji: "🌱",
    cor: "text-green-400",
  },
  intermediario: {
    titulo: "Intermediário",
    descricao: "Bom conhecimento! Você já domina o básico e está pronto para mergulhar em conceitos mais avançados.",
    emoji: "⚡",
    cor: "text-yellow-400",
  },
  avancado: {
    titulo: "Avançado",
    descricao: "Impressionante! Você tem domínio sólido. Vamos aprofundar em arquitetura, performance e boas práticas.",
    emoji: "🔥",
    cor: "text-zul-blue",
  },
};
