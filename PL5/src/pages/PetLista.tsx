import { useEffect, useState } from "react";
import { listarPets, excluirPet } from "../services/PetService";
import { Pet } from "../types/Pets"; 
import { Link } from "react-router-dom"; 

export default function PetLista() {
  const [pets, setPets] = useState<Pet[]>([]);

  const carregarPets = () => {
    listarPets()
      .then((res) => setPets(res.data))
      .catch((error) => {
        console.error("Erro ao carregar pets:", error);
        alert("Não foi possível carregar a lista de pets. Verifique o console para detalhes.");
      });
  };


  const handleExcluir = (id: number | undefined) => {
    if (id && window.confirm("Deseja realmente excluir o pet?")) {
      excluirPet(id)
        .then(() => {
          alert("Pet excluído com sucesso!");
          carregarPets(); 
        })
        .catch((error) => {
          console.error("Erro ao excluir pet:", error);
          alert("Não foi possível excluir o pet. Verifique o console para detalhes.");
        });
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
          <li key={pet.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{pet.nome}</strong> ({pet.especie}) - Raça: {pet.raca || 'N/A'} - Cliente ID: {pet.clienteId}
            </div>
            <div className="d-flex gap-2">
              <Link to={`/pets/editar/${pet.id}`} className="btn btn-primary btn-sm">Editar</Link>
              <button className="btn btn-danger btn-sm" onClick={() => handleExcluir(pet.id)}>Excluir</button>
            </div>
          </li>
        ))}
        {pets.length === 0 && (
          <li className="list-group-item">Nenhum pet cadastrado ainda.</li>
        )}
      </ul>
    </div>
  );
}