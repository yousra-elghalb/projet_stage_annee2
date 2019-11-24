import {Permission} from '../../permission/model/permission';
import {GroupeConvention} from '../../groupe-convention/model/groupe-convention';

export interface Voyageur {
  id?: number;
  nom?: string;
  prenom?: string;
  cin?: string;
  tel?: string;
  email?: string;
  sexe?: string;
  stadeVie?: string;
  numPasseport?: string;
  dateExpiration?: Date;
  black?: boolean;
  pivot?: { ville_depart?: string };
  nb_voyage?: any;
  groupeConvention?: GroupeConvention;
  groupe_convention_id?: number;
}
