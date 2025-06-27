import React, { useState, useEffect } from "react";
import { Pet } from "../types/Pets";

interface Props {
  petExistente?: Pet;
  onSubmit: (pet: Pet) => void;
}

const PetForm: React.FC<Props> = ({ petExistente, onSubmit }) => {
  const [pet, setPet] = useState<Pet>({
    nome: "",
    raca: "",
    tipo: "",
    genero: "",
  });

  useEffect(() => {
    if (petExistente) {
      setPet(petExistente);
    }
  }, [petExistente]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPet((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(pet);
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <h2>{petExistente ? "Editar Pet" : "Cadastrar Pet"}</h2>

      <input
        name="nome"
        placeholder="Nome"
        value={pet.nome}
        onChange={handleInputChange}
        className="form-control mb-2"
        required
      />
      <input
        name="raca"
        placeholder="Raça"
        value={pet.raca}
        onChange={handleInputChange}
        className="form-control mb-2"
      />
      <input
        name="tipo"
        placeholder="Tipo"
        value={pet.tipo}
        onChange={handleInputChange}
        className="form-control mb-2"
      />
      <input
        name="genero"
        placeholder="Gênero"
        value={pet.genero}
        onChange={handleInputChange}
        className="form-control mb-2"
      />

      <button type="submit" className="btn btn-primary">
        {petExistente ? "Salvar" : "Cadastrar"}
      </button>
    </form>
  );
};

export default PetForm;
