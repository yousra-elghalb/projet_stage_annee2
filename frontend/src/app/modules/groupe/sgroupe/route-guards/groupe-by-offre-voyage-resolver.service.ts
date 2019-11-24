import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {SGroupeService} from '../service/s-groupe.service';
import {SGroupe} from '../model/s-groupe';
import {selectFeaturePGroupes} from '../../pgroupe/store/p-groupe.selectors';
import {LoadOnePGroupeFailed, LoadOnePGroupeRequest, LoadOnePGroupeSuccess} from '../../pgroupe/store/p-groupe.actions';
import {Store} from '@ngrx/store';
import {OffreVoyageState} from '../../../offre-voyage/store/offre-voyage.reducer';
import {selectFeatureSGroupes} from '../store/s-groupe.selectors';
import {LoadSGroupesByOffreVoyageId, LoadSGroupesFailed, LoadSGroupesSuccess} from '../store/s-groupe.actions';
import {first} from 'rxjs/operators';

@Injectable()
export class GroupeByOffreVoyageResolverService implements Resolve<boolean> {

  constructor(private sGroupeService: SGroupeService, private router: Router, private store: Store<OffreVoyageState>) {
    // this.store.dispatch(new LoadRequestCategory());
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> |
    Promise<boolean> | boolean {
    const vid = route.paramMap.get('offreId');
    return new Observable(subscriber => {
      this.store.select(selectFeatureSGroupes).pipe(first()).subscribe(value => {
        if (value.selectedOffreVoyageId && value.selectedOffreVoyageId.toString() === vid) {
          subscriber.next(true);
          subscriber.complete();
        } else {
          this.store.dispatch(new LoadSGroupesByOffreVoyageId(vid));
          this.sGroupeService.findGroupeByOffreVoyageId(vid).subscribe(value1 => {
            this.store.dispatch(new LoadSGroupesSuccess({sGroupe: value1, idOffreVoyage: vid}));
            subscriber.next(true);
            subscriber.complete();
          }, error1 => {
            this.store.dispatch(new LoadSGroupesFailed());
            subscriber.error(error1);
          });
        }
      });
    });
  }
}
