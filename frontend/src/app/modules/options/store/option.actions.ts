import {Action} from '@ngrx/store';
import {PaginatorInformations} from '../../../shared_models/paginator-informations';
import {PaginatedResult} from '../../../shared_models/paginated-result';
import {Option} from '../model/option';

export enum OptionActionTypes {
  LoadOptionsIsNotLoadedRequest = '[Option] LoadOptionsIsNotLoadedRequest Option',
  LoadOptionsRequest = '[Option] LoadOptionsRequest Option',
  LoadOptionsSuccess = '[Option] LoadOptionsSuccess Option',
  LoadOptionsFailed = '[Option] LoadOptionsFailed Option',

  LoadOneOptionRequest = '[Option] LoadOneOptionRequest Option',
  LoadOneOptionSuccess = '[Option] LoadOneOptionSuccess Option',
  LoadOneOptionFailed = '[Option] LoadOneOptionFailed Option',

  SaveOptionRequest = '[Option] SaveOptionsRequest Option',
  SaveOptionSuccess = '[Option] SaveOptionsSuccess Option',
  SaveOptionFailed = '[Option] SaveOptionsFailed Option',


  UpdateOptionRequest = '[Option] UpdateOptionsRequest Option',
  UpdateOptionSuccess = '[Option] UpdateOptionsSuccess Option',
  UpdateOptionFailed = '[Option] UpdateOptionsFailed Option',

  DeleteOptionRequest = '[Option] DeleteOptionsRequest Option',
  DeleteOptionSuccess = '[Option] DeleteOptionsSuccess Option',
  DeleteOptionFailed = '[Option] DeleteOptionsFailed Option',

}

export class DeleteOptionRequest implements Action {
  readonly type = OptionActionTypes.DeleteOptionRequest;

  constructor(public payload: { id: number }) {
  }
}

export class DeleteOptionSuccess implements Action {
  readonly type = OptionActionTypes.DeleteOptionSuccess;

  constructor() {
  }
}

export class DeleteOptionFailed implements Action {
  readonly type = OptionActionTypes.DeleteOptionFailed;

  constructor() {
  }
}

export class UpdateOptionRequest implements Action {
  readonly type = OptionActionTypes.UpdateOptionRequest;

  constructor(public payload: { option: Option }) {
  }
}

export class UpdateOptionSuccess implements Action {
  readonly type = OptionActionTypes.UpdateOptionSuccess;

  constructor(public payload: { option: Option }) {
  }
}

export class UpdateOptionFailed implements Action {
  readonly type = OptionActionTypes.UpdateOptionFailed;

  constructor() {
  }
}

export class SaveOptionRequest implements Action {
  readonly type = OptionActionTypes.SaveOptionRequest;

  constructor(public payload: { option: Option }) {
  }
}

export class SaveOptionSuccess implements Action {
  readonly type = OptionActionTypes.SaveOptionSuccess;

  constructor(public payload: { option: Option }) {
  }
}

export class SaveOptionFailed implements Action {
  readonly type = OptionActionTypes.SaveOptionFailed;

  constructor() {
  }
}

export class LoadOneOptionRequest implements Action {
  readonly type = OptionActionTypes.LoadOneOptionRequest;

  constructor(public payload: { id: number }) {
  }
}

export class LoadOneOptionSuccess implements Action {
  readonly type = OptionActionTypes.LoadOneOptionSuccess;

  constructor(public payload: { option: Option }) {
  }
}

export class LoadOneOptionFailed implements Action {
  readonly type = OptionActionTypes.LoadOneOptionFailed;

  constructor() {
  }
}

export class LoadOptionsRequest implements Action {
  readonly type = OptionActionTypes.LoadOptionsRequest;

  constructor(public search: string) {
  }
}

export class LoadOptionsIsNotLoadedRequest implements Action {
  readonly type = OptionActionTypes.LoadOptionsIsNotLoadedRequest;

  constructor() {
  }
}

export class LoadOptionsSuccess implements Action {
  readonly type = OptionActionTypes.LoadOptionsSuccess;

  constructor(public payload: { option: Option[] }) {
  }
}

export class LoadOptionsFailed implements Action {
  readonly type = OptionActionTypes.LoadOptionsFailed;

  constructor() {
    console.warn('tra errHHHHHHHHHHHHHHHHHHHHHHHHHH');
  }
}


export type OptionActions = LoadOptionsRequest |
  LoadOptionsSuccess |
  LoadOptionsFailed |
  SaveOptionRequest |
  SaveOptionSuccess |
  SaveOptionFailed |

  UpdateOptionRequest |
  UpdateOptionSuccess |
  UpdateOptionFailed |
  DeleteOptionRequest |
  DeleteOptionSuccess |
  DeleteOptionFailed |
  LoadOneOptionRequest |
  LoadOneOptionSuccess |
  LoadOneOptionFailed |
  LoadOptionsIsNotLoadedRequest;
