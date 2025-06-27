// src/types/Pets.ts
export interface Dono {
  id: number;
  nome: string;
  nomeSocial?: string;
  email?: string;
}

export interface Pet {
  id?: number;
  nome: string;
  tipo: string;
  raca: string;
  dono?: Dono;
  genero: string;
}
