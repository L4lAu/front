
"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTwitch, FaYoutube, FaDiscord, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import styles from './footer.module.css';
import Image from 'next/image';


const Footer = () => {
  const [comment, setComment] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Comentário enviado: ${comment}`);
    setComment('');
  };

  return (
    <footer className={styles.footer}>
      <motion.div
        className={styles.footerContainer}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className={styles.grid}>
          {/* Logo e Descrição */}
          <div className={styles.section}>
            <h2 className={styles.footerTitle}>Escola Técnica Vanguarda</h2>
            <p className={styles.description}>
              Seu portal de correções e provas para ficar sempre à frente no semestre, aqui o aluno tem controle total de suas atividades avaliativas e transparencia nos resultados.
            </p>

          </div>

          {/* Navegação */}
          <div className={styles.section}>
            <h3 className={styles.footerTitle}>Navegação</h3>
            <ul>
              <li><a href="/aluno">Home</a></li>
              <li><a href="/aluno/Turmas">Turmas</a></li>
              <li><a href="/aluno/Desempenho/20251005">Desempenho</a></li>
              <li><a href="/aluno/Perfil">Perfil</a></li>
            </ul>
          </div>

          {/* Comentários */}
          <div className={styles.section}>
            <h3 className={styles.footerTitle}>Deixe um comentário para nós</h3>
            <form onSubmit={handleSubmit} className={styles.form}>
              <textarea
                placeholder="Compartilhe sua opinião..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                className={styles.textarea}
              />
              <button type="submit" className={styles.button}>Enviar</button>
            </form>
          </div>

          {/* Redes sociais */}
          <div className={styles.section}>
            <h3 className={styles.footerTitle}>Redes Sociais</h3>
            <div className={styles.socialIcons}>
              <a href="https://twitch.tv"><FaLinkedin /></a>
              <a href="https://youtube.com"><FaYoutube /></a>
              <a href=""><FaInstagram /></a>
              <a href="https://twitter.com"><FaTwitter /></a>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          © {new Date().getFullYear()} Escola Técnica vanguarda. Todos os direitos reservados.
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
