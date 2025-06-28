// frontend/src/pages/ClienteEdicao.tsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ClienteForm from "../components/ClienteForm"; // Importe seu componente de formulário
import { Cliente } from "../types/Cliente"; // Importe a interface Cliente
import { getClienteById, updateCliente } from "../services/ClienteService"; // Importe as funções do serviço

const ClienteEdicao: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Pega o ID da URL. Lembre-se que id da URL é string.
  const navigate = useNavigate(); // Hook para navegação
  const [cliente, setCliente] = useState<Cliente | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    // Busca o cliente existente quando o componente é montado ou o ID muda
    const fetchCliente = async () => {
      if (!id) {
        setError("ID do cliente não fornecido na URL.");
        setLoading(false);
        return;
      }
      try {
        const parsedId = parseInt(id);
        if (isNaN(parsedId)) {
          setError("ID do cliente inválido.");
          setLoading(false);
          return;
        }
        const fetchedCliente = await getClienteById(parsedId);
        setCliente(fetchedCliente);
      } catch (err: any) {
        setError(err.message || "Erro ao carregar os dados do cliente.");
      } finally {
        setLoading(false);
      }
    };
    fetchCliente();
  }, [id]); // Dependência do ID para recarregar se a rota mudar

  // Função para lidar com o envio do formulário (vindo do ClienteForm)
  const handleSubmit = async (clienteAtualizado: Cliente) => {
    setMessage(null);
    setError(null);
    try {
      // O ID que vem do clienteForm pode ser opcional.
      // Garantimos que o ID correto está sendo usado para a atualização.
      clienteAtualizado.id = parseInt(id as string); 

      await updateCliente(clienteAtualizado);
      setMessage("Cliente atualizado com sucesso!");
      // Opcional: Navegar de volta para a lista após um curto período
      setTimeout(() => {
        navigate('/clientes');
      }, 1500); 
    } catch (err: any) {
      setError(err.message || "Erro ao salvar as alterações do cliente.");
    }
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <h1>Carregando Cliente...</h1>
        <p>Aguarde enquanto carregamos os dados para edição.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <h1>Erro</h1>
        <p style={{ color: 'red' }}>{error}</p>
        <button className="btn btn-secondary mt-3" onClick={() => navigate('/clientes')}>Voltar para Lista</button>
      </div>
    );
  }

  // Se não encontrou o cliente (e não houve erro na requisição, mas o retorno foi vazio ou null)
  if (!cliente) {
    return (
      <div className="container mt-4">
        <h1>Cliente Não Encontrado</h1>
        <p>Nenhum cliente com o ID especificado foi encontrado.</p>
        <button className="btn btn-secondary mt-3" onClick={() => navigate('/clientes')}>Voltar para Lista</button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {message && <div className="alert alert-success">{message}</div>}
      <ClienteForm clienteExistente={cliente} onSubmit={handleSubmit} />
      <div className="mt-3">
        <button className="btn btn-secondary" onClick={() => navigate('/clientes')}>
          Voltar para Lista
        </button>
      </div>
    </div>
  );
};

export default ClienteEdicao;