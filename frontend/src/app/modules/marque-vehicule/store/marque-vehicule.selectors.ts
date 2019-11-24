import {marqueVehiculeEntityAdapter, MarqueVehiculeState} from './marque-vehicule.reducer';
import {createFeatureSelector, createSelector} from '@ngrx/store';

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = marqueVehiculeEntityAdapter.getSelectors();


export const selectFeatureMarqueVehicules = createFeatureSelector<MarqueVehiculeState>('marqueVehicule');

export const selectAllMarqueVehicules = createSelector(selectFeatureMarqueVehicules, selectAll);

export const selectMarqueVehiculeSearchAndisLoaded = createSelector(selectFeatureMarqueVehicules, data => ({
  search: data.search,
  isLoaded: data.isLoaded,
}));

export const selectMarqueVehiculeIsLoading = createSelector(selectFeatureMarqueVehicules, data => data.isLoading);

export const selectMarqueVehiculeIsLoaded = createSelector(selectFeatureMarqueVehicules, data => data.isLoaded);

export const selectMarqueVehiculeIsLoadingSpinner = createSelector(selectFeatureMarqueVehicules, data => data.isLoadingSpinner);

export const selectMarqueVehiculeSearch = createSelector(selectFeatureMarqueVehicules, data => data.search);
