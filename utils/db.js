// utils/db.js
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',     // troque se não for localhost
  user: 'root',          // seu usuário MySQL
  password: '',          // sua senha (se houver)
  database: 'portal_etv',// nome do banco
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
