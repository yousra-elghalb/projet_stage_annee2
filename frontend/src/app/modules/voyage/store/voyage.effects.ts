import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';

import {catchError, concatMap, filter, map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';
import {
  VoyageActionTypes,
  VoyageActions,
  LoadVoyagesSuccess,
  LoadVoyagesFailed,
  LoadVoyagesIsNotLoadedRequest,
  SaveVoyageRequest,
  SaveVoyageSuccess,
  SaveVoyageFailed,
  DeleteVoyageRequest,
  DeleteVoyageSuccess,
  DeleteVoyageFailed,
  LoadOneVoyageRequest,
  LoadOneVoyageSuccess,
  LoadOneVoyageFailed,
  UpdateVoyageRequest,
  UpdateVoyageSuccess,
  UpdateVoyageFailed
} from './voyage.actions';
import {Voyage} from '../model/voyage';
import {VoyageService} from '../service/voyage.service';
import {select, Store} from '@ngrx/store';
import {VoyageState} from './voyage.reducer';
import {
  selectVoyageSearchAndPaginatorInformationsAndisLoaded,
  selectVoyageSearch
} from './voyage.selectors';
import {PaginatorInformations} from '../../../shared_models/paginator-informations';
import {ChangeOffreVoyagesIsLoaded} from '../../offre-voyage/store/offre-voyage.actions';


@Injectable()
export class VoyageEffects {

  constructor(private actions$: Actions<VoyageActions>,
              private voyageService: VoyageService,
              private voyageState: Store<VoyageState>) {
  }


  @Effect()
  deleteVoyage$ = this.actions$.pipe(
    ofType(VoyageActionTypes.DeleteVoyageRequest),
    switchMap((action: DeleteVoyageRequest) => {
      return this.voyageService.delete(action.payload.id).pipe(map(source => new DeleteVoyageSuccess()),
        catchError(error => of(new DeleteVoyageFailed())));
    })
  );
  @Effect()
  saveVoyage$ = this.actions$.pipe(
    ofType(VoyageActionTypes.SaveVoyageRequest),
    switchMap((action: SaveVoyageRequest) => {
      return this.voyageService.save(action.payload.voyage)
        .pipe(map(source => {
            this.voyageState.dispatch(new ChangeOffreVoyagesIsLoaded({isLoaded: false}));
            return new SaveVoyageSuccess({voyage: source});
          }),
          catchError(error => of(new SaveVoyageFailed())));
    })
  );
  @Effect()
  updateVoyage$ = this.actions$.pipe(
    ofType(VoyageActionTypes.UpdateVoyageRequest),
    switchMap((action: UpdateVoyageRequest) => {
      return this.voyageService.update(action.payload.voyage).pipe(
        map(source => {
          this.voyageState.dispatch(new ChangeOffreVoyagesIsLoaded({isLoaded: false}));
          return new UpdateVoyageSuccess({voyage: source});
        }),
        catchError(error => of(new UpdateVoyageFailed())));
    })
  );

  @Effect()
  loadVoyages$ = this.actions$.pipe(
    ofType(VoyageActionTypes.LoadVoyagesRequest),
    switchMap((action: any) => {
      return this.voyageService.findAll(action.paginatorInformations, action.search).pipe(
        map(source => new LoadVoyagesSuccess({paginatedResults: source})),
        catchError(error => of(new LoadVoyagesFailed())));
    })
  );
  @Effect()
  loadOneVoyage$ = this.actions$.pipe(
    ofType(VoyageActionTypes.LoadOneVoyageRequest),
    switchMap((action: LoadOneVoyageRequest) => {
      return this.voyageService.findById(action.payload.id).pipe(
        map(source => new LoadOneVoyageSuccess({voyage: source})),
        catchError(error => of(new LoadOneVoyageFailed())));
    })
  );
  @Effect()
  loadVoyagesIsNotLoadedRequest$ = this.actions$.pipe(
    ofType(VoyageActionTypes.LoadVoyagesIsNotLoadedRequest),
    withLatestFrom(this.voyageState.pipe(select(selectVoyageSearchAndPaginatorInformationsAndisLoaded))),
    filter(([action, data]: [any, { paginatorInformations: PaginatorInformations, search: string, isLoaded: boolean }]) => {
      return !data.isLoaded;
    }),
    switchMap(([action, data]: [any, { paginatorInformations: PaginatorInformations, search: string }]) => {
      return this.voyageService.findAll(data.paginatorInformations, data.search).pipe(
        map(source => new LoadVoyagesSuccess({paginatedResults: source})),
        catchError(error => of(new LoadVoyagesFailed())));
    })
  );


}
