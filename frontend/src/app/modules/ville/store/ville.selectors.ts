import {villeEntityAdapter, VilleState} from './ville.reducer';
import {createFeatureSelector, createSelector} from '@ngrx/store';

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = villeEntityAdapter.getSelectors();


export const selectFeatureVilles = createFeatureSelector<VilleState>('ville');

export const selectAllVilles = createSelector(selectFeatureVilles, selectAll);

export const selectVilleSearchAndisLoaded = createSelector(selectFeatureVilles, data => ({
  search: data.search,
  isLoaded: data.isLoaded,
}));

export const selectVilleIsLoading = createSelector(selectFeatureVilles, data => data.isLoading);

export const selectVilleIsLoaded = createSelector(selectFeatureVilles, data => data.isLoaded);

export const selectVilleIsLoadingSpinner = createSelector(selectFeatureVilles, data => data.isLoadingSpinner);

export const selectVilleSearch = createSelector(selectFeatureVilles, data => data.search);

export const selectedChipsVilles = createSelector(selectFeatureVilles, data => data.selectedChipsVille);
