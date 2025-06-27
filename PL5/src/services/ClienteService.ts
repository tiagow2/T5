import axios from "axios";
import { Cliente } from "../types/Cliente";

const API = "http://localhost:32831/cliente";

export function listarClientes() {
  return axios.get<Cliente[]>(`${API}/clientes`);
}

export function buscarCliente(id: number) {
  return axios.get<Cliente>(`${API}/${id}`);
}

export function cadastrarCliente(cliente: Cliente) {
  return axios.post(`${API}/cadastrar`, cliente);
}

export function atualizarCliente(cliente: Cliente) {
  return axios.put(`${API}/atualizar`, cliente);
}

export function excluirCliente(id: number) {
  return axios.delete(`${API}/excluir`, { data: { id } });
}
