import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container mt-4">
      <h1>Bem-vindo à C4P</h1>
      <p>Escolha uma opção no menu para começar.</p>
      <ul>
        <li><Link to="/clientes">Gerenciar Clientes</Link></li>
        <li><Link to="/pets">Gerenciar Pets</Link></li>
      </ul>
    </div>
  );
}
