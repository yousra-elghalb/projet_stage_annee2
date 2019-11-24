import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';

import {catchError, concatMap, filter, map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';
import {
  DepenseActionTypes,
  DepenseActions,
  LoadDepensesSuccess,
  LoadDepensesFailed,
  LoadDepensesIsNotLoadedRequest,
  SaveDepenseRequest,
  SaveDepenseSuccess,
  SaveDepenseFailed,
  DeleteDepenseRequest,
  DeleteDepenseSuccess,
  DeleteDepenseFailed,
  LoadOneDepenseRequest,
  LoadOneDepenseSuccess, LoadOneDepenseFailed, UpdateDepenseRequest, UpdateDepenseSuccess, UpdateDepenseFailed
} from './depense.actions';
import {Depense} from '../model/depense';
import {DepenseService} from '../service/depense.service';
import {select, Store} from '@ngrx/store';
import {DepenseState} from './depense.reducer';
import {
  selectDepenseSearchAndisLoaded,
  selectDepenseSearch
} from './depense.selectors';
import {PaginatorInformations} from '../../../shared_models/paginator-informations';


@Injectable()
export class DepenseEffects {

  constructor(private actions$: Actions<DepenseActions>,
              private depenseService: DepenseService,
              private depenseState: Store<DepenseState>) {
  }


  @Effect()
  deleteDepense$ = this.actions$.pipe(
    ofType(DepenseActionTypes.DeleteDepenseRequest),
    switchMap((action: DeleteDepenseRequest) => {
      return this.depenseService.delete(action.payload.id).pipe(map(source => new DeleteDepenseSuccess()),
        catchError(error => of(new DeleteDepenseFailed())));
    })
  );
  @Effect()
  saveDepense$ = this.actions$.pipe(
    ofType(DepenseActionTypes.SaveDepenseRequest),
    switchMap((action: SaveDepenseRequest) => {
      return this.depenseService.save(action.payload.depense).pipe(map(source => new SaveDepenseSuccess({depense: source})),
        catchError(error => of(new SaveDepenseFailed())));
    })
  );
  @Effect()
  updateDepense$ = this.actions$.pipe(
    ofType(DepenseActionTypes.UpdateDepenseRequest),
    switchMap((action: UpdateDepenseRequest) => {
      return this.depenseService.update(action.payload.depense).pipe(map(source => new UpdateDepenseSuccess({depense: source})),
        catchError(error => of(new UpdateDepenseFailed())));
    })
  );

  @Effect()
  loadDepenses$ = this.actions$.pipe(
    ofType(DepenseActionTypes.LoadDepensesRequest),
    switchMap((action: any) => {
      return this.depenseService.findAll(action.search).pipe(map(source => new LoadDepensesSuccess({depense: source})),
        catchError(error => of(new LoadDepensesFailed())));
    })
  );
  @Effect()
  loadOneDepense$ = this.actions$.pipe(
    ofType(DepenseActionTypes.LoadOneDepenseRequest),
    switchMap((action: LoadOneDepenseRequest) => {
      return this.depenseService.findById(action.payload.id).pipe(map(source => new LoadOneDepenseSuccess({depense: source})),
        catchError(error => of(new LoadOneDepenseFailed())));
    })
  );
  @Effect()
  loadDepensesIsNotLoadedRequest$ = this.actions$.pipe(
    ofType(DepenseActionTypes.LoadDepensesIsNotLoadedRequest),
    withLatestFrom(this.depenseState.pipe(select(selectDepenseSearchAndisLoaded))),
    filter(([action, data]: [any, { search: string, isLoaded: boolean }]) => {
      return !data.isLoaded;
    }),
    switchMap(([action, data]: [any, { search: string }]) => {
      return this.depenseService.findAll(data.search).pipe(map(source => new LoadDepensesSuccess({depense: source})),
        catchError(error => of(new LoadDepensesFailed())));
    })
  );


}
