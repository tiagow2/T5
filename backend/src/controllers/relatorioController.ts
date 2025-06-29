import { Request, Response } from 'express';
import { clientes } from '../data/clientes';
import { produtos } from '../data/produtos';
import { consumos } from '../data/consumos';
import { Consumo } from '../types'; 

export const getTop10ClientesQuantidade = (req: Request, res: Response) => {
    const contagemConsumo = consumos.reduce((acc: { [key: number]: number }, consumo: Consumo) => {
        const id = consumo.clienteId;
        acc[id] = (acc[id] || 0) + consumo.quantidade;
        return acc;
    }, {});

    const clientesComContagem = Object.keys(contagemConsumo).map(idStr => {
        const id = parseInt(idStr, 10);
        const cliente = clientes.find(c => c.id === id);
        return {
            id: id,
            nome: cliente ? cliente.nome : 'Cliente Desconhecido',
            quantidade: contagemConsumo[id]
        };
    });

    const clientesOrdenados = clientesComContagem.sort((a, b) => b.quantidade - a.quantidade);
    const top10 = clientesOrdenados.slice(0, 10);
    res.status(200).json(top10);
};

export const getItensMaisConsumidos = (req: Request, res: Response) => {
    const contagem: { [key: string]: number } = {};

    consumos.forEach((consumo: Consumo) => {
        if (consumo.produtoId) {
            const itemId = `produto-${consumo.produtoId}`;
            contagem[itemId] = (contagem[itemId] || 0) + consumo.quantidade;
        }
    });

    const itensComContagem = Object.keys(contagem).map(itemId => {
        const [tipo, idStr] = itemId.split('-');
        const id = parseInt(idStr, 10);
        
        const item = produtos.find(p => p.id === id);
        const nome = item ? item.nome : 'Produto não encontrado';

        return {
            id: id,
            nome: nome,
            tipo: tipo, 
            quantidade: contagem[itemId]
        };
    });

    const itensOrdenados = itensComContagem.sort((a, b) => b.quantidade - a.quantidade);

    res.status(200).json(itensOrdenados);
};