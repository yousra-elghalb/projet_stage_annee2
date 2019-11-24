import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';

import {catchError, concatMap, filter, map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';
import {
  GroupeConventionActionTypes,
  GroupeConventionActions,
  LoadGroupeConventionsSuccess,
  LoadGroupeConventionsFailed,
  SaveGroupeConventionRequest,
  SaveGroupeConventionSuccess,
  SaveGroupeConventionFailed,
  DeleteGroupeConventionRequest,
  DeleteGroupeConventionSuccess,
  DeleteGroupeConventionFailed,
  LoadOneGroupeConventionRequest,
  LoadOneGroupeConventionSuccess,
  LoadOneGroupeConventionFailed,
  UpdateGroupeConventionRequest, UpdateGroupeConventionSuccess, UpdateGroupeConventionFailed, LoadGroupeConventionsRequest
} from './groupe-convention.actions';
import {GroupeConvention} from '../model/groupe-convention';
import {GroupeConventionService} from '../service/groupe-convention.service';
import {select, Store} from '@ngrx/store';
import {GroupeConventionState} from './groupe-convention.reducer';
import {
  selectGroupeConventionPaginatorInformations,
  selectGroupeConventionPaginatorInformationsAndSearchAndisLoaded,
  selectGroupeConventionSearch
} from './groupe-convention.selectors';
import {PaginatorInformations} from '../../../shared_models/paginator-informations';


@Injectable()
export class GroupeConventionEffects {

  constructor(private actions$: Actions<GroupeConventionActions>,
              private groupeConventionService: GroupeConventionService,
              private groupeConventionState: Store<GroupeConventionState>) {
  }

  // @Effect()
  // LoadGroupeConventionsFailed$ = createEffect(() =>
  //     this.actions$.pipe(ofType(GroupeConventionActionTypes.LoadGroupeConventionsFailed),
  //       tap(action => console.log(action, 'HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH'))),
  //   {dispatch: false});

  @Effect()
  deleteGroupeConvention$ = this.actions$.pipe(
    ofType(GroupeConventionActionTypes.DeleteGroupeConventionRequest),
    switchMap((action: DeleteGroupeConventionRequest) => {
      return this.groupeConventionService.delete(action.payload.id).pipe(
        map(source => new DeleteGroupeConventionSuccess()),
        catchError(error => of(new DeleteGroupeConventionFailed())));
    })
  );
  @Effect()
  saveGroupeConvention$ = this.actions$.pipe(
    ofType(GroupeConventionActionTypes.SaveGroupeConventionRequest),
    switchMap((action: SaveGroupeConventionRequest) => {
      return this.groupeConventionService.save(action.payload.groupeConvention).pipe(
        map(source => new SaveGroupeConventionSuccess({groupeConvention: source})),
        catchError(error => of(new SaveGroupeConventionFailed(error))));
    })
  );
  @Effect()
  updateGroupeConvention$ = this.actions$.pipe(
    ofType(GroupeConventionActionTypes.UpdateGroupeConventionRequest),
    switchMap((action: UpdateGroupeConventionRequest) => {
      return this.groupeConventionService.update(action.payload.groupeConvention).pipe(
        map(source => new UpdateGroupeConventionSuccess({groupeConvention: source})),
        catchError(error => of(new UpdateGroupeConventionFailed())));
    })
  );

  @Effect()
  loadGroupeConventions$ = this.actions$.pipe(
    ofType(GroupeConventionActionTypes.LoadGroupeConventionsRequest),
    switchMap((action: LoadGroupeConventionsRequest) => {
      return this.groupeConventionService.findAll(action.paginatorInformations, action.search, action.typeGroupe).pipe(
        map(source => new LoadGroupeConventionsSuccess({paginatedResults: source})),
        catchError(error => of(new LoadGroupeConventionsFailed())));
    })
  );
  @Effect()
  loadOneGroupeConvention$ = this.actions$.pipe(
    ofType(GroupeConventionActionTypes.LoadOneGroupeConventionRequest),
    switchMap((action: LoadOneGroupeConventionRequest) => {
      return this.groupeConventionService.findById(action.payload.id).pipe(
        map(source => new LoadOneGroupeConventionSuccess({groupeConvention: source})),
        catchError(error => of(new LoadOneGroupeConventionFailed())));
    })
  );
  @Effect()
  loadGroupeConventionsIsNotLoadedRequest$ = this.actions$.pipe(
    ofType(GroupeConventionActionTypes.LoadGroupeConventionsIsNotLoadedRequest),
    withLatestFrom(this.groupeConventionState.pipe(select(selectGroupeConventionPaginatorInformationsAndSearchAndisLoaded))),
    filter(([action, data]: [any, { paginatorInformations: PaginatorInformations, search: string, isLoaded: boolean }]) => {
      return !data.isLoaded;
    }),
    switchMap(([action, data]: [any, { paginatorInformations: PaginatorInformations, search: string }]) => {
      return this.groupeConventionService.findAll(data.paginatorInformations, data.search, '').pipe(
        map(source => new LoadGroupeConventionsSuccess({paginatedResults: source})),
        catchError(error => of(new LoadGroupeConventionsFailed())));
    })
  );


}
