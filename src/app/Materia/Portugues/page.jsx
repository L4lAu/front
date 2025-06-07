"use client"
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function Portugues() {
    const params = useParams();
    const nomeDisciplina = params.nomeDisciplina;
    
    const [disciplina, setDisciplina] = useState(null);
    const [provas, setProvas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Primeiro fetch: busca informações da disciplina
    useEffect(() => {
        if (!nomeDisciplina) return;

        setLoading(true);
        fetch(`http://localhost:3000/aluno/disciplina/${nomeDisciplina}`)
            .then(res => {
                if (!res.ok) throw new Error('Disciplina não encontrada');
                return res.json();
            })
            .then(data => {
                if (data.length === 0) throw new Error('Disciplina não encontrada');
                
                const materia = {
                    id: data[0].idDisciplina,
                    nome: data[0].nomeDisciplina || data[0].nome
                };
                setDisciplina(materia);
                return materia.id; // Retorna o ID para o próximo then
            })
            .then(idDisciplina => {
                // Segundo fetch: busca as provas usando o ID da disciplina
                return fetch(`http://localhost:3000/provas/disciplina/${idDisciplina}`);
            })
            .then(res => {
                if (!res.ok) throw new Error('Erro ao buscar provas');
                return res.json();
            })
            .then(dataProvas => {
                const provasFormatadas = dataProvas.map(prova => ({
                    id: prova.idProva,
                    nome: prova.nomeProva,
                    questoes: prova.numQuestoes,
                    data: new Date(prova.dataAplicacao).toLocaleDateString()
                }));
                setProvas(provasFormatadas);
            })
            .catch(err => {
                console.error(err);
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [nomeDisciplina]);

    if (loading) return <div>Carregando...</div>;
    if (error) return <div>Erro: {error}</div>;
    if (!disciplina) return <div>Disciplina não encontrada</div>;

    return (
        <div className="justify-center text-black bg-white p-4">
            <h1 className="text-2xl font-bold mb-4">{disciplina.nome}</h1>
            
            {provas.length > 0 ? (
                <ul className="space-y-3">
                    {provas.map((prova) => (
                        <li key={prova.id} className="border p-3 rounded hover:bg-gray-50">
                            <strong className="text-lg">{prova.nome}</strong><br />
                            <span>{prova.questoes} questões</span> - 
                            <span className="text-gray-600"> {prova.data}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Nenhuma prova encontrada para esta disciplina.</p>
            )}
        </div>
    );
}