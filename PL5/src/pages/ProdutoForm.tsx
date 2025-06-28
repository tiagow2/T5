// frontend/src/pages/ProdutoForm.tsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { cadastrarProduto, buscarProduto, atualizarProduto } from "../services/ProdutoService";
import { Produto } from "../types/Produto";

export default function ProdutoForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  // Inicialize o preço como uma string vazia para o input, ou 0 se for para o objeto Produto
  // Vamos inicializar como um objeto Produto com valores padrão para facilitar o envio.
  const [produto, setProduto] = useState<Produto>({ nome: "", preco: 0 }); // Mantemos 0 como número padrão
  const [precoInput, setPrecoInput] = useState<string>(""); // Novo estado para controlar o input do preço como string

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEditing = id !== undefined;

  useEffect(() => {
    if (isEditing) {
      setLoading(true);
      buscarProduto(parseInt(id as string)) // Adicionado 'as string' para tipagem
        .then((res) => {
          setProduto(res.data);
          setPrecoInput(res.data.preco ? res.data.preco.toString() : ""); // Preenche o input do preço
          setLoading(false);
        })
        .catch((err) => {
          console.error("Erro ao buscar produto para edição:", err);
          setError("Erro ao carregar produto para edição.");
          setLoading(false);
        });
    } else {
      // Para cadastro, resetar o formulário
      setProduto({ nome: "", preco: 0 });
      setPrecoInput("");
    }
  }, [id, isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "preco") {
      // Atualiza o estado da string do input do preço
      setPrecoInput(value);

      // Converte para número, mas lida com string vazia
      const parsedValue = parseFloat(value);
      if (!isNaN(parsedValue)) {
        setProduto((prev) => ({
          ...prev,
          preco: parsedValue,
        }));
      } else {
        // Se for NaN (ex: string vazia), podemos definir como 0 ou null,
        // dependendo de como seu backend prefere valores ausentes.
        // Para preço, 0 geralmente é aceitável, ou você pode impedir o envio.
        setProduto((prev) => ({
          ...prev,
          preco: 0, // Ou o valor padrão que você quer para preço inválido/vazio
        }));
      }
    } else {
      setProduto((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Validação adicional antes de enviar:
    if (produto.preco === undefined || isNaN(produto.preco) || produto.preco < 0) {
      setError("O preço deve ser um número válido e não negativo.");
      setLoading(false);
      return;
    }
    if (!produto.nome.trim()) {
      setError("O nome do produto é obrigatório.");
      setLoading(false);
      return;
    }


    if (isEditing) {
      atualizarProduto(produto)
        .then(() => {
          alert("Produto atualizado com sucesso!");
          navigate("/produtos");
        })
        .catch((err) => {
          console.error("Erro ao atualizar produto:", err);
          setError("Erro ao atualizar produto. Verifique o console.");
        })
        .finally(() => setLoading(false));
    } else {
      cadastrarProduto(produto)
        .then(() => {
          alert("Produto cadastrado com sucesso!");
          navigate("/produtos");
        })
        .catch((err) => {
          console.error("Erro ao cadastrar produto:", err);
          setError("Erro ao cadastrar produto. Verifique o console.");
        })
        .finally(() => setLoading(false));
    }
  };

  if (loading && isEditing) return <div className="container mt-4">Carregando produto...</div>;
  if (error) return <div className="container mt-4 text-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <h2>{isEditing ? "Editar Produto/Serviço" : "Cadastrar Novo Produto/Serviço"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nome" className="form-label">Nome:</label>
          <input
            type="text"
            className="form-control"
            id="nome"
            name="nome"
            value={produto.nome}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="preco" className="form-label">Preço:</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            id="preco"
            name="preco"
            value={precoInput} // Use o novo estado para o valor do input
            onChange={handleChange}
            required // Remova 'required' se você permitir que o campo seja vazio inicialmente
          />
        </div>
        <button type="submit" className="btn btn-success" disabled={loading}>
          {loading ? "Salvando..." : (isEditing ? "Atualizar" : "Cadastrar")}
        </button>
        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate("/produtos")}>
          Cancelar
        </button>
      </form>
    </div>
  );
}