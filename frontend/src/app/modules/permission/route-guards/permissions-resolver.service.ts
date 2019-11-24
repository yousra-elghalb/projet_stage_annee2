import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {filter, first, take} from 'rxjs/operators';
import {PermissionState} from '../store/permission.reducer';
import {PermissionService} from '../service/permission.service';
import {selectFeaturePermissions} from '../store/permission.selectors';
import {LoadPermissionsFailed, LoadPermissionsSuccess, Permissionsloading} from '../store/permission.actions';

@Injectable()
export class PermissionsResolverService implements Resolve<boolean> {


  constructor(private store: Store<PermissionState>,
              private permissionService: PermissionService,
              private router: Router) {
    // this.store.dispatch(new LoadRequestCategory());
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Observable(subscriber => {
      this.store.select(selectFeaturePermissions).pipe(first()).subscribe(value => {
        if (value.isLoaded) {
          subscriber.next(true);
          subscriber.complete();
        } else {
          this.store.dispatch(new Permissionsloading());
          this.permissionService.findAll('').subscribe(value1 => {
            this.store.dispatch(new LoadPermissionsSuccess({permission: value1}));
            subscriber.next(true);
            subscriber.complete();
          }, error1 => {
            this.store.dispatch(new LoadPermissionsFailed());
            subscriber.error(error1);
          });
        }
      });
    });
  }


}
