"use client"

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PerformanceData() {
    const [loading, setLoading] = useState(false);
    const [desempenhos, setDesempenhos] = useState([]); // Alterado para array
    const [alunos, setAlunos] = useState([]);
    const [error, setError] = useState(null);
    const [materias, setMaterias] = useState({}); // Objeto para armazenar matérias por ID
    const params = useParams();
    const raAluno = params.ra;

    useEffect(() => {
        setLoading(true);

        const fetchData = async () => {
            try {
                // Fetch performance data
                const performanceRes = await fetch(`http://localhost:3000/dados/desempenho/${raAluno}`);
                if (!performanceRes.ok) throw new Error('Aluno não encontrado');

                const performanceData = await performanceRes.json();
                if (!performanceData || performanceData.length === 0) throw new Error('O aluno não fez nenhuma atividade ou não existe');

                // Processar todos os desempenhos
                const desempenhosFormatados = await Promise.all(
                    performanceData.map(async (item) => {
                        const materiaRes = await fetch(`http://localhost:3000/dados/registroMateria/${item.idDisciplina}`);
                        if (!materiaRes.ok) throw new Error('Matéria não encontrada');
                        
                        const materiaData = await materiaRes.json();
                        if (!materiaData || materiaData.length === 0) throw new Error('Matéria não encontrada');

                        return {
                            idDesempenho: item.idDesempenho,
                            ra: item.raAluno,
                            idMateria: item.idDisciplina,
                            media: item.mediaAcertos,
                            provasRespondidas: item.totalProvasRespondidas,
                            nomeMateria: materiaData[0].nomeDisciplina
                        };
                    })
                );

                setDesempenhos(desempenhosFormatados);

                // Fetch student data (apenas uma vez, já que o RA é o mesmo)
                const alunoRes = await fetch(`http://localhost:3000/dados/aluno/${raAluno}`);
                if (!alunoRes.ok) throw new Error('Erro ao buscar aluno');

                const alunoData = await alunoRes.json();
                const alunoFormatado = alunoData.map(aluno => ({
                    ra: aluno.raAluno,
                    nome: aluno.nome
                }));

                setAlunos(alunoFormatado);
            } catch (err) {
                console.error('Erro:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [raAluno]);

    if (loading) return <div>Carregando...</div>;
    if (error) return <div>Erro: {error}</div>;

    return (
        <div className="space-y-8">
            {alunos.length > 0 && (
                <div className="rounded-lg p-6 mb-8 shadow-[0_7px_0px_1.1px] shadow-[#fff6e0] bg-[#556b2f]">
                    <h2 className="text-2xl font-bold text-[#fff6e0] mb-4 border-b-2 border-[#c28762]/30 pb-2">Dados do Aluno</h2>
                    <div className="text-[#fff6e0]/90 space-y-3">
                        {alunos.map(aluno => (
                            <div key={aluno.ra} className="space-y-2">
                                <div className="flex justify-between items-center text-sm py-1">
                                    <strong className="text-[#fff6e0]">RA:</strong>
                                    <span className="text-right">{aluno.ra}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm py-1">
                                    <strong className="text-[#fff6e0]">Nome:</strong>
                                    <span className="text-right">{aluno.nome}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            
            {desempenhos.map((desempenho) => (
                <div
                    key={desempenho.idDesempenho}
                    className="rounded-lg p-6 mb-8 shadow-[0_7px_0px_1.1px] shadow-[#556b2f] bg-[#fff6e0]"
                >
                    <h2 className="text-2xl font-bold text-[#556b2f] mb-4 border-b-2 border-[#c28762]/30 pb-2">
                       {desempenho.nomeMateria}
                    </h2>
                    <div className="text-[#556b2f]/90 space-y-3">
                      
                        <div className="flex justify-between items-center text-sm py-1">
                            <strong className="text-[#556b2f]">Média de Acertos:</strong>
                            <span className="text-right">{desempenho.media}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm py-1">
                            <strong className="text-[#556b2f]">Provas Respondidas:</strong>
                            <span className="text-right">{desempenho.provasRespondidas}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}