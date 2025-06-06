// src/app/api/disciplinas/route.js
import pool from '@/../../utils/db';

import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    // TODO: troque pelo RG real do professor (vindos da sessão ou contexto)
    const rgProf = '00000000000';

    const [rows] = await pool.query(
      `SELECT d.idDisciplina, d.nomeDisciplina
       FROM disciplina d
       INNER JOIN professores_disciplina pd ON d.idDisciplina = pd.idDisciplina
       WHERE pd.rgProf = ?`,
      [rgProf]
    );

    return NextResponse.json({ disciplinas: rows }, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar disciplinas:', error);
    return NextResponse.json(
      { error: 'Erro interno ao buscar disciplinas.' },
      { status: 500 }
    );
  }
}
