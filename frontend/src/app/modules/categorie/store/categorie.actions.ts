import {Action} from '@ngrx/store';
import {Categorie} from '../model/categorie';

export enum CategorieActionTypes {
  LoadCategoriesIsNotLoadedRequest = '[Categorie] LoadCategoriesIsNotLoadedRequest Categorie',
  LoadCategoriesRequest = '[Categorie] LoadCategoriesRequest Categorie',
  LoadCategoriesSuccess = '[Categorie] LoadCategoriesSuccess Categorie',
  LoadCategoriesFailed = '[Categorie] LoadCategoriesFailed Categorie',
  Categoriesloading = '[Categorie] Categoriesloading Categorie',

  LoadOneCategorieRequest = '[Categorie] LoadOneCategorieRequest Categorie',
  LoadOneCategorieSuccess = '[Categorie] LoadOneCategorieSuccess Categorie',
  LoadOneCategorieFailed = '[Categorie] LoadOneCategorieFailed Categorie',

  SaveCategorieRequest = '[Categorie] SaveCategoriesRequest Categorie',
  SaveCategorieSuccess = '[Categorie] SaveCategoriesSuccess Categorie',
  SaveCategorieFailed = '[Categorie] SaveCategoriesFailed Categorie',


  UpdateCategorieRequest = '[Categorie] UpdateCategoriesRequest Categorie',
  UpdateCategorieSuccess = '[Categorie] UpdateCategoriesSuccess Categorie',
  UpdateCategorieFailed = '[Categorie] UpdateCategoriesFailed Categorie',

  DeleteCategorieRequest = '[Categorie] DeleteCategoriesRequest Categorie',
  DeleteCategorieSuccess = '[Categorie] DeleteCategoriesSuccess Categorie',
  DeleteCategorieFailed = '[Categorie] DeleteCategoriesFailed Categorie',

}

export class DeleteCategorieRequest implements Action {
  readonly type = CategorieActionTypes.DeleteCategorieRequest;

  constructor(public payload: { id: number }) {
  }
}

export class DeleteCategorieSuccess implements Action {
  readonly type = CategorieActionTypes.DeleteCategorieSuccess;

  constructor() {
  }
}
export class Categoriesloading implements Action {
  readonly type = CategorieActionTypes.Categoriesloading;

  constructor() {
  }
}

export class DeleteCategorieFailed implements Action {
  readonly type = CategorieActionTypes.DeleteCategorieFailed;

  constructor() {
  }
}

export class UpdateCategorieRequest implements Action {
  readonly type = CategorieActionTypes.UpdateCategorieRequest;

  constructor(public payload: { categorie: Categorie }) {
  }
}

export class UpdateCategorieSuccess implements Action {
  readonly type = CategorieActionTypes.UpdateCategorieSuccess;

  constructor(public payload: { categorie: Categorie }) {
  }
}

export class UpdateCategorieFailed implements Action {
  readonly type = CategorieActionTypes.UpdateCategorieFailed;

  constructor() {
  }
}

export class SaveCategorieRequest implements Action {
  readonly type = CategorieActionTypes.SaveCategorieRequest;

  constructor(public payload: { categorie: Categorie }) {
  }
}

export class SaveCategorieSuccess implements Action {
  readonly type = CategorieActionTypes.SaveCategorieSuccess;

  constructor(public payload: { categorie: Categorie }) {
  }
}

export class SaveCategorieFailed implements Action {
  readonly type = CategorieActionTypes.SaveCategorieFailed;

  constructor() {
  }
}

export class LoadOneCategorieRequest implements Action {
  readonly type = CategorieActionTypes.LoadOneCategorieRequest;

  constructor(public payload: { id: number }) {
  }
}

export class LoadOneCategorieSuccess implements Action {
  readonly type = CategorieActionTypes.LoadOneCategorieSuccess;

  constructor(public payload: { categorie: Categorie }) {
  }
}

export class LoadOneCategorieFailed implements Action {
  readonly type = CategorieActionTypes.LoadOneCategorieFailed;

  constructor() {
  }
}

export class LoadCategoriesRequest implements Action {
  readonly type = CategorieActionTypes.LoadCategoriesRequest;

  constructor(public search: string) {
  }
}

export class LoadCategoriesIsNotLoadedRequest implements Action {
  readonly type = CategorieActionTypes.LoadCategoriesIsNotLoadedRequest;

  constructor() {
  }
}

export class LoadCategoriesSuccess implements Action {
  readonly type = CategorieActionTypes.LoadCategoriesSuccess;

  constructor(public payload: { categories: Categorie[] }) {
  }
}

export class LoadCategoriesFailed implements Action {
  readonly type = CategorieActionTypes.LoadCategoriesFailed;

  constructor(public payload?: { error: any }) {
    console.warn('tra errHHHHHHHHHHHHHHHHHHHHHHHHHH', this.payload.error);
  }
}


export type CategorieActions = LoadCategoriesRequest |
  LoadCategoriesSuccess |
  LoadCategoriesFailed |
  SaveCategorieRequest |
  SaveCategorieSuccess |
  SaveCategorieFailed |
  Categoriesloading |

  UpdateCategorieRequest |
  UpdateCategorieSuccess |
  UpdateCategorieFailed |
  DeleteCategorieRequest |
  DeleteCategorieSuccess |
  DeleteCategorieFailed |
  LoadOneCategorieRequest |
  LoadOneCategorieSuccess |
  LoadOneCategorieFailed |
  LoadCategoriesIsNotLoadedRequest;
