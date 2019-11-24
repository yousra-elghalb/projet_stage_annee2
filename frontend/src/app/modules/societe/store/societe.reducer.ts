import {SocieteActions, SocieteActionTypes, SetAndIsLoadingSociete} from './societe.actions';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Societe} from '../model/societe';
import {PaginatorInformations} from '../../../shared_models/paginator-informations';
import {isUndefined} from 'util';

export interface SocieteState extends EntityState<Societe> {
  isLoading: boolean;
  isLoaded: boolean;
  selectedId?: number;
  search: string;
  isLoadingSpinner: boolean;
}

export const societeEntityAdapter: EntityAdapter<Societe> = createEntityAdapter<Societe>({selectId: data => data.id});


export const initialSocieteState: SocieteState = societeEntityAdapter.getInitialState({
  // additional entity state properties
  isLoading: false,
  isLoadingSpinner: false,
  isLoaded: false,
  search: ''
});

export function reducer(state = initialSocieteState, action: SocieteActions): SocieteState {
  switch (action.type) {
    case SocieteActionTypes.LoadSocietesRequest:
      return {
        ...state,
        search: action.search,
        isLoading: true,
        isLoaded: false
      };
    case SocieteActionTypes.LoadSocietesIsNotLoadedRequest:

      state = {...state, isLoading: !state.isLoaded};
      return {
        ...state
      };
    case SocieteActionTypes.SetIsLoadingSociete:

      return {
        isLoading: action.payload.isLoading,
        ...state
      };
    case SocieteActionTypes.LoadSocietesSuccess:
      // state = societeEntityAdapter.removeAll(state);
      state = societeEntityAdapter.addAll(action.payload.societe, state);
      return {
        ...state,
        isLoading: false,
        isLoaded: true
      };
    case SocieteActionTypes.LoadSocietesFailed:
      return {
        ...state,
        isLoading: false,
        isLoaded: false
      };
    case SocieteActionTypes.UpdateSocieteRequest:
      return {
        ...state,
        isLoadingSpinner: true
      };
    case SocieteActionTypes.UpdateSocieteSuccess:
      state = societeEntityAdapter.updateOne({
        id: action.payload.societe.id,
        changes: {...action.payload.societe}
      }, state);
      return {
        ...state,
        isLoadingSpinner: false
      };
    case SocieteActionTypes.UpdateSocieteFailed:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case SocieteActionTypes.SaveSocieteRequest:
      return {
        ...state,
        isLoadingSpinner: true
      };
    case SocieteActionTypes.SaveSocieteSuccess:
      state = societeEntityAdapter.addOne(action.payload.societe, state);
      return {
        ...state,
        isLoadingSpinner: false
      };
    case SocieteActionTypes.SaveSocieteFailed:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case SocieteActionTypes.DeleteSocieteRequest:
      return {
        ...state,
        selectedId: action.payload.id,
        isLoading: true
      };
    case SocieteActionTypes.DeleteSocieteSuccess:
      state = societeEntityAdapter.removeOne(state.selectedId, state);
      return {
        ...state,
        selectedId: 0,
        isLoading: false
      };
    case SocieteActionTypes.DeleteSocieteFailed:
      return {
        ...state,
        selectedId: 0,
        isLoading: false
      };
    case SocieteActionTypes.LoadOneSocieteRequest:
      return {
        ...state,
        selectedId: action.payload.id,
        isLoadingSpinner: true
      };
    case SocieteActionTypes.LoadOneSocieteSuccess:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case SocieteActionTypes.LoadOneSocieteFailed:
      return {
        ...state,
        isLoadingSpinner: false
      };
    default:
      return state;
  }
}
