import {Action} from '@ngrx/store';
import {PaginatorInformations} from '../../../shared_models/paginator-informations';
import {PaginatedResult} from '../../../shared_models/paginated-result';
import {MarqueVehicule} from '../model/marque-vehicule';

export enum MarqueVehiculeActionMarques {
  SetIsLoadingMarqueVehicule = '[MarqueVehicule] SetIsLoadedAndIsLoadingMarqueVehicule MarqueVehicule',
  LoadMarqueVehiculesIsNotLoadedRequest = '[MarqueVehicule] LoadMarqueVehiculesIsNotLoadedRequest MarqueVehicule',
  LoadMarqueVehiculesRequest = '[MarqueVehicule] LoadMarqueVehiculesRequest MarqueVehicule',
  LoadMarqueVehiculesSuccess = '[MarqueVehicule] LoadMarqueVehiculesSuccess MarqueVehicule',
  LoadMarqueVehiculesFailed = '[MarqueVehicule] LoadMarqueVehiculesFailed MarqueVehicule',

  LoadOneMarqueVehiculeRequest = '[MarqueVehicule] LoadOneMarqueVehiculeRequest MarqueVehicule',
  LoadOneMarqueVehiculeSuccess = '[MarqueVehicule] LoadOneMarqueVehiculeSuccess MarqueVehicule',
  LoadOneMarqueVehiculeFailed = '[MarqueVehicule] LoadOneMarqueVehiculeFailed MarqueVehicule',

  SaveMarqueVehiculeRequest = '[MarqueVehicule] SaveMarqueVehiculesRequest MarqueVehicule',
  SaveMarqueVehiculeSuccess = '[MarqueVehicule] SaveMarqueVehiculesSuccess MarqueVehicule',
  SaveMarqueVehiculeFailed = '[MarqueVehicule] SaveMarqueVehiculesFailed MarqueVehicule',


  UpdateMarqueVehiculeRequest = '[MarqueVehicule] UpdateMarqueVehiculesRequest MarqueVehicule',
  UpdateMarqueVehiculeSuccess = '[MarqueVehicule] UpdateMarqueVehiculesSuccess MarqueVehicule',
  UpdateMarqueVehiculeFailed = '[MarqueVehicule] UpdateMarqueVehiculesFailed MarqueVehicule',

  DeleteMarqueVehiculeRequest = '[MarqueVehicule] DeleteMarqueVehiculesRequest MarqueVehicule',
  DeleteMarqueVehiculeSuccess = '[MarqueVehicule] DeleteMarqueVehiculesSuccess MarqueVehicule',
  DeleteMarqueVehiculeFailed = '[MarqueVehicule] DeleteMarqueVehiculesFailed MarqueVehicule',

}

export class DeleteMarqueVehiculeRequest implements Action {
  readonly type = MarqueVehiculeActionMarques.DeleteMarqueVehiculeRequest;

  constructor(public payload: { id: number }) {
  }
}

export class DeleteMarqueVehiculeSuccess implements Action {
  readonly type = MarqueVehiculeActionMarques.DeleteMarqueVehiculeSuccess;

  constructor() {
  }
}

export class DeleteMarqueVehiculeFailed implements Action {
  readonly type = MarqueVehiculeActionMarques.DeleteMarqueVehiculeFailed;

  constructor() {
  }
}

export class UpdateMarqueVehiculeRequest implements Action {
  readonly type = MarqueVehiculeActionMarques.UpdateMarqueVehiculeRequest;

  constructor(public payload: { marqueVehicule: MarqueVehicule }) {
  }
}

export class UpdateMarqueVehiculeSuccess implements Action {
  readonly type = MarqueVehiculeActionMarques.UpdateMarqueVehiculeSuccess;

  constructor(public payload: { marqueVehicule: MarqueVehicule }) {
  }
}

export class UpdateMarqueVehiculeFailed implements Action {
  readonly type = MarqueVehiculeActionMarques.UpdateMarqueVehiculeFailed;

  constructor() {
  }
}

export class SaveMarqueVehiculeRequest implements Action {
  readonly type = MarqueVehiculeActionMarques.SaveMarqueVehiculeRequest;

  constructor(public payload: { marqueVehicule: MarqueVehicule }) {
  }
}

export class SaveMarqueVehiculeSuccess implements Action {
  readonly type = MarqueVehiculeActionMarques.SaveMarqueVehiculeSuccess;

  constructor(public payload: { marqueVehicule: MarqueVehicule }) {
  }
}

export class SaveMarqueVehiculeFailed implements Action {
  readonly type = MarqueVehiculeActionMarques.SaveMarqueVehiculeFailed;

  constructor() {
  }
}

export class LoadOneMarqueVehiculeRequest implements Action {
  readonly type = MarqueVehiculeActionMarques.LoadOneMarqueVehiculeRequest;

  constructor(public payload: { id: number }) {
  }
}

export class LoadOneMarqueVehiculeSuccess implements Action {
  readonly type = MarqueVehiculeActionMarques.LoadOneMarqueVehiculeSuccess;

  constructor(public payload: { marqueVehicule: MarqueVehicule }) {
  }
}

export class SetAndIsLoadingMarqueVehicule implements Action {
  readonly type = MarqueVehiculeActionMarques.SetIsLoadingMarqueVehicule;

  constructor(public payload: { isLoading: boolean }) {
  }
}

export class LoadOneMarqueVehiculeFailed implements Action {
  readonly type = MarqueVehiculeActionMarques.LoadOneMarqueVehiculeFailed;

  constructor() {
  }
}

export class LoadMarqueVehiculesRequest implements Action {
  readonly type = MarqueVehiculeActionMarques.LoadMarqueVehiculesRequest;

  constructor(public search: string) {
  }
}

export class LoadMarqueVehiculesIsNotLoadedRequest implements Action {
  readonly type = MarqueVehiculeActionMarques.LoadMarqueVehiculesIsNotLoadedRequest;

  constructor() {
  }
}

export class LoadMarqueVehiculesSuccess implements Action {
  readonly type = MarqueVehiculeActionMarques.LoadMarqueVehiculesSuccess;

  constructor(public payload: { marqueVehicule: MarqueVehicule[] }) {
  }
}

export class LoadMarqueVehiculesFailed implements Action {
  readonly type = MarqueVehiculeActionMarques.LoadMarqueVehiculesFailed;

  constructor() {
    console.warn('tra errHHHHHHHHHHHHHHHHHHHHHHHHHH');
  }
}


export type MarqueVehiculeActions =
  SetAndIsLoadingMarqueVehicule |
  LoadMarqueVehiculesRequest |
  LoadMarqueVehiculesSuccess |
  LoadMarqueVehiculesFailed |
  SaveMarqueVehiculeRequest |
  SaveMarqueVehiculeSuccess |
  SaveMarqueVehiculeFailed |

  UpdateMarqueVehiculeRequest |
  UpdateMarqueVehiculeSuccess |
  UpdateMarqueVehiculeFailed |
  DeleteMarqueVehiculeRequest |
  DeleteMarqueVehiculeSuccess |
  DeleteMarqueVehiculeFailed |
  LoadOneMarqueVehiculeRequest |
  LoadOneMarqueVehiculeSuccess |
  LoadOneMarqueVehiculeFailed |
  LoadMarqueVehiculesIsNotLoadedRequest;
