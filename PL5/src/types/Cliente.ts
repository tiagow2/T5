export interface Endereco {
  estado: string;
  cidade: string;
  bairro: string;
  rua: string;
  numero: string;
  codigoPostal: string;
  informacoesAdicionais?: string;
}

export interface Telefone {
  ddd: string;
  numero: string;
}

export interface Cliente {
  id?: number;
  nome: string;
  nomeSocial: string;
  email?: string;
  endereco: Endereco;
  telefones: Telefone[];
}
