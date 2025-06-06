// src/app/api/provas/[id]/route.js
import pool from '@/../../utils/db.js';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const { id } = params;

  try {
    // Busca a prova
    const [provas] = await pool.query(
      'SELECT idProva, nomeProva FROM prova WHERE idProva = ?',
      [id]
    );

    if (provas.length === 0) {
      return NextResponse.json({ error: 'Prova não encontrada' }, { status: 404 });
    }

    // Busca questões da prova
    const [questoes] = await pool.query(
      'SELECT * FROM questao WHERE idProva = ?',
      [id]
    );

    return NextResponse.json({
      idProva: provas[0].idProva,
      nomeProva: provas[0].nomeProva,
      questoes,
    });
  } catch (error) {
    console.error('Erro ao buscar prova:', error);
    return NextResponse.json({ error: 'Erro interno ao buscar prova' }, { status: 500 });
  }
}
