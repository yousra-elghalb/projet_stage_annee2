export interface Depense {
  id: number;
  nom: string;
  prix?: number;
  pivot?: { prix: number };
}
