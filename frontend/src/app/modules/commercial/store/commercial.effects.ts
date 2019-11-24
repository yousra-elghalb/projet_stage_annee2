import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';

import {catchError, concatMap, filter, map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';
import {
  CommercialActionTypes,
  CommercialActions,
  LoadCommercialsSuccess,
  LoadCommercialsFailed,
  LoadCommercialsIsNotLoadedRequest,
  SaveCommercialRequest,
  SaveCommercialSuccess,
  SaveCommercialFailed,
  DeleteCommercialRequest,
  DeleteCommercialSuccess,
  DeleteCommercialFailed,
  LoadOneCommercialRequest,
  LoadOneCommercialSuccess,
  LoadOneCommercialFailed,
  UpdateCommercialRequest,
  UpdateCommercialSuccess,
  UpdateCommercialFailed,
  UpdateCommercialProfileRequest,
  UpdateCommercialchangePasswordRequest,
  UpdateCommercialchangePasswordSuccess,
  UpdateCommercialchangePasswordFailed
} from './commercial.actions';
import {Commercial} from '../model/commercial';
import {CommercialService} from '../service/commercial.service';
import {select, Store} from '@ngrx/store';
import {CommercialState} from './commercial.reducer';
import {
  selectCommercialSearchAndisLoaded,
  selectCommercialSearch
} from './commercial.selectors';
import {PaginatorInformations} from '../../../shared_models/paginator-informations';
import {UpdateCommercialProfileFailed, UpdateCommercialProfileSuccess} from '../../user/store/user.actions';
import {UserService} from '../../user/service/user.service';


@Injectable()
export class CommercialEffects {

  constructor(private actions$: Actions<CommercialActions>,
              private commercialService: CommercialService,
              private userService: UserService,
              private commercialState: Store<CommercialState>) {
  }


  @Effect()
  deleteCommercial$ = this.actions$.pipe(
    ofType(CommercialActionTypes.DeleteCommercialRequest),
    switchMap((action: DeleteCommercialRequest) => {
      return this.commercialService.delete(action.payload.id);
    }),
    map(source => new DeleteCommercialSuccess()),
    catchError((err, caught) => {
      this.commercialState.dispatch(new DeleteCommercialFailed());
      return caught;
    })
  );
  @Effect()
  saveCommercial$ = this.actions$.pipe(
    ofType(CommercialActionTypes.SaveCommercialRequest),
    switchMap((action: SaveCommercialRequest) => {
      return this.commercialService.save(action.payload.commercial);
    }),
    map(source => new SaveCommercialSuccess({commercial: source})),
    catchError((err, caught) => {
      this.commercialState.dispatch(new SaveCommercialFailed());
      return caught;
    })
  );
  @Effect()
  updateCommercialchangePasswordRequest$ = this.actions$.pipe(
    ofType(CommercialActionTypes.UpdateCommercialchangePasswordRequest),
    switchMap((action: UpdateCommercialchangePasswordRequest) => {
      return this.commercialService.changePassword(action.payload.user);
    }),
    map(source => new UpdateCommercialchangePasswordSuccess()),
    catchError((err, caught) => {
      this.commercialState.dispatch(new UpdateCommercialchangePasswordFailed());
      return caught;
    })
  );

  @Effect()
  updateCommercial$ = this.actions$.pipe(
    ofType(CommercialActionTypes.UpdateCommercialRequest),
    switchMap((action: UpdateCommercialRequest) => {
      return this.commercialService.update(action.payload.commercial);
    }),
    map(source => {
      return new UpdateCommercialSuccess({commercial: source});
    }),
    catchError((err, caught) => {
      this.commercialState.dispatch(new UpdateCommercialFailed());
      return caught;
    })
  );
  @Effect()
  updateProfile$ = this.actions$.pipe(
    ofType(CommercialActionTypes.UpdateCommercialProfileRequest),
    switchMap((action: UpdateCommercialProfileRequest) => {
      return this.commercialService.updateProfile(action.payload.commercial);
    }),
    map(source => {
      this.userService.setCommercial(source);
      return new UpdateCommercialProfileSuccess({commercial: source});
    }),
    catchError((err, caught) => {
      this.commercialState.dispatch(new UpdateCommercialProfileFailed());
      return caught;
    })
  );

  @Effect()
  loadCommercials$ = this.actions$.pipe(
    ofType(CommercialActionTypes.LoadCommercialsRequest),
    switchMap((action: any) => {
      return this.commercialService.findAll(action.search);
    }),
    map(source => new LoadCommercialsSuccess({commercial: source})),
    catchError((err, caught) => {
      this.commercialState.dispatch(new LoadCommercialsFailed());
      return caught;
    })
  );
  @Effect()
  loadOneCommercial$ = this.actions$.pipe(
    ofType(CommercialActionTypes.LoadOneCommercialRequest),
    switchMap((action: LoadOneCommercialRequest) => {
      return this.commercialService.findById(action.payload.id);
    }),
    map(source => new LoadOneCommercialSuccess({commercial: source})),
    catchError((err, caught) => {
      this.commercialState.dispatch(new LoadCommercialsFailed());
      return caught;
    })
  );
  @Effect()
  loadCommercialsIsNotLoadedRequest$ = this.actions$.pipe(
    ofType(CommercialActionTypes.LoadCommercialsIsNotLoadedRequest),
    withLatestFrom(this.commercialState.pipe(select(selectCommercialSearchAndisLoaded))),
    filter(([action, data]: [any, { search: string, isLoaded: boolean }]) => {
      return !data.isLoaded;
    }),
    switchMap(([action, data]: [any, { search: string }]) => {
      return this.commercialService.findAll(data.search);
    }),
    map(source => new LoadCommercialsSuccess({commercial: source})),
    catchError((err, caught) => {
      this.commercialState.dispatch(new LoadCommercialsFailed());
      return caught;
    })
  );


}
