import {Pivot} from '../../permission/model/pivot';

export class UserPermissions {
  isAdmin = false;
  voyage: Pivot = new Pivot();
  agence: Pivot = new Pivot();
  offreVoyage: Pivot = new Pivot();
  modalite: Pivot = new Pivot();
  commercial: Pivot = new Pivot();
  accompagnateur: Pivot = new Pivot();
  role: Pivot = new Pivot();
  sousCategorie: Pivot = new Pivot();
  categorie: Pivot = new Pivot();
  voyageur: Pivot = new Pivot();
  pays: Pivot = new Pivot();
  option: Pivot = new Pivot();
  depense: Pivot = new Pivot();
  permission: Pivot = new Pivot();
  ville: Pivot = new Pivot();
  // paiement: Pivot = new Pivot();
  // traite: Pivot = new Pivot();
  offreVoyageLimited: Pivot = new Pivot();
  pgroupe: Pivot = new Pivot();
  sgroupe: Pivot = new Pivot();
  chauffeur: Pivot = new Pivot();
  societe: Pivot = new Pivot();
  vehicule: Pivot = new Pivot();
  typeVehicule: Pivot = new Pivot();
  marqueVehicule: Pivot = new Pivot();
  facture: Pivot = new Pivot();
  groupeConvention: Pivot = new Pivot();
  hotel: Pivot = new Pivot();
}
