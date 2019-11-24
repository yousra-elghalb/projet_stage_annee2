import {HotelActions, HotelActionTypes} from './hotel.actions';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Hotel} from '../model/hotel';
import {PaginatorInformations} from '../../../shared_models/paginator-informations';
import {isUndefined} from 'util';

export interface HotelState extends EntityState<Hotel> {
  isLoading: boolean;
  isLoaded: boolean;
  selectedId?: number;
  search: string;
  isLoadingSpinner: boolean;
}

export const hotelEntityAdapter: EntityAdapter<Hotel> = createEntityAdapter<Hotel>({selectId: data => data.id});


export const initialHotelState: HotelState = hotelEntityAdapter.getInitialState({
  // additional entity state properties
  isLoading: false,
  isLoadingSpinner: false,
  isLoaded: false,
  search: ''
});

export function reducer(state = initialHotelState, action: HotelActions): HotelState {
  switch (action.type) {
    case HotelActionTypes.LoadHotelsRequest:
      return {
        ...state,
        search: action.search,
        isLoading: true,
        isLoaded: false
      };
    case HotelActionTypes.LoadHotelsIsNotLoadedRequest:

      state = {...state, isLoading: !state.isLoaded};
      return {
        ...state
      };
    case HotelActionTypes.Hotelsloading:

      state = {...state, isLoading: true};
      return {
        ...state
      };
    case HotelActionTypes.LoadHotelsSuccess:
      // state = hotelEntityAdapter.removeAll(state);
      state = hotelEntityAdapter.addAll(action.payload.hotel, state);
      return {
        ...state,
        isLoading: false,
        isLoaded: true
      };
    case HotelActionTypes.LoadHotelsFailed:
      return {
        ...state,
        isLoading: false,
        isLoaded: false
      };
    case HotelActionTypes.UpdateHotelRequest:
      return {
        ...state,
        isLoadingSpinner: true
      };
    case HotelActionTypes.UpdateHotelSuccess:
      state = hotelEntityAdapter.updateOne({
        id: action.payload.hotel.id,
        changes: {...action.payload.hotel}
      }, state);
      return {
        ...state,
        isLoadingSpinner: false
      };
    case HotelActionTypes.UpdateHotelFailed:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case HotelActionTypes.SaveHotelRequest:
      return {
        ...state,
        isLoadingSpinner: true
      };
    case HotelActionTypes.SaveHotelSuccess:
      state = hotelEntityAdapter.addOne(action.payload.hotel, state);
      return {
        ...state,
        isLoadingSpinner: false
      };
    case HotelActionTypes.SaveHotelFailed:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case HotelActionTypes.DeleteHotelRequest:
      return {
        ...state,
        selectedId: action.payload.id,
        isLoading: true
      };
    case HotelActionTypes.DeleteHotelSuccess:
      state = hotelEntityAdapter.removeOne(state.selectedId, state);
      return {
        ...state,
        selectedId: 0,
        isLoading: false
      };
    case HotelActionTypes.DeleteHotelFailed:
      return {
        ...state,
        selectedId: 0,
        isLoading: false
      };
    case HotelActionTypes.LoadOneHotelRequest:
      return {
        ...state,
        selectedId: action.payload.id,
        isLoadingSpinner: true
      };
    case HotelActionTypes.LoadOneHotelSuccess:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case HotelActionTypes.LoadOneHotelFailed:
      return {
        ...state,
        isLoadingSpinner: false
      };
    default:
      return state;
  }
}
