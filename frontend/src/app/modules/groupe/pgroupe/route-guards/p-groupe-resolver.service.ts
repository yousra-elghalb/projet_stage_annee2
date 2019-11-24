import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {PGroupeService} from '../service/p-groupe.service';
import {PGroupe} from '../model/p-groupe';
import {
  LoadOnePGroupeFailed,
  LoadOnePGroupeRequest,
  LoadOnePGroupeSuccess,
  LoadPGroupesBySameOfOffreVoyageRequest,
  PGroupeActionTypes
} from '../store/p-groupe.actions';
import {
  selectFeaturePGroupes,
  selectPGroupeIsLoading,
  selectPGroupeIsLoadingSpinner,
  selectPGroupeSelectedId,
  selectSelectedPGroupe
} from '../store/p-groupe.selectors';
import {filter, first, map, take} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {OffreVoyageState} from '../../../offre-voyage/store/offre-voyage.reducer';
import {Actions, ofType} from '@ngrx/effects';

@Injectable()
export class PGroupeResolverService implements Resolve<boolean> {
  private selectFeaturePGroupesSub: Subscription;

  constructor(private router: Router,
              private actions: Actions,
              private pgroupService: PGroupeService,
              private store: Store<OffreVoyageState>) {
    // this.store.dispatch(new LoadRequestCategory());
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> |
    Promise<boolean> | boolean {
    const vid = route.paramMap.get('id');
    const vOffid = route.paramMap.get('offreId') as any;


    return new Observable(subscriber => {
      this.store.select(selectFeaturePGroupes).pipe(first()).subscribe(value => {
        // this.selectFeaturePGroupesSub.unsubscribe();
        if (value.selectedId && value.selectedId.toString() === vid) {
          subscriber.next(true);
          subscriber.complete();
        } else {
          this.store.dispatch(new LoadOnePGroupeRequest({ id: vid}));
          this.pgroupService.findById(vid).subscribe(value1 => {
            this.store.dispatch(new LoadOnePGroupeSuccess({id: vid, pGroupe: value1}));
            subscriber.next(true);
            subscriber.complete();
          }, error1 => {
            this.store.dispatch(new LoadOnePGroupeFailed());
            subscriber.error(error1);
          });
        }
      });
    });

    /* return this.store.select(selectPGroupeIsLoading).pipe(filter(value => !value), take(1), map(value => {
       console.warn('HHHHHHHHHHHHHhh', this.store.select(selectSelectedPGroupe).pipe());
       return value;
     }));*/
  }
}
