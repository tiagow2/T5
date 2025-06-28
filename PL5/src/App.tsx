// frontend/src/App.tsx
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import ClienteLista from "./pages/ClienteLista";
import ClienteCadastro from "./pages/ClienteCadastro";
import ClienteEdicao from "./pages/ClienteEdicao";
import PetLista from "./pages/PetLista";
import PetForm from "./pages/PetForm";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProdutoLista from "./pages/ProdutoLista"; // <-- Importe
import ProdutoForm from "./pages/ProdutoForm";   // <-- Importe

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clientes" element={<ClienteLista />} />
        <Route path="/clientes/cadastro" element={<ClienteCadastro />} />
        <Route path="/clientes/editar/:id" element={<ClienteEdicao />} />

        <Route path="/pets" element={<PetLista />} />
        <Route path="/pets/novo" element={<PetForm />} /> {/* Rota para o formulário de novo pet */}
        <Route path="/pets/editar/:id" element={<PetForm />} />

        {/* Novas Rotas de Produtos */}
        <Route path="/produtos" element={<ProdutoLista />} />
        <Route path="/produtos/cadastro" element={<ProdutoForm />} />
        <Route path="/produtos/editar/:id" element={<ProdutoForm />} />
      </Routes>
    </Router>
  );
}

export default App;