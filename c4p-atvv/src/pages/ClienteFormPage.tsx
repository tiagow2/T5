import ClienteForm from "../components/ClienteForm";
import { useNavigate, useParams } from "react-router-dom";
import { buscarCliente, cadastrarCliente, atualizarCliente } from "../services/ClienteService";
import { useEffect, useState } from "react";
import { Cliente } from "../types/Cliente";

export default function ClienteFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cliente, setCliente] = useState<Cliente | undefined>();

  useEffect(() => {
    if (id) {
      buscarCliente(parseInt(id)).then((res) => setCliente(res.data));
    }
  }, [id]);

  const handleSubmit = (cliente: Cliente) => {
    const operacao = cliente.id ? atualizarCliente : cadastrarCliente;
    operacao(cliente).then(() => navigate("/clientes"));
  };

  return <ClienteForm clienteExistente={cliente} onSubmit={handleSubmit} />;
}