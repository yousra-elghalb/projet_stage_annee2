import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, of} from 'rxjs';
import {UserService} from '../service/user.service';
import {filter, switchMap, take} from 'rxjs/operators';
import {selectUserRolesIsLoaded} from '../store/user.selectors';
import {Store} from '@ngrx/store';
import {RootState} from '../../../root-state/reducers';
import {LoadUserRolesIsNotLoadedRequest} from '../store/user.actions';
import {fadeInContent} from '@angular/material';

@Injectable()
export class IsAuthenticatedService implements CanActivate, CanActivateChild {

  constructor(private userService: UserService, private router: Router, private store: Store<RootState>) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean | UrlTree {
    const isValid = this.userService.isValid();
    if (!isValid) {
      this.router.navigate(['/login']);
    } else {
      this.store.dispatch(new LoadUserRolesIsNotLoadedRequest());
      return this.store.select(selectUserRolesIsLoaded).pipe(filter(value => value), take(1), switchMap(value => of(true)));
    }
    return false;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> |
    Promise<boolean | UrlTree> |
    boolean | UrlTree {
    return this.canActivate(childRoute, state);
  }
}
