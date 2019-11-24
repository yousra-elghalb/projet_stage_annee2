import {AccompagnateurActions, AccompagnateurActionTypes} from './accompagnateur.actions';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Accompagnateur} from '../model/accompagnateur';
import {PaginatorInformations} from '../../../shared_models/paginator-informations';
import {isUndefined} from 'util';

export interface AccompagnateurState extends EntityState<Accompagnateur> {
  isLoading: boolean;
  isLoaded: boolean;
  selectedId?: number;
  search: string;
  isLoadingSpinner: boolean;
}

export const accompagnateurEntityAdapter: EntityAdapter<Accompagnateur> = createEntityAdapter<Accompagnateur>({selectId: data => data.id});


export const initialAccompagnateurState: AccompagnateurState = accompagnateurEntityAdapter.getInitialState({
  // additional entity state properties
  isLoading: false,
  isLoadingSpinner: false,
  isLoaded: false,
  search: ''
});

export function reducer(state = initialAccompagnateurState, action: AccompagnateurActions): AccompagnateurState {
  switch (action.type) {
    case AccompagnateurActionTypes.LoadAccompagnateursRequest:
      return {
        ...state,
        search: action.search,
        isLoading: true,
        isLoaded: false
      };
    case AccompagnateurActionTypes.LoadAccompagnateursIsNotLoadedRequest:

      state = {...state, isLoading: !state.isLoaded};
      return {
        ...state
      };
    case AccompagnateurActionTypes.Accompagnateursloading:

      state = {...state, isLoading: true};
      return {
        ...state
      };
    case AccompagnateurActionTypes.LoadAccompagnateursSuccess:
      // state = accompagnateurEntityAdapter.removeAll(state);
      state = accompagnateurEntityAdapter.addAll(action.payload.accompagnateur, state);
      return {
        ...state,
        isLoading: false,
        isLoaded: true
      };
    case AccompagnateurActionTypes.LoadAccompagnateursFailed:
      return {
        ...state,
        isLoading: false,
        isLoaded: false
      };
    case AccompagnateurActionTypes.UpdateAccompagnateurRequest:
      return {
        ...state,
        isLoadingSpinner: true
      };
    case AccompagnateurActionTypes.UpdateAccompagnateurSuccess:
      state = accompagnateurEntityAdapter.updateOne({
        id: action.payload.accompagnateur.id,
        changes: {...action.payload.accompagnateur}
      }, state);
      return {
        ...state,
        isLoadingSpinner: false
      };
    case AccompagnateurActionTypes.UpdateAccompagnateurFailed:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case AccompagnateurActionTypes.SaveAccompagnateurRequest:
      return {
        ...state,
        isLoadingSpinner: true
      };
    case AccompagnateurActionTypes.SaveAccompagnateurSuccess:
      state = accompagnateurEntityAdapter.addOne(action.payload.accompagnateur, state);
      return {
        ...state,
        isLoadingSpinner: false
      };
    case AccompagnateurActionTypes.SaveAccompagnateurFailed:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case AccompagnateurActionTypes.DeleteAccompagnateurRequest:
      return {
        ...state,
        selectedId: action.payload.id,
        isLoading: true
      };
    case AccompagnateurActionTypes.DeleteAccompagnateurSuccess:
      state = accompagnateurEntityAdapter.removeOne(state.selectedId, state);
      return {
        ...state,
        selectedId: 0,
        isLoading: false
      };
    case AccompagnateurActionTypes.DeleteAccompagnateurFailed:
      return {
        ...state,
        selectedId: 0,
        isLoading: false
      };
    case AccompagnateurActionTypes.LoadOneAccompagnateurRequest:
      return {
        ...state,
        selectedId: action.payload.id,
        isLoadingSpinner: true
      };
    case AccompagnateurActionTypes.LoadOneAccompagnateurSuccess:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case AccompagnateurActionTypes.LoadOneAccompagnateurFailed:
      return {
        ...state,
        isLoadingSpinner: false
      };
    default:
      return state;
  }
}
