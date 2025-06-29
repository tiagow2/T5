import { Cliente } from '../types';

export let clientes: Cliente[] = [
  { id: 1, nome: "Tiago dos Santos Freitas", telefone: "11987654321" },
  { id: 2, nome: "Livia dos Santos Freitas", telefone: "12354234523" },
  { id: 3, nome: "Larissa dos Santos Freitas", telefone: "11934573457" },
  { id: 4, nome: "Silvana dos Santos Freitas", telefone: "11934532184" },
  { id: 5, nome: "Eduardo Sousa Freitas", telefone: "11923455432" },
  { id: 6, nome: "Erik Yokota", telefone: "11987623214" },
  { id: 7, nome: "Nathan Torres", telefone: "11982344321" },
  { id: 8, nome: "Raphael Aumatos", telefone: "11953243219" },
  { id: 9, nome: "Lucas Arlei", telefone: "11234872345" },
  { id: 10, nome: "Otavio Vianna Lima", telefone: "11952344321" },
];

let _proximoIdCliente = clientes.length > 0
  ? Math.max(...clientes.map((c: Cliente) => c.id || 0)) + 1
  : 1;

export const getProximoIdCliente = (): number => {
  const currentId = _proximoIdCliente;
  _proximoIdCliente++;
  return currentId;
};