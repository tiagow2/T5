// frontend/src/pages/ClienteCadastro.tsx
import React from "react";
import ClienteForm from "../components/ClienteForm";
import { useNavigate } from "react-router-dom";
// CORREÇÃO: Use 'createCliente'
import { createCliente } from "../services/ClienteService";
import { Cliente } from "../types/Cliente";

export default function ClienteCadastro() {
  const navigate = useNavigate();

  const handleSubmit = (cliente: Cliente) => {
    // CORREÇÃO: Use 'createCliente'
    createCliente(cliente)
      .then(() => {
        alert("Cliente cadastrado com sucesso!");
        navigate("/clientes");
      })
      // CORREÇÃO: Adicione tipagem para 'err'
      .catch((err: any) => {
        console.error("Erro ao cadastrar cliente:", err);
        alert("Erro ao cadastrar cliente. Verifique os dados.");
      });
  };

  // Não passe 'clienteExistente' para o formulário de cadastro
  return <ClienteForm onSubmit={handleSubmit} />;
}