import {Action} from '@ngrx/store';
import {Commercial} from '../model/commercial';

export enum CommercialActionTypes {
  LoadCommercialsIsNotLoadedRequest = '[Commercial] LoadCommercialsIsNotLoadedRequest Commercial',
  LoadCommercialsRequest = '[Commercial] LoadCommercialsRequest Commercial',
  LoadCommercialsSuccess = '[Commercial] LoadCommercialsSuccess Commercial',
  LoadCommercialsFailed = '[Commercial] LoadCommercialsFailed Commercial',
  Commercialsloading = '[Commercial] Commercialsloading Commercial',

  LoadOneCommercialRequest = '[Commercial] LoadOneCommercialRequest Commercial',
  LoadOneCommercialSuccess = '[Commercial] LoadOneCommercialSuccess Commercial',
  LoadOneCommercialFailed = '[Commercial] LoadOneCommercialFailed Commercial',

  SaveCommercialRequest = '[Commercial] SaveCommercialsRequest Commercial',
  SaveCommercialSuccess = '[Commercial] SaveCommercialsSuccess Commercial',
  SaveCommercialFailed = '[Commercial] SaveCommercialsFailed Commercial',

  UpdateCommercialchangePasswordRequest = '[Commercial] UpdateCommercialchangePasswordRequest Commercial',
  UpdateCommercialchangePasswordSuccess = '[Commercial] UpdateCommercialchangePasswordSuccess  Commercial',
  UpdateCommercialchangePasswordFailed = '[Commercial] UpdateCommercialchangePasswordFailed Commercial',
  UpdateCommercialProfileRequest = '[Commercial] UpdateCommercialProfileRequest Commercial',
  UpdateCommercialRequest = '[Commercial] UpdateCommercialsRequest Commercial',
  UpdateCommercialSuccess = '[Commercial] UpdateCommercialsSuccess Commercial',
  UpdateCommercialFailed = '[Commercial] UpdateCommercialsFailed Commercial',

  DeleteCommercialRequest = '[Commercial] DeleteCommercialsRequest Commercial',
  DeleteCommercialSuccess = '[Commercial] DeleteCommercialsSuccess Commercial',
  DeleteCommercialFailed = '[Commercial] DeleteCommercialsFailed Commercial',

}

export class DeleteCommercialRequest implements Action {
  readonly type = CommercialActionTypes.DeleteCommercialRequest;

  constructor(public payload: { id: number }) {
  }
}

export class DeleteCommercialSuccess implements Action {
  readonly type = CommercialActionTypes.DeleteCommercialSuccess;

  constructor() {
  }
}

export class Commercialsloading implements Action {
  readonly type = CommercialActionTypes.Commercialsloading;

  constructor() {
  }
}

export class DeleteCommercialFailed implements Action {
  readonly type = CommercialActionTypes.DeleteCommercialFailed;

  constructor() {
  }
}

export class UpdateCommercialProfileRequest implements Action {
  readonly type = CommercialActionTypes.UpdateCommercialProfileRequest;

  constructor(public payload: { commercial: Commercial }) {
  }
}

export class UpdateCommercialchangePasswordRequest implements Action {
  readonly type = CommercialActionTypes.UpdateCommercialchangePasswordRequest;

  constructor(public payload: { user: any }) {
  }
}

export class UpdateCommercialchangePasswordSuccess implements Action {
  readonly type = CommercialActionTypes.UpdateCommercialchangePasswordSuccess;

  constructor() {
  }
}

export class UpdateCommercialchangePasswordFailed implements Action {
  readonly type = CommercialActionTypes.UpdateCommercialchangePasswordFailed;

  constructor() {
  }
}

export class UpdateCommercialRequest implements Action {
  readonly type = CommercialActionTypes.UpdateCommercialRequest;

  constructor(public payload: { commercial: Commercial }) {
  }
}

export class UpdateCommercialSuccess implements Action {
  readonly type = CommercialActionTypes.UpdateCommercialSuccess;

  constructor(public payload: { commercial: Commercial }) {
  }
}

export class UpdateCommercialFailed implements Action {
  readonly type = CommercialActionTypes.UpdateCommercialFailed;

  constructor() {
  }
}

export class SaveCommercialRequest implements Action {
  readonly type = CommercialActionTypes.SaveCommercialRequest;

  constructor(public payload: { commercial: Commercial }) {
  }
}

export class SaveCommercialSuccess implements Action {
  readonly type = CommercialActionTypes.SaveCommercialSuccess;

  constructor(public payload: { commercial: Commercial }) {
  }
}

export class SaveCommercialFailed implements Action {
  readonly type = CommercialActionTypes.SaveCommercialFailed;

  constructor() {
  }
}

export class LoadOneCommercialRequest implements Action {
  readonly type = CommercialActionTypes.LoadOneCommercialRequest;

  constructor(public payload: { id: number }) {
  }
}

export class LoadOneCommercialSuccess implements Action {
  readonly type = CommercialActionTypes.LoadOneCommercialSuccess;

  constructor(public payload: { commercial: Commercial }) {
  }
}

export class LoadOneCommercialFailed implements Action {
  readonly type = CommercialActionTypes.LoadOneCommercialFailed;

  constructor() {
  }
}

export class LoadCommercialsRequest implements Action {
  readonly type = CommercialActionTypes.LoadCommercialsRequest;

  constructor(public search: string) {
  }
}

export class LoadCommercialsIsNotLoadedRequest implements Action {
  readonly type = CommercialActionTypes.LoadCommercialsIsNotLoadedRequest;

  constructor() {
  }
}

export class LoadCommercialsSuccess implements Action {
  readonly type = CommercialActionTypes.LoadCommercialsSuccess;

  constructor(public payload: { commercial: Commercial[] }) {
  }
}

export class LoadCommercialsFailed implements Action {
  readonly type = CommercialActionTypes.LoadCommercialsFailed;

  constructor() {
  }
}


export type CommercialActions = LoadCommercialsRequest |
  LoadCommercialsSuccess |
  LoadCommercialsFailed |
  SaveCommercialRequest |
  SaveCommercialSuccess |
  SaveCommercialFailed |
  Commercialsloading |

  UpdateCommercialchangePasswordFailed |
  UpdateCommercialchangePasswordRequest |
  UpdateCommercialchangePasswordSuccess |
  UpdateCommercialProfileRequest |
  UpdateCommercialRequest |
  UpdateCommercialSuccess |
  UpdateCommercialFailed |
  DeleteCommercialRequest |
  DeleteCommercialSuccess |
  DeleteCommercialFailed |
  LoadOneCommercialRequest |
  LoadOneCommercialSuccess |
  LoadOneCommercialFailed |
  LoadCommercialsIsNotLoadedRequest;
