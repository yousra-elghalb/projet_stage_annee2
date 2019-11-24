import {Action} from '@ngrx/store';
import {PaginatorInformations} from '../../../shared_models/paginator-informations';
import {PaginatedResult} from '../../../shared_models/paginated-result';
import {SousCategorie} from '../model/sous-categorie';

export enum SousCategorieActionTypes {
  LoadSousCategoriesIsNotLoadedRequest = '[SousCategorie] LoadSousCategoriesIsNotLoadedRequest SousCategorie',
  LoadSousCategoriesRequest = '[SousCategorie] LoadSousCategoriesRequest SousCategorie',
  LoadSousCategoriesSuccess = '[SousCategorie] LoadSousCategoriesSuccess SousCategorie',
  LoadSousCategoriesFailed = '[SousCategorie] LoadSousCategoriesFailed SousCategorie',

  LoadOneSousCategorieRequest = '[SousCategorie] LoadOneSousCategorieRequest SousCategorie',
  LoadOneSousCategorieSuccess = '[SousCategorie] LoadOneSousCategorieSuccess SousCategorie',
  LoadOneSousCategorieFailed = '[SousCategorie] LoadOneSousCategorieFailed SousCategorie',

  SaveSousCategorieRequest = '[SousCategorie] SaveSousCategoriesRequest SousCategorie',
  SaveSousCategorieSuccess = '[SousCategorie] SaveSousCategoriesSuccess SousCategorie',
  SaveSousCategorieFailed = '[SousCategorie] SaveSousCategoriesFailed SousCategorie',


  UpdateSousCategorieRequest = '[SousCategorie] UpdateSousCategoriesRequest SousCategorie',
  UpdateSousCategorieSuccess = '[SousCategorie] UpdateSousCategoriesSuccess SousCategorie',
  UpdateSousCategorieFailed = '[SousCategorie] UpdateSousCategoriesFailed SousCategorie',

  DeleteSousCategorieRequest = '[SousCategorie] DeleteSousCategoriesRequest SousCategorie',
  DeleteSousCategorieSuccess = '[SousCategorie] DeleteSousCategoriesSuccess SousCategorie',
  DeleteSousCategorieFailed = '[SousCategorie] DeleteSousCategoriesFailed SousCategorie',

  AddAllChipsSousCategories = '[SousCategorie] AddAllChipsSousCategories SousCategorie',
  AddChipsSousCategories = '[SousCategorie] AddChipsSousCategories SousCategorie',
  RemoveChipsSousCategories = '[SousCategorie] RemoveChipsSousCategories SousCategorie',

}

export class AddAllChipsSousCategories implements Action {
  readonly type = SousCategorieActionTypes.AddAllChipsSousCategories;

  constructor(public payload: { sousCategories: any }) {
  }
}

export class AddChipsSousCategories implements Action {
  readonly type = SousCategorieActionTypes.AddChipsSousCategories;

  constructor(public payload: { sousCategorie: SousCategorie }) {
  }
}

export class RemoveChipsSousCategories implements Action {
  readonly type = SousCategorieActionTypes.RemoveChipsSousCategories;

  constructor(public payload: { id: number }) {
  }
}

export class DeleteSousCategorieRequest implements Action {
  readonly type = SousCategorieActionTypes.DeleteSousCategorieRequest;

  constructor(public payload: { id: number }) {
  }
}

export class DeleteSousCategorieSuccess implements Action {
  readonly type = SousCategorieActionTypes.DeleteSousCategorieSuccess;

  constructor() {
  }
}

export class DeleteSousCategorieFailed implements Action {
  readonly type = SousCategorieActionTypes.DeleteSousCategorieFailed;

  constructor() {
  }
}

export class UpdateSousCategorieRequest implements Action {
  readonly type = SousCategorieActionTypes.UpdateSousCategorieRequest;

  constructor(public payload: { sousCategorie: SousCategorie }) {
  }
}

export class UpdateSousCategorieSuccess implements Action {
  readonly type = SousCategorieActionTypes.UpdateSousCategorieSuccess;

  constructor(public payload: { sousCategorie: SousCategorie }) {
  }
}

export class UpdateSousCategorieFailed implements Action {
  readonly type = SousCategorieActionTypes.UpdateSousCategorieFailed;

  constructor() {
  }
}

export class SaveSousCategorieRequest implements Action {
  readonly type = SousCategorieActionTypes.SaveSousCategorieRequest;

  constructor(public payload: { sousCategorie: SousCategorie }) {
  }
}

export class SaveSousCategorieSuccess implements Action {
  readonly type = SousCategorieActionTypes.SaveSousCategorieSuccess;

  constructor(public payload: { sousCategorie: SousCategorie }) {
  }
}

export class SaveSousCategorieFailed implements Action {
  readonly type = SousCategorieActionTypes.SaveSousCategorieFailed;

  constructor() {
  }
}

export class LoadOneSousCategorieRequest implements Action {
  readonly type = SousCategorieActionTypes.LoadOneSousCategorieRequest;

  constructor(public payload: { id: number }) {
  }
}

export class LoadOneSousCategorieSuccess implements Action {
  readonly type = SousCategorieActionTypes.LoadOneSousCategorieSuccess;

  constructor(public payload: { sousCategorie: SousCategorie }) {
  }
}

export class LoadOneSousCategorieFailed implements Action {
  readonly type = SousCategorieActionTypes.LoadOneSousCategorieFailed;

  constructor() {
  }
}

export class LoadSousCategoriesRequest implements Action {
  readonly type = SousCategorieActionTypes.LoadSousCategoriesRequest;

  constructor(public search: string) {
  }
}

export class LoadSousCategoriesIsNotLoadedRequest implements Action {
  readonly type = SousCategorieActionTypes.LoadSousCategoriesIsNotLoadedRequest;

  constructor() {
  }
}

export class LoadSousCategoriesSuccess implements Action {
  readonly type = SousCategorieActionTypes.LoadSousCategoriesSuccess;

  constructor(public payload: { sousCategories: SousCategorie[] }) {
  }
}

export class LoadSousCategoriesFailed implements Action {
  readonly type = SousCategorieActionTypes.LoadSousCategoriesFailed;

  constructor() {
    console.warn('tra errHHHHHHHHHHHHHHHHHHHHHHHHHH');
  }
}


export type SousCategorieActions = LoadSousCategoriesRequest |
  LoadSousCategoriesSuccess |
  LoadSousCategoriesFailed |
  SaveSousCategorieRequest |
  SaveSousCategorieSuccess |
  SaveSousCategorieFailed |

  AddAllChipsSousCategories |
  AddChipsSousCategories |
  RemoveChipsSousCategories |
  UpdateSousCategorieRequest |
  UpdateSousCategorieSuccess |
  UpdateSousCategorieFailed |
  DeleteSousCategorieRequest |
  DeleteSousCategorieSuccess |
  DeleteSousCategorieFailed |
  LoadOneSousCategorieRequest |
  LoadOneSousCategorieSuccess |
  LoadOneSousCategorieFailed |
  LoadSousCategoriesIsNotLoadedRequest;
