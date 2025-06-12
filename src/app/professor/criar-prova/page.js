'use client'

import { useState, useEffect } from 'react'

export default function CriarProva() {
  const [nomeProva, setNomeProva] = useState('')
  const [idDisciplina, setIdDisciplina] = useState('')
  const [disciplinas, setDisciplinas] = useState([]) 
  const [isLoadingDisciplinas, setIsLoadingDisciplinas] = useState(true)
  const [qtdQuestoes, setQtdQuestoes] = useState(1)
  const [questoes, setQuestoes] = useState([])
  const [status, setStatus] = useState({ mensagem: '', tipo: '' })

  const rgProfLogado = '00000000000'; 

  useEffect(() => {
    const fetchDisciplinas = async () => {
      try {
        const res = await fetch(`http://localhost:3000/disciplinas/professor/${rgProfLogado}`);
        if (!res.ok) throw new Error('Não foi possível carregar as disciplinas.');
        const data = await res.json();
        setDisciplinas(data);
        if (data.length > 0) setIdDisciplina(data[0].idDisciplina);
      } catch (err) {
        setStatus({ mensagem: err.message, tipo: 'error' });
      } finally {
        setIsLoadingDisciplinas(false);
      }
    };
    fetchDisciplinas();
    gerarCamposQuestoes(1);
  }, []);

  const handleChangeQuestao = (index, campo, valor) => {
    const novas = [...questoes]
    novas[index][campo] = valor
    setQuestoes(novas)
  }

  const gerarCamposQuestoes = (quantidade) => {
    if (quantidade < 1) quantidade = 1;
    setQtdQuestoes(quantidade);
    const novasQuestoes = Array.from({ length: quantidade }, () => ({
      enunciado: '', alternativaA: '', alternativaB: '', alternativaC: '', alternativaD: '', alternativaE: '', alternativaCorreta: ''
    }));
    setQuestoes(novasQuestoes);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ mensagem: 'Salvando prova...', tipo: 'info' });

    try {
      const res = await fetch('http://localhost:3000/provas/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rgProf: rgProfLogado,
          idDisciplina: parseInt(idDisciplina),
          nomeProva,
          questoes
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.mensagem || 'Erro ao criar prova');
      setStatus({ mensagem: 'Prova criada com sucesso!', tipo: 'success' });
    } catch (err) {
      setStatus({ mensagem: err.message, tipo: 'error' });
    }
  }

  const formElementStyle = "w-full bg-[#f3deb7] border-2 border-[#c28762] text-[#556b2f] placeholder:text-[#c28762]/80 rounded-lg p-3 focus:outline-none focus:border-[#556b2f] focus:ring-2 focus:ring-[#556b2f]/50 transition-all duration-300";
  
  return (
    <main className="min-h-screen p-4 sm:p-6 lg:p-8 bg-[#f3deb7] font-serif text-[#556b2f]">
      <div
    className="relative h-48 md:h-64 bg-cover bg-center mb-10 rounded-lg shadow-[0_7px_0px_1.1px] shadow-[#556b2f] overflow-hidden"
    style={{ backgroundImage: "url('https://concursos.adv.br/wp-content/uploads/2022/03/simulados-para-concursos-publicos.jpg')" }}
  >
    <div className="absolute inset-0 bg-[#556b2f]/70 flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl md:text-5xl font-extrabold text-[#fff6e0] tracking-wider">
        Criação de Provas Online
      </h1> 
     
    </div>
  </div>

      <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto space-y-10 animate-fade-in-up">
      

        {/* Information block */}
        <section className="space-y-6 p-6 border-2 border-[#c28762]/30 rounded-xl shadow-[0_7px_0px_1.1px] shadow-[#556b2f]">
            <input
              className={formElementStyle}
              placeholder="Nome da Prova"
              value={nomeProva}
              onChange={e => setNomeProva(e.target.value)}
              required
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <select
                className={formElementStyle}
                value={idDisciplina}
                onChange={e => setIdDisciplina(e.target.value)}
                disabled={isLoadingDisciplinas}
                required
              >
                {isLoadingDisciplinas ? <option>Carregando disciplinas...</option> : 
                 disciplinas.length > 0 ? (
                  <>
                    <option value="" disabled>Selecione a Disciplina</option>
                    {disciplinas.map(d => (
                      <option key={d.idDisciplina} value={d.idDisciplina}>{d.nomeDisciplina}</option>
                    ))}
                  </>
                ) : <option>Nenhuma disciplina encontrada</option>}
              </select>
              
              <input
                className={formElementStyle}
                placeholder="Quantidade de Questões"
                value={qtdQuestoes}
                onChange={e => gerarCamposQuestoes(parseInt(e.target.value))}
                type="number"
                min="1"
                required
              />
            </div>
        </section>

        {questoes.map((q, idx) => (
          <section 
            key={idx} 
            className="p-6 border-2 border-[#c28762]/30 rounded-xl shadow-[0_7px_0px_1.1px] shadow-[#556b2f] space-y-4 animate-fade-in-up"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <h2 className="text-2xl font-bold text-[#556b2f] border-b-2 border-[#c28762]/20 pb-3 mb-4">
              Questão {idx + 1}
            </h2>
            <textarea
              className={`${formElementStyle} min-h-[120px]`}
              placeholder="Enunciado da questão..."
              value={q.enunciado}
              onChange={e => handleChangeQuestao(idx, 'enunciado', e.target.value)}
              required
            />
            {['A', 'B', 'C', 'D', 'E'].map(letra => (
              <input key={letra} className={formElementStyle} placeholder={`Alternativa ${letra}`}
                value={q[`alternativa${letra}`]}
                onChange={e => handleChangeQuestao(idx, `alternativa${letra}`, e.target.value)}
              />
            ))}
            <select
              className={formElementStyle}
              value={q.alternativaCorreta}
              onChange={e => handleChangeQuestao(idx, 'alternativaCorreta', e.target.value)}
              required
            >
              <option value="" disabled>Selecione a alternativa correta</option>
              {['A', 'B', 'C', 'D', 'E'].map(letra => (
                <option key={letra} value={letra}>Alternativa {letra}</option>
              ))}
            </select>
          </section>
        ))}
        
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-[#556b2f] text-white text-xl font-bold py-4 rounded-lg shadow-xl shadow-[#556b2f]/20 hover:bg-[#475a29] hover:scale-[1.02] active:scale-[1] transition-all duration-300"
          >
            Salvar Prova
          </button>
          
          {status.mensagem && (
            <p className={`mt-6 text-center p-4 rounded-lg animate-fade-in-up font-bold ${
              status.tipo === 'success' ? 'bg-[#556b2f]/20 text-[#556b2f] border border-[#556b2f]/30' :
              status.tipo === 'error' ? 'bg-red-500/10 text-red-800 border border-red-500/20' : 
              'bg-blue-500/10 text-blue-800 border border-blue-500/20'
            }`}>
              {status.mensagem}
            </p>
          )}
        </div>
      </form>
    </main>
  )
}