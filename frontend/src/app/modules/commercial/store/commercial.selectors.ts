import {commercialEntityAdapter, CommercialState} from './commercial.reducer';
import {createFeatureSelector, createSelector} from '@ngrx/store';

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = commercialEntityAdapter.getSelectors();


export const selectFeatureCommercials = createFeatureSelector<CommercialState>('commercial');

export const selectAllCommercials = createSelector(selectFeatureCommercials, selectAll);

export const selectAllCommerciauxExterne = createSelector(selectAllCommercials, s1 => {
  return s1.filter(value => value.limitedAccess);
});

export const selectCommercialSearchAndisLoaded = createSelector(selectFeatureCommercials, data => ({
  search: data.search,
  isLoaded: data.isLoaded,
}));

export const selectCommercialIsLoading = createSelector(selectFeatureCommercials, data => data.isLoading);

export const selectCommercialIsLoaded = createSelector(selectFeatureCommercials, data => data.isLoaded);

export const selectCommercialIsLoadingSpinner = createSelector(selectFeatureCommercials, data => data.isLoadingSpinner);

export const selectCommercialSearch = createSelector(selectFeatureCommercials, data => data.search);
