// frontend/src/services/ProdutoService.ts
import axios from "axios";
import { Produto } from "../types/Produto"; // Ou "../types/index"

const API_BASE_URL_PRODUTOS = 'http://localhost:8080/produtos';

export function listarProdutos() {
  return axios.get<Produto[]>(API_BASE_URL_PRODUTOS);
}

export function buscarProduto(id: number) {
  return axios.get<Produto>(`${API_BASE_URL_PRODUTOS}/${id}`);
}

export function cadastrarProduto(produto: Produto) {
  return axios.post(API_BASE_URL_PRODUTOS, produto);
}

export function atualizarProduto(produto: Produto) {
  return axios.put(`${API_BASE_URL_PRODUTOS}/${produto.id}`, produto);
}

export function excluirProduto(id: number) {
  return axios.delete(`${API_BASE_URL_PRODUTOS}/${id}`);
}