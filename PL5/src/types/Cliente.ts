export interface Endereco {
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
}

export interface Cliente {
  id?: number; 
  nome: string;
  nomeSocial?: string;
  email: string;
  telefone: string;
  endereco?: Endereco;
}