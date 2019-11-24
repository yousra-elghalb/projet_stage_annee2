import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Store} from '@ngrx/store';
import {Ville} from '../model/ville';
import {VilleState} from '../store/ville.reducer';
import {Observable} from 'rxjs';
import {LoadVillesIsNotLoadedRequest, LoadVillesRequest} from '../store/ville.actions';
import {selectVilleIsLoading} from '../store/ville.selectors';
import {ignore} from 'selenium-webdriver/testing';
import {filter, take} from 'rxjs/operators';
import {selectVilleAndPaysIsLoading} from '../../../root-state/root.selector';
import {LoadPayssIsNotLoadedRequest} from '../../pays/store/pays.actions';

@Injectable()
export class VillesResolverService implements Resolve<boolean> {

  constructor(private store: Store<VilleState>) {
    // this.store.dispatch(new LoadRequestCategory());
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.store.dispatch(new LoadVillesIsNotLoadedRequest());
    this.store.dispatch(new LoadPayssIsNotLoadedRequest());
    // return this.store.select(selectVilleIsLoading).pipe(filter(value => !value), take(1));

    return this.store.select(selectVilleAndPaysIsLoading).pipe(filter(value => !value), take(1));
  }


}
