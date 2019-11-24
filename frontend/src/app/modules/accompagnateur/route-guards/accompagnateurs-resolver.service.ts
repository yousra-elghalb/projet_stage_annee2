import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Store} from '@ngrx/store';
import {Accompagnateur} from '../model/accompagnateur';
import {AccompagnateurState} from '../store/accompagnateur.reducer';
import {Observable} from 'rxjs';
import {
  Accompagnateursloading,
  LoadAccompagnateursFailed,
  LoadAccompagnateursIsNotLoadedRequest,
  LoadAccompagnateursRequest,
  LoadAccompagnateursSuccess
} from '../store/accompagnateur.actions';
import {selectAccompagnateurIsLoading, selectFeatureAccompagnateurs} from '../store/accompagnateur.selectors';
import {filter, first, take} from 'rxjs/operators';
import {AccompagnateurService} from '../service/accompagnateur.service';


@Injectable()
export class AccompagnateursResolverService implements Resolve<boolean> {

  constructor(private store: Store<AccompagnateurState>,
              private accompagnateurService: AccompagnateurService,
              private router: Router) {
    // this.store.dispatch(new LoadRequestCategory());
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Observable(subscriber => {
      this.store.select(selectFeatureAccompagnateurs).pipe(first()).subscribe(value => {
        if (value.isLoaded) {
          subscriber.next(true);
          subscriber.complete();
        } else {
          this.store.dispatch(new Accompagnateursloading());
          this.accompagnateurService.findAll('').subscribe(value1 => {
            this.store.dispatch(new LoadAccompagnateursSuccess({accompagnateur: value1}));
            subscriber.next(true);
            subscriber.complete();
          }, error1 => {
            this.store.dispatch(new LoadAccompagnateursFailed());
            subscriber.error(error1);
          });
        }
      });
    });
  }


}
