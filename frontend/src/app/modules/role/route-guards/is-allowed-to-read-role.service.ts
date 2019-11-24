import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {RoleState} from '../store/role.reducer';
import {selectUserPermissions} from '../../user/store/user.selectors';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IsAllowedToReadRoleService implements CanActivate, CanActivateChild {

  constructor(private router: Router, private store: Store<RoleState>) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> |
    Promise<boolean | UrlTree>
    | boolean | UrlTree {
    return this.store.select(selectUserPermissions).pipe(map(value => {
      if (value.isAdmin) {
        return true;
      }
      return value.role.read === 1;
    }));
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(childRoute, state);
  }
}
