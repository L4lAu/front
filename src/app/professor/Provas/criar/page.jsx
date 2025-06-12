// src/app/provas/criar/page.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function CriarProva() {
  const router = useRouter();

  // 1) Estados do formulário
  const [nomeProva, setNomeProva] = useState('');
  const [numQuestoes, setNumQuestoes] = useState(1);
  const [idDisciplina, setIdDisciplina] = useState('');
  const [dataAplicacao, setDataAplicacao] = useState(
    new Date().toISOString().slice(0, 10)
  );

  // 2) Disciplinas carregadas da API
  const [disciplinas, setDisciplinas] = useState([]);

  // 3) Array de questões (cada elemento: { enunciado, alternativaA, ..., alternativaCorreta })
  const [questoes, setQuestoes] = useState([
    {
      enunciado: '',
      alternativaA: '',
      alternativaB: '',
      alternativaC: '',
      alternativaD: '',
      alternativaE: '',
      alternativaCorreta: 'A'
    }
  ]);

  // 4) Flag para “formulário sujo”
  const formDirty = useRef(false);

  // Carrega disciplinas ao montar
  useEffect(() => {
    async function fetchDisciplinas() {
      try {
        const resp = await fetch('/api/disciplinas');
        const data = await resp.json();
        if (Array.isArray(data.disciplinas)) {
          setDisciplinas(data.disciplinas);
        }
      } catch (err) {
        console.error('Erro ao buscar disciplinas:', err);
      }
    }
    fetchDisciplinas();
  }, []);

  // Ajusta array de questões quando numQuestoes muda
  useEffect(() => {
    const n = Number(numQuestoes);
    if (n < 1) return;

    setQuestoes((prev) => {
      const novo = [...prev];
      if (prev.length < n) {
        for (let i = prev.length; i < n; i++) {
          novo.push({
            enunciado: '',
            alternativaA: '',
            alternativaB: '',
            alternativaC: '',
            alternativaD: '',
            alternativaE: '',
            alternativaCorreta: 'A'
          });
        }
      } else if (prev.length > n) {
        novo.splice(n);
      }
      return novo;
    });
  }, [numQuestoes]);

  // Beforeunload: confirma ao tentar sair se o form estiver sujo
  useEffect(() => {
    function handleBeforeUnload(e) {
      if (formDirty.current) {
        e.preventDefault();
        e.returnValue = '';
      }
    }
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  function markDirty() {
    if (!formDirty.current) formDirty.current = true;
  }

  // Atualiza campo de uma questão específica
  function handleQuestaoChange(idx, campo, valor) {
    markDirty();
    setQuestoes((prev) => {
      const copia = [...prev];
      copia[idx] = { ...copia[idx], [campo]: valor };
      return copia;
    });
  }

  // Submit do formulário
  async function handleSubmit(e) {
    e.preventDefault();

    if (!nomeProva.trim() || !idDisciplina) {
      alert('Preencha o nome da prova e selecione a disciplina.');
      return;
    }
    if (questoes.some((q) => !q.enunciado.trim())) {
      alert('Todas as questões devem ter enunciado.');
      return;
    }

    const payload = {
      nomeProva,
      numQuestoes,
      idDisciplina,
      dataAplicacao,
      questoes
    };

    try {
      const resp = await fetch('/api/provas/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await resp.json();
      if (resp.status === 201) {
        formDirty.current = false;
        alert('Prova criada com sucesso! ID: ' + data.idProva);
        router.push('/provas'); // ajuste para a lista de provas
      } else {
        alert('Erro ao criar prova: ' + (data.error || JSON.stringify(data)));
      }
    } catch (err) {
      console.error(err);
      alert('Erro na requisição. Confira o console.');
    }
  }

  return (
    <div className="min-h-screen py-6 px-4">
      <h1 className="text-2xl font-bold text-black text-center mb-6">
        Criar Nova Prova
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-6 space-y-6"
      >
        {/* Nome da Prova */}
        <div>
          <label className="block mb-1 text-black font-medium">
            Nome da Prova
          </label>
          <input
            type="text"
            value={nomeProva}
            onChange={(e) => {
              setNomeProva(e.target.value);
              markDirty();
            }}
            className="w-full border border-green-700 rounded-md px-3 py-2 text-black focus:text-green-700 bg-white"
            placeholder="Digite o nome da prova"
          />
        </div>

        {/* Quantidade de Questões */}
        <div>
          <label className="block mb-1 text-black font-medium">
            Quantidade de Questões
          </label>
          <input
            type="number"
            min="1"
            value={numQuestoes}
            onChange={(e) => {
              setNumQuestoes(e.target.value);
              markDirty();
            }}
            className="w-24 border border-green-700 rounded-md px-3 py-2 focus:outline-none text-black focus:text-green-700 bg-white"
          />
        </div>

        {/* Disciplina */}
        <div>
          <label className="block mb-1 text-black font-medium">
            Selecionar Disciplina
          </label>
          <select
            value={idDisciplina}
            onChange={(e) => {
              setIdDisciplina(e.target.value);
              markDirty();
            }}
            className="w-full border border-green-700 rounded-md px-3 py-2 focus:outline-none text-black focus:text-green-700 bg-white bg-white"
          >
            <option value="">-- Selecione a Disciplina --</option>
            {disciplinas.map((d) => (
              <option key={d.idDisciplina} value={d.idDisciplina}>
                {d.nomeDisciplina}
              </option>
            ))}
          </select>
        </div>

        {/* Data de Aplicação */}
        <div>
          <label className="block mb-1 text-black font-medium">
            Data de Aplicação
          </label>
          <input
            type="date"
            value={dataAplicacao}
            onChange={(e) => {
              setDataAplicacao(e.target.value);
              markDirty();
            }}
            className="w-full border border-green-700 rounded-md px-3 py-2 focus:outline-none text-black focus:text-green-700 bg-white bg-white"
          />
        </div>

        <hr className="border-t border-green-700" />

        {/* Questões Dinâmicas */}
        <div className="space-y-8">
          {questoes.map((q, idx) => (
            <div
              key={idx}
              className="border border-green-700 rounded-md p-4 space-y-4"
            >
              <h2 className="text-lg font-semibold text-black">
                Questão {idx + 1}
              </h2>

              {/* Enunciado */}
              <div>
                <label className="block mb-1 text-black font-medium">
                  Enunciado
                </label>
                <textarea
                  value={q.enunciado}
                  onChange={(e) =>
                    handleQuestaoChange(idx, 'enunciado', e.target.value)
                  }
                  className="w-full text-black border border-green-700 rounded-md px-3 py-2 focus:outline-none focus:text-green-700"
                  rows={3}
                  placeholder="Digite o enunciado da questão"
                />
              </div>

              {/* Alternativas A a E */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {['A', 'B', 'C', 'D', 'E'].map((letra) => (
                  <div key={letra} className="flex flex-col">
                    <label className="mb-1 text-black font-medium">
                      Alternativa {letra}
                    </label>
                    <input
                      type="text"
                      value={q[`alternativa${letra}`]}
                      onChange={(e) =>
                        handleQuestaoChange(
                          idx,
                          `alternativa${letra}`,
                          e.target.value
                        )
                      }
                      className="border text-black border-green-700 rounded-md px-3 py-2 focus:outline-none focus:text-green-700 "
                      placeholder={`Texto da alternativa ${letra}`}
                    />
                  </div>
                ))}
              </div>

              {/* Alternativa correta */}
              <div>
                <label className="block mb-1 text-black font-medium">
                  Alternativa Correta
                </label>
                <select
                  value={q.alternativaCorreta}
                  onChange={(e) =>
                    handleQuestaoChange(idx, 'alternativaCorreta', e.target.value)
                  }
                  className="w-32 border  border-green-700 rounded-md px-3 py-2 focus:outline-none text-black focus:text-green-700 bg-white"
                >
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                </select>
              </div>
            </div>
          ))}
        </div>

        {/* Botão de Submeter */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-[#3f4f1f] hover:bg-[#3f4f1f] text-white font-semibold px-6 py-2 rounded-md transition-colors"
          >
            Criar Prova
          </button>
        </div>
      </form>
    </div>
  );
}
