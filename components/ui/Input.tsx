"use client";

import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
}

export default function Input({ label, icon, className = "", ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
            {icon}
          </div>
        )}
        <input
          className={`w-full bg-[#1c1f2e] border border-zul-border rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-zul-blue focus:ring-1 focus:ring-zul-blue transition-colors text-sm ${icon ? "pl-11" : ""} ${className}`}
          {...props}
        />
      </div>
    </div>
  );
}
