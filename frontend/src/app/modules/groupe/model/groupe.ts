import {Traite} from '../../offre-voyage/model/traite';
import {Paiement} from '../../offre-voyage/model/paiement';
import {Commercial} from '../../commercial/model/commercial';
import {Option} from '../../options/model/option';
import {Voyageur} from '../../voyageur/model/voyageur';
import {Facture} from './facture';

export interface Groupe {
  etat?: string;
  id?: number;
  reduction?: number;
  offre_voyage_id?: number;
  voyageurs?: Voyageur[];
  traites?: Traite[];
  paiement?: Paiement;
  commercial?: Commercial;
  options?: Option[];
}
