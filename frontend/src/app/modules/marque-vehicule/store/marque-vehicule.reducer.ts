import {MarqueVehiculeActions, MarqueVehiculeActionMarques, SetAndIsLoadingMarqueVehicule} from './marque-vehicule.actions';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {MarqueVehicule} from '../model/marque-vehicule';

export interface MarqueVehiculeState extends EntityState<MarqueVehicule> {
  isLoading: boolean;
  isLoaded: boolean;
  selectedId?: number;
  search: string;
  isLoadingSpinner: boolean;
}

export const marqueVehiculeEntityAdapter: EntityAdapter<MarqueVehicule> = createEntityAdapter<MarqueVehicule>({selectId: data => data.id});


export const initialMarqueVehiculeState: MarqueVehiculeState = marqueVehiculeEntityAdapter.getInitialState({
  // additional entity state properties
  isLoading: false,
  isLoadingSpinner: false,
  isLoaded: false,
  search: ''
});

export function reducer(state = initialMarqueVehiculeState, action: MarqueVehiculeActions): MarqueVehiculeState {
  switch (action.type) {
    case MarqueVehiculeActionMarques.LoadMarqueVehiculesRequest:
      return {
        ...state,
        search: action.search,
        isLoading: true,
        isLoaded: false
      };
    case MarqueVehiculeActionMarques.LoadMarqueVehiculesIsNotLoadedRequest:

      state = {...state, isLoading: !state.isLoaded};
      return {
        ...state
      };
    case MarqueVehiculeActionMarques.SetIsLoadingMarqueVehicule:

      return {
        isLoading: action.payload.isLoading,
        ...state
      };
    case MarqueVehiculeActionMarques.LoadMarqueVehiculesSuccess:
      // state = marqueVehiculeEntityAdapter.removeAll(state);
      state = marqueVehiculeEntityAdapter.addAll(action.payload.marqueVehicule, state);
      return {
        ...state,
        isLoading: false,
        isLoaded: true
      };
    case MarqueVehiculeActionMarques.LoadMarqueVehiculesFailed:
      return {
        ...state,
        isLoading: false,
        isLoaded: false
      };
    case MarqueVehiculeActionMarques.UpdateMarqueVehiculeRequest:
      return {
        ...state,
        isLoadingSpinner: true
      };
    case MarqueVehiculeActionMarques.UpdateMarqueVehiculeSuccess:
      state = marqueVehiculeEntityAdapter.updateOne({
        id: action.payload.marqueVehicule.id,
        changes: {...action.payload.marqueVehicule}
      }, state);
      return {
        ...state,
        isLoadingSpinner: false
      };
    case MarqueVehiculeActionMarques.UpdateMarqueVehiculeFailed:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case MarqueVehiculeActionMarques.SaveMarqueVehiculeRequest:
      return {
        ...state,
        isLoadingSpinner: true
      };
    case MarqueVehiculeActionMarques.SaveMarqueVehiculeSuccess:
      state = marqueVehiculeEntityAdapter.addOne(action.payload.marqueVehicule, state);
      return {
        ...state,
        isLoadingSpinner: false
      };
    case MarqueVehiculeActionMarques.SaveMarqueVehiculeFailed:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case MarqueVehiculeActionMarques.DeleteMarqueVehiculeRequest:
      return {
        ...state,
        selectedId: action.payload.id,
        isLoading: true
      };
    case MarqueVehiculeActionMarques.DeleteMarqueVehiculeSuccess:
      state = marqueVehiculeEntityAdapter.removeOne(state.selectedId, state);
      return {
        ...state,
        selectedId: 0,
        isLoading: false
      };
    case MarqueVehiculeActionMarques.DeleteMarqueVehiculeFailed:
      return {
        ...state,
        selectedId: 0,
        isLoading: false
      };
    case MarqueVehiculeActionMarques.LoadOneMarqueVehiculeRequest:
      return {
        ...state,
        selectedId: action.payload.id,
        isLoadingSpinner: true
      };
    case MarqueVehiculeActionMarques.LoadOneMarqueVehiculeSuccess:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case MarqueVehiculeActionMarques.LoadOneMarqueVehiculeFailed:
      return {
        ...state,
        isLoadingSpinner: false
      };
    default:
      return state;
  }
}
