// PL5/src/pages/RelatorioMaisConsumidos.tsx
import React, { useEffect, useState } from 'react';
import * as RelatorioService from '../services/relatorioService';

interface MaisConsumido {
    id: number;
    nome: string;
    tipo: string;
    quantidade: number;
}

function RelatorioMaisConsumidos() {
    const [itens, setItens] = useState<MaisConsumido[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        RelatorioService.getItensMaisConsumidos()
            .then(response => {
                setItens(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Falha ao carregar relatório de itens mais consumidos", error);
                setLoading(false);
            });
    }, []);

    if (loading) return <p className="container mt-4">Carregando...</p>;

    return (
        <div className="container mt-4">
            <h2>Itens Mais Consumidos (Produtos e Serviços)</h2>
            <ol className="list-group list-group-numbered mt-3">
                {itens.map(item => (
                    <li key={`${item.tipo}-${item.id}`} className="list-group-item d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">{item.nome}</div>
                            Tipo: {item.tipo.charAt(0).toUpperCase() + item.tipo.slice(1)}
                        </div>
                        <span className="badge bg-primary rounded-pill">{item.quantidade}</span>
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default RelatorioMaisConsumidos;