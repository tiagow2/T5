"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProximoIdConsumo = exports.consumos = void 0;
exports.consumos = [
    { id: 1, clienteId: 1, produtoId: 1, quantidade: 3 },
    { id: 2, clienteId: 2, produtoId: 5, quantidade: 2 },
    { id: 3, clienteId: 3, produtoId: 3, quantidade: 5 },
    { id: 4, clienteId: 4, produtoId: 2, quantidade: 5 },
    { id: 5, clienteId: 5, produtoId: 1, quantidade: 6 },
    { id: 6, clienteId: 6, produtoId: 4, quantidade: 4 },
    { id: 7, clienteId: 7, produtoId: 5, quantidade: 7 },
    { id: 8, clienteId: 8, produtoId: 1, quantidade: 9 },
    { id: 9, clienteId: 9, produtoId: 3, quantidade: 5 },
    { id: 10, clienteId: 10, produtoId: 6, quantidade: 10 },
];
let _proximoIdConsumo = exports.consumos.length > 0
    ? Math.max(...exports.consumos.map((c) => c.id || 0)) + 1
    : 1;
const getProximoIdConsumo = () => {
    const currentId = _proximoIdConsumo;
    _proximoIdConsumo++;
    return currentId;
};
exports.getProximoIdConsumo = getProximoIdConsumo;
