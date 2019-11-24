import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Store} from '@ngrx/store';
import {Option} from '../model/option';
import {OptionState} from '../store/option.reducer';
import {Observable} from 'rxjs';
import {LoadOptionsIsNotLoadedRequest, LoadOptionsRequest} from '../store/option.actions';
import {selectOptionIsLoading} from '../store/option.selectors';
import {ignore} from 'selenium-webdriver/testing';
import {filter, take} from 'rxjs/operators';

@Injectable()
export class OptionsResolverService implements Resolve<boolean> {

  constructor(private store: Store<OptionState>) {
    // this.store.dispatch(new LoadRequestCategory());
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.store.dispatch(new LoadOptionsIsNotLoadedRequest());
    return this.store.select(selectOptionIsLoading).pipe(filter(value => !value), take(1));
  }


}
