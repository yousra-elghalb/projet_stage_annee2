import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {isUndefined} from 'util';
import {PaginatorInformations} from '../../../../shared_models/paginator-informations';
import {PGroupe} from '../model/p-groupe';
import {PGroupeActions, PGroupeActionTypes} from './p-groupe.actions';

export interface PGroupeState extends EntityState<PGroupe> {
  paginatorInformations: PaginatorInformations;
  isLoading: boolean;
  isLoaded: boolean;
  selectedId?: number;
  selectedOffreVoyageId?: number;
  selectedPGroupe?: PGroupe;
  search: {
    search: string,
    ville?: string,
    modalites?: [],
    etat?: string,
    type?: string,
  };
  isLoadingSpinner: boolean;
}

export const pGroupeEntityAdapter: EntityAdapter<PGroupe> = createEntityAdapter<PGroupe>({selectId: data => data.id});


export const initialPGroupeState: PGroupeState = pGroupeEntityAdapter.getInitialState({
  // additional entity state properties
  paginatorInformations: {total: 0, per_page: 15, current_page: 1},
  isLoading: false,
  isLoadingSpinner: false,
  isLoaded: false,
  search: {search: ''},
  selectedPGroupe: null
});

export function reducer(state = initialPGroupeState, action: PGroupeActions): PGroupeState {
  switch (action.type) {
    case PGroupeActionTypes.LoadPGroupesRequest:
      return {
        ...state,
        search: action.search,
        isLoading: true,
        isLoaded: false
      };
    case PGroupeActionTypes.LoadPGroupesBySameOfOffreVoyageRequest:
      return {
        ...state,
        isLoading: true,
        isLoaded: false
      };
    case PGroupeActionTypes.LoadPGroupesSuccess:
      let pi: any;
      pi = {...action.payload.paginatedResults};
      pi.data = null;
      state = pGroupeEntityAdapter.addAll(action.payload.paginatedResults.data, state);
      return {
        ...state,
        paginatorInformations: pi,
        selectedOffreVoyageId: action.payload.idOffreVoyage,
        isLoading: false,
        isLoaded: true
      };
    case PGroupeActionTypes.LoadPGroupesFailed:
      return {
        ...state,
        isLoading: false,
        isLoaded: false
      };
    case PGroupeActionTypes.UpdatePGroupeRequest:
      return {
        ...state,
        isLoadingSpinner: true
      };
    case PGroupeActionTypes.UpdatePGroupeSuccess:
      if (state.selectedOffreVoyageId && state.selectedOffreVoyageId.toString() === action.payload.pGroupe.offre_voyage_id.toString()) {
        state = pGroupeEntityAdapter.updateOne({
          id: action.payload.pGroupe.id,
          changes: {...action.payload.pGroupe}
        }, state);
      }
      return {
        ...state,
        isLoadingSpinner: false
      };
    case PGroupeActionTypes.UpdatePGroupeFailed:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case PGroupeActionTypes.SavePGroupeRequest:
      return {
        ...state,
        isLoadingSpinner: true
      };
    case PGroupeActionTypes.SavePGroupeSuccess:
      if (state.selectedOffreVoyageId === action.payload.pGroupe.offre_voyage_id) {
        state = pGroupeEntityAdapter.addOne(action.payload.pGroupe, state);
      }
      return {
        ...state,
        isLoadingSpinner: false
      };
    case PGroupeActionTypes.SavePGroupeFailed:
      return {
        ...state,
        isLoadingSpinner: false
      };

    case PGroupeActionTypes.SavePGroupeFactureRequest:
      return {
        ...state,
        isLoadingSpinner: true
      };
    case PGroupeActionTypes.SavePGroupeFactureSuccess:
      state = pGroupeEntityAdapter.updateOne({
        id: action.payload.id,
        changes: {paiement: action.payload.paiement}
      }, state);
      return {
        ...state,
        isLoadingSpinner: false
      };
    case PGroupeActionTypes.SavePGroupeFactureFailed:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case PGroupeActionTypes.DeletePGroupeRequest:
      return {
        ...state,
        selectedId: action.payload.id,
        isLoading: true
      };
    case PGroupeActionTypes.DeletePGroupeSuccess:
      state = pGroupeEntityAdapter.removeOne(state.selectedId, state);
      return {
        ...state,
        selectedId: 0,
        isLoading: false,
        paginatorInformations: {
          ...state.paginatorInformations,
          total: state.paginatorInformations.total - 1
        }
      };
    case PGroupeActionTypes.DeletePGroupeFailed:
      return {
        ...state,
        selectedId: 0,
        isLoading: false
      };
    case PGroupeActionTypes.LoadOnePGroupeRequest:
      return {
        ...state,
        isLoading: true,
      };
    case PGroupeActionTypes.LoadOnePGroupeSuccess:
      return {
        ...state,
        selectedId: action.payload.id,
        selectedPGroupe: action.payload.pGroupe,
        isLoading: false
      };
    case PGroupeActionTypes.LoadOnePGroupeFailed:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
}
