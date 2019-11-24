import {SGroupe} from '../model/s-groupe';
import {SGroupeActions, SGroupeActionTypes} from './s-groupe.actions';
import {pGroupeEntityAdapter} from '../../pgroupe/store/p-groupe.reducer';

export interface SGroupeState {
  sGroupe: SGroupe;
  isLoading: boolean;
  isLoaded: boolean;
  selectedId?: number;
  selectedOffreVoyageId?: number;
  isLoadingSpinner: boolean;
}


export const initialSGroupeState: SGroupeState = {
  // additional entity state properties
  isLoading: false,
  isLoadingSpinner: false,
  isLoaded: false,
  sGroupe: null
};

export function reducer(state = initialSGroupeState, action: SGroupeActions): SGroupeState {
  switch (action.type) {
    case SGroupeActionTypes.LoadSGroupesByOffreVoyageId:
      return {
        ...state,
        isLoading: action.idOffreVoyage !== state.selectedOffreVoyageId,
        isLoaded: false
      };
    case SGroupeActionTypes.LoadSGroupesSuccess:
      return {
        ...state,
        sGroupe: action.payload.sGroupe,
        selectedOffreVoyageId: action.payload.idOffreVoyage,
        isLoading: false,
        isLoaded: true
      };
    case SGroupeActionTypes.LoadSGroupesFailed:
      return {
        ...state,
        isLoading: false,
        isLoaded: false
      };
    case SGroupeActionTypes.UpdateSGroupeRequest:
      return {
        ...state,
        isLoadingSpinner: true
      };
    case SGroupeActionTypes.UpdateSGroupeSuccess:

      return {
        ...state,
        sGroupe: action.payload.sGroupe,
        isLoadingSpinner: false
      };
    case SGroupeActionTypes.UpdateSGroupeFailed:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case SGroupeActionTypes.SaveSGroupeRequest:
      return {
        ...state,
        isLoadingSpinner: true
      };
    case SGroupeActionTypes.SaveSGroupeSuccess:
      return {
        ...state,
        sGroupe: action.payload.sGroupe,
        isLoadingSpinner: false
      };
    case SGroupeActionTypes.SaveSGroupeFailed:
      return {
        ...state,
        isLoadingSpinner: false
      };

    case SGroupeActionTypes.SaveSGroupeFactureRequest:
      return {
        ...state,
        isLoadingSpinner: true
      };
    case SGroupeActionTypes.SaveSGroupeFactureSuccess:
      const g: SGroupe = {...state.sGroupe, paiement: action.payload.paiement};
      return {
        ...state,
        sGroupe: g,
        isLoadingSpinner: false
      };
    case SGroupeActionTypes.SaveSGroupeFactureFailed:
      return {
        ...state,
        isLoadingSpinner: false
      };

    case SGroupeActionTypes.DeleteSGroupeRequest:
      return {
        ...state,
        selectedId: action.payload.id,
        isLoading: true
      };
    case SGroupeActionTypes.DeleteSGroupeSuccess:
      return {
        ...state,
        sGroupe: null,
        selectedId: 0,
        isLoading: false,
      };
    case SGroupeActionTypes.DeleteSGroupeFailed:
      return {
        ...state,
        selectedId: 0,
        isLoading: false
      };
    case SGroupeActionTypes.LoadOneSGroupeRequest:
      return {
        ...state,
        isLoading: true
      };
    case SGroupeActionTypes.LoadOneSGroupeSuccess:
      return {
        ...state,
        selectedId: action.payload.id,
        sGroupe: action.payload.sGroupe,
        isLoading: false
      };
    case SGroupeActionTypes.LoadOneSGroupeFailed:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
}
