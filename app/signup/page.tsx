"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/icon-only.png";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useRedirectIfAuth } from "@/hooks/useAuthGuard";

export default function SignupPage() {
  useRedirectIfAuth(); 
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");
    setLoading(true);

    try {
      // 1. Cria a conta
      const signupRes = await fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: nome, email, password: senha }),
      });

      const signupData = await signupRes.json();

      if (!signupRes.ok) {
        setError(signupData.message ?? "Erro ao criar conta");
        return;
      }

      // 2. Loga automaticamente após o cadastro
      const signinRes = await fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: senha }),
      });

      const signinData = await signinRes.json();

      if (!signinRes.ok) {
        // Conta criada mas login falhou — manda pro login manual
        router.push("/login");
        return;
      }

      localStorage.setItem("accessToken", signinData.accessToken);
      router.push("/nivelamento");
    } catch {
      setError("Erro ao conectar com o servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zul-dark flex flex-col items-center justify-center px-5 py-10">
      <div className="flex flex-col items-center mb-10 gap-3">
        <div className="w-16 h-16 relative flex items-center justify-center">
          <Image src={logo} alt="Logo" width={64} height={64} className="object-contain rounded-2xl" />
        </div>
        <h1 className="text-2xl font-black tracking-tight">ZulCode</h1>
        <p className="text-gray-500 text-sm text-center">Aprenda programação de forma gamificada</p>
      </div>

      <div className="w-full max-w-sm bg-zul-surface border border-zul-border rounded-2xl p-6 shadow-2xl">
        <h2 className="text-xl font-bold mb-6 text-center">Criar nova conta</h2>

        <div className="flex flex-col gap-4">
          <Input label="Nome completo" type="text" placeholder="Seu nome" value={nome} onChange={(e) => setNome(e.target.value)}
            icon={<svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} /></svg>}
          />
          <Input label="E-mail" type="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)}
            icon={<svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} /></svg>}
          />
          <Input label="Senha" type="password" placeholder="••••••••" value={senha} onChange={(e) => setSenha(e.target.value)}
            icon={<svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} /></svg>}
          />

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <Button variant="primary" size="lg" fullWidth onClick={handleSubmit} disabled={loading} className="mt-2 uppercase tracking-wider">
            {loading ? "Criando conta..." : "Criar conta"}
          </Button>
        </div>

        <p className="mt-8 text-center text-sm text-gray-400">
          Já tem uma conta?{" "}
          <Link href="/login" className="text-zul-blue font-bold hover:underline">Entrar</Link>
        </p>
      </div>

      <p className="mt-6 text-xs text-gray-600 text-center">
        Ao continuar, você concorda com nossos{" "}
        <span className="text-zul-blue cursor-pointer hover:underline">Termos de Uso</span>
      </p>
    </div>
  );
}