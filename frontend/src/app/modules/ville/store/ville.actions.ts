import {Action} from '@ngrx/store';
import {Ville} from '../model/ville';


export enum VilleActionTypes {
  LoadVillesIsNotLoadedRequest = '[Ville] LoadVillesIsNotLoadedRequest Ville',
  LoadVillesRequest = '[Ville] LoadVillesRequest Ville',
  LoadVillesSuccess = '[Ville] LoadVillesSuccess Ville',
  LoadVillesFailed = '[Ville] LoadVillesFailed Ville',

  LoadOneVilleRequest = '[Ville] LoadOneVilleRequest Ville',
  LoadOneVilleSuccess = '[Ville] LoadOneVilleSuccess Ville',
  LoadOneVilleFailed = '[Ville] LoadOneVilleFailed Ville',

  SaveVilleRequest = '[Ville] SaveVillesRequest Ville',
  SaveVilleSuccess = '[Ville] SaveVillesSuccess Ville',
  SaveVilleFailed = '[Ville] SaveVillesFailed Ville',


  UpdateVilleRequest = '[Ville] UpdateVillesRequest Ville',
  UpdateVilleSuccess = '[Ville] UpdateVillesSuccess Ville',
  UpdateVilleFailed = '[Ville] UpdateVillesFailed Ville',

  DeleteVilleRequest = '[Ville] DeleteVillesRequest Ville',
  DeleteVilleSuccess = '[Ville] DeleteVillesSuccess Ville',
  DeleteVilleFailed = '[Ville] DeleteVillesFailed Ville',

  AddAllChipsVilles = '[Ville] AddAllChipsVilles Ville',
  AddChipsVilles = '[Ville] AddChipsVilles Ville',
  RemoveChipsVilles = '[Ville] RemoveChipsVilles Ville',

}

export class AddAllChipsVilles implements Action {
  readonly type = VilleActionTypes.AddAllChipsVilles;

  constructor(public payload: { villes: any }) {
  }
}

export class AddChipsVilles implements Action {
  readonly type = VilleActionTypes.AddChipsVilles;

  constructor(public payload: { ville: Ville }) {
  }
}

export class RemoveChipsVilles implements Action {
  readonly type = VilleActionTypes.RemoveChipsVilles;

  constructor(public payload: { id: number }) {
  }
}


export class DeleteVilleRequest implements Action {
  readonly type = VilleActionTypes.DeleteVilleRequest;

  constructor(public payload: { id: number }) {
  }
}

export class DeleteVilleSuccess implements Action {
  readonly type = VilleActionTypes.DeleteVilleSuccess;

  constructor() {
  }
}

export class DeleteVilleFailed implements Action {
  readonly type = VilleActionTypes.DeleteVilleFailed;

  constructor() {
  }
}

export class UpdateVilleRequest implements Action {
  readonly type = VilleActionTypes.UpdateVilleRequest;

  constructor(public payload: { ville: Ville }) {
  }
}

export class UpdateVilleSuccess implements Action {
  readonly type = VilleActionTypes.UpdateVilleSuccess;

  constructor(public payload: { ville: Ville }) {
  }
}

export class UpdateVilleFailed implements Action {
  readonly type = VilleActionTypes.UpdateVilleFailed;

  constructor() {
  }
}

export class SaveVilleRequest implements Action {
  readonly type = VilleActionTypes.SaveVilleRequest;

  constructor(public payload: { ville: Ville }) {
  }
}

export class SaveVilleSuccess implements Action {
  readonly type = VilleActionTypes.SaveVilleSuccess;

  constructor(public payload: { ville: Ville }) {
  }
}

export class SaveVilleFailed implements Action {
  readonly type = VilleActionTypes.SaveVilleFailed;

  constructor(error?: any) {
    console.warn(error);

  }
}

export class LoadOneVilleRequest implements Action {
  readonly type = VilleActionTypes.LoadOneVilleRequest;

  constructor(public payload: { id: number }) {
  }
}

export class LoadOneVilleSuccess implements Action {
  readonly type = VilleActionTypes.LoadOneVilleSuccess;

  constructor(public payload: { ville: Ville }) {
  }
}

export class LoadOneVilleFailed implements Action {
  readonly type = VilleActionTypes.LoadOneVilleFailed;

  constructor() {
  }
}

export class LoadVillesRequest implements Action {
  readonly type = VilleActionTypes.LoadVillesRequest;

  constructor(public search: string) {
  }
}

export class LoadVillesIsNotLoadedRequest implements Action {
  readonly type = VilleActionTypes.LoadVillesIsNotLoadedRequest;

  constructor() {
  }
}

export class LoadVillesSuccess implements Action {
  readonly type = VilleActionTypes.LoadVillesSuccess;

  constructor(public payload: { ville: Ville[] }) {
  }
}

export class LoadVillesFailed implements Action {
  readonly type = VilleActionTypes.LoadVillesFailed;

  constructor() {
    console.warn('tra errHHHHHHHHHHHHHHHHHHHHHHHHHH');
  }
}


export type VilleActions = LoadVillesRequest |
  LoadVillesSuccess |
  LoadVillesFailed |
  SaveVilleRequest |
  SaveVilleSuccess |
  SaveVilleFailed |

  AddAllChipsVilles |
  AddChipsVilles |
  RemoveChipsVilles |

  UpdateVilleRequest |
  UpdateVilleSuccess |
  UpdateVilleFailed |
  DeleteVilleRequest |
  DeleteVilleSuccess |
  DeleteVilleFailed |
  LoadOneVilleRequest |
  LoadOneVilleSuccess |
  LoadOneVilleFailed |
  LoadVillesIsNotLoadedRequest;
