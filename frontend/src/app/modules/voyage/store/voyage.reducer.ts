import {VoyageActions, VoyageActionTypes} from './voyage.actions';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Voyage} from '../model/voyage';
import {PaginatorInformations} from '../../../shared_models/paginator-informations';

export interface VoyageState extends EntityState<Voyage> {
  paginatorInformations: PaginatorInformations;
  isLoading: boolean;
  isLoaded: boolean;
  selectedId?: number;
  search: string;
  isLoadingSpinner: boolean;
}

export const voyageEntityAdapter: EntityAdapter<Voyage> = createEntityAdapter<Voyage>({selectId: data => data.id});


export const initialVoyageState: VoyageState = voyageEntityAdapter.getInitialState({
  // additional entity state properties
  paginatorInformations: {total: 0, per_page: 15, current_page: 1},
  isLoading: false,
  isLoadingSpinner: false,
  isLoaded: false,
  search: ''
});

export function reducer(state = initialVoyageState, action: VoyageActions): VoyageState {
  switch (action.type) {
    case VoyageActionTypes.LoadVoyagesRequest:
      return {
        ...state,
        search: action.search,
        isLoading: true,
        isLoaded: false
      };
    case VoyageActionTypes.LoadVoyagesIsNotLoadedRequest:

      state = {...state, isLoading: !state.isLoaded};
      return {
        ...state
      };
    case VoyageActionTypes.LoadVoyagesSuccess:
      let pi: any;
      pi = {...action.payload.paginatedResults};
      pi.data = null;
      state = voyageEntityAdapter.addAll(action.payload.paginatedResults.data, state);
      return {
        ...state,
        paginatorInformations: pi,
        isLoading: false,
        isLoaded: true
      };
    case VoyageActionTypes.LoadVoyagesFailed:
      return {
        ...state,
        isLoading: false,
        isLoaded: false
      };
    case VoyageActionTypes.UpdateVoyageRequest:
      return {
        ...state,
        isLoadingSpinner: true
      };
    case VoyageActionTypes.UpdateVoyageSuccess:
      state = voyageEntityAdapter.updateOne({
        id: action.payload.voyage.id,
        changes: {...action.payload.voyage}
      }, state);
      return {
        ...state,
        isLoadingSpinner: false
      };
    case VoyageActionTypes.UpdateVoyageFailed:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case VoyageActionTypes.SaveVoyageRequest:
      return {
        ...state,
        isLoadingSpinner: true
      };
    case VoyageActionTypes.SaveVoyageSuccess:
      state = voyageEntityAdapter.addOne(action.payload.voyage, state);
      return {
        ...state,
        isLoadingSpinner: false
      };
    case VoyageActionTypes.SaveVoyageFailed:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case VoyageActionTypes.DeleteVoyageRequest:
      return {
        ...state,
        selectedId: action.payload.id,
        isLoading: true
      };
    case VoyageActionTypes.DeleteVoyageSuccess:
      state = voyageEntityAdapter.removeOne(state.selectedId, state);
      return {
        ...state,
        selectedId: 0,
        isLoading: false,
        paginatorInformations: {
          ...state.paginatorInformations,
          total: state.paginatorInformations.total - 1
        }
      };
    case VoyageActionTypes.DeleteVoyageFailed:
      return {
        ...state,
        selectedId: 0,
        isLoading: false
      };
    case VoyageActionTypes.LoadOneVoyageRequest:
      return {
        ...state,
        selectedId: action.payload.id,
        isLoadingSpinner: true
      };
    case VoyageActionTypes.LoadOneVoyageSuccess:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case VoyageActionTypes.LoadOneVoyageFailed:
      return {
        ...state,
        isLoadingSpinner: false
      };
    default:
      return state;
  }
}
