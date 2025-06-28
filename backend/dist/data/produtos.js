"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProximoIdProduto = exports.produtos = void 0;
exports.produtos = [];
let _proximoIdProduto = exports.produtos.length > 0
    ? Math.max(...exports.produtos.map((p) => p.id || 0)) + 1
    : 1;
const getProximoIdProduto = () => {
    const currentId = _proximoIdProduto;
    _proximoIdProduto++;
    return currentId;
};
exports.getProximoIdProduto = getProximoIdProduto;
