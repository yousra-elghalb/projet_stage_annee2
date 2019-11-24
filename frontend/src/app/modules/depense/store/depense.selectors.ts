import {depenseEntityAdapter, DepenseState} from './depense.reducer';
import {createFeatureSelector, createSelector} from '@ngrx/store';

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = depenseEntityAdapter.getSelectors();


export const selectFeatureDepenses = createFeatureSelector<DepenseState>('depense');

export const selectAllDepenses = createSelector(selectFeatureDepenses, selectAll);

export const selectDepenseSearchAndisLoaded = createSelector(selectFeatureDepenses, data => ({
  search: data.search,
  isLoaded: data.isLoaded,
}));

export const selectDepenseIsLoading = createSelector(selectFeatureDepenses, data => data.isLoading);

export const selectDepenseIsLoaded = createSelector(selectFeatureDepenses, data => data.isLoaded);

export const selectDepenseIsLoadingSpinner = createSelector(selectFeatureDepenses, data => data.isLoadingSpinner);

export const selectDepenseSearch = createSelector(selectFeatureDepenses, data => data.search);
