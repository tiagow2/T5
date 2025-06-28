"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.excluir = exports.atualizar = exports.buscarPorId = exports.cadastrar = exports.listar = void 0;
const produtos_1 = require("../data/produtos");
const listar = (req, res) => {
    res.json(produtos_1.produtos);
};
exports.listar = listar;
const cadastrar = (req, res) => {
    const novoProduto = Object.assign({ id: (0, produtos_1.getProximoIdProduto)() }, req.body);
    if (!novoProduto.nome || novoProduto.preco === undefined || novoProduto.tipo === undefined) {
        return res.status(400).json({ erro: "Nome, preço e tipo do produto/serviço são obrigatórios." });
    }
    if (typeof novoProduto.preco !== 'number' || novoProduto.preco < 0) {
        return res.status(400).json({ erro: "Preço inválido. Deve ser um número não negativo." });
    }
    if (novoProduto.tipo !== "produto" && novoProduto.tipo !== "servico") {
        return res.status(400).json({ erro: "Tipo inválido. Deve ser 'produto' ou 'servico'." });
    }
    produtos_1.produtos.push(novoProduto);
    res.status(201).json(novoProduto);
};
exports.cadastrar = cadastrar;
const buscarPorId = (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ erro: "ID inválido fornecido." });
    }
    const produto = produtos_1.produtos.find((p) => p.id === id);
    if (!produto) {
        return res.status(404).json({ erro: "Produto/Serviço não encontrado" });
    }
    res.json(produto);
};
exports.buscarPorId = buscarPorId;
const atualizar = (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ erro: "ID inválido fornecido." });
    }
    const index = produtos_1.produtos.findIndex((p) => p.id === id);
    if (index === -1) {
        return res.status(404).json({ erro: "Produto/Serviço não encontrado" });
    }
    const dadosAtualizados = req.body;
    if (dadosAtualizados.preco !== undefined && (typeof dadosAtualizados.preco !== 'number' || dadosAtualizados.preco < 0)) {
        return res.status(400).json({ erro: "Preço inválido. Deve ser um número não negativo." });
    }
    if (dadosAtualizados.tipo !== undefined && dadosAtualizados.tipo !== "produto" && dadosAtualizados.tipo !== "servico") {
        return res.status(400).json({ erro: "Tipo inválido. Deve ser 'produto' ou 'servico'." });
    }
    produtos_1.produtos[index] = Object.assign(Object.assign(Object.assign({}, produtos_1.produtos[index]), dadosAtualizados), { id: id });
    res.json(produtos_1.produtos[index]);
};
exports.atualizar = atualizar;
const excluir = (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ erro: "ID inválido fornecido." });
    }
    const index = produtos_1.produtos.findIndex((p) => p.id === id);
    if (index === -1) {
        return res.status(404).json({ erro: "Produto/Serviço não encontrado" });
    }
    produtos_1.produtos.splice(index, 1);
    res.status(204).send();
};
exports.excluir = excluir;
