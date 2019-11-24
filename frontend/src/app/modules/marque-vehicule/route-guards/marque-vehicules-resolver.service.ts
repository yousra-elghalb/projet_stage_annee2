import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Store} from '@ngrx/store';
import {MarqueVehiculeState} from '../store/marque-vehicule.reducer';
import {Observable} from 'rxjs';
import {
  LoadMarqueVehiculesFailed,
  LoadMarqueVehiculesSuccess,
  SetAndIsLoadingMarqueVehicule
} from '../store/marque-vehicule.actions';
import {selectMarqueVehiculeSearchAndisLoaded} from '../store/marque-vehicule.selectors';
import {first} from 'rxjs/operators';
import {MarqueVehiculeService} from '../service/marque-vehicule.service';

@Injectable()
export class MarqueVehiculesResolverService implements Resolve<boolean> {

  constructor(private store: Store<MarqueVehiculeState>, private marqueVehiculeService: MarqueVehiculeService) {
    // this.store.dispatch(new LoadRequestCategory());
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // this.store.dispatch(new LoadMarqueVehiculesIsNotLoadedRequest());
    // return this.store.select(selectMarqueVehiculeIsLoading).pipe(filter(value => !value), take(1));

    return new Observable(subscriber => {
      this.store.select(selectMarqueVehiculeSearchAndisLoaded).pipe(first()).subscribe(value => {
        if (value.isLoaded) {
          subscriber.next(true);
          subscriber.complete();
        } else {
          this.store.dispatch(new SetAndIsLoadingMarqueVehicule({isLoading: true}));
          this.marqueVehiculeService.findAll(value.search).subscribe(value1 => {
            this.store.dispatch(new LoadMarqueVehiculesSuccess({marqueVehicule: value1}));
            subscriber.next(true);
            subscriber.complete();
          }, error1 => {
            this.store.dispatch(new LoadMarqueVehiculesFailed());
            subscriber.error(error1);
          });
        }
      });
    });
  }


}
