import React from "react";
import ClienteForm from "../components/ClienteForm";
import { useNavigate } from "react-router-dom";
import { cadastrarCliente } from "../services/ClienteService";
import { Cliente } from "../types/Cliente";

export default function ClienteCadastro() {
  const navigate = useNavigate();

  const handleSubmit = (cliente: Cliente) => {
    cadastrarCliente(cliente)
      .then(() => {
        alert("Cliente cadastrado com sucesso!");
        navigate("/clientes");
      })
      .catch((err) => {
        console.error("Erro ao cadastrar cliente:", err);
        alert("Erro ao cadastrar cliente. Verifique os dados.");
      });
  };

  return (
    <div className="container mt-4">
      <h2>Cadastrar Novo Cliente</h2>
      <ClienteForm onSubmit={handleSubmit} />
    </div>
  );
}
