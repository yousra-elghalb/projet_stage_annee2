import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {filter, take} from 'rxjs/operators';
import {SousCategorieState} from '../store/sous-categorie.reducer';
import {LoadSousCategoriesIsNotLoadedRequest} from '../store/sous-categorie.actions';
import {selectSousCategorieIsLoading} from '../store/sous-categorie.selectors';

@Injectable()
export class SousCategoriesResolverService implements Resolve<boolean> {

  constructor(private store: Store<SousCategorieState>) {
    // this.store.dispatch(new LoadRequestCategory());
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.store.dispatch(new LoadSousCategoriesIsNotLoadedRequest());
    return this.store.select(selectSousCategorieIsLoading).pipe(filter(value => !value), take(1));
  }


}
