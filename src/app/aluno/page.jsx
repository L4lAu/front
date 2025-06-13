"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Home.module.css';

// Dados do carrossel principal
const carrosselItems = [
    {
    id: 1,
    imagem: '/aluno.png',
  },
  {
    id: 2,
    imagem: '/students.JPG'
  },
  {
    id: 3,
    imagem: '/classroom.png'
  }
];

const avaliacoesItems = [
    {
    id: 1,
    imagem: '@/../1.jfif'
  },
  {
    id: 2,
    imagem: '@/../2.jfif'
  },
  {
    id: 3,
    imagem: '@/../3.jfif'
  }
];



export default function Home({ mini }) {
  
  // Estados do carrossel principal
  const [slideAtivo, setSlideAtivo] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  // Estados do carrossel de avaliações
  const [slideAvaliacaoAtivo, setSlideAvaliacaoAtivo] = useState(0);

  // Auto-play do carrossel principal
  useEffect(() => {
    if (!autoPlay) return;
    
    const interval = setInterval(() => {
      setSlideAtivo(prevSlide => 
        prevSlide === carrosselItems.length - 1 ? 0 : prevSlide + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay]);

  // Auto-play do carrossel de avaliações
  useEffect(() => {
    const interval = setInterval(() => {
      setSlideAvaliacaoAtivo(prev => 
        prev === avaliacoesItems.length - 1 ? 0 : prev + 1
      );
    }, 7000);

    return () => clearInterval(interval);
  }, [slideAvaliacaoAtivo]);

  // Navegação do carrossel principal
  const proximoSlide = () => {
    setSlideAtivo(slideAtivo === carrosselItems.length - 1 ? 0 : slideAtivo + 1);
  };

  const slideAnterior = () => {
    setSlideAtivo(slideAtivo === 0 ? carrosselItems.length - 1 : slideAtivo - 1);
  };

  // Navegação do carrossel de avaliações
  const irParaAvaliacao = (index) => {
    setSlideAvaliacaoAtivo(index);
  };

  return (
    <main className={`${styles.container} ${mini ? styles.expandido : ''}`}>
      {/* Seção do Carrossel/Banner principal */}
      <section 
        className={styles.carrossel}
        onMouseEnter={() => setAutoPlay(false)}
        onMouseLeave={() => setAutoPlay(true)}
      >
        {carrosselItems.map((item, index) => (
          <div 
            key={item.id}
            className={`${styles.banner} ${index === slideAtivo ? styles.ativo : ''}`}
            style={{ backgroundImage: `url(${item.imagem})` }}
          >
            <div className={styles.overlay}>
              <h1>{item.titulo}</h1>
              <p>{item.descricao}</p>
              <div className={styles.botoes}>
              </div>
            </div>
          </div>
        ))}

        <button 
          className={`${styles.navBtn} ${styles.navBtnPrev}`}
          onClick={slideAnterior}
          aria-label="Slide anterior"
        >
          &#8249;
        </button>
        <button 
          className={`${styles.navBtn} ${styles.navBtnNext}`}
          onClick={proximoSlide}
          aria-label="Próximo slide"
        >
          &#8250;
        </button>

        <div className={styles.indicadores}>
          {carrosselItems.map((_, index) => (
            <button
              key={index}
              className={`${styles.indicador} ${index === slideAtivo ? styles.ativo : ''}`}
              onClick={() => setSlideAtivo(index)}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Seções originais mantidas intactas */}
      <section className={styles.atalhos}>
        <Link href="/aluno/Turmas" className={styles.atalho}>
          <div className={styles.atalhoIcone}>🏫</div>
          <div className={styles.atalhoTexto}>Turmas</div>
        </Link>
        <Link href="/aluno/Perfil" className={styles.atalho}>
          <div className={styles.atalhoIcone}>👤</div>
          <div className={styles.atalhoTexto}>Perfil</div>
        </Link>
        <Link href="/aluno/Desempenho/20252025" className={styles.atalho}>
          <div className={styles.atalhoIcone}>📈</div>
          <div className={styles.atalhoTexto}>Desempenho</div>
        </Link>
      </section>

      <section className={styles.secoes}>
        <div className={styles.atividades}>
          <h2>Atividades Recentes</h2>
          <ul>
            <li>Projeto de Robótica - Entrega 15/06 <span  className={styles.tempo}>há 1 hora atrás</span></li>
            <li>Prova de Matemática - 18/06 <span href="/aluno/Materia/matematica" className={styles.tempo}>há 3 horas atrás</span></li>
            <li>Workshop de Programação - 20/06 <span className={styles.tempo}>há 1 dia atrás</span></li>
            <li>Prova de Matemática - 18/06 <span href="/aluno/Materia/matematica" className={styles.tempo}>há 3 horas atrás</span></li>
            <li>Workshop de Programação - 20/06 <span className={styles.tempo}>há 1 dia atrás</span></li>
          </ul>
          <a href="#" className={styles.linkRodape}>Ver todas as atividades</a>
        </div>

        <div className={styles.avisos}>
          <h2>Avisos</h2>
          <ul>
            <li>Reunião de Pais - 22/06 <span className={styles.tempo}>há 20 minutos atrás</span></li>
            <li>Feira de Ciências - 25/06 <span className={styles.tempo}>há 2 dias atrás</span></li>
            <li>Manutenção na Internet - 28/06 <span className={styles.tempo}>há 4 dias atrás</span></li>
            <li>Feira de Ciências - 25/06 <span className={styles.tempo}>há 2 dias atrás</span></li>
            <li>Manutenção na Internet - 28/06 <span className={styles.tempo}>há 4 dias atrás</span></li>
          </ul>
          <a href="#" className={styles.linkRodape}>Ver todos os avisos</a>
        </div>
      </section>

      <section className={styles.cardsPropagandaWrapper}>
        <div className={styles.fundoImagem}></div>
        <div className={styles.cardsPropaganda}>
          <div className={styles.card}>
            <div className={styles.cardIcon}>🚀</div>
            <div className={styles.cardTexto}>Tecnologia de Ponta</div>
            <div className={styles.cardDescricao}>
              Nossos laboratórios são equipados com o que há de mais moderno para o aprendizado prático.
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}>👨‍🏫</div>
            <div className={styles.cardTexto}>Corpo Docente Qualificado</div>
            <div className={styles.cardDescricao}>
              Professores especialistas com experiência no mercado para garantir ensino de excelência.
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}>🌐</div>
            <div className={styles.cardTexto}>Parcerias Internacionais</div>
            <div className={styles.cardDescricao}>
              Conexões com instituições de ensino e empresas ao redor do mundo.
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}>🏆</div>
            <div className={styles.cardTexto}>Premiações e Reconhecimento</div>
            <div className={styles.cardDescricao}>
              A escola já recebeu diversos prêmios em feiras de ciência e inovação.
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}>💼</div>
            <div className={styles.cardTexto}>Alta Empregabilidade</div>
            <div className={styles.cardDescricao}>
              Mais de 85% dos alunos saem empregados ou com estágio garantido.
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}