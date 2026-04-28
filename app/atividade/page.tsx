"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import Button from "@/components/ui/Button";

const desafios = [
  {
    categoria: "HTML BÁSICO",
    tarefa: "1/3",
    pergunta: "Qual a tag correta para o título principal no HTML?",
    opcoes: ["<h1>", "<head>", "<header>", "<title>"],
    correta: 0,
  },
  {
    categoria: "HTML BÁSICO",
    tarefa: "2/3",
    pergunta: "Qual tag é usada para criar um parágrafo em HTML?",
    opcoes: ["<text>", "<p>", "<para>", "<div>"],
    correta: 1,
  },
  {
    categoria: "HTML BÁSICO",
    tarefa: "3/3",
    pergunta: "Qual atributo define o destino de um link HTML?",
    opcoes: ["src", "link", "href", "url"],
    correta: 2,
  },
];

export default function AtividadePage() {
  const router = useRouter();
  const [atual, setAtual] = useState(0);
  const [selecionado, setSelecionado] = useState<number | null>(null);
  const [confirmado, setConfirmado] = useState(false);
  const [xp, setXp] = useState(0);
  const [concluido, setConcluido] = useState(false);

  const desafio = desafios[atual];
  const progresso = (atual / desafios.length) * 100;

  const handleConfirmar = () => {
    if (selecionado === null) return;
    setConfirmado(true);
    if (selecionado === desafio.correta) setXp((x) => x + 30);
  };

  const handleProxima = () => {
    if (atual + 1 >= desafios.length) {
      setConcluido(true);
    } else {
      setAtual((a) => a + 1);
      setSelecionado(null);
      setConfirmado(false);
    }
  };

  if (concluido) {
    return (
      <div className="min-h-screen bg-zul-dark flex flex-col">
        <Header showBack title="Desafio Completo" />
        <main className="flex-1 flex flex-col items-center justify-center px-5 pb-24 gap-6">
          <div className="text-6xl">🏆</div>
          <h2 className="text-3xl font-black text-center">Desafio Concluído!</h2>
          <div className="w-full max-w-sm bg-zul-surface border border-zul-border rounded-2xl p-5 flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">XP Ganho</span>
              <span className="font-bold text-zul-blue text-lg">+{xp} XP</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Questões corretas</span>
              <span className="font-bold text-lg">{xp / 30}/{desafios.length}</span>
            </div>
          </div>
          <Button variant="primary" size="lg" fullWidth onClick={() => router.push("/home")} className="uppercase tracking-wider max-w-sm">
            Continuar Jornada →
          </Button>
        </main>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zul-dark flex flex-col">
      <Header showBack title="Desafio Diário" />
      <main className="flex-1 p-5 flex flex-col gap-5 max-w-md mx-auto w-full pb-24">
        <section>
          <div className="flex justify-between items-end mb-2">
            <h2 className="text-zul-blue font-bold text-xs tracking-wider uppercase">Desafio Diário</h2>
            <span className="text-xs text-gray-500">Tarefa {desafio.tarefa}</span>
          </div>
          <div className="w-full h-3 bg-zul-surface rounded-full overflow-hidden border border-zul-border">
            <div className="h-full bg-zul-blue rounded-full transition-all duration-500" style={{ width: `${progresso}%` }} />
          </div>
        </section>

        <section className="bg-zul-surface border border-zul-border rounded-2xl p-5 shadow-xl">
          <div className="mb-6">
            <span className="text-[10px] font-bold text-gray-500 bg-zul-dark px-3 py-1 rounded-full border border-zul-border uppercase tracking-wider">
              {desafio.categoria}
            </span>
            <h3 className="text-lg font-bold mt-4 leading-snug">{desafio.pergunta}</h3>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {desafio.opcoes.map((opcao, idx) => {
              let estilo = "border-zul-border bg-zul-dark hover:border-zul-blue";
              let circulo = "border-zul-border";
              if (confirmado) {
                if (idx === desafio.correta) { estilo = "border-green-500 bg-green-500/10"; circulo = "border-green-500 bg-green-500"; }
                else if (idx === selecionado) { estilo = "border-red-500 bg-red-500/10"; circulo = "border-red-500 bg-red-500"; }
              } else if (idx === selecionado) {
                estilo = "border-zul-blue bg-zul-blue/10"; circulo = "border-zul-blue bg-zul-blue";
              }
              return (
                <button key={idx} onClick={() => !confirmado && setSelecionado(idx)} disabled={confirmado}
                  className={`w-full py-4 px-5 text-left rounded-xl border ${estilo} transition-all flex justify-between items-center`}>
                  <span className="font-mono text-base">{opcao}</span>
                  <div className={`w-6 h-6 rounded-full border-2 ${circulo} flex items-center justify-center transition-all`}>
                    {confirmado && idx === desafio.correta && (
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} />
                      </svg>
                    )}
                    {confirmado && idx === selecionado && idx !== desafio.correta && (
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} />
                      </svg>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {confirmado && (
          <div className={`rounded-xl p-4 border ${selecionado === desafio.correta ? "bg-green-500/10 border-green-500" : "bg-red-500/10 border-red-500"}`}>
            <p className={`font-bold text-sm ${selecionado === desafio.correta ? "text-green-400" : "text-red-400"}`}>
              {selecionado === desafio.correta ? "✓ Correto! +30 XP" : "✗ Resposta errada. Não desanime!"}
            </p>
          </div>
        )}

        <section className="mt-auto">
          {!confirmado ? (
            <Button variant="primary" size="lg" fullWidth onClick={handleConfirmar} disabled={selecionado === null}
              className={`uppercase tracking-wider ${selecionado === null ? "opacity-40" : ""}`}>
              Confirmar
            </Button>
          ) : (
            <Button variant="primary" size="lg" fullWidth onClick={handleProxima} className="uppercase tracking-wider">
              {atual + 1 >= desafios.length ? "Finalizar 🏆" : "Próxima →"}
            </Button>
          )}
        </section>
      </main>
      <BottomNav />
    </div>
  );
}