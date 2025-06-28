// backend/src/data/pets.ts
import { Pet } from '../types';

export let pets: Pet[] = [
  { id: 1, nome: "Rex", especie: "Cachorro", raca: "Labrador", clienteId: 1 }, // Associado ao Cliente ID 1
  { id: 2, nome: "Mia", especie: "Gato", raca: "Siamês", clienteId: 2 },     // Associado ao Cliente ID 2
  { id: 3, nome: "Mel", especie: "Cachorro", raca: "Poodle", clienteId: 1 }  // Associado ao Cliente ID 1
];

let _proximoIdPet = pets.length > 0
  ? Math.max(...pets.map((p: Pet) => p.id || 0)) + 1
  : 1;

export const getProximoIdPet = (): number => {
  const currentId = _proximoIdPet;
  _proximoIdPet++;
  return currentId;
};