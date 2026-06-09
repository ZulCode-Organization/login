"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "@/assets/icon-only.png";

const navItems = [
// ... rest of items
  {
    href: "/home", label: "Jornada",
    icon: (a: boolean) => (
      <svg className="h-5 w-5" fill={a ? "currentColor" : "none"} stroke={a ? "none" : "currentColor"} viewBox="0 0 24 24">
        <path d="M3 13h1v7c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-7h1a1 1 0 0 0 .707-1.707l-9-9a.999.999 0 0 0-1.414 0l-9 9A1 1 0 0 0 3 13zm7 7v-5h4v5h-4zm2-15.586 6 6V15H6v-4.586l6-6z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={a ? 0 : 1.8} />
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
];

export default function DesktopSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 xl:w-64 flex flex-col flex-shrink-0 border-r border-zul-border overflow-y-auto">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-zul-border">
        <div className="flex items-center gap-2.5">
          <Image 
            src={logo} 
            alt="ZulCode Logo" 
            width={32} 
            height={32} 
            className="rounded-lg object-contain"
          />
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
