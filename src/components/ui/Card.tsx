import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  glowOnHover?: boolean;
}

export default function Card({ children, className = "", glowOnHover = false }: CardProps) {
  return (
    <div
      className={`bg-zul-surface border border-zul-border rounded-2xl ${glowOnHover ? "hover:border-zul-blue hover:shadow-neon-blue transition-all" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
