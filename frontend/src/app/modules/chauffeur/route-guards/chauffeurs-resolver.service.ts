import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {filter, first, take} from 'rxjs/operators';
import {ChauffeurService} from '../service/chauffeur.service';
import {ChauffeurState} from '../store/chauffeur.reducer';
import {selectFeatureChauffeurs} from '../store/chauffeur.selectors';
import {Chauffeursloading, LoadChauffeursFailed, LoadChauffeursSuccess} from '../store/chauffeur.actions';


@Injectable()
export class ChauffeursResolverService implements Resolve<boolean> {


  constructor(private store: Store<ChauffeurState>,
              private chauffeurService: ChauffeurService,
              private router: Router) {
    // this.store.dispatch(new LoadRequestCategory());
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Observable(subscriber => {
      this.store.select(selectFeatureChauffeurs).pipe(first()).subscribe(value => {
        if (value.isLoaded) {
          subscriber.next(true);
          subscriber.complete();
        } else {
          this.store.dispatch(new Chauffeursloading());
          this.chauffeurService.findAll('').subscribe(value1 => {
            this.store.dispatch(new LoadChauffeursSuccess({chauffeur: value1}));
            subscriber.next(true);
            subscriber.complete();
          }, error1 => {
            this.store.dispatch(new LoadChauffeursFailed());
            subscriber.error(error1);
          });
        }
      });
    });
  }


}
