// src/index.ts
import express from "express";
import cors from "cors";
import clienteRoutes from "./routes/clienteRoutes";
import produtoRoutes from "./routes/produtoRoutes";
import consumoRoutes from "./routes/consumoRoutes";
import petRoutes from "./routes/petRoutes";

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

// Rotas da API
app.use("/clientes", clienteRoutes);
app.use("/produtos", produtoRoutes);
app.use("/consumos", consumoRoutes);
app.use("/pets", petRoutes); // <-- NOVA LINHA

// Rota de teste simples
app.get("/", (req, res) => {
  res.send("API C4P rodando! Acesse /clientes, /produtos, /consumos, /pets"); // <-- ATUALIZADO
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Rotas disponíveis:`);
  console.log(`- http://localhost:${PORT}/clientes`);
  console.log(`- http://localhost:${PORT}/produtos`);
  console.log(`- http://localhost:${PORT}/consumos`);
  console.log(`- http://localhost:${PORT}/pets`); // <-- NOVA LINHA
});