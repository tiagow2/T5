import { useEffect, useState } from "react";
import { listarClientes, excluirCliente } from "../services/ClienteService";
import { Cliente } from "../types/Cliente";
import { Link } from "react-router-dom";

export default function ClienteLista() {
  const [clientes, setClientes] = useState<Cliente[]>([]);

  const carregarClientes = () => {
    listarClientes()
      .then((res) => setClientes(res.data))
      .catch(console.error);
  };

  const handleExcluir = (id: number | undefined) => {
    if (id && window.confirm("Deseja excluir o cliente?")) {
      excluirCliente(id).then(() => carregarClientes());
    }
  };

  useEffect(() => {
    carregarClientes();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Clientes</h2>
      <Link to="/clientes/novo" className="btn btn-success mb-3">Novo Cliente</Link>
      <ul className="list-group">
        {clientes.map((cliente) => (
          <li key={cliente.id} className="list-group-item d-flex justify-content-between">
            <div>
              <strong>{cliente.nome}</strong> ({cliente.nomeSocial})<br />
              {cliente.email ?? "sem email"} - {cliente.endereco?.cidade}
            </div>
            <div className="d-flex gap-2">
              <Link to={`/clientes/${cliente.id}`} className="btn btn-primary">Editar</Link>
              <button className="btn btn-danger" onClick={() => handleExcluir(cliente.id)}>Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}