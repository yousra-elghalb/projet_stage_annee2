import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Store} from '@ngrx/store';
import {CategorieState} from '../store/categorie.reducer';
import {combineLatest, concat, Observable, of} from 'rxjs';
import {Categoriesloading, LoadCategoriesFailed, LoadCategoriesIsNotLoadedRequest, LoadCategoriesSuccess} from '../store/categorie.actions';
import {concatAll, filter, first, map, take} from 'rxjs/operators';

import {CategorieService} from '../service/categorie.service';
import {selectFeatureCategories} from '../store/categorie.selectors';

@Injectable()
export class CategoriesResolverService implements Resolve<boolean> {

  constructor(private store: Store<CategorieState>, private categorieService: CategorieService) {
    // this.store.dispatch(new LoadRequestCategory());
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Observable(subscriber => {
      this.store.select(selectFeatureCategories).pipe(first()).subscribe(value => {
        if (value.isLoaded) {
          subscriber.next(true);
          subscriber.complete();
        } else {
          this.store.dispatch(new Categoriesloading());
          this.categorieService.findAll('').subscribe(value1 => {
            this.store.dispatch(new LoadCategoriesSuccess({categories: value1}));
            subscriber.next(true);
            subscriber.complete();
          }, error1 => {
            this.store.dispatch(new LoadCategoriesFailed());
            subscriber.error(error1);
          });
        }
      });
    });
  }


}
