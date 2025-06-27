import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import ClienteLista from "./pages/ClienteLista";
import ClienteForm from "./pages/ClienteFormPage";
import PetLista from "./pages/PetLista";
import PetForm from "./pages/PetForm";
import Navbar from "./components/NavBar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/clientes" />} />
        <Route path="/clientes" element={<ClienteLista />} />
        <Route path="/clientes/novo" element={<ClienteForm />} />
        <Route path="/clientes/editar/:id" element={<ClienteForm />} />
        <Route path="/pets" element={<PetLista />} />
        <Route path="/pets/novo" element={<PetForm />} />
        <Route path="/pets/editar/:id" element={<PetForm />} />
      </Routes>
    </Router>
  );
}

export default App;