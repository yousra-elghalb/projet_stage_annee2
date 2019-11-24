import {PermissionActions, PermissionActionTypes} from './permission.actions';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Permission} from '../model/permission';

export interface PermissionState extends EntityState<Permission> {
  isLoading: boolean;
  isLoaded: boolean;
  selectedId?: number;
  search: string;
  isLoadingSpinner: boolean;
}

export const permissionEntityAdapter: EntityAdapter<Permission> = createEntityAdapter<Permission>({selectId: data => data.id});


export const initialPermissionState: PermissionState = permissionEntityAdapter.getInitialState({
  // additional entity state properties
  isLoading: false,
  isLoadingSpinner: false,
  isLoaded: false,
  search: ''
});

export function reducer(state = initialPermissionState, action: PermissionActions): PermissionState {
  switch (action.type) {
    case PermissionActionTypes.LoadPermissionsRequest:
      return {
        ...state,
        search: action.search,
        isLoading: true,
        isLoaded: false
      };
    case PermissionActionTypes.Permissionsloading:
      return {
        ...state,
        isLoading: true,
      };
    case PermissionActionTypes.LoadPermissionsIsNotLoadedRequest:

      state = {...state, isLoading: !state.isLoaded};
      return {
        ...state
      };
    case PermissionActionTypes.LoadPermissionsSuccess:
      // state = permissionEntityAdapter.removeAll(state);
      state = permissionEntityAdapter.addAll(action.payload.permission, state);
      return {
        ...state,
        isLoading: false,
        isLoaded: true
      };
    case PermissionActionTypes.LoadPermissionsFailed:
      return {
        ...state,
        isLoading: false,
        isLoaded: false
      };
    case PermissionActionTypes.LoadOnePermissionRequest:
      return {
        ...state,
        selectedId: action.payload.id,
        isLoadingSpinner: true
      };
    case PermissionActionTypes.LoadOnePermissionSuccess:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case PermissionActionTypes.LoadOnePermissionFailed:
      return {
        ...state,
        isLoadingSpinner: false
      };
    default:
      return state;
  }
}
