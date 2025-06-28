// backend/src/controllers/produtoController.ts
import { Request, Response } from 'express';
import { produtos, getProximoIdProduto } from '../data/produtos';
import { Produto } from '../types';

export const listar = (req: Request, res: Response) => {
  res.json(produtos);
};

export const cadastrar = (req: Request, res: Response) => {
  const novoProduto: Produto = { id: getProximoIdProduto(), ...req.body };
  produtos.push(novoProduto);
  res.status(201).json(novoProduto);
};

export const buscarPorId = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ erro: "ID inválido fornecido." });
  }
  const produto = produtos.find((p: Produto) => p.id === id);
  if (!produto) {
    return res.status(404).json({ erro: "Produto não encontrado." });
  }
  res.json(produto);
};

export const atualizar = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ erro: "ID inválido fornecido." });
  }
  const index = produtos.findIndex((p: Produto) => p.id === id);
  if (index === -1) {
    return res.status(404).json({ erro: "Produto não encontrado." });
  }
  produtos[index] = { ...produtos[index], ...req.body, id: id };
  res.json(produtos[index]);
};

export const excluir = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ erro: "ID inválido fornecido." });
  }
  const index = produtos.findIndex((p: Produto) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ erro: "Produto não encontrado" });
  }

  produtos.splice(index, 1);
  res.status(204).send();
};