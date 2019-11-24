import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';

import {catchError, concatMap, filter, map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';
import {
  VehiculeActionTypes,
  VehiculeActions,
  LoadVehiculesSuccess,
  LoadVehiculesFailed,
  LoadVehiculesIsNotLoadedRequest,
  SaveVehiculeRequest,
  SaveVehiculeSuccess,
  SaveVehiculeFailed,
  DeleteVehiculeRequest,
  DeleteVehiculeSuccess,
  DeleteVehiculeFailed,
  LoadOneVehiculeRequest,
  LoadOneVehiculeSuccess, LoadOneVehiculeFailed, UpdateVehiculeRequest, UpdateVehiculeSuccess, UpdateVehiculeFailed
} from './vehicule.actions';
import {Vehicule} from '../model/vehicule';
import {VehiculeService} from '../service/vehicule.service';
import {select, Store} from '@ngrx/store';
import {VehiculeState} from './vehicule.reducer';
import {
  selectVehiculeSearchAndisLoaded,
  selectVehiculeSearch
} from './vehicule.selectors';
import {PaginatorInformations} from '../../../shared_models/paginator-informations';


@Injectable()
export class VehiculeEffects {

  constructor(private actions$: Actions<VehiculeActions>,
              private vehiculeService: VehiculeService,
              private vehiculeState: Store<VehiculeState>) {
  }


  @Effect()
  deleteVehicule$ = this.actions$.pipe(
    ofType(VehiculeActionTypes.DeleteVehiculeRequest),
    switchMap((action: DeleteVehiculeRequest) => {
      return this.vehiculeService.delete(action.payload.id).pipe(map(source => new DeleteVehiculeSuccess()),
        catchError(error => of(new DeleteVehiculeFailed())));
    })
  );
  @Effect()
  saveVehicule$ = this.actions$.pipe(
    ofType(VehiculeActionTypes.SaveVehiculeRequest),
    switchMap((action: SaveVehiculeRequest) => {
      return this.vehiculeService.save(action.payload.vehicule).pipe(map(source => new SaveVehiculeSuccess({vehicule: source})),
        catchError(error => of(new SaveVehiculeFailed())));
    })
  );
  @Effect()
  updateVehicule$ = this.actions$.pipe(
    ofType(VehiculeActionTypes.UpdateVehiculeRequest),
    switchMap((action: UpdateVehiculeRequest) => {
      return this.vehiculeService.update(action.payload.vehicule).pipe(map(source => new UpdateVehiculeSuccess({vehicule: source})),
        catchError(error => of(new UpdateVehiculeFailed())));
    })
  );

  @Effect()
  loadVehicules$ = this.actions$.pipe(
    ofType(VehiculeActionTypes.LoadVehiculesRequest),
    switchMap((action: any) => {
      return this.vehiculeService.findAll(action.search).pipe(map(source => new LoadVehiculesSuccess({vehicule: source})),
        catchError(error => of(new LoadVehiculesFailed())));
    })
  );
  @Effect()
  loadOneVehicule$ = this.actions$.pipe(
    ofType(VehiculeActionTypes.LoadOneVehiculeRequest),
    switchMap((action: LoadOneVehiculeRequest) => {
      return this.vehiculeService.findById(action.payload.id).pipe(map(source => new LoadOneVehiculeSuccess({vehicule: source})),
        catchError(error => of(new LoadOneVehiculeFailed())));
    })
  );
  @Effect()
  loadVehiculesIsNotLoadedRequest$ = this.actions$.pipe(
    ofType(VehiculeActionTypes.LoadVehiculesIsNotLoadedRequest),
    withLatestFrom(this.vehiculeState.pipe(select(selectVehiculeSearchAndisLoaded))),
    filter(([action, data]: [any, { search: string, isLoaded: boolean }]) => {
      return !data.isLoaded;
    }),
    switchMap(([action, data]: [any, { search: string }]) => {
      return this.vehiculeService.findAll(data.search).pipe(map(source => new LoadVehiculesSuccess({vehicule: source})),
        catchError(error => of(new LoadVehiculesFailed())));
    })
  );


}
