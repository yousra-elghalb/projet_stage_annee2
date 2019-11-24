import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Store} from '@ngrx/store';
import {VehiculeState} from '../store/vehicule.reducer';
import {Observable} from 'rxjs';
import {
  LoadVehiculesFailed,
  LoadVehiculesIsNotLoadedRequest,
  LoadVehiculesSuccess,
  SetAndIsLoadingVehicule
} from '../store/vehicule.actions';
import {selectVehiculeSearchAndisLoaded} from '../store/vehicule.selectors';
import {first} from 'rxjs/operators';
import {VehiculeService} from '../service/vehicule.service';

@Injectable()
export class VehiculesResolverService implements Resolve<boolean> {

  constructor(private store: Store<VehiculeState>, private vehiculeService: VehiculeService) {
    // this.store.dispatch(new LoadRequestCategory());
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // this.store.dispatch(new LoadVehiculesIsNotLoadedRequest());
    // return this.store.select(selectVehiculeIsLoading).pipe(filter(value => !value), take(1));

    return new Observable(subscriber => {
      this.store.select(selectVehiculeSearchAndisLoaded).pipe(first()).subscribe(value => {
        if (value.isLoaded) {
          subscriber.next(true);
          subscriber.complete();
        } else {
          this.store.dispatch(new SetAndIsLoadingVehicule({isLoading: true}));
          this.vehiculeService.findAll(value.search).subscribe(value1 => {
            this.store.dispatch(new LoadVehiculesSuccess({vehicule: value1}));
            subscriber.next(true);
            subscriber.complete();
          }, error1 => {
            this.store.dispatch(new LoadVehiculesFailed());
            subscriber.error(error1);
          });
        }
      });
    });
  }


}
