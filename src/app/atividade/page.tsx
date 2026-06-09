"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import Button from "@/components/ui/Button";

// Importando dados
import initialUserData from "@/data/user.json";
import logicaData from "@/data/courses/logica.json";
import javascriptData from "@/data/courses/javascript.json";
import pythonData from "@/data/courses/python.json";
import html_cssData from "@/data/courses/html_css.json";
import reactData from "@/data/courses/react.json";
import javaData from "@/data/courses/java.json";
import typescriptData from "@/data/courses/typescript.json";
import kotlinData from "@/data/courses/kotlin.json";

const coursesMap: Record<string, any> = {
  "logica": logicaData,
  "javascript": javascriptData,
  "python": pythonData,
  "html_css": html_cssData,
  "react": reactData,
  "java": javaData,
  "typescript": typescriptData,
  "kotlin": kotlinData
};

export default function AtividadePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [currentCourseId, setCurrentCourseId] = useState("logica");
  
  // Carregar usuário e curso do localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("zul_user_data");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      setUser(initialUserData.u1);
    }

    const savedCourseId = localStorage.getItem("zul_current_course_id");
    if (savedCourseId) {
      setCurrentCourseId(savedCourseId);
    }
  }, []);

  const courseData = coursesMap[currentCourseId] || logicaData;

  // Encontrar a fase atual baseada no progresso salvo
  const currentPhase = useMemo(() => {
    if (!user) return null;
    const progress = user.progress[currentCourseId] || { currentModule: 1, currentPhase: 1, completedPhases: [] };
    const currentPhaseId = `m${progress.currentModule}-p${progress.currentPhase}`;
    
    for (const module of courseData.modules) {
      const phase = module.phases.find((p: any) => p.id === currentPhaseId);
      if (phase) return phase;
    }
    // Fallback para a primeira fase do módulo se não encontrar
    const moduleIdx = (progress.currentModule || 1) - 1;
    return courseData.modules[moduleIdx]?.phases[0] || courseData.modules[0].phases[0];
  }, [user, currentCourseId, courseData]);

  const questoes = useMemo(() => {
    if (!currentPhase) return [];
    return currentPhase.parts.flatMap((part: any) => part.questions);
  }, [currentPhase]);

  const [atual, setAtual] = useState(0);
  const [selecionado, setSelecionado] = useState<number | null>(null);
  const [confirmado, setConfirmado] = useState(false);
  const [xpGanho, setXpGanho] = useState(0);
  const [concluido, setConcluido] = useState(false);

  if (!user || !currentPhase) return <div className="min-h-screen bg-zul-dark" />;

  const questao = questoes[atual];
  const progressoBarra = (atual / questoes.length) * 100;

  const handleConfirmar = () => {
    if (questao.type === "alternativa") {
      if (selecionado === null) return;
      setConfirmado(true);
      if (selecionado === questao.answer) setXpGanho((x) => x + 20);
    } else {
      handleProxima();
    }
  };

  const handleProxima = () => {
    if (atual + 1 >= questoes.length) {
      finalizarFase();
    } else {
      setAtual((a) => a + 1);
      setSelecionado(null);
      setConfirmado(false);
    }
  };

  const finalizarFase = () => {
    const newUser = { ...user };
    
    // Garantir que o objeto de progresso para o curso atual existe
    if (!newUser.progress[currentCourseId]) {
      newUser.progress[currentCourseId] = { 
        currentModule: 1, 
        currentPhase: 1, 
        completedPhases: [] 
      };
    }
    
    const progress = newUser.progress[currentCourseId];
    
    // 1. Adicionar ao array de completas se não estiver lá
    if (!progress.completedPhases.includes(currentPhase.id)) {
      progress.completedPhases.push(currentPhase.id);
    }

    // 2. Atualizar XP e Stats
    newUser.xp += xpGanho;
    newUser.stats.challengesDone += 1;

    // 3. Determinar próxima fase/módulo
    const currentModuleData = courseData.modules[progress.currentModule - 1];
    const currentPhaseIdx = currentModuleData.phases.findIndex((p: any) => p.id === currentPhase.id);

    if (currentPhaseIdx < currentModuleData.phases.length - 1) {
      // Avança para próxima fase no mesmo módulo
      progress.currentPhase = currentPhaseIdx + 2; // +1 para ser 1-based, +1 para a próxima
    } else if (progress.currentModule < courseData.modules.length) {
      // Avança para o próximo módulo
      progress.currentModule += 1;
      progress.currentPhase = 1;
    }

    // Salvar e mostrar tela de conclusão
    setUser(newUser);
    localStorage.setItem("zul_user_data", JSON.stringify(newUser));
    setConcluido(true);
  };

  if (concluido) {
    return (
      <div className="min-h-screen bg-zul-dark flex flex-col">
        <Header showBack title="Fase Concluída" />
        <main className="flex-1 flex flex-col items-center justify-center px-5 pb-24 gap-6">
          <div className="text-6xl animate-bounce">✨</div>
          <h2 className="text-3xl font-black text-center">{currentPhase.title} Concluída!</h2>
          <div className="w-full max-w-sm bg-zul-surface border border-zul-border rounded-2xl p-5 flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">XP Ganho</span>
              <span className="font-bold text-zul-blue text-lg">+{xpGanho} XP</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Status</span>
              <span className="font-bold text-green-500 text-lg">Dominado!</span>
            </div>
          </div>
          <Button variant="primary" size="lg" fullWidth onClick={() => router.push("/home")} className="uppercase tracking-wider max-w-sm">
            Voltar para Jornada →
          </Button>
        </main>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zul-dark flex flex-col">
      <Header showBack title={courseData.title} />
      <main className="flex-1 p-5 flex flex-col gap-5 max-w-md mx-auto w-full pb-24">
        <section>
          <div className="flex justify-between items-end mb-2">
            <h2 className="text-zul-blue font-bold text-xs tracking-wider uppercase">{currentPhase.title}</h2>
            <span className="text-xs text-gray-500">Lição {atual + 1}/{questoes.length}</span>
          </div>
          <div className="w-full h-3 bg-zul-surface rounded-full overflow-hidden border border-zul-border">
            <div className="h-full bg-zul-blue rounded-full transition-all duration-500" style={{ width: `${progressoBarra}%` }} />
          </div>
        </section>

        {questao.type === "explicativa" ? (
          <section className="bg-zul-surface border border-zul-border rounded-2xl p-6 shadow-xl flex-1 flex flex-col justify-center">
             <div className="mb-6">
                <span className="text-[10px] font-bold text-zul-blue bg-zul-blue/10 px-3 py-1 rounded-full border border-zul-blue/20 uppercase tracking-wider">
                  Explicação
                </span>
                <div className="prose prose-invert mt-6">
                  <p className="text-lg font-medium leading-relaxed text-gray-200">
                    {questao.content}
                  </p>
                </div>
             </div>
             <div className="mt-auto">
                <Button variant="primary" size="lg" fullWidth onClick={handleProxima} className="uppercase tracking-wider">
                  Entendi, continuar!
                </Button>
             </div>
          </section>
        ) : (
          <>
            <section className="bg-zul-surface border border-zul-border rounded-2xl p-5 shadow-xl">
              <div className="mb-6">
                <span className="text-[10px] font-bold text-gray-500 bg-zul-dark px-3 py-1 rounded-full border border-zul-border uppercase tracking-wider">
                  Múltipla Escolha
                </span>
                <h3 className="text-lg font-bold mt-4 leading-snug">{questao.question}</h3>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {questao.options.map((opcao: string, idx: number) => {
                  let estilo = "border-zul-border bg-zul-dark hover:border-zul-blue";
                  let circulo = "border-zul-border";
                  if (confirmado) {
                    if (idx === questao.answer) { estilo = "border-green-500 bg-green-500/10"; circulo = "border-green-500 bg-green-500"; }
                    else if (idx === selecionado) { estilo = "border-red-500 bg-red-500/10"; circulo = "border-red-500 bg-red-500"; }
                  } else if (idx === selecionado) {
                    estilo = "border-zul-blue bg-zul-blue/10"; circulo = "border-zul-blue bg-zul-blue";
                  }
                  return (
                    <button key={idx} onClick={() => !confirmado && setSelecionado(idx)} disabled={confirmado}
                      className={`w-full py-4 px-5 text-left rounded-xl border ${estilo} transition-all flex justify-between items-center`}>
                      <span className="text-sm font-semibold">{opcao}</span>
                      <div className={`w-6 h-6 rounded-full border-2 ${circulo} flex items-center justify-center transition-all flex-shrink-0 ml-3`}>
                        {confirmado && idx === questao.answer && (
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} />
                          </svg>
                        )}
                        {confirmado && idx === selecionado && idx !== questao.answer && (
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
              <div className={`rounded-xl p-4 border ${selecionado === questao.answer ? "bg-green-500/10 border-green-500" : "bg-red-500/10 border-red-500"}`}>
                <p className={`font-bold text-sm ${selecionado === questao.answer ? "text-green-400" : "text-red-400"}`}>
                  {selecionado === questao.answer ? "✓ Correto! +20 XP" : "✗ Resposta errada. Não desanime!"}
                </p>
              </div>
            )}

            <section className="mt-auto">
              {!confirmado ? (
                <Button variant="primary" size="lg" fullWidth onClick={handleConfirmar} disabled={selecionado === null}
                  className={`uppercase tracking-wider ${selecionado === null ? "opacity-40" : ""}`}>
                  Verificar Resposta
                </Button>
              ) : (
                <Button variant="primary" size="lg" fullWidth onClick={handleProxima} className="uppercase tracking-wider">
                  {atual + 1 >= questoes.length ? "Finalizar Fase ✨" : "Próxima Questão →"}
                </Button>
              )}
            </section>
          </>
        )}
      </main>
      <BottomNav />
    </div>
  );
}
