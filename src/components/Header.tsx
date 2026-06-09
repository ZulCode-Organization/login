"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import initialUserData from "@/data/user.json";

interface HeaderProps {
  showBack?: boolean;
  title?: string;
}

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

export default function Header({ showBack = false, title }: HeaderProps) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem("zul_user_data");
    if (saved) {
      setUser(JSON.parse(saved));
    } else {
      setUser(initialUserData.u1);
    }
  }, []);

  return (
    <header className="sticky top-0 z-[60] bg-zul-dark/90 backdrop-blur-md border-b border-zul-border px-4 py-2.5 flex items-center justify-between min-h-[64px]">
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

      {!showBack && user && (
        <div className="flex items-center gap-3">
           <div className="flex items-center gap-1.5 px-2 py-1 rounded-xl bg-zul-surface/50 border border-zul-border/50">
             <FlameIcon className="w-4 h-4 text-orange-400" />
             <span className="text-xs font-black">{user.stats.streak}</span>
           </div>
           <div className="flex items-center gap-1.5 px-2 py-1 rounded-xl bg-zul-surface/50 border border-zul-border/50">
             <span className="text-sm leading-none">🪙</span>
             <span className="text-xs font-black">{user.coins}</span>
           </div>
           <div className="flex items-center gap-1.5 px-2 py-1 rounded-xl bg-zul-surface/50 border border-zul-border/50">
             <HeartIcon className="w-4 h-4 text-red-500" />
             <span className="text-xs font-black">{user.hearts || 5}</span>
           </div>
        </div>
      )}

      {showBack && (
        <Link href="/perfil" className="w-9 h-9 rounded-full bg-zul-surface border border-zul-border flex items-center justify-center overflow-hidden hover:border-zul-blue transition-colors">
          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
          </svg>
        </Link>
      )}
    </header>
  );
}

