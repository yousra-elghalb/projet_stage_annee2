import {createFeatureSelector, createSelector} from '@ngrx/store';
import {offreVoyageLimitedEntityAdapter, OffreVoyageLimitedState} from './offre-voyage-limited.reducer';

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = offreVoyageLimitedEntityAdapter.getSelectors();


export const selectFeatureOffreVoyageLimiteds = createFeatureSelector<OffreVoyageLimitedState>('offreVoyageLimited');

export const selectAllOffreVoyageLimiteds = createSelector(selectFeatureOffreVoyageLimiteds, selectAll);

export const selectOffreVoyageLimitedSearchAndisLoaded = createSelector(selectFeatureOffreVoyageLimiteds, data => ({
  search: data.search,
  isLoaded: data.isLoaded,
}));
export const selectOffreVoyageLimitedPaginatorInformations = createSelector(selectFeatureOffreVoyageLimiteds,
  data => data.paginatorInformations);


export const selectOffreVoyageLimitedIsLoading = createSelector(selectFeatureOffreVoyageLimiteds, data => data.isLoading);

export const selectOffreVoyageLimitedIsLoaded = createSelector(selectFeatureOffreVoyageLimiteds, data => data.isLoaded);

export const selectOffreVoyageLimitedIsLoadingSpinner = createSelector(selectFeatureOffreVoyageLimiteds, data => data.isLoadingSpinner);

export const selectOffreVoyageLimitedSearch = createSelector(selectFeatureOffreVoyageLimiteds, data => data.search);

// tslint:disable-next-line:max-line-length
export const selectedChipsOffreVoyageLimiteds = createSelector(selectFeatureOffreVoyageLimiteds, data => data.selectedChipsOffreVoyageLimited);
