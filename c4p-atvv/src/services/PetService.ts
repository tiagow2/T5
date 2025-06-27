import axios from "axios";
import { Pet } from "../types/Pets";

const API = "http://localhost:32831/pet";

export function listarPets() {
  return axios.get<Pet[]>(`${API}/pets`);
}

export function buscarPet(id: number) {
  return axios.get<Pet>(`${API}/${id}`);
}

export function cadastrarPet(pet: Pet) {
  return axios.post(`${API}/cadastrar`, pet);
}

export function atualizarPet(pet: Pet) {
  return axios.put(`${API}/atualizar`, pet);
}

export function excluirPet(id: number) {
  return axios.delete(`${API}/excluir`, { data: { id } });
}
