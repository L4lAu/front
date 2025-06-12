'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../Turmas/Materia.module.css';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Materias() {
  const [disciplinas, setDisciplinas] = useState([]);
  const [nivel, setNivel] = useState('medio');
  const [materia, setMateria] = useState('todas');
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3000/aluno/disciplinas/20251005`)
      .then(res => res.json())
      .then(data => {
        setDisciplinas(data.map(disciplina => ({
          id: disciplina.idDisciplina,
          nome: disciplina.nomeDisciplina,
          tipo: disciplina.tipo,
          descricao: disciplina.descricao || '',
          imagem: disciplina.imagem || ''
        })));
      })
      .catch(err => console.error('Erro ao buscar disciplinas:', err));
  }, []);

  const filteredMaterias = disciplinas.filter(d => {
    // Filtro por nível
    const tipoMatch = nivel === 'medio' 
      ? d.tipo?.toLowerCase() === 'comum' 
      : d.tipo?.toLowerCase() === 'desenvolvimento' && 'automação';
    
    // Filtro por matéria
    const materiaMatch = materia === 'todas' || 
      d.nome?.toLowerCase() === materia.toLowerCase();
    
    return tipoMatch && materiaMatch;
  });

  const displayedMaterias = showAll ? filteredMaterias : filteredMaterias.slice(0, 4);

  return (
    <div className={styles.container}>
      <Head>
        <title>Matérias - Escola Técnica Vanguarda</title>
      </Head>

      {/* Banner (garantindo que aparece) */}
      <motion.div className={styles.banner} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className={styles.bannerContent}>
          <h1 className={styles.bannerTitle}>Explore Nossas <span>Turmas</span></h1>
          <p className={styles.bannerSubtitle}>Educação de qualidade que transforma vidas</p>
          <div className={styles.bannerSchool}>
            <span>Escola Técnica</span> Vanguarda
          </div>
        </div>
      </motion.div>

      <main className={styles.main}>
        {/* Filtros */}
        <div className={styles.filters}>
          <div className={styles.filterGroup}>
            <div className={styles.buttons}>
              <button 
                className={`${styles.button} ${nivel === 'medio' ? styles.active : ''}`}
                onClick={() => setNivel('medio')}
              >
                Ensino Médio
              </button>
              <button
                className={`${styles.button} ${nivel === 'tecnico' ? styles.active : ''}`}
                onClick={() => setNivel('tecnico')}
              >
                Ensino Técnico
              </button>
            </div>
          </div>

          <div className={styles.filterGroup}>
            <select
              className={styles.select}
              value={materia}
              onChange={(e) => setMateria(e.target.value)}
            >
              <option value="todas">Todas as matérias</option>
              {disciplinas
                .filter(d => nivel === 'medio' 
                  ? d.tipo?.toLowerCase() === 'comum' 
                  : d.tipo?.toLowerCase() === 'desenvolvimento'
                )
                .map(m => (
                  <option key={m.id} value={m.nome}>
                    {m.nome}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* Matérias */}
        <div className={styles.materiasContainer}>
          {displayedMaterias.map(m => (
            <div key={m.id} className={styles.materiaCard}>
              <img src={m.imagem} alt={m.nome} className={styles.materiaImage} />
              <div className={styles.materiaContent}>
                <h3>{m.nome}</h3>
                <p>{m.descricao || 'Descrição não disponível'}</p>
                <a href={`/aluno/Materia/${m.nome.replace(/\s+/g, '-')}`} className={styles.saibaMais}>
                  Ver Detalhes →
                </a>
              </div>
            </div>
          ))}
        </div>
         {filteredMaterias.length > 4 && (
          <motion.div
            className={styles.showMoreWrapper}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              className={styles.showMoreButton}
              onClick={() => setShowAll(!showAll)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {showAll ? 'Ver Menos' : 'Ver Mais'}{' '}
              <span className={styles.buttonArrow}>
                {showAll ? '↑' : '↓'}
              </span>
            </motion.button>
          </motion.div>
        )}
      </main>
    </div>
  );
}