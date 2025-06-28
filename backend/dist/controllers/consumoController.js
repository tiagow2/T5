"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.excluir = exports.atualizar = exports.buscarPorId = exports.cadastrar = exports.listar = void 0;
// 🌟🌟🌟 CORREÇÃO DE IMPORTS: Use imports nomeados ({}) 🌟🌟🌟
const consumos_1 = require("../data/consumos");
const clientes_1 = require("../data/clientes");
const produtos_1 = require("../data/produtos");
const listar = (req, res) => {
    res.json(consumos_1.consumos);
};
exports.listar = listar;
const cadastrar = (req, res) => {
    // 🌟🌟🌟 VALIDAÇÃO E TIPAGEM SEGURA DE clienteId e produtoId do req.body 🌟🌟🌟
    const { clienteId: clienteIdRaw, produtoId: produtoIdRaw, quantidade, data } = req.body;
    let clienteId;
    let produtoId;
    // Validação de clienteId
    if (clienteIdRaw === undefined || clienteIdRaw === null) {
        return res.status(400).json({ erro: "ID do cliente é obrigatório." });
    }
    const parsedClienteId = parseInt(clienteIdRaw);
    if (isNaN(parsedClienteId)) {
        return res.status(400).json({ erro: "ID do cliente inválido." });
    }
    clienteId = parsedClienteId;
    // Validação de produtoId
    if (produtoIdRaw === undefined || produtoIdRaw === null) {
        return res.status(400).json({ erro: "ID do produto é obrigatório." });
    }
    const parsedProdutoId = parseInt(produtoIdRaw);
    if (isNaN(parsedProdutoId)) {
        return res.status(400).json({ erro: "ID do produto inválido." });
    }
    produtoId = parsedProdutoId;
    // Validação da existência do cliente
    // 🌟🌟🌟 TIPAGEM EXPLÍCITA DE 'c: Cliente' 🌟🌟🌟
    const clienteExiste = clientes_1.clientes.some((c) => c.id === clienteId);
    if (!clienteExiste) {
        return res.status(400).json({ erro: "Cliente associado não encontrado." });
    }
    // Validação da existência do produto (assumindo que você tem um array 'produtos' em 'data/produtos.ts')
    // 🌟🌟🌟 TIPAGEM EXPLÍCITA DE 'p: Produto' 🌟🌟🌟
    const produtoExiste = produtos_1.produtos.some((p) => p.id === produtoId);
    if (!produtoExiste) {
        return res.status(400).json({ erro: "Produto associado não encontrado." });
    }
    // 🌟🌟🌟 GERAÇÃO DE ID DO CONSUMO USANDO A FUNÇÃO getProximoIdConsumo() 🌟🌟🌟
    const novoConsumo = {
        id: (0, consumos_1.getProximoIdConsumo)(),
        clienteId,
        produtoId,
        quantidade,
        data // Assumindo que 'data' vem em um formato válido
    };
    consumos_1.consumos.push(novoConsumo);
    res.status(201).json(novoConsumo);
};
exports.cadastrar = cadastrar;
const buscarPorId = (req, res) => {
    const id = parseInt(req.params.id);
    // 🌟🌟🌟 VALIDAÇÃO DE ID DA URL 🌟🌟🌟
    if (isNaN(id)) {
        return res.status(400).json({ erro: "ID inválido fornecido." });
    }
    // 🌟🌟🌟 TIPAGEM EXPLÍCITA DE 'c: Consumo' 🌟🌟🌟
    const consumo = consumos_1.consumos.find((c) => c.id === id);
    if (!consumo) {
        return res.status(404).json({ erro: "Consumo não encontrado" });
    }
    res.json(consumo);
};
exports.buscarPorId = buscarPorId;
const atualizar = (req, res) => {
    const id = parseInt(req.params.id);
    // 🌟🌟🌟 VALIDAÇÃO DE ID DA URL 🌟🌟🌟
    if (isNaN(id)) {
        return res.status(400).json({ erro: "ID inválido fornecido." });
    }
    // 🌟🌟🌟 TIPAGEM EXPLÍCITA DE 'c: Consumo' 🌟🌟🌟
    const index = consumos_1.consumos.findIndex((c) => c.id === id);
    if (index === -1) {
        return res.status(404).json({ erro: "Consumo não encontrado" });
    }
    const { clienteId: clienteIdRaw, produtoId: produtoIdRaw, quantidade, data } = req.body;
    let clienteIdParaAtualizar;
    let produtoIdParaAtualizar;
    // Validação e obtenção de clienteId para atualização
    if (clienteIdRaw !== undefined && clienteIdRaw !== null) {
        const parsedId = parseInt(clienteIdRaw);
        if (isNaN(parsedId)) {
            return res.status(400).json({ erro: "ID do cliente associado inválido." });
        }
        clienteIdParaAtualizar = parsedId;
    }
    else {
        clienteIdParaAtualizar = consumos_1.consumos[index].clienteId; // Mantém o ID existente
    }
    // Validação e obtenção de produtoId para atualização
    if (produtoIdRaw !== undefined && produtoIdRaw !== null) {
        const parsedId = parseInt(produtoIdRaw);
        if (isNaN(parsedId)) {
            return res.status(400).json({ erro: "ID do produto associado inválido." });
        }
        produtoIdParaAtualizar = parsedId;
    }
    else {
        produtoIdParaAtualizar = consumos_1.consumos[index].produtoId; // Mantém o ID existente
    }
    // Validação da existência do cliente (se um clienteId válido foi determinado)
    if (clienteIdParaAtualizar !== undefined) {
        // 🌟🌟🌟 TIPAGEM EXPLÍCITA DE 'c: Cliente' 🌟🌟🌟
        const clienteExiste = clientes_1.clientes.some((c) => c.id === clienteIdParaAtualizar);
        if (!clienteExiste) {
            return res.status(400).json({ erro: "Cliente associado não encontrado." });
        }
    }
    // Validação da existência do produto (se um produtoId válido foi determinado)
    if (produtoIdParaAtualizar !== undefined) {
        // 🌟🌟🌟 TIPAGEM EXPLÍCITA DE 'p: Produto' 🌟🌟🌟
        const produtoExiste = produtos_1.produtos.some((p) => p.id === produtoIdParaAtualizar);
        if (!produtoExiste) {
            return res.status(400).json({ erro: "Produto associado não encontrado." });
        }
    }
    // Cria o objeto atualizado, garantindo que o id do consumo original seja mantido
    consumos_1.consumos[index] = Object.assign(Object.assign(Object.assign({}, consumos_1.consumos[index]), req.body), { id: id, clienteId: clienteIdParaAtualizar, produtoId: produtoIdParaAtualizar, quantidade: quantidade !== undefined ? quantidade : consumos_1.consumos[index].quantidade, data: data !== undefined ? data : consumos_1.consumos[index].data });
    res.json(consumos_1.consumos[index]);
};
exports.atualizar = atualizar;
const excluir = (req, res) => {
    const id = parseInt(req.params.id);
    // 🌟🌟🌟 VALIDAÇÃO DE ID DA URL 🌟🌟🌟
    if (isNaN(id)) {
        return res.status(400).json({ erro: "ID inválido fornecido." });
    }
    // 🌟🌟🌟 TIPAGEM EXPLÍCITA DE 'c: Consumo' 🌟🌟🌟
    const index = consumos_1.consumos.findIndex((c) => c.id === id);
    if (index === -1) {
        return res.status(404).json({ erro: "Consumo não encontrado" });
    }
    consumos_1.consumos.splice(index, 1);
    res.status(204).send();
};
exports.excluir = excluir;
