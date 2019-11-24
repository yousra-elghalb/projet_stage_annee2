import {Action} from '@ngrx/store';
import {SGroupe} from '../model/s-groupe';
import {Facture} from '../../model/facture';

export enum SGroupeActionTypes {
  LoadSGroupesByOffreVoyageId = '[SGroupe] LoadSGroupesByOffreVoyageId SGroupe',
  LoadSGroupesSuccess = '[SGroupe] LoadSGroupesSuccess SGroupe',
  LoadSGroupesFailed = '[SGroupe] LoadSGroupesFailed SGroupe',

  LoadOneSGroupeRequest = '[SGroupe] LoadOneSGroupeRequest SGroupe',
  LoadOneSGroupeSuccess = '[SGroupe] LoadOneSGroupeSuccess SGroupe',
  LoadOneSGroupeFailed = '[SGroupe] LoadOneSGroupeFailed SGroupe',

  SaveSGroupeRequest = '[SGroupe] SaveSGroupesRequest SGroupe',
  SaveSGroupeSuccess = '[SGroupe] SaveSGroupesSuccess SGroupe',
  SaveSGroupeFailed = '[SGroupe] SaveSGroupesFailed SGroupe',

  SaveSGroupeFactureRequest = '[SGroupe] SaveSGroupesFactureRequest SGroupe',
  SaveSGroupeFactureSuccess = '[SGroupe] SaveSGroupesFactureSuccess SGroupe',
  SaveSGroupeFactureFailed = '[SGroupe] SaveSGroupesFactureFailed SGroupe',

  UpdateSGroupeRequest = '[SGroupe] UpdateSGroupesRequest SGroupe',
  UpdateSGroupeSuccess = '[SGroupe] UpdateSGroupesSuccess SGroupe',
  UpdateSGroupeFailed = '[SGroupe] UpdateSGroupesFailed SGroupe',

  DeleteSGroupeRequest = '[SGroupe] DeleteSGroupesRequest SGroupe',
  DeleteSGroupeSuccess = '[SGroupe] DeleteSGroupesSuccess SGroupe',
  DeleteSGroupeFailed = '[SGroupe] DeleteSGroupesFailed SGroupe',

}

export class DeleteSGroupeRequest implements Action {
  readonly type = SGroupeActionTypes.DeleteSGroupeRequest;

  constructor(public payload: { id: number }) {
  }
}

export class DeleteSGroupeSuccess implements Action {
  readonly type = SGroupeActionTypes.DeleteSGroupeSuccess;

  constructor() {
  }
}

export class DeleteSGroupeFailed implements Action {
  readonly type = SGroupeActionTypes.DeleteSGroupeFailed;

  constructor() {
  }
}

export class UpdateSGroupeRequest implements Action {
  readonly type = SGroupeActionTypes.UpdateSGroupeRequest;

  constructor(public payload: { sGroupe: SGroupe }) {
  }
}

export class UpdateSGroupeSuccess implements Action {
  readonly type = SGroupeActionTypes.UpdateSGroupeSuccess;

  constructor(public payload: { sGroupe: SGroupe }) {
  }
}

export class UpdateSGroupeFailed implements Action {
  readonly type = SGroupeActionTypes.UpdateSGroupeFailed;

  constructor() {
  }
}

export class SaveSGroupeRequest implements Action {
  readonly type = SGroupeActionTypes.SaveSGroupeRequest;

  constructor(public payload: { sGroupe: SGroupe }) {
  }
}

export class SaveSGroupeSuccess implements Action {
  readonly type = SGroupeActionTypes.SaveSGroupeSuccess;

  constructor(public payload: { sGroupe: SGroupe }) {
  }
}

export class SaveSGroupeFailed implements Action {
  readonly type = SGroupeActionTypes.SaveSGroupeFailed;

  constructor(error: any) {
    console.warn(error);
  }
}

export class SaveSGroupeFactureRequest implements Action {
  readonly type = SGroupeActionTypes.SaveSGroupeFactureRequest;

  constructor(public payload: { sGroupe: SGroupe; facture: any }) {
  }
}

export class SaveSGroupeFactureSuccess implements Action {
  readonly type = SGroupeActionTypes.SaveSGroupeFactureSuccess;

  constructor(public payload: { paiement: any }) {
  }
}

export class SaveSGroupeFactureFailed implements Action {
  readonly type = SGroupeActionTypes.SaveSGroupeFactureFailed;

  constructor(error: any) {
  }
}


export class LoadOneSGroupeRequest implements Action {
  readonly type = SGroupeActionTypes.LoadOneSGroupeRequest;

  constructor(public payload: { id: any }) {
  }
}

export class LoadOneSGroupeSuccess implements Action {
  readonly type = SGroupeActionTypes.LoadOneSGroupeSuccess;

  constructor(public payload: {
    id: any;
    sGroupe: SGroupe
  }) {
  }
}

export class LoadOneSGroupeFailed implements Action {
  readonly type = SGroupeActionTypes.LoadOneSGroupeFailed;

  constructor() {
  }
}

export class LoadSGroupesByOffreVoyageId implements Action {
  readonly type = SGroupeActionTypes.LoadSGroupesByOffreVoyageId;

  constructor(public idOffreVoyage) {
  }
}


export class LoadSGroupesSuccess implements Action {
  readonly type = SGroupeActionTypes.LoadSGroupesSuccess;

  constructor(public payload: { sGroupe: SGroupe; idOffreVoyage: any }) {
  }
}

export class LoadSGroupesFailed implements Action {
  readonly type = SGroupeActionTypes.LoadSGroupesFailed;

  constructor() {
    console.warn('tra errHHHHHHHHHHHHHHHHHHHHHHHHHH');
  }
}


export type SGroupeActions =
  LoadSGroupesSuccess |
  LoadSGroupesFailed |
  SaveSGroupeRequest |
  SaveSGroupeSuccess |
  SaveSGroupeFailed |
  SaveSGroupeFactureRequest |
  SaveSGroupeFactureSuccess |
  SaveSGroupeFactureFailed |

  LoadSGroupesByOffreVoyageId |
  UpdateSGroupeRequest |
  UpdateSGroupeSuccess |
  UpdateSGroupeFailed |
  DeleteSGroupeRequest |
  DeleteSGroupeSuccess |
  DeleteSGroupeFailed |
  LoadOneSGroupeRequest |
  LoadOneSGroupeSuccess |
  LoadOneSGroupeFailed ;
