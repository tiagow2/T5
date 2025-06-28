// backend/src/data/produtos.ts
import { Produto } from '../types';

export let produtos: Produto[] = [
  { id: 1, nome: "Ração Premium Cães", preco: 75.50 },
  { id: 2, nome: "Brinquedo Mordedor", preco: 25.00 },
  { id: 3, nome: "Banho e Tosa", preco: 120.00 }
];

let _proximoIdProduto = produtos.length > 0
  ? Math.max(...produtos.map((p: Produto) => p.id || 0)) + 1
  : 1;

export const getProximoIdProduto = (): number => {
  const currentId = _proximoIdProduto;
  _proximoIdProduto++;
  return currentId;
};