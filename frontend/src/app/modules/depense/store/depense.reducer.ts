import {DepenseActions, DepenseActionTypes, SetAndIsLoadingDepense} from './depense.actions';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Depense} from '../model/depense';
import {PaginatorInformations} from '../../../shared_models/paginator-informations';
import {isUndefined} from 'util';

export interface DepenseState extends EntityState<Depense> {
  isLoading: boolean;
  isLoaded: boolean;
  selectedId?: number;
  search: string;
  isLoadingSpinner: boolean;
}

export const depenseEntityAdapter: EntityAdapter<Depense> = createEntityAdapter<Depense>({selectId: data => data.id});


export const initialDepenseState: DepenseState = depenseEntityAdapter.getInitialState({
  // additional entity state properties
  isLoading: false,
  isLoadingSpinner: false,
  isLoaded: false,
  search: ''
});

export function reducer(state = initialDepenseState, action: DepenseActions): DepenseState {
  switch (action.type) {
    case DepenseActionTypes.LoadDepensesRequest:
      return {
        ...state,
        search: action.search,
        isLoading: true,
        isLoaded: false
      };
    case DepenseActionTypes.LoadDepensesIsNotLoadedRequest:

      state = {...state, isLoading: !state.isLoaded};
      return {
        ...state
      };
    case DepenseActionTypes.SetIsLoadingDepense:

      return {
        isLoading: action.payload.isLoading,
        ...state
      };
    case DepenseActionTypes.LoadDepensesSuccess:
      // state = depenseEntityAdapter.removeAll(state);
      state = depenseEntityAdapter.addAll(action.payload.depense, state);
      return {
        ...state,
        isLoading: false,
        isLoaded: true
      };
    case DepenseActionTypes.LoadDepensesFailed:
      return {
        ...state,
        isLoading: false,
        isLoaded: false
      };
    case DepenseActionTypes.UpdateDepenseRequest:
      return {
        ...state,
        isLoadingSpinner: true
      };
    case DepenseActionTypes.UpdateDepenseSuccess:
      state = depenseEntityAdapter.updateOne({
        id: action.payload.depense.id,
        changes: {...action.payload.depense}
      }, state);
      return {
        ...state,
        isLoadingSpinner: false
      };
    case DepenseActionTypes.UpdateDepenseFailed:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case DepenseActionTypes.SaveDepenseRequest:
      return {
        ...state,
        isLoadingSpinner: true
      };
    case DepenseActionTypes.SaveDepenseSuccess:
      state = depenseEntityAdapter.addOne(action.payload.depense, state);
      return {
        ...state,
        isLoadingSpinner: false
      };
    case DepenseActionTypes.SaveDepenseFailed:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case DepenseActionTypes.DeleteDepenseRequest:
      return {
        ...state,
        selectedId: action.payload.id,
        isLoading: true
      };
    case DepenseActionTypes.DeleteDepenseSuccess:
      state = depenseEntityAdapter.removeOne(state.selectedId, state);
      return {
        ...state,
        selectedId: 0,
        isLoading: false
      };
    case DepenseActionTypes.DeleteDepenseFailed:
      return {
        ...state,
        selectedId: 0,
        isLoading: false
      };
    case DepenseActionTypes.LoadOneDepenseRequest:
      return {
        ...state,
        selectedId: action.payload.id,
        isLoadingSpinner: true
      };
    case DepenseActionTypes.LoadOneDepenseSuccess:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case DepenseActionTypes.LoadOneDepenseFailed:
      return {
        ...state,
        isLoadingSpinner: false
      };
    default:
      return state;
  }
}
