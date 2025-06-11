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
        <div>
            {desempenho && (
                <div>
                    <h2>Desempenho do Aluno</h2>
                    <p>ID Desempenho: {desempenho.idDesempenho}</p>
                    <p>RA: {desempenho.ra}</p>
                    <p>Disciplina: {desempenho.idMateria}</p>
                    <p>Média de Acertos: {desempenho.media}</p>
                    <p>Provas Respondidas: {desempenho.provasRespondidas}</p>
                </div>
            )}
            
            {alunos.length > 0 && (
                <div>
                    <h2>Dados do Aluno</h2>
                    {alunos.map(aluno => (
                        <div key={aluno.ra}>
                            <p>RA: {aluno.ra}</p>
                            <p>Nome: {aluno.nome}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
