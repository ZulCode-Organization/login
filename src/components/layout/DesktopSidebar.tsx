"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    href: "/home", label: "Jornada",
    icon: (a: boolean) => (
      <svg className="h-5 w-5" fill={a ? "currentColor" : "none"} stroke={a ? "none" : "currentColor"} viewBox="0 0 24 24">
        <path d="M3 13h1v7c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-7h1a1 1 0 0 0 .707-1.707l-9-9a.999.999 0 0 0-1.414 0l-9 9A1 1 0 0 0 3 13zm7 7v-5h4v5h-4zm2-15.586 6 6V15H6v-4.586l6-6z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={a ? 0 : 1.8} />
      </svg>
    ),
  },
  {
    href: "/atividade", label: "Desafio Diário",
    icon: (a: boolean) => (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={a ? 2.5 : 1.8} />
      </svg>
    ),
  },
  {
    href: "#", label: "Metas",
    icon: (a: boolean) => (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" strokeLinecap="round" strokeLinejoin="round" strokeWidth={a ? 2.5 : 1.8} />
        <circle cx="12" cy="12" r="4" strokeLinecap="round" strokeLinejoin="round" strokeWidth={a ? 2.5 : 1.8} />
        <circle cx="12" cy="12" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    href: "#", label: "Tabela de Líderes",
    icon: (a: boolean) => (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M8 21h8M12 21v-4M7 4v6a5 5 0 0010 0V4M4 4h16" strokeLinecap="round" strokeLinejoin="round" strokeWidth={a ? 2.5 : 1.8} />
      </svg>
    ),
  },
  {
    href: "/loja", label: "Loja",
    icon: (a: boolean) => (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={a ? 2.5 : 1.8} />
      </svg>
    ),
  },
  {
    href: "/perfil", label: "Perfil",
    icon: (a: boolean) => (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={a ? 2.5 : 1.8} />
      </svg>
    ),
  },
  {
    href: "#", label: "Mais",
    icon: (a: boolean) => (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={a ? 2.5 : 1.8} />
      </svg>
    ),
  },
];

export default function DesktopSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 xl:w-64 flex flex-col flex-shrink-0 border-r border-zul-border overflow-y-auto">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-zul-border">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-zul-blue rounded-lg flex items-center justify-center font-bold text-white shadow-neon-blue">
            Z
          </div>
          <span className="text-lg font-black tracking-tight">ZulCode</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm font-semibold
                ${active
                  ? "bg-zul-blue/15 text-zul-blue"
                  : "text-gray-400 hover:text-white hover:bg-zul-surface"
                }`}
            >
              {item.icon(active)}
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Usuário */}
      <div className="px-4 py-4 border-t border-zul-border">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-xl bg-zul-blue flex items-center justify-center font-black text-xs text-white flex-shrink-0">
            VM
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold truncate">Vitor Moreira</p>
            <p className="text-[10px] text-gray-500">20 XP</p>
          </div>
        </div>
        <div className="w-full h-1.5 bg-zul-dark rounded-full overflow-hidden">
          <div className="bg-zul-blue h-full rounded-full" style={{ width: "21%" }} />
        </div>
      </div>
    </aside>
  );
}
