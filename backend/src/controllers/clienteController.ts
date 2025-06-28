import { Request, Response } from 'express';
import { Cliente } from '../types';
import { clientes, getProximoIdCliente } from '../data/clientes';

export const listar = (_req: Request, res: Response) => {
  res.json(clientes);
};

export const buscarPorId = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const cliente = clientes.find(c => c.id === id);
  if (cliente) {
    res.json(cliente);
  } else {
    res.status(404).json({ erro: "Cliente não encontrado" });
  }
};

export const cadastrar = (req: Request, res: Response) => {
  const { nome, telefone } = req.body;

  if (!nome || !telefone) {
    return res.status(400).json({ erro: "Nome e telefone são obrigatórios." });
  }

  const id = getProximoIdCliente();
  const novoCliente: Cliente = { id, nome, telefone };

  clientes.push(novoCliente);
  res.status(201).json(novoCliente);
};

export const atualizar = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = clientes.findIndex(c => c.id === id);

  if (index === -1) {
    return res.status(404).json({ erro: "Cliente não encontrado" });
  }

  const { nome, telefone } = req.body;
  clientes[index] = { ...clientes[index], nome, telefone };
  res.json(clientes[index]);
};

export const excluir = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = clientes.findIndex(c => c.id === id);

  if (index === -1) {
    return res.status(404).json({ erro: "Cliente não encontrado" });
  }

  clientes.splice(index, 1);
  res.status(204).send();
};
