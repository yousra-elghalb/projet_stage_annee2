import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {filter, take} from 'rxjs/operators';
import {UserState} from '../store/user.reducer';
import {LoadUserRolesIsNotLoadedRequest} from '../store/user.actions';
import {selectUserRolesIsLoaded} from '../store/user.selectors';

@Injectable()
export class UserRolesResolverService implements Resolve<boolean> {

  constructor(private store: Store<UserState>) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.store.dispatch(new LoadUserRolesIsNotLoadedRequest());
    return this.store.select(selectUserRolesIsLoaded).pipe(filter(value => value), take(1));
  }


}
