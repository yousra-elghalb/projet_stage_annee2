import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';

import {catchError, concatMap, filter, map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';
import {
  CategorieActionTypes,
  CategorieActions,
  LoadCategoriesSuccess,
  LoadCategoriesFailed,
  SaveCategorieRequest,
  SaveCategorieSuccess,
  SaveCategorieFailed,
  DeleteCategorieRequest,
  DeleteCategorieSuccess,
  DeleteCategorieFailed,
  LoadOneCategorieRequest,
  LoadOneCategorieSuccess, LoadOneCategorieFailed, UpdateCategorieRequest, UpdateCategorieSuccess, UpdateCategorieFailed
} from './categorie.actions';
import {Categorie} from '../model/categorie';
import {CategorieService} from '../service/categorie.service';
import {select, Store} from '@ngrx/store';
import {CategorieState} from './categorie.reducer';
import {
  selectCategorieSearch, selectCategorieSearchAndisLoaded
} from './categorie.selectors';
import {PaginatorInformations} from '../../../shared_models/paginator-informations';


@Injectable()
export class CategorieEffects {

  constructor(private actions$: Actions<CategorieActions>,
              private categorieService: CategorieService,
              private categorieState: Store<CategorieState>) {
  }


  @Effect()
  deleteCategorie$ = this.actions$.pipe(
    ofType(CategorieActionTypes.DeleteCategorieRequest),
    switchMap((action: DeleteCategorieRequest) => {
      return this.categorieService.delete(action.payload.id).pipe(
        map(source => new DeleteCategorieSuccess()),
        catchError(error => of(new DeleteCategorieFailed())));
    })
  );
  @Effect()
  saveCategorie$ = this.actions$.pipe(
    ofType(CategorieActionTypes.SaveCategorieRequest),
    switchMap((action: SaveCategorieRequest) => {
      return this.categorieService.save(action.payload.categorie).pipe(
        map(source => new SaveCategorieSuccess({categorie: source})),
        catchError(error => of(new SaveCategorieFailed())));
    })
  );
  @Effect()
  updateCategorie$ = this.actions$.pipe(
    ofType(CategorieActionTypes.UpdateCategorieRequest),
    switchMap((action: UpdateCategorieRequest) => {
      return this.categorieService.update(action.payload.categorie).pipe(
        map(source => new UpdateCategorieSuccess({categorie: source})),
        catchError(error => of(new UpdateCategorieFailed())));
    })
  );

  @Effect()
  loadCategories$ = this.actions$.pipe(
    ofType(CategorieActionTypes.LoadCategoriesRequest),
    switchMap((action: any) => {
      return this.categorieService.findAll(action.search).pipe(
        map(source => new LoadCategoriesSuccess({categories: source})),
        catchError(error => of(new LoadCategoriesFailed())));
    })
  );
  @Effect()
  loadOneCategorie$ = this.actions$.pipe(
    ofType(CategorieActionTypes.LoadOneCategorieRequest),
    switchMap((action: LoadOneCategorieRequest) => {
      return this.categorieService.findById(action.payload.id).pipe(
        map(source => new LoadOneCategorieSuccess({categorie: source})),
        catchError(error => of(new LoadOneCategorieFailed())));
    })
  );
  @Effect()
  loadCategoriesIsNotLoadedRequest$ = this.actions$.pipe(
    ofType(CategorieActionTypes.LoadCategoriesIsNotLoadedRequest),
    withLatestFrom(this.categorieState.pipe(select(selectCategorieSearchAndisLoaded))),
    filter(([action, data]: [any, { search: string, isLoaded: boolean }]) => {
      return !data.isLoaded;
    }),
    switchMap(([action, data]: [any, { search: string }]) => {
      return this.categorieService.findAll(data.search).pipe(
        map(source => new LoadCategoriesSuccess({categories: source})),
        catchError(v => of(new LoadCategoriesFailed({error: v}))));
    })
  );


}
