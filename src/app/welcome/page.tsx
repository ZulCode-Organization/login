"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import logo from "@/assets/icon-only.png";

export default function WelcomePage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      router.replace("/home");
    }
  }, [router]);

  const handleLogin = () => {
    if (typeof window !== "undefined" && (window as any).electron) {
      (window as any).electron.openLogin();
    } else {
      window.location.href = "/login";
    }
  };

  const handleSignup = () => {
    if (typeof window !== "undefined" && (window as any).electron) {
      (window as any).electron.openSignup();
    } else {
      window.location.href = "/signup";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-zul-dark">
      <div className="flex flex-col items-center mb-16 gap-6">
        <div className="w-32 h-32 relative flex items-center justify-center animate-bounce">
          <Image src={logo} alt="Logo" width={128} height={128} className="object-contain rounded-3xl shadow-neon-blue-lg" />
        </div>
        <div>
          <h1 className="text-5xl font-black text-white mb-4 tracking-tight">ZulCode</h1>
          <p className="text-xl text-gray-400 font-medium max-w-xs mx-auto">
            A maneira divertida, eficaz e gratuita de aprender programação!
          </p>
        </div>
      </div>

      <div className="w-full max-w-sm space-y-4">
        <Button 
          onClick={handleSignup}
          className="w-full py-4 text-lg font-black bg-zul-blue hover:bg-zul-blue/90 border-b-4 border-blue-800 rounded-2xl transition-all active:border-b-0 active:translate-y-[2px]"
        >
          COMEÇAR AGORA
        </Button>
        <Button 
          onClick={handleLogin}
          variant="outline"
          className="w-full py-4 text-lg font-black border-2 border-zul-border hover:bg-zul-surface text-zul-blue rounded-2xl border-b-4 active:border-b-2 active:translate-y-[2px] transition-all"
        >
          JÁ TENHO UMA CONTA
        </Button>
      </div>
    </div>
  );
}
