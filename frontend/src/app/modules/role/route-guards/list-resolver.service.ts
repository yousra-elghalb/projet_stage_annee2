import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Store} from '@ngrx/store';
import {Role} from '../model/role';
import {RoleState} from '../store/role.reducer';
import {Observable} from 'rxjs';
import {LoadRolesIsNotLoadedRequest, LoadRolesRequest} from '../store/role.actions';
import {selectRoleIsLoading} from '../store/role.selectors';
import {filter, take} from 'rxjs/operators';

@Injectable()
export class ListResolverService implements Resolve<boolean> {

  constructor(private store: Store<RoleState>) {
    // this.store.dispatch(new LoadRequestCategory());
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.store.dispatch(new LoadRolesIsNotLoadedRequest());
    return this.store.select(selectRoleIsLoading).pipe(filter(value => !value), take(1));
  }


}
