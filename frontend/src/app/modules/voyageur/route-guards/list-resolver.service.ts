import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Store} from '@ngrx/store';
import {VoyageurState} from '../store/voyageur.reducer';
import {Observable} from 'rxjs';
import {
  LoadVoyageursFailed,
  LoadVoyageursIsNotLoadedRequest,
  LoadVoyageursRequest,
  LoadVoyageursSuccess,
  Voyageursloading
} from '../store/voyageur.actions';
import {filter, first, take} from 'rxjs/operators';
import {selectFeatureVoyageurs, selectVoyageurIsLoading} from '../store/voyageur.selectors';
import {VoyageurService} from '../service/voyageur.service';

@Injectable()
export class ListResolverService implements Resolve<boolean> {

  constructor(private store: Store<VoyageurState>,
              private voyageurService: VoyageurService,
              private router: Router) {
    // this.store.dispatch(new LoadRequestCategory());
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const vfidele = route.paramMap.get('fidele') as any;
    const black = route.paramMap.get('black') as any;
    return new Observable(subscriber => {
      this.store.select(selectFeatureVoyageurs).pipe(first()).subscribe(value => {
        if (value.isLoaded && vfidele.toString() === value.fidele.toString()) {
          subscriber.next(true);
          subscriber.complete();
        } else {
          this.store.dispatch(new Voyageursloading());
          this.voyageurService.findAll({current_page: 0, per_page: 15}, '', vfidele, black).subscribe(value1 => {
            this.store.dispatch(new LoadVoyageursSuccess({fidele: vfidele, paginatedResults: value1}));
            subscriber.next(true);
            subscriber.complete();
          }, error1 => {
            this.store.dispatch(new LoadVoyageursFailed());
            subscriber.error(error1);
          });
        }
      });
    });
  }


}
