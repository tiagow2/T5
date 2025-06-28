import React, { useState, useEffect } from "react";
import { Cliente, Endereco } from "../types/Cliente";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

interface Props {
  clienteExistente?: Cliente;
  onSubmit: (cliente: Cliente) => void;
}

interface ClienteFormState {
  id?: number | '';
  nome: string;
  nomeSocial?: string;
  email: string;
  telefone: string;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
}

const ClienteForm: React.FC<Props> = ({ clienteExistente, onSubmit }) => {
  const [clienteForm, setClienteForm] = useState<ClienteFormState>(
    clienteExistente
      ? {
        id: clienteExistente.id,
        nome: clienteExistente.nome,
        nomeSocial: clienteExistente.nomeSocial || '',
        email: clienteExistente.email,
        telefone: clienteExistente.telefone,
        rua: clienteExistente.endereco?.rua || '',
        numero: clienteExistente.endereco?.numero || '',
        bairro: clienteExistente.endereco?.bairro || '',
        cidade: clienteExistente.endereco?.cidade || '',
        estado: clienteExistente.endereco?.estado || '',
        cep: clienteExistente.endereco?.cep || '',
      }
      : {
        nome: "",
        nomeSocial: "",
        email: "",
        telefone: "",
        rua: "",
        numero: "",
        bairro: "",
        cidade: "",
        estado: "",
        cep: "",
      }
  );

  useEffect(() => {
    if (clienteExistente) {
      setClienteForm({
        id: clienteExistente.id,
        nome: clienteExistente.nome,
        nomeSocial: clienteExistente.nomeSocial || '',
        email: clienteExistente.email,
        telefone: clienteExistente.telefone,
        rua: clienteExistente.endereco?.rua || '',
        numero: clienteExistente.endereco?.numero || '',
        bairro: clienteExistente.endereco?.bairro || '',
        cidade: clienteExistente.endereco?.cidade || '',
        estado: clienteExistente.endereco?.estado || '',
        cep: clienteExistente.endereco?.cep || '',
      });
    }
  }, [clienteExistente]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClienteForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const enderecoToSubmit: Endereco | undefined =
      (clienteForm.rua || clienteForm.numero || clienteForm.bairro || clienteForm.cidade || clienteForm.estado || clienteForm.cep)
        ? {
          rua: clienteForm.rua,
          numero: clienteForm.numero,
          bairro: clienteForm.bairro,
          cidade: clienteForm.cidade,
          estado: clienteForm.estado,
          cep: clienteForm.cep,
        }
        : undefined;

    const clienteToSubmit: Omit<Cliente, 'id'> | Cliente = clienteExistente
      ? {
        id: clienteExistente.id, // Somente se for edição
        nome: clienteForm.nome,
        nomeSocial: clienteForm.nomeSocial,
        email: clienteForm.email,
        telefone: clienteForm.telefone,
        endereco: enderecoToSubmit,
      }
      : {
        nome: clienteForm.nome,
        nomeSocial: clienteForm.nomeSocial,
        email: clienteForm.email,
        telefone: clienteForm.telefone,
        endereco: enderecoToSubmit,
      };


    if (!clienteToSubmit.nome || !clienteToSubmit.email || !clienteToSubmit.telefone) {
      alert("Por favor, preencha todos os campos obrigatórios (Nome, Email, Telefone).");
      return;
    }

    onSubmit(clienteToSubmit);
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <h2>{clienteExistente ? "Editar Cliente" : "Cadastrar Cliente"}</h2>

      {clienteExistente && (
        <div className="form-group mb-2">
          <label htmlFor="id">ID:</label>
          <input
            type="number"
            id="id"
            name="id"
            className="form-control"
            value={clienteForm.id}
            readOnly
          />
        </div>
      )}

      <div className="form-group mb-2">
        <label htmlFor="nome">Nome:</label>
        <input
          type="text"
          id="nome"
          name="nome"
          className="form-control"
          value={clienteForm.nome}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group mb-2">
        <label htmlFor="nomeSocial">Nome Social (Opcional):</label>
        <input
          type="text"
          id="nomeSocial"
          name="nomeSocial"
          className="form-control"
          value={clienteForm.nomeSocial}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group mb-2">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          className="form-control"
          value={clienteForm.email}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group mb-2">
        <label htmlFor="telefone">Telefone:</label>
        <input
          type="text"
          id="telefone"
          name="telefone"
          className="form-control"
          value={clienteForm.telefone}
          onChange={handleInputChange}
          required
        />
      </div>

      <h3>Endereço (Opcional)</h3>
      <div className="form-group mb-2">
        <label htmlFor="rua">Rua:</label>
        <input type="text" id="rua" name="rua" className="form-control" value={clienteForm.rua} onChange={handleInputChange} />
      </div>
      <div className="form-group mb-2">
        <label htmlFor="numero">Número:</label>
        <input type="text" id="numero" name="numero" className="form-control" value={clienteForm.numero} onChange={handleInputChange} />
      </div>
      <div className="form-group mb-2">
        <label htmlFor="bairro">Bairro:</label>
        <input type="text" id="bairro" name="bairro" className="form-control" value={clienteForm.bairro} onChange={handleInputChange} />
      </div>
      <div className="form-group mb-2">
        <label htmlFor="cidade">Cidade:</label>
        <input type="text" id="cidade" name="cidade" className="form-control" value={clienteForm.cidade} onChange={handleInputChange} />
      </div>
      <div className="form-group mb-2">
        <label htmlFor="estado">Estado:</label>
        <input type="text" id="estado" name="estado" className="form-control" value={clienteForm.estado} onChange={handleInputChange} />
      </div>
      <div className="form-group mb-2">
        <label htmlFor="cep">CEP:</label>
        <input type="text" id="cep" name="cep" className="form-control" value={clienteForm.cep} onChange={handleInputChange} />
      </div>

      <button type="submit" className="btn btn-primary mt-3">
        {clienteExistente ? "Salvar Alterações" : "Cadastrar Cliente"}
      </button>
    </form>
  );
};

export default ClienteForm;