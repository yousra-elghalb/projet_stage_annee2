import {Action} from '@ngrx/store';
import {PaginatorInformations} from '../../../shared_models/paginator-informations';
import {PaginatedResult} from '../../../shared_models/paginated-result';
import {OffreVoyage} from '../model/offre-voyage';
import {CriteresRecherche} from '../model/criteres-recherche';
import {Groupe} from '../model/groupe';

export enum OffreVoyageActionTypes {
  LoadOffreVoyagesIsNotLoadedRequest = '[OffreVoyage] LoadOffreVoyagesIsNotLoadedRequest OffreVoyage',
  LoadOffreVoyagesRequest = '[OffreVoyage] LoadOffreVoyagesRequest OffreVoyage',

  LoadOffreVoyagesLimitedIsNotLoadedRequest = '[OffreVoyage]  LoadOffreVoyagesLimitedIsNotLoadedRequest OffreVoyage',
  LoadOffreVoyagesLimitedRequest = '[OffreVoyage]  LoadOffreVoyagesLimitedRequest OffreVoyage',


  ChangeOffreVoyagesIsLoaded = '[OffreVoyage] changeOffreVoyagesIsLoaded OffreVoyage',
  LoadOffreVoyagesSuccess = '[OffreVoyage] LoadOffreVoyagesSuccess OffreVoyage',
  LoadOffreVoyagesFailed = '[OffreVoyage] LoadOffreVoyagesFailed OffreVoyage',

  LoadOneOffreVoyageRequest = '[OffreVoyage] LoadOneOffreVoyageRequest OffreVoyage',
  LoadOneOffreVoyageSuccess = '[OffreVoyage] LoadOneOffreVoyageSuccess OffreVoyage',
  LoadOneOffreVoyageFailed = '[OffreVoyage] LoadOneOffreVoyageFailed OffreVoyage',

  SaveOffreVoyageRequest = '[OffreVoyage] SaveOffreVoyagesRequest OffreVoyage',
  SaveOffreVoyageSuccess = '[OffreVoyage] SaveOffreVoyagesSuccess OffreVoyage',
  SaveOffreVoyageFailed = '[OffreVoyage] SaveOffreVoyagesFailed OffreVoyage',

  UpdateOffreVoyageRequest = '[OffreVoyage] UpdateOffreVoyagesRequest OffreVoyage',
  UpdateOffreVoyageSuccess = '[OffreVoyage] UpdateOffreVoyagesSuccess OffreVoyage',
  UpdateOffreVoyageFailed = '[OffreVoyage] UpdateOffreVoyagesFailed OffreVoyage',

  DeleteOffreVoyageRequest = '[OffreVoyage] DeleteOffreVoyagesRequest OffreVoyage',
  DeleteOffreVoyageSuccess = '[OffreVoyage] DeleteOffreVoyagesSuccess OffreVoyage',
  DeleteOffreVoyageFailed = '[OffreVoyage] DeleteOffreVoyagesFailed OffreVoyage',

  SetCategorieId = '[SetCategorieId] SetCategorieId OffreVoyage',
}

export class SetCategorieId implements Action {
  readonly type = OffreVoyageActionTypes.SetCategorieId;

  constructor(public payload: { id: number }) {
  }
}

export class ChangeOffreVoyagesIsLoaded implements Action {
  readonly type = OffreVoyageActionTypes.ChangeOffreVoyagesIsLoaded;

  constructor(public payload: { isLoaded: boolean }) {
  }
}

export class DeleteOffreVoyageRequest implements Action {
  readonly type = OffreVoyageActionTypes.DeleteOffreVoyageRequest;

  constructor(public payload: { id: number }) {
  }
}

export class DeleteOffreVoyageSuccess implements Action {
  readonly type = OffreVoyageActionTypes.DeleteOffreVoyageSuccess;

  constructor() {
  }
}

export class DeleteOffreVoyageFailed implements Action {
  readonly type = OffreVoyageActionTypes.DeleteOffreVoyageFailed;

  constructor() {
  }
}

export class UpdateOffreVoyageRequest implements Action {
  readonly type = OffreVoyageActionTypes.UpdateOffreVoyageRequest;

  constructor(public payload: { offreVoyage: OffreVoyage }) {
  }
}

export class UpdateOffreVoyageSuccess implements Action {
  readonly type = OffreVoyageActionTypes.UpdateOffreVoyageSuccess;

  constructor(public payload: { offreVoyage: OffreVoyage }) {
  }
}

export class UpdateOffreVoyageFailed implements Action {
  readonly type = OffreVoyageActionTypes.UpdateOffreVoyageFailed;

  constructor() {
  }
}

export class SaveOffreVoyageRequest implements Action {
  readonly type = OffreVoyageActionTypes.SaveOffreVoyageRequest;

  constructor(public payload: { offreVoyages: OffreVoyage[] }) {
  }
}

export class SaveOffreVoyageSuccess implements Action {
  readonly type = OffreVoyageActionTypes.SaveOffreVoyageSuccess;

  constructor() {
  }
}

export class SaveOffreVoyageFailed implements Action {
  readonly type = OffreVoyageActionTypes.SaveOffreVoyageFailed;

  constructor(error: any) {
    console.warn(error);
  }
}


export class LoadOneOffreVoyageRequest implements Action {
  readonly type = OffreVoyageActionTypes.LoadOneOffreVoyageRequest;

  constructor(public payload: { id: number }) {
  }
}

export class LoadOneOffreVoyageSuccess implements Action {
  readonly type = OffreVoyageActionTypes.LoadOneOffreVoyageSuccess;

  constructor(public payload: { offreVoyage: OffreVoyage }) {
  }
}

export class LoadOneOffreVoyageFailed implements Action {
  readonly type = OffreVoyageActionTypes.LoadOneOffreVoyageFailed;

  constructor() {
  }
}

export class LoadOffreVoyagesLimitedRequest implements Action {
  readonly type = OffreVoyageActionTypes.LoadOffreVoyagesLimitedRequest;

  constructor(public search: CriteresRecherche, public paginatorInformations: PaginatorInformations) {
  }
}

export class LoadOffreVoyagesLimitedIsNotLoadedRequest implements Action {
  readonly type = OffreVoyageActionTypes.LoadOffreVoyagesLimitedIsNotLoadedRequest;

  constructor(public payload: { id: any }) {
  }
}

export class LoadOffreVoyagesRequest implements Action {
  readonly type = OffreVoyageActionTypes.LoadOffreVoyagesRequest;

  constructor(public search: CriteresRecherche, public paginatorInformations: PaginatorInformations) {
  }
}

export class LoadOffreVoyagesIsNotLoadedRequest implements Action {
  readonly type = OffreVoyageActionTypes.LoadOffreVoyagesIsNotLoadedRequest;

  constructor(public payload: { id: any }) {
  }
}

export class LoadOffreVoyagesSuccess implements Action {
  readonly type = OffreVoyageActionTypes.LoadOffreVoyagesSuccess;

  constructor(public payload: { paginatedResults: PaginatedResult<OffreVoyage> }) {
  }
}

export class LoadOffreVoyagesFailed implements Action {
  readonly type = OffreVoyageActionTypes.LoadOffreVoyagesFailed;

  constructor() {
    console.warn('tra errHHHHHHHHHHHHHHHHHHHHHHHHHH');
  }
}


export type OffreVoyageActions =
  LoadOffreVoyagesLimitedRequest |
  LoadOffreVoyagesRequest |
  LoadOffreVoyagesSuccess |
  LoadOffreVoyagesFailed |
  SaveOffreVoyageRequest |
  SaveOffreVoyageSuccess |
  SaveOffreVoyageFailed |
  UpdateOffreVoyageRequest |
  UpdateOffreVoyageSuccess |
  UpdateOffreVoyageFailed |
  DeleteOffreVoyageRequest |
  DeleteOffreVoyageSuccess |
  DeleteOffreVoyageFailed |
  LoadOneOffreVoyageRequest |
  LoadOneOffreVoyageSuccess |
  LoadOneOffreVoyageFailed |
  SetCategorieId |
  ChangeOffreVoyagesIsLoaded |
  LoadOffreVoyagesIsNotLoadedRequest |
  LoadOffreVoyagesLimitedIsNotLoadedRequest;
