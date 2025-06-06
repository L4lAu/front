'use client';

import { usePathname } from 'next/navigation';
import Sidebar from '../../components/header/Sidebar';
import Footer from '../../components/footer/footer';

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  // Define rotas que não mostram sidebar e footer
  const hideLayoutPaths = ['/Login'];

  const hideLayout = hideLayoutPaths.includes(pathname);

  if (hideLayout) {
    return <main style={{ padding: '20px' }}>{children}</main>;
  }

  return (
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
      <Footer />
    </div>
  );
}
