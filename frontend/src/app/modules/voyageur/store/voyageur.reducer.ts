import {VoyageurActions, VoyageurActionTypes} from './voyageur.actions';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Voyageur} from '../model/voyageur';
import {PaginatorInformations} from '../../../shared_models/paginator-informations';
import {isUndefined} from 'util';

export interface VoyageurState extends EntityState<Voyageur> {
  paginatorInformations: PaginatorInformations;
  isLoading: boolean;
  isLoaded: boolean;
  selectedId?: number;
  search: string;
  isLoadingSpinner: boolean;
  fidele: number;
}

export const voyageurEntityAdapter: EntityAdapter<Voyageur> = createEntityAdapter<Voyageur>({selectId: data => data.id});


export const initialVoyageurState: VoyageurState = voyageurEntityAdapter.getInitialState({
    // additional entity state properties
    paginatorInformations: {total: 0, per_page: 15, current_page: 1},
    isLoading: false,
    isLoadingSpinner: false,
    isLoaded: false,
    search: '',
    fidele: 2
  })
;

export function reducer(state = initialVoyageurState, action: VoyageurActions): VoyageurState {
  switch (action.type) {
    case VoyageurActionTypes.LoadVoyageursRequest:
      return {
        ...state,
        search: action.search,
        isLoading: true,
        isLoaded: false
      };
    case VoyageurActionTypes.Voyageursloading:
      return {
        ...state,
        isLoading: true,
      };
    case VoyageurActionTypes.LoadVoyageursIsNotLoadedRequest:

      state = {...state, isLoading: !state.isLoaded};
      return {
        ...state
      };
    case VoyageurActionTypes.LoadVoyageursSuccess:
      let pi: any;
      pi = {...action.payload.paginatedResults};
      pi.data = null;
      state = voyageurEntityAdapter.addAll(action.payload.paginatedResults.data, state);
      return {
        ...state,
        paginatorInformations: pi,
        fidele: action.payload.fidele,
        isLoading: false,
        isLoaded: true
      };
    case VoyageurActionTypes.LoadVoyageursFailed:
      return {
        ...state,
        isLoading: false,
        isLoaded: false
      };
    case VoyageurActionTypes.UpdateVoyageurRequest:
      return {
        ...state,
        isLoadingSpinner: true
      };
    case VoyageurActionTypes.UpdateVoyageurSuccess:
      state = voyageurEntityAdapter.updateOne({
        id: action.payload.voyageur.id,
        changes: {...action.payload.voyageur}
      }, state);
      return {
        ...state,
        isLoadingSpinner: false
      };
    case VoyageurActionTypes.UpdateVoyageurFailed:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case VoyageurActionTypes.SaveVoyageurRequest:
      return {
        ...state,
        isLoadingSpinner: true
      };
    case VoyageurActionTypes.SaveVoyageurSuccess:
      state = voyageurEntityAdapter.addOne(action.payload.voyageur, state);
      return {
        ...state,
        isLoadingSpinner: false
      };
    case VoyageurActionTypes.SaveVoyageurFailed:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case VoyageurActionTypes.DeleteVoyageurRequest:
      return {
        ...state,
        selectedId: action.payload.id,
        isLoading: true
      };
    case VoyageurActionTypes.DeleteVoyageurSuccess:
      state = voyageurEntityAdapter.removeOne(state.selectedId, state);
      return {
        ...state,
        selectedId: 0,
        isLoading: false,
        paginatorInformations: {
          ...state.paginatorInformations,
          total: state.paginatorInformations.total - 1
        }
      };
    case VoyageurActionTypes.DeleteVoyageurFailed:
      return {
        ...state,
        selectedId: 0,
        isLoading: false
      };
    case VoyageurActionTypes.LoadOneVoyageurRequest:
      return {
        ...state,
        selectedId: action.payload.id,
        isLoadingSpinner: true
      };
    case VoyageurActionTypes.LoadOneVoyageurSuccess:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case VoyageurActionTypes.LoadOneVoyageurFailed:
      return {
        ...state,
        isLoadingSpinner: false
      };
    default:
      return state;
  }
}
