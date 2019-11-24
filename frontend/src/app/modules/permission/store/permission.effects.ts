import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';

import {catchError, filter, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';
import {
  PermissionActionTypes,
  PermissionActions,
  LoadPermissionsSuccess,
  LoadPermissionsFailed,
  LoadOnePermissionRequest,
  LoadOnePermissionSuccess, LoadOnePermissionFailed,
} from './permission.actions';
import {PermissionService} from '../service/permission.service';
import {select, Store} from '@ngrx/store';
import {PermissionState} from './permission.reducer';
import {
  selectPermissionSearchAndisLoaded,
  selectPermissionSearch
} from './permission.selectors';
import {PaginatorInformations} from '../../../shared_models/paginator-informations';


@Injectable()
export class PermissionEffects {

  constructor(private actions$: Actions<PermissionActions>,
              private permissionService: PermissionService,
              private permissionState: Store<PermissionState>) {
  }

  @Effect()
  loadPermissions$ = this.actions$.pipe(
    ofType(PermissionActionTypes.LoadPermissionsRequest),
    switchMap((action: any) => {
      return this.permissionService.findAll(action.search).pipe(
        map(source => new LoadPermissionsSuccess({permission: source})),
        catchError(error => of(new LoadPermissionsFailed())));
    })
  );
  @Effect()
  loadOnePermission$ = this.actions$.pipe(
    ofType(PermissionActionTypes.LoadOnePermissionRequest),
    switchMap((action: LoadOnePermissionRequest) => {
      return this.permissionService.findById(action.payload.id).pipe(
        map(source => new LoadOnePermissionSuccess({permission: source})),
        catchError(error => of(new LoadOnePermissionFailed())));
    })
  );
  @Effect()
  loadPermissionsIsNotLoadedRequest$ = this.actions$.pipe(
    ofType(PermissionActionTypes.LoadPermissionsIsNotLoadedRequest),
    withLatestFrom(this.permissionState.pipe(select(selectPermissionSearchAndisLoaded))),
    filter(([action, data]: [any, { search: string, isLoaded: boolean }]) => {
      return !data.isLoaded;
    }),
    switchMap(([action, data]: [any, { search: string }]) => {
      return this.permissionService.findAll(data.search).pipe(
        map(source => new LoadPermissionsSuccess({permission: source})),
        catchError(error => of(new LoadPermissionsFailed())));
    })
  );


}
