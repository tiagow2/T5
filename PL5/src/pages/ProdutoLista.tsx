// frontend/src/pages/ProdutoLista.tsx
import React, { useEffect, useState } from "react";
import { listarProdutos, excluirProduto } from "../services/ProdutoService";
import { Produto } from "../types/Produto"; // Ou "../types/index"
import { Link } from "react-router-dom";

export default function ProdutoLista() {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  const carregarProdutos = () => {
    listarProdutos()
      .then((res) => setProdutos(res.data))
      .catch((error) => {
        console.error("Erro ao carregar produtos:", error);
        alert("Não foi possível carregar a lista de produtos. Verifique o console para detalhes.");
      });
  };

  const handleExcluir = (id: number | undefined) => {
    if (id && window.confirm("Deseja realmente excluir o produto?")) {
      excluirProduto(id)
        .then(() => {
          alert("Produto excluído com sucesso!");
          carregarProdutos();
        })
        .catch((error) => {
          console.error("Erro ao excluir produto:", error);
          alert("Não foi possível excluir o produto. Verifique o console para detalhes.");
        });
    }
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Produtos e Serviços</h2>
      <Link to="/produtos/cadastro" className="btn btn-success mb-3">Novo Produto/Serviço</Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Preço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.length === 0 ? (
            <tr>
              <td colSpan={4}>Nenhum produto ou serviço cadastrado ainda.</td>
            </tr>
          ) : (
            produtos.map((produto) => (
              <tr key={produto.id}>
                <td>{produto.id}</td>
                <td>{produto.nome}</td>
                <td>R$ {produto.preco.toFixed(2)}</td>
                <td>
                  <Link to={`/produtos/editar/${produto.id}`} className="btn btn-primary btn-sm me-2">Editar</Link>
                  <button className="btn btn-danger btn-sm" onClick={() => handleExcluir(produto.id)}>Excluir</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}