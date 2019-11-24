import {createFeatureSelector, createSelector} from '@ngrx/store';
import {pGroupeEntityAdapter, PGroupeState} from './p-groupe.reducer';

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = pGroupeEntityAdapter.getSelectors();


export const selectFeaturePGroupes = createFeatureSelector<PGroupeState>('pGroupe');

export const selectAllPGroupes = createSelector(selectFeaturePGroupes, selectAll);

export const selectPGroupePaginatorInformations = createSelector(selectFeaturePGroupes, data => data.paginatorInformations);

export const selectPGroupeOffreVoyageId = createSelector(selectFeaturePGroupes, data =>
  data.selectedOffreVoyageId
);
export const selectPGroupeSelectedId = createSelector(selectFeaturePGroupes, data => ({
  selectedId: data.selectedId
}));
export const selectSelectedPGroupe = createSelector(selectFeaturePGroupes, data => data.selectedPGroupe);
export const selectPGroupePaginatorInformationsAndSearchAndisLoaded = createSelector(selectFeaturePGroupes, data => ({
  paginatorInformations: data.paginatorInformations,
  search: data.search,
  isLoaded: data.isLoaded,
}));

export const selectPGroupeIsLoading = createSelector(selectFeaturePGroupes, data => data.isLoading);

export const selectPGroupeIsLoaded = createSelector(selectFeaturePGroupes, data => data.isLoaded);

export const selectPGroupeIsLoadingSpinner = createSelector(selectFeaturePGroupes, data => data.isLoadingSpinner);

export const selectPGroupeSearch = createSelector(selectFeaturePGroupes, data => data.search);
