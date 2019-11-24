import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {SGroupeService} from '../service/s-groupe.service';
import {SGroupe} from '../model/s-groupe';
import {Store} from '@ngrx/store';
import {OffreVoyageState} from '../../../offre-voyage/store/offre-voyage.reducer';
import {selectFeatureSGroupes} from '../store/s-groupe.selectors';
import {
  LoadOneSGroupeFailed, LoadOneSGroupeRequest,
  LoadOneSGroupeSuccess,
} from '../store/s-groupe.actions';
import {first} from 'rxjs/operators';

@Injectable()
export class GroupeByIdResolverService implements Resolve<SGroupe> {

  constructor(private sGroupeService: SGroupeService, private router: Router, private store: Store<OffreVoyageState>) {
    // this.store.dispatch(new LoadRequestCategory());
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SGroupe> |
    Promise<SGroupe> | SGroupe {
    const vid = route.paramMap.get('id');

    return new Observable(subscriber => {
      this.store.select(selectFeatureSGroupes).pipe(first()).subscribe(value => {
        if (value.selectedOffreVoyageId && value.selectedOffreVoyageId.toString() === vid) {
          subscriber.next(value.sGroupe);
          subscriber.complete();
        } else {
          this.store.dispatch(new LoadOneSGroupeRequest({id: vid}));
          this.sGroupeService.findById(vid).subscribe(value1 => {
            this.store.dispatch(new LoadOneSGroupeSuccess({id: vid, sGroupe: value1}));
            subscriber.next(value1);
            subscriber.complete();
          }, error1 => {
            this.store.dispatch(new LoadOneSGroupeFailed());
            subscriber.error(error1);
          });
        }
      });
    });
  }
}
