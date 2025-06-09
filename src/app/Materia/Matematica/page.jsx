"use client"
import { useEffect, useState } from "react";

export default function Portugues() {
    const [disciplina, setDisciplina] = useState(null);
    const [provas, setProvas] = useState([]);
    const [professor, setProfessor] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);

        // 1. Busca id da disciplina
        fetch(`http://localhost:3000/dados/Materia/matematica`)
            .then(res => {
                if (!res.ok) throw new Error('Disciplina não encontrada');
                return res.json();
            })
            .then(data => {
                if (!data || data.length === 0) throw new Error('Dados da disciplina vazios');

                const materia = {
                    id: data[0].idDisciplina,
                    nome: data[0].nomeDisciplina,
                    imag: data[0].imagem
                };

                if (!materia.id) throw new Error('ID da disciplina não encontrado');
                console.log("imagem encontrada", materia.imag)

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
                console.log("RG do professor encontrado:", rgProfessor); // Debug

                return rgProfessor;
            })
            .then(rgProfessor => fetch(`http://localhost:3000/dados/registro/${rgProfessor}`))
            .then(res => {
                if (!res.ok) throw new Error('Erro ao buscar dados do professor');
                return res.json();
            })
            .then(dataProfessor => {
                const professorFormatado = dataProfessor.map(prof => ({
                    rg: prof.rgProf,
                    nome: prof.nome
                }));
                console.log("Professor formatado:", professorFormatado);
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
        <div>
            <div className="mx-5 my-8 p-8 md:p-14 border-4 border-[#556b2f] rounded-lg bg-[url('https://somosiberoamerica.org/wp-content/uploads/2022/05/TRIB-4-Matematicas-desarrollo.png')] bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center min-h-[300px] md:min-h-[400px] relative overflow-hidden">
                <h1 className="mt-25 text-4xl font-bold text-white -underline-offset-8 [text-shadow:_4px_0_0_#000,_-2px_0_0_#000,_0_2px_0_#000,_0_-2px_0_#000]"> {disciplina.nome}</h1>
                {professor.length > 0 ? (

                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white [text-shadow:_2px_2px_4px_rgba(0,0,0,0.8)] drop-shadow-lg">

                        {professor[0].nome}
                    </h1>
                ) : (
                    <h1 className="text-2xl md:text-4xl font-bold text-white [text-shadow:_2px_2px_4px_rgba(0,0,0,0.8)] underline underline-offset-8 decoration-2 decoration-[#556b2f]">
                        Carregando professor...
                    </h1>
                )}
            </div>
            <h1 className="m-5 text-black text-2xl">Atividades:</h1>
            <div className="mx-5 my-5 p-4 bg-[#556b2f] text-black border-2 border-green-700 rounded-lg">
                {provas.length > 0 ? (
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                        {provas.map((prova) => (
                            <li key={prova.id}>
                                <a href={
                                    prova.nome
                                        ? `/provas/${prova.id}`
                                        : '#'

                                } className="block border p-4 bg-white rounded-lg hover:border-2 hover:border-green-700 transition-all duration-200">
                                    <strong className="text-lg font-semibold block truncate">{prova.nome}</strong>
                                    <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">{prova.questoes} questões</span>
                                    <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded"> {prova.data}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Nenhuma prova encontrada para esta disciplina.</p>
                )}
            </div>
        </div>
    );
}