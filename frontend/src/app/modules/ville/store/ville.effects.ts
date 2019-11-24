import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';

import {catchError, concatMap, filter, map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';
import {
  VilleActionTypes,
  VilleActions,
  LoadVillesSuccess,
  LoadVillesFailed,
  LoadVillesIsNotLoadedRequest,
  SaveVilleRequest,
  SaveVilleSuccess,
  SaveVilleFailed,
  DeleteVilleRequest,
  DeleteVilleSuccess,
  DeleteVilleFailed,
  LoadOneVilleRequest,
  LoadOneVilleSuccess, LoadOneVilleFailed, UpdateVilleRequest, UpdateVilleSuccess, UpdateVilleFailed
} from './ville.actions';
import {Ville} from '../model/ville';
import {VilleService} from '../service/ville.service';
import {select, Store} from '@ngrx/store';
import {VilleState} from './ville.reducer';
import {
  selectVilleSearchAndisLoaded,
  selectVilleSearch
} from './ville.selectors';
import {PaginatorInformations} from '../../../shared_models/paginator-informations';


@Injectable()
export class VilleEffects {

  constructor(private actions$: Actions<VilleActions>,
              private villeService: VilleService,
              private villeState: Store<VilleState>) {
  }


  @Effect()
  deleteVille$ = this.actions$.pipe(
    ofType(VilleActionTypes.DeleteVilleRequest),
    switchMap((action: DeleteVilleRequest) => {
      return this.villeService.delete(action.payload.id).pipe(
        map(source => new DeleteVilleSuccess()),
        catchError(error => of(new DeleteVilleFailed())));
    })
  );
  @Effect()
  saveVille$ = this.actions$.pipe(
    ofType(VilleActionTypes.SaveVilleRequest),
    switchMap((action: SaveVilleRequest) => {
      return this.villeService.save(action.payload.ville).pipe(
        map(source => new SaveVilleSuccess({ville: source})),
        catchError(error => of(new SaveVilleFailed(error))));
    })
  );
  @Effect()
  updateVille$ = this.actions$.pipe(
    ofType(VilleActionTypes.UpdateVilleRequest),
    switchMap((action: UpdateVilleRequest) => {
      return this.villeService.update(action.payload.ville).pipe(
        map(source => new UpdateVilleSuccess({ville: source})),
        catchError(error => of(new UpdateVilleFailed())));
    })
  );

  @Effect()
  loadVilles$ = this.actions$.pipe(
    ofType(VilleActionTypes.LoadVillesRequest),
    switchMap((action: any) => {
      return this.villeService.findAll(action.search).pipe(
        map(source => new LoadVillesSuccess({ville: source})),
        catchError(error => of(new LoadVillesFailed())));
    })
  );
  @Effect()
  loadOneVille$ = this.actions$.pipe(
    ofType(VilleActionTypes.LoadOneVilleRequest),
    switchMap((action: LoadOneVilleRequest) => {
      return this.villeService.findById(action.payload.id).pipe(
        map(source => new LoadOneVilleSuccess({ville: source})),
        catchError(error => of(new LoadOneVilleFailed())));
    })
  );
  @Effect()
  loadVillesIsNotLoadedRequest$ = this.actions$.pipe(
    ofType(VilleActionTypes.LoadVillesIsNotLoadedRequest),
    withLatestFrom(this.villeState.pipe(select(selectVilleSearchAndisLoaded))),
    filter(([action, data]: [any, { search: string, isLoaded: boolean }]) => {
      return !data.isLoaded;
    }),
    switchMap(([action, data]: [any, { search: string }]) => {
      return this.villeService.findAll(data.search).pipe(
        map(source => new LoadVillesSuccess({ville: source})),
        catchError(error => of(new LoadVillesFailed())));
    })
  );


}
