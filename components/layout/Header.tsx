import Link from "next/link";

interface HeaderProps {
  showBack?: boolean;
  title?: string;
}

export function Header({ showBack = false, title }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-zul-dark/90 backdrop-blur-md border-b border-zul-border px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {showBack ? (
          <Link href="/" className="w-9 h-9 rounded-xl bg-zul-surface border border-zul-border flex items-center justify-center text-zul-muted hover:text-white transition-colors">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
        ) : (
          <Link href="/home" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-zul-blue rounded-lg flex items-center justify-center font-bold text-white text-xl shadow-neon-blue">Z</div>
            <span className="text-xl font-bold tracking-tight">ZulCode</span>
          </Link>
        )}
        {title && <span className="text-base font-semibold text-white">{title}</span>}
      </div>
      <Link href="/perfil" className="w-10 h-10 rounded-full bg-zul-surface border border-zul-border flex items-center justify-center overflow-hidden hover:border-zul-blue transition-colors">
        <svg className="h-6 w-6 text-zul-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </Link>
    </header>
  );
}
