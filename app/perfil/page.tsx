"use client";

import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import DesktopSidebar from "@/components/layout/DesktopSidebar";
import Card from "@/components/ui/Card";

// ── Ícones SVG ────────────────────────────────────────────────────────────────

const FlameIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
);

const BoltIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
);

const TrophyIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M8 21h8M12 21v-4M7 4v6a5 5 0 0010 0V4M4 4h16" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
);

const StarIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
);

const MonitorIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
);

const TrendingUpIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
);

const GearIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
);

const BellIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
);

const MoonIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
);

const LogOutIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
);

const ChevronIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
);

// ── Dados ─────────────────────────────────────────────────────────────────────

const conquistas = [
  { Icon: FlameIcon,     color: "text-orange-400 bg-orange-400/10 border-orange-400/30", label: "7 dias seguidos",  desbloqueada: true  },
  { Icon: BoltIcon,      color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30", label: "100 XP num dia",   desbloqueada: true  },
  { Icon: TrophyIcon,    color: "text-zul-blue   bg-zul-blue/10   border-zul-blue/30",   label: "1º Desafio",       desbloqueada: true  },
  { Icon: StarIcon,      color: "text-gray-400   bg-gray-400/10   border-gray-400/20",   label: "Nível 5",          desbloqueada: false },
  { Icon: MonitorIcon,   color: "text-gray-400   bg-gray-400/10   border-gray-400/20",   label: "10 Desafios",      desbloqueada: false },
  { Icon: TrendingUpIcon,color: "text-gray-400   bg-gray-400/10   border-gray-400/20",   label: "Avançado",         desbloqueada: false },
];

const stats = [
  { label: "Dias seguidos", value: "7",     Icon: FlameIcon,  color: "text-orange-400" },
  { label: "XP Total",      value: "1.250", Icon: BoltIcon,   color: "text-yellow-400" },
  { label: "Desafios",      value: "23",    Icon: TrophyIcon, color: "text-zul-blue"   },
  { label: "Nível",         value: "3",     Icon: StarIcon,   color: "text-purple-400" },
];

const configItems = [
  { Icon: GearIcon,   label: "Configurações", danger: false },
  { Icon: BellIcon,   label: "Notificações",  danger: false },
  { Icon: MoonIcon,   label: "Aparência",     danger: false },
  { Icon: LogOutIcon, label: "Sair",          danger: true  },
];

// ── Subcomponentes ────────────────────────────────────────────────────────────

function AvatarCard() {
  return (
    <div className="flex flex-col items-center gap-3 mb-6">
      <div className="relative">
        <div className="w-24 h-24 lg:w-28 lg:h-28 rounded-3xl bg-zul-blue shadow-neon-blue-lg flex items-center justify-center">
          <span className="text-3xl lg:text-4xl font-black text-white tracking-tight">VM</span>
        </div>
        <div className="absolute -bottom-2 -right-2 bg-zul-blue rounded-full px-2 py-0.5 text-xs font-black shadow-neon-blue">
          Nv.3
        </div>
      </div>
      <div className="text-center">
        <h2 className="text-xl font-black">Vitor Moreira</h2>
        <p className="text-gray-500 text-xs">moreira.r.vitor44@gmail.com</p>
        <span className="inline-block mt-1.5 bg-zul-surface border border-zul-border text-zul-blue text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          Intermediário
        </span>
      </div>
    </div>
  );
}

function XpBar() {
  return (
    <Card className="p-4 mb-4">
      <div className="flex justify-between mb-2">
        <span className="text-xs text-gray-400 font-semibold">Progresso para Nível 4</span>
        <span className="text-xs font-bold text-zul-blue">1250 / 2000 XP</span>
      </div>
      <div className="w-full h-3 bg-zul-dark rounded-full overflow-hidden">
        <div className="h-full bg-zul-blue rounded-full" style={{ width: "62.5%" }} />
      </div>
    </Card>
  );
}

function StatsGrid({ cols = 2 }: { cols?: 2 | 4 }) {
  return (
    <div className={`grid gap-3 mb-4 ${cols === 4 ? "grid-cols-4" : "grid-cols-2"}`}>
      {stats.map((s) => (
        <Card key={s.label} className="p-4 flex flex-col gap-1">
          <s.Icon className={`h-5 w-5 ${s.color}`} />
          <span className="text-2xl font-black mt-1">{s.value}</span>
          <span className="text-xs text-gray-500">{s.label}</span>
        </Card>
      ))}
    </div>
  );
}

function Conquistas() {
  return (
    <Card className="p-4 mb-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-base">Conquistas</h3>
        <span className="text-xs text-gray-500">3/6</span>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {conquistas.map((c) => (
          <div
            key={c.label}
            className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border ${c.desbloqueada ? c.color : "border-zul-border bg-zul-dark opacity-40"}`}
          >
            <c.Icon className={`h-6 w-6 ${c.desbloqueada ? "" : "text-gray-600"}`} />
            <span className="text-[9px] text-center text-gray-400 leading-tight">{c.label}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function ConfigPanel() {
  return (
    <Card className="divide-y divide-zul-border">
      {configItems.map((item) => (
        <button
          key={item.label}
          className={`w-full flex items-center gap-3 px-4 py-3.5 text-sm font-semibold transition-colors hover:bg-zul-dark ${item.danger ? "text-red-400" : "text-gray-300"}`}
        >
          <item.Icon className="h-5 w-5 flex-shrink-0" />
          <span>{item.label}</span>
          {!item.danger && <ChevronIcon className="h-4 w-4 text-gray-600 ml-auto" />}
        </button>
      ))}
    </Card>
  );
}

// ── Render ────────────────────────────────────────────────────────────────────

export default function PerfilPage() {
  return (
    <div className="min-h-screen bg-zul-dark">

      {/* ══════════════════════════════════════════════════════
          MOBILE  (< lg)
      ══════════════════════════════════════════════════════ */}
      <div className="flex flex-col min-h-screen lg:hidden">
        <Header />
        <main className="flex-1 pb-24 max-w-md mx-auto w-full px-4 pt-5">
          <AvatarCard />
          <XpBar />
          <StatsGrid cols={2} />
          <Conquistas />
          <ConfigPanel />
        </main>
        <BottomNav />
      </div>

      {/* ══════════════════════════════════════════════════════
          DESKTOP  (≥ lg)
      ══════════════════════════════════════════════════════ */}
      <div className="hidden lg:flex h-screen overflow-hidden">

        <DesktopSidebar />

        {/* ── Centro ── */}
        <main className="flex-1 overflow-y-auto px-8 py-8">
          <div className="max-w-2xl mx-auto">
            <AvatarCard />
            <XpBar />
            <StatsGrid cols={4} />
            <Conquistas />
          </div>
        </main>

        {/* ── Painel direito: configurações ── */}
        <aside className="w-72 xl:w-80 flex flex-col flex-shrink-0 border-l border-zul-border overflow-y-auto px-4 py-6 gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-gray-500 mb-3 px-1">Conta</p>
            <ConfigPanel />
          </div>

          {/* Streaks e conquistas rápidas */}
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-gray-500 mb-3 px-1">Destaques</p>
            <div className="flex flex-col gap-2">
              {conquistas.filter((c) => c.desbloqueada).map((c) => (
                <div key={c.label} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border ${c.color}`}>
                  <c.Icon className="h-5 w-5 flex-shrink-0" />
                  <span className="text-xs font-semibold">{c.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Streak atual */}
          <div className="mt-auto">
            <div className="bg-zul-surface border border-zul-border rounded-2xl p-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-400/10 border border-orange-400/30 rounded-2xl flex items-center justify-center flex-shrink-0">
                <FlameIcon className="h-6 w-6 text-orange-400" />
              </div>
              <div>
                <p className="text-lg font-black">7 dias</p>
                <p className="text-xs text-gray-500">sequência atual</p>
              </div>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}
