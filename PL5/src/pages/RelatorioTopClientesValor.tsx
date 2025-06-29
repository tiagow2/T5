// PL5/src/pages/RelatorioTopClientesValor.tsx

import React, { useEffect, useState } from 'react';
import * as RelatorioService from '../services/relatorioService';

interface TopClienteValor {
    id: number;
    nome: string;
    valorTotal: number;
}

function RelatorioTopClientesValor() {
    const [clientes, setClientes] = useState<TopClienteValor[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTopClientes = async () => {
            try {
                const response = await RelatorioService.getTop5ClientesValor();
                setClientes(response.data);
            } catch (err) {
                console.error("Falha ao carregar relatório de Top 5 por valor:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchTopClientes();
    }, []);

    if (loading) {
        return <div className="container mt-4"><p>Carregando...</p></div>;
    }

    return (
        <div className="container mt-4">
            <h2>Top 5 Clientes por Valor Gasto</h2>
            <table className="table table-striped table-hover mt-3">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nome do Cliente</th>
                        <th scope="col">Valor Total Gasto</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map((cliente, index) => (
                        <tr key={cliente.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{cliente.nome}</td>
                            <td>R$ {cliente.valorTotal.toFixed(2).replace('.', ',')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default RelatorioTopClientesValor;