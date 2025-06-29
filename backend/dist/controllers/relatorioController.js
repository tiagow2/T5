"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTop5ClientesValor = exports.getItensMaisConsumidos = exports.getTop10ClientesQuantidade = void 0;
const clientes_1 = require("../data/clientes");
const produtos_1 = require("../data/produtos");
const consumos_1 = require("../data/consumos");
const getTop10ClientesQuantidade = (req, res) => {
    const contagemConsumo = consumos_1.consumos.reduce((acc, consumo) => {
        const id = consumo.clienteId;
        acc[id] = (acc[id] || 0) + consumo.quantidade;
        return acc;
    }, {});
    const clientesComContagem = Object.keys(contagemConsumo).map(idStr => {
        const id = parseInt(idStr, 10);
        const cliente = clientes_1.clientes.find(c => c.id === id);
        return {
            id: id,
            nome: cliente ? cliente.nome : 'Cliente Desconhecido',
            quantidade: contagemConsumo[id]
        };
    });
    const clientesOrdenados = clientesComContagem.sort((a, b) => b.quantidade - a.quantidade);
    const top10 = clientesOrdenados.slice(0, 10);
    res.status(200).json(top10);
};
exports.getTop10ClientesQuantidade = getTop10ClientesQuantidade;
const getItensMaisConsumidos = (req, res) => {
    const contagem = {};
    consumos_1.consumos.forEach((consumo) => {
        if (consumo.produtoId) {
            const itemId = `produto-${consumo.produtoId}`;
            contagem[itemId] = (contagem[itemId] || 0) + consumo.quantidade;
        }
    });
    const itensComContagem = Object.keys(contagem).map(itemId => {
        const [tipo, idStr] = itemId.split('-');
        const id = parseInt(idStr, 10);
        const item = produtos_1.produtos.find(p => p.id === id);
        const nome = item ? item.nome : 'Produto não encontrado';
        return {
            id: id,
            nome: nome,
            tipo: tipo,
            quantidade: contagem[itemId]
        };
    });
    const itensOrdenados = itensComContagem.sort((a, b) => b.quantidade - a.quantidade);
    res.status(200).json(itensOrdenados);
};
exports.getItensMaisConsumidos = getItensMaisConsumidos;
const getTop5ClientesValor = (req, res) => {
    const valorPorCliente = {};
    consumos_1.consumos.forEach(consumo => {
        let valorTotalConsumo = 0;
        if (consumo.produtoId) {
            const produto = produtos_1.produtos.find(p => p.id === consumo.produtoId);
            if (produto) {
                valorTotalConsumo += produto.preco * consumo.quantidade;
            }
        }
        valorPorCliente[consumo.clienteId] = (valorPorCliente[consumo.clienteId] || 0) + valorTotalConsumo;
    });
    const clientesComValor = Object.keys(valorPorCliente).map(clienteIdStr => {
        const clienteId = parseInt(clienteIdStr);
        const cliente = clientes_1.clientes.find(c => c.id === clienteId);
        return {
            id: clienteId,
            nome: cliente ? cliente.nome : 'Cliente Desconhecido',
            valorTotal: valorPorCliente[clienteId]
        };
    });
    const clientesOrdenados = clientesComValor.sort((a, b) => b.valorTotal - a.valorTotal);
    const top5 = clientesOrdenados.slice(0, 5);
    res.status(200).json(top5);
};
exports.getTop5ClientesValor = getTop5ClientesValor;
