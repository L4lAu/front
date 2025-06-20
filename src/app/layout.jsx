

import Footer from '../components/footer/footer.js';
import Sidebar from '../components/header/Sidebar.js';
import '../styles/global.css'; // Importação de CSS global


export const metadata = {
  title: 'Meu Site',
  description: 'Descrição do site',
};

export default function RootLayout({ children }) {
  return (
    <html >
      <body>
        <div style={{ display: 'flex' }}>
          {/* <Sidebar /> */}
          <main
            style={{
              
              padding: '0',
              flexGrow: 1,
              width: 'calc(100% - 250px)',
            }}
          >
            {children}
          </main>
        </div>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
