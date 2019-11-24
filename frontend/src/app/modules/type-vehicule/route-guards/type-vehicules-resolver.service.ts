import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Store} from '@ngrx/store';
import {TypeVehiculeState} from '../store/type-vehicule.reducer';
import {Observable} from 'rxjs';
import {
  LoadTypeVehiculesFailed,
  LoadTypeVehiculesSuccess,
  SetAndIsLoadingTypeVehicule
} from '../store/type-vehicule.actions';
import {selectTypeVehiculeSearchAndisLoaded} from '../store/type-vehicule.selectors';
import {first} from 'rxjs/operators';
import {TypeVehiculeService} from '../service/type-vehicule.service';

@Injectable()
export class TypeVehiculesResolverService implements Resolve<boolean> {

  constructor(private store: Store<TypeVehiculeState>, private typeVehiculeService: TypeVehiculeService) {
    // this.store.dispatch(new LoadRequestCategory());
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // this.store.dispatch(new LoadTypeVehiculesIsNotLoadedRequest());
    // return this.store.select(selectTypeVehiculeIsLoading).pipe(filter(value => !value), take(1));

    return new Observable(subscriber => {
      this.store.select(selectTypeVehiculeSearchAndisLoaded).pipe(first()).subscribe(value => {
        if (value.isLoaded) {
          subscriber.next(true);
          subscriber.complete();
        } else {
          this.store.dispatch(new SetAndIsLoadingTypeVehicule({isLoading: true}));
          this.typeVehiculeService.findAll(value.search).subscribe(value1 => {
            this.store.dispatch(new LoadTypeVehiculesSuccess({typeVehicule: value1}));
            subscriber.next(true);
            subscriber.complete();
          }, error1 => {
            this.store.dispatch(new LoadTypeVehiculesFailed());
            subscriber.error(error1);
          });
        }
      });
    });
  }


}
