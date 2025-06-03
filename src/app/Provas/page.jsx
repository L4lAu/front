'use client';
import { useEffect, useState } from 'react';

export default function ListaProvas() {
  const [provas, setProvas] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/provas/disciplina/:idDisciplina') // ajuste o endereço se necessário
      .then(res => res.json())
      .then(data => setProvas(data))
      .catch(err => console.error('Erro ao buscar provas:', err));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Lista de Provas</h1>
      {provas.map(materia => (
        <div key={materia.materia} className="mb-4">
          <h2 className="text-lg font-semibold">{materia.materia}</h2>
          <ul className="ml-4 list-disc">
            {materia.provas.map(prova => (
              <li key={prova.id}>
                Prova {prova.id}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}