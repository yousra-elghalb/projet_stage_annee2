import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Store} from '@ngrx/store';
import {Modalite} from '../model/modalite';
import {Observable} from 'rxjs';
import {
  LoadModalitesFailed,
  LoadModalitesIsNotLoadedRequest,
  LoadModalitesRequest,
  LoadModalitesSuccess,
  Modalitesloading
} from '../store/modalite.actions';
import {selectFeatureModalites} from '../store/modalite.selectors';
import {first} from 'rxjs/operators';
import {ModaliteState} from '../store/modalite.reducer';
import {ModaliteService} from '../service/modalite.service';

@Injectable()
export class ModalitesResolverService implements Resolve<boolean> {

  constructor(private store: Store<ModaliteState>, private modaliteService: ModaliteService) {
    // this.store.dispatch(new LoadRequestCategory());
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Observable(subscriber => {
      this.store.select(selectFeatureModalites).pipe(first()).subscribe(value => {
        if (value.isLoaded) {
          subscriber.next(true);
          subscriber.complete();
        } else {
          this.store.dispatch(new Modalitesloading());
          this.modaliteService.findAll({per_page: 15, current_page: 1}, '').subscribe(value1 => {
            this.store.dispatch(new LoadModalitesSuccess({paginatedResults: value1}));
            subscriber.next(true);
            subscriber.complete();
          }, error1 => {
            this.store.dispatch(new LoadModalitesFailed());
            subscriber.error(error1);
          });
        }
      });
    });
  }


}
