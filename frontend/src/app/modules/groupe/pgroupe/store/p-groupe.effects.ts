import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';

import {catchError, concatMap, filter, map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';
import {
  PGroupeActionTypes,
  PGroupeActions,
  LoadPGroupesSuccess,
  LoadPGroupesFailed,
  SavePGroupeRequest,
  SavePGroupeSuccess,
  SavePGroupeFailed,
  DeletePGroupeRequest,
  DeletePGroupeSuccess,
  DeletePGroupeFailed,
  LoadOnePGroupeRequest,
  LoadOnePGroupeSuccess,
  LoadOnePGroupeFailed,
  UpdatePGroupeRequest,
  UpdatePGroupeSuccess,
  UpdatePGroupeFailed,
  LoadPGroupesRequest, SavePGroupeFactureFailed, SavePGroupeFactureRequest, SavePGroupeFactureSuccess,
} from './p-groupe.actions';
import {Store} from '@ngrx/store';
import {PGroupeState} from './p-groupe.reducer';
import {PGroupeService} from '../service/p-groupe.service';
import {
  ChangeOffreVoyagesIsLoaded,
} from '../../../offre-voyage/store/offre-voyage.actions';
import {Facture} from '../../model/facture';
import {GroupeService} from '../../service/groupe.service';
import {Paiement} from '../../../offre-voyage/model/paiement';


@Injectable()
export class PGroupeEffects {

  constructor(private actions$: Actions<PGroupeActions>,
              private pGroupeService: PGroupeService,
              private groupeService: GroupeService,
              private pGroupeState: Store<PGroupeState>) {
  }

  @Effect()
  deletePGroupe$ = this.actions$.pipe(
    ofType(PGroupeActionTypes.DeletePGroupeRequest),
    switchMap((action: DeletePGroupeRequest) => {
      return this.pGroupeService.delete(action.payload.id).pipe(
        map(source => {
          this.pGroupeState.dispatch(new ChangeOffreVoyagesIsLoaded({isLoaded: false}));
          return new DeletePGroupeSuccess();
        }),
        catchError(error => of(new DeletePGroupeFailed())));
    })
  );
  @Effect()
  savePGroupe$ = this.actions$.pipe(
    ofType(PGroupeActionTypes.SavePGroupeRequest),
    switchMap((action: SavePGroupeRequest) => {
      return this.pGroupeService.save(action.payload.pGroupe).pipe(
        map(source => {
          this.pGroupeState.dispatch(new ChangeOffreVoyagesIsLoaded({isLoaded: false}));
          return new SavePGroupeSuccess({pGroupe: source});
        }),
        catchError(error => of(new SavePGroupeFailed(error))));
    })
  );
  @Effect()
  savePGroupeFacture$ = this.actions$.pipe(
    ofType(PGroupeActionTypes.SavePGroupeFactureRequest),
    switchMap((action: SavePGroupeFactureRequest) => {
      return this.groupeService.saveFacture(action.payload.facture).pipe(
        map((source: Paiement) => {
          this.pGroupeState.dispatch(new ChangeOffreVoyagesIsLoaded({isLoaded: false}));
          return new SavePGroupeFactureSuccess({paiement: source, id: action.payload.pGroupe.id});
        }),
        catchError(error => {
          console.warn(error);
          return of(new SavePGroupeFactureFailed(error));
        }));
    })
  );

  @Effect()
  updatePGroupe$ = this.actions$.pipe(
    ofType(PGroupeActionTypes.UpdatePGroupeRequest),
    switchMap((action: UpdatePGroupeRequest) => {
      return this.pGroupeService.update(action.payload.pGroupe).pipe(
        map(source => {
          this.pGroupeState.dispatch(new ChangeOffreVoyagesIsLoaded({isLoaded: false}));
          return new UpdatePGroupeSuccess({pGroupe: source});
        }),
        catchError(error => of(new UpdatePGroupeFailed())));
    })
  );

  @Effect()
  loadPGroupes$ = this.actions$.pipe(
    ofType(PGroupeActionTypes.LoadPGroupesRequest),
    switchMap((action: LoadPGroupesRequest) => {
      return this.pGroupeService.findAll(action.idOffreVoyage, action.paginatorInformations, action.search).pipe(
        map(source => new LoadPGroupesSuccess({paginatedResults: source, idOffreVoyage: action.idOffreVoyage})),
        catchError(error => of(new LoadPGroupesFailed())));
    })
  );
  /*@Effect()
  LoadPGroupesBySameOfOffreVoyageRequest = this.actions$.pipe(
    ofType(PGroupeActionTypes.LoadPGroupesBySameOfOffreVoyageRequest),
    switchMap((action: LoadPGroupesBySameOfOffreVoyageRequest) => {
      return this.pGroupeService.findAll(action.idOffreVoyage).pipe(
        map(source => new LoadPGroupesSuccess({idOffreVoyage: action.idOffreVoyage, paginatedResults: source})),
        catchError(error => of(new LoadPGroupesFailed())));
    })
  );*/
  /*  @Effect()
    loadOnePGroupe$ = this.actions$.pipe(
      ofType(PGroupeActionTypes.LoadOnePGroupeRequest),
      switchMap((action: LoadOnePGroupeRequest) => {
        return this.pGroupeService.findById(action.payload.id).pipe(
          map(source => new LoadOnePGroupeSuccess({id: action.payload.id, pGroupe: source})),
          catchError(error => of(new LoadOnePGroupeFailed())));
      })
    );*/
  /*
    @Effect()
    loadOnePGroupe$ = this.actions$.pipe(
      ofType(PGroupeActionTypes.LoadOnePGroupeRequest),
      withLatestFrom(this.pGroupeState.pipe(select(selectPGroupeSelectedId))),
      filter(([action, data]: [LoadOnePGroupeRequest, { selectedId: number }]) => {
        return data.selectedId !== action.payload.id;
      }),
      switchMap(([action, data]: [LoadOnePGroupeRequest, { selectedId: number }]) => {
        return this.pGroupeService.findById(action.payload.id).pipe(
          map(source => new LoadOnePGroupeSuccess({id: action.payload.id, pGroupe: source})),
          catchError(error => of(new LoadOnePGroupeFailed())));
      })
    );
  */


}
