import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {selectUserPermissions} from '../../user/store/user.selectors';
import {map} from 'rxjs/operators';
import {RootState} from '../../../root-state/reducers';

@Injectable({
  providedIn: 'root'
})
export class IsAllowedToReadPaysService implements CanActivate, CanActivateChild {

  constructor(private router: Router, private store: Store<RootState>) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> |
    Promise<boolean | UrlTree>
    | boolean | UrlTree {
    return this.store.select(selectUserPermissions).pipe(map(value => {
      if (value.isAdmin) {
        return true;
      }
      return value.pays.read === 1;
    }));
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(childRoute, state);
  }
}
