import {User} from '../../user/model/user';
import {Role} from '../../role/model/role';
import {Agence} from '../../agence/model/Agence';

export interface Commercial {
  id: number;
  nom: string;
  prenom: string;
  cin: string;
  tel: string;
  email: string;
  srcImg: string;
  user: User;
  limitedAccess: boolean;
  roles: Role[];
  agence_id: any;
  agence: Agence;
}
