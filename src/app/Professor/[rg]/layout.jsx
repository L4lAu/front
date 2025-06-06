

import Footer from '../../../components/footer/footer';
import Sidebar from '../../../components/header/Sidebar';
import '../styles/global.css'; // Importação de CSS global

export const metadata = {
  title: 'Meu Site',
  description: 'Descrição do site',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <body>
        <div style={{ display: 'flex' }}>
          <Sidebar />
          <main
            style={{
              
              padding: '20px',
              flexGrow: 1,
              width: 'calc(100% - 250px)',
            }}
          >
            {children}
          </main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
