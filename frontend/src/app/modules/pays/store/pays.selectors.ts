import {paysEntityAdapter, PaysState} from './pays.reducer';
import {createFeatureSelector, createSelector} from '@ngrx/store';

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = paysEntityAdapter.getSelectors();


export const selectFeaturePayss = createFeatureSelector<PaysState>('pays');

export const selectAllPayss = createSelector(selectFeaturePayss, selectAll);

export const selectPaysSearchAndisLoaded = createSelector(selectFeaturePayss, data => ({
  search: data.search,
  isLoaded: data.isLoaded,
}));

export const selectPaysIsLoading = createSelector(selectFeaturePayss, data => data.isLoading);

export const selectPaysIsLoaded = createSelector(selectFeaturePayss, data => data.isLoaded);

export const selectPaysIsLoadingSpinner = createSelector(selectFeaturePayss, data => data.isLoadingSpinner);

export const selectPaysSearch = createSelector(selectFeaturePayss, data => data.search);
