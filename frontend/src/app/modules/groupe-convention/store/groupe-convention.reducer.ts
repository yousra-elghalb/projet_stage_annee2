import {GroupeConventionActions, GroupeConventionActionTypes} from './groupe-convention.actions';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {GroupeConvention} from '../model/groupe-convention';
import {PaginatorInformations} from '../../../shared_models/paginator-informations';
import {isUndefined} from 'util';

export interface GroupeConventionState extends EntityState<GroupeConvention> {
  paginatorInformations: PaginatorInformations;
  isLoading: boolean;
  isLoaded: boolean;
  selectedId?: number;
  search: string;
  isLoadingSpinner: boolean;
  fidele: number;
}

export const groupeConventionEntityAdapter: EntityAdapter<GroupeConvention> = createEntityAdapter<GroupeConvention>({selectId: data => data.id});


export const initialGroupeConventionState: GroupeConventionState = groupeConventionEntityAdapter.getInitialState({
    // additional entity state properties
    paginatorInformations: {total: 0, per_page: 15, current_page: 1},
    isLoading: false,
    isLoadingSpinner: false,
    isLoaded: false,
    search: '',
    fidele: 2
  })
;

export function reducer(state = initialGroupeConventionState, action: GroupeConventionActions): GroupeConventionState {
  switch (action.type) {
    case GroupeConventionActionTypes.LoadGroupeConventionsRequest:
      return {
        ...state,
        search: action.search,
        isLoadingSpinner: true,
        isLoaded: false
      };
    case GroupeConventionActionTypes.GroupeConventionsloading:
      return {
        ...state,
        isLoading: true,
      };
    case GroupeConventionActionTypes.LoadGroupeConventionsIsNotLoadedRequest:

      state = {...state, isLoading: !state.isLoaded};
      return {
        ...state
      };
    case GroupeConventionActionTypes.LoadGroupeConventionsSuccess:
      let pi: any;
      pi = {...action.payload.paginatedResults};
      pi.data = null;
      state = groupeConventionEntityAdapter.addAll(action.payload.paginatedResults.data, state);
      return {
        ...state,
        paginatorInformations: pi,
        isLoading: false,
        isLoadingSpinner: false,
        isLoaded: true
      };
    case GroupeConventionActionTypes.LoadGroupeConventionsFailed:
      return {
        ...state,
        isLoading: false,
        isLoadingSpinner: false,
        isLoaded: false
      };
    case GroupeConventionActionTypes.UpdateGroupeConventionRequest:
      return {
        ...state,
        isLoadingSpinner: true
      };
    case GroupeConventionActionTypes.UpdateGroupeConventionSuccess:
      state = groupeConventionEntityAdapter.updateOne({
        id: action.payload.groupeConvention.id,
        changes: {...action.payload.groupeConvention}
      }, state);
      return {
        ...state,
        isLoadingSpinner: false
      };
    case GroupeConventionActionTypes.UpdateGroupeConventionFailed:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case GroupeConventionActionTypes.SaveGroupeConventionRequest:
      return {
        ...state,
        isLoadingSpinner: true
      };
    case GroupeConventionActionTypes.SaveGroupeConventionSuccess:
      state = groupeConventionEntityAdapter.addOne(action.payload.groupeConvention, state);
      return {
        ...state,
        isLoadingSpinner: false
      };
    case GroupeConventionActionTypes.SaveGroupeConventionFailed:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case GroupeConventionActionTypes.DeleteGroupeConventionRequest:
      return {
        ...state,
        selectedId: action.payload.id,
        isLoading: true
      };
    case GroupeConventionActionTypes.DeleteGroupeConventionSuccess:
      state = groupeConventionEntityAdapter.removeOne(state.selectedId, state);
      return {
        ...state,
        selectedId: 0,
        isLoading: false,
        paginatorInformations: {
          ...state.paginatorInformations,
          total: state.paginatorInformations.total - 1
        }
      };
    case GroupeConventionActionTypes.DeleteGroupeConventionFailed:
      return {
        ...state,
        selectedId: 0,
        isLoading: false
      };
    case GroupeConventionActionTypes.LoadOneGroupeConventionRequest:
      return {
        ...state,
        selectedId: action.payload.id,
        isLoadingSpinner: true
      };
    case GroupeConventionActionTypes.LoadOneGroupeConventionSuccess:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case GroupeConventionActionTypes.LoadOneGroupeConventionFailed:
      return {
        ...state,
        isLoadingSpinner: false
      };
    default:
      return state;
  }
}
