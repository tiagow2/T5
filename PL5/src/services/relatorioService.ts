// PL5/src/services/RelatorioService.ts
import axios from 'axios';

const API_URL = 'http://localhost:8080/relatorios';

// ... (interface TopCliente e função getTop10ClientesQuantidade)

export interface TopCliente {
    id: number;
    nome: string;
    quantidade: number;
}

export interface MaisConsumido {
    id: number;
    nome: string;
    tipo: string;
    quantidade: number;
}


export const getTop10ClientesQuantidade = () => {
  return axios.get<TopCliente[]>(`${API_URL}/top-clientes-quantidade`);
};

export const getItensMaisConsumidos = () => {
    return axios.get<MaisConsumido[]>(`${API_URL}/itens-mais-consumidos`);
};