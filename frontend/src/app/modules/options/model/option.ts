export interface Option {
  id: number;
  nom: string;
  prix?: number;
  pivot?: { prix: number };
}
