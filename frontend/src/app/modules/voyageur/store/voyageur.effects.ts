import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';

import {catchError, concatMap, filter, map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';
import {
  VoyageurActionTypes,
  VoyageurActions,
  LoadVoyageursSuccess,
  LoadVoyageursFailed,
  LoadVoyageursIsNotLoadedRequest,
  SaveVoyageurRequest,
  SaveVoyageurSuccess,
  SaveVoyageurFailed,
  DeleteVoyageurRequest,
  DeleteVoyageurSuccess,
  DeleteVoyageurFailed,
  LoadOneVoyageurRequest,
  LoadOneVoyageurSuccess, LoadOneVoyageurFailed, UpdateVoyageurRequest, UpdateVoyageurSuccess, UpdateVoyageurFailed, LoadVoyageursRequest
} from './voyageur.actions';
import {Voyageur} from '../model/voyageur';
import {VoyageurService} from '../service/voyageur.service';
import {select, Store} from '@ngrx/store';
import {VoyageurState} from './voyageur.reducer';
import {
  selectVoyageurPaginatorInformations,
  selectVoyageurPaginatorInformationsAndSearchAndisLoaded,
  selectVoyageurSearch
} from './voyageur.selectors';
import {PaginatorInformations} from '../../../shared_models/paginator-informations';


@Injectable()
export class VoyageurEffects {

  constructor(private actions$: Actions<VoyageurActions>,
              private voyageurService: VoyageurService,
              private voyageurState: Store<VoyageurState>) {
  }

  // @Effect()
  // LoadVoyageursFailed$ = createEffect(() =>
  //     this.actions$.pipe(ofType(VoyageurActionTypes.LoadVoyageursFailed),
  //       tap(action => console.log(action, 'HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH'))),
  //   {dispatch: false});

  @Effect()
  deleteVoyageur$ = this.actions$.pipe(
    ofType(VoyageurActionTypes.DeleteVoyageurRequest),
    switchMap((action: DeleteVoyageurRequest) => {
      return this.voyageurService.delete(action.payload.id).pipe(
        map(source => new DeleteVoyageurSuccess()),
        catchError(error => of(new DeleteVoyageurFailed())));
    })
  );
  @Effect()
  saveVoyageur$ = this.actions$.pipe(
    ofType(VoyageurActionTypes.SaveVoyageurRequest),
    switchMap((action: SaveVoyageurRequest) => {
      return this.voyageurService.save(action.payload.voyageur).pipe(
        map(source => new SaveVoyageurSuccess({voyageur: source})),
        catchError(error => of(new SaveVoyageurFailed(error))));
    })
  );
  @Effect()
  updateVoyageur$ = this.actions$.pipe(
    ofType(VoyageurActionTypes.UpdateVoyageurRequest),
    switchMap((action: UpdateVoyageurRequest) => {
      return this.voyageurService.update(action.payload.voyageur).pipe(
        map(source => new UpdateVoyageurSuccess({voyageur: source})),
        catchError(error => of(new UpdateVoyageurFailed())));
    })
  );

  @Effect()
  loadVoyageurs$ = this.actions$.pipe(
    ofType(VoyageurActionTypes.LoadVoyageursRequest),
    switchMap((action: LoadVoyageursRequest) => {
      return this.voyageurService.findAll(action.paginatorInformations, action.search, action.fidele, action.black).pipe(
        map(source => new LoadVoyageursSuccess({fidele: action.fidele, paginatedResults: source})),
        catchError(error => of(new LoadVoyageursFailed())));
    })
  );
  @Effect()
  loadOneVoyageur$ = this.actions$.pipe(
    ofType(VoyageurActionTypes.LoadOneVoyageurRequest),
    switchMap((action: LoadOneVoyageurRequest) => {
      return this.voyageurService.findById(action.payload.id).pipe(
        map(source => new LoadOneVoyageurSuccess({voyageur: source})),
        catchError(error => of(new LoadOneVoyageurFailed())));
    })
  );
  /*
    @Effect()
    loadVoyageursIsNotLoadedRequest$ = this.actions$.pipe(
      ofType(VoyageurActionTypes.LoadVoyageursIsNotLoadedRequest),
      withLatestFrom(this.voyageurState.pipe(select(selectVoyageurPaginatorInformationsAndSearchAndisLoaded))),
      filter(([action, data]: [any, { paginatorInformations: PaginatorInformations, search: string, isLoaded: boolean }]) => {
        return !data.isLoaded;
      }),
      switchMap(([action, data]: [any, { paginatorInformations: PaginatorInformations, search: string }]) => {
        return this.voyageurService.findAll(data.paginatorInformations, data.search, vfidele).pipe(
          map(source => new LoadVoyageursSuccess({paginatedResults: source})),
          catchError(error => of(new LoadVoyageursFailed())));
      })
    );
  */


}
