import {Action} from '@ngrx/store';
import {PaginatorInformations} from '../../../shared_models/paginator-informations';
import {PaginatedResult} from '../../../shared_models/paginated-result';
import {Voyage} from '../model/voyage';
import {Role} from '../../role/model/role';

export enum VoyageActionTypes {
  LoadVoyagesIsNotLoadedRequest = '[Voyage] LoadVoyagesIsNotLoadedRequest Voyage',
  LoadVoyagesRequest = '[Voyage] LoadVoyagesRequest Voyage',
  LoadVoyagesSuccess = '[Voyage] LoadVoyagesSuccess Voyage',
  LoadVoyagesFailed = '[Voyage] LoadVoyagesFailed Voyage',

  LoadOneVoyageRequest = '[Voyage] LoadOneVoyageRequest Voyage',
  LoadOneVoyageSuccess = '[Voyage] LoadOneVoyageSuccess Voyage',
  LoadOneVoyageFailed = '[Voyage] LoadOneVoyageFailed Voyage',

  SaveVoyageRequest = '[Voyage] SaveVoyagesRequest Voyage',
  SaveVoyageSuccess = '[Voyage] SaveVoyagesSuccess Voyage',
  SaveVoyageFailed = '[Voyage] SaveVoyagesFailed Voyage',


  UpdateVoyageRequest = '[Voyage] UpdateVoyagesRequest Voyage',
  UpdateVoyageSuccess = '[Voyage] UpdateVoyagesSuccess Voyage',
  UpdateVoyageFailed = '[Voyage] UpdateVoyagesFailed Voyage',

  DeleteVoyageRequest = '[Voyage] DeleteVoyagesRequest Voyage',
  DeleteVoyageSuccess = '[Voyage] DeleteVoyagesSuccess Voyage',
  DeleteVoyageFailed = '[Voyage] DeleteVoyagesFailed Voyage',

}

export class DeleteVoyageRequest implements Action {
  readonly type = VoyageActionTypes.DeleteVoyageRequest;

  constructor(public payload: { id: number }) {
  }
}

export class DeleteVoyageSuccess implements Action {
  readonly type = VoyageActionTypes.DeleteVoyageSuccess;

  constructor() {
  }
}

export class DeleteVoyageFailed implements Action {
  readonly type = VoyageActionTypes.DeleteVoyageFailed;

  constructor() {
  }
}

export class UpdateVoyageRequest implements Action {
  readonly type = VoyageActionTypes.UpdateVoyageRequest;

  constructor(public payload: { voyage: Voyage }) {
  }
}

export class UpdateVoyageSuccess implements Action {
  readonly type = VoyageActionTypes.UpdateVoyageSuccess;

  constructor(public payload: { voyage: Voyage }) {
  }
}

export class UpdateVoyageFailed implements Action {
  readonly type = VoyageActionTypes.UpdateVoyageFailed;

  constructor() {
  }
}

export class SaveVoyageRequest implements Action {
  readonly type = VoyageActionTypes.SaveVoyageRequest;

  constructor(public payload: { voyage: Voyage }) {
  }
}

export class SaveVoyageSuccess implements Action {
  readonly type = VoyageActionTypes.SaveVoyageSuccess;

  constructor(public payload: { voyage: Voyage }) {
  }
}

export class SaveVoyageFailed implements Action {
  readonly type = VoyageActionTypes.SaveVoyageFailed;

  constructor() {
  }
}

export class LoadOneVoyageRequest implements Action {
  readonly type = VoyageActionTypes.LoadOneVoyageRequest;

  constructor(public payload: { id: number }) {
  }
}

export class LoadOneVoyageSuccess implements Action {
  readonly type = VoyageActionTypes.LoadOneVoyageSuccess;

  constructor(public payload: { voyage: Voyage }) {
  }
}

export class LoadOneVoyageFailed implements Action {
  readonly type = VoyageActionTypes.LoadOneVoyageFailed;

  constructor() {
  }
}

export class LoadVoyagesRequest implements Action {
  readonly type = VoyageActionTypes.LoadVoyagesRequest;

  constructor(public search: string, public paginatorInformations: PaginatorInformations) {
  }
}

export class LoadVoyagesIsNotLoadedRequest implements Action {
  readonly type = VoyageActionTypes.LoadVoyagesIsNotLoadedRequest;

  constructor() {
  }
}

export class LoadVoyagesSuccess implements Action {
  readonly type = VoyageActionTypes.LoadVoyagesSuccess;

  constructor(public payload: { paginatedResults: PaginatedResult<Voyage> }) {
  }
}

export class LoadVoyagesFailed implements Action {
  readonly type = VoyageActionTypes.LoadVoyagesFailed;

  constructor() {
    console.warn('tra errHHHHHHHHHHHHHHHHHHHHHHHHHH');
  }
}


export type VoyageActions = LoadVoyagesRequest |
  LoadVoyagesSuccess |
  LoadVoyagesFailed |
  SaveVoyageRequest |
  SaveVoyageSuccess |
  SaveVoyageFailed |

  UpdateVoyageRequest |
  UpdateVoyageSuccess |
  UpdateVoyageFailed |
  DeleteVoyageRequest |
  DeleteVoyageSuccess |
  DeleteVoyageFailed |
  LoadOneVoyageRequest |
  LoadOneVoyageSuccess |
  LoadOneVoyageFailed |
  LoadVoyagesIsNotLoadedRequest;
