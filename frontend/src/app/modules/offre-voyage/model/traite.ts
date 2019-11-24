import {Facture} from '../../groupe/model/facture';
import {Modalite} from '../../modalite/model/modalite';

export interface Traite {
  modalite?: Modalite;
  id?: number;
  montant?: number;
  date?: Date;
  pieceJointe?: string;
  base64?: string;
  modaliteDePaiement_id?: number;
  paiement_id?: number;
  facture?: Facture;
}
