import {roleEntityAdapter, RoleState} from './role.reducer';
import {createFeatureSelector, createSelector} from '@ngrx/store';

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = roleEntityAdapter.getSelectors();


export const selectFeatureRoles = createFeatureSelector<RoleState>('role');

export const selectAllRoles = createSelector(selectFeatureRoles, selectAll);

export const selectRolePaginatorInformations = createSelector(selectFeatureRoles, data => data.paginatorInformations);

export const selectRolePaginatorInformationsAndSearchAndisLoaded = createSelector(selectFeatureRoles, data => ({
  paginatorInformations: data.paginatorInformations,
  search: data.search,
  isLoaded: data.isLoaded,
}));

export const selectRoleIsLoading = createSelector(selectFeatureRoles, data => data.isLoading);

export const selectRoleIsLoaded = createSelector(selectFeatureRoles, data => data.isLoaded);

export const selectRoleIsLoadingSpinner = createSelector(selectFeatureRoles, data => data.isLoadingSpinner);

export const selectRoleSearch = createSelector(selectFeatureRoles, data => data.search);
