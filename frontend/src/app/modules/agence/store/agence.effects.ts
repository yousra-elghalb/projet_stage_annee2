import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';

import {catchError, concatMap, filter, map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';
import {
  AgenceActionTypes,
  AgenceActions,
  LoadAgencesSuccess,
  LoadAgencesFailed,
  LoadAgencesIsNotLoadedRequest,
  SaveAgenceRequest,
  SaveAgenceSuccess,
  SaveAgenceFailed,
  DeleteAgenceRequest,
  DeleteAgenceSuccess,
  DeleteAgenceFailed,
  LoadOneAgenceRequest,
  LoadOneAgenceSuccess,
  LoadOneAgenceFailed,
  UpdateAgenceRequest,
  UpdateAgenceSuccess,
  UpdateAgenceFailed
} from './agence.actions';
import {Agence} from '../model/agence';
import {AgenceService} from '../service/agence.service';
import {select, Store} from '@ngrx/store';
import {AgenceState} from './agence.reducer';
import {
  selectAgenceSearchAndisLoaded,
  selectAgenceSearch
} from './agence.selectors';
import {PaginatorInformations} from '../../../shared_models/paginator-informations';


@Injectable()
export class AgenceEffects {

  constructor(private actions$: Actions<AgenceActions>,
              private agenceService: AgenceService,
              private agenceState: Store<AgenceState>) {
  }


  @Effect()
  deleteAgence$ = this.actions$.pipe(
    ofType(AgenceActionTypes.DeleteAgenceRequest),
    switchMap((action: DeleteAgenceRequest) => {
      return this.agenceService.delete(action.payload.id).pipe(map(source => new DeleteAgenceSuccess()),
        catchError(error => of(new DeleteAgenceFailed())));
    })
  );
  @Effect()
  saveAgence$ = this.actions$.pipe(
    ofType(AgenceActionTypes.SaveAgenceRequest),
    switchMap((action: SaveAgenceRequest) => {
      return this.agenceService.save(action.payload.agence)
        .pipe(map(source => new SaveAgenceSuccess({agence: source})),
          catchError(error => of(new SaveAgenceFailed())));
    })
  );
  @Effect()
  updateAgence$ = this.actions$.pipe(
    ofType(AgenceActionTypes.UpdateAgenceRequest),
    switchMap((action: UpdateAgenceRequest) => {
      return this.agenceService.update(action.payload.agence).pipe(
        map(source => {
          return new UpdateAgenceSuccess({agence: source});
        }),
        catchError(error => of(new UpdateAgenceFailed())));
    })
  );

  @Effect()
  loadAgences$ = this.actions$.pipe(
    ofType(AgenceActionTypes.LoadAgencesRequest),
    switchMap((action: any) => {
      return this.agenceService.findAll(action.search).pipe(
        map(source => new LoadAgencesSuccess({agence: source})),
        catchError(error => of(new LoadAgencesFailed())));
    })
  );
  @Effect()
  loadOneAgence$ = this.actions$.pipe(
    ofType(AgenceActionTypes.LoadOneAgenceRequest),
    switchMap((action: LoadOneAgenceRequest) => {
      return this.agenceService.findById(action.payload.id).pipe(
        map(source => new LoadOneAgenceSuccess({agence: source})),
        catchError(error => of(new LoadOneAgenceFailed())));
    })
  );
  @Effect()
  loadAgencesIsNotLoadedRequest$ = this.actions$.pipe(
    ofType(AgenceActionTypes.LoadAgencesIsNotLoadedRequest),
    withLatestFrom(this.agenceState.pipe(select(selectAgenceSearchAndisLoaded))),
    filter(([action, data]: [any, { search: string, isLoaded: boolean }]) => {
      return !data.isLoaded;
    }),
    switchMap(([action, data]: [any, { search: string }]) => {
      return this.agenceService.findAll(data.search).pipe(
        map(source => new LoadAgencesSuccess({agence: source})),
        catchError(error => of(new LoadAgencesFailed())));
    })
  );


}
