import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <nav className="navbar navbar-expand navbar-dark bg-dark px-3">
        <Link to="/" className="navbar-brand">C4P</Link>
        <div className="navbar-nav">
          <Link to="/clientes" className="nav-link">Clientes</Link>
          <Link to="/clientes/novo" className="nav-link">Novo Cliente</Link>
        </div>
      </nav>
      <main className="container mt-4">{children}</main>
    </>
  );
}
