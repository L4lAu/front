// src/app/api/provas/create/route.js
import pool from '@/../../utils/db.js';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      nomeProva,
      numQuestoes,
      idDisciplina,
      dataAplicacao,
      questoes
    } = body;

    if (
      !nomeProva ||
      !numQuestoes ||
      !idDisciplina ||
      !Array.isArray(questoes) ||
      questoes.length !== Number(numQuestoes)
    ) {
      return NextResponse.json(
        { error: 'Payload inválido. Cheque os campos.' },
        { status: 400 }
      );
    }

    // TODO: troque pelo RG real do professor (vindos da sessão ou contexto)
    const rgProf = '00000000000';

    // 1) Insere a prova
    const [resultInsert] = await pool.query(
      `INSERT INTO prova 
         (rgProf, idDisciplina, nomeProva, numQuestoes, dataAplicacao)
       VALUES (?, ?, ?, ?, ?)`,
      [rgProf, idDisciplina, nomeProva, numQuestoes, dataAplicacao]
    );
    const novoIdProva = resultInsert.insertId;

    // 2) Insere as questões em transação
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();

      const sqlQuestao = `
        INSERT INTO questao
          (idProva, enunciado, alternativaA, alternativaB, alternativaC, alternativaD, alternativaE, alternativaCorreta)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;

      for (let q of questoes) {
        const {
          enunciado,
          alternativaA,
          alternativaB,
          alternativaC,
          alternativaD,
          alternativaE,
          alternativaCorreta
        } = q;

        await conn.query(sqlQuestao, [
          novoIdProva,
          enunciado,
          alternativaA,
          alternativaB,
          alternativaC,
          alternativaD,
          alternativaE,
          alternativaCorreta
        ]);
      }

      await conn.commit();
      conn.release();
    } catch (txErr) {
      await conn.rollback();
      conn.release();
      console.error('Erro na transação ao inserir questões:', txErr);
      return NextResponse.json(
        { error: 'Falha ao inserir questões.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Prova criada com sucesso!', idProva: novoIdProva },
      { status: 201 }
    );
  } catch (error) {
    console.error('Erro ao criar prova:', error);
    return NextResponse.json(
      { error: 'Erro interno ao criar prova.' },
      { status: 500 }
    );
  }
}
