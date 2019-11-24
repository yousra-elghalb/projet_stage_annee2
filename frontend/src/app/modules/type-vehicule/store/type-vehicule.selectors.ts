import {typeVehiculeEntityAdapter, TypeVehiculeState} from './type-vehicule.reducer';
import {createFeatureSelector, createSelector} from '@ngrx/store';

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = typeVehiculeEntityAdapter.getSelectors();


export const selectFeatureTypeVehicules = createFeatureSelector<TypeVehiculeState>('typeVehicule');

export const selectAllTypeVehicules = createSelector(selectFeatureTypeVehicules, selectAll);

export const selectTypeVehiculeSearchAndisLoaded = createSelector(selectFeatureTypeVehicules, data => ({
  search: data.search,
  isLoaded: data.isLoaded,
}));

export const selectTypeVehiculeIsLoading = createSelector(selectFeatureTypeVehicules, data => data.isLoading);

export const selectTypeVehiculeIsLoaded = createSelector(selectFeatureTypeVehicules, data => data.isLoaded);

export const selectTypeVehiculeIsLoadingSpinner = createSelector(selectFeatureTypeVehicules, data => data.isLoadingSpinner);

export const selectTypeVehiculeSearch = createSelector(selectFeatureTypeVehicules, data => data.search);
