import {RoleActions, RoleActionTypes} from './role.actions';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Role} from '../model/role';
import {PaginatorInformations} from '../../../shared_models/paginator-informations';
import {isUndefined} from 'util';

export interface RoleState extends EntityState<Role> {
  paginatorInformations: PaginatorInformations;
  isLoading: boolean;
  isLoaded: boolean;
  selectedId?: number;
  search: string;
  isLoadingSpinner: boolean;
}

export const roleEntityAdapter: EntityAdapter<Role> = createEntityAdapter<Role>({selectId: data => data.id});


export const initialRoleState: RoleState = roleEntityAdapter.getInitialState({
  // additional entity state properties
  paginatorInformations: {total: 0, per_page: 15, current_page: 1},
  isLoading: false,
  isLoadingSpinner: false,
  isLoaded: false,
  search: ''
});

export function reducer(state = initialRoleState, action: RoleActions): RoleState {
  switch (action.type) {
    case RoleActionTypes.LoadRolesRequest:
      return {
        ...state,
        search: action.search,
        isLoading: true,
        isLoaded: false
      };
    case RoleActionTypes.LoadRolesIsNotLoadedRequest:

      state = {...state, isLoading: !state.isLoaded};
      return {
        ...state
      };
    case RoleActionTypes.LoadRolesSuccess:
      let pi: any;
      pi = {...action.payload.paginatedResults};
      pi.data = null;
      state = roleEntityAdapter.addAll(action.payload.paginatedResults.data, state);
      return {
        ...state,
        paginatorInformations: pi,
        isLoading: false,
        isLoaded: true
      };
    case RoleActionTypes.LoadRolesFailed:
      return {
        ...state,
        isLoading: false,
        isLoaded: false
      };
    case RoleActionTypes.UpdateRoleRequest:
      return {
        ...state,
        isLoadingSpinner: true
      };
    case RoleActionTypes.UpdateRoleSuccess:
      state = roleEntityAdapter.updateOne({
        id: action.payload.role.id,
        changes: {...action.payload.role}
      }, state);
      return {
        ...state,
        isLoadingSpinner: false
      };
    case RoleActionTypes.UpdateRoleFailed:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case RoleActionTypes.SaveRoleRequest:
      return {
        ...state,
        isLoadingSpinner: true
      };
    case RoleActionTypes.SaveRoleSuccess:
      state = roleEntityAdapter.addOne(action.payload.role, state);
      return {
        ...state,
        isLoadingSpinner: false
      };
    case RoleActionTypes.SaveRoleFailed:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case RoleActionTypes.DeleteRoleRequest:
      return {
        ...state,
        selectedId: action.payload.id,
        isLoading: true
      };
    case RoleActionTypes.DeleteRoleSuccess:
      state = roleEntityAdapter.removeOne(state.selectedId, state);
      return {
        ...state,
        selectedId: 0,
        isLoading: false,
        paginatorInformations: {
          ...state.paginatorInformations,
          total: state.paginatorInformations.total - 1
        }
      };
    case RoleActionTypes.DeleteRoleFailed:
      return {
        ...state,
        selectedId: 0,
        isLoading: false
      };
    case RoleActionTypes.LoadOneRoleRequest:
      return {
        ...state,
        selectedId: action.payload.id,
        isLoadingSpinner: true
      };
    case RoleActionTypes.LoadOneRoleSuccess:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case RoleActionTypes.LoadOneRoleFailed:
      return {
        ...state,
        isLoadingSpinner: false
      };
    default:
      return state;
  }
}
