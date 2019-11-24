import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';

import {catchError, concatMap, filter, map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';
import {
  PaysActionTypes,
  PaysActions,
  LoadPayssSuccess,
  LoadPayssFailed,
  LoadPayssIsNotLoadedRequest,
  SavePaysRequest,
  SavePaysSuccess,
  SavePaysFailed,
  DeletePaysRequest,
  DeletePaysSuccess,
  DeletePaysFailed,
  LoadOnePaysRequest,
  LoadOnePaysSuccess, LoadOnePaysFailed, UpdatePaysRequest, UpdatePaysSuccess, UpdatePaysFailed
} from './pays.actions';
import {Pays} from '../model/pays';
import {PaysService} from '../service/pays.service';
import {select, Store} from '@ngrx/store';
import {PaysState} from './pays.reducer';
import {
  selectPaysSearchAndisLoaded,
  selectPaysSearch
} from './pays.selectors';
import {PaginatorInformations} from '../../../shared_models/paginator-informations';


@Injectable()
export class PaysEffects {

  constructor(private actions$: Actions<PaysActions>,
              private paysService: PaysService,
              private paysState: Store<PaysState>) {
  }


  @Effect()
  deletePays$ = this.actions$.pipe(
    ofType(PaysActionTypes.DeletePaysRequest),
    switchMap((action: DeletePaysRequest) => {
      return this.paysService.delete(action.payload.id).pipe(map(source => new DeletePaysSuccess()),
        catchError(error => of(new DeletePaysFailed())));
    })
  );
  @Effect()
  savePays$ = this.actions$.pipe(
    ofType(PaysActionTypes.SavePaysRequest),
    switchMap((action: SavePaysRequest) => {
      return this.paysService.save(action.payload.pays).pipe(map(source => new SavePaysSuccess({pays: source})),
        catchError(error => of(new SavePaysFailed())));
    })
  );
  @Effect()
  updatePays$ = this.actions$.pipe(
    ofType(PaysActionTypes.UpdatePaysRequest),
    switchMap((action: UpdatePaysRequest) => {
      return this.paysService.update(action.payload.pays).pipe(map(source => new UpdatePaysSuccess({pays: source})),
        catchError(error => of(new UpdatePaysFailed())));
    })
  );

  @Effect()
  loadPayss$ = this.actions$.pipe(
    ofType(PaysActionTypes.LoadPayssRequest),
    switchMap((action: any) => {
      return this.paysService.findAll(action.search).pipe(map(source => new LoadPayssSuccess({pays: source})),
        catchError(error => of(new LoadPayssFailed())));
    })
  );
  @Effect()
  loadOnePays$ = this.actions$.pipe(
    ofType(PaysActionTypes.LoadOnePaysRequest),
    switchMap((action: LoadOnePaysRequest) => {
      return this.paysService.findById(action.payload.id).pipe(map(source => new LoadOnePaysSuccess({pays: source})),
        catchError(error => of(new LoadOnePaysFailed())));
    })
  );
  @Effect()
  loadPayssIsNotLoadedRequest$ = this.actions$.pipe(
    ofType(PaysActionTypes.LoadPayssIsNotLoadedRequest),
    withLatestFrom(this.paysState.pipe(select(selectPaysSearchAndisLoaded))),
    filter(([action, data]: [any, { search: string, isLoaded: boolean }]) => {
      return !data.isLoaded;
    }),
    switchMap(([action, data]: [any, { search: string }]) => {
      return this.paysService.findAll(data.search).pipe(map(source => new LoadPayssSuccess({pays: source})),
        catchError(error => of(new LoadPayssFailed())));
    })
  );


}
