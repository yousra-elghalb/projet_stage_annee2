import {UserState} from './user.reducer';
import {createFeatureSelector, createSelector} from '@ngrx/store';


export const selectFeatureUsers = createFeatureSelector<UserState>('user');

export const selectUserPermissions = createSelector(selectFeatureUsers, data => data.userPermission);
export const selectCommercial = createSelector(selectFeatureUsers, data => data.commercial);

export const selectLoginIsLoading = createSelector(selectFeatureUsers, data => data.isLoginLoading);

export const selectUserRolesIsLoaded = createSelector(selectFeatureUsers, data => data.isUserRolesLoaded);


