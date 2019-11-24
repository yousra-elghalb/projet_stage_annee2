import {voyageurEntityAdapter, VoyageurState} from './voyageur.reducer';
import {createFeatureSelector, createSelector} from '@ngrx/store';

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = voyageurEntityAdapter.getSelectors();


export const selectFeatureVoyageurs = createFeatureSelector<VoyageurState>('voyageur');

export const selectAllVoyageurs = createSelector(selectFeatureVoyageurs, selectAll);

export const selectVoyageurPaginatorInformations = createSelector(selectFeatureVoyageurs, data => data.paginatorInformations);

export const selectVoyageurPaginatorInformationsAndSearchAndisLoaded = createSelector(selectFeatureVoyageurs, data => ({
  paginatorInformations: data.paginatorInformations,
  search: data.search,
  isLoaded: data.isLoaded,
}));

export const selectVoyageurIsLoading = createSelector(selectFeatureVoyageurs, data => data.isLoading);

export const selectVoyageurIsLoaded = createSelector(selectFeatureVoyageurs, data => data.isLoaded);

export const selectVoyageurIsLoadingSpinner = createSelector(selectFeatureVoyageurs, data => data.isLoadingSpinner);

export const selectVoyageurSearch = createSelector(selectFeatureVoyageurs, data => data.search);
