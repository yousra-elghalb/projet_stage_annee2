import {Action} from '@ngrx/store';
import {OffreVoyageLimited} from '../model/offre-voyage-limited';
import {PaginatorInformations} from '../../../shared_models/paginator-informations';
import {PaginatedResult} from '../../../shared_models/paginated-result';
import {Voyageur} from '../../voyageur/model/voyageur';


export enum OffreVoyageLimitedActionTypes {
  LoadOffreVoyageLimitedsRequest = '[OffreVoyageLimited] LoadOffreVoyageLimitedsRequest OffreVoyageLimited',
  LoadOffreVoyageLimitedsSuccess = '[OffreVoyageLimited] LoadOffreVoyageLimitedsSuccess OffreVoyageLimited',
  LoadOffreVoyageLimitedsFailed = '[OffreVoyageLimited] LoadOffreVoyageLimitedsFailed OffreVoyageLimited',


  LoadOffreVoyageLimitedByOffreVoyageIdsRequest = '[OffreVoyageLimitedByOffreVoyageId] LoadOffreVoyageLimitedsRequest OffreVoyageLimited',

  LoadOneOffreVoyageLimitedRequest = '[OffreVoyageLimited] LoadOneOffreVoyageLimitedRequest OffreVoyageLimited',
  LoadOneOffreVoyageLimitedSuccess = '[OffreVoyageLimited] LoadOneOffreVoyageLimitedSuccess OffreVoyageLimited',
  LoadOneOffreVoyageLimitedFailed = '[OffreVoyageLimited] LoadOneOffreVoyageLimitedFailed OffreVoyageLimited',

  SaveOffreVoyageLimitedRequest = '[OffreVoyageLimited] SaveOffreVoyageLimitedsRequest OffreVoyageLimited',
  SaveOffreVoyageLimitedSuccess = '[OffreVoyageLimited] SaveOffreVoyageLimitedsSuccess OffreVoyageLimited',
  SaveOffreVoyageLimitedFailed = '[OffreVoyageLimited] SaveOffreVoyageLimitedsFailed OffreVoyageLimited',


  UpdateOffreVoyageLimitedRequest = '[OffreVoyageLimited] UpdateOffreVoyageLimitedsRequest OffreVoyageLimited',
  UpdateOffreVoyageLimitedSuccess = '[OffreVoyageLimited] UpdateOffreVoyageLimitedsSuccess OffreVoyageLimited',
  UpdateOffreVoyageLimitedFailed = '[OffreVoyageLimited] UpdateOffreVoyageLimitedsFailed OffreVoyageLimited',

  DeleteOffreVoyageLimitedRequest = '[OffreVoyageLimited] DeleteOffreVoyageLimitedsRequest OffreVoyageLimited',
  DeleteOffreVoyageLimitedSuccess = '[OffreVoyageLimited] DeleteOffreVoyageLimitedsSuccess OffreVoyageLimited',
  DeleteOffreVoyageLimitedFailed = '[OffreVoyageLimited] DeleteOffreVoyageLimitedsFailed OffreVoyageLimited',


}


export class DeleteOffreVoyageLimitedRequest implements Action {
  readonly type = OffreVoyageLimitedActionTypes.DeleteOffreVoyageLimitedRequest;

  constructor(public payload: { id: number }) {
  }
}

export class DeleteOffreVoyageLimitedSuccess implements Action {
  readonly type = OffreVoyageLimitedActionTypes.DeleteOffreVoyageLimitedSuccess;

  constructor() {
  }
}

export class DeleteOffreVoyageLimitedFailed implements Action {
  readonly type = OffreVoyageLimitedActionTypes.DeleteOffreVoyageLimitedFailed;

  constructor() {
  }
}

export class UpdateOffreVoyageLimitedRequest implements Action {
  readonly type = OffreVoyageLimitedActionTypes.UpdateOffreVoyageLimitedRequest;

  constructor(public payload: { offreVoyageLimited: OffreVoyageLimited }) {
  }
}

export class UpdateOffreVoyageLimitedSuccess implements Action {
  readonly type = OffreVoyageLimitedActionTypes.UpdateOffreVoyageLimitedSuccess;

  constructor(public payload: { offreVoyageLimited: OffreVoyageLimited }) {
  }
}

export class UpdateOffreVoyageLimitedFailed implements Action {
  readonly type = OffreVoyageLimitedActionTypes.UpdateOffreVoyageLimitedFailed;

  constructor() {
  }
}

export class SaveOffreVoyageLimitedRequest implements Action {
  readonly type = OffreVoyageLimitedActionTypes.SaveOffreVoyageLimitedRequest;

  constructor(public payload: { data: OffreVoyageLimited[] }) {
  }
}

export class SaveOffreVoyageLimitedSuccess implements Action {
  readonly type = OffreVoyageLimitedActionTypes.SaveOffreVoyageLimitedSuccess;

  constructor() {
  }
}

export class SaveOffreVoyageLimitedFailed implements Action {
  readonly type = OffreVoyageLimitedActionTypes.SaveOffreVoyageLimitedFailed;

  constructor(error?: any) {
    console.warn(error);

  }
}

export class LoadOneOffreVoyageLimitedRequest implements Action {
  readonly type = OffreVoyageLimitedActionTypes.LoadOneOffreVoyageLimitedRequest;

  constructor(public payload: { id: number }) {
  }
}

export class LoadOneOffreVoyageLimitedSuccess implements Action {
  readonly type = OffreVoyageLimitedActionTypes.LoadOneOffreVoyageLimitedSuccess;

  constructor(public payload: { offreVoyageLimited: OffreVoyageLimited }) {
  }
}

export class LoadOneOffreVoyageLimitedFailed implements Action {
  readonly type = OffreVoyageLimitedActionTypes.LoadOneOffreVoyageLimitedFailed;

  constructor() {
  }
}

export class LoadOffreVoyageLimitedsRequest implements Action {
  readonly type = OffreVoyageLimitedActionTypes.LoadOffreVoyageLimitedsRequest;

  constructor(public search: string, public paginatorInformations: PaginatorInformations) {
  }
}

export class LoadOffreVoyageLimitedByOffreVoyageIdsRequest implements Action {
  readonly type = OffreVoyageLimitedActionTypes.LoadOffreVoyageLimitedByOffreVoyageIdsRequest;

  constructor(public id: string, public search: string, public paginatorInformations: PaginatorInformations) {
  }
}


export class LoadOffreVoyageLimitedsSuccess implements Action {
  readonly type = OffreVoyageLimitedActionTypes.LoadOffreVoyageLimitedsSuccess;

  constructor(public payload: { paginatedResults: PaginatedResult<OffreVoyageLimited> }) {
  }
}

export class LoadOffreVoyageLimitedsFailed implements Action {
  readonly type = OffreVoyageLimitedActionTypes.LoadOffreVoyageLimitedsFailed;

  constructor() {
  }
}


export type OffreVoyageLimitedActions =
  LoadOffreVoyageLimitedByOffreVoyageIdsRequest |
  LoadOffreVoyageLimitedsRequest |
  LoadOffreVoyageLimitedsSuccess |
  LoadOffreVoyageLimitedsFailed |
  SaveOffreVoyageLimitedRequest |
  SaveOffreVoyageLimitedSuccess |
  SaveOffreVoyageLimitedFailed |


  UpdateOffreVoyageLimitedRequest |
  UpdateOffreVoyageLimitedSuccess |
  UpdateOffreVoyageLimitedFailed |
  DeleteOffreVoyageLimitedRequest |
  DeleteOffreVoyageLimitedSuccess |
  DeleteOffreVoyageLimitedFailed |
  LoadOneOffreVoyageLimitedRequest |
  LoadOneOffreVoyageLimitedSuccess |
  LoadOneOffreVoyageLimitedFailed;
