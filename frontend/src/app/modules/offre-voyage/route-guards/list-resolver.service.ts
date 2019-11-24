import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Store} from '@ngrx/store';
import {OffreVoyage} from '../model/offre-voyage';
import {OffreVoyageState} from '../store/offre-voyage.reducer';
import {Observable} from 'rxjs';
import {
  LoadOffreVoyagesFailed,
  LoadOffreVoyagesIsNotLoadedRequest,
  LoadOffreVoyagesSuccess,
} from '../store/offre-voyage.actions';
import {selectFeatureOffreVoyages} from '../store/offre-voyage.selectors';
import {filter, first, map, take} from 'rxjs/operators';
import {Actions, ofType} from '@ngrx/effects';
import {OffreVoyageService} from '../service/offre-voyage.service';

@Injectable()
export class ListResolverService implements Resolve<boolean> {

  constructor(private store: Store<OffreVoyageState>, private actions: Actions, private offreVoyageService: OffreVoyageService) {
    // this.store.dispatch(new LoadRequestCategory());
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const vid: any = route.paramMap.get('catId');


    return new Observable(subscriber => {
      this.store.select(selectFeatureOffreVoyages).pipe(first()).subscribe(value => {
        // this.selectFeaturePGroupesSub.unsubscribe();
        if (value.isLoaded && vid.toString() === value.selectedCatId) {
          subscriber.next(true);
          subscriber.complete();
        } else {
          this.store.dispatch(new LoadOffreVoyagesIsNotLoadedRequest({id: vid}));
          this.offreVoyageService.findAll(value.paginatorInformations, {...value.search, categorie_id: vid}).subscribe(value1 => {
            this.store.dispatch(new LoadOffreVoyagesSuccess({paginatedResults: value1}));
            subscriber.next(true);
            subscriber.complete();
          }, error1 => {
            this.store.dispatch(new LoadOffreVoyagesFailed());
            subscriber.error(error1);
          });
        }
      });
    });
  }


}
