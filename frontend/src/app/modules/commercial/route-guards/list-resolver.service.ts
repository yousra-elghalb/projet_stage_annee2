import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Store} from '@ngrx/store';
import {Commercial} from '../model/commercial';
import {CommercialState} from '../store/commercial.reducer';
import {Observable} from 'rxjs';
import {
  Commercialsloading,
  LoadCommercialsFailed,
  LoadCommercialsSuccess
} from '../store/commercial.actions';
import {filter, first, take} from 'rxjs/operators';
import {selectFeatureCommercials} from '../store/commercial.selectors';
import {CommercialService} from '../service/commercial.service';


@Injectable()
export class ListResolverService implements Resolve<boolean> {

  constructor(private store: Store<CommercialState>, private commercialService: CommercialService) {
    // this.store.dispatch(new LoadRequestCategory());
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Observable(subscriber => {
      this.store.select(selectFeatureCommercials).pipe(first()).subscribe(value => {
        if (value.isLoaded) {
          subscriber.next(true);
          subscriber.complete();
        } else {
          this.store.dispatch(new Commercialsloading());
          this.commercialService.findAll(value.search).subscribe(value1 => {
            this.store.dispatch(new LoadCommercialsSuccess({commercial: value1}));
            subscriber.next(true);
            subscriber.complete();
          }, error1 => {
            this.store.dispatch(new LoadCommercialsFailed());
            subscriber.error(error1);
          });
        }
      });
    });
  }


}
