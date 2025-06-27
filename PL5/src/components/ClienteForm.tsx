import React, { useState, useEffect } from "react";
import { Cliente, Endereco, Telefone } from "../types/Cliente";

interface Props {
  clienteExistente?: Cliente;
  onSubmit: (cliente: Cliente) => void;
}

const ClienteForm: React.FC<Props> = ({ clienteExistente, onSubmit }) => {
  const [cliente, setCliente] = useState<Cliente>({
    nome: "",
    nomeSocial: "",
    email: "",
    endereco: {
      estado: "",
      cidade: "",
      bairro: "",
      rua: "",
      numero: "",
      codigoPostal: "",
      informacoesAdicionais: "",
    },
    telefones: [{ ddd: "", numero: "" }],
  });

  useEffect(() => {
    if (clienteExistente) {
      setCliente(clienteExistente);
    }
  }, [clienteExistente]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCliente((prev) => ({ ...prev, [name]: value }));
  };

  const handleEnderecoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCliente((prev) => ({ ...prev, endereco: { ...prev.endereco, [name]: value } }));
  };

  const handleTelefoneChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const telefonesAtualizados = [...cliente.telefones];
    telefonesAtualizados[index] = { ...telefonesAtualizados[index], [name]: value };
    setCliente((prev) => ({ ...prev, telefones: telefonesAtualizados }));
  };

  const adicionarTelefone = () => {
    setCliente((prev) => ({ ...prev, telefones: [...prev.telefones, { ddd: "", numero: "" }] }));
  };

  const removerTelefone = (index: number) => {
    const telefonesAtualizados = cliente.telefones.filter((_, i) => i !== index);
    setCliente((prev) => ({ ...prev, telefones: telefonesAtualizados }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(cliente);
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <h2>{clienteExistente ? "Editar Cliente" : "Cadastrar Cliente"}</h2>

      <input name="nome" placeholder="Nome" value={cliente.nome} onChange={handleInputChange} className="form-control mb-2" required />
      <input name="nomeSocial" placeholder="Nome Social" value={cliente.nomeSocial} onChange={handleInputChange} className="form-control mb-2" />
      <input name="email" type="email" placeholder="Email" value={cliente.email || ""} onChange={handleInputChange} className="form-control mb-2" />

      <h4 className="mt-3">Endereço</h4>
      {Object.entries(cliente.endereco).map(([key, value]) => (
        <input
          key={key}
          name={key}
          placeholder={key}
          value={value}
          onChange={handleEnderecoChange}
          className="form-control mb-2"
        />
      ))}

      <h4 className="mt-3">Telefones</h4>
      {cliente.telefones.map((telefone, index) => (
        <div key={index} className="d-flex gap-2 mb-2">
          <input
            name="ddd"
            placeholder="DDD"
            value={telefone.ddd}
            onChange={(e) => handleTelefoneChange(index, e)}
            className="form-control"
          />
          <input
            name="numero"
            placeholder="Número"
            value={telefone.numero}
            onChange={(e) => handleTelefoneChange(index, e)}
            className="form-control"
          />
          <button type="button" className="btn btn-danger" onClick={() => removerTelefone(index)}>
            Remover
          </button>
        </div>
      ))}
      <button type="button" onClick={adicionarTelefone} className="btn btn-secondary mb-3">
        Adicionar Telefone
      </button>

      <button type="submit" className="btn btn-primary">
        {clienteExistente ? "Salvar" : "Cadastrar"}
      </button>
    </form>
  );
};

export default ClienteForm;
