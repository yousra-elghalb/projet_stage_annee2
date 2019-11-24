import {Traite} from './traite';

export interface Paiement {
  id: number;
  totale: number;
  reste: number;
  traites?: Traite[];
}
