import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container mt-5 text-center">
      <h1 className="text-primary">
        <i className="bi bi-house-heart-fill"></i> Bem-vindo ao PetLovers
      </h1>
      <p className="mt-3">Escolha uma das opções abaixo para começar:</p>

      <div className="d-grid gap-2 col-6 mx-auto mt-4">
        <Link to="/clientes" className="btn btn-outline-primary">
          <i className="bi bi-people-fill"></i> Gerenciar Clientes
        </Link>
        <Link to="/pets" className="btn btn-outline-success">
          <i className="bi bi-paw-fill"></i> Gerenciar Pets
        </Link>
        <Link to="/produtos" className="btn btn-outline-warning">
          <i className="bi bi-box-seam"></i> Gerenciar Produtos
        </Link>
      </div>
    </div>
  );
}
