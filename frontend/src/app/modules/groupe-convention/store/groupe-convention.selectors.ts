import {groupeConventionEntityAdapter, GroupeConventionState} from './groupe-convention.reducer';
import {createFeatureSelector, createSelector} from '@ngrx/store';

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = groupeConventionEntityAdapter.getSelectors();


export const selectFeatureGroupeConventions = createFeatureSelector<GroupeConventionState>('groupeConvention');

export const selectAllGroupeConventions = createSelector(selectFeatureGroupeConventions, selectAll);

export const selectGroupeConventionPaginatorInformations = createSelector(selectFeatureGroupeConventions, data => data.paginatorInformations);

export const selectGroupeConventionPaginatorInformationsAndSearchAndisLoaded = createSelector(selectFeatureGroupeConventions, data => ({
  paginatorInformations: data.paginatorInformations,
  search: data.search,
  isLoaded: data.isLoaded,
}));

export const selectGroupeConventionIsLoading = createSelector(selectFeatureGroupeConventions, data => data.isLoading);

export const selectGroupeConventionIsLoaded = createSelector(selectFeatureGroupeConventions, data => data.isLoaded);

export const selectGroupeConventionIsLoadingSpinner = createSelector(selectFeatureGroupeConventions, data => data.isLoadingSpinner);

export const selectGroupeConventionSearch = createSelector(selectFeatureGroupeConventions, data => data.search);
