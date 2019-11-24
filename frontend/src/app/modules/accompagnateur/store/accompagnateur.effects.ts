import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';

import {catchError, concatMap, filter, map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';
import {
  AccompagnateurActionTypes,
  AccompagnateurActions,
  LoadAccompagnateursSuccess,
  LoadAccompagnateursFailed,
  LoadAccompagnateursIsNotLoadedRequest,
  SaveAccompagnateurRequest,
  SaveAccompagnateurSuccess,
  SaveAccompagnateurFailed,
  DeleteAccompagnateurRequest,
  DeleteAccompagnateurSuccess,
  DeleteAccompagnateurFailed,
  LoadOneAccompagnateurRequest,
  LoadOneAccompagnateurSuccess,
  LoadOneAccompagnateurFailed,
  UpdateAccompagnateurRequest,
  UpdateAccompagnateurSuccess,
  UpdateAccompagnateurFailed
} from './accompagnateur.actions';
import {Accompagnateur} from '../model/accompagnateur';
import {AccompagnateurService} from '../service/accompagnateur.service';
import {select, Store} from '@ngrx/store';
import {AccompagnateurState} from './accompagnateur.reducer';
import {
  selectAccompagnateurSearchAndisLoaded,
  selectAccompagnateurSearch
} from './accompagnateur.selectors';
import {PaginatorInformations} from '../../../shared_models/paginator-informations';


@Injectable()
export class AccompagnateurEffects {

  constructor(private actions$: Actions<AccompagnateurActions>,
              private accompagnateurService: AccompagnateurService,
              private accompagnateurState: Store<AccompagnateurState>) {
  }


  @Effect()
  deleteAccompagnateur$ = this.actions$.pipe(
    ofType(AccompagnateurActionTypes.DeleteAccompagnateurRequest),
    switchMap((action: DeleteAccompagnateurRequest) => {
      return this.accompagnateurService.delete(action.payload.id).pipe(map(source => new DeleteAccompagnateurSuccess()),
        catchError(error => of(new DeleteAccompagnateurFailed())));
    })
  );
  @Effect()
  saveAccompagnateur$ = this.actions$.pipe(
    ofType(AccompagnateurActionTypes.SaveAccompagnateurRequest),
    switchMap((action: SaveAccompagnateurRequest) => {
      return this.accompagnateurService.save(action.payload.accompagnateur)
        .pipe(map(source => new SaveAccompagnateurSuccess({accompagnateur: source})),
          catchError(error => of(new SaveAccompagnateurFailed())));
    })
  );
  @Effect()
  updateAccompagnateur$ = this.actions$.pipe(
    ofType(AccompagnateurActionTypes.UpdateAccompagnateurRequest),
    switchMap((action: UpdateAccompagnateurRequest) => {
      return this.accompagnateurService.update(action.payload.accompagnateur).pipe(
        map(source => {
          return new UpdateAccompagnateurSuccess({accompagnateur: source});
        }),
        catchError(error => of(new UpdateAccompagnateurFailed())));
    })
  );

  @Effect()
  loadAccompagnateurs$ = this.actions$.pipe(
    ofType(AccompagnateurActionTypes.LoadAccompagnateursRequest),
    switchMap((action: any) => {
      return this.accompagnateurService.findAll(action.search).pipe(
        map(source => new LoadAccompagnateursSuccess({accompagnateur: source})),
        catchError(error => of(new LoadAccompagnateursFailed())));
    })
  );
  @Effect()
  loadOneAccompagnateur$ = this.actions$.pipe(
    ofType(AccompagnateurActionTypes.LoadOneAccompagnateurRequest),
    switchMap((action: LoadOneAccompagnateurRequest) => {
      return this.accompagnateurService.findById(action.payload.id).pipe(
        map(source => new LoadOneAccompagnateurSuccess({accompagnateur: source})),
        catchError(error => of(new LoadOneAccompagnateurFailed())));
    })
  );
  @Effect()
  loadAccompagnateursIsNotLoadedRequest$ = this.actions$.pipe(
    ofType(AccompagnateurActionTypes.LoadAccompagnateursIsNotLoadedRequest),
    withLatestFrom(this.accompagnateurState.pipe(select(selectAccompagnateurSearchAndisLoaded))),
    filter(([action, data]: [any, { search: string, isLoaded: boolean }]) => {
      return !data.isLoaded;
    }),
    switchMap(([action, data]: [any, { search: string }]) => {
      return this.accompagnateurService.findAll(data.search).pipe(
        map(source => new LoadAccompagnateursSuccess({accompagnateur: source})),
        catchError(error => of(new LoadAccompagnateursFailed())));
    })
  );


}
