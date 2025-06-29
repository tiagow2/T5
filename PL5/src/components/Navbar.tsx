// frontend/src/components/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">PetLovers</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/clientes">Clientes</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/pets">Pets</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/produtos">Produtos</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownRelatorios" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Relatórios
              </a>
              <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDropdownRelatorios">
                <li><Link className="dropdown-item" to="/relatorios/top-clientes">Top 10 (Quantidade)</Link></li>
                <li><Link className="dropdown-item" to="/relatorios/top-clientes-valor">Top 5 (Valor)</Link></li>
                <li><Link className="dropdown-item" to="/relatorios/mais-consumidos">Itens Mais Consumidos</Link></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}