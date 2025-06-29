import axios from 'axios';

const API_URL = 'http://localhost:8080/relatorios';

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

interface TopClienteValor {
    id: number;
    nome: string;
    valorTotal: number;
}

export const getTop5ClientesValor = () => {
    return axios.get<TopClienteValor[]>(`${API_URL}/top5-clientes-valor`);
};