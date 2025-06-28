"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProximoIdCliente = exports.clientes = void 0;
exports.clientes = [
    { id: 1, nome: "Tiago dos Santos Freitas", telefone: "11987654321" },
];
let _proximoIdCliente = exports.clientes.length > 0
    ? Math.max(...exports.clientes.map((c) => c.id || 0)) + 1
    : 1;
const getProximoIdCliente = () => {
    const currentId = _proximoIdCliente;
    _proximoIdCliente++;
    return currentId;
};
exports.getProximoIdCliente = getProximoIdCliente;
