import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';

import {catchError, concatMap, filter, map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';
import {
  TypeVehiculeActionTypes,
  TypeVehiculeActions,
  LoadTypeVehiculesSuccess,
  LoadTypeVehiculesFailed,
  LoadTypeVehiculesIsNotLoadedRequest,
  SaveTypeVehiculeRequest,
  SaveTypeVehiculeSuccess,
  SaveTypeVehiculeFailed,
  DeleteTypeVehiculeRequest,
  DeleteTypeVehiculeSuccess,
  DeleteTypeVehiculeFailed,
  LoadOneTypeVehiculeRequest,
  LoadOneTypeVehiculeSuccess, LoadOneTypeVehiculeFailed, UpdateTypeVehiculeRequest, UpdateTypeVehiculeSuccess, UpdateTypeVehiculeFailed
} from './type-vehicule.actions';
import {TypeVehicule} from '../model/type-vehicule';
import {TypeVehiculeService} from '../service/type-vehicule.service';
import {select, Store} from '@ngrx/store';
import {TypeVehiculeState} from './type-vehicule.reducer';
import {
  selectTypeVehiculeSearchAndisLoaded,
  selectTypeVehiculeSearch
} from './type-vehicule.selectors';
import {PaginatorInformations} from '../../../shared_models/paginator-informations';


@Injectable()
export class TypeVehiculeEffects {

  constructor(private actions$: Actions<TypeVehiculeActions>,
              private typeVehiculeService: TypeVehiculeService,
              private typeVehiculeState: Store<TypeVehiculeState>) {
  }


  @Effect()
  deleteTypeVehicule$ = this.actions$.pipe(
    ofType(TypeVehiculeActionTypes.DeleteTypeVehiculeRequest),
    switchMap((action: DeleteTypeVehiculeRequest) => {
      return this.typeVehiculeService.delete(action.payload.id).pipe(map(source => new DeleteTypeVehiculeSuccess()),
        catchError(error => of(new DeleteTypeVehiculeFailed())));
    })
  );
  @Effect()
  saveTypeVehicule$ = this.actions$.pipe(
    ofType(TypeVehiculeActionTypes.SaveTypeVehiculeRequest),
    switchMap((action: SaveTypeVehiculeRequest) => {
      return this.typeVehiculeService.save(action.payload.typeVehicule).pipe(map(source => new SaveTypeVehiculeSuccess({typeVehicule: source})),
        catchError(error => of(new SaveTypeVehiculeFailed())));
    })
  );
  @Effect()
  updateTypeVehicule$ = this.actions$.pipe(
    ofType(TypeVehiculeActionTypes.UpdateTypeVehiculeRequest),
    switchMap((action: UpdateTypeVehiculeRequest) => {
      return this.typeVehiculeService.update(action.payload.typeVehicule).pipe(map(source => new UpdateTypeVehiculeSuccess({typeVehicule: source})),
        catchError(error => of(new UpdateTypeVehiculeFailed())));
    })
  );

  @Effect()
  loadTypeVehicules$ = this.actions$.pipe(
    ofType(TypeVehiculeActionTypes.LoadTypeVehiculesRequest),
    switchMap((action: any) => {
      return this.typeVehiculeService.findAll(action.search).pipe(map(source => new LoadTypeVehiculesSuccess({typeVehicule: source})),
        catchError(error => of(new LoadTypeVehiculesFailed())));
    })
  );
  @Effect()
  loadOneTypeVehicule$ = this.actions$.pipe(
    ofType(TypeVehiculeActionTypes.LoadOneTypeVehiculeRequest),
    switchMap((action: LoadOneTypeVehiculeRequest) => {
      return this.typeVehiculeService.findById(action.payload.id).pipe(map(source => new LoadOneTypeVehiculeSuccess({typeVehicule: source})),
        catchError(error => of(new LoadOneTypeVehiculeFailed())));
    })
  );
  @Effect()
  loadTypeVehiculesIsNotLoadedRequest$ = this.actions$.pipe(
    ofType(TypeVehiculeActionTypes.LoadTypeVehiculesIsNotLoadedRequest),
    withLatestFrom(this.typeVehiculeState.pipe(select(selectTypeVehiculeSearchAndisLoaded))),
    filter(([action, data]: [any, { search: string, isLoaded: boolean }]) => {
      return !data.isLoaded;
    }),
    switchMap(([action, data]: [any, { search: string }]) => {
      return this.typeVehiculeService.findAll(data.search).pipe(map(source => new LoadTypeVehiculesSuccess({typeVehicule: source})),
        catchError(error => of(new LoadTypeVehiculesFailed())));
    })
  );


}
