import {TypeVehiculeActions, TypeVehiculeActionTypes, SetAndIsLoadingTypeVehicule} from './type-vehicule.actions';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {TypeVehicule} from '../model/type-vehicule';
import {PaginatorInformations} from '../../../shared_models/paginator-informations';
import {isUndefined} from 'util';

export interface TypeVehiculeState extends EntityState<TypeVehicule> {
  isLoading: boolean;
  isLoaded: boolean;
  selectedId?: number;
  search: string;
  isLoadingSpinner: boolean;
}

export const typeVehiculeEntityAdapter: EntityAdapter<TypeVehicule> = createEntityAdapter<TypeVehicule>({selectId: data => data.id});


export const initialTypeVehiculeState: TypeVehiculeState = typeVehiculeEntityAdapter.getInitialState({
  // additional entity state properties
  isLoading: false,
  isLoadingSpinner: false,
  isLoaded: false,
  search: ''
});

export function reducer(state = initialTypeVehiculeState, action: TypeVehiculeActions): TypeVehiculeState {
  switch (action.type) {
    case TypeVehiculeActionTypes.LoadTypeVehiculesRequest:
      return {
        ...state,
        search: action.search,
        isLoading: true,
        isLoaded: false
      };
    case TypeVehiculeActionTypes.LoadTypeVehiculesIsNotLoadedRequest:

      state = {...state, isLoading: !state.isLoaded};
      return {
        ...state
      };
    case TypeVehiculeActionTypes.SetIsLoadingTypeVehicule:

      return {
        isLoading: action.payload.isLoading,
        ...state
      };
    case TypeVehiculeActionTypes.LoadTypeVehiculesSuccess:
      // state = typeVehiculeEntityAdapter.removeAll(state);
      state = typeVehiculeEntityAdapter.addAll(action.payload.typeVehicule, state);
      return {
        ...state,
        isLoading: false,
        isLoaded: true
      };
    case TypeVehiculeActionTypes.LoadTypeVehiculesFailed:
      return {
        ...state,
        isLoading: false,
        isLoaded: false
      };
    case TypeVehiculeActionTypes.UpdateTypeVehiculeRequest:
      return {
        ...state,
        isLoadingSpinner: true
      };
    case TypeVehiculeActionTypes.UpdateTypeVehiculeSuccess:
      state = typeVehiculeEntityAdapter.updateOne({
        id: action.payload.typeVehicule.id,
        changes: {...action.payload.typeVehicule}
      }, state);
      return {
        ...state,
        isLoadingSpinner: false
      };
    case TypeVehiculeActionTypes.UpdateTypeVehiculeFailed:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case TypeVehiculeActionTypes.SaveTypeVehiculeRequest:
      return {
        ...state,
        isLoadingSpinner: true
      };
    case TypeVehiculeActionTypes.SaveTypeVehiculeSuccess:
      state = typeVehiculeEntityAdapter.addOne(action.payload.typeVehicule, state);
      return {
        ...state,
        isLoadingSpinner: false
      };
    case TypeVehiculeActionTypes.SaveTypeVehiculeFailed:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case TypeVehiculeActionTypes.DeleteTypeVehiculeRequest:
      return {
        ...state,
        selectedId: action.payload.id,
        isLoading: true
      };
    case TypeVehiculeActionTypes.DeleteTypeVehiculeSuccess:
      state = typeVehiculeEntityAdapter.removeOne(state.selectedId, state);
      return {
        ...state,
        selectedId: 0,
        isLoading: false
      };
    case TypeVehiculeActionTypes.DeleteTypeVehiculeFailed:
      return {
        ...state,
        selectedId: 0,
        isLoading: false
      };
    case TypeVehiculeActionTypes.LoadOneTypeVehiculeRequest:
      return {
        ...state,
        selectedId: action.payload.id,
        isLoadingSpinner: true
      };
    case TypeVehiculeActionTypes.LoadOneTypeVehiculeSuccess:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case TypeVehiculeActionTypes.LoadOneTypeVehiculeFailed:
      return {
        ...state,
        isLoadingSpinner: false
      };
    default:
      return state;
  }
}
