import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container mt-5 d-flex flex-column align-items-center text-center">
      <h1 className="mb-4 text-primary">
        <i className="bi bi-house-heart-fill me-2"></i>Bem-vindo ao PetLovers
      </h1>
      <p className="lead mb-4">Escolha uma das opções abaixo para começar:</p>
      
      <div className="d-flex flex-column gap-3 w-100" style={{ maxWidth: "400px" }}>
        <Link to="/clientes" className="btn btn-outline-primary btn-lg">
          <i className="bi bi-people-fill me-2"></i>Gerenciar Clientes
        </Link>
        <Link to="/pets" className="btn btn-outline-success btn-lg">
          <i className="bi bi-paw-fill me-2"></i>Gerenciar Pets
        </Link>
      </div>
    </div>
  );
}
