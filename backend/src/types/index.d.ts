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
  email?: string;
  telefone: string;
}

export interface Pet {
  id?: number;
  nome: string;
  especie: string;
  raca?: string;
  clienteId: number;
}
export interface Produto {
  id?: number;
  nome: string;
  preco: number;
}

export interface ProdutoOuServico {
  id?: number;
  nome: string;
  descricao?: string;
  preco: number;
  tipo: "produto" | "servico";
}

// Interface para um Consumo
export interface Consumo {
  id?: number;
  clienteId: number;
  produtoId: number;
  quantidade: number;
  data?: string;
}