import {Action} from '@ngrx/store';
import {PaginatorInformations} from '../../../shared_models/paginator-informations';
import {PaginatedResult} from '../../../shared_models/paginated-result';
import {Vehicule} from '../model/vehicule';

export enum VehiculeActionTypes {
  SetIsLoadingVehicule = '[Vehicule] SetIsLoadedAndIsLoadingVehicule Vehicule',
  LoadVehiculesIsNotLoadedRequest = '[Vehicule] LoadVehiculesIsNotLoadedRequest Vehicule',
  LoadVehiculesRequest = '[Vehicule] LoadVehiculesRequest Vehicule',
  LoadVehiculesSuccess = '[Vehicule] LoadVehiculesSuccess Vehicule',
  LoadVehiculesFailed = '[Vehicule] LoadVehiculesFailed Vehicule',

  LoadOneVehiculeRequest = '[Vehicule] LoadOneVehiculeRequest Vehicule',
  LoadOneVehiculeSuccess = '[Vehicule] LoadOneVehiculeSuccess Vehicule',
  LoadOneVehiculeFailed = '[Vehicule] LoadOneVehiculeFailed Vehicule',

  SaveVehiculeRequest = '[Vehicule] SaveVehiculesRequest Vehicule',
  SaveVehiculeSuccess = '[Vehicule] SaveVehiculesSuccess Vehicule',
  SaveVehiculeFailed = '[Vehicule] SaveVehiculesFailed Vehicule',


  UpdateVehiculeRequest = '[Vehicule] UpdateVehiculesRequest Vehicule',
  UpdateVehiculeSuccess = '[Vehicule] UpdateVehiculesSuccess Vehicule',
  UpdateVehiculeFailed = '[Vehicule] UpdateVehiculesFailed Vehicule',

  DeleteVehiculeRequest = '[Vehicule] DeleteVehiculesRequest Vehicule',
  DeleteVehiculeSuccess = '[Vehicule] DeleteVehiculesSuccess Vehicule',
  DeleteVehiculeFailed = '[Vehicule] DeleteVehiculesFailed Vehicule',

}

export class DeleteVehiculeRequest implements Action {
  readonly type = VehiculeActionTypes.DeleteVehiculeRequest;

  constructor(public payload: { id: number }) {
  }
}

export class DeleteVehiculeSuccess implements Action {
  readonly type = VehiculeActionTypes.DeleteVehiculeSuccess;

  constructor() {
  }
}

export class DeleteVehiculeFailed implements Action {
  readonly type = VehiculeActionTypes.DeleteVehiculeFailed;

  constructor() {
  }
}

export class UpdateVehiculeRequest implements Action {
  readonly type = VehiculeActionTypes.UpdateVehiculeRequest;

  constructor(public payload: { vehicule: Vehicule }) {
  }
}

export class UpdateVehiculeSuccess implements Action {
  readonly type = VehiculeActionTypes.UpdateVehiculeSuccess;

  constructor(public payload: { vehicule: Vehicule }) {
  }
}

export class UpdateVehiculeFailed implements Action {
  readonly type = VehiculeActionTypes.UpdateVehiculeFailed;

  constructor() {
  }
}

export class SaveVehiculeRequest implements Action {
  readonly type = VehiculeActionTypes.SaveVehiculeRequest;

  constructor(public payload: { vehicule: Vehicule }) {
  }
}

export class SaveVehiculeSuccess implements Action {
  readonly type = VehiculeActionTypes.SaveVehiculeSuccess;

  constructor(public payload: { vehicule: Vehicule }) {
  }
}

export class SaveVehiculeFailed implements Action {
  readonly type = VehiculeActionTypes.SaveVehiculeFailed;

  constructor() {
  }
}

export class LoadOneVehiculeRequest implements Action {
  readonly type = VehiculeActionTypes.LoadOneVehiculeRequest;

  constructor(public payload: { id: number }) {
  }
}

export class LoadOneVehiculeSuccess implements Action {
  readonly type = VehiculeActionTypes.LoadOneVehiculeSuccess;

  constructor(public payload: { vehicule: Vehicule }) {
  }
}

export class SetAndIsLoadingVehicule implements Action {
  readonly type = VehiculeActionTypes.SetIsLoadingVehicule;

  constructor(public payload: { isLoading: boolean }) {
  }
}

export class LoadOneVehiculeFailed implements Action {
  readonly type = VehiculeActionTypes.LoadOneVehiculeFailed;

  constructor() {
  }
}

export class LoadVehiculesRequest implements Action {
  readonly type = VehiculeActionTypes.LoadVehiculesRequest;

  constructor(public search: string) {
  }
}

export class LoadVehiculesIsNotLoadedRequest implements Action {
  readonly type = VehiculeActionTypes.LoadVehiculesIsNotLoadedRequest;

  constructor() {
  }
}

export class LoadVehiculesSuccess implements Action {
  readonly type = VehiculeActionTypes.LoadVehiculesSuccess;

  constructor(public payload: { vehicule: Vehicule[] }) {
  }
}

export class LoadVehiculesFailed implements Action {
  readonly type = VehiculeActionTypes.LoadVehiculesFailed;

  constructor() {
    console.warn('tra errHHHHHHHHHHHHHHHHHHHHHHHHHH');
  }
}


export type VehiculeActions =
  SetAndIsLoadingVehicule |
  LoadVehiculesRequest |
  LoadVehiculesSuccess |
  LoadVehiculesFailed |
  SaveVehiculeRequest |
  SaveVehiculeSuccess |
  SaveVehiculeFailed |

  UpdateVehiculeRequest |
  UpdateVehiculeSuccess |
  UpdateVehiculeFailed |
  DeleteVehiculeRequest |
  DeleteVehiculeSuccess |
  DeleteVehiculeFailed |
  LoadOneVehiculeRequest |
  LoadOneVehiculeSuccess |
  LoadOneVehiculeFailed |
  LoadVehiculesIsNotLoadedRequest;
