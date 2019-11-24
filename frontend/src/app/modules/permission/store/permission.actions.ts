import {Action} from '@ngrx/store';
import {PaginatorInformations} from '../../../shared_models/paginator-informations';
import {PaginatedResult} from '../../../shared_models/paginated-result';
import {Permission} from '../model/permission';
import {ChauffeurActionTypes} from '../../chauffeur/store/chauffeur.actions';

export enum PermissionActionTypes {
  LoadPermissionsIsNotLoadedRequest = '[Permission] LoadPermissionsIsNotLoadedRequest Permission',
  LoadPermissionsRequest = '[Permission] LoadPermissionsRequest Permission',
  LoadPermissionsSuccess = '[Permission] LoadPermissionsSuccess Permission',
  LoadPermissionsFailed = '[Permission] LoadPermissionsFailed Permission',
  Permissionsloading = '[Chauffeur] Permissionsloading Chauffeur',

  LoadOnePermissionRequest = '[Permission] LoadOnePermissionRequest Permission',
  LoadOnePermissionSuccess = '[Permission] LoadOnePermissionSuccess Permission',
  LoadOnePermissionFailed = '[Permission] LoadOnePermissionFailed Permission',
}


export class Permissionsloading implements Action {
  readonly type = PermissionActionTypes.Permissionsloading;

  constructor() {
  }
}

export class LoadOnePermissionRequest implements Action {
  readonly type = PermissionActionTypes.LoadOnePermissionRequest;

  constructor(public payload: { id: number }) {
  }
}

export class LoadOnePermissionSuccess implements Action {
  readonly type = PermissionActionTypes.LoadOnePermissionSuccess;

  constructor(public payload: { permission: Permission }) {
  }
}

export class LoadOnePermissionFailed implements Action {
  readonly type = PermissionActionTypes.LoadOnePermissionFailed;

  constructor() {
  }
}

export class LoadPermissionsRequest implements Action {
  readonly type = PermissionActionTypes.LoadPermissionsRequest;

  constructor(public search: string) {
  }
}

export class LoadPermissionsIsNotLoadedRequest implements Action {
  readonly type = PermissionActionTypes.LoadPermissionsIsNotLoadedRequest;

  constructor() {
  }
}

export class LoadPermissionsSuccess implements Action {
  readonly type = PermissionActionTypes.LoadPermissionsSuccess;

  constructor(public payload: { permission: Permission[] }) {
  }
}

export class LoadPermissionsFailed implements Action {
  readonly type = PermissionActionTypes.LoadPermissionsFailed;

  constructor() {
    console.warn('tra errHHHHHHHHHHHHHHHHHHHHHHHHHH');
  }
}


export type PermissionActions =
  Permissionsloading |
  LoadPermissionsRequest |
  LoadPermissionsSuccess |
  LoadPermissionsFailed |
  LoadOnePermissionRequest |
  LoadOnePermissionSuccess |
  LoadOnePermissionFailed |
  LoadPermissionsIsNotLoadedRequest;
