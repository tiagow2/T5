import React, { useState, useEffect } from "react";
import { Pet } from "../types/Pets"; 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { cadastrarPet, atualizarPet } from '../services/PetService'; 

interface Props {
  petExistente?: Pet; 
  onSubmit: (pet: Pet) => void;
}

interface PetFormState {
  id?: number | ''; 
  nome: string;
  especie: string;
  raca?: string; 
  idade?: number | ''; 
  clienteId: number | ''; 
}

const PetForm: React.FC<Props> = ({ petExistente, onSubmit }) => {
  const [pet, setPet] = useState<PetFormState>(
    petExistente 
      ? { 
          id: petExistente.id, 
          nome: petExistente.nome,
          especie: petExistente.especie,
          raca: petExistente.raca || '',
          idade: petExistente.idade || '', 
          clienteId: petExistente.clienteId || '', 
        }
      : { 
          nome: "",
          especie: "",
          raca: "",
          idade: "",
          clienteId: "",
        }
  );

  useEffect(() => {
    if (petExistente) {
      setPet({
        id: petExistente.id,
        nome: petExistente.nome,
        especie: petExistente.especie,
        raca: petExistente.raca || '',
        idade: petExistente.idade || '',
        clienteId: petExistente.clienteId || '',
      });
    }
  }, [petExistente]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPet((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const petToSubmit: Pet = {
      id: typeof pet.id === 'string' && pet.id === '' ? undefined : Number(pet.id),
      nome: pet.nome,
      especie: pet.especie,
      raca: pet.raca === '' ? undefined : pet.raca,
      idade: typeof pet.idade === 'string' && pet.idade === '' ? undefined : Number(pet.idade),
      clienteId: Number(pet.clienteId)
    };

    if (isNaN(petToSubmit.clienteId) || petToSubmit.clienteId <= 0) {
        alert("Por favor, insira um ID de Cliente válido (um número inteiro maior que 0).");
        return; 
    }

    try {
      let response;
      if (petExistente && petToSubmit.id) { 
        response = await atualizarPet(petToSubmit);
        alert("Pet atualizado com sucesso!");
      } else {
        const petForCadastro = {
          nome: petToSubmit.nome,
          especie: petToSubmit.especie,
          raca: petToSubmit.raca,
          idade: petToSubmit.idade,
          clienteId: petToSubmit.clienteId,
        };
        response = await cadastrarPet(petForCadastro);
        alert("Pet cadastrado com sucesso!");
        setPet({ nome: "", especie: "", raca: "", idade: "", clienteId: "" });
      }
      onSubmit(response.data);
    } catch (error: any) {
      console.error("Erro ao processar pet:", error);
      if (error.response && error.response.status === 400 && error.response.data && error.response.data.erro) {
          alert(`Erro no cadastro/atualização: ${error.response.data.erro}`);
      } else {
          alert("Ocorreu um erro ao salvar o pet. Verifique o console para mais detalhes.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <h2>{petExistente ? "Editar Pet" : "Cadastrar Pet"}</h2>

      {}
      {petExistente && (
        <input 
          type="number" 
          name="id"
          placeholder="ID"
          value={pet.id}
          onChange={handleInputChange}
          className="form-control mb-2"
          readOnly 
        />
      )}

      <input
        type="text" 
        name="nome"
        placeholder="Nome"
        value={pet.nome}
        onChange={handleInputChange}
        className="form-control mb-2"
        required
      />

      <input
        type="text" 
        name="especie"
        placeholder="Espécie"
        value={pet.especie}
        onChange={handleInputChange}
        className="form-control mb-2"
        required 
      />

      <input
        type="text" 
        name="raca"
        placeholder="Raça"
        value={pet.raca}
        onChange={handleInputChange}
        className="form-control mb-2"
      />
    
      <input
        type="number" 
        name="idade"
        placeholder="Idade"
        value={pet.idade}
        onChange={handleInputChange}
        className="form-control mb-2"
      />

      <input
        type="number" 
        name="clienteId"
        placeholder="ID do Cliente" 
        value={pet.clienteId}
        onChange={handleInputChange}
        className="form-control mb-2"
        required 
      />

      <button type="submit" className="btn btn-primary">
        {petExistente ? "Salvar" : "Cadastrar"}
      </button>
    </form>
  );
};

export default PetForm;