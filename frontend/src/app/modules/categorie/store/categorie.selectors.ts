import {categorieEntityAdapter, CategorieState} from './categorie.reducer';
import {createFeatureSelector, createSelector} from '@ngrx/store';

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = categorieEntityAdapter.getSelectors();


export const selectFeatureCategories = createFeatureSelector<CategorieState>('categorie');

export const selectAllCategories = createSelector(selectFeatureCategories, selectAll);
export const selectAllCategoriesEntities = createSelector(selectFeatureCategories, selectEntities);

export const selectCategorieById = (id) => createSelector(selectAllCategoriesEntities, s1 => {
  return s1[id];
});

export const selectCategorieSearchAndisLoaded = createSelector(selectFeatureCategories, data => ({
  search: data.search,
  isLoaded: data.isLoaded,
}));

export const selectCategorieIsLoading = createSelector(selectFeatureCategories, data => data.isLoading);

export const selectCategorieIsLoaded = createSelector(selectFeatureCategories, data => data.isLoaded);

export const selectCategorieIsLoadingSpinner = createSelector(selectFeatureCategories, data => data.isLoadingSpinner);

export const selectCategorieSearch = createSelector(selectFeatureCategories, data => data.search);
