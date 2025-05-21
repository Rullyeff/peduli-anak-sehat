
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  noFooter?: boolean;
}

const Layout = ({ children, noFooter = false }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      {!noFooter && <Footer />}
    </div>
  );
};

export default Layout;
