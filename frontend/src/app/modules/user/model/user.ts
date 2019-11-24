import {Role} from '../../role/model/role';

export class User {
  id: number;
  email: string;
  password: string;
  roles: Role[];
}
