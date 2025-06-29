"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProximoIdProduto = exports.produtos = void 0;
exports.produtos = [
    { id: 1, nome: "Ração Premium Cães", preco: 75.50 },
    { id: 2, nome: "Brinquedo Mordedor", preco: 25.00 },
    { id: 3, nome: "Banho e Tosa", preco: 120.00 },
    { id: 4, nome: "Massagem", preco: 130.00 },
    { id: 5, nome: "Osso", preco: 20.00 },
    { id: 6, nome: "Patinho de borracha", preco: 10.00 }
];
let _proximoIdProduto = exports.produtos.length > 0
    ? Math.max(...exports.produtos.map((p) => p.id || 0)) + 1
    : 1;
const getProximoIdProduto = () => {
    const currentId = _proximoIdProduto;
    _proximoIdProduto++;
    return currentId;
};
exports.getProximoIdProduto = getProximoIdProduto;
