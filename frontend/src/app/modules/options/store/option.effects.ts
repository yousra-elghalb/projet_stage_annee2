import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';

import {catchError, concatMap, filter, map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';
import {
  OptionActionTypes,
  OptionActions,
  LoadOptionsSuccess,
  LoadOptionsFailed,
  LoadOptionsIsNotLoadedRequest,
  SaveOptionRequest,
  SaveOptionSuccess,
  SaveOptionFailed,
  DeleteOptionRequest,
  DeleteOptionSuccess,
  DeleteOptionFailed,
  LoadOneOptionRequest,
  LoadOneOptionSuccess, LoadOneOptionFailed, UpdateOptionRequest, UpdateOptionSuccess, UpdateOptionFailed
} from './option.actions';
import {Option} from '../model/option';
import {OptionService} from '../service/option.service';
import {select, Store} from '@ngrx/store';
import {OptionState} from './option.reducer';
import {
  selectOptionSearchAndisLoaded,
  selectOptionSearch
} from './option.selectors';
import {PaginatorInformations} from '../../../shared_models/paginator-informations';


@Injectable()
export class OptionEffects {

  constructor(private actions$: Actions<OptionActions>,
              private optionService: OptionService,
              private optionState: Store<OptionState>) {
  }


  @Effect()
  deleteOption$ = this.actions$.pipe(
    ofType(OptionActionTypes.DeleteOptionRequest),
    switchMap((action: DeleteOptionRequest) => {
      return this.optionService.delete(action.payload.id).pipe(map(source => new DeleteOptionSuccess()),
        catchError(error => of(new DeleteOptionFailed())));
    })
  );
  @Effect()
  saveOption$ = this.actions$.pipe(
    ofType(OptionActionTypes.SaveOptionRequest),
    switchMap((action: SaveOptionRequest) => {
      return this.optionService.save(action.payload.option).pipe(map(source => new SaveOptionSuccess({option: source})),
        catchError(error => of(new SaveOptionFailed())));
    })
  );
  @Effect()
  updateOption$ = this.actions$.pipe(
    ofType(OptionActionTypes.UpdateOptionRequest),
    switchMap((action: UpdateOptionRequest) => {
      return this.optionService.update(action.payload.option).pipe(map(source => new UpdateOptionSuccess({option: source})),
        catchError(error => of(new UpdateOptionFailed())));
    })
  );

  @Effect()
  loadOptions$ = this.actions$.pipe(
    ofType(OptionActionTypes.LoadOptionsRequest),
    switchMap((action: any) => {
      return this.optionService.findAll(action.search).pipe(map(source => new LoadOptionsSuccess({option: source})),
        catchError(error => of(new LoadOptionsFailed())));
    })
  );
  @Effect()
  loadOneOption$ = this.actions$.pipe(
    ofType(OptionActionTypes.LoadOneOptionRequest),
    switchMap((action: LoadOneOptionRequest) => {
      return this.optionService.findById(action.payload.id).pipe(map(source => new LoadOneOptionSuccess({option: source})),
        catchError(error => of(new LoadOneOptionFailed())));
    })
  );
  @Effect()
  loadOptionsIsNotLoadedRequest$ = this.actions$.pipe(
    ofType(OptionActionTypes.LoadOptionsIsNotLoadedRequest),
    withLatestFrom(this.optionState.pipe(select(selectOptionSearchAndisLoaded))),
    filter(([action, data]: [any, { search: string, isLoaded: boolean }]) => {
      return !data.isLoaded;
    }),
    switchMap(([action, data]: [any, { search: string }]) => {
      return this.optionService.findAll(data.search).pipe(map(source => new LoadOptionsSuccess({option: source})),
        catchError(error => of(new LoadOptionsFailed())));
    })
  );


}
