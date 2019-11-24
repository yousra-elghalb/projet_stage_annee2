import {VehiculeActions, VehiculeActionTypes, SetAndIsLoadingVehicule} from './vehicule.actions';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Vehicule} from '../model/vehicule';
import {PaginatorInformations} from '../../../shared_models/paginator-informations';
import {isUndefined} from 'util';

export interface VehiculeState extends EntityState<Vehicule> {
  isLoading: boolean;
  isLoaded: boolean;
  selectedId?: number;
  search: string;
  isLoadingSpinner: boolean;
}

export const vehiculeEntityAdapter: EntityAdapter<Vehicule> = createEntityAdapter<Vehicule>({selectId: data => data.id});


export const initialVehiculeState: VehiculeState = vehiculeEntityAdapter.getInitialState({
  // additional entity state properties
  isLoading: false,
  isLoadingSpinner: false,
  isLoaded: false,
  search: ''
});

export function reducer(state = initialVehiculeState, action: VehiculeActions): VehiculeState {
  switch (action.type) {
    case VehiculeActionTypes.LoadVehiculesRequest:
      return {
        ...state,
        search: action.search,
        isLoading: true,
        isLoaded: false
      };
    case VehiculeActionTypes.LoadVehiculesIsNotLoadedRequest:

      state = {...state, isLoading: !state.isLoaded};
      return {
        ...state
      };
    case VehiculeActionTypes.SetIsLoadingVehicule:

      return {
        isLoading: action.payload.isLoading,
        ...state
      };
    case VehiculeActionTypes.LoadVehiculesSuccess:
      // state = vehiculeEntityAdapter.removeAll(state);
      state = vehiculeEntityAdapter.addAll(action.payload.vehicule, state);
      return {
        ...state,
        isLoading: false,
        isLoaded: true
      };
    case VehiculeActionTypes.LoadVehiculesFailed:
      return {
        ...state,
        isLoading: false,
        isLoaded: false
      };
    case VehiculeActionTypes.UpdateVehiculeRequest:
      return {
        ...state,
        isLoadingSpinner: true
      };
    case VehiculeActionTypes.UpdateVehiculeSuccess:
      state = vehiculeEntityAdapter.updateOne({
        id: action.payload.vehicule.id,
        changes: {...action.payload.vehicule}
      }, state);
      return {
        ...state,
        isLoadingSpinner: false
      };
    case VehiculeActionTypes.UpdateVehiculeFailed:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case VehiculeActionTypes.SaveVehiculeRequest:
      return {
        ...state,
        isLoadingSpinner: true
      };
    case VehiculeActionTypes.SaveVehiculeSuccess:
      state = vehiculeEntityAdapter.addOne(action.payload.vehicule, state);
      return {
        ...state,
        isLoadingSpinner: false
      };
    case VehiculeActionTypes.SaveVehiculeFailed:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case VehiculeActionTypes.DeleteVehiculeRequest:
      return {
        ...state,
        selectedId: action.payload.id,
        isLoading: true
      };
    case VehiculeActionTypes.DeleteVehiculeSuccess:
      state = vehiculeEntityAdapter.removeOne(state.selectedId, state);
      return {
        ...state,
        selectedId: 0,
        isLoading: false
      };
    case VehiculeActionTypes.DeleteVehiculeFailed:
      return {
        ...state,
        selectedId: 0,
        isLoading: false
      };
    case VehiculeActionTypes.LoadOneVehiculeRequest:
      return {
        ...state,
        selectedId: action.payload.id,
        isLoadingSpinner: true
      };
    case VehiculeActionTypes.LoadOneVehiculeSuccess:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case VehiculeActionTypes.LoadOneVehiculeFailed:
      return {
        ...state,
        isLoadingSpinner: false
      };
    default:
      return state;
  }
}
