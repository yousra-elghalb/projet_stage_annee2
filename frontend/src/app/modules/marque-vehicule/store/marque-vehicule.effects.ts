import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';

import {catchError, concatMap, filter, map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';
import {
  MarqueVehiculeActionMarques,
  MarqueVehiculeActions,
  LoadMarqueVehiculesSuccess,
  LoadMarqueVehiculesFailed,
  LoadMarqueVehiculesIsNotLoadedRequest,
  SaveMarqueVehiculeRequest,
  SaveMarqueVehiculeSuccess,
  SaveMarqueVehiculeFailed,
  DeleteMarqueVehiculeRequest,
  DeleteMarqueVehiculeSuccess,
  DeleteMarqueVehiculeFailed,
  LoadOneMarqueVehiculeRequest,
  LoadOneMarqueVehiculeSuccess,
  LoadOneMarqueVehiculeFailed,
  UpdateMarqueVehiculeRequest,
  UpdateMarqueVehiculeSuccess,
  UpdateMarqueVehiculeFailed
} from './marque-vehicule.actions';
import {MarqueVehicule} from '../model/marque-vehicule';
import {MarqueVehiculeService} from '../service/marque-vehicule.service';
import {select, Store} from '@ngrx/store';
import {MarqueVehiculeState} from './marque-vehicule.reducer';
import {
  selectMarqueVehiculeSearchAndisLoaded,
  selectMarqueVehiculeSearch
} from './marque-vehicule.selectors';
import {PaginatorInformations} from '../../../shared_models/paginator-informations';


@Injectable()
export class MarqueVehiculeEffects {

  constructor(private actions$: Actions<MarqueVehiculeActions>,
              private marqueVehiculeService: MarqueVehiculeService,
              private marqueVehiculeState: Store<MarqueVehiculeState>) {
  }


  @Effect()
  deleteMarqueVehicule$ = this.actions$.pipe(
    ofType(MarqueVehiculeActionMarques.DeleteMarqueVehiculeRequest),
    switchMap((action: DeleteMarqueVehiculeRequest) => {
      return this.marqueVehiculeService.delete(action.payload.id).pipe(map(source => new DeleteMarqueVehiculeSuccess()),
        catchError(error => of(new DeleteMarqueVehiculeFailed())));
    })
  );
  @Effect()
  saveMarqueVehicule$ = this.actions$.pipe(
    ofType(MarqueVehiculeActionMarques.SaveMarqueVehiculeRequest),
    switchMap((action: SaveMarqueVehiculeRequest) => {
      return this.marqueVehiculeService.save(action.payload.marqueVehicule)
        .pipe(map(source => new SaveMarqueVehiculeSuccess({marqueVehicule: source})),
          catchError(error => of(new SaveMarqueVehiculeFailed())));
    })
  );
  @Effect()
  updateMarqueVehicule$ = this.actions$.pipe(
    ofType(MarqueVehiculeActionMarques.UpdateMarqueVehiculeRequest),
    switchMap((action: UpdateMarqueVehiculeRequest) => {
      return this.marqueVehiculeService.update(action.payload.marqueVehicule)
        .pipe(map(source => new UpdateMarqueVehiculeSuccess({marqueVehicule: source})),
          catchError(error => of(new UpdateMarqueVehiculeFailed())));
    })
  );

  @Effect()
  loadMarqueVehicules$ = this.actions$.pipe(
    ofType(MarqueVehiculeActionMarques.LoadMarqueVehiculesRequest),
    switchMap((action: any) => {
      return this.marqueVehiculeService.findAll(action.search).pipe(map(source => new LoadMarqueVehiculesSuccess({marqueVehicule: source})),
        catchError(error => of(new LoadMarqueVehiculesFailed())));
    })
  );
  @Effect()
  loadOneMarqueVehicule$ = this.actions$.pipe(
    ofType(MarqueVehiculeActionMarques.LoadOneMarqueVehiculeRequest),
    switchMap((action: LoadOneMarqueVehiculeRequest) => {
      return this.marqueVehiculeService.findById(action.payload.id)
        .pipe(map(source => new LoadOneMarqueVehiculeSuccess({marqueVehicule: source})),
          catchError(error => of(new LoadOneMarqueVehiculeFailed())));
    })
  );
  @Effect()
  loadMarqueVehiculesIsNotLoadedRequest$ = this.actions$.pipe(
    ofType(MarqueVehiculeActionMarques.LoadMarqueVehiculesIsNotLoadedRequest),
    withLatestFrom(this.marqueVehiculeState.pipe(select(selectMarqueVehiculeSearchAndisLoaded))),
    filter(([action, data]: [any, { search: string, isLoaded: boolean }]) => {
      return !data.isLoaded;
    }),
    switchMap(([action, data]: [any, { search: string }]) => {
      return this.marqueVehiculeService.findAll(data.search).pipe(map(source => new LoadMarqueVehiculesSuccess({marqueVehicule: source})),
        catchError(error => of(new LoadMarqueVehiculesFailed())));
    })
  );


}
