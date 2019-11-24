import {Agence} from '../../agence/model/Agence';
import {Voyage} from '../../voyage/model/voyage';
import {Accompagnateur} from '../../accompagnateur/model/accompagnateur';
import {Depense} from '../../depense/model/depense';
import {Chauffeur} from '../../chauffeur/model/chauffeur';
import {Vehicule} from '../../vehicule/model/vehicule';


export interface OffreVoyage {
  chauffeur_id: number;
  vehicule_id: number;
  vehicule?: Vehicule;
  id: number;
  dateDarrive: Date;
  dateDepart: Date;
  statut: string;
  enAttente: number;
  valide: number;
  prixAdulte: number;
  prixEnfant: number;
  prixBebe: number;
  suffixe: string;
  groupe: boolean;
  agence: Agence;
  voyage?: Voyage;
  agence_id?: any;
  num_immatriculation: string;
  num_autorisation: string;
  num_dossier: string;
  accompagnateurs?: Accompagnateur[];
  chauffeur?: Chauffeur;
  depenses: Depense[];
}
