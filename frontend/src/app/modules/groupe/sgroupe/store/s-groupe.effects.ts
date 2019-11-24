import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';

import {catchError, concatMap, filter, map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';
import {
  SGroupeActionTypes,
  SGroupeActions,
  SaveSGroupeRequest,
  SaveSGroupeSuccess,
  SaveSGroupeFailed,
  DeleteSGroupeRequest,
  DeleteSGroupeSuccess,
  DeleteSGroupeFailed,
  UpdateSGroupeRequest,
  UpdateSGroupeSuccess,
  UpdateSGroupeFailed, SaveSGroupeFactureRequest, SaveSGroupeFactureSuccess, SaveSGroupeFactureFailed,
} from './s-groupe.actions';
import {select, Store} from '@ngrx/store';
import {SGroupeState} from './s-groupe.reducer';
import {
  ChangeOffreVoyagesIsLoaded,
} from '../../../offre-voyage/store/offre-voyage.actions';
import {SGroupeService} from '../service/s-groupe.service';
import {PGroupeService} from '../../pgroupe/service/p-groupe.service';
import {GroupeService} from '../../service/groupe.service';


@Injectable()
export class SGroupeEffects {

  constructor(private actions$: Actions<SGroupeActions>,
              private sGroupeService: SGroupeService,
              private groupeService: GroupeService,
              private sGroupeState: Store<SGroupeState>) {
  }

  // @Effect()
  // LoadSGroupesFailed$ = createEffect(() =>
  //     this.actions$.pipe(ofType(SGroupeActionTypes.LoadSGroupesFailed),
  //       tap(action => console.log(action, 'HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH'))),
  //   {dispatch: false});

  @Effect()
  deleteSGroupe$ = this.actions$.pipe(
    ofType(SGroupeActionTypes.DeleteSGroupeRequest),
    switchMap((action: DeleteSGroupeRequest) => {
      return this.sGroupeService.delete(action.payload.id).pipe(
        map(source => {
          this.sGroupeState.dispatch(new ChangeOffreVoyagesIsLoaded({isLoaded: false}));
          return new DeleteSGroupeSuccess();
        }),
        catchError(error => of(new DeleteSGroupeFailed())));
    })
  );
  @Effect()
  saveSGroupe$ = this.actions$.pipe(
    ofType(SGroupeActionTypes.SaveSGroupeRequest),
    switchMap((action: SaveSGroupeRequest) => {
      return this.sGroupeService.save(action.payload.sGroupe).pipe(
        map(source => {
          this.sGroupeState.dispatch(new ChangeOffreVoyagesIsLoaded({isLoaded: false}));
          return new SaveSGroupeSuccess({sGroupe: source});
        }),
        catchError(error => of(new SaveSGroupeFailed(error))));
    })
  );

  @Effect()
  saveSGroupeFacture$ = this.actions$.pipe(
    ofType(SGroupeActionTypes.SaveSGroupeFactureRequest),
    switchMap((action: SaveSGroupeFactureRequest) => {
      return this.groupeService.saveFacture(action.payload.facture).pipe(
        map(source => {
          this.sGroupeState.dispatch(new ChangeOffreVoyagesIsLoaded({isLoaded: false}));
          return new SaveSGroupeFactureSuccess({paiement: source});
        }),
        catchError(error => of(new SaveSGroupeFactureFailed(error))));
    })
  );


  @Effect()
  updateSGroupe$ = this.actions$.pipe(
    ofType(SGroupeActionTypes.UpdateSGroupeRequest),
    switchMap((action: UpdateSGroupeRequest) => {
      return this.sGroupeService.update(action.payload.sGroupe).pipe(
        map(source => {
          this.sGroupeState.dispatch(new ChangeOffreVoyagesIsLoaded({isLoaded: false}));
          return new UpdateSGroupeSuccess({sGroupe: source});
        }),
        catchError(error => of(new UpdateSGroupeFailed())));
    })
  );


}
