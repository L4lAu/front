"use client"

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PerformanceData() {
    const [loading, setLoading] = useState(false);
    const [desempenho, setDesempenho] = useState(null);
    const [alunos, setAlunos] = useState([]);
    const [error, setError] = useState(null);
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

                const desempenho = {
                    idDesempenho: performanceData[0].idDesempenho,
                    ra: performanceData[0].raAluno,
                    idMateria: performanceData[0].idDisciplina,
                    media: performanceData[0].mediaAcertos,
                    provasRespondidas: performanceData[0].totalProvasRespondidas
                };

                if (!desempenho.idDesempenho) throw new Error('ID da disciplina não encontrado');

                setDesempenho(desempenho);

                // Fetch student data
                const alunoRes = await fetch(`http://localhost:3000/dados/aluno/${desempenho.ra}`);
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
                <div
                    className={
                        `rounded-lg p-6 
         mb-8 ` +
                        `shadow-[0_7px_0px_1.1px] shadow-[#556b2f] ` +
                        `bg-[#fff6e0]`
                    }
                >
                    <h2 className="text-2xl font-bold text-[#556b2f] mb-4 border-b-2 border-[#c28762]/30 pb-2">Dados do Aluno</h2>
                    <div className="text-[#556b2f]/90 space-y-3">
                        {alunos.map(aluno => (
                            <div key={aluno.ra} className="space-y-2">
                                <div className="flex justify-between items-center text-sm py-1">
                                    <strong className="text-[#556b2f]">RA:</strong>
                                    <span className="text-right">{aluno.ra}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm py-1">
                                    <strong className="text-[#556b2f]">Nome:</strong>
                                    <span className="text-right">{aluno.nome}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {desempenho && (
                <div
                    className={
                        `rounded-lg p-6 
         mb-8 ` +
                        `shadow-[0_7px_0px_1.1px] shadow-[#556b2f] ` +
                        `bg-[#fff6e0]`
                    }
                >
                    <h2 className="text-2xl font-bold text-[#556b2f] mb-4 border-b-2 border-[#c28762]/30 pb-2">Desempenho do Aluno</h2>
                    <div className="text-[#556b2f]/90 space-y-3">
                        <div className="flex justify-between items-center text-sm py-1">
                            <strong className="text-[#556b2f]">ID Desempenho:</strong>
                            <span className="text-right">{desempenho.idDesempenho}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm py-1">
                            <strong className="text-[#556b2f]">RA:</strong>
                            <span className="text-right">{desempenho.ra}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm py-1">
                            <strong className="text-[#556b2f]">Disciplina:</strong>
                            <span className="text-right">{desempenho.idMateria}</span>
                        </div>
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
            )}

            
        </div>
    );
}
