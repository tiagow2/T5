import { Cliente } from '../types';

export let clientes: Cliente[] = [
  { id: 1, nome: "Tiago dos Santos Freitas", telefone: "11987654321" },
];

let _proximoIdCliente = clientes.length > 0
  ? Math.max(...clientes.map((c: Cliente) => c.id || 0)) + 1
  : 1;

export const getProximoIdCliente = (): number => {
    const currentId = _proximoIdCliente;
    _proximoIdCliente++;
    return currentId;
};