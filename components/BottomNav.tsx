"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    label: "Jornada",
    href: "/home",
    icon: (active: boolean) => (
      <svg className="h-6 w-6" fill={active ? "currentColor" : "none"} stroke={active ? "none" : "currentColor"} viewBox="0 0 24 24">
        <path d="M3 13h1v7c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-7h1a1 1 0 0 0 .707-1.707l-9-9a.999.999 0 0 0-1.414 0l-9 9A1 1 0 0 0 3 13zm7 7v-5h4v5h-4zm2-15.586 6 6V15H6v-4.586l6-6z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 0 : 2} />
      </svg>
    ),
  },
  {
    label: "Desafio",
    href: "/atividade",
    icon: (active: boolean) => (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2.5 : 2} />
      </svg>
    ),
  },
  {
    label: "Loja",
    href: "/loja",
    icon: (active: boolean) => (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2.5 : 2} />
      </svg>
    ),
  },
  {
    label: "Perfil",
    href: "/perfil",
    icon: (active: boolean) => (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2.5 : 2} />
      </svg>
    ),
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-zul-dark/95 backdrop-blur-md border-t border-zul-border flex justify-around items-center py-3 safe-area-bottom z-50">
      {navItems.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 transition-colors ${active ? "text-zul-blue" : "text-gray-500 hover:text-gray-300"}`}
          >
            {item.icon(active)}
            <span className="text-[10px] font-bold uppercase">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
