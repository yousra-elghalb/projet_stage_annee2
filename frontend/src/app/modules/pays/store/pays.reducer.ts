import {PaysActions, PaysActionTypes} from './pays.actions';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Pays} from '../model/pays';
import {PaginatorInformations} from '../../../shared_models/paginator-informations';
import {isUndefined} from 'util';

export interface PaysState extends EntityState<Pays> {
  isLoading: boolean;
  isLoaded: boolean;
  selectedId?: number;
  search: string;
  isLoadingSpinner: boolean;
}

export const paysEntityAdapter: EntityAdapter<Pays> = createEntityAdapter<Pays>({selectId: data => data.id});


export const initialPaysState: PaysState = paysEntityAdapter.getInitialState({
  // additional entity state properties
  isLoading: false,
  isLoadingSpinner: false,
  isLoaded: false,
  search: ''
});

export function reducer(state = initialPaysState, action: PaysActions): PaysState {
  switch (action.type) {
    case PaysActionTypes.LoadPayssRequest:
      return {
        ...state,
        search: action.search,
        isLoading: true,
        isLoaded: false
      };
    case PaysActionTypes.LoadPayssIsNotLoadedRequest:

      state = {...state, isLoading: !state.isLoaded};
      return {
        ...state
      };
    case PaysActionTypes.LoadPayssSuccess:
      // state = paysEntityAdapter.removeAll(state);
      state = paysEntityAdapter.addAll(action.payload.pays, state);
      return {
        ...state,
        isLoading: false,
        isLoaded: true
      };
    case PaysActionTypes.LoadPayssFailed:
      return {
        ...state,
        isLoading: false,
        isLoaded: false
      };
    case PaysActionTypes.UpdatePaysRequest:
      return {
        ...state,
        isLoadingSpinner: true
      };
    case PaysActionTypes.UpdatePaysSuccess:
      state = paysEntityAdapter.updateOne({
        id: action.payload.pays.id,
        changes: {...action.payload.pays}
      }, state);
      return {
        ...state,
        isLoadingSpinner: false
      };
    case PaysActionTypes.UpdatePaysFailed:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case PaysActionTypes.SavePaysRequest:
      return {
        ...state,
        isLoadingSpinner: true
      };
    case PaysActionTypes.SavePaysSuccess:
      state = paysEntityAdapter.addOne(action.payload.pays, state);
      return {
        ...state,
        isLoadingSpinner: false
      };
    case PaysActionTypes.SavePaysFailed:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case PaysActionTypes.DeletePaysRequest:
      return {
        ...state,
        selectedId: action.payload.id,
        isLoading: true
      };
    case PaysActionTypes.DeletePaysSuccess:
      state = paysEntityAdapter.removeOne(state.selectedId, state);
      return {
        ...state,
        selectedId: 0,
        isLoading: false
      };
    case PaysActionTypes.DeletePaysFailed:
      return {
        ...state,
        selectedId: 0,
        isLoading: false
      };
    case PaysActionTypes.LoadOnePaysRequest:
      return {
        ...state,
        selectedId: action.payload.id,
        isLoadingSpinner: true
      };
    case PaysActionTypes.LoadOnePaysSuccess:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case PaysActionTypes.LoadOnePaysFailed:
      return {
        ...state,
        isLoadingSpinner: false
      };
    default:
      return state;
  }
}
