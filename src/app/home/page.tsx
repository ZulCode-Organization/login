"use client";

import { useState, useMemo, useEffect } from "react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import DesktopSidebar from "@/components/layout/DesktopSidebar";
import Link from "next/link";
import Card from "@/components/ui/Card";

// Dados iniciais e linguagens do nivelamento
import initialUserData from "@/data/user.json";
import { linguagens } from "@/app/nivelamento/data";

// Importando todos os JSONs de cursos
import logicaData from "@/data/courses/logica.json";
import javascriptData from "@/data/courses/javascript.json";
import pythonData from "@/data/courses/python.json";
import html_cssData from "@/data/courses/html_css.json";
import reactData from "@/data/courses/react.json";
import javaData from "@/data/courses/java.json";
import typescriptData from "@/data/courses/typescript.json";
import kotlinData from "@/data/courses/kotlin.json";

// ── Ícones SVG ────────────────────────────────────────────────────────────────

const FlameIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} />
  </svg>
);

const HeartIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.579 5.579 0 0112 4.945 5.579 5.579 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001z" />
  </svg>
);

const ChevronIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} />
  </svg>
);

// ── Tipos ─────────────────────────────────────────────────────────────────────

type Status = "completed" | "active" | "locked";

interface Node {
  id: string;
  label: string;
  sublabel: string;
  status: Status;
  offset: number;
  xp: number;
}

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

function NodeIcon({ status }: { status: Status }) {
  if (status === "completed")
    return (
      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} />
      </svg>
    );
  if (status === "active")
    return (
      <svg className="h-6 w-6 text-zul-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M5 3l14 9-14 9V3z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
      </svg>
    );
  return (
    <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    </svg>
  );
}

// ── Componente principal ───────────────────────────────────────────────────────

export default function HomePage() {
  const [user, setUser] = useState<any>(null);
  const [currentCourseId, setCurrentCourseId] = useState("logica");
  const [aberto, setAberto] = useState(true); // Começa aberto no desktop
  const [modulosAberto, setModulosAberto] = useState(true);

  // Carregar usuário do localStorage ou do JSON inicial
  useEffect(() => {
    const saved = localStorage.getItem("zul_user_data");
    if (saved) {
      setUser(JSON.parse(saved));
    } else {
      setUser(initialUserData.u1);
    }
  }, []);

  if (!user) return <div className="min-h-screen bg-zul-dark" />;

  const courseProgress = user.progress[currentCourseId] || { currentModule: 1, completedPhases: [] };
  const courseData = coursesMap[currentCourseId] || logicaData;
  const currentModuleData = courseData.modules[courseProgress.currentModule - 1] || courseData.modules[0];

  const nodes: Node[] = currentModuleData.phases.map((phase: any, pIdx: number) => {
    const isCompleted = courseProgress.completedPhases.includes(phase.id);
    const prevPhaseId = pIdx > 0 ? currentModuleData.phases[pIdx - 1].id : null;
    const isFirstNonCompleted = !isCompleted && (pIdx === 0 || courseProgress.completedPhases.includes(prevPhaseId));
    const status: Status = isCompleted ? "completed" : isFirstNonCompleted ? "active" : "locked";

    return {
      id: phase.id,
      label: `Fase ${pIdx + 1}`,
      sublabel: phase.title,
      status: status,
      offset: (pIdx % 2 === 0) ? 64 : -64,
      xp: 25
    };
  });

  const concluidas = nodes.filter((n) => n.status === "completed").length;

  const changeModule = (mIdx: number) => {
    const newUser = { ...user };
    if (!newUser.progress[currentCourseId]) {
      newUser.progress[currentCourseId] = { currentModule: 1, completedPhases: [], currentPhase: 1 };
    }
    newUser.progress[currentCourseId].currentModule = mIdx + 1;
    setUser(newUser);
    localStorage.setItem("zul_user_data", JSON.stringify(newUser));
  };

  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentCourseId(e.target.value);
  };

  // ── Conteúdo compartilhado ─────────────────────────────────────────────────

  const statusBar = (
    <div className="grid grid-cols-3 gap-2">
      <div className="bg-zul-surface border border-zul-border rounded-2xl p-2.5 flex flex-col items-center justify-center gap-0.5">
        <FlameIcon className="w-5 h-5 text-orange-400" />
        <span className="text-xs font-black">{user.stats.streak}</span>
      </div>
      <div className="bg-zul-surface border border-zul-border rounded-2xl p-2.5 flex flex-col items-center justify-center gap-0.5">
        <span className="text-yellow-400 text-lg leading-none">🪙</span>
        <span className="text-xs font-black">{user.coins}</span>
      </div>
      <div className="bg-zul-surface border border-zul-border rounded-2xl p-2.5 flex flex-col items-center justify-center gap-0.5">
        <HeartIcon className="w-5 h-5 text-red-500" />
        <span className="text-xs font-black">{user.hearts || 5}</span>
      </div>
    </div>
  );

  const courseSelector = (
    <div className="relative">
       <select 
         value={currentCourseId}
         onChange={handleCourseChange}
         className="appearance-none bg-zul-surface border border-zul-border text-white text-xs font-black uppercase tracking-widest px-4 py-3 pr-10 rounded-xl focus:outline-none focus:border-zul-blue transition-all cursor-pointer w-full shadow-lg"
       >
         {linguagens.map(l => (
           <option key={l.id} value={l.id}>{l.label}</option>
         ))}
       </select>
       <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zul-blue">
          <ChevronIcon className="w-4 h-4 rotate-90" />
       </div>
    </div>
  );

  const banner = (
    <div className="space-y-4">
      <div className="lg:hidden">{statusBar}</div>
      <div className="flex flex-col gap-2">
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Trilha de Estudo</p>
          {courseSelector}
      </div>
      
      <button
        onClick={() => setAberto((v) => !v)}
        className={`w-full bg-zul-blue px-4 py-4 flex justify-between items-center shadow-neon-blue-lg
          active:scale-[0.99] transition-all duration-200
          ${aberto ? "rounded-t-2xl" : "rounded-2xl"}`}
      >
        <div className="text-left">
          <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Unidade {courseProgress.currentModule}</p>
          <h2 className="text-base font-bold mt-0.5">{currentModuleData.title}</h2>
          <div className="flex items-center gap-2 mt-1.5">
            <div className="flex-1 h-1.5 bg-blue-400/30 rounded-full overflow-hidden max-w-[120px]">
              <div className="h-full bg-white/70 rounded-full" style={{ width: `${(concluidas / nodes.length) * 100}%` }} />
            </div>
            <span className="text-[10px] opacity-70">{concluidas}/{nodes.length}</span>
          </div>
        </div>
        <div className="ml-3 w-8 h-8 bg-blue-500/40 rounded-xl flex items-center justify-center flex-shrink-0">
          <ChevronIcon className={`h-4 w-4 transition-transform duration-300 ${aberto ? "rotate-180" : ""}`} />
        </div>
      </button>

      <div className={`overflow-hidden transition-all duration-300 ${aberto ? "max-h-[500px]" : "max-h-0"}`}>
        <div className="bg-zul-surface border border-t-0 border-zul-blue/40 rounded-b-2xl px-2 py-2 space-y-1">
          {courseData.modules.map((m: any, idx: number) => {
             const isCurrent = idx + 1 === courseProgress.currentModule;
             const isLocked = idx + 1 > (courseProgress.currentModule || 1);
             return (
                <button 
                  key={m.id} 
                  disabled={isLocked}
                  onClick={() => changeModule(idx)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-all
                    ${isCurrent ? "bg-zul-blue/20 border border-zul-blue text-white" : "hover:bg-zul-dark text-gray-400"}
                    ${isLocked ? "opacity-40 cursor-not-allowed" : ""}`}
                >
                   <div className="flex items-center gap-3">
                      <span className="text-xs font-bold w-5">0{idx + 1}</span>
                      <span className="text-xs font-semibold text-left">{m.title}</span>
                   </div>
                   {isLocked ? (
                     <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} /></svg>
                   ) : isCurrent ? (
                     <div className="w-2 h-2 rounded-full bg-zul-blue animate-pulse" />
                   ) : (
                     <svg className="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} /></svg>
                   )}
                </button>
             );
          })}
        </div>
      </div>
    </div>
  );

  const roadmap = (
    <section className="relative py-8">
      <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 bg-zul-border" />
      <div
        className="absolute left-1/2 top-0 w-1 -translate-x-1/2 bg-zul-blue transition-all duration-500"
        style={{ height: `${(concluidas / nodes.length) * 100}%` }}
      />

      <div className="flex flex-col gap-16 py-4">
        {nodes.map((node) => {
          const isLocked = node.status === "locked";
          const isActive = node.status === "active";
          const isCompleted = node.status === "completed";
          return (
            <div key={node.id} className="relative flex justify-center">
              <div className="flex flex-col items-center z-10" style={{ transform: `translateX(${node.offset}px)` }}>
                <Link
                  href={isLocked ? "#" : "/atividade"}
                  className={`relative block rounded-[24px] transition-all duration-200 ${isLocked ? "cursor-not-allowed" : "hover:scale-110 active:scale-90"}`}
                >
                  <div className={`w-[80px] h-[80px] rounded-[24px] flex items-center justify-center relative
                    ${isCompleted ? "bg-zul-blue border-4 border-blue-300 shadow-neon-blue" : ""}
                    ${isActive ? "bg-zul-surface border-4 border-zul-blue glow-blue" : ""}
                    ${isLocked ? "bg-[#1a1d26] border-4 border-[#252836]" : ""}`}
                  >
                    <NodeIcon status={node.status} />
                    {isCompleted && (
                      <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg">✓</span>
                    )}
                  </div>
                  {isActive && (
                    <span className="absolute inset-0 rounded-[24px] border-2 border-zul-blue opacity-40 animate-ping" />
                  )}
                </Link>
                <div className="text-center mt-3">
                    <p className={`text-[11px] font-black uppercase tracking-widest
                    ${isCompleted ? "text-blue-400" : isActive ? "text-white" : "text-gray-600"}`}>
                    {node.label}
                    </p>
                    <p className="text-[10px] text-gray-500 mt-0.5 whitespace-nowrap truncate max-w-[120px] font-medium">{node.sublabel}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-zul-dark">
      <div className="flex flex-col min-h-screen lg:hidden">
        <Header />
        <main className="flex-1 pb-28 w-full max-w-lg mx-auto px-4">
          <div className="mt-5">{banner}</div>
          {roadmap}
        </main>
        <BottomNav />
      </div>

      <div className="hidden lg:flex h-screen overflow-hidden">
        <DesktopSidebar />

        <main className="flex-1 overflow-y-auto px-12 py-8 scrollbar-hide">
          <div className="max-w-sm mx-auto">
            {roadmap}
          </div>
        </main>

        <aside className="w-80 flex flex-col flex-shrink-0 border-l border-zul-border overflow-y-auto px-6 py-8 gap-6">
          
          {/* Status Bar (Mesmo padrão do perfil) */}
          {statusBar}

          {/* Seletor de Curso */}
          <div>
             <p className="text-xs font-black uppercase tracking-widest text-gray-500 mb-3">Linguagem de Estudo</p>
             {courseSelector}
          </div>

          {/* Módulos do Curso (Retraível) */}
          <div className="bg-zul-surface border border-zul-border rounded-2xl overflow-hidden">
            <button 
                onClick={() => setModulosAberto(!modulosAberto)}
                className="w-full flex items-center justify-between p-4 bg-zul-surface hover:bg-zul-dark transition-colors border-b border-zul-border"
            >
                <span className="text-xs font-black uppercase tracking-widest text-zul-blue">Módulos</span>
                <ChevronIcon className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${modulosAberto ? "rotate-90" : "-rotate-90"}`} />
            </button>
            
            <div className={`overflow-hidden transition-all duration-300 ${modulosAberto ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="p-2 space-y-1">
                    {courseData.modules.map((m: any, idx: number) => {
                    const isCurrent = idx + 1 === (courseProgress.currentModule || 1);
                    const isLocked = idx + 1 > (courseProgress.currentModule || 1);
                    return (
                        <button 
                        key={m.id} 
                        disabled={isLocked}
                        onClick={() => changeModule(idx)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl transition-all
                            ${isCurrent ? "bg-zul-blue/15 text-zul-blue" : "hover:bg-zul-dark text-gray-400"}
                            ${isLocked ? "opacity-30 cursor-not-allowed" : ""}`}
                        >
                        <div className="flex items-center gap-3 text-left">
                            <span className="text-xs font-bold w-4">{idx + 1}</span>
                            <span className="text-xs font-bold truncate max-w-[180px]">{m.title}</span>
                        </div>
                        {isLocked ? (
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} /></svg>
                        ) : (
                            <div className={`w-1.5 h-1.5 rounded-full ${isCurrent ? "bg-zul-blue animate-pulse" : "bg-green-500"}`} />
                        )}
                        </button>
                    );
                    })}
                </div>
            </div>
          </div>

          {/* Metas Diárias */}
          <Card className="p-5">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-base">Metas Diárias</h3>
                <button className="text-zul-blue text-xs font-semibold">Ver todas</button>
            </div>
            <div className="space-y-4">
                {[
                { label: "Resolver 3 desafios", atual: 0, total: 3 },
                { label: "Ganhar 95 XP", atual: user.xp % 100, total: 95 },
                { label: "Completar lições", atual: user.stats.completedMissions % 4, total: 4 },
                ].map((meta) => (
                <div key={meta.label}>
                    <div className="flex justify-between mb-1.5">
                    <span className="text-xs text-gray-400">{meta.label}</span>
                    <span className="text-xs font-bold">{meta.atual}/{meta.total}</span>
                    </div>
                    <div className="w-full bg-zul-dark h-2 rounded-full overflow-hidden">
                    <div className="bg-zul-blue h-full rounded-full transition-all" style={{ width: `${(meta.atual / meta.total) * 100}%` }} />
                    </div>
                </div>
                ))}
            </div>
          </Card>

          {/* Card PRO */}
          <div className="bg-gradient-to-br from-zul-surface to-zul-dark border border-zul-border rounded-2xl p-5 relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 text-7xl opacity-10">💎</div>
            <p className="text-xs font-black uppercase tracking-widest text-zul-blue mb-2">ZulCode Pro</p>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">Acesso ilimitado a todos os cursos e desafios exclusivos.</p>
            <button className="w-full bg-zul-blue text-white text-xs font-black uppercase tracking-wider py-3 rounded-xl shadow-neon-blue hover:scale-[1.02] transition-all">
              Assinar Agora
            </button>
          </div>

        </aside>
      </div>
    </div>
  );
}
