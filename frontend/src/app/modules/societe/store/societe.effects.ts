import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';

import {catchError, concatMap, filter, map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';
import {
  SocieteActionTypes,
  SocieteActions,
  LoadSocietesSuccess,
  LoadSocietesFailed,
  LoadSocietesIsNotLoadedRequest,
  SaveSocieteRequest,
  SaveSocieteSuccess,
  SaveSocieteFailed,
  DeleteSocieteRequest,
  DeleteSocieteSuccess,
  DeleteSocieteFailed,
  LoadOneSocieteRequest,
  LoadOneSocieteSuccess, LoadOneSocieteFailed, UpdateSocieteRequest, UpdateSocieteSuccess, UpdateSocieteFailed
} from './societe.actions';
import {Societe} from '../model/societe';
import {SocieteService} from '../service/societe.service';
import {select, Store} from '@ngrx/store';
import {SocieteState} from './societe.reducer';
import {
  selectSocieteSearchAndisLoaded,
  selectSocieteSearch
} from './societe.selectors';
import {PaginatorInformations} from '../../../shared_models/paginator-informations';


@Injectable()
export class SocieteEffects {

  constructor(private actions$: Actions<SocieteActions>,
              private societeService: SocieteService,
              private societeState: Store<SocieteState>) {
  }


  @Effect()
  deleteSociete$ = this.actions$.pipe(
    ofType(SocieteActionTypes.DeleteSocieteRequest),
    switchMap((action: DeleteSocieteRequest) => {
      return this.societeService.delete(action.payload.id).pipe(map(source => new DeleteSocieteSuccess()),
        catchError(error => of(new DeleteSocieteFailed())));
    })
  );
  @Effect()
  saveSociete$ = this.actions$.pipe(
    ofType(SocieteActionTypes.SaveSocieteRequest),
    switchMap((action: SaveSocieteRequest) => {
      return this.societeService.save(action.payload.societe).pipe(map(source => new SaveSocieteSuccess({societe: source})),
        catchError(error => of(new SaveSocieteFailed())));
    })
  );
  @Effect()
  updateSociete$ = this.actions$.pipe(
    ofType(SocieteActionTypes.UpdateSocieteRequest),
    switchMap((action: UpdateSocieteRequest) => {
      return this.societeService.update(action.payload.societe).pipe(map(source => new UpdateSocieteSuccess({societe: source})),
        catchError(error => of(new UpdateSocieteFailed())));
    })
  );

  @Effect()
  loadSocietes$ = this.actions$.pipe(
    ofType(SocieteActionTypes.LoadSocietesRequest),
    switchMap((action: any) => {
      return this.societeService.findAll(action.search).pipe(map(source => new LoadSocietesSuccess({societe: source})),
        catchError(error => of(new LoadSocietesFailed())));
    })
  );
  @Effect()
  loadOneSociete$ = this.actions$.pipe(
    ofType(SocieteActionTypes.LoadOneSocieteRequest),
    switchMap((action: LoadOneSocieteRequest) => {
      return this.societeService.findById(action.payload.id).pipe(map(source => new LoadOneSocieteSuccess({societe: source})),
        catchError(error => of(new LoadOneSocieteFailed())));
    })
  );
  @Effect()
  loadSocietesIsNotLoadedRequest$ = this.actions$.pipe(
    ofType(SocieteActionTypes.LoadSocietesIsNotLoadedRequest),
    withLatestFrom(this.societeState.pipe(select(selectSocieteSearchAndisLoaded))),
    filter(([action, data]: [any, { search: string, isLoaded: boolean }]) => {
      return !data.isLoaded;
    }),
    switchMap(([action, data]: [any, { search: string }]) => {
      return this.societeService.findAll(data.search).pipe(map(source => new LoadSocietesSuccess({societe: source})),
        catchError(error => of(new LoadSocietesFailed())));
    })
  );


}
