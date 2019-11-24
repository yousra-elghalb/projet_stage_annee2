import {agenceEntityAdapter, AgenceState} from './agence.reducer';
import {createFeatureSelector, createSelector} from '@ngrx/store';

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = agenceEntityAdapter.getSelectors();


export const selectFeatureAgences = createFeatureSelector<AgenceState>('agence');

export const selectAllAgences = createSelector(selectFeatureAgences, selectAll);

export const selectAgenceSearchAndisLoaded = createSelector(selectFeatureAgences, data => ({
  search: data.search,
  isLoaded: data.isLoaded,
}));

export const selectAgenceIsLoading = createSelector(selectFeatureAgences, data => data.isLoading);

export const selectAgenceIsLoaded = createSelector(selectFeatureAgences, data => data.isLoaded);

export const selectAgenceIsLoadingSpinner = createSelector(selectFeatureAgences, data => data.isLoadingSpinner);

export const selectAgenceSearch = createSelector(selectFeatureAgences, data => data.search);
