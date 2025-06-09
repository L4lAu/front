'use client'

import { useState, useEffect } from 'react'

export default function GerenciarProvas() {
  const [provas, setProvas] = useState([]);
  const [provaSelecionada, setProvaSelecionada] = useState(null);
  const [questoes, setQuestoes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Estados para controlar os Modais
  const [editingQuestao, setEditingQuestao] = useState(null);
  const [deletingItem, setDeletingItem] = useState(null);

  const rgProfLogado = '00000000000';

  const fetchProvas = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/provas/professor/${rgProfLogado}`);
      const data = await res.json();
      setProvas(data);
    } catch (error) {
      console.error("Erro ao buscar provas:", error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchProvas();
  }, []);

  // Função para selecionar uma prova e buscar suas questões
  const handleSelecionarProva = async (prova) => {
    if (provaSelecionada?.idProva === prova.idProva) {
        setProvaSelecionada(null);
        setQuestoes([]);
        return;
    }
    setProvaSelecionada(prova);
    try {
      // ROTA CORRIGIDA: Apontando para o seu endpoint GET de questões
      const res = await fetch(`http://localhost:3000/questoes/provas/${prova.idProva}/questoes`);
      const data = await res.json();
      setQuestoes(data);
    } catch (error) {
      console.error("Erro ao buscar questões:", error);
      setQuestoes([]);
    }
  };

  // Funções de Ação (Editar e Excluir)
  const handleUpdateQuestao = async (e) => {
    e.preventDefault();
    try {
      // ROTA CORRIGIDA: Usando o seu endpoint PUT que valida o professor
      const res = await fetch(`http://localhost:3000/questoes/professores/${rgProfLogado}/questoes/${editingQuestao.idQuestao}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingQuestao),
      });
      if (!res.ok) throw new Error('Falha ao atualizar questão');
      setEditingQuestao(null);
      // É preciso passar o objeto 'provaSelecionada' inteiro
      await handleSelecionarProva(provaSelecionada); 
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    const { tipo, item } = deletingItem;

    let url;
    let options = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    };

    if (tipo === 'prova') {
        url = `http://localhost:3000/provas/${item.idProva}`;
        // Assumindo que sua rota de deletar prova também precisa do RG no corpo
        options.body = JSON.stringify({ rgProf: rgProfLogado });
    } else {
        // ROTA CORRIGIDA: O endpoint DELETE para questão também precisa do rgProf na URL
        url = `http://localhost:3000/questoes/professores/${rgProfLogado}/questoes/${item.idQuestao}`;
    }

    try {
      const res = await fetch(url, options);
      if (!res.ok) throw new Error(`Falha ao excluir ${tipo}`);

      setDeletingItem(null);
      if (tipo === 'prova') {
        setProvaSelecionada(null);
        await fetchProvas(); 
      } else {
        await handleSelecionarProva(provaSelecionada); 
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  // Estilo reutilizado
  const formElementStyle = "w-full bg-cream border-2 border-earthy-brown text-olive-green placeholder:text-earthy-brown/80 rounded-lg p-3 focus:outline-none focus:border-olive-green focus:ring-2 focus:ring-olive-green/50 transition-all duration-300";

  return (
    <main className="min-h-screen p-4 sm:p-6 lg:p-8 bg-cream font-serif text-olive-green">
      {/* O resto do código JSX permanece o mesmo. Apenas a lógica de fetch foi alterada. */}
      
      <header className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold">Minhas Provas</h1>
        <p className="text-earthy-brown mt-2 text-xl">Gerencie suas avaliações e questões.</p>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-4 animate-fade-in-up">
          <h2 className="text-2xl font-bold border-b-2 border-earthy-brown pb-2">Lista de Provas</h2>
          {loading && <p>Carregando provas...</p>}
          {provas.map(prova => (
            <div key={prova.idProva} 
              className={`p-4 rounded-lg cursor-pointer transition-all duration-300 border-2 ${provaSelecionada?.idProva === prova.idProva ? 'bg-olive-green text-cream border-olive-green shadow-xl' : 'bg-cream text-olive-green border-earthy-brown/50 hover:border-olive-green hover:shadow-lg'}`}
              onClick={() => handleSelecionarProva(prova)}
            >
              <h3 className="font-bold text-lg">{prova.nomeProva}</h3>
              <p className={provaSelecionada?.idProva === prova.idProva ? 'text-cream/80' : 'text-earthy-brown'}>
                {new Date(prova.dataAplicacao).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
        <div className="lg:col-span-2 space-y-6">
          {provaSelecionada ? (
            <div className="animate-fade-in-up">
              <div className="flex justify-between items-center border-b-2 border-earthy-brown pb-2 mb-4">
                <h2 className="text-2xl font-bold">Questões de "{provaSelecionada.nomeProva}"</h2>
                <button 
                  onClick={() => setDeletingItem({ tipo: 'prova', item: provaSelecionada })}
                  className="bg-red-800/80 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-800 transition-all">
                  Excluir Prova
                </button>
              </div>
              {questoes.length > 0 ? questoes.map((q, idx) => (
                <div key={q.idQuestao} className="p-4 mb-4 border-2 border-earthy-brown/30 rounded-xl shadow-lg shadow-earthy-brown/10">
                  <p className="font-bold mb-2">Q{idx + 1}: {q.enunciado}</p>
                  <p className="text-sm text-earthy-brown mb-3">Resposta Correta: <span className="font-bold">{q.alternativaCorreta}</span></p>
                  <div className="flex gap-2">
                    <button onClick={() => setEditingQuestao(q)} className="bg-olive-green text-cream px-3 py-1 rounded-md text-sm hover:bg-opacity-80 transition">Editar</button>
                    <button onClick={() => setDeletingItem({ tipo: 'questao', item: q })} className="bg-earthy-brown text-cream px-3 py-1 rounded-md text-sm hover:bg-opacity-80 transition">Excluir</button>
                  </div>
                </div>
              )) : <p>Nenhuma questão encontrada para esta prova.</p>}
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 border-2 border-dashed border-earthy-brown/50 rounded-xl">
              <p className="text-xl text-earthy-brown">Selecione uma prova para ver suas questões.</p>
            </div>
          )}
        </div>
      </div>
      {editingQuestao && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center p-4 animate-fade-in-up">
          <form onSubmit={handleUpdateQuestao} className="bg-cream p-8 rounded-2xl shadow-2xl w-full max-w-2xl space-y-4 max-h-full overflow-y-auto">
            <h2 className="text-2xl font-bold text-olive-green">Editar Questão</h2>
            <textarea
              className={`${formElementStyle} min-h-[100px]`}
              value={editingQuestao.enunciado}
              onChange={e => setEditingQuestao({ ...editingQuestao, enunciado: e.target.value })}
            />
            {['A', 'B', 'C', 'D', 'E'].map(letra => (
              <input key={letra} className={formElementStyle} placeholder={`Alternativa ${letra}`}
                value={editingQuestao[`alternativa${letra}`]}
                onChange={e => setEditingQuestao({ ...editingQuestao, [`alternativa${letra}`]: e.target.value })}
              />
            ))}
            <select
              className={formElementStyle}
              value={editingQuestao.alternativaCorreta}
              onChange={e => setEditingQuestao({ ...editingQuestao, alternativaCorreta: e.target.value })}
            >
              <option value="" disabled>Alternativa correta</option>
              {['A', 'B', 'C', 'D', 'E'].map(letra => <option key={letra} value={letra}>{letra}</option>)}
            </select>
            <div className="flex gap-4 pt-4">
              <button type="submit" className="flex-1 bg-olive-green text-cream font-bold py-3 rounded-lg hover:bg-opacity-90 transition">Salvar Alterações</button>
              <button type="button" onClick={() => setEditingQuestao(null)} className="flex-1 bg-earthy-brown/80 text-cream font-bold py-3 rounded-lg hover:bg-opacity-90 transition">Cancelar</button>
            </div>
          </form>
        </div>
      )}
      {deletingItem && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center p-4 animate-fade-in-up">
          <div className="bg-cream p-8 rounded-2xl shadow-2xl w-full max-w-md text-center">
            <h2 className="text-2xl font-bold text-olive-green">Você tem certeza?</h2>
            <p className="text-earthy-brown mt-2 mb-6">
              Você está prestes a excluir {deletingItem.tipo === 'prova' ? `a prova "${deletingItem.item.nomeProva}"` : `a questão "${deletingItem.item.enunciado.substring(0, 30)}..."`}. <br/>
              <span className="font-bold">Esta ação não pode ser desfeita.</span>
            </p>
            <div className="flex gap-4">
              <button onClick={handleDelete} className="flex-1 bg-red-800 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition">Sim, Excluir</button>
              <button onClick={() => setDeletingItem(null)} className="flex-1 bg-gray-500 text-white font-bold py-3 rounded-lg hover:bg-gray-600 transition">Cancelar</button>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}