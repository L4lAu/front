'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

export default function ResponderProva() {
  const { id } = useParams();
  const [prova, setProva] = useState(null);
  const [respostas, setRespostas] = useState({});
  const [mensagem, setMensagem] = useState('');

  const raAluno = '20251005'; // 🔒 Constante temporária até ter login com JWT

  useEffect(() => {
    const fetchProva = async () => {
      try {
        const res = await axios.get(`/api/provas/${id}`);
        setProva(res.data);
      } catch (error) {
        console.error('Erro ao buscar prova:', error);
        setMensagem('Erro ao carregar a prova.');
      }
    };

    if (id) fetchProva();
  }, [id]);

  const handleSelecionar = (idQuestao, alternativa) => {
    setRespostas(prev => ({
      ...prev,
      [idQuestao]: alternativa,
    }));
  };

  const enviarRespostas = async () => {
    try {
      const res = await axios.post(`/api/respostas`, {
        idProva: id,
        raAluno,
        respostas,
      });

      setMensagem(res.data.mensagem || 'Respostas enviadas com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar respostas:', error);
      setMensagem('Erro ao enviar respostas. Verifique se você já respondeu ou se há erro no servidor.');
    }
  };

  if (!prova) {
    return (
      <div className="p-6 text-center text-lg text-gray-700">
        Carregando prova...
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white border border-green-700">
      <h1 className="text-2xl font-bold mb-4 text-green-900">
        {prova.nomeProva}
      </h1>

      {prova.questoes.map((questao, index) => (
        <div key={questao.idQuestao} className="mb-6 p-2 border border-black">
          <p className="font-semibold mb-2 text-green-900">
            {index + 1}. {questao.enunciado}
          </p>
          <div className="flex flex-col gap-2 text-black">
            {['A', 'B', 'C', 'D', 'E'].map(opcao => (
              <label key={opcao} className="flex items-center gap-2">
                <input
                  type="radio"
                  name={`questao-${questao.idQuestao}`}
                  value={opcao}
                  checked={respostas[questao.idQuestao] === opcao}
                  onChange={() => handleSelecionar(questao.idQuestao, opcao)}
                />
                {questao[`alternativa${opcao}`]}
              </label>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={enviarRespostas}
        className="bg-[#3f4f1f] text-white px-6 py-2 rounded-md mt-4"
      >
        Enviar Respostas
      </button>

      {mensagem && (
        <p className="mt-4 text-center text-black font-semibold">
          {mensagem}
        </p>
      )}
    </div>
  );
}
