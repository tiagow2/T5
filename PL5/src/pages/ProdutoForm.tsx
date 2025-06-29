// frontend/src/pages/ProdutoForm.tsx

import React, { useState } from 'react';
import axios, { AxiosError } from 'axios'; 
import * as ProdutoService from '../services/ProdutoService';

function ProdutoForm() {
    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState('');
    const [tipo, setTipo] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!nome || !preco || !tipo) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }
        const precoNumero = parseFloat(preco);
        if (isNaN(precoNumero)) {
            alert('O preço deve ser um número válido.');
            return;
        }

        const produto = {
            nome: nome,
            preco: precoNumero,
            tipo: tipo
        };

        try {
            await ProdutoService.cadastrarProduto(produto);
            alert('Produto cadastrado com sucesso!');
            setNome('');
            setPreco('');
            setTipo('');
        } catch (error) {
            console.error('Erro ao cadastrar produto:', error);

            if (axios.isAxiosError(error)) {
                if (error.response && error.response.data && error.response.data.erro) {
                    alert(`Erro do servidor: ${error.response.data.erro}`);
                } else {
                    alert('Ocorreu um erro de rede. Tente novamente.');
                }
            } else {
                alert('Ocorreu um erro inesperado. Verifique o console.');
            }
        }
    };

    return (
  <div className="container mt-4">
    <h2>Cadastrar Produto ou Serviço</h2>
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Nome</label>
        <input
          type="text"
          className="form-control"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Preço</label>
        <input
          type="number"
          step="0.01"
          className="form-control"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Tipo</label>
        <input
          type="text"
          className="form-control"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary">Cadastrar</button>
    </form>
  </div>
);

}

export default ProdutoForm;