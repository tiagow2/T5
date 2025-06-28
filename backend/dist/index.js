"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const clienteRoutes_1 = __importDefault(require("./routes/clienteRoutes"));
const produtoRoutes_1 = __importDefault(require("./routes/produtoRoutes"));
const consumoRoutes_1 = __importDefault(require("./routes/consumoRoutes"));
const petRoutes_1 = __importDefault(require("./routes/petRoutes"));
const app = (0, express_1.default)();
const PORT = 8080;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Rotas da API
app.use("/clientes", clienteRoutes_1.default);
app.use("/produtos", produtoRoutes_1.default);
app.use("/consumos", consumoRoutes_1.default);
app.use("/pets", petRoutes_1.default); // <-- NOVA LINHA
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
