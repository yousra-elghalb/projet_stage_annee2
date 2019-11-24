import {Action} from '@ngrx/store';
import {PaginatorInformations} from '../../../shared_models/paginator-informations';
import {PaginatedResult} from '../../../shared_models/paginated-result';
import {Accompagnateur} from '../model/accompagnateur';

export enum AccompagnateurActionTypes {
  LoadAccompagnateursIsNotLoadedRequest = '[Accompagnateur] LoadAccompagnateursIsNotLoadedRequest Accompagnateur',
  Accompagnateursloading = '[Accompagnateur] Accompagnateursloading Accompagnateur',
  LoadAccompagnateursRequest = '[Accompagnateur] LoadAccompagnateursRequest Accompagnateur',
  LoadAccompagnateursSuccess = '[Accompagnateur] LoadAccompagnateursSuccess Accompagnateur',
  LoadAccompagnateursFailed = '[Accompagnateur] LoadAccompagnateursFailed Accompagnateur',

  LoadOneAccompagnateurRequest = '[Accompagnateur] LoadOneAccompagnateurRequest Accompagnateur',
  LoadOneAccompagnateurSuccess = '[Accompagnateur] LoadOneAccompagnateurSuccess Accompagnateur',
  LoadOneAccompagnateurFailed = '[Accompagnateur] LoadOneAccompagnateurFailed Accompagnateur',

  SaveAccompagnateurRequest = '[Accompagnateur] SaveAccompagnateursRequest Accompagnateur',
  SaveAccompagnateurSuccess = '[Accompagnateur] SaveAccompagnateursSuccess Accompagnateur',
  SaveAccompagnateurFailed = '[Accompagnateur] SaveAccompagnateursFailed Accompagnateur',


  UpdateAccompagnateurRequest = '[Accompagnateur] UpdateAccompagnateursRequest Accompagnateur',
  UpdateAccompagnateurSuccess = '[Accompagnateur] UpdateAccompagnateursSuccess Accompagnateur',
  UpdateAccompagnateurFailed = '[Accompagnateur] UpdateAccompagnateursFailed Accompagnateur',

  DeleteAccompagnateurRequest = '[Accompagnateur] DeleteAccompagnateursRequest Accompagnateur',
  DeleteAccompagnateurSuccess = '[Accompagnateur] DeleteAccompagnateursSuccess Accompagnateur',
  DeleteAccompagnateurFailed = '[Accompagnateur] DeleteAccompagnateursFailed Accompagnateur',

}

export class DeleteAccompagnateurRequest implements Action {
  readonly type = AccompagnateurActionTypes.DeleteAccompagnateurRequest;

  constructor(public payload: { id: number }) {
  }
}

export class DeleteAccompagnateurSuccess implements Action {
  readonly type = AccompagnateurActionTypes.DeleteAccompagnateurSuccess;

  constructor() {
  }
}

export class DeleteAccompagnateurFailed implements Action {
  readonly type = AccompagnateurActionTypes.DeleteAccompagnateurFailed;

  constructor() {
  }
}

export class UpdateAccompagnateurRequest implements Action {
  readonly type = AccompagnateurActionTypes.UpdateAccompagnateurRequest;

  constructor(public payload: { accompagnateur: Accompagnateur }) {
  }
}

export class Accompagnateursloading implements Action {
  readonly type = AccompagnateurActionTypes.Accompagnateursloading;

  constructor() {
  }
}

export class UpdateAccompagnateurSuccess implements Action {
  readonly type = AccompagnateurActionTypes.UpdateAccompagnateurSuccess;

  constructor(public payload: { accompagnateur: Accompagnateur }) {
  }
}

export class UpdateAccompagnateurFailed implements Action {
  readonly type = AccompagnateurActionTypes.UpdateAccompagnateurFailed;

  constructor() {
  }
}

export class SaveAccompagnateurRequest implements Action {
  readonly type = AccompagnateurActionTypes.SaveAccompagnateurRequest;

  constructor(public payload: { accompagnateur: Accompagnateur }) {
  }
}

export class SaveAccompagnateurSuccess implements Action {
  readonly type = AccompagnateurActionTypes.SaveAccompagnateurSuccess;

  constructor(public payload: { accompagnateur: Accompagnateur }) {
  }
}

export class SaveAccompagnateurFailed implements Action {
  readonly type = AccompagnateurActionTypes.SaveAccompagnateurFailed;

  constructor() {
  }
}

export class LoadOneAccompagnateurRequest implements Action {
  readonly type = AccompagnateurActionTypes.LoadOneAccompagnateurRequest;

  constructor(public payload: { id: number }) {
  }
}

export class LoadOneAccompagnateurSuccess implements Action {
  readonly type = AccompagnateurActionTypes.LoadOneAccompagnateurSuccess;

  constructor(public payload: { accompagnateur: Accompagnateur }) {
  }
}

export class LoadOneAccompagnateurFailed implements Action {
  readonly type = AccompagnateurActionTypes.LoadOneAccompagnateurFailed;

  constructor() {
  }
}

export class LoadAccompagnateursRequest implements Action {
  readonly type = AccompagnateurActionTypes.LoadAccompagnateursRequest;

  constructor(public search: string) {
  }
}

export class LoadAccompagnateursIsNotLoadedRequest implements Action {
  readonly type = AccompagnateurActionTypes.LoadAccompagnateursIsNotLoadedRequest;

  constructor() {
  }
}

export class LoadAccompagnateursSuccess implements Action {
  readonly type = AccompagnateurActionTypes.LoadAccompagnateursSuccess;

  constructor(public payload: { accompagnateur: Accompagnateur[] }) {
  }
}

export class LoadAccompagnateursFailed implements Action {
  readonly type = AccompagnateurActionTypes.LoadAccompagnateursFailed;

  constructor() {
    console.warn('tra errHHHHHHHHHHHHHHHHHHHHHHHHHH');
  }
}


export type AccompagnateurActions = LoadAccompagnateursRequest |
  LoadAccompagnateursSuccess |
  LoadAccompagnateursFailed |
  SaveAccompagnateurRequest |
  SaveAccompagnateurSuccess |
  SaveAccompagnateurFailed |
  Accompagnateursloading |

  UpdateAccompagnateurRequest |
  UpdateAccompagnateurSuccess |
  UpdateAccompagnateurFailed |
  DeleteAccompagnateurRequest |
  DeleteAccompagnateurSuccess |
  DeleteAccompagnateurFailed |
  LoadOneAccompagnateurRequest |
  LoadOneAccompagnateurSuccess |
  LoadOneAccompagnateurFailed |
  LoadAccompagnateursIsNotLoadedRequest;
