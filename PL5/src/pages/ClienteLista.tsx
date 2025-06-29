// frontend/src/pages/ClienteLista.tsx
import React, { useEffect, useState } from "react";
// CORREÇÃO: Use 'getClientes' e 'deleteCliente'
import { getClientes, deleteCliente } from "../services/ClienteService";
import { Cliente } from "../types/Cliente";
import { Link, useNavigate } from "react-router-dom";

export default function ClienteLista() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const navigate = useNavigate();

  const carregarClientes = () => {
    getClientes()
      .then((res: Cliente[]) => setClientes(res))
      .catch((error: any) => {
        console.error("Erro ao carregar clientes:", error);
        alert("Não foi possível carregar a lista de clientes. Verifique o console para detalhes.");
      });
  };

  useEffect(() => {
    carregarClientes();
  }, []);

  const handleExcluir = (id: number | undefined) => {
    if (id === undefined) {
      alert("ID do cliente não disponível para exclusão.");
      return;
    }
    if (window.confirm(`Tem certeza que deseja excluir o cliente ID ${id}?`)) {
      deleteCliente(id)
        .then(() => {
          alert("Cliente excluído com sucesso!");
          carregarClientes();
        })
        .catch((error: any) => {
          console.error("Erro ao excluir cliente:", error);
          alert("Não foi possível excluir o cliente. Verifique o console para detalhes.");
        });
    }
  };

  return (
    <div className="container mt-4">
      <h1>Lista de Clientes</h1>
      <Link to="/clientes/cadastro" className="btn btn-primary mb-3">
        Cadastrar Novo Cliente
      </Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nome</th>
            <br></br>
            <th>Telefone</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente, index) => (
            <tr key={cliente.id ?? `fallback-${index}`}>
              <td>{cliente.nome}</td>
              <td>{cliente.email}</td>
              <td>{cliente.telefone}</td>
              <td>
                <button
                  className="btn btn-info btn-sm me-2"
                  onClick={() => navigate(`/clientes/editar/${cliente.id}`)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleExcluir(cliente.id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}