import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  const navItems = [
    { name: 'Explore', path: '/' },
    { name: 'Chat', path: '/chat' },
    { name: 'Profile', path: '/profile' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="glass fixed top-0 w-full z-50 border-b border-[var(--border)]">
        <div className="container h-16 flex items-center justify-between">
          <Link to="/" className="text-2xl font-black text-[var(--primary)] tracking-tighter">
            SAFAR
          </Link>
          <nav className="flex gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-semibold transition-colors hover:text-[var(--primary)] ${
                  location.pathname === item.path ? 'text-[var(--primary)]' : 'text-[var(--text-muted)]'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="flex-1 pt-24 pb-12">
        <div className="container animate-fade">
          {children}
        </div>
      </main>
      <footer className="py-8 border-t border-[var(--border)] bg-[var(--bg-card)]">
        <div className="container text-center text-sm text-[var(--text-muted)]">
          &copy; {new Date().getFullYear()} SAFAR Travel. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
