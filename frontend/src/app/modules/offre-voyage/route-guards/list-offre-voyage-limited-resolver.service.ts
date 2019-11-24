import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Store} from '@ngrx/store';
import {OffreVoyageState} from '../store/offre-voyage.reducer';
import {Observable} from 'rxjs';
import {
  LoadOffreVoyagesLimitedIsNotLoadedRequest,
} from '../store/offre-voyage.actions';
import {selectOffreVoyageIsLoading} from '../store/offre-voyage.selectors';
import {filter, take} from 'rxjs/operators';

@Injectable()
export class ListOffreVoyageLimitedResolverService implements Resolve<boolean> {

  constructor(private store: Store<OffreVoyageState>) {
    // this.store.dispatch(new LoadRequestCategory());
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const vid: any = route.paramMap.get('id');
    this.store.dispatch(new LoadOffreVoyagesLimitedIsNotLoadedRequest({id: vid}));
    return this.store.select(selectOffreVoyageIsLoading).pipe(filter(value => !value), take(1));
  }


}
