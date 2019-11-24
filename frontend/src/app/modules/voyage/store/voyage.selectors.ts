import {voyageEntityAdapter, VoyageState} from './voyage.reducer';
import {createFeatureSelector, createSelector} from '@ngrx/store';

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = voyageEntityAdapter.getSelectors();


export const selectFeatureVoyages = createFeatureSelector<VoyageState>('voyage');

export const selectAllVoyages = createSelector(selectFeatureVoyages, selectAll);

export const selectVoyagePaginatorInformations = createSelector(selectFeatureVoyages, data => data.paginatorInformations);


export const selectVoyageSearchAndPaginatorInformationsAndisLoaded = createSelector(selectFeatureVoyages, data => ({
  paginatorInformations: data.paginatorInformations,
  search: data.search,
  isLoaded: data.isLoaded,
}));

export const selectVoyageIsLoading = createSelector(selectFeatureVoyages, data => data.isLoading);

export const selectVoyageIsLoaded = createSelector(selectFeatureVoyages, data => data.isLoaded);

export const selectVoyageIsLoadingSpinner = createSelector(selectFeatureVoyages, data => data.isLoadingSpinner);

export const selectVoyageSearch = createSelector(selectFeatureVoyages, data => data.search);
