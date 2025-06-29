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
            <li className="nav-item"> {/* Novo link para Produtos */}
              <Link className="nav-link" to="/produtos">Produtos</Link>
            </li>
            <li className="nav-item">
              <Link to="/relatorios/top-clientes" className="nav-link">Top Clientes (Qtd)</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/relatorios/mais-consumidos">Mais Consumidos</Link>
            </li>
            {/* Adicionar links para Consumo e Relatórios aqui depois */}
          </ul>
        </div>
      </div>
    </nav>
  );
}