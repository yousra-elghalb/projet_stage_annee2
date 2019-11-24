import {ChauffeurActions, ChauffeurActionTypes} from './chauffeur.actions';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Chauffeur} from '../model/chauffeur';
import {PaginatorInformations} from '../../../shared_models/paginator-informations';
import {isUndefined} from 'util';

export interface ChauffeurState extends EntityState<Chauffeur> {
  isLoading: boolean;
  isLoaded: boolean;
  selectedId?: number;
  search: string;
  isLoadingSpinner: boolean;
}

export const chauffeurEntityAdapter: EntityAdapter<Chauffeur> = createEntityAdapter<Chauffeur>({selectId: data => data.id});


export const initialChauffeurState: ChauffeurState = chauffeurEntityAdapter.getInitialState({
  // additional entity state properties
  isLoading: false,
  isLoadingSpinner: false,
  isLoaded: false,
  search: ''
});

export function reducer(state = initialChauffeurState, action: ChauffeurActions): ChauffeurState {
  switch (action.type) {
    case ChauffeurActionTypes.LoadChauffeursRequest:
      return {
        ...state,
        search: action.search,
        isLoading: true,
        isLoaded: false
      };
    case ChauffeurActionTypes.LoadChauffeursIsNotLoadedRequest:

      state = {...state, isLoading: !state.isLoaded};
      return {
        ...state
      };
    case ChauffeurActionTypes.Chauffeursloading:

      state = {...state, isLoading: true};
      return {
        ...state
      };
    case ChauffeurActionTypes.LoadChauffeursSuccess:
      // state = chauffeurEntityAdapter.removeAll(state);
      state = chauffeurEntityAdapter.addAll(action.payload.chauffeur, state);
      return {
        ...state,
        isLoading: false,
        isLoaded: true
      };
    case ChauffeurActionTypes.LoadChauffeursFailed:
      return {
        ...state,
        isLoading: false,
        isLoaded: false
      };
    case ChauffeurActionTypes.UpdateChauffeurRequest:
      return {
        ...state,
        isLoadingSpinner: true
      };
    case ChauffeurActionTypes.UpdateChauffeurSuccess:
      state = chauffeurEntityAdapter.updateOne({
        id: action.payload.chauffeur.id,
        changes: {...action.payload.chauffeur}
      }, state);
      return {
        ...state,
        isLoadingSpinner: false
      };
    case ChauffeurActionTypes.UpdateChauffeurFailed:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case ChauffeurActionTypes.SaveChauffeurRequest:
      return {
        ...state,
        isLoadingSpinner: true
      };
    case ChauffeurActionTypes.SaveChauffeurSuccess:
      state = chauffeurEntityAdapter.addOne(action.payload.chauffeur, state);
      return {
        ...state,
        isLoadingSpinner: false
      };
    case ChauffeurActionTypes.SaveChauffeurFailed:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case ChauffeurActionTypes.DeleteChauffeurRequest:
      return {
        ...state,
        selectedId: action.payload.id,
        isLoading: true
      };
    case ChauffeurActionTypes.DeleteChauffeurSuccess:
      state = chauffeurEntityAdapter.removeOne(state.selectedId, state);
      return {
        ...state,
        selectedId: 0,
        isLoading: false
      };
    case ChauffeurActionTypes.DeleteChauffeurFailed:
      return {
        ...state,
        selectedId: 0,
        isLoading: false
      };
    case ChauffeurActionTypes.LoadOneChauffeurRequest:
      return {
        ...state,
        selectedId: action.payload.id,
        isLoadingSpinner: true
      };
    case ChauffeurActionTypes.LoadOneChauffeurSuccess:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case ChauffeurActionTypes.LoadOneChauffeurFailed:
      return {
        ...state,
        isLoadingSpinner: false
      };
    default:
      return state;
  }
}
