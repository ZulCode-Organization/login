"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// protege rotas que exigem login
export function useRequireAuth() {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) router.replace("/login");
  }, [router]);
}

// redireciona quem já está logado (usar no login/signup)
export function useRedirectIfAuth() {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) router.replace("/home");
  }, [router]);
}