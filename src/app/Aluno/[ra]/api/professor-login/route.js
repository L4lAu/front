import { read } from "../../../lib/db.js"
import bcrypt from "bcryptjs"

export async function POST(req) {
    try {
        const { rg, senha } = await req.json();

        const professor = await read('professores', 'rgProf = ?', [rg]);

        if (!professor) {
            return Response.json({ erro: 'RG não encontrado.' }, { status: 401 });
        }

        try {
            const senhaCorreta = await bcrypt.compare(senha, professor.senha);
            if (!senhaCorreta) {
              return Response.json({ erro: 'Senha incorreta.' }, { status: 401 });
            }
          } catch (error) {
            console.error("Erro ao comparar senha:", error);
            return Response.json({ error: 'Erro ao verificar a senha.' }, { status: 500 });
          }

        return Response.json({ nome: professor.nome });
    } catch (err) {
        console.error(err);
        return Response.json({ message: 'Erro interno do servidor.' }, { status: 500 });
    }
}
