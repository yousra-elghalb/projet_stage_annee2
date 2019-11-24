import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {selectUserPermissions, selectUserRolesIsLoaded} from '../../user/store/user.selectors';
import {filter, map, switchMap, take} from 'rxjs/operators';
import {RootState} from '../../../root-state/reducers';
import {LoadUserRolesIsNotLoadedRequest} from '../../user/store/user.actions';

@Injectable({
  providedIn: 'root'
})
export class IsAllowedToReadVilleService implements CanActivate, CanActivateChild {

  constructor(private router: Router, private store: Store<RootState>) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> |
    Promise<boolean | UrlTree>
    | boolean | UrlTree {
    /*this.store.dispatch(new LoadUserRolesIsNotLoadedRequest());
    return this.store.select(selectUserRolesIsLoaded).pipe(filter(value => value), take(1),
      switchMap(value => this.store.select(selectUserPermissions).pipe(map(value2 => {
        if (value2.isAdmin) {
          return true;
        }
        return value2.ville.read === 1;
      }))));*/
    return this.store.select(selectUserPermissions).pipe(map(value => {
      if (value.isAdmin) {
        return true;
      }
      return value.ville.read === 1;
    }));
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(childRoute, state);
  }
}
