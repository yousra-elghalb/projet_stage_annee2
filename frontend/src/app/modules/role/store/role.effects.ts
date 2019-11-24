import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';

import {catchError, concatMap, filter, map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';
import {
  RoleActionTypes,
  RoleActions,
  LoadRolesSuccess,
  LoadRolesFailed,
  LoadRolesIsNotLoadedRequest,
  SaveRoleRequest,
  SaveRoleSuccess,
  SaveRoleFailed,
  DeleteRoleRequest,
  DeleteRoleSuccess,
  DeleteRoleFailed,
  LoadOneRoleRequest,
  LoadOneRoleSuccess, LoadOneRoleFailed, UpdateRoleRequest, UpdateRoleSuccess, UpdateRoleFailed
} from './role.actions';
import {Role} from '../model/role';
import {RoleService} from '../service/role.service';
import {select, Store} from '@ngrx/store';
import {RoleState} from './role.reducer';
import {
  selectRolePaginatorInformations,
  selectRolePaginatorInformationsAndSearchAndisLoaded,
  selectRoleSearch
} from './role.selectors';
import {PaginatorInformations} from '../../../shared_models/paginator-informations';


@Injectable()
export class RoleEffects {

  constructor(private actions$: Actions<RoleActions>,
              private roleService: RoleService,
              private roleState: Store<RoleState>) {
  }

  // @Effect()
  // LoadRolesFailed$ = createEffect(() =>
  //     this.actions$.pipe(ofType(RoleActionTypes.LoadRolesFailed),
  //       tap(action => console.log(action, 'HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH'))),
  //   {dispatch: false});

  @Effect()
  deleteRole$ = this.actions$.pipe(
    ofType(RoleActionTypes.DeleteRoleRequest),
    switchMap((action: DeleteRoleRequest) => {
      return this.roleService.delete(action.payload.id).pipe(
        map(source => new DeleteRoleSuccess()),
        catchError(error => of(new DeleteRoleFailed())));
    })
  );
  @Effect()
  saveRole$ = this.actions$.pipe(
    ofType(RoleActionTypes.SaveRoleRequest),
    switchMap((action: SaveRoleRequest) => {
      return this.roleService.save(action.payload.role).pipe(
        map(source => new SaveRoleSuccess({role: source})),
        catchError(error => of(new SaveRoleFailed(error))));
    })
  );
  @Effect()
  updateRole$ = this.actions$.pipe(
    ofType(RoleActionTypes.UpdateRoleRequest),
    switchMap((action: UpdateRoleRequest) => {
      return this.roleService.update(action.payload.role).pipe(
        map(source => new UpdateRoleSuccess({role: source})),
        catchError(error => of(new UpdateRoleFailed())));
    })
  );

  @Effect()
  loadRoles$ = this.actions$.pipe(
    ofType(RoleActionTypes.LoadRolesRequest),
    switchMap((action: any) => {
      return this.roleService.findAll(action.paginatorInformations, action.search).pipe(
        map(source => new LoadRolesSuccess({paginatedResults: source})),
        catchError(error => of(new LoadRolesFailed())));
    })
  );
  @Effect()
  loadOneRole$ = this.actions$.pipe(
    ofType(RoleActionTypes.LoadOneRoleRequest),
    switchMap((action: LoadOneRoleRequest) => {
      return this.roleService.findById(action.payload.id).pipe(
        map(source => new LoadOneRoleSuccess({role: source})),
        catchError(error => of(new LoadOneRoleFailed())));
    })
  );
  @Effect()
  loadRolesIsNotLoadedRequest$ = this.actions$.pipe(
    ofType(RoleActionTypes.LoadRolesIsNotLoadedRequest),
    withLatestFrom(this.roleState.pipe(select(selectRolePaginatorInformationsAndSearchAndisLoaded))),
    filter(([action, data]: [any, { paginatorInformations: PaginatorInformations, search: string, isLoaded: boolean }]) => {
      return !data.isLoaded;
    }),
    switchMap(([action, data]: [any, { paginatorInformations: PaginatorInformations, search: string }]) => {
      return this.roleService.findAll(data.paginatorInformations, data.search).pipe(
        map(source => new LoadRolesSuccess({paginatedResults: source})),
        catchError(error => of(new LoadRolesFailed())));
    })
  );


}
