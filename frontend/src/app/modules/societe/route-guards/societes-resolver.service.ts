import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Store} from '@ngrx/store';
import {SocieteState} from '../store/societe.reducer';
import {Observable} from 'rxjs';
import {
  LoadSocietesFailed,
  LoadSocietesIsNotLoadedRequest,
  LoadSocietesSuccess,
  SetAndIsLoadingSociete
} from '../store/societe.actions';
import {selectSocieteSearchAndisLoaded} from '../store/societe.selectors';
import {first} from 'rxjs/operators';
import {SocieteService} from '../service/societe.service';

@Injectable()
export class SocietesResolverService implements Resolve<boolean> {

  constructor(private store: Store<SocieteState>, private societeService: SocieteService) {
    // this.store.dispatch(new LoadRequestCategory());
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // this.store.dispatch(new LoadSocietesIsNotLoadedRequest());
    // return this.store.select(selectSocieteIsLoading).pipe(filter(value => !value), take(1));

    return new Observable(subscriber => {
      this.store.select(selectSocieteSearchAndisLoaded).pipe(first()).subscribe(value => {
        if (value.isLoaded) {
          subscriber.next(true);
          subscriber.complete();
        } else {
          this.store.dispatch(new SetAndIsLoadingSociete({isLoading: true}));
          this.societeService.findAll(value.search).subscribe(value1 => {
            this.store.dispatch(new LoadSocietesSuccess({societe: value1}));
            subscriber.next(true);
            subscriber.complete();
          }, error1 => {
            this.store.dispatch(new LoadSocietesFailed());
            subscriber.error(error1);
          });
        }
      });
    });
  }


}
