import {Action} from '@ngrx/store';
import {PaginatorInformations} from '../../../shared_models/paginator-informations';
import {PaginatedResult} from '../../../shared_models/paginated-result';
import {Agence} from '../model/agence';

export enum AgenceActionTypes {
  LoadAgencesIsNotLoadedRequest = '[Agence] LoadAgencesIsNotLoadedRequest Agence',
  LoadAgencesRequest = '[Agence] LoadAgencesRequest Agence',
  LoadAgencesSuccess = '[Agence] LoadAgencesSuccess Agence',
  LoadAgencesFailed = '[Agence] LoadAgencesFailed Agence',
  Agencesloading = '[Agence] Agencesloading Agence',

  LoadOneAgenceRequest = '[Agence] LoadOneAgenceRequest Agence',
  LoadOneAgenceSuccess = '[Agence] LoadOneAgenceSuccess Agence',
  LoadOneAgenceFailed = '[Agence] LoadOneAgenceFailed Agence',

  SaveAgenceRequest = '[Agence] SaveAgencesRequest Agence',
  SaveAgenceSuccess = '[Agence] SaveAgencesSuccess Agence',
  SaveAgenceFailed = '[Agence] SaveAgencesFailed Agence',


  UpdateAgenceRequest = '[Agence] UpdateAgencesRequest Agence',
  UpdateAgenceSuccess = '[Agence] UpdateAgencesSuccess Agence',
  UpdateAgenceFailed = '[Agence] UpdateAgencesFailed Agence',

  DeleteAgenceRequest = '[Agence] DeleteAgencesRequest Agence',
  DeleteAgenceSuccess = '[Agence] DeleteAgencesSuccess Agence',
  DeleteAgenceFailed = '[Agence] DeleteAgencesFailed Agence',

}

export class DeleteAgenceRequest implements Action {
  readonly type = AgenceActionTypes.DeleteAgenceRequest;

  constructor(public payload: { id: number }) {
  }
}

export class DeleteAgenceSuccess implements Action {
  readonly type = AgenceActionTypes.DeleteAgenceSuccess;

  constructor() {
  }
}

export class DeleteAgenceFailed implements Action {
  readonly type = AgenceActionTypes.DeleteAgenceFailed;

  constructor() {
  }
}

export class Agencesloading implements Action {
  readonly type = AgenceActionTypes.Agencesloading;

  constructor() {
  }
}

export class UpdateAgenceRequest implements Action {
  readonly type = AgenceActionTypes.UpdateAgenceRequest;

  constructor(public payload: { agence: Agence }) {
  }
}

export class UpdateAgenceSuccess implements Action {
  readonly type = AgenceActionTypes.UpdateAgenceSuccess;

  constructor(public payload: { agence: Agence }) {
  }
}

export class UpdateAgenceFailed implements Action {
  readonly type = AgenceActionTypes.UpdateAgenceFailed;

  constructor() {
  }
}

export class SaveAgenceRequest implements Action {
  readonly type = AgenceActionTypes.SaveAgenceRequest;

  constructor(public payload: { agence: Agence }) {
  }
}

export class SaveAgenceSuccess implements Action {
  readonly type = AgenceActionTypes.SaveAgenceSuccess;

  constructor(public payload: { agence: Agence }) {
  }
}

export class SaveAgenceFailed implements Action {
  readonly type = AgenceActionTypes.SaveAgenceFailed;

  constructor() {
  }
}

export class LoadOneAgenceRequest implements Action {
  readonly type = AgenceActionTypes.LoadOneAgenceRequest;

  constructor(public payload: { id: number }) {
  }
}

export class LoadOneAgenceSuccess implements Action {
  readonly type = AgenceActionTypes.LoadOneAgenceSuccess;

  constructor(public payload: { agence: Agence }) {
  }
}

export class LoadOneAgenceFailed implements Action {
  readonly type = AgenceActionTypes.LoadOneAgenceFailed;

  constructor() {
  }
}

export class LoadAgencesRequest implements Action {
  readonly type = AgenceActionTypes.LoadAgencesRequest;

  constructor(public search: string) {
  }
}

export class LoadAgencesIsNotLoadedRequest implements Action {
  readonly type = AgenceActionTypes.LoadAgencesIsNotLoadedRequest;

  constructor() {
  }
}

export class LoadAgencesSuccess implements Action {
  readonly type = AgenceActionTypes.LoadAgencesSuccess;

  constructor(public payload: { agence: Agence[] }) {
  }
}

export class LoadAgencesFailed implements Action {
  readonly type = AgenceActionTypes.LoadAgencesFailed;

  constructor() {
    console.warn('tra errHHHHHHHHHHHHHHHHHHHHHHHHHH');
  }
}


export type AgenceActions = LoadAgencesRequest |
  LoadAgencesSuccess |
  LoadAgencesFailed |
  SaveAgenceRequest |
  SaveAgenceSuccess |
  SaveAgenceFailed |
  Agencesloading |

  UpdateAgenceRequest |
  UpdateAgenceSuccess |
  UpdateAgenceFailed |
  DeleteAgenceRequest |
  DeleteAgenceSuccess |
  DeleteAgenceFailed |
  LoadOneAgenceRequest |
  LoadOneAgenceSuccess |
  LoadOneAgenceFailed |
  LoadAgencesIsNotLoadedRequest;
