"use client"
import { useEffect, useState } from "react";

export default function Portugues() {
    const [disciplina, setDisciplina] = useState(null);
    const [provas, setProvas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);

        // 1. Busca id da disciplina
        fetch(`http://localhost:3000/aluno/Materia/matematica`)
            .then(res => {
                if (!res.ok) throw new Error('Disciplina não encontrada');
                return res.json();
            })
            .then(data => {
                if (!data || data.length === 0) throw new Error('Dados da disciplina vazios');

                const materia = {
                    id: data[0].idDisciplina,
                    nome: data[0].nomeDisciplina
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
                    questoes: prova.numQuestoes,
                    data: prova.dataAplicacao ? new Date(prova.dataAplicacao).toLocaleDateString() : 'Sem data'
                }));
                setProvas(provasFormatadas);
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
        <div className="justify-center text-black p-4">
            <h1 className="text-2xl block justify-center font-bold mb-4">{disciplina.nome}</h1>
            <div className="justify-center text-black bg-[#ffebc6] border border-green-700 p-4">
                <h2>Atividades</h2>
                {provas.length > 0 ? (
                    <ul >

                        {provas.map((prova) => (
                            <a href={
                                prova.nome
                                    ? `/provas/${prova.id}`
                                    : '#'

                            } className=" mb-4 p-2">
                                <li key={prova.id} className="border  bg-white flex justify-between p-3 rounded hover:border-2 border-green-700 ">

                                    <strong className="text-lg">{prova.nome}</strong>
                                    <span>{prova.questoes} questões</span> -
                                    <span className="text-gray-600 "> {prova.data}</span>
                                </li>
                            </a>
                        ))}
                    </ul>
                ) : (
                    <p>Nenhuma prova encontrada para esta disciplina.</p>
                )}
            </div>
        </div>
    );
}