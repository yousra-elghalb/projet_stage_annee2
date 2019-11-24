import {Permission} from '../../permission/model/permission';

export class Role {
  id?: number;
  nom: string;
  permissions?: Permission[] | any;
}
