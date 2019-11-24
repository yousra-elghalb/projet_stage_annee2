import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Store} from '@ngrx/store';
import {Agence} from '../model/agence';
import {AgenceState} from '../store/agence.reducer';
import {Observable} from 'rxjs';
import {
  Agencesloading,
  LoadAgencesFailed,
  LoadAgencesIsNotLoadedRequest,
  LoadAgencesRequest,
  LoadAgencesSuccess
} from '../store/agence.actions';
import {selectAgenceIsLoading, selectFeatureAgences} from '../store/agence.selectors';
import {filter, first, take} from 'rxjs/operators';
import {AgenceService} from '../service/agence.service';

@Injectable()
export class AgencesResolverService implements Resolve<boolean> {

  constructor(private store: Store<AgenceState>, private agenceService: AgenceService) {
    // this.store.dispatch(new LoadRequestCategory());
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Observable(subscriber => {
      this.store.select(selectFeatureAgences).pipe(first()).subscribe(value => {
        if (value.isLoaded) {
          subscriber.next(true);
          subscriber.complete();
        } else {
          this.store.dispatch(new Agencesloading());
          this.agenceService.findAll('').subscribe(value1 => {
            this.store.dispatch(new LoadAgencesSuccess({agence: value1}));
            subscriber.next(true);
            subscriber.complete();
          }, error1 => {
            this.store.dispatch(new LoadAgencesFailed());
            subscriber.error(error1);
          });
        }
      });
    });
  }


}
