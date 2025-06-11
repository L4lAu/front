"use client"

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MateriaPage() {
    const [disciplina, setDisciplina] = useState(null);
    const [provas, setProvas] = useState([]);
    const [professor, setProfessor] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { nomeMateria } = useParams(); // Extrai o parâmetro dinâmico
    const { ra } = "20251005";

    useEffect(() => {
        setLoading(true);

        // 1. Busca id da disciplina
        fetch(`http://localhost:3000/dados/registroDisc/${nomeMateria}`)
            .then(res => {
                if (!res.ok) throw new Error('Disciplina não encontrada');
                return res.json();
            })
            .then(data => {
                if (!data || data.length === 0) throw new Error('Dados da disciplina vazios');

                const materia = {
                    id: data[0].idDisciplina,
                    nome: data[0].nomeDisciplina,
                    imag: data[0].imagem,
                    descricao: data[0].descricao
                };

                if (!materia.id) throw new Error('ID da disciplina não encontrado');

                setDisciplina(materia);
                return materia.id;
            })
            // Busca as provas com o ID obtido
            .then(id => fetch(`http://localhost:3000/provas/disciplina/${id}`))
            .then(res => {
                if (!res.ok) throw new Error('Erro ao buscar provas');
                return res.json();
            })
            .then(dataProvas => {
                const provasFormatadas = dataProvas.map(prova => ({
                    id: prova.idProva,
                    nome: prova.nomeProva,
                    rg: prova.rgProf,
                    questoes: prova.numQuestoes,
                    data: prova.dataAplicacao ? new Date(prova.dataAplicacao).toLocaleDateString() : 'Sem data'
                }));
                setProvas(provasFormatadas);
                const rgProfessor = dataProvas[0].rgProf;

                return rgProfessor;
            })
            .then(rgProfessor => fetch(`http://localhost:3000/dados/dadosProf/${rgProfessor}`))
            .then(res => {
                if (!res.ok) throw new Error('Erro ao buscar dados do professor');
                return res.json();
            })
            .then(dataProfessor => {
                const professorFormatado = dataProfessor.map(prof => ({
                    rg: prof.rgProf,
                    nome: prof.nome
                }));
                setProfessor(professorFormatado);
            })
            .catch(err => {
                console.error('Erro:', err);
                setError(err.message);
            })
            .finally(() => setLoading(false));
    }, []);


    if (loading) return <div>Carregando...</div>;
    if (error) return <div>Erro: {error}</div>;
    if (!disciplina) return <div>Disciplina não encontrada</div>;

    return (
        <div className="min-h-screen">
            {/* Cabeçalho com imagem de fundo */}
            <div className="mx-3 lg:mx-8 xl:mx-15 my-4 md:my-6 lg:my-8 border-4 border-[#556b2f] rounded-lg bg-[url('../../public/fundoBannerMateria.png')] bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center relative overflow-hidden min-h-[100px] md:min-h-[200px] lg:min-h-[250px]">
                <div className="text-center ">
                    <h1 className="mt-3 md:mt-5 lg:mt-8 text-3xl sm:text-4xl md:text-5xl font-bold text-white [text-shadow:_4px_0_0_#000,_-2px_0_0_#000,_0_2px_0_#000,_0_-2px_0_#000]">
                        {disciplina.nome}
                    </h1>
                    {professor.length > 0 ? (
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white [text-shadow:_2px_2px_4px_rgba(0,0,0,0.8)] mt-2 md:mt-4">
                            {professor[0].nome}
                        </h1>
                    ) : (
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white [text-shadow:_2px_2px_4px_rgba(0,0,0,0.8)] underline underline-offset-4 md:underline-offset-8 decoration-2 decoration-[#556b2f] mt-2 md:mt-4">
                            Carregando professor...
                        </h1>
                    )}
                </div>
            </div>

            {/* Seção de descrição e desempenho */}
            <div className="mx-3 lg:mx-8 xl:mx-15 mb-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
                <div className="w-full h-auto min-h-[160px] md:h-[200px] p-4 border-2 flex items-center justify-center border-green-700 bg-[#f1d196] text-green-800 rounded-lg text-base sm:text-lg md:text-xl lg:text-2xl">
                    <h1 className="font-bold break-words ">aviso:</h1>
                    <p>${}</p>
                </div>
                <a href={
                         `/Desempenho/20251005`
                         
                    }>
                    <div className="w-full h-auto min-h-[160px] md:h-[200px] p-4 flex items-center justify-center border-2 border-green-700 rounded-lg text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl bg-cover bg-center bg-no-repeat bg-[url('https://preview.redd.it/489ohv5xzvf31.jpg?width=640&crop=smart&auto=webp&s=78d2e524f6c461eac7a35b00e6b441886ef06c37')]">
                        <h3 className="w-100 font-bold [text-shadow:_4px_0_0_#000,_-2px_0_0_#000,_0_2px_0_#000,_0_-2px_0_#000] text-center">
                            SEU DESEMPENHO
                        </h3>
                    </div>
                </a>
            </div>

            {/* Seção de atividades */}
            <div className="mx-3 lg:mx-8 xl:mx-15 mb-8">
                <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-black mb-4 md:mb-6">Atividades:</h1>
                <div className="p-4 md:p-6 bg-[#f1d196] text-black border-2 border-green-700 rounded-lg">
                    {provas.length > 0 ? (
                        <ul className="grid grid-cols-1 gap-3 md:gap-4">
                            {provas.map((prova) => (
                                <li key={prova.id}>
                                    <a
                                        href={prova.nome ? `/responder-prova/${prova.id}` : '#'}
                                        className="block border border-gray-300 hover:border-2 hover:border-green-700 transition-all duration-200 bg-white rounded-lg p-3 md:p-4"
                                    >
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                            <div className="flex-1 min-w-0">
                                                <strong className="text-lg font-semibold truncate block">
                                                    {prova.nome}
                                                </strong>
                                            </div>
                                            <div className="flex flex-wrap gap-2 sm:gap-3 justify-end">
                                                <span className="text-sm sm:text-base bg-green-100 text-green-800 px-2 py-1 rounded">
                                                    {prova.questoes} questões
                                                </span>
                                                <span className="text-sm sm:text-base text-green-800 px-2 py-1 rounded">
                                                    {prova.questoes * 10}/{prova.questoes * 10}
                                                </span>
                                                <span className="text-sm sm:text-base bg-green-100 text-green-800 px-2 py-1 rounded">
                                                    {prova.data}
                                                </span>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-center py-4 text-lg">Nenhuma prova encontrada para esta disciplina.</p>
                    )}
                </div>
            </div>
        </div>
    );
}