import {UpdateCommercialProfileSuccess, UserActions, UserActionTypes} from './user.actions';
import {UserPermissions} from '../model/user-permissions';
import {Commercial} from '../../commercial/model/commercial';

export interface UserState {
  isLoginLoading: boolean;
  isUserRolesLoaded: boolean;
  userPermission: UserPermissions;
  commercial: Commercial;
}


export const initialUserState: UserState = {
  // additional entity state properties
  isLoginLoading: false,
  isUserRolesLoaded: false,
  userPermission: new UserPermissions(),
  commercial: null
};

export function reducer(state = initialUserState, action: UserActions): UserState {
  switch (action.type) {
    case UserActionTypes.LoginRequest:
      return {
        ...state,
        isLoginLoading: true,
        isUserRolesLoaded: false,

      };
    case UserActionTypes.LoginSuccess:
      return {
        ...state,
        userPermission: action.payload.userPermissions,
        commercial: action.payload.commercial,
        isUserRolesLoaded: true,
        isLoginLoading: false,
      };
    case UserActionTypes.UpdateCommercialProfileSuccess:
      return {
        ...state,
        commercial: action.payload.commercial,
      };
    case UserActionTypes.UpdateCommercialProfileFailed:
      return state;
    case UserActionTypes.LoginFailed:
      return {
        ...state,
        isLoginLoading: false,
        isUserRolesLoaded: false,
        userPermission: new UserPermissions()
      };
    case UserActionTypes.LoadUserRolesIsNotLoadedRequest:
      return {
        ...state,
        isLoginLoading: true,
      };
    case UserActionTypes.LoadUserRolesSuccess:
      return {
        ...state,
        isLoginLoading: false,
        isUserRolesLoaded: true,
        userPermission: action.payload.userPermissions,
        commercial: action.payload.commercial
      };
    case UserActionTypes.LogoutRequest:
      return {...state, isLoginLoading: true};
    case UserActionTypes.LogoutSuccess:
      return {
        ...state,
        isLoginLoading: false,
        userPermission: new UserPermissions()
      };
    case UserActionTypes.LogoutFailed:
      return {
        ...state,
        isLoginLoading: false,
      };
    default:
      return state;
  }
}
