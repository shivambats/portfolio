import React from 'react';
import Header from './Header';

export default function Layout({ children }) {
  return (
    <div className="site-wrapper">
      <Header />
      <main className="site-main">
        {children}
      </main>
      <footer className="site-footer">
        <div className="container">
          <p>© {new Date().getFullYear()} Shivam Batra. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
} 