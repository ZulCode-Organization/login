"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  fullWidth?: boolean;
}

export default function Button({
  variant = "primary",
  size = "md",
  children,
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "font-bold rounded-xl transition-all active:scale-95 focus:outline-none flex items-center justify-center gap-2";

  const variants = {
    primary:
      "bg-zul-blue text-white shadow-neon-blue hover:brightness-110",
    secondary:
      "bg-zul-surface text-white border border-zul-border hover:border-zul-blue",
    ghost: "text-zul-blue hover:bg-zul-surface",
    outline:
      "border border-zul-border bg-zul-dark text-white hover:border-zul-blue",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-6 py-4 text-base",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
