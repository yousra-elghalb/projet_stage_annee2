import {permissionEntityAdapter, PermissionState} from './permission.reducer';
import {createFeatureSelector, createSelector} from '@ngrx/store';

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = permissionEntityAdapter.getSelectors();


export const selectFeaturePermissions = createFeatureSelector<PermissionState>('permission');

export const selectAllPermissions = createSelector(selectFeaturePermissions, selectAll);

export const selectPermissionSearchAndisLoaded = createSelector(selectFeaturePermissions, data => ({
  search: data.search,
  isLoaded: data.isLoaded,
}));

export const selectPermissionIsLoading = createSelector(selectFeaturePermissions, data => data.isLoading);

export const selectPermissionIsLoaded = createSelector(selectFeaturePermissions, data => data.isLoaded);

export const selectPermissionIsLoadingSpinner = createSelector(selectFeaturePermissions, data => data.isLoadingSpinner);

export const selectPermissionSearch = createSelector(selectFeaturePermissions, data => data.search);
