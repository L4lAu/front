//PAGINA 404

import Link from 'next/link';

// Componente SVG da Coruja Confusa
const ConfusedOwl = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 200 200"
    className="w-48 h-48 md:w-56 md:h-56 mb-8"
    // A animação é aplicada diretamente aqui via 'style'
    style={{ animation: 'float 4s ease-in-out infinite' }}
    aria-labelledby="owl-title"
    role="img"
  >
    <title id="owl-title">Ilustração de uma coruja confusa</title>
    {/* Corpo */}
    <path fill="#556b2f" d="M100 170c-35 0-65-30-65-65s30-65 65-65 65 30 65 65-30 65-65 65z" />
    <path fill="#fff6e0" d="M100 165c-32 0-60-28-60-60s28-60 60-60 60 28 60 60-28 60-60 60z" />

    {/* Olhos e Óculos */}
    <g fill="#556b2f">
      {/* Olho Esquerdo */}
      <circle cx="75" cy="90" r="20" />
      <circle fill="#fff6e0" cx="75" cy="90" r="18" />
      <circle cx="72" cy="93" r="7" />
      {/* Olho Direito */}
      <circle cx="125" cy="90" r="20" />
      <circle fill="#fff6e0" cx="125" cy="90" r="18" />
      <circle cx="128" cy="93" r="7" />
      {/* Ponte dos óculos */}
      <path d="M95 90h10" stroke="#556b2f" strokeWidth="3" strokeLinecap="round" />
    </g>

    {/* Bico */}
    <path fill="#556b2f" d="M95 110l5 8 5-8h-10z" />

    {/* Orelhas/Penas */}
    <g fill="#556b2f">
      <path d="M60 55q5-15 20-15" stroke="#556b2f" strokeWidth="8" strokeLinecap="round" fill="none" />
      <path d="M140 55q-5-15-20-15" stroke="#556b2f" strokeWidth="8" strokeLinecap="round" fill="none" />
    </g>

    {/* Asa Esquerda */}
    <path fill="#556b2f" d="M40 120c-10-5-10-15 0-20 15 0 20 20 0 35-5-5-5-10 0-15z" />
    {/* Asa Direita */}
    <path fill="#556b2f" d="M160 120c10-5 10-15 0-20-15 0-20 20 0 35 5-5 5-10 0-15z" />
  </svg>
);


export default function NotFound() {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center bg-[#fff6e0] text-[#556b2f] p-8 text-center"

      style={{ fontFamily: "'Nunito', sans-serif" }}
    >
      {/*
     
      */}
      <style>
        {`
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-15px);
            }
          }
        `}
      </style>

      <ConfusedOwl />

      <h1 className="text-6xl md:text-8xl font-extrabold -mt-8 mb-2" style={{ textShadow: '3px 3px 0px #d8c8a8' }}>
        404
      </h1>

      <h2 className="text-2xl md:text-3xl font-bold mb-4">
        Oops! Página não encontrada.
      </h2>

      <p className="max-w-md text-lg" style={{ color: '#4a5568'  }}>
        Parece que você pegou um atalho para o lugar errado, Não se preocupe, vamos te ajudar a encontrar o caminho de volta!
      </p>

      <Link
        href="/"
        className="mt-8 px-8 py-3 bg-[#556b2f] text-[#fff6e0] font-semibold rounded-lg shadow-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105"
      >
        Voltar para a Página Inicial
      </Link>
    </main>
  );
}