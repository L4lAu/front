'use client';

import { useState } from 'react';
import Head from 'next/head';
import styles from '../Turmas/Materia.module.css';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { Router } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Materias() {
  const [nivel, setNivel] = useState('medio');
  const [materia, setMateria] = useState('todas');
  const [showAll, setShowAll] = useState(false);

  // Imagens placeholder - substitua por suas imagens reais depois


  const [disciplina, setDisciplinas] = useState([]);
  const raAluno = 20251005;

  useEffect(() => {
    fetch(`http://localhost:3000/aluno/disciplinas/${raAluno}`)
      .then(res => res.json())
      .then(data => {
      setDisciplinas(data);
    })
      .catch(err => console.error('Erro ao buscar provas:', err));
  }, []);

  const handleClick = (id) => {
    Router.push(`/${id}`);
  };

  const filteredMaterias = disciplinas
    .filter(m => materia === 'todas' || m.nome.toLowerCase().replace(/\s+/g, '-') === materia);

  const displayedMaterias = showAll ? filteredMaterias : filteredMaterias.slice(0, 4);

  return (
    <div className={styles.container}>
      <Head>
        <title>Matérias - Escola Técnica Vanguarda</title>
        <meta name="description" content="Conheça nossas matérias e cursos técnicos" />
      </Head>

      {/* Banner Aprimorado */}
      <motion.div
        className={styles.banner}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className={styles.bannerContent}>
          <motion.h1
            initial={{ y: -30 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.3 }}
            className={styles.bannerTitle}
          >
            Explore Nossas <span>Turmas</span>
          </motion.h1>
          <motion.p
            initial={{ y: 30 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className={styles.bannerSubtitle}
          >
            Educação de qualidade que transforma vidas
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className={styles.bannerSchool}
          >
            <span>Escola Técnica</span> Vanguarda
          </motion.div>
        </div>
      </motion.div>

      <main className={styles.main}>
        {/* Filtros Aprimorados */}
        <motion.div
          className={styles.filters}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className={styles.filterGroup}>
            <div className={styles.buttons}>
              <motion.button
                className={`${styles.button} ${nivel === 'medio' ? styles.active : ''}`}
                onClick={() => {
                  setNivel('medio');
                  setShowAll(false);
                }}
                whileHover={{ scale: 1.03, boxShadow: '0 4px 12px rgba(85, 107, 47, 0.3)' }}
                whileTap={{ scale: 0.98 }}
              >
                <span className={styles.buttonIcon}>✏️</span> Ensino Médio
              </motion.button>
              <motion.button
                className={`${styles.button} ${nivel === 'tecnico' ? styles.active : ''}`}
                onClick={() => {
                  setNivel('tecnico');
                  setShowAll(false);
                }}
                whileHover={{ scale: 1.03, boxShadow: '0 4px 12px rgba(85, 107, 47, 0.3)' }}
                whileTap={{ scale: 0.98 }}
              >
                <span className={styles.buttonIcon}>⚙️</span> Ensino Técnico
              </motion.button>
            </div>
          </div>

          <div className={styles.filterGroup}>
            <div className={styles.selectWrapper}>
              <select
                className={styles.select}
                value={materia}
                onChange={(e) => {
                  setMateria(e.target.value);
                  setShowAll(false);
                }}
              >
                <option value="todas">Todas as matérias</option>
                {(nivel === 'medio' ? materiasMedio : materiasTecnico).map(m => (
                  <option
                    key={m.nome}
                    value={m.nome.toLowerCase().replace(/\s+/g, '-')}
                  >
                    {m.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Cards das matérias */}
        <section className={styles.materiasContainer}>
          {displayedMaterias.map((materia) => (
            <motion.article
              key={materia.nome}
              className={styles.materiaCard}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <img
                src={m.imagem || placeholderImages[m.nome] || 'default.jpg'}
                alt={`Imagem da matéria ${m.nome}`}
              />
              <div className={styles.materiaContent}>
                <h3>{materia.nome}</h3>
                <p>{materia.descricao || 'Descubra os conteúdos e habilidades desenvolvidas nesta disciplina'}</p>
                <div className={styles.materiaFooter}>
                  <motion.a
                    href={`/materias/${materia.nome.toLowerCase().replace(/\s+/g, '-')}` + `?id=${materia.id}`}
                    className={styles.saibaMais}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Ver Detalhes →
                  </motion.a>
                  <div className={styles.materiaDecorations}>
                    <span className={styles.decorationDot}></span>
                    <span className={styles.decorationDot}></span>
                    <span className={styles.decorationDot}></span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </section>

        {/* Botão Ver mais/menos */}
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