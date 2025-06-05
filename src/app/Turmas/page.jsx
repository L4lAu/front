'use client';

import { useState } from 'react';
import Head from 'next/head';
import styles from '../Turmas/Materia.module.css';
import { motion } from 'framer-motion';

export default function Materias() {
  const [nivel, setNivel] = useState('medio');
  const [materia, setMateria] = useState('todas');
  const [showAll, setShowAll] = useState(false);

  // Imagens placeholder - substitua por suas imagens reais depois
  const placeholderImages = {
    'Português': 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    'Matemática': 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    'História': 'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    'Geografia': 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    'Física': 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    'Química': 'https://images.unsplash.com/photo-1554475901-4538ddfbccc2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    'Biologia': 'https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    'Inglês': 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    'Artes': 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    'Educação Física': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    'Programação Web': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    'Redes de Computadores': 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    'Banco de Dados': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    'Desenvolvimento de Sistemas': 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    'Segurança da Informação': 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    'Empreendedorismo': 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    'Ética Profissional': 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
  };

  const materiasMedio = [
    {
      nome: 'Português',
      imagem: placeholderImages['Português'],
      descricao: 'Aprenda gramática, interpretação e produção textual para desenvolver sua comunicação.'
    },
    {
      nome: 'Matemática',
      imagem: placeholderImages['Matemática'],
      descricao: 'Estude álgebra, geometria e lógica para resolver problemas do cotidiano.'
    },
    {
      nome: 'História',
      imagem: placeholderImages['História'],
      descricao: 'Explore os acontecimentos que moldaram a sociedade atual.'
    },
    {
      nome: 'Geografia',
      imagem: placeholderImages['Geografia'],
      descricao: 'Compreenda os fenômenos naturais e humanos no espaço geográfico.'
    },
    {
      nome: 'Física',
      imagem: placeholderImages['Física'],
      descricao: 'Estude os princípios que regem o universo físico e suas aplicações.'
    },
    {
      nome: 'Química',
      imagem: placeholderImages['Química'],
      descricao: 'Conheça a composição, estrutura e propriedades da matéria.'
    },
    {
      nome: 'Biologia',
      imagem: placeholderImages['Biologia'],
      descricao: 'Entenda os seres vivos, suas funções e interações com o meio ambiente.'
    },
    {
      nome: 'Inglês',
      imagem: placeholderImages['Inglês'],
      descricao: 'Desenvolva habilidades de comunicação em língua inglesa para o mundo global.'
    },
    {
      nome: 'Artes',
      imagem: placeholderImages['Artes'],
      descricao: 'Explore diversas formas de expressão artística e cultural.'
    },
    {
      nome: 'Educação Física',
      imagem: placeholderImages['Educação Física'],
      descricao: 'Pratique atividades físicas e compreenda a importância do corpo saudável.'
    }
  ];

  const materiasTecnico = [
    {
      nome: 'Programação Web',
      imagem: placeholderImages['Programação Web'],
      descricao: 'Crie sites interativos utilizando HTML, CSS, JavaScript e frameworks modernos.'
    },
    {
      nome: 'Redes de Computadores',
      imagem: placeholderImages['Redes de Computadores'],
      descricao: 'Aprenda como funcionam as redes de dados, protocolos e segurança da informação.'
    },
    {
      nome: 'Banco de Dados',
      imagem: placeholderImages['Banco de Dados'],
      descricao: 'Gerencie informações com sistemas de banco de dados relacionais e não relacionais.'
    },
    {
      nome: 'Desenvolvimento de Sistemas',
      imagem: placeholderImages['Desenvolvimento de Sistemas'],
      descricao: 'Projete e implemente sistemas de software eficientes e escaláveis.'
    },
    {
      nome: 'Segurança da Informação',
      imagem: placeholderImages['Segurança da Informação'],
      descricao: 'Proteja dados e sistemas contra ameaças e ataques cibernéticos.'
    },
    {
      nome: 'Empreendedorismo',
      imagem: placeholderImages['Empreendedorismo'],
      descricao: 'Desenvolva habilidades para criar e gerir negócios inovadores.'
    },
    {
      nome: 'Ética Profissional',
      imagem: placeholderImages['Ética Profissional'],
      descricao: 'Entenda princípios éticos aplicados à vida profissional e pessoal.'
    }
  ];

  const filteredMaterias = (nivel === 'medio' ? materiasMedio : materiasTecnico)
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
                src={materia.imagem}
                alt={`Imagem da matéria ${materia.nome}`}
                className={styles.materiaImage}
                loading="lazy"
              />
              <div className={styles.materiaContent}>
                <h3>{materia.nome}</h3>
                <p>{materia.descricao || 'Descubra os conteúdos e habilidades desenvolvidas nesta disciplina'}</p>
                <div className={styles.materiaFooter}>
                  <motion.a
                    href={`/materias/${materia.nome.toLowerCase().replace(/\s+/g, '-')}`}
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