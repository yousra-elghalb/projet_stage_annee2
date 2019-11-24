import {chauffeurEntityAdapter, ChauffeurState} from './chauffeur.reducer';
import {createFeatureSelector, createSelector} from '@ngrx/store';

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = chauffeurEntityAdapter.getSelectors();


export const selectFeatureChauffeurs = createFeatureSelector<ChauffeurState>('chauffeur');

export const selectAllChauffeurs = createSelector(selectFeatureChauffeurs, selectAll);

export const selectChauffeurSearchAndisLoaded = createSelector(selectFeatureChauffeurs, data => ({
  search: data.search,
  isLoaded: data.isLoaded,
}));

export const selectChauffeurIsLoading = createSelector(selectFeatureChauffeurs, data => data.isLoading);

export const selectChauffeurIsLoaded = createSelector(selectFeatureChauffeurs, data => data.isLoaded);

export const selectChauffeurIsLoadingSpinner = createSelector(selectFeatureChauffeurs, data => data.isLoadingSpinner);

export const selectChauffeurSearch = createSelector(selectFeatureChauffeurs, data => data.search);
