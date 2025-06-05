//esse código é para quando vai cadastrar uma senha para o aluno
// import bcrypt from "bcryptjs";

//Gera senha para ser substituida no arquivo config/

// async function generateHashedPassword() {
    
// const password = 'teste'; //substituir pela senha desejada
//     try {
    //         const salt = await bcrypt.genSalt(10);
    
    //         const hashedPassword = await bcrypt.hash(password, salt)
    
    //         console.log('Senha Hasheada: ', hashedPassword)
    //         process.exit(0)
    //     } catch {
//         console.error('Erro ao hashear a senha: ', err)
//         process.exit(1)
//     }
// }

// generateHashedPassword();


//esse código aqui é para quando o banco de dados já estiver com a coluna senha preenchida

import { readAll, update } from '../../lib/db.js'
import bcrypt from 'bcryptjs'

async function hashSenhasAlunos() {
    try {
        const alunos = await readAll('alunos')

        for (const aluno of alunos) {
            const hashed = await bcrypt.hash(aluno.senha, 10)
            await update('alunos', { senha: hashed }, `raAluno = ${aluno.raAluno}`)
            console.log(`✔️ RG ${aluno.raAluno} atualizado.`)
        }

        console.log('✅ Todas as senhas foram atualizadas.')
        process.exit(0)
    } catch (err) {
        console.error('❌ Erro ao atualizar senhas:', err)
        process.exit(1)
    }
}

hashSenhasAlunos()