import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {OffreVoyageLimited} from '../model/offre-voyage-limited';
import {OffreVoyageLimitedActions, OffreVoyageLimitedActionTypes} from './offre-voyage-limited.actions';
import {PaginatorInformations} from '../../../shared_models/paginator-informations';
import {voyageurEntityAdapter} from '../../voyageur/store/voyageur.reducer';

export interface OffreVoyageLimitedState extends EntityState<OffreVoyageLimited> {
  paginatorInformations: PaginatorInformations;
  isLoading: boolean;
  isLoaded: boolean;
  selectedId?: number;
  search: string;
  isLoadingSpinner: boolean;
  selectedChipsOffreVoyageLimited: OffreVoyageLimited [];
}

// tslint:disable-next-line:max-line-length
export const offreVoyageLimitedEntityAdapter: EntityAdapter<OffreVoyageLimited> = createEntityAdapter<OffreVoyageLimited>({selectId: data => data.id});


export const initialOffreVoyageLimitedState: OffreVoyageLimitedState = offreVoyageLimitedEntityAdapter.getInitialState({
  // additional entity state properties
  paginatorInformations: {total: 0, per_page: 15, current_page: 1},
  isLoading: false,
  isLoadingSpinner: false,
  isLoaded: false,
  search: '',
  selectedChipsOffreVoyageLimited: [],

});

export function reducer(state = initialOffreVoyageLimitedState, action: OffreVoyageLimitedActions): OffreVoyageLimitedState {
  switch (action.type) {
    case OffreVoyageLimitedActionTypes.LoadOffreVoyageLimitedsRequest:
      return {
        ...state,
        search: action.search,
        isLoading: true,
        isLoaded: false
      };
    case OffreVoyageLimitedActionTypes.LoadOffreVoyageLimitedByOffreVoyageIdsRequest:
      return {
        ...state,
        isLoading: true,
        isLoaded: false
      };
    case OffreVoyageLimitedActionTypes.LoadOffreVoyageLimitedsSuccess:
      let pi: any;
      pi = {...action.payload.paginatedResults};
      pi.data = null;
      state = offreVoyageLimitedEntityAdapter.addAll(action.payload.paginatedResults.data, state);
      return {
        ...state,
        paginatorInformations: pi,
        isLoading: false,
        isLoaded: true
      };
    case OffreVoyageLimitedActionTypes.LoadOffreVoyageLimitedsFailed:
      return {
        ...state,
        isLoading: false,
        isLoaded: false
      };
    case OffreVoyageLimitedActionTypes.UpdateOffreVoyageLimitedRequest:
      return {
        ...state,
        isLoadingSpinner: true
      };
    case OffreVoyageLimitedActionTypes.UpdateOffreVoyageLimitedSuccess:
      state = offreVoyageLimitedEntityAdapter.updateOne({
        id: action.payload.offreVoyageLimited.id,
        changes: {...action.payload.offreVoyageLimited}
      }, state);
      return {
        ...state,
        isLoadingSpinner: false
      };
    case OffreVoyageLimitedActionTypes.UpdateOffreVoyageLimitedFailed:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case OffreVoyageLimitedActionTypes.SaveOffreVoyageLimitedRequest:
      return {
        ...state,
        isLoadingSpinner: true
      };
    case OffreVoyageLimitedActionTypes.SaveOffreVoyageLimitedSuccess:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case OffreVoyageLimitedActionTypes.SaveOffreVoyageLimitedFailed:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case OffreVoyageLimitedActionTypes.DeleteOffreVoyageLimitedRequest:
      return {
        ...state,
        selectedId: action.payload.id,
        isLoading: true
      };
    case OffreVoyageLimitedActionTypes.DeleteOffreVoyageLimitedSuccess:
      state = offreVoyageLimitedEntityAdapter.removeOne(state.selectedId, state);
      return {
        ...state,
        selectedId: 0,
        isLoading: false,
        paginatorInformations: {
          ...state.paginatorInformations,
          total: state.paginatorInformations.total - 1
        }
      };
    case OffreVoyageLimitedActionTypes.DeleteOffreVoyageLimitedFailed:
      return {
        ...state,
        selectedId: 0,
        isLoading: false
      };
    case OffreVoyageLimitedActionTypes.LoadOneOffreVoyageLimitedRequest:
      return {
        ...state,
        selectedId: action.payload.id,
        isLoadingSpinner: true
      };
    case OffreVoyageLimitedActionTypes.LoadOneOffreVoyageLimitedSuccess:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case OffreVoyageLimitedActionTypes.LoadOneOffreVoyageLimitedFailed:
      return {
        ...state,
        isLoadingSpinner: false
      };
    default:
      return state;
  }
}
