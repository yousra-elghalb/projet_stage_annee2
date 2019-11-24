import {Action} from '@ngrx/store';
import {PaginatorInformations} from '../../../shared_models/paginator-informations';
import {PaginatedResult} from '../../../shared_models/paginated-result';
import {Societe} from '../model/societe';

export enum SocieteActionTypes {
  SetIsLoadingSociete = '[Societe] SetIsLoadedAndIsLoadingSociete Societe',
  LoadSocietesIsNotLoadedRequest = '[Societe] LoadSocietesIsNotLoadedRequest Societe',
  LoadSocietesRequest = '[Societe] LoadSocietesRequest Societe',
  LoadSocietesSuccess = '[Societe] LoadSocietesSuccess Societe',
  LoadSocietesFailed = '[Societe] LoadSocietesFailed Societe',

  LoadOneSocieteRequest = '[Societe] LoadOneSocieteRequest Societe',
  LoadOneSocieteSuccess = '[Societe] LoadOneSocieteSuccess Societe',
  LoadOneSocieteFailed = '[Societe] LoadOneSocieteFailed Societe',

  SaveSocieteRequest = '[Societe] SaveSocietesRequest Societe',
  SaveSocieteSuccess = '[Societe] SaveSocietesSuccess Societe',
  SaveSocieteFailed = '[Societe] SaveSocietesFailed Societe',


  UpdateSocieteRequest = '[Societe] UpdateSocietesRequest Societe',
  UpdateSocieteSuccess = '[Societe] UpdateSocietesSuccess Societe',
  UpdateSocieteFailed = '[Societe] UpdateSocietesFailed Societe',

  DeleteSocieteRequest = '[Societe] DeleteSocietesRequest Societe',
  DeleteSocieteSuccess = '[Societe] DeleteSocietesSuccess Societe',
  DeleteSocieteFailed = '[Societe] DeleteSocietesFailed Societe',

}

export class DeleteSocieteRequest implements Action {
  readonly type = SocieteActionTypes.DeleteSocieteRequest;

  constructor(public payload: { id: number }) {
  }
}

export class DeleteSocieteSuccess implements Action {
  readonly type = SocieteActionTypes.DeleteSocieteSuccess;

  constructor() {
  }
}

export class DeleteSocieteFailed implements Action {
  readonly type = SocieteActionTypes.DeleteSocieteFailed;

  constructor() {
  }
}

export class UpdateSocieteRequest implements Action {
  readonly type = SocieteActionTypes.UpdateSocieteRequest;

  constructor(public payload: { societe: Societe }) {
  }
}

export class UpdateSocieteSuccess implements Action {
  readonly type = SocieteActionTypes.UpdateSocieteSuccess;

  constructor(public payload: { societe: Societe }) {
  }
}

export class UpdateSocieteFailed implements Action {
  readonly type = SocieteActionTypes.UpdateSocieteFailed;

  constructor() {
  }
}

export class SaveSocieteRequest implements Action {
  readonly type = SocieteActionTypes.SaveSocieteRequest;

  constructor(public payload: { societe: Societe }) {
  }
}

export class SaveSocieteSuccess implements Action {
  readonly type = SocieteActionTypes.SaveSocieteSuccess;

  constructor(public payload: { societe: Societe }) {
  }
}

export class SaveSocieteFailed implements Action {
  readonly type = SocieteActionTypes.SaveSocieteFailed;

  constructor() {
  }
}

export class LoadOneSocieteRequest implements Action {
  readonly type = SocieteActionTypes.LoadOneSocieteRequest;

  constructor(public payload: { id: number }) {
  }
}

export class LoadOneSocieteSuccess implements Action {
  readonly type = SocieteActionTypes.LoadOneSocieteSuccess;

  constructor(public payload: { societe: Societe }) {
  }
}

export class SetAndIsLoadingSociete implements Action {
  readonly type = SocieteActionTypes.SetIsLoadingSociete;

  constructor(public payload: { isLoading: boolean }) {
  }
}

export class LoadOneSocieteFailed implements Action {
  readonly type = SocieteActionTypes.LoadOneSocieteFailed;

  constructor() {
  }
}

export class LoadSocietesRequest implements Action {
  readonly type = SocieteActionTypes.LoadSocietesRequest;

  constructor(public search: string) {
  }
}

export class LoadSocietesIsNotLoadedRequest implements Action {
  readonly type = SocieteActionTypes.LoadSocietesIsNotLoadedRequest;

  constructor() {
  }
}

export class LoadSocietesSuccess implements Action {
  readonly type = SocieteActionTypes.LoadSocietesSuccess;

  constructor(public payload: { societe: Societe[] }) {
  }
}

export class LoadSocietesFailed implements Action {
  readonly type = SocieteActionTypes.LoadSocietesFailed;

  constructor() {
    console.warn('tra errHHHHHHHHHHHHHHHHHHHHHHHHHH');
  }
}


export type SocieteActions =
  SetAndIsLoadingSociete |
  LoadSocietesRequest |
  LoadSocietesSuccess |
  LoadSocietesFailed |
  SaveSocieteRequest |
  SaveSocieteSuccess |
  SaveSocieteFailed |

  UpdateSocieteRequest |
  UpdateSocieteSuccess |
  UpdateSocieteFailed |
  DeleteSocieteRequest |
  DeleteSocieteSuccess |
  DeleteSocieteFailed |
  LoadOneSocieteRequest |
  LoadOneSocieteSuccess |
  LoadOneSocieteFailed |
  LoadSocietesIsNotLoadedRequest;
