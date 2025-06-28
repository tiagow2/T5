"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProximoIdPet = exports.pets = void 0;
exports.pets = [
    { id: 1, nome: "Rex", especie: "Cachorro", raca: "Labrador", clienteId: 1 }, // Associado ao Cliente ID 1
    { id: 2, nome: "Mia", especie: "Gato", raca: "Siamês", clienteId: 2 }, // Associado ao Cliente ID 2
    { id: 3, nome: "Mel", especie: "Cachorro", raca: "Poodle", clienteId: 1 } // Associado ao Cliente ID 1
];
let _proximoIdPet = exports.pets.length > 0
    ? Math.max(...exports.pets.map((p) => p.id || 0)) + 1
    : 1;
const getProximoIdPet = () => {
    const currentId = _proximoIdPet;
    _proximoIdPet++;
    return currentId;
};
exports.getProximoIdPet = getProximoIdPet;
