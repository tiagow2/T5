import PetForm from "../components/PetForm";
import { useNavigate, useParams } from "react-router-dom";
import { buscarPet, cadastrarPet, atualizarPet } from "../services/PetService";
import { useEffect, useState } from "react";
import { Pet } from "../types/Pets";

export default function PetFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState<Pet | undefined>();

  useEffect(() => {
    if (id) {
      buscarPet(parseInt(id)).then((res) => setPet(res.data));
    }
  }, [id]);

  const handleSubmit = (pet: Pet) => {
    const operacao = pet.id ? atualizarPet : cadastrarPet;
    operacao(pet).then(() => navigate("/pets"));
  };

  return <PetForm petExistente={pet} onSubmit={handleSubmit} />;
}
