import {SousCategorieActions, SousCategorieActionTypes} from './sous-categorie.actions';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {SousCategorie} from '../model/sous-categorie';
import {PaginatorInformations} from '../../../shared_models/paginator-informations';

export interface SousCategorieState extends EntityState<SousCategorie> {
  isLoading: boolean;
  isLoaded: boolean;
  selectedId?: number;
  search: string;
  isLoadingSpinner: boolean;
  selectedChipsSousCategorie: SousCategorie [];
}

export const sousCategorieEntityAdapter: EntityAdapter<SousCategorie> = createEntityAdapter<SousCategorie>({selectId: data => data.id});


export const initialSousCategorieState: SousCategorieState = sousCategorieEntityAdapter.getInitialState({
  // additional entity state properties
  isLoading: false,
  isLoadingSpinner: false,
  isLoaded: false,
  search: '',
  selectedChipsSousCategorie: []
});

export function reducer(state = initialSousCategorieState, action: SousCategorieActions): SousCategorieState {
  switch (action.type) {
    case SousCategorieActionTypes.LoadSousCategoriesRequest:
      return {
        ...state,
        search: action.search,
        isLoading: true,
        isLoaded: false
      };
    case SousCategorieActionTypes.LoadSousCategoriesIsNotLoadedRequest:

      state = {...state, isLoading: !state.isLoaded};
      return {
        ...state
      };
    case SousCategorieActionTypes.LoadSousCategoriesSuccess:
      state = sousCategorieEntityAdapter.addAll(action.payload.sousCategories, state);
      return {
        ...state,
        isLoading: false,
        isLoaded: true
      };
    case SousCategorieActionTypes.LoadSousCategoriesFailed:
      return {
        ...state,
        isLoading: false,
        isLoaded: false
      };
    case SousCategorieActionTypes.UpdateSousCategorieRequest:
      return {
        ...state,
        isLoadingSpinner: true
      };
    case SousCategorieActionTypes.UpdateSousCategorieSuccess:
      state = sousCategorieEntityAdapter.updateOne({
        id: action.payload.sousCategorie.id,
        changes: {...action.payload.sousCategorie}
      }, state);
      return {
        ...state,
        isLoadingSpinner: false
      };
    case SousCategorieActionTypes.UpdateSousCategorieFailed:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case SousCategorieActionTypes.SaveSousCategorieRequest:
      return {
        ...state,
        isLoadingSpinner: true
      };
    case SousCategorieActionTypes.SaveSousCategorieSuccess:
      state = sousCategorieEntityAdapter.addOne(action.payload.sousCategorie, state);
      return {
        ...state,
        isLoadingSpinner: false
      };
    case SousCategorieActionTypes.SaveSousCategorieFailed:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case SousCategorieActionTypes.DeleteSousCategorieRequest:
      return {
        ...state,
        selectedId: action.payload.id,
        isLoading: true
      };
    case SousCategorieActionTypes.DeleteSousCategorieSuccess:
      state = sousCategorieEntityAdapter.removeOne(state.selectedId, state);
      return {
        ...state,
        selectedId: 0,
        isLoading: false,
      };
    case SousCategorieActionTypes.DeleteSousCategorieFailed:
      return {
        ...state,
        selectedId: 0,
        isLoading: false
      };
    case SousCategorieActionTypes.LoadOneSousCategorieRequest:
      return {
        ...state,
        selectedId: action.payload.id,
        isLoadingSpinner: true
      };
    case SousCategorieActionTypes.LoadOneSousCategorieSuccess:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case SousCategorieActionTypes.LoadOneSousCategorieFailed:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case SousCategorieActionTypes.AddChipsSousCategories:
      const v = [...state.selectedChipsSousCategorie, action.payload.sousCategorie];
      return {
        ...state,
        selectedChipsSousCategorie: v
      };
    case SousCategorieActionTypes.AddAllChipsSousCategories:
      return {
        ...state,
        selectedChipsSousCategorie: action.payload.sousCategories
      };
    case SousCategorieActionTypes.RemoveChipsSousCategories:
      return {
        ...state,
        selectedChipsSousCategorie: state.selectedChipsSousCategorie.filter(value => value.id !== action.payload.id)
      };
    default:
      return state;
  }
}
