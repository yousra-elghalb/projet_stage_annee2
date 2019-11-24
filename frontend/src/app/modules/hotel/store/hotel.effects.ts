import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';

import {catchError, concatMap, filter, map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';
import {
  HotelActionTypes,
  HotelActions,
  LoadHotelsSuccess,
  LoadHotelsFailed,
  LoadHotelsIsNotLoadedRequest,
  SaveHotelRequest,
  SaveHotelSuccess,
  SaveHotelFailed,
  DeleteHotelRequest,
  DeleteHotelSuccess,
  DeleteHotelFailed,
  LoadOneHotelRequest,
  LoadOneHotelSuccess,
  LoadOneHotelFailed,
  UpdateHotelRequest,
  UpdateHotelSuccess,
  UpdateHotelFailed
} from './hotel.actions';
import {Hotel} from '../model/hotel';
import {HotelService} from '../service/hotel.service';
import {select, Store} from '@ngrx/store';
import {HotelState} from './hotel.reducer';
import {
  selectHotelSearchAndisLoaded,
  selectHotelSearch
} from './hotel.selectors';
import {PaginatorInformations} from '../../../shared_models/paginator-informations';


@Injectable()
export class HotelEffects {

  constructor(private actions$: Actions<HotelActions>,
              private hotelService: HotelService,
              private hotelState: Store<HotelState>) {
  }


  @Effect()
  deleteHotel$ = this.actions$.pipe(
    ofType(HotelActionTypes.DeleteHotelRequest),
    switchMap((action: DeleteHotelRequest) => {
      return this.hotelService.delete(action.payload.id).pipe(map(source => new DeleteHotelSuccess()),
        catchError(error => of(new DeleteHotelFailed())));
    })
  );
  @Effect()
  saveHotel$ = this.actions$.pipe(
    ofType(HotelActionTypes.SaveHotelRequest),
    switchMap((action: SaveHotelRequest) => {
      return this.hotelService.save(action.payload.hotel)
        .pipe(map(source => new SaveHotelSuccess({hotel: source})),
          catchError(error => of(new SaveHotelFailed())));
    })
  );
  @Effect()
  updateHotel$ = this.actions$.pipe(
    ofType(HotelActionTypes.UpdateHotelRequest),
    switchMap((action: UpdateHotelRequest) => {
      return this.hotelService.update(action.payload.hotel).pipe(
        map(source => {
          return new UpdateHotelSuccess({hotel: source});
        }),
        catchError(error => of(new UpdateHotelFailed())));
    })
  );

  @Effect()
  loadHotels$ = this.actions$.pipe(
    ofType(HotelActionTypes.LoadHotelsRequest),
    switchMap((action: any) => {
      return this.hotelService.findAll(action.search).pipe(
        map(source => new LoadHotelsSuccess({hotel: source})),
        catchError(error => of(new LoadHotelsFailed())));
    })
  );
  @Effect()
  loadOneHotel$ = this.actions$.pipe(
    ofType(HotelActionTypes.LoadOneHotelRequest),
    switchMap((action: LoadOneHotelRequest) => {
      return this.hotelService.findById(action.payload.id).pipe(
        map(source => new LoadOneHotelSuccess({hotel: source})),
        catchError(error => of(new LoadOneHotelFailed())));
    })
  );
  @Effect()
  loadHotelsIsNotLoadedRequest$ = this.actions$.pipe(
    ofType(HotelActionTypes.LoadHotelsIsNotLoadedRequest),
    withLatestFrom(this.hotelState.pipe(select(selectHotelSearchAndisLoaded))),
    filter(([action, data]: [any, { search: string, isLoaded: boolean }]) => {
      return !data.isLoaded;
    }),
    switchMap(([action, data]: [any, { search: string }]) => {
      return this.hotelService.findAll(data.search).pipe(
        map(source => new LoadHotelsSuccess({hotel: source})),
        catchError(error => of(new LoadHotelsFailed())));
    })
  );


}
