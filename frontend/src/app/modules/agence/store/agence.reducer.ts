import {AgenceActions, AgenceActionTypes} from './agence.actions';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Agence} from '../model/agence';

export interface AgenceState extends EntityState<Agence> {
  isLoading: boolean;
  isLoaded: boolean;
  selectedId?: number;
  search: string;
  isLoadingSpinner: boolean;
}

export const agenceEntityAdapter: EntityAdapter<Agence> = createEntityAdapter<Agence>({selectId: data => data.id});


export const initialAgenceState: AgenceState = agenceEntityAdapter.getInitialState({
  // additional entity state properties
  isLoading: false,
  isLoadingSpinner: false,
  isLoaded: false,
  search: ''
});

export function reducer(state = initialAgenceState, action: AgenceActions): AgenceState {
  switch (action.type) {
    case AgenceActionTypes.Agencesloading:
      return {
        ...state,
        isLoading: true,
      };
    case AgenceActionTypes.LoadAgencesRequest:
      return {
        ...state,
        search: action.search,
        isLoading: true,
        isLoaded: false
      };
    case AgenceActionTypes.LoadAgencesIsNotLoadedRequest:

      state = {...state, isLoading: !state.isLoaded};
      return {
        ...state
      };
    case AgenceActionTypes.LoadAgencesSuccess:
      // state = agenceEntityAdapter.removeAll(state);
      state = agenceEntityAdapter.addAll(action.payload.agence, state);
      return {
        ...state,
        isLoading: false,
        isLoaded: true
      };
    case AgenceActionTypes.LoadAgencesFailed:
      return {
        ...state,
        isLoading: false,
        isLoaded: false
      };
    case AgenceActionTypes.UpdateAgenceRequest:
      return {
        ...state,
        isLoadingSpinner: true
      };
    case AgenceActionTypes.UpdateAgenceSuccess:
      state = agenceEntityAdapter.updateOne({
        id: action.payload.agence.id,
        changes: {...action.payload.agence}
      }, state);
      return {
        ...state,
        isLoadingSpinner: false
      };
    case AgenceActionTypes.UpdateAgenceFailed:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case AgenceActionTypes.SaveAgenceRequest:
      return {
        ...state,
        isLoadingSpinner: true
      };
    case AgenceActionTypes.SaveAgenceSuccess:
      state = agenceEntityAdapter.addOne(action.payload.agence, state);
      return {
        ...state,
        isLoadingSpinner: false
      };
    case AgenceActionTypes.SaveAgenceFailed:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case AgenceActionTypes.DeleteAgenceRequest:
      return {
        ...state,
        selectedId: action.payload.id,
        isLoading: true
      };
    case AgenceActionTypes.DeleteAgenceSuccess:
      state = agenceEntityAdapter.removeOne(state.selectedId, state);
      return {
        ...state,
        selectedId: 0,
        isLoading: false
      };
    case AgenceActionTypes.DeleteAgenceFailed:
      return {
        ...state,
        selectedId: 0,
        isLoading: false
      };
    case AgenceActionTypes.LoadOneAgenceRequest:
      return {
        ...state,
        selectedId: action.payload.id,
        isLoadingSpinner: true
      };
    case AgenceActionTypes.LoadOneAgenceSuccess:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case AgenceActionTypes.LoadOneAgenceFailed:
      return {
        ...state,
        isLoadingSpinner: false
      };
    default:
      return state;
  }
}
