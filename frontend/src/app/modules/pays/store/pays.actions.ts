import {Action} from '@ngrx/store';
import {PaginatorInformations} from '../../../shared_models/paginator-informations';
import {PaginatedResult} from '../../../shared_models/paginated-result';
import {Pays} from '../model/pays';

export enum PaysActionTypes {
  LoadPayssIsNotLoadedRequest = '[Pays] LoadPayssIsNotLoadedRequest Pays',
  LoadPayssRequest = '[Pays] LoadPayssRequest Pays',
  LoadPayssSuccess = '[Pays] LoadPayssSuccess Pays',
  LoadPayssFailed = '[Pays] LoadPayssFailed Pays',

  LoadOnePaysRequest = '[Pays] LoadOnePaysRequest Pays',
  LoadOnePaysSuccess = '[Pays] LoadOnePaysSuccess Pays',
  LoadOnePaysFailed = '[Pays] LoadOnePaysFailed Pays',

  SavePaysRequest = '[Pays] SavePayssRequest Pays',
  SavePaysSuccess = '[Pays] SavePayssSuccess Pays',
  SavePaysFailed = '[Pays] SavePayssFailed Pays',


  UpdatePaysRequest = '[Pays] UpdatePayssRequest Pays',
  UpdatePaysSuccess = '[Pays] UpdatePayssSuccess Pays',
  UpdatePaysFailed = '[Pays] UpdatePayssFailed Pays',

  DeletePaysRequest = '[Pays] DeletePayssRequest Pays',
  DeletePaysSuccess = '[Pays] DeletePayssSuccess Pays',
  DeletePaysFailed = '[Pays] DeletePayssFailed Pays',

}

export class DeletePaysRequest implements Action {
  readonly type = PaysActionTypes.DeletePaysRequest;

  constructor(public payload: { id: number }) {
  }
}

export class DeletePaysSuccess implements Action {
  readonly type = PaysActionTypes.DeletePaysSuccess;

  constructor() {
  }
}

export class DeletePaysFailed implements Action {
  readonly type = PaysActionTypes.DeletePaysFailed;

  constructor() {
  }
}

export class UpdatePaysRequest implements Action {
  readonly type = PaysActionTypes.UpdatePaysRequest;

  constructor(public payload: { pays: Pays }) {
  }
}

export class UpdatePaysSuccess implements Action {
  readonly type = PaysActionTypes.UpdatePaysSuccess;

  constructor(public payload: { pays: Pays }) {
  }
}

export class UpdatePaysFailed implements Action {
  readonly type = PaysActionTypes.UpdatePaysFailed;

  constructor() {
  }
}

export class SavePaysRequest implements Action {
  readonly type = PaysActionTypes.SavePaysRequest;

  constructor(public payload: { pays: Pays }) {
  }
}

export class SavePaysSuccess implements Action {
  readonly type = PaysActionTypes.SavePaysSuccess;

  constructor(public payload: { pays: Pays }) {
  }
}

export class SavePaysFailed implements Action {
  readonly type = PaysActionTypes.SavePaysFailed;

  constructor() {
  }
}

export class LoadOnePaysRequest implements Action {
  readonly type = PaysActionTypes.LoadOnePaysRequest;

  constructor(public payload: { id: number }) {
  }
}

export class LoadOnePaysSuccess implements Action {
  readonly type = PaysActionTypes.LoadOnePaysSuccess;

  constructor(public payload: { pays: Pays }) {
  }
}

export class LoadOnePaysFailed implements Action {
  readonly type = PaysActionTypes.LoadOnePaysFailed;

  constructor() {
  }
}

export class LoadPayssRequest implements Action {
  readonly type = PaysActionTypes.LoadPayssRequest;

  constructor(public search: string) {
  }
}

export class LoadPayssIsNotLoadedRequest implements Action {
  readonly type = PaysActionTypes.LoadPayssIsNotLoadedRequest;

  constructor() {
  }
}

export class LoadPayssSuccess implements Action {
  readonly type = PaysActionTypes.LoadPayssSuccess;

  constructor(public payload: { pays: Pays[] }) {
  }
}

export class LoadPayssFailed implements Action {
  readonly type = PaysActionTypes.LoadPayssFailed;

  constructor() {
    console.warn('tra errHHHHHHHHHHHHHHHHHHHHHHHHHH');
  }
}


export type PaysActions = LoadPayssRequest |
  LoadPayssSuccess |
  LoadPayssFailed |
  SavePaysRequest |
  SavePaysSuccess |
  SavePaysFailed |

  UpdatePaysRequest |
  UpdatePaysSuccess |
  UpdatePaysFailed |
  DeletePaysRequest |
  DeletePaysSuccess |
  DeletePaysFailed |
  LoadOnePaysRequest |
  LoadOnePaysSuccess |
  LoadOnePaysFailed |
  LoadPayssIsNotLoadedRequest;
