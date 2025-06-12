// Pagina das views (nem me pergunte)
"use client";

import { useEffect, useState, useMemo } from 'react';


const RG_PROFESSOR_LOGADO = '00000000000';


const FilterIcon = () => ( /* ... seu SVG ... */ <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" /></svg>);
const ClearFilterIcon = () => ( /* ... seu SVG ... */ <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2"><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>);


const API_BASE_URL = 'http://localhost:3000/relatorio';

async function fetchData(endpoint) {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`);
    if (!response.ok) {
      console.error(`Erro HTTP: ${response.status} ao buscar ${API_BASE_URL}/${endpoint}`);
     
      return { error: true, status: response.status, endpoint };
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Falha na rede ou JSON inválido ao buscar dados de ${endpoint}:`, error);
    return { error: true, message: error.message, endpoint };
  }
}

const ReportCard = ({ title, children, extraClasses = "" }) => (
  <div 
    className={
        `rounded-lg p-6 
         mb-8 ` +
        `shadow-[0_7px_0px_1.1px] shadow-[#556b2f] ` +
        `${extraClasses}`
    }
  >
    <h2 className="text-2xl font-bold text-[#556b2f] mb-4 border-b-2 border-[#c28762]/30 pb-2">{title}</h2>
    <div className="text-[#556b2f]/90 space-y-3">
      {children}
    </div>
  </div>
);

const DataItem = ({ label, value }) => (
  <div className="flex justify-between items-center text-sm py-1">
    <strong className="text-[#556b2f]">{label}:</strong>
    <span className="text-right">{value !== null && value !== undefined ? String(value) : 'N/A'}</span>
  </div>
);

const LoadingSpinner = () => (  <div className="flex justify-center items-center h-48 flex-col"><div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#c28762]"></div><p className="ml-3 text-[#556b2f] text-lg mt-4">Carregando dados...</p></div>);

const Banner = ({ professorNome }) => (
  <div
    className="relative h-48 md:h-64 bg-cover bg-center mb-10 rounded-lg shadow-[0_7px_0px_1.1px] shadow-[#556b2f] overflow-hidden"
    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80')" }}
  >
    <div className="absolute inset-0 bg-[#556b2f]/70 flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl md:text-5xl font-extrabold text-[#fff6e0] tracking-wider">
        Painel de Relatórios
      </h1> 
      {professorNome && (
        <p className="text-xl md:text-2xl text-[#e9dcc3] mt-2">Professor(a): {professorNome}</p>
      )}
    </div>
  </div>
);


export default function RelatoriosPage() {
  const [rawRelatorioGeral, setRawRelatorioGeral] = useState([]);
  const [rawDesempenhoTurma, setRawDesempenhoTurma] = useState([]);
  const [rawDesempenhoAluno, setRawDesempenhoAluno] = useState([]);
  const [rawDesempenhoDisciplina, setRawDesempenhoDisciplina] = useState([]);
  const [rawDesempenhoProfessor, setRawDesempenhoProfessor] = useState([]);
  const [rawDesempenhoProva, setRawDesempenhoProva] = useState([]);
  const [rawRankingDisciplina, setRawRankingDisciplina] = useState([]);

  const [professorInfoCompleto, setProfessorInfoCompleto] = useState([]); 
  const [nomeProfessorLogado, setNomeProfessorLogado] = useState('');
  const [disciplinasDoProfessorNomes, setDisciplinasDoProfessorNomes] = useState([]); 

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [allClassesForFilter, setAllClassesForFilter] = useState([]);
  const [selectedClassForFilter, setSelectedClassForFilter] = useState('');

  useEffect(() => {
    document.title = `Relatórios - Prof. ${nomeProfessorLogado || 'Carregando...'}`;
  }, [nomeProfessorLogado]);

  useEffect(() => {
    const fetchAllRawData = async () => {
      setLoading(true);
      setError(null);

      if (!RG_PROFESSOR_LOGADO || RG_PROFESSOR_LOGADO === 'SEU_RG_PROFESSOR_REAL_AQUI' || RG_PROFESSOR_LOGADO === 'PROFESSOR_RG_EXEMPLO' ) {
          setError("RG do professor não configurado. Por favor, edite o código e defina a constante RG_PROFESSOR_LOGADO.");
          setLoading(false);
          return;
      }

      console.log(`Buscando dados para o professor com RG: '${RG_PROFESSOR_LOGADO}'`);

      const results = await Promise.all([
        fetchData('geral'),               // results[0]
        fetchData('desempenho/turma'),    // results[1]
        fetchData('desempenho/aluno'),    // results[2]
        fetchData('desempenho/disciplina'),// results[3]
        fetchData('desempenho/professor'),// results[4]
        fetchData('desempenho/prova'),    // results[5]
        fetchData('ranking/disciplina'),  // results[6]
      ]);

      
      const fetchErrors = results.filter(res => res && res.error);
      if (fetchErrors.length > 0) {
        console.error("Erros ao buscar dados:", fetchErrors);
        setError(`Erro ao buscar alguns dados. (${fetchErrors.map(e => e.endpoint).join(', ')}). Verifique o console.`);
   
      }
      
      const [
          geralData, turmaData, alunoData, disciplinaData,
          professorDataAll, provaData, rankingData
      ] = results;

      setRawRelatorioGeral(geralData && !geralData.error ? geralData : []);
      setRawDesempenhoTurma(turmaData && !turmaData.error ? turmaData : []);
      setRawDesempenhoAluno(alunoData && !alunoData.error ? alunoData : []);
      setRawDesempenhoDisciplina(disciplinaData && !disciplinaData.error ? disciplinaData : []);
      setRawDesempenhoProfessor(professorDataAll && !professorDataAll.error ? professorDataAll : []); 
      setRawDesempenhoProva(provaData && !provaData.error ? provaData : []);
      setRawRankingDisciplina(rankingData && !rankingData.error ? rankingData : []);

      if (professorDataAll && !professorDataAll.error && professorDataAll.length > 0) {
        console.log("Dados de todos os professores recebidos (rawDesempenhoProfessor):", professorDataAll.slice(0, 5)); 
        const infoProfessor = professorDataAll.filter(p => {
          
            return String(p.rgProf).trim() === String(RG_PROFESSOR_LOGADO).trim();
        });

        console.log(`Professores encontrados com RG '${RG_PROFESSOR_LOGADO}':`, infoProfessor);

        if (infoProfessor.length > 0) {
          setProfessorInfoCompleto(infoProfessor);
          setNomeProfessorLogado(infoProfessor[0].nomeProfessor);
          const nomesDisciplinas = [...new Set(infoProfessor.map(p => p.nomeDisciplina).filter(Boolean))].sort();
          setDisciplinasDoProfessorNomes(nomesDisciplinas);
          console.log(`Disciplinas do Professor ${infoProfessor[0].nomeProfessor}:`, nomesDisciplinas);
        } else {
          console.warn(`Professor com RG '${RG_PROFESSOR_LOGADO}' não encontrado nos dados da view desempenho_professor.`);
          if (!error) { 
             setError(`Professor com RG '${RG_PROFESSOR_LOGADO}' não encontrado. Verifique o RG e se o professor tem provas associadas para aparecer em 'desempenho_professor'.`);
          }
        }
      } else if (!error && (!professorDataAll || professorDataAll.length === 0)) { 
          console.warn("Nenhum dado da view desempenho_professor foi carregado ou a view está vazia.");
          setError("Não foi possível carregar os dados de desempenho dos professores. A view pode estar vazia.");
      } else if (professorDataAll && professorDataAll.error) {
      
      }
      setLoading(false);
    };

    fetchAllRawData();
  }, []); 


  const professorDataLogado = useMemo(() => { 
    return professorInfoCompleto;
  }, [professorInfoCompleto]);

  const filteredDesempenhoDisciplina = useMemo(() => {
    if (!rawDesempenhoDisciplina.length || !disciplinasDoProfessorNomes.length) return [];
    return rawDesempenhoDisciplina.filter(dd => disciplinasDoProfessorNomes.includes(dd.nomeDisciplina));
  }, [rawDesempenhoDisciplina, disciplinasDoProfessorNomes]);

  const filteredDesempenhoTurma = useMemo(() => {
    if (!rawDesempenhoTurma.length || !disciplinasDoProfessorNomes.length) return [];
    return rawDesempenhoTurma.filter(dt => disciplinasDoProfessorNomes.includes(dt.nomeDisciplina));
  }, [rawDesempenhoTurma, disciplinasDoProfessorNomes]);

  
  useEffect(() => {
    const classesUnicas = [...new Set(
        filteredDesempenhoTurma.map(dt => dt.codClasse).filter(Boolean)
    )].sort();
    setAllClassesForFilter(classesUnicas);
    if (selectedClassForFilter && !classesUnicas.includes(selectedClassForFilter)) {
        setSelectedClassForFilter('');
    }
  }, [filteredDesempenhoTurma, selectedClassForFilter]);


  const filteredDesempenhoAluno = useMemo(() => {
    if (!rawDesempenhoAluno.length) return [];
    let alunos = rawDesempenhoAluno;

    if (disciplinasDoProfessorNomes.length > 0) {
        alunos = alunos.filter(aluno => disciplinasDoProfessorNomes.includes(aluno.nomeDisciplina));
    } else if (RG_PROFESSOR_LOGADO && nomeProfessorLogado === '' && !loading) { 
      
        return [];
    }

    if (selectedClassForFilter) {
   
      console.warn("FILTRANDO ALUNOS POR CLASSE: Usando `rawRelatorioGeral` pois `desempenho_aluno` não tem `codClasse`. Para melhor performance, adicione `codClasse` à view `desempenho_aluno`.");
      
      const raAlunosDaClasseNoGeral = rawRelatorioGeral
            .filter(rg => rg.codClasse === selectedClassForFilter && disciplinasDoProfessorNomes.includes(rg.nomeDisciplina))
            .map(rg => rg.raAluno);
      const uniqueRaAlunosDaClasseNoGeral = [...new Set(raAlunosDaClasseNoGeral)];

      alunos = alunos.filter(aluno => uniqueRaAlunosDaClasseNoGeral.includes(aluno.raAluno));
    }
    
    return alunos.sort((a, b) => (b.mediaAcertos || 0) - (a.mediaAcertos || 0));
  }, [rawDesempenhoAluno, disciplinasDoProfessorNomes, selectedClassForFilter, rawRelatorioGeral, nomeProfessorLogado, loading]);


  const filteredRelatorioGeral = useMemo(() => {
    if (!rawRelatorioGeral.length) return [];
    if (!disciplinasDoProfessorNomes.length && RG_PROFESSOR_LOGADO && nomeProfessorLogado === '' && !loading) return [];

    return rawRelatorioGeral.filter(rg => 
        disciplinasDoProfessorNomes.includes(rg.nomeDisciplina)
    );
  }, [rawRelatorioGeral, disciplinasDoProfessorNomes, nomeProfessorLogado, loading]);

  const filteredDesempenhoProva = useMemo(() => {
    if (!rawDesempenhoProva.length || !disciplinasDoProfessorNomes.length) return [];
    return rawDesempenhoProva.filter(dp => disciplinasDoProfessorNomes.includes(dp.nomeDisciplina));
  }, [rawDesempenhoProva, disciplinasDoProfessorNomes]);

  const filteredRankingDisciplina = useMemo(() => {
    if (!rawRankingDisciplina.length || !disciplinasDoProfessorNomes.length) return [];
    return rawRankingDisciplina.filter(rd => disciplinasDoProfessorNomes.includes(rd.nomeDisciplina));
  }, [rawRankingDisciplina, disciplinasDoProfessorNomes]);


 
  if (loading) {
    return <div className="min-h-screen  flex flex-col items-center justify-center p-4"><LoadingSpinner /></div>;
  }

  if (error) {
    return (
      
      <main className="min-h-screen  p-4 sm:p-6 md:p-8">
        <div className="container mx-auto max-w-7xl text-center">
          <Banner professorNome={nomeProfessorLogado || (RG_PROFESSOR_LOGADO !== 'SEU_RG_PROFESSOR_REAL_AQUI' && RG_PROFESSOR_LOGADO !== 'PROFESSOR_RG_EXEMPLO' ? 'RG: '+RG_PROFESSOR_LOGADO : '')} />
          <h2 className="text-3xl text-[#c28762] mb-4 font-semibold">Aviso!</h2>
          <p className="text-xl text-[#556b2f] bg-[#fff6e0] p-6 rounded-md shadow-[0_7px_0px_1.1px] shadow-[#556b2f]">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-8 bg-[#c28762] text-[#fff6e0] hover:text-white py-3 px-8 rounded-lg text-lg hover:bg-opacity-90 transition-colors shadow-[0_7px_0px_1.1px] shadow-[#556b2f]"
          >
            Tentar Novamente
          </button>
        </div>
         <style jsx global>{`/* ... estilos scrollbar ... */`}</style>
      </main>
    );
  }
  
  if (RG_PROFESSOR_LOGADO && nomeProfessorLogado && disciplinasDoProfessorNomes.length === 0 && !loading) {
    return (
      <main className="min-h-screen  p-4 sm:p-6 md:p-8">
        <div className="container mx-auto max-w-7xl">
          <Banner professorNome={nomeProfessorLogado} />
          <ReportCard title="Informação">
            <p className="text-center text-xl text-[#556b2f]/80 py-6">
                Professor(a) {nomeProfessorLogado} não possui disciplinas com dados de desempenho registrados nos relatórios.
            </p>
          </ReportCard>
        </div>
        <style jsx global>{`/* ... estilos scrollbar ... */`}</style>
      </main>
    );
  }


  return (
    <main className="min-h-screen  p-4 sm:p-6 md:p-8">
      <div className="container mx-auto max-w-7xl">
        <Banner professorNome={nomeProfessorLogado} />


        {professorDataLogado && professorDataLogado.length > 0 && (
            <ReportCard title={`Meu Desempenho (Prof. ${nomeProfessorLogado})`} extraClasses="mb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {professorDataLogado.map((item, index) => (
                        <div key={index} className="p-4 border border-[#c28762]/20 rounded-md bg-[#fff6e0]/60">
                            <h3 className="text-lg font-semibold text-[#556b2f]">{item.nomeDisciplina}</h3>
                            <DataItem label="Provas Criadas/Corrigidas" value={item.totalProvasCorrigidas} />
                            <DataItem label="Média Acertos por Prova" value={`${item.mediaAcertosPorProva || 0}%`} />
                        </div>
                    ))}
                </div>
            </ReportCard>
        )}

        {filteredDesempenhoTurma.length > 0 && (
            <ReportCard title="Desempenho das Minhas Turmas">
                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                    {filteredDesempenhoTurma.map((item, index) => ( /* ... jsx do item ... */ 
                        <div key={item.codClasse + String(item.nomeDisciplina) + index} className="p-4 border border-[#c28762]/20 rounded-md bg-[#fff6e0]/60 hover:shadow-md transition-shadow">
                            <h3 className="text-lg font-semibold text-[#556b2f]">{item.cursoTecnico} - {item.codClasse}</h3>
                            <DataItem label="Disciplina" value={item.nomeDisciplina} />
                            <DataItem label="Média Acertos Turma" value={`${item.mediaAcertosTurma}%`} />
                            <DataItem label="Total Provas Respondidas" value={item.totalProvasRespondidas} />
                        </div>
                    ))}
                </div>
            </ReportCard>
        )}

        {filteredDesempenhoDisciplina.length > 0 && (
             <ReportCard title="Desempenho das Minhas Disciplinas">
                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                    {filteredDesempenhoDisciplina.map((item, index) => (  /* ... jsx do item ... */ 
                        <div key={item.idDisciplina + index} className="p-4 border border-[#c28762]/20 rounded-md bg-[#fff6e0]/60 hover:shadow-md transition-shadow">
                            <h3 className="text-lg font-semibold text-[#556b2f]">{item.nomeDisciplina}</h3>
                            <DataItem label="Média Geral Disciplina" value={`${item.mediaGeralDisciplina}%`} />
                            <DataItem label="Total Alunos Envolvidos" value={item.totalAlunos} />
                            <DataItem label="Total Provas na Disciplina" value={item.totalProvas} />
                        </div>
                    ))}
                </div>
            </ReportCard>
        )}


        { (disciplinasDoProfessorNomes.length > 0) && (
          <ReportCard title="Desempenho dos Meus Alunos" extraClasses="mb-8">
            <div className="mb-6 p-4 bg-[#e9dcc3]/50 rounded-md">
              <label htmlFor="classFilter" className="block text-md font-medium text-[#556b2f] mb-2">
                Filtrar por Turma (disponíveis para suas disciplinas):
              </label>
              <div className="flex space-x-3 items-center">
                <select
                  id="classFilter"
                  value={selectedClassForFilter}
                  onChange={(e) => setSelectedClassForFilter(e.target.value)}
                  disabled={allClassesForFilter.length === 0}
                  className="block w-full p-3 border border-[#c28762]/50 rounded-md shadow-sm focus:ring-[#c28762] focus:border-[#c28762] text-[#556b2f] bg-[#fff6e0] disabled:bg-gray-100 disabled:text-gray-400"
                >
                  <option value="">Todas as Turmas Associadas</option>
                  {allClassesForFilter.map(cls => ( <option key={cls} value={cls}>{cls}</option> ))}
                </select>
                {selectedClassForFilter && (
                    <button onClick={() => setSelectedClassForFilter('')} className="p-3 bg-[#c28762] text-white rounded-md hover:bg-[#c28762]/80 transition-colors flex items-center shadow-[0_4px_0px_0.5px] shadow-[#556b2f]/70 hover:shadow-[0_2px_0px_0.5px]" title="Limpar Filtro">
                       <ClearFilterIcon /> Limpar
                    </button>
                )}
              </div>
               {allClassesForFilter.length === 0 && <p className="text-xs text-[#556b2f]/70 mt-1">Nenhuma turma específica para filtrar nas suas disciplinas atuais.</p>}
            </div>

            {filteredDesempenhoAluno.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                {filteredDesempenhoAluno.slice(0, 30).map((item, index) => ( /* ... jsx do item ... */ 
                    <div key={String(item.raAluno) + String(item.nomeDisciplina) + index} className="p-4 border border-[#c28762]/20 rounded-md bg-[#fff6e0]/60 hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
                        <h3 className="text-lg font-semibold text-[#556b2f] truncate" title={item.nomeAluno}>{item.nomeAluno}</h3>
                        <DataItem label="RA" value={item.raAluno} />
                        <DataItem label="Disciplina" value={item.nomeDisciplina} />
                        <DataItem label="Média Acertos" value={`${item.mediaAcertos}%`} />
                        <DataItem label="Provas Respondidas" value={item.totalProvasRespondidas} />
                    </div>
                ))}
                {filteredDesempenhoAluno.length > 30 && <p className="text-sm text-center mt-4 md:col-span-2 xl:col-span-3">Mostrando os 30 primeiros resultados.</p>}
                </div>
            ) : ( <p className="text-center text-md text-[#556b2f]/80 py-6">Nenhum aluno encontrado para os filtros e disciplinas selecionados.</p> )}
          </ReportCard>
        )}


        {filteredRelatorioGeral.length > 0 && (
            <ReportCard title="Atividades Recentes dos Meus Alunos">
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {filteredRelatorioGeral.slice(0,15).map((item, index) => ( /* ... jsx do item ... */ 
                    <div key={item.numSerie || index} className="p-3 border border-[#c28762]/10 rounded-md bg-[#fff6e0]/50">
                        <p className="font-semibold text-[#556b2f] text-md">{item.nome_aluno} (RA: {item.raAluno})</p>
                        <DataItem label="Curso/Classe" value={`${item.codClasse} - ${item.cursoTecnico}`} />
                        <DataItem label="Prova (Disciplina)" value={`${item.nomeDisciplina || 'N/D'} (ID: ${item.idProva || 'N/A'})`} />
                        <DataItem label="Acertos" value={item.numQuestoesCorretas} />
                        <DataItem label="Data Resolução" value={item.dataResolucao ? new Date(item.dataResolucao).toLocaleDateString() : 'N/A'} />
                    </div>
                ))}
                {filteredRelatorioGeral.length > 15 && <p className="text-center text-sm mt-2">Mostrando os 15 registros mais recentes...</p>}
                </div>
            </ReportCard>
        )}
        

        {filteredDesempenhoProva.length > 0 && (
            <ReportCard title="Detalhes das Provas (Minhas Disciplinas)" extraClasses="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                    {filteredDesempenhoProva.map((item, index) => ( /* ... jsx do item ... */ 
                        <div key={item.idProva + index} className="p-4 border border-[#c28762]/20 rounded-md bg-[#fff6e0]/60 hover:shadow-lg transition-shadow transform hover:-translate-y-1">
                            <h3 className="text-lg font-semibold text-[#556b2f] truncate" title={item.nomeProva}>{item.nomeProva} (ID: {item.idProva})</h3>
                            <DataItem label="Disciplina" value={item.nomeDisciplina} />
                            <DataItem label="Data Aplicação" value={item.dataAplicacao ? new Date(item.dataAplicacao).toLocaleDateString() : 'N/A'} />
                            <DataItem label="Total Resoluções" value={item.totalResolucoes} />
                            <DataItem label="Média Acertos" value={`${item.mediaAcertos}%`} />
                            <DataItem label="Maior Nota" value={item.maiorNota} />
                            <DataItem label="Menor Nota" value={item.menorNota} />
                        </div>
                    ))}
                </div>
            </ReportCard>
        )}


        {filteredRankingDisciplina.length > 0 && (
             <ReportCard title="Ranking de Alunos (Minhas Disciplinas)" extraClasses="mt-8">
            {Object.entries(
              filteredRankingDisciplina.reduce((acc, item) => { /* ... reduce ... */
                const disciplinaKey = String(item.nomeDisciplina);
                acc[disciplinaKey] = [...(acc[disciplinaKey] || []), item];
                return acc;
              }, {})
            ).map(([disciplina, alunos], disciplinaIndex) => ( /* ... map ... */ 
              <div key={disciplinaIndex} className="mb-8">
                <h3 className="text-xl font-bold text-[#c28762] mb-4 border-b border-[#c28762]/40 pb-2">{disciplina}</h3>
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {alunos.sort((a,b) => a.posicaoRanking - b.posicaoRanking).map((aluno, alunoIndex) => ( /* ... jsx do item ... */ 
                    <div key={String(aluno.raAluno) + disciplina + alunoIndex} className="p-3 border border-[#c28762]/20 rounded-md flex justify-between items-center bg-[#fff6e0]/70 hover:bg-[#fff6e0] transition-colors transform hover:-translate-y-px">
                      <div>
                        <p className="font-semibold text-md text-[#556b2f]">{aluno.posicaoRanking}º - {aluno.nomeAluno} (RA: {aluno.raAluno})</p>
                        <DataItem label="Média Acertos" value={`${aluno.mediaAcertos}%`} />
                      </div>
                      <span className="text-lg font-bold text-[#556b2f]">{`${aluno.mediaAcertos}%`}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </ReportCard>
        )}
        

        {!loading && !error && nomeProfessorLogado && disciplinasDoProfessorNomes.length > 0 &&
         !filteredDesempenhoTurma.length &&
         !filteredDesempenhoDisciplina.length &&
         !filteredDesempenhoAluno.length &&
         !filteredRelatorioGeral.length &&
         !filteredDesempenhoProva.length &&
         !filteredRankingDisciplina.length &&
         (
          <ReportCard title="Informação">
            <p className="text-center text-xl text-[#556b2f]/80 py-6">
                Nenhum dado de relatório encontrado para as disciplinas associadas ao Professor(a) {nomeProfessorLogado}.
            </p>
          </ReportCard>
        )}
        
      </div>
      <style jsx global>{`
        /* Estilos da scrollbar */
        .custom-scrollbar::-webkit-scrollbar { width: 8px; height: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #e9dcc3; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #c28762; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #556b2f; }
        html::-webkit-scrollbar { width: 10px; }
        html::-webkit-scrollbar-track { background: #e9dcc3; }
        html::-webkit-scrollbar-thumb { background: #556b2f; border-radius: 10px; border: 2px solid #e9dcc3; }
        html::-webkit-scrollbar-thumb:hover { background: #c28762; }
      `}</style>
    </main>
  );
}