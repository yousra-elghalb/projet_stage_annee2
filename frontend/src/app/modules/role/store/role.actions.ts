import {Action} from '@ngrx/store';
import {PaginatorInformations} from '../../../shared_models/paginator-informations';
import {PaginatedResult} from '../../../shared_models/paginated-result';
import {Role} from '../model/role';

export enum RoleActionTypes {
  LoadRolesIsNotLoadedRequest = '[Role] LoadRolesIsNotLoadedRequest Role',
  LoadRolesRequest = '[Role] LoadRolesRequest Role',
  LoadRolesSuccess = '[Role] LoadRolesSuccess Role',
  LoadRolesFailed = '[Role] LoadRolesFailed Role',

  LoadOneRoleRequest = '[Role] LoadOneRoleRequest Role',
  LoadOneRoleSuccess = '[Role] LoadOneRoleSuccess Role',
  LoadOneRoleFailed = '[Role] LoadOneRoleFailed Role',

  SaveRoleRequest = '[Role] SaveRolesRequest Role',
  SaveRoleSuccess = '[Role] SaveRolesSuccess Role',
  SaveRoleFailed = '[Role] SaveRolesFailed Role',


  UpdateRoleRequest = '[Role] UpdateRolesRequest Role',
  UpdateRoleSuccess = '[Role] UpdateRolesSuccess Role',
  UpdateRoleFailed = '[Role] UpdateRolesFailed Role',

  DeleteRoleRequest = '[Role] DeleteRolesRequest Role',
  DeleteRoleSuccess = '[Role] DeleteRolesSuccess Role',
  DeleteRoleFailed = '[Role] DeleteRolesFailed Role',

}

export class DeleteRoleRequest implements Action {
  readonly type = RoleActionTypes.DeleteRoleRequest;

  constructor(public payload: { id: number }) {
  }
}

export class DeleteRoleSuccess implements Action {
  readonly type = RoleActionTypes.DeleteRoleSuccess;

  constructor() {
  }
}

export class DeleteRoleFailed implements Action {
  readonly type = RoleActionTypes.DeleteRoleFailed;

  constructor() {
  }
}

export class UpdateRoleRequest implements Action {
  readonly type = RoleActionTypes.UpdateRoleRequest;

  constructor(public payload: { role: Role }) {
  }
}

export class UpdateRoleSuccess implements Action {
  readonly type = RoleActionTypes.UpdateRoleSuccess;

  constructor(public payload: { role: Role }) {
  }
}

export class UpdateRoleFailed implements Action {
  readonly type = RoleActionTypes.UpdateRoleFailed;

  constructor() {
  }
}

export class SaveRoleRequest implements Action {
  readonly type = RoleActionTypes.SaveRoleRequest;

  constructor(public payload: { role: Role }) {
  }
}

export class SaveRoleSuccess implements Action {
  readonly type = RoleActionTypes.SaveRoleSuccess;

  constructor(public payload: { role: Role }) {
  }
}

export class SaveRoleFailed implements Action {
  readonly type = RoleActionTypes.SaveRoleFailed;

  constructor(error: any) {
    console.warn(error);
  }
}

export class LoadOneRoleRequest implements Action {
  readonly type = RoleActionTypes.LoadOneRoleRequest;

  constructor(public payload: { id: number }) {
  }
}

export class LoadOneRoleSuccess implements Action {
  readonly type = RoleActionTypes.LoadOneRoleSuccess;

  constructor(public payload: { role: Role }) {
  }
}

export class LoadOneRoleFailed implements Action {
  readonly type = RoleActionTypes.LoadOneRoleFailed;

  constructor() {
  }
}

export class LoadRolesRequest implements Action {
  readonly type = RoleActionTypes.LoadRolesRequest;

  constructor(public search: string, public paginatorInformations: PaginatorInformations) {
  }
}

export class LoadRolesIsNotLoadedRequest implements Action {
  readonly type = RoleActionTypes.LoadRolesIsNotLoadedRequest;

  constructor() {
  }
}

export class LoadRolesSuccess implements Action {
  readonly type = RoleActionTypes.LoadRolesSuccess;

  constructor(public payload: { paginatedResults: PaginatedResult<Role> }) {
}
}

export class LoadRolesFailed implements Action {
  readonly type = RoleActionTypes.LoadRolesFailed;

  constructor() {
    console.warn('tra errHHHHHHHHHHHHHHHHHHHHHHHHHH');
  }
}


export type RoleActions = LoadRolesRequest |
  LoadRolesSuccess |
  LoadRolesFailed |
  SaveRoleRequest |
  SaveRoleSuccess |
  SaveRoleFailed |

  UpdateRoleRequest |
  UpdateRoleSuccess |
  UpdateRoleFailed |
  DeleteRoleRequest |
  DeleteRoleSuccess |
  DeleteRoleFailed |
  LoadOneRoleRequest |
  LoadOneRoleSuccess |
  LoadOneRoleFailed |
  LoadRolesIsNotLoadedRequest;
