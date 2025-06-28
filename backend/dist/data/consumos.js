"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProximoIdConsumo = exports.consumos = void 0;
exports.consumos = [];
let _proximoIdConsumo = exports.consumos.length > 0
    ? Math.max(...exports.consumos.map((c) => c.id || 0)) + 1
    : 1;
const getProximoIdConsumo = () => {
    const currentId = _proximoIdConsumo;
    _proximoIdConsumo++;
    return currentId;
};
exports.getProximoIdConsumo = getProximoIdConsumo;
