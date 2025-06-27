import { useEffect, useState } from "react";
import { listarPets, excluirPet } from "../services/PetService";
import { Pet } from "../types/Pets";
import { Link } from "react-router-dom";

export default function PetLista() {
  const [pets, setPets] = useState<Pet[]>([]);

  const carregarPets = () => {
    listarPets()
      .then((res) => setPets(res.data))
      .catch(console.error);
  };

  const handleExcluir = (id: number | undefined) => {
    if (id && window.confirm("Deseja excluir o pet?")) {
      excluirPet(id).then(() => carregarPets());
    }
  };

  useEffect(() => {
    carregarPets();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Pets</h2>
      <Link to="/pets/novo" className="btn btn-success mb-3">Novo Pet</Link>
      <ul className="list-group">
        {pets.map((pet) => (
          <li key={pet.id} className="list-group-item d-flex justify-content-between">
            <div>
              <strong>{pet.nome}</strong> ({pet.tipo}) - {pet.raca} - Dono: {pet.dono?.nome}
            </div>
            <div className="d-flex gap-2">
              <Link to={`/pets/${pet.id}`} className="btn btn-primary">Editar</Link>
              <button className="btn btn-danger" onClick={() => handleExcluir(pet.id)}>Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}