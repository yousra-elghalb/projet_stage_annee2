import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Store} from '@ngrx/store';
import {Pays} from '../model/pays';
import {PaysState} from '../store/pays.reducer';
import {Observable} from 'rxjs';
import {LoadPayssIsNotLoadedRequest, LoadPayssRequest} from '../store/pays.actions';
import {selectPaysIsLoading} from '../store/pays.selectors';
import {ignore} from 'selenium-webdriver/testing';
import {filter, take} from 'rxjs/operators';

@Injectable()
export class PaysResolverService implements Resolve<boolean> {

  constructor(private store: Store<PaysState>) {
    // this.store.dispatch(new LoadRequestCategory());
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.store.dispatch(new LoadPayssIsNotLoadedRequest());
    return this.store.select(selectPaysIsLoading).pipe(filter(value => !value), take(1));
  }


}
