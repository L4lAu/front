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

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    fetch(`http://localhost:3000/aluno/disciplinas/20251005`)
      .then(res => res.json())
      .then(data => {
        const materiasFormatadas = data.map((disciplina) => ({
          id: disciplina.idDisciplina,
          nome: disciplina.nomeDisciplina,
          tipo: disciplina.tipo,
          descricao: disciplina.descricao || '',
          imagem: disciplina.imagem || ''
        }));
        setDisciplinas(materiasFormatadas);
      })
      .catch(err => console.error('Erro ao buscar disciplinas:', err));
  }, []);

  const filteredMaterias = disciplinas.filter((d) => {
    const tipoNormalizado = d.tipo.toLowerCase(); // comum ou desenvolvimento
    const tipoEsperado = nivel === 'medio' ? 'comum' : 'desenvolvimento';
    const materiaMatch = materia === 'todas' || d.nomeDisciplina.toLowerCase().replace(/\s+/g, '-') === materia;

    return tipoNormalizado === tipoEsperado && materiaMatch;
  });



  const displayedMaterias = showAll ? filteredMaterias : filteredMaterias.slice(0, 4);

  return (
    <div className={styles.container}>
      <Head>
        <title>Matérias - Escola Técnica Vanguarda</title>
        <meta name="description" content="Conheça nossas matérias e cursos técnicos" />
      </Head>

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
                whileHover={{ scale: 1.03 }}
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
                whileHover={{ scale: 1.03 }}
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
                {disciplinas
                  .filter(d =>
                    (nivel === 'medio' && d.tipo.toLowerCase() === 'comum') ||
                    (nivel === 'tecnico' && d.tipo.toLowerCase() === 'técnico')
                  )
                  .map(m => (
                    <option
                      key={m.id}
                      value={(m.nome)}
                    >
                      {m.nome}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </motion.div>

        <section className={styles.materiasContainer}>
          {displayedMaterias.map((m) => (
            <article key={m.id} className={styles.materiaCard}>

              <img className={styles.materiaImage}
                src={m.imagem}
                alt={`Imagem da matéria ${m.nomeDisciplina}`}
              />
              <div className={styles.materiaContent}>
                <h3>{m.nomeDisciplina}</h3>
                <p>{m.descricao || 'Descubra os conteúdos e habilidades desenvolvidas nesta disciplina'}</p>
                <div className={styles.materiaFooter}>
                  <a
                    href={
                      m.nomeDisciplina
                        ? `/provas/${m.nomeDisciplina.toLowerCase().replace(/\s+/g, '-')}` + `?id=${m.idDisciplina}`
                        : '#'
                    }
                    className={styles.saibaMais}
                  >
                    Ver Detalhes →
                  </a>
                  <div className={styles.materiaDecorations}>
                    <span className={styles.decorationDot}></span>
                    <span className={styles.decorationDot}></span>
                    <span className={styles.decorationDot}></span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>

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
