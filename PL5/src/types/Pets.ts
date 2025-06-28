export interface Dono {
  id: number;
  nome: string;
  nomeSocial?: string;
  email?: string;
}

export interface Pet {
  id?: number; 
  nome: string;
  especie: string;
  raca?: string;
  idade?: number; 
  clienteId: number; 
}