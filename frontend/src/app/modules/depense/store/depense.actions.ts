import {Action} from '@ngrx/store';
import {PaginatorInformations} from '../../../shared_models/paginator-informations';
import {PaginatedResult} from '../../../shared_models/paginated-result';
import {Depense} from '../model/depense';

export enum DepenseActionTypes {
  SetIsLoadingDepense = '[Depense] SetIsLoadedAndIsLoadingDepense Depense',
  LoadDepensesIsNotLoadedRequest = '[Depense] LoadDepensesIsNotLoadedRequest Depense',
  LoadDepensesRequest = '[Depense] LoadDepensesRequest Depense',
  LoadDepensesSuccess = '[Depense] LoadDepensesSuccess Depense',
  LoadDepensesFailed = '[Depense] LoadDepensesFailed Depense',

  LoadOneDepenseRequest = '[Depense] LoadOneDepenseRequest Depense',
  LoadOneDepenseSuccess = '[Depense] LoadOneDepenseSuccess Depense',
  LoadOneDepenseFailed = '[Depense] LoadOneDepenseFailed Depense',

  SaveDepenseRequest = '[Depense] SaveDepensesRequest Depense',
  SaveDepenseSuccess = '[Depense] SaveDepensesSuccess Depense',
  SaveDepenseFailed = '[Depense] SaveDepensesFailed Depense',


  UpdateDepenseRequest = '[Depense] UpdateDepensesRequest Depense',
  UpdateDepenseSuccess = '[Depense] UpdateDepensesSuccess Depense',
  UpdateDepenseFailed = '[Depense] UpdateDepensesFailed Depense',

  DeleteDepenseRequest = '[Depense] DeleteDepensesRequest Depense',
  DeleteDepenseSuccess = '[Depense] DeleteDepensesSuccess Depense',
  DeleteDepenseFailed = '[Depense] DeleteDepensesFailed Depense',

}

export class DeleteDepenseRequest implements Action {
  readonly type = DepenseActionTypes.DeleteDepenseRequest;

  constructor(public payload: { id: number }) {
  }
}

export class DeleteDepenseSuccess implements Action {
  readonly type = DepenseActionTypes.DeleteDepenseSuccess;

  constructor() {
  }
}

export class DeleteDepenseFailed implements Action {
  readonly type = DepenseActionTypes.DeleteDepenseFailed;

  constructor() {
  }
}

export class UpdateDepenseRequest implements Action {
  readonly type = DepenseActionTypes.UpdateDepenseRequest;

  constructor(public payload: { depense: Depense }) {
  }
}

export class UpdateDepenseSuccess implements Action {
  readonly type = DepenseActionTypes.UpdateDepenseSuccess;

  constructor(public payload: { depense: Depense }) {
  }
}

export class UpdateDepenseFailed implements Action {
  readonly type = DepenseActionTypes.UpdateDepenseFailed;

  constructor() {
  }
}

export class SaveDepenseRequest implements Action {
  readonly type = DepenseActionTypes.SaveDepenseRequest;

  constructor(public payload: { depense: Depense }) {
  }
}

export class SaveDepenseSuccess implements Action {
  readonly type = DepenseActionTypes.SaveDepenseSuccess;

  constructor(public payload: { depense: Depense }) {
  }
}

export class SaveDepenseFailed implements Action {
  readonly type = DepenseActionTypes.SaveDepenseFailed;

  constructor() {
  }
}

export class LoadOneDepenseRequest implements Action {
  readonly type = DepenseActionTypes.LoadOneDepenseRequest;

  constructor(public payload: { id: number }) {
  }
}

export class LoadOneDepenseSuccess implements Action {
  readonly type = DepenseActionTypes.LoadOneDepenseSuccess;

  constructor(public payload: { depense: Depense }) {
  }
}

export class SetAndIsLoadingDepense implements Action {
  readonly type = DepenseActionTypes.SetIsLoadingDepense;

  constructor(public payload: { isLoading: boolean }) {
  }
}

export class LoadOneDepenseFailed implements Action {
  readonly type = DepenseActionTypes.LoadOneDepenseFailed;

  constructor() {
  }
}

export class LoadDepensesRequest implements Action {
  readonly type = DepenseActionTypes.LoadDepensesRequest;

  constructor(public search: string) {
  }
}

export class LoadDepensesIsNotLoadedRequest implements Action {
  readonly type = DepenseActionTypes.LoadDepensesIsNotLoadedRequest;

  constructor() {
  }
}

export class LoadDepensesSuccess implements Action {
  readonly type = DepenseActionTypes.LoadDepensesSuccess;

  constructor(public payload: { depense: Depense[] }) {
  }
}

export class LoadDepensesFailed implements Action {
  readonly type = DepenseActionTypes.LoadDepensesFailed;

  constructor() {
    console.warn('tra errHHHHHHHHHHHHHHHHHHHHHHHHHH');
  }
}


export type DepenseActions =
  SetAndIsLoadingDepense |
  LoadDepensesRequest |
  LoadDepensesSuccess |
  LoadDepensesFailed |
  SaveDepenseRequest |
  SaveDepenseSuccess |
  SaveDepenseFailed |

  UpdateDepenseRequest |
  UpdateDepenseSuccess |
  UpdateDepenseFailed |
  DeleteDepenseRequest |
  DeleteDepenseSuccess |
  DeleteDepenseFailed |
  LoadOneDepenseRequest |
  LoadOneDepenseSuccess |
  LoadOneDepenseFailed |
  LoadDepensesIsNotLoadedRequest;
