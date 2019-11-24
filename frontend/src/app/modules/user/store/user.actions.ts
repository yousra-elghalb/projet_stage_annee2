import {Action} from '@ngrx/store';
import {PaginatorInformations} from '../../../shared_models/paginator-informations';
import {PaginatedResult} from '../../../shared_models/paginated-result';
import {User} from '../model/user';
import {Permission} from '../../permission/model/permission';
import {Role} from '../../role/model/role';
import {UserPermissions} from '../model/user-permissions';
import {Commercial} from '../../commercial/model/commercial';
import {CommercialActionTypes} from '../../commercial/store/commercial.actions';

export enum UserActionTypes {

  LoginRequest = '[User] LoginsRequest User',
  LoginSuccess = '[User] LoginsSuccess User',
  LoginFailed = '[User] LoginsFailed User',

  LogoutRequest = '[User] LogoutsRequest User',
  LogoutSuccess = '[User] LogoutsSuccess User',
  LogoutFailed = '[User] LogoutsFailed User',

  UpdateCommercialProfileSuccess = '[Commercial] UpdateCommercialProfileSuccess Commercial',
  UpdateCommercialProfileFailed = '[Commercial] UpdateCommercialProfileFailedv Commercial',
  LoadUserRolesIsNotLoadedRequest = '[UserRoles] LoadUserRolesIsNotLoadedRequest UserRoles',
  LoadUserRolesSuccess = '[UserRoles] LoadUserRolesSuccess UserRoles',

}

export class UpdateCommercialProfileSuccess implements Action {
  readonly type = UserActionTypes.UpdateCommercialProfileSuccess;

  constructor(public payload: { commercial: Commercial }) {
  }
}

export class UpdateCommercialProfileFailed implements Action {
  readonly type = UserActionTypes.UpdateCommercialProfileFailed;

  constructor() {
  }
}

export class LogoutRequest implements Action {
  readonly type = UserActionTypes.LogoutRequest;

  constructor() {
  }
}

export class LogoutSuccess implements Action {
  readonly type = UserActionTypes.LogoutSuccess;

  constructor() {
  }
}

export class LogoutFailed implements Action {
  readonly type = UserActionTypes.LogoutFailed;

  constructor() {
  }
}

export class LoginRequest implements Action {
  readonly type = UserActionTypes.LoginRequest;

  constructor(public payload: { user: User }) {
  }
}

export class LoginSuccess implements Action {
  readonly type = UserActionTypes.LoginSuccess;

  constructor(public payload: { userPermissions: UserPermissions, commercial: Commercial }) {
  }
}

export class LoginFailed implements Action {
  readonly type = UserActionTypes.LoginFailed;

  constructor(public msg: string) {
    console.warn(msg);
  }
}


export class LoadUserRolesIsNotLoadedRequest implements Action {
  readonly type = UserActionTypes.LoadUserRolesIsNotLoadedRequest;

  constructor() {
  }
}

export class LoadUserRolesSuccess implements Action {
  readonly type = UserActionTypes.LoadUserRolesSuccess;

  constructor(public payload: { commercial: Commercial; userPermissions: UserPermissions }) {
  }
}


export type UserActions =
  LoadUserRolesIsNotLoadedRequest |
  UpdateCommercialProfileSuccess |
  UpdateCommercialProfileFailed |
  LoadUserRolesSuccess |
  LoginRequest |
  LoginSuccess |
  LoginFailed |
  LogoutRequest |
  LogoutSuccess |
  LogoutFailed ;
