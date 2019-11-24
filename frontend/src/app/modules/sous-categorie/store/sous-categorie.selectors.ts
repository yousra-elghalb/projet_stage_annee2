import {sousCategorieEntityAdapter, SousCategorieState} from './sous-categorie.reducer';
import {createFeatureSelector, createSelector} from '@ngrx/store';

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = sousCategorieEntityAdapter.getSelectors();


export const selectFeatureSousCategories = createFeatureSelector<SousCategorieState>('sousCategorie');

export const selectAllSousCategories = createSelector(selectFeatureSousCategories, selectAll);


export const selectSousCategorieSearchAndisLoaded = createSelector(selectFeatureSousCategories, data => ({
  search: data.search,
  isLoaded: data.isLoaded,
}));

export const selectSousCategorieIsLoading = createSelector(selectFeatureSousCategories, data => data.isLoading);

export const selectedChipsSousCategories = createSelector(selectFeatureSousCategories, data => data.selectedChipsSousCategorie);
export const selectSousCategorieIsLoaded = createSelector(selectFeatureSousCategories, data => data.isLoaded);

export const selectSousCategorieIsLoadingSpinner = createSelector(selectFeatureSousCategories, data => data.isLoadingSpinner);

export const selectSousCategorieSearch = createSelector(selectFeatureSousCategories, data => data.search);
