import {optionEntityAdapter, OptionState} from './option.reducer';
import {createFeatureSelector, createSelector} from '@ngrx/store';

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = optionEntityAdapter.getSelectors();


export const selectFeatureOptions = createFeatureSelector<OptionState>('option');

export const selectAllOptions = createSelector(selectFeatureOptions, selectAll);

export const selectOptionSearchAndisLoaded = createSelector(selectFeatureOptions, data => ({
  search: data.search,
  isLoaded: data.isLoaded,
}));

export const selectOptionIsLoading = createSelector(selectFeatureOptions, data => data.isLoading);

export const selectOptionIsLoaded = createSelector(selectFeatureOptions, data => data.isLoaded);

export const selectOptionIsLoadingSpinner = createSelector(selectFeatureOptions, data => data.isLoadingSpinner);

export const selectOptionSearch = createSelector(selectFeatureOptions, data => data.search);
