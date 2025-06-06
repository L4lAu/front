import { read } from '../../../../lib/db.js';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    const { ra, senha } = await req.json();

    const aluno = await read('alunos', 'raAluno = ?', [ra]);


    if (!aluno) {
      return Response.json({ erro: 'RA não encontrado.' }, { status: 401 });
    }

    try {
      const senhaCorreta = await bcrypt.compare(senha, aluno.senha);
      if (!senhaCorreta) {
        return Response.json({ erro: 'Senha incorreta.' }, { status: 401 });
      }
    } catch (error) {
      console.error("Erro ao comparar senha:", error);
      return Response.json({ erro: 'Erro ao verificar a senha.' }, { status: 500 });
    }

    return Response.json({ nome: aluno.nome });
  } catch (err) {
    console.error(err);
    return Response.json({ message: 'Erro interno do servidor.' }, { status: 500 });
  }
}
