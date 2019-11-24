import {VilleActions, VilleActionTypes} from './ville.actions';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Ville} from '../model/ville';

export interface VilleState extends EntityState<Ville> {
  isLoading: boolean;
  isLoaded: boolean;
  selectedId?: number;
  search: string;
  isLoadingSpinner: boolean;
  selectedChipsVille: Ville [];
}

export const villeEntityAdapter: EntityAdapter<Ville> = createEntityAdapter<Ville>({selectId: data => data.id});


export const initialVilleState: VilleState = villeEntityAdapter.getInitialState({
  // additional entity state properties
  isLoading: false,
  isLoadingSpinner: false,
  isLoaded: false,
  search: '',
  selectedChipsVille: [],

});

export function reducer(state = initialVilleState, action: VilleActions): VilleState {
  switch (action.type) {
    case VilleActionTypes.LoadVillesRequest:
      return {
        ...state,
        search: action.search,
        isLoading: true,
        isLoaded: false
      };
    case VilleActionTypes.LoadVillesIsNotLoadedRequest:

      state = {...state, isLoading: !state.isLoaded};
      return {
        ...state
      };
    case VilleActionTypes.LoadVillesSuccess:
      // state = villeEntityAdapter.removeAll(state);
      state = villeEntityAdapter.addAll(action.payload.ville, state);
      return {
        ...state,
        isLoading: false,
        isLoaded: true
      };
    case VilleActionTypes.LoadVillesFailed:
      return {
        ...state,
        isLoading: false,
        isLoaded: false
      };
    case VilleActionTypes.UpdateVilleRequest:
      return {
        ...state,
        isLoadingSpinner: true
      };
    case VilleActionTypes.UpdateVilleSuccess:
      state = villeEntityAdapter.updateOne({
        id: action.payload.ville.id,
        changes: {...action.payload.ville}
      }, state);
      return {
        ...state,
        isLoadingSpinner: false
      };
    case VilleActionTypes.UpdateVilleFailed:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case VilleActionTypes.SaveVilleRequest:
      return {
        ...state,
        isLoadingSpinner: true
      };
    case VilleActionTypes.SaveVilleSuccess:
      state = villeEntityAdapter.addOne(action.payload.ville, state);
      return {
        ...state,
        isLoadingSpinner: false
      };
    case VilleActionTypes.SaveVilleFailed:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case VilleActionTypes.DeleteVilleRequest:
      return {
        ...state,
        selectedId: action.payload.id,
        isLoading: true
      };
    case VilleActionTypes.DeleteVilleSuccess:
      state = villeEntityAdapter.removeOne(state.selectedId, state);
      return {
        ...state,
        selectedId: 0,
        isLoading: false
      };
    case VilleActionTypes.DeleteVilleFailed:
      return {
        ...state,
        selectedId: 0,
        isLoading: false
      };
    case VilleActionTypes.LoadOneVilleRequest:
      return {
        ...state,
        selectedId: action.payload.id,
        isLoadingSpinner: true
      };
    case VilleActionTypes.LoadOneVilleSuccess:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case VilleActionTypes.LoadOneVilleFailed:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case VilleActionTypes.AddChipsVilles:
      const v = [...state.selectedChipsVille, action.payload.ville];
      return {
        ...state,
        selectedChipsVille: v
      };
    case VilleActionTypes.AddAllChipsVilles:
      return {
        ...state,
        selectedChipsVille: action.payload.villes
      };
    case VilleActionTypes.RemoveChipsVilles:
      return {
        ...state,
        selectedChipsVille: state.selectedChipsVille.filter(value => value.id !== action.payload.id)
      };
    default:
      return state;
  }
}
