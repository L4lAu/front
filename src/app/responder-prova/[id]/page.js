'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

export default function ResponderProva() {
  const { id } = useParams()
  const [prova, setProva] = useState({
    nomeProva: 'Carregando...',
    questoes: []
  })
  const [respostas, setRespostas] = useState({})
  const [mensagem, setMensagem] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const carregarQuestoes = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`http://localhost:3000/aluno/questoes/${id}`)
        if (!response.ok) {
          const res = await response.json();
          throw new Error(res.mensagem || `Erro: ${response.status}`)
        }
        const dadosProva = await response.json()
        if (!dadosProva || !Array.isArray(dadosProva.questoes)) {
          throw new Error('Formato de dados da prova inválido')
        }
        setProva({
          nomeProva: dadosProva.nomeProva || `Prova ${dadosProva.idProva}`,
          questoes: dadosProva.questoes.map((q, index) => ({
            id: q.idQuestao || index,
            enunciado: q.enunciado || `Questão ${index + 1}`,
            alternativa_a: q.alternativaA || '',
            alternativa_b: q.alternativaB || '',
            alternativa_c: q.alternativaC || '',
            alternativa_d: q.alternativaD || '',
            alternativa_e: q.alternativaE || ''
          }))
        })
      } catch (error) {
        console.error('Erro ao carregar prova:', error)
        setMensagem(error.message)
      } finally {
        setIsLoading(false)
      }
    }
    if (id) carregarQuestoes()
  }, [id])

  const handleResposta = (idQuestao, alternativa) => {
    setRespostas(prev => ({ ...prev, [idQuestao]: alternativa }))
  }

  const enviarRespostas = async () => {
    const totalQuestoes = prova.questoes.length;
    const respondidas = Object.values(respostas).filter(r => r !== null).length;
    if (respondidas < totalQuestoes) {
      if (!confirm(`Você deixou ${totalQuestoes - respondidas} questão(ões) em branco. Deseja enviar mesmo assim?`)) {
        return;
      }
    }
    try {
      setMensagem('Enviando respostas...');
      const payload = {
        raAluno: '20251005', // Substitua pelo RA dinâmico do aluno logado
        idProva: parseInt(id),
        respostas: prova.questoes.map(questao => ({
          idQuestao: questao.id,
          alternativaMarcada: respostas[questao.id] || null
        }))
      };
      const response = await fetch(`http://localhost:3000/aluno/responder`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.mensagem || 'Erro ao enviar respostas.');
      }
      setMensagem(`✅ Respostas enviadas! Você acertou ${data.totalCorretas} de ${data.totalQuestoes} questões.`);
      document.querySelectorAll('input[type="radio"]').forEach(input => input.disabled = true);
      const sendButton = document.querySelector('#send-button');
      if (sendButton) {
          sendButton.disabled = true;
      }
    } catch (error) {
      console.error('Erro no envio:', error);
      setMensagem(`❌ ${error.message}`);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#f4deb5]">
        <div className="text-2xl font-semibold text-[#57371b]">Carregando prova...</div>
      </div>
    );
  }

  return (
    <div 
      className="relative min-h-screen text-[#57371b] p-4 sm:p-6 lg:p-8"
    >
      {/* Imagem de Fundo (fixa) */}
      <div 
        className="fixed inset-0 bg-cover bg-center -z-10" 
        style={{ backgroundImage: "url('/background-prova.jpg')" }}
      ></div>

      {/* Overlay/Filtro (fixo) */}
      <div className="fixed inset-0 bg-[#f4deb5]/30 backdrop-blur-sm -z-10"></div>
      
      {/* Conteúdo da Página */}
      <div className="max-w-4xl mx-auto bg-white/80 p-6 sm:p-8 rounded-2xl shadow-xl border border-[#57371b]/20">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 pb-4 border-b-2 border-[#556b2f]/30">
          {prova.nomeProva}
        </h1>

        {prova.questoes.length > 0 ? (
          <form onSubmit={(e) => { e.preventDefault(); enviarRespostas(); }} className="space-y-8">
            {prova.questoes.map((questao, index) => (
              <div key={questao.id || index} className="p-5 bg-white/80 rounded-lg shadow-md transition-shadow hover:shadow-lg">
                <p className="font-semibold text-lg mb-4">
                  <span className="bg-[#556b2f] text-white rounded-full h-8 w-8 inline-flex justify-center items-center mr-3 text-sm">{index + 1}</span>
                  {questao.enunciado}
                </p>
                <div className="mt-2 space-y-3">
                  {['a', 'b', 'c', 'd', 'e'].map(letra => (
                    questao[`alternativa_${letra}`] && (
                      <label 
                        key={letra} 
                        className={`block p-3 rounded-lg border-2 transition-all cursor-pointer 
                          ${respostas[questao.id] === letra.toUpperCase() 
                            ? 'border-[#556b2f] bg-[#556b2f]/10' 
                            : 'border-transparent hover:border-[#556b2f]/50'
                          }`}
                      >
                        <input
                          type="radio"
                          name={`questao-${questao.id || index}`}
                          value={letra.toUpperCase()}
                          checked={respostas[questao.id] === letra.toUpperCase()}
                          onChange={() => handleResposta(questao.id, letra.toUpperCase())}
                          className="w-4 h-4 mr-3 accent-[#556b2f]"
                        />
                        <span className="font-medium">{letra.toUpperCase()})</span> {questao[`alternativa_${letra}`]}
                      </label>
                    )
                  ))}
                </div>
              </div>
            ))}
            
            <div className="pt-6 border-t border-[#57371b]/20 text-center">
              <button
                id="send-button"
                type="submit"
                className="bg-[#556b2f] text-white font-bold text-lg px-8 py-3 rounded-lg shadow-md hover:bg-opacity-90 transition-all transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none"
                disabled={prova.questoes.length === 0 || mensagem.startsWith('✅')}
              >
                Enviar Respostas
              </button>
            </div>
            
          </form>
        ) : (
          <p className="text-center py-10 text-xl font-medium bg-white/50 rounded-lg shadow">
            {mensagem || 'Nenhuma questão disponível para esta prova.'}
          </p>
        )}
        
        {mensagem && !isLoading && (
          <p className={`mt-6 text-xl text-center font-bold p-4 rounded-lg
            ${mensagem.startsWith('✅') ? 'bg-green-100 text-green-800' : ''}
            ${mensagem.startsWith('❌') ? 'bg-red-100 text-red-800' : ''}
          `}>
            {mensagem}
          </p>
        )}
      </div>
    </div>
  )
}