import axios from "axios";
import { Pet } from "../types/Pets"; 

const API_BASE_URL_PETS = 'http://localhost:8080/pets'; 

export function listarPets() {
  return axios.get<Pet[]>(API_BASE_URL_PETS);
}

export function buscarPet(id: number) {
  return axios.get<Pet>(`${API_BASE_URL_PETS}/${id}`);
}

export function cadastrarPet(pet: Pet) {
  return axios.post(API_BASE_URL_PETS, pet);
}

export function atualizarPet(pet: Pet) {
  return axios.put(`${API_BASE_URL_PETS}/${pet.id}`, pet);
}

export function excluirPet(id: number) {
  return axios.delete(`${API_BASE_URL_PETS}/${id}`);
}