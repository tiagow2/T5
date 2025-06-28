// frontend/src/pages/ClienteFormPage.tsx
import ClienteForm from "../components/ClienteForm";
import { useNavigate, useParams } from "react-router-dom";
// CORREÇÃO: Use 'getClienteById', 'createCliente', 'updateCliente'
import { getClienteById, createCliente, updateCliente } from "../services/ClienteService";
import { useEffect, useState } from "react";
import { Cliente } from "../types/Cliente";

export default function ClienteFormPage() {
  const navigate = useNavigate();
  const { id } = useParams(); // 'id' pode ser string ou undefined
  const [cliente, setCliente] = useState<Cliente | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const clienteId = parseInt(id);
      if (isNaN(clienteId)) {
        setError("ID do cliente inválido.");
        setLoading(false);
        return;
      }
      // CORREÇÃO: Use 'getClienteById'
      getClienteById(clienteId)
        // CORREÇÃO: 'res' é do tipo Cliente diretamente, não res.data
        .then((res: Cliente) => {
            setCliente(res);
            setLoading(false);
        })
        // CORREÇÃO: Adicione tipagem para 'error'
        .catch((error: any) => {
            console.error("Erro ao buscar cliente:", error);
            setError("Erro ao carregar cliente para edição. Verifique o console.");
            setLoading(false);
            // navigate("/clientes"); // Você pode querer redirecionar em caso de erro
        });
    } else {
        setLoading(false); // Não há ID, então é um novo cadastro
    }
  }, [id]);

  const handleSubmit = (clienteToSubmit: Cliente) => {
    // Se tem ID, é atualização; se não tem, é cadastro.
    const action = clienteToSubmit.id ? updateCliente : createCliente;
    // CORREÇÃO: Use 'action' (updateCliente ou createCliente)
    action(clienteToSubmit)
      .then(() => {
        alert("Cliente salvo com sucesso!");
        navigate("/clientes");
      })
      // CORREÇÃO: Adicione tipagem para 'err'
      .catch((err: any) => {
        console.error("Erro ao salvar cliente:", err);
        if (err.response && err.response.data && err.response.data.erro) {
            alert(`Erro ao salvar cliente: ${err.response.data.erro}`);
        } else {
            alert("Erro ao salvar cliente. Verifique o console.");
        }
      });
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return <ClienteForm clienteExistente={cliente} onSubmit={handleSubmit} />;
}