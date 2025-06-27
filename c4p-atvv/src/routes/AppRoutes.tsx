import { Routes, Route } from "react-router-dom";
import ClienteLista from "../pages/ClienteLista";
import ClienteCadastro from "../pages/ClienteCadastro";
import Home from "../pages/Home";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/clientes" element={<ClienteLista />} />
      <Route path="/clientes/novo" element={<ClienteCadastro />} />
      {/* Depois: Pets */}
    </Routes>
  );
}
