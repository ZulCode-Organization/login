"use client";

import Link from "next/link";

interface HeaderProps {
  showBack?: boolean;
  title?: string;
}

export default function Header({ showBack = false, title }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-zul-dark/90 backdrop-blur-md border-b border-zul-border px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {showBack ? (
          <Link href="/home" className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
            </svg>
          </Link>
        ) : (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-zul-blue rounded-lg flex items-center justify-center font-bold text-white text-lg shadow-neon-blue">
              Z
            </div>
            <span className="text-xl font-bold tracking-tight">ZulCode</span>
          </div>
        )}
        {title && <h1 className="text-base font-bold">{title}</h1>}
      </div>
      <Link href="/perfil" className="w-10 h-10 rounded-full bg-zul-surface border border-zul-border flex items-center justify-center overflow-hidden hover:border-zul-blue transition-colors">
        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
        </svg>
      </Link>
    </header>
  );
}
