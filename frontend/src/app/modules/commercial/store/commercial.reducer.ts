import {CommercialActions, CommercialActionTypes, UpdateCommercialchangePasswordFailed} from './commercial.actions';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Commercial} from '../model/commercial';
import {PaginatorInformations} from '../../../shared_models/paginator-informations';
import {isUndefined} from 'util';

export interface CommercialState extends EntityState<Commercial> {
  isLoading: boolean;
  isLoaded: boolean;
  selectedId?: number;
  search: string;
  isLoadingSpinner: boolean;
}

export const commercialEntityAdapter: EntityAdapter<Commercial> = createEntityAdapter<Commercial>({selectId: data => data.id});


export const initialCommercialState: CommercialState = commercialEntityAdapter.getInitialState({
  // additional entity state properties
  isLoading: false,
  isLoadingSpinner: false,
  isLoaded: false,
  search: ''
});

export function reducer(state = initialCommercialState, action: CommercialActions): CommercialState {
  switch (action.type) {
    case CommercialActionTypes.Commercialsloading:
      return {
        ...state,
        isLoading: true,
      };
    case CommercialActionTypes.LoadCommercialsRequest:
      return {
        ...state,
        search: action.search,
        isLoading: true,
        isLoaded: false
      };
    case CommercialActionTypes.LoadCommercialsIsNotLoadedRequest:

      state = {...state, isLoading: !state.isLoaded};
      return {
        ...state
      };
    case CommercialActionTypes.LoadCommercialsSuccess:
      // state = commercialEntityAdapter.removeAll(state);
      state = commercialEntityAdapter.addAll(action.payload.commercial, state);
      return {
        ...state,
        isLoading: false,
        isLoaded: true
      };
    case CommercialActionTypes.LoadCommercialsFailed:
      return {
        ...state,
        isLoading: false,
        isLoaded: false
      };
    case CommercialActionTypes.UpdateCommercialRequest:
      return {
        ...state,
        isLoadingSpinner: true
      };
    case CommercialActionTypes.UpdateCommercialchangePasswordRequest:
      return {
        ...state,
        isLoadingSpinner: true
      };
    case CommercialActionTypes.UpdateCommercialchangePasswordSuccess:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case CommercialActionTypes.UpdateCommercialchangePasswordFailed:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case CommercialActionTypes.UpdateCommercialSuccess:
      state = commercialEntityAdapter.updateOne({
        id: action.payload.commercial.id,
        changes: {...action.payload.commercial}
      }, state);
      return {
        ...state,
        isLoadingSpinner: false
      };
    case CommercialActionTypes.UpdateCommercialFailed:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case CommercialActionTypes.SaveCommercialRequest:
      return {
        ...state,
        isLoadingSpinner: true
      };
    case CommercialActionTypes.SaveCommercialSuccess:
      state = commercialEntityAdapter.addOne(action.payload.commercial, state);
      return {
        ...state,
        isLoadingSpinner: false
      };
    case CommercialActionTypes.SaveCommercialFailed:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case CommercialActionTypes.DeleteCommercialRequest:
      return {
        ...state,
        selectedId: action.payload.id,
        isLoading: true
      };
    case CommercialActionTypes.DeleteCommercialSuccess:
      state = commercialEntityAdapter.removeOne(state.selectedId, state);
      return {
        ...state,
        selectedId: 0,
        isLoading: false
      };
    case CommercialActionTypes.DeleteCommercialFailed:
      return {
        ...state,
        selectedId: 0,
        isLoading: false
      };
    case CommercialActionTypes.LoadOneCommercialRequest:
      return {
        ...state,
        selectedId: action.payload.id,
        isLoadingSpinner: true
      };
    case CommercialActionTypes.LoadOneCommercialSuccess:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case CommercialActionTypes.LoadOneCommercialFailed:
      return {
        ...state,
        isLoadingSpinner: false
      };
    default:
      return state;
  }
}
