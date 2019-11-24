import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Store} from '@ngrx/store';
import {Voyage} from '../model/voyage';
import {VoyageState} from '../store/voyage.reducer';
import {Observable} from 'rxjs';
import {LoadVoyagesIsNotLoadedRequest, LoadVoyagesRequest} from '../store/voyage.actions';
import {selectVoyageIsLoading} from '../store/voyage.selectors';
import {filter, take} from 'rxjs/operators';

@Injectable()
export class ListResolverService implements Resolve<boolean> {

  constructor(private store: Store<VoyageState>) {
    // this.store.dispatch(new LoadRequestCategory());
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.store.dispatch(new LoadVoyagesIsNotLoadedRequest());
    return this.store.select(selectVoyageIsLoading).pipe(filter(value => !value), take(1));
  }


}
