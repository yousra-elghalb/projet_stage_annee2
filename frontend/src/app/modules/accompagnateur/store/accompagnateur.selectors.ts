import {accompagnateurEntityAdapter, AccompagnateurState} from './accompagnateur.reducer';
import {createFeatureSelector, createSelector} from '@ngrx/store';

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = accompagnateurEntityAdapter.getSelectors();


export const selectFeatureAccompagnateurs = createFeatureSelector<AccompagnateurState>('accompagnateur');

export const selectAllAccompagnateurs = createSelector(selectFeatureAccompagnateurs, selectAll);

export const selectAccompagnateurSearchAndisLoaded = createSelector(selectFeatureAccompagnateurs, data => ({
  search: data.search,
  isLoaded: data.isLoaded,
}));

export const selectAccompagnateurIsLoading = createSelector(selectFeatureAccompagnateurs, data => data.isLoading);

export const selectAccompagnateurIsLoaded = createSelector(selectFeatureAccompagnateurs, data => data.isLoaded);

export const selectAccompagnateurIsLoadingSpinner = createSelector(selectFeatureAccompagnateurs, data => data.isLoadingSpinner);

export const selectAccompagnateurSearch = createSelector(selectFeatureAccompagnateurs, data => data.search);
