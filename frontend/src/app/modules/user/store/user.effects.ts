import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';

import {catchError, concatMap, filter, map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';

import {User} from '../model/user';
import {UserService} from '../service/user.service';
import {select, Store} from '@ngrx/store';
import {UserState} from './user.reducer';

import {
  LoadUserRolesSuccess,
  LoginFailed,
  LoginRequest,
  LoginSuccess,
  LogoutFailed, LogoutRequest,
  LogoutSuccess,
  UserActions,
  UserActionTypes
} from './user.actions';
import {selectUserRolesIsLoaded} from './user.selectors';
import {Router} from '@angular/router';


@Injectable()
export class UserEffects {

  constructor(private actions$: Actions<UserActions>,
              private userService: UserService,
              private userState: Store<UserState>,
              private router: Router) {
  }

  @Effect()
  loginUser$ = this.actions$.pipe(
    ofType(UserActionTypes.LoginRequest),
    switchMap((action: LoginRequest) => {
      return this.userService.signUp(action.payload.user);
    }),
    map(source => {
      this.router.navigate(['/']);
      return new LoginSuccess({userPermissions: this.userService.getUserPermissions(), commercial: this.userService.getCommercial()});
    }),
    catchError((err, caught) => {
      this.userState.dispatch(new LoginFailed(err));
      return caught;
    })
  );
  @Effect()
  logoutUser$ = this.actions$.pipe(
    ofType(UserActionTypes.LogoutRequest),
    switchMap((action: LogoutRequest) => {
      return this.userService.logout();
    }),
    map(source => {
      this.router.navigate(['/login']);
      return new LogoutSuccess();
    }),
    catchError((err, caught) => {
      this.userState.dispatch(new LogoutFailed());
      return caught;
    })
  );

  @Effect()
  loadUserRolesIsNotLoadedRequest$ = this.actions$.pipe(
    ofType(UserActionTypes.LoadUserRolesIsNotLoadedRequest),
    withLatestFrom(this.userState.pipe(select(selectUserRolesIsLoaded))),
    filter(([action, isUserRoleLoaded]: [any, boolean]) => {
      return !isUserRoleLoaded;
    }),
    map(source => new LoadUserRolesSuccess({userPermissions: this.userService.getUserPermissions(), commercial: this.userService.getCommercial()})),
    catchError(() => EMPTY)
  );

}
