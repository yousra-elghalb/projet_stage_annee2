import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';

import {catchError, concatMap, filter, map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';
import {
  OffreVoyageActionTypes,
  OffreVoyageActions,
  LoadOffreVoyagesSuccess,
  LoadOffreVoyagesFailed,
  SaveOffreVoyageRequest,
  SaveOffreVoyageSuccess,
  SaveOffreVoyageFailed,
  DeleteOffreVoyageRequest,
  DeleteOffreVoyageSuccess,
  DeleteOffreVoyageFailed,
  LoadOneOffreVoyageRequest,
  LoadOneOffreVoyageSuccess,
  LoadOneOffreVoyageFailed,
  UpdateOffreVoyageRequest,
  UpdateOffreVoyageSuccess,
  UpdateOffreVoyageFailed,
} from './offre-voyage.actions';
import {OffreVoyageService} from '../service/offre-voyage.service';
import {select, Store} from '@ngrx/store';
import {OffreVoyageState} from './offre-voyage.reducer';
import {
  selectOffreVoyagePaginatorInformationsAndSearchAndisLoaded,
} from './offre-voyage.selectors';
import {PaginatorInformations} from '../../../shared_models/paginator-informations';
import {CriteresRecherche} from '../model/criteres-recherche';


@Injectable()
export class OffreVoyageEffects {

  constructor(
    private actions$: Actions<OffreVoyageActions>,
    private offreVoyageService: OffreVoyageService,
    private offreVoyageState: Store<OffreVoyageState>
  ) {
  }

  @Effect()
  deleteOffreVoyage$ = this.actions$.pipe(
    ofType(OffreVoyageActionTypes.DeleteOffreVoyageRequest),
    switchMap((action: DeleteOffreVoyageRequest) => {
      return this.offreVoyageService.delete(action.payload.id).pipe(
        map(source => new DeleteOffreVoyageSuccess()),
        catchError(error => of(new DeleteOffreVoyageFailed())));
    })
  );
  @Effect()
  saveOffreVoyage$ = this.actions$.pipe(
    ofType(OffreVoyageActionTypes.SaveOffreVoyageRequest),
    switchMap((action: SaveOffreVoyageRequest) => {
      return this.offreVoyageService.save(action.payload.offreVoyages).pipe(
        map(source => new SaveOffreVoyageSuccess()),
        catchError(error => of(new SaveOffreVoyageFailed(error))));
    })
  );

  @Effect()
  updateOffreVoyage$ = this.actions$.pipe(
    ofType(OffreVoyageActionTypes.UpdateOffreVoyageRequest),
    switchMap((action: UpdateOffreVoyageRequest) => {
      return this.offreVoyageService.update(action.payload.offreVoyage).pipe(
        map(source => new UpdateOffreVoyageSuccess({offreVoyage: source})),
        catchError(error => of(new UpdateOffreVoyageFailed())));
    })
  );

  @Effect()
  loadOffreVoyages$ = this.actions$.pipe(
    ofType(OffreVoyageActionTypes.LoadOffreVoyagesRequest),
    switchMap((action: any) => {
      return this.offreVoyageService.findAll(action.paginatorInformations, action.search).pipe(
        map(source => new LoadOffreVoyagesSuccess({paginatedResults: source})),
        catchError(error => of(new LoadOffreVoyagesFailed())));
    })
  );
  @Effect()
  loadOffreVoyagesLimited$ = this.actions$.pipe(
    ofType(OffreVoyageActionTypes.LoadOffreVoyagesLimitedRequest),
    switchMap((action: any) => {
      return this.offreVoyageService.findAllByCommercialId(action.paginatorInformations, action.search).pipe(
        map(source => new LoadOffreVoyagesSuccess({paginatedResults: source})),
        catchError(error => of(new LoadOffreVoyagesFailed())));
    })
  );
  @Effect()
  loadOneOffreVoyage$ = this.actions$.pipe(
    ofType(OffreVoyageActionTypes.LoadOneOffreVoyageRequest),
    switchMap((action: LoadOneOffreVoyageRequest) => {
      return this.offreVoyageService.findById(action.payload.id).pipe(
        map(source => new LoadOneOffreVoyageSuccess({offreVoyage: source})),
        catchError(error => of(new LoadOneOffreVoyageFailed())));
    })
  );
  /*@Effect()
  loadOffreVoyagesIsNotLoadedRequest$ = this.actions$.pipe(
    ofType(OffreVoyageActionTypes.LoadOffreVoyagesIsNotLoadedRequest),
    withLatestFrom(this.offreVoyageState.pipe(select(selectOffreVoyagePaginatorInformationsAndSearchAndisLoaded))),
    filter(([action, data]: [any, { paginatorInformations: PaginatorInformations, search: CriteresRecherche, isLoaded: boolean }]) => {
      return !data.isLoaded;
    }),
    switchMap(([action, data]: [any, { paginatorInformations: PaginatorInformations, search: CriteresRecherche }]) => {
      return this.offreVoyageService.findAll(data.paginatorInformations, data.search).pipe(
        map(source => new LoadOffreVoyagesSuccess({paginatedResults: source})),
        catchError(error => of(new LoadOffreVoyagesFailed())));
    })
  );*/
  @Effect()
  loadOffreVoyagesLimitedIsNotLoadedRequest$ = this.actions$.pipe(
    ofType(OffreVoyageActionTypes.LoadOffreVoyagesLimitedIsNotLoadedRequest),
    withLatestFrom(this.offreVoyageState.pipe(select(selectOffreVoyagePaginatorInformationsAndSearchAndisLoaded))),
    filter(([action, data]: [any, { paginatorInformations: PaginatorInformations, search: CriteresRecherche, isLoaded: boolean }]) => {
      return !data.isLoaded;
    }),
    switchMap(([action, data]: [any, { paginatorInformations: PaginatorInformations, search: CriteresRecherche }]) => {
      return this.offreVoyageService.findAllByCommercialId(data.paginatorInformations, data.search).pipe(
        map(source => new LoadOffreVoyagesSuccess({paginatedResults: source})),
        catchError(error => of(new LoadOffreVoyagesFailed())));
    })
  );


}
