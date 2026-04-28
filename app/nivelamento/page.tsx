"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import {
  origens,
  expectativas,
  linguagens,
  perguntasPorLinguagem,
  calcularNivel,
  resultados,
} from "./data";

type Fase = "origem" | "expectativa" | "linguagem" | "quiz" | "resultado";

// ── Ícones de origens ─────────────────────────────────────────────────────────

const IconAmigo = () => (
  <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="9" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconTikTok = () => (
  <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.2 8.2 0 004.79 1.53V6.77a4.84 4.84 0 01-1.02-.08z" />
  </svg>
);

const IconInstagram = () => (
  <svg className="h-7 w-7 text-pink-400" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const IconYouTube = () => (
  <svg className="h-7 w-7 text-red-500" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const IconGoogle = () => (
  <svg className="h-7 w-7" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

const IconTwitterX = () => (
  <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const IconLinkedIn = () => (
  <svg className="h-7 w-7 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const IconOutro = () => (
  <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ── Ícones de expectativas ────────────────────────────────────────────────────

const IconEmprego = () => (
  <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconAprender = () => (
  <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconMelhorar = () => (
  <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconProjeto = () => (
  <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconCarreira = () => (
  <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconHobby = () => (
  <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ── Ícones de linguagens ──────────────────────────────────────────────────────

const IconJS = () => (
  <svg className="h-9 w-9" viewBox="0 0 24 24">
    <rect width="24" height="24" rx="3" fill="#F7DF1E" />
    <path fill="#323330" d="M7 17.5l1.4-.85c.28.5.53.92 1.13.92.58 0 .95-.23.95-1.12V11h1.72v5.49c0 1.84-1.08 2.68-2.65 2.68-1.42 0-2.25-.74-2.55-1.67zM13.5 17.3l1.4-.82c.37.6.85 1.04 1.7 1.04.71 0 1.16-.36 1.16-.85 0-.59-.46-.8-1.24-1.14l-.43-.18c-1.23-.53-2.05-1.19-2.05-2.59 0-1.29.98-2.27 2.51-2.27 1.09 0 1.87.38 2.43 1.37l-1.33.85c-.29-.52-.61-.73-1.1-.73-.5 0-.82.31-.82.73 0 .51.32.72 1.06 1.04l.43.18c1.44.62 2.27 1.25 2.27 2.67 0 1.53-1.2 2.39-2.81 2.39-1.58 0-2.6-.75-3.09-1.73z" />
  </svg>
);

const IconPython = () => (
  <svg className="h-9 w-9" viewBox="0 0 24 24">
    <path d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.007 2.752h5.814v.826H3.9S0 5.789 0 11.969c0 6.18 3.403 5.963 3.403 5.963h2.031v-2.867s-.109-3.403 3.347-3.403h5.765s3.24.052 3.24-3.13V3.13S18.28 0 11.914 0zm-3.21 1.81a1.031 1.031 0 110 2.063 1.031 1.031 0 010-2.063z" fill="#3776AB" />
    <path d="M12.087 24c6.094 0 5.714-2.656 5.714-2.656l-.007-2.752h-5.814v-.826h8.12S24 18.21 24 12.031c0-6.18-3.403-5.963-3.403-5.963h-2.031v2.867s.109 3.403-3.347 3.403H9.454s-3.24-.052-3.24 3.13V20.87S5.72 24 12.087 24zm3.21-1.81a1.031 1.031 0 110-2.063 1.031 1.031 0 010 2.063z" fill="#FFD43B" />
  </svg>
);

const IconHTMLCSS = () => (
  <svg className="h-9 w-9" viewBox="0 0 24 24">
    <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" fill="#E34F26" />
  </svg>
);

const IconJava = () => (
  <svg className="h-9 w-9" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0-.001-8.216 2.051-4.292 6.573M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.82M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.561.123 5.77-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.986.623-10.522-.568 2.082-1.006 3.776-.892 3.776-.892M17.116 17.584c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0-.001.07-.062.09-.118M14.401 0s2.494 2.494-2.365 6.33c-3.896 3.077-.888 4.832-.001 6.836-2.274-2.053-3.943-3.858-2.824-5.539 1.644-2.469 6.197-3.665 5.19-7.627M9.734 23.924c4.322.277 10.959-.153 11.116-2.198 0 0-.302.775-3.572 1.391-3.688.694-8.239.613-10.937.168 0-.001.553.457 3.393.639" fill="#E76F00" />
  </svg>
);

const IconTS = () => (
  <svg className="h-9 w-9" viewBox="0 0 24 24">
    <rect width="24" height="24" rx="3" fill="#3178C6" />
    <path fill="#fff" d="M13.11 15.574v1.692c.271.141.593.247.966.318.373.071.768.107 1.187.107.41 0 .8-.043 1.168-.13.368-.087.691-.231.97-.433.279-.202.499-.468.66-.797.162-.33.242-.732.242-1.208 0-.33-.046-.62-.138-.868a2.245 2.245 0 00-.42-.666 3.14 3.14 0 00-.666-.527 7.597 7.597 0 00-.882-.44 9.61 9.61 0 01-.617-.285 2.34 2.34 0 01-.421-.28.994.994 0 01-.237-.32.923.923 0 01-.074-.375c0-.131.028-.249.083-.353.055-.104.134-.194.237-.27.103-.076.227-.135.371-.177.144-.042.305-.063.483-.063.13 0 .264.01.4.031.137.02.27.053.374.09.12.039.232.086.337.142.105.056.196.116.272.18V11.48a5.268 5.268 0 00-.85-.21 6.003 6.003 0 00-1.008-.08c-.406 0-.79.047-1.151.14-.362.093-.681.237-.958.432-.277.195-.497.443-.659.744-.162.301-.243.66-.243 1.077 0 .534.147.986.44 1.355.293.369.748.686 1.367.953.237.1.45.2.636.296.187.097.345.199.474.306.129.107.228.224.296.35a.87.87 0 01.103.421c0 .124-.025.24-.074.346a.738.738 0 01-.218.271 1.044 1.044 0 01-.362.177 1.69 1.69 0 01-.497.065c-.348 0-.685-.063-1.01-.189a3.532 3.532 0 01-.888-.508zM10.5 11.476H13V10H6v1.476h2.5v6.524H10.5v-6.524z" />
  </svg>
);

const IconKotlin = () => (
  <svg className="h-9 w-9" viewBox="0 0 24 24">
    <rect width="24" height="24" rx="3" fill="#7F52FF" />
    <path fill="white" d="M4 4h8L4 12.5V20h.01L12 12l8 8H4V4zm16 0l-8 8 8 8V4z" />
  </svg>
);

// ── Mapas de ícones ───────────────────────────────────────────────────────────

const origenIcons: Record<string, () => JSX.Element> = {
  amigo:    IconAmigo,
  tiktok:   IconTikTok,
  instagram:IconInstagram,
  youtube:  IconYouTube,
  google:   IconGoogle,
  twitter:  IconTwitterX,
  linkedin: IconLinkedIn,
  outro:    IconOutro,
};

const expectativaIcons: Record<string, () => JSX.Element> = {
  emprego:  IconEmprego,
  aprender: IconAprender,
  melhorar: IconMelhorar,
  projeto:  IconProjeto,
  carreira: IconCarreira,
  hobby:    IconHobby,
};

const linguagemIcons: Record<string, () => JSX.Element> = {
  javascript: IconJS,
  python:     IconPython,
  html_css:   IconHTMLCSS,
  java:       IconJava,
  typescript: IconTS,
  kotlin:     IconKotlin,
};

// ── Componente principal ──────────────────────────────────────────────────────

export default function NivelamentoPage() {
  const router = useRouter();

  const [fase, setFase] = useState<Fase>("origem");
  const [origemSelecionada, setOrigemSelecionada] = useState<string | null>(null);
  const [expectativaSelecionada, setExpectativaSelecionada] = useState<string | null>(null);
  const [linguagemSelecionada, setLinguagemSelecionada] = useState<string | null>(null);

  const [quizAtual, setQuizAtual] = useState(0);
  const [selecionado, setSelecionado] = useState<number | null>(null);
  const [confirmado, setConfirmado] = useState(false);
  const [acertos, setAcertos] = useState(0);

  const totalFases = 4;
  const faseNumero: Record<Fase, number> = {
    origem: 1, expectativa: 2, linguagem: 3, quiz: 4, resultado: 4,
  };

  const perguntas = linguagemSelecionada ? perguntasPorLinguagem[linguagemSelecionada] ?? [] : [];
  const perguntaAtual = perguntas[quizAtual];
  const progressoQuiz = perguntas.length > 0 ? (quizAtual / perguntas.length) * 100 : 0;

  function handleConfirmarQuiz() {
    if (selecionado === null) return;
    setConfirmado(true);
    if (selecionado === perguntaAtual.correta) setAcertos((a) => a + 1);
  }

  function handleProximaQuiz() {
    if (quizAtual + 1 >= perguntas.length) {
      setFase("resultado");
    } else {
      setQuizAtual((a) => a + 1);
      setSelecionado(null);
      setConfirmado(false);
    }
  }

  // ─── Cabeçalho com progresso ────────────────────────────────────────────────
  function StepHeader({ titulo, subtitulo }: { titulo: string; subtitulo?: string }) {
    const num = faseNumero[fase];
    return (
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 bg-zul-blue rounded-lg flex items-center justify-center font-bold shadow-neon-blue text-sm">
            Z
          </div>
          <span className="font-bold text-lg">ZulCode</span>
        </div>
        <div className="flex justify-between items-end mb-2">
          <h2 className="text-zul-blue font-bold text-xs tracking-wider uppercase">
            {fase === "quiz" ? "Avaliação de Nível" : "Configuração do Perfil"}
          </h2>
          <span className="text-xs text-gray-500">
            {fase === "quiz" ? `Pergunta ${quizAtual + 1}/${perguntas.length}` : `Passo ${num} de ${totalFases}`}
          </span>
        </div>
        <div className="w-full h-2 bg-zul-surface rounded-full overflow-hidden border border-zul-border">
          <div
            className="h-full bg-zul-blue rounded-full transition-all duration-500"
            style={{ width: fase === "quiz" ? `${progressoQuiz}%` : `${(num / totalFases) * 100}%` }}
          />
        </div>
        <div className="mt-5">
          <h3 className="text-xl font-black leading-snug">{titulo}</h3>
          {subtitulo && <p className="text-gray-500 text-sm mt-1">{subtitulo}</p>}
        </div>
      </div>
    );
  }

  // ─── Fase 1: Como conheceu ───────────────────────────────────────────────────
  if (fase === "origem") {
    return (
      <div className="min-h-screen bg-zul-dark flex flex-col px-5 py-6 max-w-md mx-auto w-full">
        <StepHeader titulo="Como você conheceu o ZulCode?" subtitulo="Selecione uma opção abaixo" />
        <div className="grid grid-cols-2 gap-3 flex-1">
          {origens.map((o) => {
            const ativo = origemSelecionada === o.id;
            const Icon = origenIcons[o.id];
            return (
              <button
                key={o.id}
                onClick={() => setOrigemSelecionada(o.id)}
                className={`flex flex-col items-center justify-center gap-2.5 py-5 px-3 rounded-2xl border transition-all
                  ${ativo ? "border-zul-blue bg-zul-blue/10 shadow-neon-blue" : "border-zul-border bg-zul-surface hover:border-zul-blue/50"}`}
              >
                <div className={ativo ? "text-white" : "text-gray-400"}>
                  <Icon />
                </div>
                <span className="text-xs font-semibold text-center leading-tight">{o.label}</span>
              </button>
            );
          })}
        </div>
        <div className="mt-5">
          <Button variant="primary" size="lg" fullWidth disabled={!origemSelecionada} onClick={() => setFase("expectativa")}
            className={`uppercase tracking-wider ${!origemSelecionada ? "opacity-40 cursor-not-allowed" : ""}`}>
            Continuar →
          </Button>
        </div>
      </div>
    );
  }

  // ─── Fase 2: Expectativa ────────────────────────────────────────────────────
  if (fase === "expectativa") {
    return (
      <div className="min-h-screen bg-zul-dark flex flex-col px-5 py-6 max-w-md mx-auto w-full">
        <StepHeader titulo="O que você espera ao usar o ZulCode?" subtitulo="Selecione o que mais combina com você" />
        <div className="flex flex-col gap-3 flex-1">
          {expectativas.map((e) => {
            const ativo = expectativaSelecionada === e.id;
            const Icon = expectativaIcons[e.id];
            return (
              <button
                key={e.id}
                onClick={() => setExpectativaSelecionada(e.id)}
                className={`flex items-center gap-4 py-4 px-5 rounded-2xl border text-left transition-all
                  ${ativo ? "border-zul-blue bg-zul-blue/10 shadow-neon-blue" : "border-zul-border bg-zul-surface hover:border-zul-blue/50"}`}
              >
                <div className={`flex-shrink-0 ${ativo ? "text-zul-blue" : "text-gray-400"}`}>
                  <Icon />
                </div>
                <span className="text-sm font-semibold leading-snug flex-1">{e.label}</span>
                <div className={`ml-auto w-5 h-5 rounded-full border-2 flex-shrink-0 transition-all ${ativo ? "border-zul-blue bg-zul-blue" : "border-zul-border"}`}>
                  {ativo && (
                    <svg className="w-full h-full p-0.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} />
                    </svg>
                  )}
                </div>
              </button>
            );
          })}
        </div>
        <div className="mt-5 flex gap-3">
          <Button variant="ghost" size="lg" onClick={() => setFase("origem")} className="w-24">← Voltar</Button>
          <Button variant="primary" size="lg" fullWidth disabled={!expectativaSelecionada} onClick={() => setFase("linguagem")}
            className={`uppercase tracking-wider ${!expectativaSelecionada ? "opacity-40 cursor-not-allowed" : ""}`}>
            Continuar →
          </Button>
        </div>
      </div>
    );
  }

  // ─── Fase 3: Escolha de linguagem ────────────────────────────────────────────
  if (fase === "linguagem") {
    return (
      <div className="min-h-screen bg-zul-dark flex flex-col px-5 py-6 max-w-md mx-auto w-full">
        <StepHeader titulo="Qual linguagem você quer aprender?" subtitulo="Escolha sua primeira linguagem" />
        <div className="grid grid-cols-2 gap-3 flex-1">
          {linguagens.map((l) => {
            const ativo = linguagemSelecionada === l.id;
            const Icon = linguagemIcons[l.id];
            return (
              <button
                key={l.id}
                onClick={() => setLinguagemSelecionada(l.id)}
                className={`flex flex-col items-center justify-center gap-2 py-5 px-3 rounded-2xl border transition-all
                  ${ativo ? "border-zul-blue bg-zul-blue/10 shadow-neon-blue" : "border-zul-border bg-zul-surface hover:border-zul-blue/50"}`}
              >
                <Icon />
                <span className="text-sm font-bold">{l.label}</span>
                <span className="text-[11px] text-gray-500">{l.desc}</span>
              </button>
            );
          })}
        </div>
        <div className="mt-5 flex gap-3">
          <Button variant="ghost" size="lg" onClick={() => setFase("expectativa")} className="w-24">← Voltar</Button>
          <Button variant="primary" size="lg" fullWidth disabled={!linguagemSelecionada} onClick={() => setFase("quiz")}
            className={`uppercase tracking-wider ${!linguagemSelecionada ? "opacity-40 cursor-not-allowed" : ""}`}>
            Avaliar Nível →
          </Button>
        </div>
      </div>
    );
  }

  // ─── Fase 4: Quiz de nível ───────────────────────────────────────────────────
  if (fase === "quiz" && perguntaAtual) {
    return (
      <div className="min-h-screen bg-zul-dark flex flex-col px-5 py-6 max-w-md mx-auto w-full">
        <StepHeader titulo="" />
        <div className="bg-zul-surface border border-zul-border rounded-2xl p-5 shadow-xl flex-1">
          <div className="mb-6">
            <span className="text-[10px] font-bold text-gray-500 bg-zul-dark px-3 py-1 rounded-full border border-zul-border uppercase tracking-wider">
              {perguntaAtual.categoria}
            </span>
            <h3 className="text-lg font-bold mt-4 leading-snug">{perguntaAtual.pergunta}</h3>
          </div>
          <div className="flex flex-col gap-3">
            {perguntaAtual.opcoes.map((opcao, idx) => {
              let estilo = "border-zul-border bg-zul-dark";
              let circulo = "border-zul-border";
              if (confirmado) {
                if (idx === perguntaAtual.correta) { estilo = "border-green-500 bg-green-500/10"; circulo = "border-green-500 bg-green-500"; }
                else if (idx === selecionado) { estilo = "border-red-500 bg-red-500/10"; circulo = "border-red-500 bg-red-500"; }
              } else if (idx === selecionado) {
                estilo = "border-zul-blue bg-zul-blue/10"; circulo = "border-zul-blue bg-zul-blue";
              }
              return (
                <button key={idx} onClick={() => { if (!confirmado) setSelecionado(idx); }} disabled={confirmado}
                  className={`w-full py-4 px-5 text-left rounded-xl border ${estilo} hover:border-zul-blue transition-all flex justify-between items-center`}>
                  <span className="font-mono text-sm">{opcao}</span>
                  <div className={`w-5 h-5 rounded-full border-2 ${circulo} flex items-center justify-center flex-shrink-0`}>
                    {confirmado && idx === perguntaAtual.correta && (
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} />
                      </svg>
                    )}
                    {confirmado && idx === selecionado && idx !== perguntaAtual.correta && (
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} />
                      </svg>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        <div className="mt-4">
          {!confirmado ? (
            <Button variant="primary" size="lg" fullWidth onClick={handleConfirmarQuiz} disabled={selecionado === null}
              className={`uppercase tracking-wider ${selecionado === null ? "opacity-40 cursor-not-allowed" : ""}`}>
              Confirmar
            </Button>
          ) : (
            <Button variant="primary" size="lg" fullWidth onClick={handleProximaQuiz} className="uppercase tracking-wider">
              {quizAtual + 1 >= perguntas.length ? "Ver Resultado →" : "Próxima →"}
            </Button>
          )}
        </div>
      </div>
    );
  }

  // ─── Fase 5: Resultado ───────────────────────────────────────────────────────
  const nivel = calcularNivel(acertos, perguntas.length);
  const resultado = resultados[nivel];
  const LinguagemIcon = linguagemSelecionada ? linguagemIcons[linguagemSelecionada] : null;
  const linguagemInfo = linguagens.find((l) => l.id === linguagemSelecionada);

  return (
    <div className="min-h-screen bg-zul-dark flex flex-col items-center justify-center px-5">
      <div className="w-full max-w-sm text-center flex flex-col items-center gap-6">
        <div className="text-7xl">{resultado.emoji}</div>
        <div>
          <p className="text-gray-500 text-sm uppercase tracking-widest font-semibold mb-1">Seu nível é</p>
          <h2 className={`text-4xl font-black ${resultado.cor}`}>{resultado.titulo}</h2>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed">{resultado.descricao}</p>
        <div className="w-full bg-zul-surface border border-zul-border rounded-2xl p-4 flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-500 text-sm">Acertos</span>
            <span className="font-bold text-lg">{acertos}/{perguntas.length}</span>
          </div>
          {linguagemInfo && LinguagemIcon && (
            <div className="flex justify-between items-center border-t border-zul-border pt-3">
              <span className="text-gray-500 text-sm">Linguagem</span>
              <span className="font-bold text-sm flex items-center gap-2">
                <LinguagemIcon />
                {linguagemInfo.label}
              </span>
            </div>
          )}
        </div>
        <Button variant="primary" size="lg" fullWidth onClick={() => router.push("/home")} className="uppercase tracking-wider">
          Começar Jornada →
        </Button>
      </div>
    </div>
  );
}
