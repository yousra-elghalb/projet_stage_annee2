import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';

import {catchError, concatMap, filter, map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';
import {
  ModaliteActionTypes,
  ModaliteActions,
  LoadModalitesSuccess,
  LoadModalitesFailed,
  LoadModalitesIsNotLoadedRequest,
  SaveModaliteRequest,
  SaveModaliteSuccess,
  SaveModaliteFailed,
  DeleteModaliteRequest,
  DeleteModaliteSuccess,
  DeleteModaliteFailed,
  LoadOneModaliteRequest,
  LoadOneModaliteSuccess, LoadOneModaliteFailed, UpdateModaliteRequest, UpdateModaliteSuccess, UpdateModaliteFailed
} from './modalite.actions';
import {Modalite} from '../model/modalite';
import {ModaliteService} from '../service/modalite.service';
import {select, Store} from '@ngrx/store';
import {ModaliteState} from './modalite.reducer';
import {
  selectModalitePaginatorInformations,
  selectModalitePaginatorInformationsAndSearchAndisLoaded,
  selectModaliteSearch
} from './modalite.selectors';
import {PaginatorInformations} from '../../../shared_models/paginator-informations';


@Injectable()
export class ModaliteEffects {

  constructor(private actions$: Actions<ModaliteActions>,
              private modaliteService: ModaliteService,
              private modaliteState: Store<ModaliteState>) {
  }


  @Effect()
  deleteModalite$ = this.actions$.pipe(
    ofType(ModaliteActionTypes.DeleteModaliteRequest),
    switchMap((action: DeleteModaliteRequest) => {
      return this.modaliteService.delete(action.payload.id).pipe(
        map(source => new DeleteModaliteSuccess()),
        catchError(error => of(new DeleteModaliteFailed())));
    })
  );
  @Effect()
  saveModalite$ = this.actions$.pipe(
    ofType(ModaliteActionTypes.SaveModaliteRequest),
    switchMap((action: SaveModaliteRequest) => {
      return this.modaliteService.save(action.payload.modalite).pipe(
        map(source => new SaveModaliteSuccess({modalite: source})),
        catchError(error => of(new SaveModaliteFailed())));
    })
  );
  @Effect()
  updateModalite$ = this.actions$.pipe(
    ofType(ModaliteActionTypes.UpdateModaliteRequest),
    switchMap((action: UpdateModaliteRequest) => {
      return this.modaliteService.update(action.payload.modalite).pipe(
        map(source => new UpdateModaliteSuccess({modalite: source})),
        catchError(error => of(new UpdateModaliteFailed())));
    })
  );

  @Effect()
  loadModalites$ = this.actions$.pipe(
    ofType(ModaliteActionTypes.LoadModalitesRequest),
    switchMap((action: any) => {
      return this.modaliteService.findAll(action.paginatorInformations, action.search).pipe(
        map(source => new LoadModalitesSuccess({paginatedResults: source})),
        catchError(error => of(new LoadModalitesFailed())));
    })
  );
  @Effect()
  loadOneModalite$ = this.actions$.pipe(
    ofType(ModaliteActionTypes.LoadOneModaliteRequest),
    switchMap((action: LoadOneModaliteRequest) => {
      return this.modaliteService.findById(action.payload.id).pipe(
        map(source => new LoadOneModaliteSuccess({modalite: source})),
        catchError(error => of(new LoadOneModaliteFailed())));
    })
  );
  @Effect()
  loadModalitesIsNotLoadedRequest$ = this.actions$.pipe(
    ofType(ModaliteActionTypes.LoadModalitesIsNotLoadedRequest),
    withLatestFrom(this.modaliteState.pipe(select(selectModalitePaginatorInformationsAndSearchAndisLoaded))),
    filter(([action, data]: [any, { paginatorInformations: PaginatorInformations, search: string, isLoaded: boolean }]) => {
      return !data.isLoaded;
    }),
    switchMap(([action, data]: [any, { paginatorInformations: PaginatorInformations, search: string }]) => {
      return this.modaliteService.findAll(data.paginatorInformations, data.search).pipe(
        map(source => new LoadModalitesSuccess({paginatedResults: source})),
        catchError(error => of(new LoadModalitesFailed())));
    })
  );


}
