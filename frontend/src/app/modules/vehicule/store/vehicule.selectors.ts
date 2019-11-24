import {vehiculeEntityAdapter, VehiculeState} from './vehicule.reducer';
import {createFeatureSelector, createSelector} from '@ngrx/store';

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = vehiculeEntityAdapter.getSelectors();


export const selectFeatureVehicules = createFeatureSelector<VehiculeState>('vehicule');

export const selectAllVehicules = createSelector(selectFeatureVehicules, selectAll);

export const selectVehiculeSearchAndisLoaded = createSelector(selectFeatureVehicules, data => ({
  search: data.search,
  isLoaded: data.isLoaded,
}));

export const selectVehiculeIsLoading = createSelector(selectFeatureVehicules, data => data.isLoading);

export const selectVehiculeIsLoaded = createSelector(selectFeatureVehicules, data => data.isLoaded);

export const selectVehiculeIsLoadingSpinner = createSelector(selectFeatureVehicules, data => data.isLoadingSpinner);

export const selectVehiculeSearch = createSelector(selectFeatureVehicules, data => data.search);
