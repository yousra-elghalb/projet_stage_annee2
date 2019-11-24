import {createFeatureSelector, createSelector} from '@ngrx/store';
import {SGroupeState} from './s-groupe.reducer';


export const selectFeatureSGroupes = createFeatureSelector<SGroupeState>('sGroupe');
export const selectisLoadingSpinnerSGroupes = createSelector(selectFeatureSGroupes, s1 => s1.isLoadingSpinner);


