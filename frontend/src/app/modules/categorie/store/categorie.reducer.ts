import {CategorieActions, CategorieActionTypes} from './categorie.actions';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Categorie} from '../model/categorie';
import {PaginatorInformations} from '../../../shared_models/paginator-informations';

export interface CategorieState extends EntityState<Categorie> {
  isLoading: boolean;
  isLoaded: boolean;
  selectedId?: number;
  search: string;
  isLoadingSpinner: boolean;
}

export const categorieEntityAdapter: EntityAdapter<Categorie> = createEntityAdapter<Categorie>({selectId: data => data.id});


export const initialCategorieState: CategorieState = categorieEntityAdapter.getInitialState({
  // additional entity state properties
  paginatorInformations: {total: 0, per_page: 15, current_page: 1},
  isLoading: false,
  isLoadingSpinner: false,
  isLoaded: false,
  search: ''
});

export function reducer(state = initialCategorieState, action: CategorieActions): CategorieState {
  switch (action.type) {
    case CategorieActionTypes.LoadCategoriesRequest:
      return {
        ...state,
        search: action.search,
        isLoading: true,
        isLoaded: false
      };
    case CategorieActionTypes.Categoriesloading:
      return {
        ...state,
        isLoading: true,
      };
    case CategorieActionTypes.LoadCategoriesIsNotLoadedRequest:

      state = {...state, isLoading: !state.isLoaded};
      return {
        ...state
      };
    case CategorieActionTypes.LoadCategoriesSuccess:
      state = categorieEntityAdapter.addAll(action.payload.categories, state);
      return {
        ...state,
        isLoading: false,
        isLoaded: true
      };
    case CategorieActionTypes.LoadCategoriesFailed:
      return {
        ...state,
        isLoading: false,
        isLoaded: false
      };
    case CategorieActionTypes.UpdateCategorieRequest:
      return {
        ...state,
        isLoadingSpinner: true
      };
    case CategorieActionTypes.UpdateCategorieSuccess:
      state = categorieEntityAdapter.updateOne({
        id: action.payload.categorie.id,
        changes: {...action.payload.categorie}
      }, state);
      return {
        ...state,
        isLoadingSpinner: false
      };
    case CategorieActionTypes.UpdateCategorieFailed:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case CategorieActionTypes.SaveCategorieRequest:
      return {
        ...state,
        isLoadingSpinner: true
      };
    case CategorieActionTypes.SaveCategorieSuccess:
      state = categorieEntityAdapter.addOne(action.payload.categorie, state);
      return {
        ...state,
        isLoadingSpinner: false
      };
    case CategorieActionTypes.SaveCategorieFailed:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case CategorieActionTypes.DeleteCategorieRequest:
      return {
        ...state,
        selectedId: action.payload.id,
        isLoading: true
      };
    case CategorieActionTypes.DeleteCategorieSuccess:
      state = categorieEntityAdapter.removeOne(state.selectedId, state);
      return {
        ...state,
        selectedId: 0,
        isLoading: false,
      };
    case CategorieActionTypes.DeleteCategorieFailed:
      return {
        ...state,
        selectedId: 0,
        isLoading: false
      };
    case CategorieActionTypes.LoadOneCategorieRequest:
      return {
        ...state,
        selectedId: action.payload.id,
        isLoadingSpinner: true
      };
    case CategorieActionTypes.LoadOneCategorieSuccess:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case CategorieActionTypes.LoadOneCategorieFailed:
      return {
        ...state,
        isLoadingSpinner: false
      };
    default:
      return state;
  }
}
