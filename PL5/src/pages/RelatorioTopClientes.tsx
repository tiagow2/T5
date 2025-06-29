import React, { useEffect, useState } from 'react';
import * as RelatorioService from '../services/relatorioService';

interface TopCliente {
    id: number;
    nome: string;
    quantidade: number;
}

function RelatorioTopClientes() {
    const [clientes, setClientes] = useState<TopCliente[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTopClientes = async () => {
            try {
                const response = await RelatorioService.getTop10ClientesQuantidade();
                setClientes(response.data);
            } catch (err) {
                setError('Falha ao carregar o relatório.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTopClientes();
    }, []);

    
    if (loading) {
        return <div className="container mt-4"><p>Carregando...</p></div>;
    }

    if (error) {
        return <div className="container mt-4"><p className="text-danger">{error}</p></div>;
    }

    return (
        <div className="container mt-4">
            <h2>Top 10 Clientes por Quantidade de Consumo</h2>
            <table className="table table-striped table-hover mt-3">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nome do Cliente</th>
                        <th scope="col">Itens Consumidos</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map((cliente, index) => (
                        <tr key={cliente.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{cliente.nome}</td>
                            <td>{cliente.quantidade}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default RelatorioTopClientes;