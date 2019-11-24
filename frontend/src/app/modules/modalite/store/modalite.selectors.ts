import {modaliteEntityAdapter, ModaliteState} from './modalite.reducer';
import {createFeatureSelector, createSelector} from '@ngrx/store';

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = modaliteEntityAdapter.getSelectors();


export const selectFeatureModalites = createFeatureSelector<ModaliteState>('modalite');

export const selectAllModalites = createSelector(selectFeatureModalites, selectAll);

export const selectModalitePaginatorInformations = createSelector(selectFeatureModalites, data => data.paginatorInformations);

export const selectModalitePaginatorInformationsAndSearchAndisLoaded = createSelector(selectFeatureModalites, data => ({
  paginatorInformations: data.paginatorInformations,
  search: data.search,
  isLoaded: data.isLoaded,
}));

export const selectModaliteIsLoading = createSelector(selectFeatureModalites, data => data.isLoading);

export const selectModaliteIsLoaded = createSelector(selectFeatureModalites, data => data.isLoaded);

export const selectModaliteIsLoadingSpinner = createSelector(selectFeatureModalites, data => data.isLoadingSpinner);

export const selectModaliteSearch = createSelector(selectFeatureModalites, data => data.search);
