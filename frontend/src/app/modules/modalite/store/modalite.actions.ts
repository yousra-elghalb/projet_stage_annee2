import {Action} from '@ngrx/store';
import {PaginatorInformations} from '../../../shared_models/paginator-informations';
import {PaginatedResult} from '../../../shared_models/paginated-result';
import {Modalite} from '../model/modalite';

export enum ModaliteActionTypes {
  LoadModalitesIsNotLoadedRequest = '[Modalite] LoadModalitesIsNotLoadedRequest Modalite',
  LoadModalitesRequest = '[Modalite] LoadModalitesRequest Modalite',
  LoadModalitesSuccess = '[Modalite] LoadModalitesSuccess Modalite',
  LoadModalitesFailed = '[Modalite] LoadModalitesFailed Modalite',
  Modalitesloading = '[Modalite] Modalitesloading Modalite',

  LoadOneModaliteRequest = '[Modalite] LoadOneModaliteRequest Modalite',
  LoadOneModaliteSuccess = '[Modalite] LoadOneModaliteSuccess Modalite',
  LoadOneModaliteFailed = '[Modalite] LoadOneModaliteFailed Modalite',

  SaveModaliteRequest = '[Modalite] SaveModalitesRequest Modalite',
  SaveModaliteSuccess = '[Modalite] SaveModalitesSuccess Modalite',
  SaveModaliteFailed = '[Modalite] SaveModalitesFailed Modalite',


  UpdateModaliteRequest = '[Modalite] UpdateModalitesRequest Modalite',
  UpdateModaliteSuccess = '[Modalite] UpdateModalitesSuccess Modalite',
  UpdateModaliteFailed = '[Modalite] UpdateModalitesFailed Modalite',

  DeleteModaliteRequest = '[Modalite] DeleteModalitesRequest Modalite',
  DeleteModaliteSuccess = '[Modalite] DeleteModalitesSuccess Modalite',
  DeleteModaliteFailed = '[Modalite] DeleteModalitesFailed Modalite',

}

export class DeleteModaliteRequest implements Action {
  readonly type = ModaliteActionTypes.DeleteModaliteRequest;

  constructor(public payload: { id: number }) {
  }
}

export class DeleteModaliteSuccess implements Action {
  readonly type = ModaliteActionTypes.DeleteModaliteSuccess;

  constructor() {
  }
}

export class DeleteModaliteFailed implements Action {
  readonly type = ModaliteActionTypes.DeleteModaliteFailed;

  constructor() {
  }
}
export class Modalitesloading implements Action {
  readonly type = ModaliteActionTypes.Modalitesloading;

  constructor() {
  }
}

export class UpdateModaliteRequest implements Action {
  readonly type = ModaliteActionTypes.UpdateModaliteRequest;

  constructor(public payload: { modalite: Modalite }) {
  }
}

export class UpdateModaliteSuccess implements Action {
  readonly type = ModaliteActionTypes.UpdateModaliteSuccess;

  constructor(public payload: { modalite: Modalite }) {
  }
}

export class UpdateModaliteFailed implements Action {
  readonly type = ModaliteActionTypes.UpdateModaliteFailed;

  constructor() {
  }
}

export class SaveModaliteRequest implements Action {
  readonly type = ModaliteActionTypes.SaveModaliteRequest;

  constructor(public payload: { modalite: Modalite }) {
  }
}

export class SaveModaliteSuccess implements Action {
  readonly type = ModaliteActionTypes.SaveModaliteSuccess;

  constructor(public payload: { modalite: Modalite }) {
  }
}

export class SaveModaliteFailed implements Action {
  readonly type = ModaliteActionTypes.SaveModaliteFailed;

  constructor() {
  }
}

export class LoadOneModaliteRequest implements Action {
  readonly type = ModaliteActionTypes.LoadOneModaliteRequest;

  constructor(public payload: { id: number }) {
  }
}

export class LoadOneModaliteSuccess implements Action {
  readonly type = ModaliteActionTypes.LoadOneModaliteSuccess;

  constructor(public payload: { modalite: Modalite }) {
  }
}

export class LoadOneModaliteFailed implements Action {
  readonly type = ModaliteActionTypes.LoadOneModaliteFailed;

  constructor() {
  }
}

export class LoadModalitesRequest implements Action {
  readonly type = ModaliteActionTypes.LoadModalitesRequest;

  constructor(public search: string, public paginatorInformations: PaginatorInformations) {
  }
}

export class LoadModalitesIsNotLoadedRequest implements Action {
  readonly type = ModaliteActionTypes.LoadModalitesIsNotLoadedRequest;

  constructor() {
  }
}

export class LoadModalitesSuccess implements Action {
  readonly type = ModaliteActionTypes.LoadModalitesSuccess;

  constructor(public payload: { paginatedResults: PaginatedResult<Modalite> }) {
  }
}

export class LoadModalitesFailed implements Action {
  readonly type = ModaliteActionTypes.LoadModalitesFailed;

  constructor() {
    console.warn('tra errHHHHHHHHHHHHHHHHHHHHHHHHHH');
  }
}


export type ModaliteActions = LoadModalitesRequest |
  LoadModalitesSuccess |
  LoadModalitesFailed |
  SaveModaliteRequest |
  SaveModaliteSuccess |
  SaveModaliteFailed |
  Modalitesloading |

  UpdateModaliteRequest |
  UpdateModaliteSuccess |
  UpdateModaliteFailed |
  DeleteModaliteRequest |
  DeleteModaliteSuccess |
  DeleteModaliteFailed |
  LoadOneModaliteRequest |
  LoadOneModaliteSuccess |
  LoadOneModaliteFailed |
  LoadModalitesIsNotLoadedRequest;
