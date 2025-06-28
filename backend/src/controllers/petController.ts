import { Request, Response } from 'express';
import { pets, getProximoIdPet } from '../data/pets';
import { clientes } from '../data/clientes'; 
import { Pet, Cliente } from '../types'; 

export const listar = (req: Request, res: Response) => {
  res.json(pets);
};

export const cadastrar = (req: Request, res: Response) => {
  const clienteIdRaw = req.body.clienteId;
  let clienteId: number; 

  if (clienteIdRaw === undefined || clienteIdRaw === null) {
      return res.status(400).json({ erro: "ID do cliente associado é obrigatório." });
  }

  const parsedId = parseInt(clienteIdRaw as string);
  if (isNaN(parsedId)) {
      return res.status(400).json({ erro: "ID do cliente associado inválido." });
  }
  clienteId = parsedId;

  const clienteExiste = clientes.some((c: Cliente) => c.id === clienteId);
  if (!clienteExiste) {
    return res.status(400).json({ erro: "Cliente associado não encontrado." });
  }

  const novoPet: Pet = { id: getProximoIdPet(), ...req.body, clienteId: clienteId };
  pets.push(novoPet);
  res.status(201).json(novoPet);
};

export const buscarPorId = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ erro: "ID inválido fornecido." });
  }
  const pet = pets.find((p: Pet) => p.id === id);
  if (!pet) {
    return res.status(404).json({ erro: "Pet não encontrado." });
  }
  res.json(pet);
};

export const atualizar = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ erro: "ID inválido fornecido." });
  }
  const index = pets.findIndex((p: Pet) => p.id === id);
  if (index === -1) {
    return res.status(404).json({ erro: "Pet não encontrado." });
  }

  const clienteIdRaw = req.body.clienteId;
  let clienteIdParaAtualizar: number | undefined; 

  if (clienteIdRaw !== undefined && clienteIdRaw !== null) {
      const parsedId = parseInt(clienteIdRaw as string);
      if (isNaN(parsedId)) {
          return res.status(400).json({ erro: "ID do cliente associado inválido." });
      }
      clienteIdParaAtualizar = parsedId;
  } else {
      clienteIdParaAtualizar = pets[index].clienteId;
  }

  if (clienteIdParaAtualizar !== undefined) {
    const clienteExiste = clientes.some((c: Cliente) => c.id === clienteIdParaAtualizar);
    if (!clienteExiste) {
      return res.status(400).json({ erro: "Cliente associado não encontrado." });
    }
  }

  pets[index] = { ...pets[index], ...req.body, id: id, clienteId: clienteIdParaAtualizar };
  res.json(pets[index]);
};

export const excluir = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ erro: "ID inválido fornecido." });
  }
  const index = pets.findIndex((p: Pet) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ erro: "Pet não encontrado" });
  }

  pets.splice(index, 1);

  res.status(204).send();
};