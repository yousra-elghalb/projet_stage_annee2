import {offreVoyageEntityAdapter, OffreVoyageState} from './offre-voyage.reducer';
import {createFeatureSelector, createSelector} from '@ngrx/store';

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = offreVoyageEntityAdapter.getSelectors();


export const selectFeatureOffreVoyages = createFeatureSelector<OffreVoyageState>('offreVoyage');

export const selectAllOffreVoyages = createSelector(selectFeatureOffreVoyages, selectAll);

/*export const selectOffreVoyageById = (id) => createSelector(selectAllOffreVoyages, (allItems) => {
  if (allItems) {
    return allItems.find(item => {
      return item.id === id;
    });
  } else {
    return {};
  }
});*/

export const selectOffreVoyagePaginatorInformations = createSelector(selectFeatureOffreVoyages, data => data.paginatorInformations);

export const selectOffreVoyagePaginatorInformationsAndSearchAndisLoaded = createSelector(selectFeatureOffreVoyages, data => ({
  paginatorInformations: data.paginatorInformations,
  search: data.search,
  isLoaded: data.isLoaded,
}));

export const selectOffreVoyageIsLoading = createSelector(selectFeatureOffreVoyages, data => data.isLoading);

export const selectOffreVoyageIsLoaded = createSelector(selectFeatureOffreVoyages, data => data.isLoaded);

export const selectOffreVoyageIsLoadingSpinner = createSelector(selectFeatureOffreVoyages, data => data.isLoadingSpinner);

export const selectOffreVoyageSearch = createSelector(selectFeatureOffreVoyages, data => data.search);
