import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';

import {catchError, concatMap, filter, map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';
import {
  SousCategorieActionTypes,
  SousCategorieActions,
  LoadSousCategoriesSuccess,
  LoadSousCategoriesFailed,
  LoadSousCategoriesIsNotLoadedRequest,
  SaveSousCategorieRequest,
  SaveSousCategorieSuccess,
  SaveSousCategorieFailed,
  DeleteSousCategorieRequest,
  DeleteSousCategorieSuccess,
  DeleteSousCategorieFailed,
  LoadOneSousCategorieRequest,
  LoadOneSousCategorieSuccess, LoadOneSousCategorieFailed, UpdateSousCategorieRequest, UpdateSousCategorieSuccess, UpdateSousCategorieFailed
} from './sous-categorie.actions';
import {select, Store} from '@ngrx/store';
import {SousCategorieState} from './sous-categorie.reducer';
import {
  selectSousCategorieSearchAndisLoaded,
  selectSousCategorieSearch
} from './sous-categorie.selectors';
import {PaginatorInformations} from '../../../shared_models/paginator-informations';
import {SousCategorieService} from '../service/sous-categorie.service';


@Injectable()
export class SousCategorieEffects {

  constructor(private actions$: Actions<SousCategorieActions>,
              private sousCategorieService: SousCategorieService,
              private sousCategorieState: Store<SousCategorieState>) {
  }


  @Effect()
  deleteSousCategorie$ = this.actions$.pipe(
    ofType(SousCategorieActionTypes.DeleteSousCategorieRequest),
    switchMap((action: DeleteSousCategorieRequest) => {
      return this.sousCategorieService.delete(action.payload.id).pipe(
        map(source => new DeleteSousCategorieSuccess()),
        catchError(error => of(new DeleteSousCategorieFailed())));
    })
  );
  @Effect()
  saveSousCategorie$ = this.actions$.pipe(
    ofType(SousCategorieActionTypes.SaveSousCategorieRequest),
    switchMap((action: SaveSousCategorieRequest) => {
      return this.sousCategorieService.save(action.payload.sousCategorie).pipe(
        map(source => new SaveSousCategorieSuccess({sousCategorie: source})),
        catchError(error => of(new SaveSousCategorieFailed())));
    })
  );
  @Effect()
  updateSousCategorie$ = this.actions$.pipe(
    ofType(SousCategorieActionTypes.UpdateSousCategorieRequest),
    switchMap((action: UpdateSousCategorieRequest) => {
      return this.sousCategorieService.update(action.payload.sousCategorie).pipe(
        map(source => new UpdateSousCategorieSuccess({sousCategorie: source})),
        catchError(error => of(new UpdateSousCategorieFailed())));
    })
  );

  @Effect()
  loadSousCategories$ = this.actions$.pipe(
    ofType(SousCategorieActionTypes.LoadSousCategoriesRequest),
    switchMap((action: any) => {
      return this.sousCategorieService.findAll(action.search).pipe(
        map(source => new LoadSousCategoriesSuccess({sousCategories: source})),
        catchError(error => of(new LoadSousCategoriesFailed())));
    })
  );
  @Effect()
  loadOneSousCategorie$ = this.actions$.pipe(
    ofType(SousCategorieActionTypes.LoadOneSousCategorieRequest),
    switchMap((action: LoadOneSousCategorieRequest) => {
      return this.sousCategorieService.findById(action.payload.id).pipe(
        map(source => new LoadOneSousCategorieSuccess({sousCategorie: source})),
        catchError(error => of(new LoadOneSousCategorieFailed())));
    })
  );
  @Effect()
  loadSousCategoriesIsNotLoadedRequest$ = this.actions$.pipe(
    ofType(SousCategorieActionTypes.LoadSousCategoriesIsNotLoadedRequest),
    withLatestFrom(this.sousCategorieState.pipe(select(selectSousCategorieSearchAndisLoaded))),
    filter(([action, data]: [any, { search: string, isLoaded: boolean }]) => {
      return !data.isLoaded;
    }),
    switchMap(([action, data]: [any, { search: string }]) => {
      return this.sousCategorieService.findAll(data.search).pipe(
        map(source => new LoadSousCategoriesSuccess({sousCategories: source})),
        catchError(error => of(new LoadSousCategoriesFailed())));
    })
  );


}
