// src/index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // <-- Importa o App que agora contém todas as rotas
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
// import AppRoutes from "./routes/AppRoutes"; // <-- REMOVA ou COMENTE esta linha

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <App /> {/* <-- RENDERIZA APENAS SEU APP AQUI */}
  </React.StrictMode>
);