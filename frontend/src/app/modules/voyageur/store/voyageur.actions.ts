import {Action} from '@ngrx/store';
import {PaginatorInformations} from '../../../shared_models/paginator-informations';
import {PaginatedResult} from '../../../shared_models/paginated-result';
import {Voyageur} from '../model/voyageur';

export enum VoyageurActionTypes {
  LoadVoyageursIsNotLoadedRequest = '[Voyageur] LoadVoyageursIsNotLoadedRequest Voyageur',
  LoadVoyageursRequest = '[Voyageur] LoadVoyageursRequest Voyageur',
  LoadVoyageursSuccess = '[Voyageur] LoadVoyageursSuccess Voyageur',
  LoadVoyageursFailed = '[Voyageur] LoadVoyageursFailed Voyageur',
  Voyageursloading = '[Voyageur] Voyageursloading Voyageur',

  LoadOneVoyageurRequest = '[Voyageur] LoadOneVoyageurRequest Voyageur',
  LoadOneVoyageurSuccess = '[Voyageur] LoadOneVoyageurSuccess Voyageur',
  LoadOneVoyageurFailed = '[Voyageur] LoadOneVoyageurFailed Voyageur',

  SaveVoyageurRequest = '[Voyageur] SaveVoyageursRequest Voyageur',
  SaveVoyageurSuccess = '[Voyageur] SaveVoyageursSuccess Voyageur',
  SaveVoyageurFailed = '[Voyageur] SaveVoyageursFailed Voyageur',


  UpdateVoyageurRequest = '[Voyageur] UpdateVoyageursRequest Voyageur',
  UpdateVoyageurSuccess = '[Voyageur] UpdateVoyageursSuccess Voyageur',
  UpdateVoyageurFailed = '[Voyageur] UpdateVoyageursFailed Voyageur',

  DeleteVoyageurRequest = '[Voyageur] DeleteVoyageursRequest Voyageur',
  DeleteVoyageurSuccess = '[Voyageur] DeleteVoyageursSuccess Voyageur',
  DeleteVoyageurFailed = '[Voyageur] DeleteVoyageursFailed Voyageur',

}

export class DeleteVoyageurRequest implements Action {
  readonly type = VoyageurActionTypes.DeleteVoyageurRequest;

  constructor(public payload: { id: number }) {
  }
}

export class DeleteVoyageurSuccess implements Action {
  readonly type = VoyageurActionTypes.DeleteVoyageurSuccess;

  constructor() {
  }
}

export class DeleteVoyageurFailed implements Action {
  readonly type = VoyageurActionTypes.DeleteVoyageurFailed;

  constructor() {
  }
}

export class Voyageursloading implements Action {
  readonly type = VoyageurActionTypes.Voyageursloading;

  constructor() {
  }
}

export class UpdateVoyageurRequest implements Action {
  readonly type = VoyageurActionTypes.UpdateVoyageurRequest;

  constructor(public payload: { voyageur: Voyageur }) {
  }
}

export class UpdateVoyageurSuccess implements Action {
  readonly type = VoyageurActionTypes.UpdateVoyageurSuccess;

  constructor(public payload: { voyageur: Voyageur }) {
  }
}

export class UpdateVoyageurFailed implements Action {
  readonly type = VoyageurActionTypes.UpdateVoyageurFailed;

  constructor() {
  }
}

export class SaveVoyageurRequest implements Action {
  readonly type = VoyageurActionTypes.SaveVoyageurRequest;

  constructor(public payload: { voyageur: Voyageur }) {
  }
}

export class SaveVoyageurSuccess implements Action {
  readonly type = VoyageurActionTypes.SaveVoyageurSuccess;

  constructor(public payload: { voyageur: Voyageur }) {
  }
}

export class SaveVoyageurFailed implements Action {
  readonly type = VoyageurActionTypes.SaveVoyageurFailed;

  constructor(error: any) {
    console.warn(error);
  }
}

export class LoadOneVoyageurRequest implements Action {
  readonly type = VoyageurActionTypes.LoadOneVoyageurRequest;

  constructor(public payload: { id: number }) {
  }
}

export class LoadOneVoyageurSuccess implements Action {
  readonly type = VoyageurActionTypes.LoadOneVoyageurSuccess;

  constructor(public payload: { voyageur: Voyageur }) {
  }
}

export class LoadOneVoyageurFailed implements Action {
  readonly type = VoyageurActionTypes.LoadOneVoyageurFailed;

  constructor() {
  }
}

export class LoadVoyageursRequest implements Action {
  readonly type = VoyageurActionTypes.LoadVoyageursRequest;


  constructor(public black: any, public fidele: any, public search: string, public paginatorInformations: PaginatorInformations) {
  }
}

export class LoadVoyageursIsNotLoadedRequest implements Action {
  readonly type = VoyageurActionTypes.LoadVoyageursIsNotLoadedRequest;

  constructor() {
  }
}

export class LoadVoyageursSuccess implements Action {
  readonly type = VoyageurActionTypes.LoadVoyageursSuccess;

  constructor(public payload: {
    fidele: any;
    paginatedResults: PaginatedResult<Voyageur>
  }) {
  }
}

export class LoadVoyageursFailed implements Action {
  readonly type = VoyageurActionTypes.LoadVoyageursFailed;

  constructor() {
    console.warn('tra errHHHHHHHHHHHHHHHHHHHHHHHHHH');
  }
}


export type VoyageurActions = LoadVoyageursRequest |
  LoadVoyageursSuccess |
  LoadVoyageursFailed |
  SaveVoyageurRequest |
  SaveVoyageurSuccess |
  SaveVoyageurFailed |
  Voyageursloading |

  UpdateVoyageurRequest |
  UpdateVoyageurSuccess |
  UpdateVoyageurFailed |
  DeleteVoyageurRequest |
  DeleteVoyageurSuccess |
  DeleteVoyageurFailed |
  LoadOneVoyageurRequest |
  LoadOneVoyageurSuccess |
  LoadOneVoyageurFailed |
  LoadVoyageursIsNotLoadedRequest;
