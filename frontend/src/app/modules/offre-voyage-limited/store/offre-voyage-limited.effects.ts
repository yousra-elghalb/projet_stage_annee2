import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';

import {catchError, concatMap, filter, map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';
import {
  OffreVoyageLimitedActionTypes,
  OffreVoyageLimitedActions,
  LoadOffreVoyageLimitedsSuccess,
  LoadOffreVoyageLimitedsFailed,
  SaveOffreVoyageLimitedRequest,
  SaveOffreVoyageLimitedSuccess,
  SaveOffreVoyageLimitedFailed,
  DeleteOffreVoyageLimitedRequest,
  DeleteOffreVoyageLimitedSuccess,
  DeleteOffreVoyageLimitedFailed,
  LoadOneOffreVoyageLimitedRequest,
  LoadOneOffreVoyageLimitedSuccess,
  LoadOneOffreVoyageLimitedFailed,
  UpdateOffreVoyageLimitedRequest,
  UpdateOffreVoyageLimitedSuccess,
  UpdateOffreVoyageLimitedFailed,
  LoadOffreVoyageLimitedByOffreVoyageIdsRequest
} from './offre-voyage-limited.actions';
import {OffreVoyageLimitedService} from '../service/offre-voyage-limited.service';
import {select, Store} from '@ngrx/store';
import {OffreVoyageLimitedState} from './offre-voyage-limited.reducer';
import {} from './offre-voyage-limited.selectors';
import {LoadVoyageursFailed, LoadVoyageursSuccess, VoyageurActionTypes} from '../../voyageur/store/voyageur.actions';


@Injectable()
export class OffreVoyageLimitedEffects {

  constructor(private actions$: Actions<OffreVoyageLimitedActions>,
              private offreVoyageLimitedService: OffreVoyageLimitedService,
              private offreVoyageLimitedState: Store<OffreVoyageLimitedState>) {
  }


  @Effect()
  deleteOffreVoyageLimited$ = this.actions$.pipe(
    ofType(OffreVoyageLimitedActionTypes.DeleteOffreVoyageLimitedRequest),
    switchMap((action: DeleteOffreVoyageLimitedRequest) => {
      return this.offreVoyageLimitedService.delete(action.payload.id).pipe(
        map(source => new DeleteOffreVoyageLimitedSuccess()),
        catchError(error => of(new DeleteOffreVoyageLimitedFailed())));
    })
  );
  @Effect()
  saveOffreVoyageLimited$ = this.actions$.pipe(
    ofType(OffreVoyageLimitedActionTypes.SaveOffreVoyageLimitedRequest),
    switchMap((action: SaveOffreVoyageLimitedRequest) => {
      return this.offreVoyageLimitedService.save(action.payload.data).pipe(
        map(source => new SaveOffreVoyageLimitedSuccess()),
        catchError(error => of(new SaveOffreVoyageLimitedFailed(error))));
    })
  );
  @Effect()
  updateOffreVoyageLimited$ = this.actions$.pipe(
    ofType(OffreVoyageLimitedActionTypes.UpdateOffreVoyageLimitedRequest),
    switchMap((action: UpdateOffreVoyageLimitedRequest) => {
      return this.offreVoyageLimitedService.update(action.payload.offreVoyageLimited).pipe(
        map(source => new UpdateOffreVoyageLimitedSuccess({offreVoyageLimited: source})),
        catchError(error => of(new UpdateOffreVoyageLimitedFailed())));
    })
  );

  @Effect()
  loadOffreVoyageLimiteds$ = this.actions$.pipe(
    ofType(OffreVoyageLimitedActionTypes.LoadOffreVoyageLimitedsRequest),
    switchMap((action: any) => {
      return this.offreVoyageLimitedService.findAll(action.paginatorInformations, action.search).pipe(
        map(source => new LoadOffreVoyageLimitedsSuccess({paginatedResults: source})),
        catchError(error => of(new LoadOffreVoyageLimitedsFailed())));
    })
  );
  @Effect()
  loadOffreVoyageLimitedByOffreVoyageIdsRequest$ = this.actions$.pipe(
    ofType(OffreVoyageLimitedActionTypes.LoadOffreVoyageLimitedByOffreVoyageIdsRequest),
    switchMap((action: LoadOffreVoyageLimitedByOffreVoyageIdsRequest) => {
      return this.offreVoyageLimitedService.findAllByOffreVoyageId(action.id, action.paginatorInformations, action.search).pipe(
        map(source => new LoadOffreVoyageLimitedsSuccess({paginatedResults: source})),
        catchError(error => of(new LoadOffreVoyageLimitedsFailed())));
    })
  );

  @Effect()
  loadOneOffreVoyageLimited$ = this.actions$.pipe(
    ofType(OffreVoyageLimitedActionTypes.LoadOneOffreVoyageLimitedRequest),
    switchMap((action: LoadOneOffreVoyageLimitedRequest) => {
      return this.offreVoyageLimitedService.findById(action.payload.id).pipe(
        map(source => new LoadOneOffreVoyageLimitedSuccess({offreVoyageLimited: source})),
        catchError(error => of(new LoadOneOffreVoyageLimitedFailed())));
    })
  );


}
