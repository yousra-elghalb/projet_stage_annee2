import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';

import {catchError, concatMap, filter, map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';
import {
  ChauffeurActionTypes,
  ChauffeurActions,
  LoadChauffeursSuccess,
  LoadChauffeursFailed,
  LoadChauffeursIsNotLoadedRequest,
  SaveChauffeurRequest,
  SaveChauffeurSuccess,
  SaveChauffeurFailed,
  DeleteChauffeurRequest,
  DeleteChauffeurSuccess,
  DeleteChauffeurFailed,
  LoadOneChauffeurRequest,
  LoadOneChauffeurSuccess,
  LoadOneChauffeurFailed,
  UpdateChauffeurRequest,
  UpdateChauffeurSuccess,
  UpdateChauffeurFailed
} from './chauffeur.actions';
import {Chauffeur} from '../model/chauffeur';
import {ChauffeurService} from '../service/chauffeur.service';
import {select, Store} from '@ngrx/store';
import {ChauffeurState} from './chauffeur.reducer';
import {
  selectChauffeurSearchAndisLoaded,
  selectChauffeurSearch
} from './chauffeur.selectors';
import {PaginatorInformations} from '../../../shared_models/paginator-informations';


@Injectable()
export class ChauffeurEffects {

  constructor(private actions$: Actions<ChauffeurActions>,
              private chauffeurService: ChauffeurService,
              private chauffeurState: Store<ChauffeurState>) {
  }


  @Effect()
  deleteChauffeur$ = this.actions$.pipe(
    ofType(ChauffeurActionTypes.DeleteChauffeurRequest),
    switchMap((action: DeleteChauffeurRequest) => {
      return this.chauffeurService.delete(action.payload.id).pipe(map(source => new DeleteChauffeurSuccess()),
        catchError(error => of(new DeleteChauffeurFailed())));
    })
  );
  @Effect()
  saveChauffeur$ = this.actions$.pipe(
    ofType(ChauffeurActionTypes.SaveChauffeurRequest),
    switchMap((action: SaveChauffeurRequest) => {
      return this.chauffeurService.save(action.payload.chauffeur)
        .pipe(map(source => new SaveChauffeurSuccess({chauffeur: source})),
          catchError(error => of(new SaveChauffeurFailed())));
    })
  );
  @Effect()
  updateChauffeur$ = this.actions$.pipe(
    ofType(ChauffeurActionTypes.UpdateChauffeurRequest),
    switchMap((action: UpdateChauffeurRequest) => {
      return this.chauffeurService.update(action.payload.chauffeur).pipe(
        map(source => {
          return new UpdateChauffeurSuccess({chauffeur: source});
        }),
        catchError(error => of(new UpdateChauffeurFailed())));
    })
  );

  @Effect()
  loadChauffeurs$ = this.actions$.pipe(
    ofType(ChauffeurActionTypes.LoadChauffeursRequest),
    switchMap((action: any) => {
      return this.chauffeurService.findAll(action.search).pipe(
        map(source => new LoadChauffeursSuccess({chauffeur: source})),
        catchError(error => of(new LoadChauffeursFailed())));
    })
  );
  @Effect()
  loadOneChauffeur$ = this.actions$.pipe(
    ofType(ChauffeurActionTypes.LoadOneChauffeurRequest),
    switchMap((action: LoadOneChauffeurRequest) => {
      return this.chauffeurService.findById(action.payload.id).pipe(
        map(source => new LoadOneChauffeurSuccess({chauffeur: source})),
        catchError(error => of(new LoadOneChauffeurFailed())));
    })
  );
  @Effect()
  loadChauffeursIsNotLoadedRequest$ = this.actions$.pipe(
    ofType(ChauffeurActionTypes.LoadChauffeursIsNotLoadedRequest),
    withLatestFrom(this.chauffeurState.pipe(select(selectChauffeurSearchAndisLoaded))),
    filter(([action, data]: [any, { search: string, isLoaded: boolean }]) => {
      return !data.isLoaded;
    }),
    switchMap(([action, data]: [any, { search: string }]) => {
      return this.chauffeurService.findAll(data.search).pipe(
        map(source => new LoadChauffeursSuccess({chauffeur: source})),
        catchError(error => of(new LoadChauffeursFailed())));
    })
  );


}
