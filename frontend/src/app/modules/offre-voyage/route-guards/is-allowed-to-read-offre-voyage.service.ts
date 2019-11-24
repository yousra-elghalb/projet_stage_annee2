import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {createSelector, Store} from '@ngrx/store';
import {OffreVoyageState} from '../store/offre-voyage.reducer';
import {selectCommercial, selectUserPermissions} from '../../user/store/user.selectors';

@Injectable({
  providedIn: 'root'
})
export class IsAllowedToReadOffreVoyageService implements CanActivate, CanActivateChild {

  constructor(private router: Router, private store: Store<OffreVoyageState>) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> |
    Promise<boolean | UrlTree>
    | boolean | UrlTree {
    console.log('jaaaaaa');
    return this.store.select(createSelector(selectUserPermissions, selectCommercial, (s1, s2) => {
      return s1.isAdmin || s1.offreVoyage.read === 1 || s2.limitedAccess;
    }));
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(childRoute, state);
  }
}
