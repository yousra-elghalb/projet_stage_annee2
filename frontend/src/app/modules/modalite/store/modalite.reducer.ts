import {ModaliteActions, ModaliteActionTypes} from './modalite.actions';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Modalite} from '../model/modalite';
import {PaginatorInformations} from '../../../shared_models/paginator-informations';
import {isUndefined} from 'util';

export interface ModaliteState extends EntityState<Modalite> {
  paginatorInformations: PaginatorInformations;
  isLoading: boolean;
  isLoaded: boolean;
  selectedId?: number;
  search: string;
  isLoadingSpinner: boolean;
}

export const modaliteEntityAdapter: EntityAdapter<Modalite> = createEntityAdapter<Modalite>({selectId: data => data.id});


export const initialModaliteState: ModaliteState = modaliteEntityAdapter.getInitialState({
  // additional entity state properties
  paginatorInformations: {total: 0, per_page: 15, current_page: 1},
  isLoading: false,
  isLoadingSpinner: false,
  isLoaded: false,
  search: ''
});

export function reducer(state = initialModaliteState, action: ModaliteActions): ModaliteState {
  switch (action.type) {
    case ModaliteActionTypes.Modalitesloading:
      return {
        ...state,
        isLoading: true,
      };
    case ModaliteActionTypes.LoadModalitesRequest:
      return {
        ...state,
        search: action.search,
        isLoading: true,
        isLoaded: false
      };
    case ModaliteActionTypes.LoadModalitesIsNotLoadedRequest:

      state = {...state, isLoading: !state.isLoaded};
      return {
        ...state
      };
    case ModaliteActionTypes.LoadModalitesSuccess:
      let pi: any;
      pi = {...action.payload.paginatedResults};
      pi.data = null;
      // state = modaliteEntityAdapter.removeAll(state);
      state = modaliteEntityAdapter.addAll(action.payload.paginatedResults.data, state);
      return {
        ...state,
        paginatorInformations: pi,
        isLoading: false,
        isLoaded: true
      };
    case ModaliteActionTypes.LoadModalitesFailed:
      return {
        ...state,
        isLoading: false,
        isLoaded: false
      };
    case ModaliteActionTypes.UpdateModaliteRequest:
      return {
        ...state,
        isLoadingSpinner: true
      };
    case ModaliteActionTypes.UpdateModaliteSuccess:
      state = modaliteEntityAdapter.updateOne({
        id: action.payload.modalite.id,
        changes: {...action.payload.modalite}
      }, state);
      return {
        ...state,
        isLoadingSpinner: false
      };
    case ModaliteActionTypes.UpdateModaliteFailed:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case ModaliteActionTypes.SaveModaliteRequest:
      return {
        ...state,
        isLoadingSpinner: true
      };
    case ModaliteActionTypes.SaveModaliteSuccess:
      state = modaliteEntityAdapter.addOne(action.payload.modalite, state);
      return {
        ...state,
        isLoadingSpinner: false
      };
    case ModaliteActionTypes.SaveModaliteFailed:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case ModaliteActionTypes.DeleteModaliteRequest:
      return {
        ...state,
        selectedId: action.payload.id,
        isLoading: true
      };
    case ModaliteActionTypes.DeleteModaliteSuccess:
      state = modaliteEntityAdapter.removeOne(state.selectedId, state);
      return {
        ...state,
        selectedId: 0,
        isLoading: false,
        paginatorInformations: {
          ...state.paginatorInformations,
          total: state.paginatorInformations.total - 1
        }
      };
    case ModaliteActionTypes.DeleteModaliteFailed:
      return {
        ...state,
        selectedId: 0,
        isLoading: false
      };
    case ModaliteActionTypes.LoadOneModaliteRequest:
      return {
        ...state,
        selectedId: action.payload.id,
        isLoadingSpinner: true
      };
    case ModaliteActionTypes.LoadOneModaliteSuccess:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case ModaliteActionTypes.LoadOneModaliteFailed:
      return {
        ...state,
        isLoadingSpinner: false
      };
    default:
      return state;
  }
}
