"use client"
import { useState } from 'react';
import styles from './Relatorio.module.css';

export default function Desempenho() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const cards = [
    {
      id: 1,
      title: "PENDÊNCIAS",
      value: "2",
      description: "Atividades pendentes de avaliação",
      icon: "📝",
      color: "#8FBC8F"
    },
    {
      id: 2,
      title: "DESEMPENHO",
      value: "8.2",
      description: "Média geral nas disciplinas",
      icon: "📊",
      color: "#556B2F"
    },
    {
      id: 3,
      title: "NOTAS DA TURMA",
      value: "7.5",
      description: "Média da turma",
      icon: "👥",
      color: "#6B8E23"
    },
    {
      id: 4,
      title: "GERAR BOLETIM",
      value: "",
      description: "Emitir relatório completo",
      icon: "📑",
      color: "#2E8B57"
    }
  ];

  return (
    <div className={styles.container}>
      {/* Banner */}
      <div className={styles.banner}>
        <div className={styles.bannerOverlay}></div>
        <div className={styles.bannerContent}>
          <h1 className={styles.title}>DESEMPENHO</h1>
          <p className={styles.subtitle}>Veja suas estatísticas</p>
        </div>
      </div>

      {/* Cards Section */}
      <div className={styles.cardsContainer}>
        {cards.map((card) => (
          <div 
            key={card.id}
            className={`${styles.card} ${hoveredCard === card.id ? styles.cardHover : ''}`}
            style={{ '--card-color': card.color }}
            onMouseEnter={() => setHoveredCard(card.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className={styles.cardIcon}>{card.icon}</div>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              {card.value && <p className={styles.cardValue}>{card.value}</p>}
              <p className={styles.cardDescription}>{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}