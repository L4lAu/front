"use client"
import { useState } from 'react';
import styles from './Sala.module.css';

export default function Turmas() {
  const [activeProva, setActiveProva] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const toggleProva = (id) => {
    setActiveProva(activeProva === id ? null : id);
  };

  const provas = [
    {
      id: 1,
      nome: "Prova de Matemática",
      nota: "8.5",
      data: "15/05/2023",
      descricao: "Esta prova abordará os conceitos fundamentais de álgebra linear, incluindo matrizes, determinantes e sistemas de equações lineares. Serão incluídos também tópicos de geometria analítica como vetores, retas e planos.",
      professor: "Prof. Carlos Silva"
    },
    {
      id: 2,
      nome: "Prova de História",
      nota: "7.2",
      data: "20/05/2023",
      descricao: "Avaliação sobre a Revolução Industrial, abordando suas causas, principais invenções, consequências sociais e econômicas, e o impacto no mundo contemporâneo.",
      professor: "Prof. Ana Oliveira"
    },
    {
      id: 3,
      nome: "Prova de Biologia",
      nota: "9.0",
      data: "25/05/2023",
      descricao: "Prova sobre genética mendeliana, DNA e RNA, síntese proteica, mutações e os princípios da evolução das espécies segundo Darwin e as teorias modernas.",
      professor: "Prof. Marcos Andrade"
    }
  ];

  // Funções para o calendário
  const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  
  const daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  const firstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };
  
  const renderCalendar = () => {
    const totalDays = daysInMonth(currentMonth, currentYear);
    const firstDay = firstDayOfMonth(currentMonth, currentYear);
    const days = [];
    
    // Dias vazios no início
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className={styles.emptyDay}></div>);
    }
    
    // Dias do mês
    for (let day = 1; day <= totalDays; day++) {
      const isToday = new Date().getDate() === day && 
                     new Date().getMonth() === currentMonth && 
                     new Date().getFullYear() === currentYear;
      const hasEvent = provas.some(prova => {
        const [d, m, y] = prova.data.split('/');
        return parseInt(d) === day && 
               parseInt(m) - 1 === currentMonth && 
               parseInt(y) === currentYear;
      });
      
      days.push(
        <div 
          key={`day-${day}`} 
          className={`${styles.calendarDay} ${isToday ? styles.today : ''} ${hasEvent ? styles.hasEvent : ''}`}
        >
          {day}
          {hasEvent && <div className={styles.eventDot}></div>}
        </div>
      );
    }
    
    return days;
  };
  
  const changeMonth = (increment) => {
    setCurrentMonth(prev => {
      let newMonth = prev + increment;
      if (newMonth > 11) {
        setCurrentYear(prevYear => prevYear + 1);
        return 0;
      } else if (newMonth < 0) {
        setCurrentYear(prevYear => prevYear - 1);
        return 11;
      }
      return newMonth;
    });
  };

  return (
    <div className={styles.container}>
      {/* Banner */}
      <div className={styles.banner}>
        <div className={styles.bannerOverlay}></div>
        <div className={styles.bannerContent}>
          <h1 className={styles.materia}>MATEMÁTICA</h1>
          <p className={styles.subtitulo}>Álgebra Linear e Geometria Analítica</p>
        </div>
      </div>

      {/* Containers laterais */}
      <div className={styles.contentContainer}>
        <div className={styles.leftContainer}>
          <div className={styles.infoBox}>
            <div className={styles.imageContent}>
              <img 
                src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                alt="Matemática" 
                className={styles.materiaImage}
              />
            </div>
            <div className={styles.textContent}>
              <h2>Sobre a Matéria</h2>
              <p>Esta disciplina aborda conceitos fundamentais de álgebra linear e sua aplicação em geometria analítica, preparando os alunos para problemas matemáticos avançados.</p>
              
            </div>
          </div>
        </div>

        <div className={styles.rightContainer}>
          <div className={styles.calendario}>
            <div className={styles.calendarHeader}>
              <button onClick={() => changeMonth(-1)}>&lt;</button>
              <h2>{months[currentMonth]} {currentYear}</h2>
              <button onClick={() => changeMonth(1)}>&gt;</button>
            </div>
            <div className={styles.calendarWeekdays}>
              <div>Dom</div>
              <div>Seg</div>
              <div>Ter</div>
              <div>Qua</div>
              <div>Qui</div>
              <div>Sex</div>
              <div>Sáb</div>
            </div>
            <div className={styles.calendarGrid}>
              {renderCalendar()}
            </div>
          </div>
        </div>
      </div>

      {/* Seção de Provas */}
      <div className={styles.provasSection}>
        <h2>Provas</h2>
        <div className={styles.provasList}>
          {provas.map((prova) => (
            <div key={prova.id} className={styles.provaItem}>
              <div 
                className={styles.provaHeader}
                onClick={() => toggleProva(prova.id)}
              >
                <span className={styles.provaIcon}>📝</span>
                <span className={styles.provaNome}>{prova.nome}</span>
                <span className={styles.provaNota}>Nota: {prova.nota}</span>
              </div>
              
              {activeProva === prova.id && (
                <div className={styles.provaDetails}>
                  <div className={styles.provaTitleContainer}>
                    <h3 className={styles.provaTitle}>Atividade Oficial - Prova</h3>
                    <span className={styles.provaProfessor}>{prova.professor}</span>
                  </div>
                  <p className={styles.provaDescription}>{prova.descricao}</p>
                  <div className={styles.provaFooter}>
                    <span className={styles.provaDate}>Data: {prova.data}</span>
                    <button className={styles.startButton}>Iniciar Prova</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}