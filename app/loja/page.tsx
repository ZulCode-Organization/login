"use client";

import { useState } from "react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import DesktopSidebar from "@/components/layout/DesktopSidebar";
import Card from "@/components/ui/Card";

// ── Ícones SVG ────────────────────────────────────────────────────────────────

const SparkleIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
);

const UserIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
);

const BoltIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
);

const ShieldIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
);

const CpuIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v10m10-10v10M5 12a7 7 0 0014 0M5 12h.01M19 12h.01" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
);

const GiftIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
);

const LightbulbIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
);

// ── Dados ────────────────────────────────────────────────────────────────────

const categorias = ["Todos", "Temas", "Avatares", "Power-ups", "Bônus"];

type ItemIcon = React.ComponentType<{ className?: string }>;

const itens: {
  id: number; nome: string; desc: string; preco: number;
  Icon: ItemIcon; iconBg: string; tipo: string; destaque: boolean;
}[] = [
  { id: 1, nome: "Tema Dark Blue",  desc: "Visual exclusivo azul profundo",    preco: 500, Icon: SparkleIcon,  iconBg: "bg-purple-500/15 text-purple-400",  tipo: "Temas",     destaque: true  },
  { id: 2, nome: "Avatar Hacker",   desc: "Personagem com capuz e óculos",     preco: 300, Icon: UserIcon,     iconBg: "bg-cyan-500/15 text-cyan-400",      tipo: "Avatares",  destaque: false },
  { id: 3, nome: "XP Dobrado",      desc: "2x XP por 24 horas",               preco: 200, Icon: BoltIcon,     iconBg: "bg-yellow-500/15 text-yellow-400",  tipo: "Power-ups", destaque: true  },
  { id: 4, nome: "Streak Shield",   desc: "Protege sua sequência por 1 dia",   preco: 150, Icon: ShieldIcon,   iconBg: "bg-green-500/15 text-green-400",    tipo: "Power-ups", destaque: false },
  { id: 5, nome: "Avatar Robô",     desc: "Personagem robótico futurista",     preco: 400, Icon: CpuIcon,      iconBg: "bg-cyan-500/15 text-cyan-400",      tipo: "Avatares",  destaque: false },
  { id: 6, nome: "Tema Neon Green", desc: "Visual matrix verde neon",          preco: 600, Icon: SparkleIcon,  iconBg: "bg-green-500/15 text-green-400",    tipo: "Temas",     destaque: false },
  { id: 7, nome: "Bônus XP 500",    desc: "500 XP adicionados direto",         preco: 800, Icon: GiftIcon,     iconBg: "bg-orange-500/15 text-orange-400",  tipo: "Bônus",     destaque: true  },
  { id: 8, nome: "Dica Extra",      desc: "3 dicas extras para desafios",      preco: 100, Icon: LightbulbIcon,iconBg: "bg-zul-blue/15 text-zul-blue",      tipo: "Power-ups", destaque: false },
];

// ── Componente principal ──────────────────────────────────────────────────────

export default function LojaPage() {
  const [catAtiva, setCatAtiva] = useState("Todos");

  const itensFiltrados = catAtiva === "Todos"
    ? itens
    : itens.filter((i) => i.tipo === catAtiva);

  // ── Conteúdo compartilhado ─────────────────────────────────────────────────

  const header = (
    <div className="flex justify-between items-center mb-1">
      <h1 className="text-xl font-black uppercase tracking-wide">Loja</h1>
      <div className="flex items-center gap-1.5 bg-zul-surface border border-zul-border rounded-full px-3 py-1.5">
        <span className="text-yellow-400">🪙</span>
        <span className="font-bold text-sm">1.250</span>
      </div>
    </div>
  );

  // Oferta da semana — preservada exatamente como estava
  const oferta = (
    <div className="bg-gradient-to-r from-zul-blue to-blue-400 rounded-2xl p-4 relative overflow-hidden">
      <div className="absolute -right-4 -top-4 text-6xl opacity-30">⚡</div>
      <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-1">Oferta da Semana</p>
      <h3 className="font-black text-lg">XP Dobrado</h3>
      <p className="text-xs opacity-80 mb-3">Ganhe 2x XP em todos os desafios</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <span className="text-yellow-300">🪙</span>
          <span className="font-black text-lg">100</span>
          <span className="text-xs line-through opacity-50 ml-1">200</span>
        </div>
        <button className="bg-white text-zul-blue font-black text-xs px-4 py-2 rounded-full">
          COMPRAR
        </button>
      </div>
    </div>
  );

  const categoriasFiltro = (
    <div className="overflow-x-auto">
      <div className="flex gap-2 pb-1">
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setCatAtiva(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all
              ${catAtiva === cat
                ? "bg-zul-blue text-white shadow-neon-blue"
                : "bg-zul-surface border border-zul-border text-gray-400 hover:border-zul-blue"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-zul-dark">

      {/* ══════════════════════════════════════════════════════
          MOBILE  (< lg)
      ══════════════════════════════════════════════════════ */}
      <div className="flex flex-col min-h-screen lg:hidden">
        <Header />
        <main className="flex-1 pb-24 max-w-md mx-auto w-full">
          <div className="px-4 pt-5 pb-3">
            {header}
            <p className="text-gray-500 text-xs">Gaste suas ZulCoins em itens exclusivos</p>
          </div>
          <div className="mx-4 mb-4">{oferta}</div>
          <div className="px-4 mb-4">{categoriasFiltro}</div>
          <div className="px-4 grid grid-cols-2 gap-3">
            {itensFiltrados.map((item) => (
              <Card key={item.id} className="p-4 relative flex flex-col gap-2" glowOnHover>
                {item.destaque && (
                  <div className="absolute top-2 right-2 bg-zul-blue text-[9px] font-black px-2 py-0.5 rounded-full uppercase">Hot</div>
                )}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-1 ${item.iconBg}`}>
                  <item.Icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-bold text-sm leading-tight">{item.nome}</p>
                  <p className="text-gray-500 text-[10px] mt-0.5">{item.desc}</p>
                </div>
                <div className="flex items-center justify-between mt-auto pt-2 border-t border-zul-border">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400 text-xs">🪙</span>
                    <span className="font-bold text-sm">{item.preco}</span>
                  </div>
                  <button className="bg-zul-blue text-white text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-neon-blue active:scale-95 transition-all">
                    Comprar
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </main>
        <BottomNav />
      </div>

      {/* ══════════════════════════════════════════════════════
          DESKTOP  (≥ lg)
      ══════════════════════════════════════════════════════ */}
      <div className="hidden lg:flex h-screen overflow-hidden">

        <DesktopSidebar />

        {/* ── Centro ── */}
        <main className="flex-1 overflow-y-auto px-8 py-6">
          <div className="mb-4">
            {header}
            <p className="text-gray-500 text-xs mt-1">Gaste suas ZulCoins em itens exclusivos</p>
          </div>
          <div className="mb-5">{oferta}</div>
          <div className="mb-4">{categoriasFiltro}</div>
          <div className="grid grid-cols-3 xl:grid-cols-4 gap-3 pb-6">
            {itensFiltrados.map((item) => (
              <Card key={item.id} className="p-4 relative flex flex-col gap-2" glowOnHover>
                {item.destaque && (
                  <div className="absolute top-2 right-2 bg-zul-blue text-[9px] font-black px-2 py-0.5 rounded-full uppercase">Hot</div>
                )}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-1 ${item.iconBg}`}>
                  <item.Icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-bold text-sm leading-tight">{item.nome}</p>
                  <p className="text-gray-500 text-[10px] mt-0.5">{item.desc}</p>
                </div>
                <div className="flex items-center justify-between mt-auto pt-2 border-t border-zul-border">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400 text-xs">🪙</span>
                    <span className="font-bold text-sm">{item.preco}</span>
                  </div>
                  <button className="bg-zul-blue text-white text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-neon-blue active:scale-95 transition-all">
                    Comprar
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </main>

        {/* ── Painel direito ── */}
        <aside className="w-72 xl:w-80 flex flex-col flex-shrink-0 border-l border-zul-border overflow-y-auto px-4 py-6 gap-4">

          {/* Saldo */}
          <div className="bg-zul-surface border border-zul-border rounded-2xl p-4">
            <p className="text-xs font-black uppercase tracking-widest text-gray-500 mb-3">Seu Saldo</p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-400/10 border border-yellow-400/30 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">
                🪙
              </div>
              <div>
                <p className="text-2xl font-black">1.250</p>
                <p className="text-xs text-gray-500">ZulCoins disponíveis</p>
              </div>
            </div>
          </div>

          {/* Categorias vertical */}
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-gray-500 mb-3">Categorias</p>
            <div className="flex flex-col gap-1">
              {categorias.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCatAtiva(cat)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all
                    ${catAtiva === cat
                      ? "bg-zul-blue/15 text-zul-blue"
                      : "text-gray-400 hover:text-white hover:bg-zul-surface"
                    }`}
                >
                  <span>{cat}</span>
                  <span className="text-xs text-gray-600">
                    {cat === "Todos" ? itens.length : itens.filter((i) => i.tipo === cat).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Histórico */}
          <div className="mt-auto">
            <div className="bg-zul-surface border border-zul-border rounded-2xl p-4 opacity-60">
              <p className="text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Histórico</p>
              <div className="flex items-center gap-2 py-2">
                <svg className="h-5 w-5 text-gray-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                </svg>
                <p className="text-xs text-gray-500">Realize sua primeira compra para ver o histórico</p>
              </div>
            </div>
          </div>

        </aside>
      </div>
    </div>
  );
}
