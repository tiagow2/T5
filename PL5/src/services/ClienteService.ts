import { Cliente } from '../types/Cliente';
import { API_BASE_URL } from '../utils/api'; 

export const getClientes = async (): Promise<Cliente[]> => {
  const response = await fetch(`${API_BASE_URL}/clientes`);
  if (!response.ok) {
    throw new Error('Erro ao buscar clientes');
  }
  return response.json();
};

export const getClienteById = async (id: number): Promise<Cliente> => {
  const response = await fetch(`${API_BASE_URL}/clientes/${id}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.erro || 'Erro ao buscar cliente por ID');
  }
  return response.json();
};

export const createCliente = async (cliente: Omit<Cliente, 'id'>): Promise<Cliente> => {
  const response = await fetch(`${API_BASE_URL}/clientes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cliente),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.erro || 'Erro ao cadastrar cliente');
  }

  return response.json();
};


export const updateCliente = async (cliente: Cliente): Promise<Cliente> => {
  if (cliente.id === undefined) {
    throw new Error('ID do cliente é obrigatório para atualização.');
  }
  const response = await fetch(`${API_BASE_URL}/clientes/${cliente.id}`, {
    method: 'PUT', 
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cliente),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.erro || 'Erro ao atualizar cliente');
  }
  return response.json();
};

export const deleteCliente = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/clientes/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.erro || 'Erro ao deletar cliente');
  }
};