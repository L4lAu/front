import Link from 'next/link';

export default function HomePage() {
  return (
    <div>
      <nav style={{ marginBottom: '20px' }}>
        <Link href="/Login" style={{ marginRight: '15px' }}>Login</Link>
        <Link href="/Turmas" style={{ marginRight: '15px' }}>Turmas</Link>
        <Link href="/Salas" style={{ marginRight: '15px' }}>Salas</Link>
        <Link href="/desempenho" style={{ marginRight: '15px' }}>Desempenho</Link>
        <Link href="/perfil" style={{ marginRight: '15px' }}>Perfil</Link>
        <Link href="/provas">Provas</Link>
      </nav>

      <h1>Página Inicial</h1>
      <p>Este é o conteúdo da página inicial.</p>
    </div>
  );
}
