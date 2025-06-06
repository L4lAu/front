'use client';

//importação de módulos
import { useState } from 'react';
import Link from "next/link";
import { useParams, useRouter } from 'next/navigation';

export default function LoginPage() {
  const { tipo } = useParams()
  const router = useRouter();
  const isProfessor = tipo === "professor";

  const [login, setLogin] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')

  //
  async function handleSubmit(e) {
    e.preventDefault();
    setErro('');
    
    try {
      const endpoint = tipo === 'professor' ? '/api/professor-login/route.js' : '/api/login';

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          tipo === 'professor'
            ? { rg: login, senha }
            : { ra: login, senha }
        )
      });
      const data = await res.json();

      if (res.ok) {
        router.push(`/Aluno/${login}`);
      } else {
        setErro(data.erro);
      }
    } catch (err) {
      setErro('Erro ao conectar com o servidor.');
    }
  }



  return (
    <main
      className="relative flex min-h-screen items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/school-bg.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <section className="relative z-10 w-[92%] max-w-md rounded-md  border-indigo-600/80 bg-[#8f4f3ce6] p-6 text-white shadow-xl md:p-8">
        <header className="mb-6 text-center">
          <img src='/etvMaior.png' />
          <p>Faça seu login como {isProfessor ? 'professor' : 'aluno'} abaixo:</p>

        </header>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <label className="block">
            <span className="text-xs font-bold uppercase tracking-wider text-white/90">
              Digite seu {isProfessor ? 'RG' : 'RA'}:
            </span>
            <input
              type="text"
              name={isProfessor ? 'rg' : 'ra'}
              placeholder={isProfessor ? 'RG' : 'RA'}
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              className="mt-2 w-full rounded-full bg-[#f3e7d7] px-4 py-2 text-[15px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            />
          </label>

          <label className="block">
            <span className="text-xs font-bold uppercase tracking-wider text-white/90">
              Digite a Senha:
            </span>
            <input
              type="password"
              name="password"
              placeholder="SENHA"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="mt-2 w-full rounded-full bg-[#f3e7d7] px-4 py-2 text-[15px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            />
          </label>

          {erro && <p className="text-red-400 text-sm font-semibold">{erro}</p>}

          <div className="flex flex-wrap items-center justify-between text-xs font-medium text-white/90">
            <Link href="/forgot-password" className="hover:underline">
              Esqueceu a Senha
            </Link>
            <Link href="/terms" className="hover:underline">
              Termos de Uso
            </Link>
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-[#f3deb7] py-2 font-bold uppercase tracking-wider text-[#8f4f3ce6] transition-colors hover:bg-[#556b32] hover:text-white"
          >
            Entrar
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <Link href={isProfessor ? "/login/aluno" : "/login/professor"} className="text-[#f3e7d7] underline hover:font-bold">
            {isProfessor ? "Sou um Aluno" : "Sou um Professor/Adiministrador"}
          </Link>
        </div>
      </section>
    </main>
  );
}
