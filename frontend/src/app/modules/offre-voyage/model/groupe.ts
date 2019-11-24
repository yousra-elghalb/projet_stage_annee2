import {Voyageur} from '../../voyageur/model/voyageur';
import {Traite} from './traite';
import {Commercial} from '../../commercial/model/commercial';
import {Option} from '../../options/model/option';
import {Paiement} from './paiement';

export interface Groupe {
  etat: boolean;
  id: number;
  nom: string;
  type?: string;
  reduction: number;
  ville_id: number;
  offre_voyage_id: number;
  voyageurs: Voyageur[];
  traites?: Traite[];
  paiement: Paiement;
  commercial?: Commercial;
  options?: Option[];
}
