import {Action} from '@ngrx/store';
import {PaginatorInformations} from '../../../shared_models/paginator-informations';
import {PaginatedResult} from '../../../shared_models/paginated-result';
import {Chauffeur} from '../model/chauffeur';

export enum ChauffeurActionTypes {
  LoadChauffeursIsNotLoadedRequest = '[Chauffeur] LoadChauffeursIsNotLoadedRequest Chauffeur',
  LoadChauffeursRequest = '[Chauffeur] LoadChauffeursRequest Chauffeur',
  LoadChauffeursSuccess = '[Chauffeur] LoadChauffeursSuccess Chauffeur',
  LoadChauffeursFailed = '[Chauffeur] LoadChauffeursFailed Chauffeur',
  Chauffeursloading = '[Chauffeur] Chauffeursloading Chauffeur',

  LoadOneChauffeurRequest = '[Chauffeur] LoadOneChauffeurRequest Chauffeur',
  LoadOneChauffeurSuccess = '[Chauffeur] LoadOneChauffeurSuccess Chauffeur',
  LoadOneChauffeurFailed = '[Chauffeur] LoadOneChauffeurFailed Chauffeur',

  SaveChauffeurRequest = '[Chauffeur] SaveChauffeursRequest Chauffeur',
  SaveChauffeurSuccess = '[Chauffeur] SaveChauffeursSuccess Chauffeur',
  SaveChauffeurFailed = '[Chauffeur] SaveChauffeursFailed Chauffeur',


  UpdateChauffeurRequest = '[Chauffeur] UpdateChauffeursRequest Chauffeur',
  UpdateChauffeurSuccess = '[Chauffeur] UpdateChauffeursSuccess Chauffeur',
  UpdateChauffeurFailed = '[Chauffeur] UpdateChauffeursFailed Chauffeur',

  DeleteChauffeurRequest = '[Chauffeur] DeleteChauffeursRequest Chauffeur',
  DeleteChauffeurSuccess = '[Chauffeur] DeleteChauffeursSuccess Chauffeur',
  DeleteChauffeurFailed = '[Chauffeur] DeleteChauffeursFailed Chauffeur',

}

export class DeleteChauffeurRequest implements Action {
  readonly type = ChauffeurActionTypes.DeleteChauffeurRequest;

  constructor(public payload: { id: number }) {
  }
}

export class DeleteChauffeurSuccess implements Action {
  readonly type = ChauffeurActionTypes.DeleteChauffeurSuccess;

  constructor() {
  }
}

export class DeleteChauffeurFailed implements Action {
  readonly type = ChauffeurActionTypes.DeleteChauffeurFailed;

  constructor() {
  }
}

export class UpdateChauffeurRequest implements Action {
  readonly type = ChauffeurActionTypes.UpdateChauffeurRequest;

  constructor(public payload: { chauffeur: Chauffeur }) {
  }
}

export class UpdateChauffeurSuccess implements Action {
  readonly type = ChauffeurActionTypes.UpdateChauffeurSuccess;

  constructor(public payload: { chauffeur: Chauffeur }) {
  }
}

export class Chauffeursloading implements Action {
  readonly type = ChauffeurActionTypes.Chauffeursloading;

  constructor() {
  }
}

export class UpdateChauffeurFailed implements Action {
  readonly type = ChauffeurActionTypes.UpdateChauffeurFailed;

  constructor() {
  }
}

export class SaveChauffeurRequest implements Action {
  readonly type = ChauffeurActionTypes.SaveChauffeurRequest;

  constructor(public payload: { chauffeur: Chauffeur }) {
  }
}

export class SaveChauffeurSuccess implements Action {
  readonly type = ChauffeurActionTypes.SaveChauffeurSuccess;

  constructor(public payload: { chauffeur: Chauffeur }) {
  }
}

export class SaveChauffeurFailed implements Action {
  readonly type = ChauffeurActionTypes.SaveChauffeurFailed;

  constructor() {
  }
}

export class LoadOneChauffeurRequest implements Action {
  readonly type = ChauffeurActionTypes.LoadOneChauffeurRequest;

  constructor(public payload: { id: number }) {
  }
}

export class LoadOneChauffeurSuccess implements Action {
  readonly type = ChauffeurActionTypes.LoadOneChauffeurSuccess;

  constructor(public payload: { chauffeur: Chauffeur }) {
  }
}

export class LoadOneChauffeurFailed implements Action {
  readonly type = ChauffeurActionTypes.LoadOneChauffeurFailed;

  constructor() {
  }
}

export class LoadChauffeursRequest implements Action {
  readonly type = ChauffeurActionTypes.LoadChauffeursRequest;

  constructor(public search: string) {
  }
}

export class LoadChauffeursIsNotLoadedRequest implements Action {
  readonly type = ChauffeurActionTypes.LoadChauffeursIsNotLoadedRequest;

  constructor() {
  }
}

export class LoadChauffeursSuccess implements Action {
  readonly type = ChauffeurActionTypes.LoadChauffeursSuccess;

  constructor(public payload: { chauffeur: Chauffeur[] }) {
  }
}

export class LoadChauffeursFailed implements Action {
  readonly type = ChauffeurActionTypes.LoadChauffeursFailed;

  constructor() {
    console.warn('tra errHHHHHHHHHHHHHHHHHHHHHHHHHH');
  }
}


export type ChauffeurActions = LoadChauffeursRequest |
  LoadChauffeursSuccess |
  LoadChauffeursFailed |
  SaveChauffeurRequest |
  SaveChauffeurSuccess |
  SaveChauffeurFailed |
  Chauffeursloading |

  UpdateChauffeurRequest |
  UpdateChauffeurSuccess |
  UpdateChauffeurFailed |
  DeleteChauffeurRequest |
  DeleteChauffeurSuccess |
  DeleteChauffeurFailed |
  LoadOneChauffeurRequest |
  LoadOneChauffeurSuccess |
  LoadOneChauffeurFailed |
  LoadChauffeursIsNotLoadedRequest;
