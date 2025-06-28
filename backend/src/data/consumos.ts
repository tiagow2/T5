import { Consumo } from '../types'; 

export let consumos: Consumo[] = [
];
let _proximoIdConsumo = consumos.length > 0
  ? Math.max(...consumos.map((c: Consumo) => c.id || 0)) + 1 
  : 1;

export const getProximoIdConsumo = (): number => {
  const currentId = _proximoIdConsumo;
  _proximoIdConsumo++; 
  return currentId;
};