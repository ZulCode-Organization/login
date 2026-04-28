"use client";

import { useState } from "react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import DesktopSidebar from "@/components/layout/DesktopSidebar";
import Link from "next/link";

// ── Dados ─────────────────────────────────────────────────────────────────────

const nodes = [
  { id: 1, label: "Começar",   sublabel: "Intro ao HTML",  status: "completed" as const, offset: 64,  xp: 20 },
  { id: 2, label: "Estrutura", sublabel: "Tags básicas",   status: "active"    as const, offset: -64, xp: 25 },
  { id: 3, label: "Estilo",    sublabel: "CSS básico",     status: "locked"    as const, offset: 64,  xp: 30 },
  { id: 4, label: "Interação", sublabel: "JavaScript",     status: "locked"    as const, offset: -64, xp: 35 },
  { id: 5, label: "Projeto",   sublabel: "Mini site",      status: "locked"    as const, offset: 0,   xp: 50 },
];

const metasDiarias = [
  { label: "Resolver 3 desafios na primeira tentativa", atual: 0, total: 3 },
  { label: "Ganhar 95 XP", atual: 20, total: 95 },
  { label: "Completar 4 lições", atual: 1, total: 4 },
];


// ── Sub-componentes ────────────────────────────────────────────────────────────

type Status = "completed" | "active" | "locked";

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
  const [aberto, setAberto] = useState(false);
  const concluidas = nodes.filter((n) => n.status === "completed").length;

  // ── Conteúdo compartilhado (banner + roadmap) ──────────────────────────────

  const banner = (
    <div>
      <button
        onClick={() => setAberto((v) => !v)}
        className={`w-full bg-zul-blue px-4 py-4 flex justify-between items-center shadow-neon-blue-lg
          active:scale-[0.99] transition-all duration-200
          ${aberto ? "rounded-t-2xl" : "rounded-2xl"}`}
      >
        <div className="text-left">
          <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Seção 1 • Unidade 1</p>
          <h2 className="text-base font-bold mt-0.5">Fundamentos do HTML</h2>
          <div className="flex items-center gap-2 mt-1.5">
            <div className="flex-1 h-1.5 bg-blue-400/30 rounded-full overflow-hidden max-w-[120px]">
              <div className="h-full bg-white/70 rounded-full" style={{ width: `${(concluidas / nodes.length) * 100}%` }} />
            </div>
            <span className="text-[10px] opacity-70">{concluidas}/{nodes.length}</span>
          </div>
        </div>
        <div className="ml-3 w-8 h-8 bg-blue-500/40 rounded-xl flex items-center justify-center flex-shrink-0">
          <svg className={`h-4 w-4 transition-transform duration-300 ${aberto ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} />
          </svg>
        </div>
      </button>

      <div className={`overflow-hidden transition-all duration-300 ${aberto ? "max-h-[420px]" : "max-h-0"}`}>
        <div className="bg-zul-surface border border-t-0 border-zul-blue/40 rounded-b-2xl px-4 pt-3 pb-4 space-y-1.5">
          <p className="text-xs text-gray-500 pb-2 border-b border-zul-border">
            Aprenda os fundamentos do HTML do zero, passo a passo.
          </p>
          {nodes.map((node) => (
            <div key={node.id}
              className={`flex items-center gap-3 py-2.5 px-3 rounded-xl border transition-all
                ${node.status === "active" ? "border-zul-blue bg-zul-blue/10" : "border-zul-border bg-zul-dark"}
                ${node.status === "locked" ? "opacity-40" : ""}`}
            >
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0
                ${node.status === "completed" ? "bg-zul-blue" : node.status === "active" ? "bg-zul-blue/20 border border-zul-blue" : "bg-zul-surface border border-zul-border"}`}>
                {node.status === "completed" ? (
                  <svg className="h-3.5 w-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} /></svg>
                ) : node.status === "active" ? (
                  <svg className="h-3.5 w-3.5 text-zul-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 3l14 9-14 9V3z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} /></svg>
                ) : (
                  <svg className="h-3.5 w-3.5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} /></svg>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold truncate">{node.sublabel}</p>
                <p className="text-[10px] text-gray-500">{node.label}</p>
              </div>
              <span className={`text-[10px] font-bold flex-shrink-0 ${node.status === "locked" ? "text-gray-600" : "text-zul-blue"}`}>
                +{node.xp} XP
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const roadmap = (
    <>
      <div className="mt-8 mb-2 text-center">
        <h1 className="text-xl font-black uppercase tracking-widest">HTML Básico</h1>
        <p className="text-gray-500 text-xs mt-1">5 lições • ~30 min</p>
      </div>

      <section className="relative py-4">
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-zul-border" />
        <div
          className="absolute left-1/2 top-0 w-0.5 -translate-x-1/2 bg-zul-blue transition-all duration-500"
          style={{ height: `${(concluidas / nodes.length) * 100}%` }}
        />

        <div className="flex flex-col gap-14 py-2">
          {nodes.map((node) => {
            const isLocked = node.status === "locked";
            const isActive = node.status === "active";
            const isCompleted = node.status === "completed";
            return (
              <div key={node.id} className="relative flex justify-center">
                <div className="flex flex-col items-center z-10" style={{ transform: `translateX(${node.offset}px)` }}>
                  <Link
                    href={isLocked ? "#" : "/atividade"}
                    tabIndex={isLocked ? -1 : 0}
                    className={`relative block rounded-[22px] transition-all duration-200 ${isLocked ? "cursor-not-allowed" : "hover:scale-105 active:scale-95"}`}
                  >
                    <div className={`w-[72px] h-[72px] rounded-[22px] flex items-center justify-center relative
                      ${isCompleted ? "bg-zul-blue border-4 border-blue-300 shadow-neon-blue" : ""}
                      ${isActive ? "bg-zul-surface border-4 border-zul-blue glow-blue" : ""}
                      ${isLocked ? "bg-[#1a1d26] border-4 border-[#252836]" : ""}`}
                    >
                      <NodeIcon status={node.status} />
                      {isCompleted && (
                        <span className="absolute -top-2.5 -right-2.5 bg-yellow-400 text-black text-[9px] font-black px-1.5 py-0.5 rounded-full leading-none">✓</span>
                      )}
                    </div>
                    {isActive && (
                      <span className="absolute inset-0 rounded-[22px] border-2 border-zul-blue opacity-40 animate-ping" />
                    )}
                  </Link>
                  <p className={`mt-2 text-[11px] font-bold uppercase tracking-wide
                    ${isCompleted ? "text-blue-400" : isActive ? "text-white" : "text-gray-600"}`}>
                    {node.label}
                  </p>
                  <p className="text-[10px] text-gray-600 mt-0.5 whitespace-nowrap">{node.sublabel}</p>
                  {!isLocked && <span className="text-[9px] text-zul-blue font-bold mt-0.5">+{node.xp} XP</span>}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );

  const metasCard = (
    <div className="bg-zul-surface border border-zul-border rounded-2xl p-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-base">Metas Diárias</h3>
        <button className="text-zul-blue text-xs font-semibold">Ver todas</button>
      </div>
      <div className="space-y-4">
        {metasDiarias.map((meta) => (
          <div key={meta.label}>
            <div className="flex justify-between mb-1.5">
              <span className="text-xs text-gray-400 leading-snug pr-2">{meta.label}</span>
              <span className="text-xs font-bold whitespace-nowrap">{meta.atual}/{meta.total}</span>
            </div>
            <div className="w-full bg-zul-dark h-2 rounded-full overflow-hidden">
              <div className="bg-zul-blue h-full rounded-full transition-all" style={{ width: `${(meta.atual / meta.total) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-zul-dark">

      {/* ══════════════════════════════════════════════════════
          MOBILE  (< lg)  — layout original, não mexido
      ══════════════════════════════════════════════════════ */}
      <div className="flex flex-col min-h-screen lg:hidden">
        <Header />
        <main className="flex-1 pb-28 w-full max-w-lg mx-auto px-4">
          <div className="mt-5">{banner}</div>
          {roadmap}
          <section className="mt-6 mb-4">{metasCard}</section>
        </main>
        <BottomNav />
      </div>

      {/* ══════════════════════════════════════════════════════
          DESKTOP  (≥ lg)  — sidebar esquerda + centro + painel direito
      ══════════════════════════════════════════════════════ */}
      <div className="hidden lg:flex h-screen overflow-hidden">

        {/* ── Sidebar esquerda ── */}
        <DesktopSidebar />

        {/* ── Centro (roadmap) ── */}
        <main className="flex-1 overflow-y-auto px-8 py-6">
          <div className="max-w-sm mx-auto">
            {banner}
            {roadmap}
          </div>
        </main>

        {/* ── Painel direito ── */}
        <aside className="w-72 xl:w-80 flex flex-col flex-shrink-0 border-l border-zul-border overflow-y-auto px-4 py-5 gap-4">

          {/* Card PRO */}
          <div className="bg-zul-surface border border-zul-border rounded-2xl p-4">
            <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Obter mais</p>
            <div className="flex items-start gap-3">
              <div className="w-10 h-12 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-xl flex-shrink-0 flex items-center justify-center shadow-lg">
                <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-300 leading-snug">Desbloqueie experiência de aprendizado aprimorada e ilimitada!</p>
                <button className="mt-2.5 w-full bg-yellow-400 hover:bg-yellow-300 text-black text-xs font-black uppercase tracking-wider py-2 px-4 rounded-xl transition-colors">
                  SER PRO
                </button>
              </div>
            </div>
          </div>

          {/* Tabela de Líderes */}
          <div className="bg-zul-surface border border-zul-border rounded-2xl p-4">
            <div className="flex justify-between items-center mb-3">
              <p className="text-sm font-bold">Tabela de Líderes</p>
              <button className="text-zul-blue text-xs font-semibold">Ver</button>
            </div>
            <div className="flex items-center gap-3 py-3 px-3 rounded-xl bg-zul-dark border border-zul-border opacity-60">
              <svg className="h-5 w-5 text-gray-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
              </svg>
              <p className="text-xs text-gray-500">Alcance 100 XP para desbloquear</p>
            </div>
            <div className="mt-2 w-full h-1.5 bg-zul-dark rounded-full overflow-hidden">
              <div className="bg-zul-blue h-full rounded-full" style={{ width: "20%" }} />
            </div>
            <p className="text-[10px] text-gray-600 mt-1">20 / 100 XP</p>
          </div>

          {/* Metas Diárias */}
          <div className="flex-1">{metasCard}</div>
        </aside>

      </div>
    </div>
  );
}
