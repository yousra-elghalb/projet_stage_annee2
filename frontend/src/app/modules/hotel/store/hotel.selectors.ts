import {hotelEntityAdapter, HotelState} from './hotel.reducer';
import {createFeatureSelector, createSelector} from '@ngrx/store';

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = hotelEntityAdapter.getSelectors();


export const selectFeatureHotels = createFeatureSelector<HotelState>('hotel');

export const selectAllHotels = createSelector(selectFeatureHotels, selectAll);

export const selectHotelSearchAndisLoaded = createSelector(selectFeatureHotels, data => ({
  search: data.search,
  isLoaded: data.isLoaded,
}));

export const selectHotelIsLoading = createSelector(selectFeatureHotels, data => data.isLoading);

export const selectHotelIsLoaded = createSelector(selectFeatureHotels, data => data.isLoaded);

export const selectHotelIsLoadingSpinner = createSelector(selectFeatureHotels, data => data.isLoadingSpinner);

export const selectHotelSearch = createSelector(selectFeatureHotels, data => data.search);
