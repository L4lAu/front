import pool from '@/../utils/db';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { idProva, raAluno, respostas } = await request.json();

    if (!idProva || !raAluno || !respostas || !Array.isArray(respostas)) {
      return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 });
    }

    // 1. Verifica se aluno já respondeu essa prova
    const [jaRespondeu] = await pool.query(
      `SELECT COUNT(*) AS total FROM provas_resolvidas WHERE raAluno = ? AND idProva = ?`,
      [raAluno, idProva]
    );

    if (jaRespondeu[0].total > 0) {
      return NextResponse.json({ error: 'Aluno já respondeu essa prova' }, { status: 400 });
    }

    // 2. Insere na tabela provas_resolvidas
    const [result] = await pool.query(
      `INSERT INTO provas_resolvidas (raAluno, idProva) VALUES (?, ?)`,
      [raAluno, idProva]
    );

    const idProvaResolv = result.insertId;

    // 3. Insere as respostas na resposta_aluno
    // respostas = [{ idQuestao, alternativaMarcada, correta }, ...]
    const insertValues = respostas.map(r => [
      idProvaResolv,
      r.idQuestao,
      r.alternativaMarcada,
      r.correta ? 1 : 0
    ]);

    await pool.query(
      `INSERT INTO resposta_aluno (idProvaResolv, idQuestao, alternativaMarcada, correta) VALUES ?`,
      [insertValues]
    );

    return NextResponse.json({ message: 'Respostas salvas com sucesso' });
  } catch (error) {
    console.error('Erro ao salvar respostas:', error);
    return NextResponse.json({ error: 'Erro interno no servidor' }, { status: 500 });
  }
}
