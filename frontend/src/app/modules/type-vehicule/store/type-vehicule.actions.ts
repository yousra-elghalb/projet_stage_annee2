import {Action} from '@ngrx/store';
import {PaginatorInformations} from '../../../shared_models/paginator-informations';
import {PaginatedResult} from '../../../shared_models/paginated-result';
import {TypeVehicule} from '../model/type-vehicule';

export enum TypeVehiculeActionTypes {
  SetIsLoadingTypeVehicule = '[TypeVehicule] SetIsLoadedAndIsLoadingTypeVehicule TypeVehicule',
  LoadTypeVehiculesIsNotLoadedRequest = '[TypeVehicule] LoadTypeVehiculesIsNotLoadedRequest TypeVehicule',
  LoadTypeVehiculesRequest = '[TypeVehicule] LoadTypeVehiculesRequest TypeVehicule',
  LoadTypeVehiculesSuccess = '[TypeVehicule] LoadTypeVehiculesSuccess TypeVehicule',
  LoadTypeVehiculesFailed = '[TypeVehicule] LoadTypeVehiculesFailed TypeVehicule',

  LoadOneTypeVehiculeRequest = '[TypeVehicule] LoadOneTypeVehiculeRequest TypeVehicule',
  LoadOneTypeVehiculeSuccess = '[TypeVehicule] LoadOneTypeVehiculeSuccess TypeVehicule',
  LoadOneTypeVehiculeFailed = '[TypeVehicule] LoadOneTypeVehiculeFailed TypeVehicule',

  SaveTypeVehiculeRequest = '[TypeVehicule] SaveTypeVehiculesRequest TypeVehicule',
  SaveTypeVehiculeSuccess = '[TypeVehicule] SaveTypeVehiculesSuccess TypeVehicule',
  SaveTypeVehiculeFailed = '[TypeVehicule] SaveTypeVehiculesFailed TypeVehicule',


  UpdateTypeVehiculeRequest = '[TypeVehicule] UpdateTypeVehiculesRequest TypeVehicule',
  UpdateTypeVehiculeSuccess = '[TypeVehicule] UpdateTypeVehiculesSuccess TypeVehicule',
  UpdateTypeVehiculeFailed = '[TypeVehicule] UpdateTypeVehiculesFailed TypeVehicule',

  DeleteTypeVehiculeRequest = '[TypeVehicule] DeleteTypeVehiculesRequest TypeVehicule',
  DeleteTypeVehiculeSuccess = '[TypeVehicule] DeleteTypeVehiculesSuccess TypeVehicule',
  DeleteTypeVehiculeFailed = '[TypeVehicule] DeleteTypeVehiculesFailed TypeVehicule',

}

export class DeleteTypeVehiculeRequest implements Action {
  readonly type = TypeVehiculeActionTypes.DeleteTypeVehiculeRequest;

  constructor(public payload: { id: number }) {
  }
}

export class DeleteTypeVehiculeSuccess implements Action {
  readonly type = TypeVehiculeActionTypes.DeleteTypeVehiculeSuccess;

  constructor() {
  }
}

export class DeleteTypeVehiculeFailed implements Action {
  readonly type = TypeVehiculeActionTypes.DeleteTypeVehiculeFailed;

  constructor() {
  }
}

export class UpdateTypeVehiculeRequest implements Action {
  readonly type = TypeVehiculeActionTypes.UpdateTypeVehiculeRequest;

  constructor(public payload: { typeVehicule: TypeVehicule }) {
  }
}

export class UpdateTypeVehiculeSuccess implements Action {
  readonly type = TypeVehiculeActionTypes.UpdateTypeVehiculeSuccess;

  constructor(public payload: { typeVehicule: TypeVehicule }) {
  }
}

export class UpdateTypeVehiculeFailed implements Action {
  readonly type = TypeVehiculeActionTypes.UpdateTypeVehiculeFailed;

  constructor() {
  }
}

export class SaveTypeVehiculeRequest implements Action {
  readonly type = TypeVehiculeActionTypes.SaveTypeVehiculeRequest;

  constructor(public payload: { typeVehicule: TypeVehicule }) {
  }
}

export class SaveTypeVehiculeSuccess implements Action {
  readonly type = TypeVehiculeActionTypes.SaveTypeVehiculeSuccess;

  constructor(public payload: { typeVehicule: TypeVehicule }) {
  }
}

export class SaveTypeVehiculeFailed implements Action {
  readonly type = TypeVehiculeActionTypes.SaveTypeVehiculeFailed;

  constructor() {
  }
}

export class LoadOneTypeVehiculeRequest implements Action {
  readonly type = TypeVehiculeActionTypes.LoadOneTypeVehiculeRequest;

  constructor(public payload: { id: number }) {
  }
}

export class LoadOneTypeVehiculeSuccess implements Action {
  readonly type = TypeVehiculeActionTypes.LoadOneTypeVehiculeSuccess;

  constructor(public payload: { typeVehicule: TypeVehicule }) {
  }
}

export class SetAndIsLoadingTypeVehicule implements Action {
  readonly type = TypeVehiculeActionTypes.SetIsLoadingTypeVehicule;

  constructor(public payload: { isLoading: boolean }) {
  }
}

export class LoadOneTypeVehiculeFailed implements Action {
  readonly type = TypeVehiculeActionTypes.LoadOneTypeVehiculeFailed;

  constructor() {
  }
}

export class LoadTypeVehiculesRequest implements Action {
  readonly type = TypeVehiculeActionTypes.LoadTypeVehiculesRequest;

  constructor(public search: string) {
  }
}

export class LoadTypeVehiculesIsNotLoadedRequest implements Action {
  readonly type = TypeVehiculeActionTypes.LoadTypeVehiculesIsNotLoadedRequest;

  constructor() {
  }
}

export class LoadTypeVehiculesSuccess implements Action {
  readonly type = TypeVehiculeActionTypes.LoadTypeVehiculesSuccess;

  constructor(public payload: { typeVehicule: TypeVehicule[] }) {
  }
}

export class LoadTypeVehiculesFailed implements Action {
  readonly type = TypeVehiculeActionTypes.LoadTypeVehiculesFailed;

  constructor() {
    console.warn('tra errHHHHHHHHHHHHHHHHHHHHHHHHHH');
  }
}


export type TypeVehiculeActions =
  SetAndIsLoadingTypeVehicule |
  LoadTypeVehiculesRequest |
  LoadTypeVehiculesSuccess |
  LoadTypeVehiculesFailed |
  SaveTypeVehiculeRequest |
  SaveTypeVehiculeSuccess |
  SaveTypeVehiculeFailed |

  UpdateTypeVehiculeRequest |
  UpdateTypeVehiculeSuccess |
  UpdateTypeVehiculeFailed |
  DeleteTypeVehiculeRequest |
  DeleteTypeVehiculeSuccess |
  DeleteTypeVehiculeFailed |
  LoadOneTypeVehiculeRequest |
  LoadOneTypeVehiculeSuccess |
  LoadOneTypeVehiculeFailed |
  LoadTypeVehiculesIsNotLoadedRequest;
