import {TypeVehicule} from '../../type-vehicule/model/type-vehicule';
import {Societe} from '../../societe/model/societe';

export interface Vehicule {
  id: number;
  place: number;
  type_vehicule_id: number;
  marque_vehicule_id: number;
  societe_id: number;
  immatriculation: string;
  date_ex_assurance: Date;

  type?: TypeVehicule;
  marque?: TypeVehicule;
  societe?: Societe;
}
