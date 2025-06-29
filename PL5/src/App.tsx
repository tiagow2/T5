// frontend/src/App.tsx
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import ClienteLista from "./pages/ClienteLista";
import ClienteCadastro from "./pages/ClienteCadastro";
import ClienteEdicao from "./pages/ClienteEdicao";
import PetLista from "./pages/PetLista";
import PetForm from "./pages/PetForm";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProdutoLista from "./pages/ProdutoLista";
import ProdutoForm from "./pages/ProdutoForm";
import RelatorioTopClientes from "./pages/RelatorioTopClientes";
import RelatorioMaisConsumidos from "./pages/RelatorioMaisConsumidos";
import RelatorioTopClientesValor from "./pages/RelatorioTopClientesValor";


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
        <Route path="/pets/novo" element={<PetForm />} />
        <Route path="/pets/editar/:id" element={<PetForm />} />
        <Route path="/produtos" element={<ProdutoLista />} />
        <Route path="/produtos/cadastro" element={<ProdutoForm />} />
        <Route path="/produtos/editar/:id" element={<ProdutoForm />} />
        <Route path="/relatorios/top-clientes" element={<RelatorioTopClientes />} />
        <Route path="/relatorios/mais-consumidos" element={<RelatorioMaisConsumidos />} />
        <Route path="/relatorios/top-clientes-valor" element={<RelatorioTopClientesValor />} />
      </Routes>
    </Router>
  );
}

export default App;