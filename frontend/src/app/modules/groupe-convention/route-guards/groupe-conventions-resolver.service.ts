import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Store} from '@ngrx/store';
import {GroupeConventionState} from '../store/groupe-convention.reducer';
import {Observable} from 'rxjs';
import {
  GroupeConventionsloading,
  LoadGroupeConventionsFailed,
  LoadGroupeConventionsSuccess
} from '../store/groupe-convention.actions';
import {selectFeatureGroupeConventions} from '../store/groupe-convention.selectors';
import {filter, first, take} from 'rxjs/operators';
import {GroupeConventionService} from '../service/groupe-convention.service';


@Injectable()
export class GroupeConventionsResolverService implements Resolve<boolean> {

  constructor(private store: Store<GroupeConventionState>,
              private groupeConventionService: GroupeConventionService,
              private router: Router) {
    // this.store.dispatch(new LoadRequestCategory());
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Observable(subscriber => {
      this.store.select(selectFeatureGroupeConventions).pipe(first()).subscribe(value => {
        if (value.isLoaded) {
          subscriber.next(true);
          subscriber.complete();
        } else {
          this.store.dispatch(new GroupeConventionsloading());
          this.groupeConventionService.findAll().subscribe(value1 => {
            this.store.dispatch(new LoadGroupeConventionsSuccess({paginatedResults: value1}));
            subscriber.next(true);
            subscriber.complete();
          }, error1 => {
            this.store.dispatch(new LoadGroupeConventionsFailed());
            subscriber.error(error1);
          });
        }
      });
    });
  }


}
