'use client'
import styles from './Header.module.css';
import {
  Menu, Home, Users, FileText, BarChart2,
  User, Settings, ClipboardList, ChevronDown, ChevronUp, ChevronLeft
} 
from 'lucide-react';

import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Header() {
  const [aberta, setAberta] = useState(false);
  const [mini, setMini] = useState(false);
  const [dropdownTurmasAberto, setDropdownTurmasAberto] = useState(false);
  const [dropupConfigAberto, setDropupConfigAberto] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize(); // Verifica no carregamento
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userType');
    router.push('/login');
  };
  return (
    <>
      <button className={styles.botaoMenu} onClick={() => setAberta(!aberta)}>
        <Menu size={28} />
      </button>

      <aside className={`${styles.sidebar} ${aberta ? styles.aberta : ''} ${mini && !isMobile ? styles.mini : ''}`}>
        <div className={styles.topControls}>
          {!isMobile && (
            <button 
              className={styles.botaoMinimizar} 
              onClick={() => setMini(!mini)}
              aria-label={mini ? "Expandir menu" : "Minimizar menu"}
            >
              <ChevronLeft size={20} style={{ transform: mini ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }} />
            </button>
          )}
        </div>

        <div className={styles.logo}>
          <Image 
            src="/logo.png" 
            alt="Logo" 
            width={mini && !isMobile ? 90 : 300} 
            height={mini && !isMobile ? 75 : 210} 
          />
        </div>

        <nav className={styles.menu}>
          <a href="/aluno" className={styles.link}><Home size={20} /> {!(mini && !isMobile) && 'HOME'}</a>
          <div className={styles.separador}></div>

          <button
            className={`${styles.link} ${styles.dropdownBtn}`}
            onClick={() => setDropdownTurmasAberto(!dropdownTurmasAberto)}
          >
            <Users size={20} /> {!(mini && !isMobile) && (<>TURMAS {dropdownTurmasAberto ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</>)}
          </button>

          {!(mini && !isMobile) && (
            <div className={`${styles.dropdown} ${dropdownTurmasAberto ? styles.dropdownAberto : ''}`}>
              <a href="/aluno/Turmas" className={styles.subLink}>Ensino Médio</a>
              <a href="/aluno/Turmas" className={styles.subLink}>Ensino Técnico</a>
            </div>
          )}

          <div className={styles.separador}></div>
          

          <a href="/aluno/Provas/responder/" className={styles.link}><ClipboardList size={20} /> {!(mini && !isMobile) && 'PROVAS'}</a>
          <div className={styles.separador}></div>

          <div className={styles.separador}></div>

          <a href="/aluno/Desempenho/20252025" className={styles.link}><BarChart2 size={20} /> {!(mini && !isMobile) && 'DESEMPENHO'}</a>
          <div className={styles.separador}></div>

          <a href="/aluno/Perfil" className={styles.link}><User size={20} /> {!(mini && !isMobile) && 'PERFIL'}</a>
        </nav>

        <div className={styles.configuracoesContainer}>
          <button
            className={`${styles.link} ${styles.dropdownBtn}`}
            onClick={() => setDropupConfigAberto(!dropupConfigAberto)}
          >
            <Settings size={20} /> {!(mini && !isMobile) && (<>EXTRAS {dropupConfigAberto ? <ChevronDown size={16} /> : <ChevronUp size={16} />}</>)}
          </button>

          {!(mini && !isMobile) && (
          <div className={`${styles.dropup} ${dropupConfigAberto ? styles.dropupAberto : ''}`}>
              <a href="/" className={styles.subLink} onClick={handleLogout}>Sair</a>
              <a href="/professor/sobre" className={styles.subLink}>Contato</a>
              <a href="/professor/sobre" className={styles.subLink}>Sobre Nós</a>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}