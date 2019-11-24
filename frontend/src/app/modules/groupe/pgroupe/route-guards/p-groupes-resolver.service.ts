import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Store} from '@ngrx/store';
import {OffreVoyageState} from '../../../offre-voyage/store/offre-voyage.reducer';
import {Observable, Subscription} from 'rxjs';
import {filter, first, map, take} from 'rxjs/operators';
import {OffreVoyageService} from '../../../offre-voyage/service/offre-voyage.service';
import {
  LoadPGroupesBySameOfOffreVoyageRequest, LoadPGroupesFailed, LoadPGroupesSuccess,
} from '../store/p-groupe.actions';
import {
  selectFeaturePGroupes,
} from '../store/p-groupe.selectors';
import {Actions, ofType} from '@ngrx/effects';
import {SGroupeService} from '../../sgroupe/service/s-groupe.service';
import {PGroupeService} from '../service/p-groupe.service';

@Injectable()
export class PGroupesResolverService implements Resolve<boolean> {
  private selectFeaturePGroupesSub: Subscription;

  constructor(private pGroupService: PGroupeService,
              private router: Router,
              private store: Store<OffreVoyageState>, private actions: Actions) {
    // this.store.dispatch(new LoadRequestCategory());
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> |
    Promise<boolean> | boolean {
    // LoadPGroupesBySameOfOffreVoyageRequest
    const vid = route.paramMap.get('offreId');
    // return this.offreVoyageService.findAllVoyageur(parseFloat(id));
    return new Observable(subscriber => {
      this.selectFeaturePGroupesSub = this.store.select(selectFeaturePGroupes).pipe(first()).subscribe(value => {
        // this.selectFeaturePGroupesSub.unsubscribe();
        if ((value.selectedOffreVoyageId && value.selectedOffreVoyageId.toString() === vid)) {
          subscriber.next(true);
          subscriber.complete();
        } else {
          this.store.dispatch(new LoadPGroupesBySameOfOffreVoyageRequest());
          this.pGroupService.findAll(vid, value.paginatorInformations, value.search).subscribe(value1 => {
            this.store.dispatch(new LoadPGroupesSuccess({paginatedResults: value1, idOffreVoyage: vid}));
            subscriber.next(true);
            subscriber.complete();
          }, error1 => {
            this.store.dispatch(new LoadPGroupesFailed());
            subscriber.error(error1);
          });
        }
      });
    });
  }
}
