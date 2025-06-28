"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.excluir = exports.atualizar = exports.cadastrar = exports.buscarPorId = exports.listar = void 0;
const clientes_1 = require("../data/clientes");
const listar = (_req, res) => {
    res.json(clientes_1.clientes);
};
exports.listar = listar;
const buscarPorId = (req, res) => {
    const id = parseInt(req.params.id);
    const cliente = clientes_1.clientes.find(c => c.id === id);
    if (cliente) {
        res.json(cliente);
    }
    else {
        res.status(404).json({ erro: "Cliente não encontrado" });
    }
};
exports.buscarPorId = buscarPorId;
const cadastrar = (req, res) => {
    const { nome, telefone } = req.body;
    if (!nome || !telefone) {
        return res.status(400).json({ erro: "Nome e telefone são obrigatórios." });
    }
    const id = (0, clientes_1.getProximoIdCliente)();
    const novoCliente = { id, nome, telefone };
    clientes_1.clientes.push(novoCliente);
    res.status(201).json(novoCliente);
};
exports.cadastrar = cadastrar;
const atualizar = (req, res) => {
    const id = parseInt(req.params.id);
    const index = clientes_1.clientes.findIndex(c => c.id === id);
    if (index === -1) {
        return res.status(404).json({ erro: "Cliente não encontrado" });
    }
    const { nome, telefone } = req.body;
    clientes_1.clientes[index] = Object.assign(Object.assign({}, clientes_1.clientes[index]), { nome, telefone });
    res.json(clientes_1.clientes[index]);
};
exports.atualizar = atualizar;
const excluir = (req, res) => {
    const id = parseInt(req.params.id);
    const index = clientes_1.clientes.findIndex(c => c.id === id);
    if (index === -1) {
        return res.status(404).json({ erro: "Cliente não encontrado" });
    }
    clientes_1.clientes.splice(index, 1);
    res.status(204).send();
};
exports.excluir = excluir;
