// src/index.ts
import express from "express";
import cors from "cors";
import clienteRoutes from "./routes/clienteRoutes";
import produtoRoutes from "./routes/produtoRoutes";
import consumoRoutes from "./routes/consumoRoutes";
import petRoutes from "./routes/petRoutes";
import relatorioRoutes from './routes/relatiorioRoutes';


const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());
app.use("/clientes", clienteRoutes);
app.use("/produtos", produtoRoutes);
app.use("/consumos", consumoRoutes);
app.use("/pets", petRoutes); 
app.use('/relatorios', relatorioRoutes);
app.get("/", (req, res) => {
  res.send("API C4P rodando! Acesse /clientes, /produtos, /consumos, /pets"); 
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Rotas disponíveis:`);
  console.log(`- http://localhost:${PORT}/clientes`);
  console.log(`- http://localhost:${PORT}/produtos`);
  console.log(`- http://localhost:${PORT}/consumos`);
  console.log(`- http://localhost:${PORT}/pets`); 
});