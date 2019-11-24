import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Store} from '@ngrx/store';
import {DepenseState} from '../store/depense.reducer';
import {Observable} from 'rxjs';
import {
  LoadDepensesFailed,
  LoadDepensesIsNotLoadedRequest,
  LoadDepensesSuccess,
  SetAndIsLoadingDepense
} from '../store/depense.actions';
import {selectDepenseSearchAndisLoaded} from '../store/depense.selectors';
import {first} from 'rxjs/operators';
import {DepenseService} from '../service/depense.service';

@Injectable()
export class DepensesResolverService implements Resolve<boolean> {

  constructor(private store: Store<DepenseState>, private depenseService: DepenseService) {
    // this.store.dispatch(new LoadRequestCategory());
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // this.store.dispatch(new LoadDepensesIsNotLoadedRequest());
    // return this.store.select(selectDepenseIsLoading).pipe(filter(value => !value), take(1));

    return new Observable(subscriber => {
      this.store.select(selectDepenseSearchAndisLoaded).pipe(first()).subscribe(value => {
        if (value.isLoaded) {
          subscriber.next(true);
          subscriber.complete();
        } else {
          this.store.dispatch(new SetAndIsLoadingDepense({isLoading: true}));
          this.depenseService.findAll(value.search).subscribe(value1 => {
            this.store.dispatch(new LoadDepensesSuccess({depense: value1}));
            subscriber.next(true);
            subscriber.complete();
          }, error1 => {
            this.store.dispatch(new LoadDepensesFailed());
            subscriber.error(error1);
          });
        }
      });
    });
  }


}
