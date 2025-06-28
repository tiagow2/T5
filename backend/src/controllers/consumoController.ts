// backend/src/controllers/consumoController.ts
import { Request, Response } from 'express';
// 🌟🌟🌟 CORREÇÃO DE IMPORTS: Use imports nomeados ({}) 🌟🌟🌟
import { consumos, getProximoIdConsumo } from '../data/consumos';
import { clientes } from '../data/clientes';
import { produtos } from '../data/produtos';
import { Consumo, Cliente, Produto } from '../types'; 

export const listar = (req: Request, res: Response) => {
  res.json(consumos);
};

export const cadastrar = (req: Request, res: Response) => {
  // 🌟🌟🌟 VALIDAÇÃO E TIPAGEM SEGURA DE clienteId e produtoId do req.body 🌟🌟🌟
  const { clienteId: clienteIdRaw, produtoId: produtoIdRaw, quantidade, data } = req.body;

  let clienteId: number;
  let produtoId: number;

  // Validação de clienteId
  if (clienteIdRaw === undefined || clienteIdRaw === null) {
      return res.status(400).json({ erro: "ID do cliente é obrigatório." });
  }
  const parsedClienteId = parseInt(clienteIdRaw as string);
  if (isNaN(parsedClienteId)) {
      return res.status(400).json({ erro: "ID do cliente inválido." });
  }
  clienteId = parsedClienteId;

  // Validação de produtoId
  if (produtoIdRaw === undefined || produtoIdRaw === null) {
      return res.status(400).json({ erro: "ID do produto é obrigatório." });
  }
  const parsedProdutoId = parseInt(produtoIdRaw as string);
  if (isNaN(parsedProdutoId)) {
      return res.status(400).json({ erro: "ID do produto inválido." });
  }
  produtoId = parsedProdutoId;

  // Validação da existência do cliente
  // 🌟🌟🌟 TIPAGEM EXPLÍCITA DE 'c: Cliente' 🌟🌟🌟
  const clienteExiste = clientes.some((c: Cliente) => c.id === clienteId);
  if (!clienteExiste) {
    return res.status(400).json({ erro: "Cliente associado não encontrado." });
  }

  // Validação da existência do produto (assumindo que você tem um array 'produtos' em 'data/produtos.ts')
  // 🌟🌟🌟 TIPAGEM EXPLÍCITA DE 'p: Produto' 🌟🌟🌟
  const produtoExiste = produtos.some((p: Produto) => p.id === produtoId);
  if (!produtoExiste) {
    return res.status(400).json({ erro: "Produto associado não encontrado." });
  }

  // 🌟🌟🌟 GERAÇÃO DE ID DO CONSUMO USANDO A FUNÇÃO getProximoIdConsumo() 🌟🌟🌟
  const novoConsumo: Consumo = {
    id: getProximoIdConsumo(),
    clienteId,
    produtoId,
    quantidade,
    data // Assumindo que 'data' vem em um formato válido
  };
  consumos.push(novoConsumo);
  res.status(201).json(novoConsumo);
};

export const buscarPorId = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  // 🌟🌟🌟 VALIDAÇÃO DE ID DA URL 🌟🌟🌟
  if (isNaN(id)) {
    return res.status(400).json({ erro: "ID inválido fornecido." });
  }
  // 🌟🌟🌟 TIPAGEM EXPLÍCITA DE 'c: Consumo' 🌟🌟🌟
  const consumo = consumos.find((c: Consumo) => c.id === id);
  if (!consumo) {
    return res.status(404).json({ erro: "Consumo não encontrado" });
  }
  res.json(consumo);
};

export const atualizar = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  // 🌟🌟🌟 VALIDAÇÃO DE ID DA URL 🌟🌟🌟
  if (isNaN(id)) {
    return res.status(400).json({ erro: "ID inválido fornecido." });
  }
  // 🌟🌟🌟 TIPAGEM EXPLÍCITA DE 'c: Consumo' 🌟🌟🌟
  const index = consumos.findIndex((c: Consumo) => c.id === id);
  if (index === -1) {
    return res.status(404).json({ erro: "Consumo não encontrado" });
  }

  const { clienteId: clienteIdRaw, produtoId: produtoIdRaw, quantidade, data } = req.body;

  let clienteIdParaAtualizar: number | undefined;
  let produtoIdParaAtualizar: number | undefined;

  // Validação e obtenção de clienteId para atualização
  if (clienteIdRaw !== undefined && clienteIdRaw !== null) {
      const parsedId = parseInt(clienteIdRaw as string);
      if (isNaN(parsedId)) {
          return res.status(400).json({ erro: "ID do cliente associado inválido." });
      }
      clienteIdParaAtualizar = parsedId;
  } else {
      clienteIdParaAtualizar = consumos[index].clienteId; // Mantém o ID existente
  }

  // Validação e obtenção de produtoId para atualização
  if (produtoIdRaw !== undefined && produtoIdRaw !== null) {
      const parsedId = parseInt(produtoIdRaw as string);
      if (isNaN(parsedId)) {
          return res.status(400).json({ erro: "ID do produto associado inválido." });
      }
      produtoIdParaAtualizar = parsedId;
  } else {
      produtoIdParaAtualizar = consumos[index].produtoId; // Mantém o ID existente
  }

  // Validação da existência do cliente (se um clienteId válido foi determinado)
  if (clienteIdParaAtualizar !== undefined) {
    // 🌟🌟🌟 TIPAGEM EXPLÍCITA DE 'c: Cliente' 🌟🌟🌟
    const clienteExiste = clientes.some((c: Cliente) => c.id === clienteIdParaAtualizar);
    if (!clienteExiste) {
      return res.status(400).json({ erro: "Cliente associado não encontrado." });
    }
  }

  // Validação da existência do produto (se um produtoId válido foi determinado)
  if (produtoIdParaAtualizar !== undefined) {
    // 🌟🌟🌟 TIPAGEM EXPLÍCITA DE 'p: Produto' 🌟🌟🌟
    const produtoExiste = produtos.some((p: Produto) => p.id === produtoIdParaAtualizar);
    if (!produtoExiste) {
      return res.status(400).json({ erro: "Produto associado não encontrado." });
    }
  }

  // Cria o objeto atualizado, garantindo que o id do consumo original seja mantido
  consumos[index] = {
    ...consumos[index],
    ...req.body,
    id: id, // ID do consumo
    clienteId: clienteIdParaAtualizar,
    produtoId: produtoIdParaAtualizar,
    quantidade: quantidade !== undefined ? quantidade : consumos[index].quantidade,
    data: data !== undefined ? data : consumos[index].data,
  };
  res.json(consumos[index]);
};

export const excluir = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  // 🌟🌟🌟 VALIDAÇÃO DE ID DA URL 🌟🌟🌟
  if (isNaN(id)) {
    return res.status(400).json({ erro: "ID inválido fornecido." });
  }
  // 🌟🌟🌟 TIPAGEM EXPLÍCITA DE 'c: Consumo' 🌟🌟🌟
  const index = consumos.findIndex((c: Consumo) => c.id === id);

  if (index === -1) {
    return res.status(404).json({ erro: "Consumo não encontrado" });
  }

  consumos.splice(index, 1);

  res.status(204).send();
};