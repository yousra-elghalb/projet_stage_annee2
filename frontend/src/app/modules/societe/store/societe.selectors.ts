import {societeEntityAdapter, SocieteState} from './societe.reducer';
import {createFeatureSelector, createSelector} from '@ngrx/store';

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = societeEntityAdapter.getSelectors();


export const selectFeatureSocietes = createFeatureSelector<SocieteState>('societe');

export const selectAllSocietes = createSelector(selectFeatureSocietes, selectAll);

export const selectSocieteSearchAndisLoaded = createSelector(selectFeatureSocietes, data => ({
  search: data.search,
  isLoaded: data.isLoaded,
}));

export const selectSocieteIsLoading = createSelector(selectFeatureSocietes, data => data.isLoading);

export const selectSocieteIsLoaded = createSelector(selectFeatureSocietes, data => data.isLoaded);

export const selectSocieteIsLoadingSpinner = createSelector(selectFeatureSocietes, data => data.isLoadingSpinner);

export const selectSocieteSearch = createSelector(selectFeatureSocietes, data => data.search);
