"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.excluir = exports.atualizar = exports.buscarPorId = exports.cadastrar = exports.listar = void 0;
const pets_1 = require("../data/pets");
const clientes_1 = require("../data/clientes");
const listar = (req, res) => {
    res.json(pets_1.pets);
};
exports.listar = listar;
const cadastrar = (req, res) => {
    const clienteIdRaw = req.body.clienteId;
    let clienteId;
    if (clienteIdRaw === undefined || clienteIdRaw === null) {
        return res.status(400).json({ erro: "ID do cliente associado é obrigatório." });
    }
    const parsedId = parseInt(clienteIdRaw);
    if (isNaN(parsedId)) {
        return res.status(400).json({ erro: "ID do cliente associado inválido." });
    }
    clienteId = parsedId;
    const clienteExiste = clientes_1.clientes.some((c) => c.id === clienteId);
    if (!clienteExiste) {
        return res.status(400).json({ erro: "Cliente associado não encontrado." });
    }
    const novoPet = Object.assign(Object.assign({ id: (0, pets_1.getProximoIdPet)() }, req.body), { clienteId: clienteId });
    pets_1.pets.push(novoPet);
    res.status(201).json(novoPet);
};
exports.cadastrar = cadastrar;
const buscarPorId = (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ erro: "ID inválido fornecido." });
    }
    const pet = pets_1.pets.find((p) => p.id === id);
    if (!pet) {
        return res.status(404).json({ erro: "Pet não encontrado." });
    }
    res.json(pet);
};
exports.buscarPorId = buscarPorId;
const atualizar = (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ erro: "ID inválido fornecido." });
    }
    const index = pets_1.pets.findIndex((p) => p.id === id);
    if (index === -1) {
        return res.status(404).json({ erro: "Pet não encontrado." });
    }
    const clienteIdRaw = req.body.clienteId;
    let clienteIdParaAtualizar;
    if (clienteIdRaw !== undefined && clienteIdRaw !== null) {
        const parsedId = parseInt(clienteIdRaw);
        if (isNaN(parsedId)) {
            return res.status(400).json({ erro: "ID do cliente associado inválido." });
        }
        clienteIdParaAtualizar = parsedId;
    }
    else {
        clienteIdParaAtualizar = pets_1.pets[index].clienteId;
    }
    if (clienteIdParaAtualizar !== undefined) {
        const clienteExiste = clientes_1.clientes.some((c) => c.id === clienteIdParaAtualizar);
        if (!clienteExiste) {
            return res.status(400).json({ erro: "Cliente associado não encontrado." });
        }
    }
    pets_1.pets[index] = Object.assign(Object.assign(Object.assign({}, pets_1.pets[index]), req.body), { id: id, clienteId: clienteIdParaAtualizar });
    res.json(pets_1.pets[index]);
};
exports.atualizar = atualizar;
const excluir = (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ erro: "ID inválido fornecido." });
    }
    const index = pets_1.pets.findIndex((p) => p.id === id);
    if (index === -1) {
        return res.status(404).json({ erro: "Pet não encontrado" });
    }
    pets_1.pets.splice(index, 1);
    res.status(204).send();
};
exports.excluir = excluir;
