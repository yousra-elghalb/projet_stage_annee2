import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Store} from '@ngrx/store';
import {OffreVoyage} from '../model/offre-voyage';
import {OffreVoyageState} from '../store/offre-voyage.reducer';
import {Observable} from 'rxjs';
import {LoadOffreVoyagesIsNotLoadedRequest, LoadOffreVoyagesRequest} from '../store/offre-voyage.actions';
import {selectOffreVoyageIsLoading} from '../store/offre-voyage.selectors';
import {filter, map, take} from 'rxjs/operators';
import {OffreVoyageService} from '../service/offre-voyage.service';

@Injectable()
export class OffreVoyageResolverService implements Resolve<OffreVoyage> {

  constructor(private offreVoyageService: OffreVoyageService, private router: Router) {
    // this.store.dispatch(new LoadRequestCategory());
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<OffreVoyage> | Promise<OffreVoyage> | OffreVoyage {
    const id = route.paramMap.get('offreId');
    return this.offreVoyageService.findById(parseFloat(id)).pipe(map(value => {
      if (value) {
        return value;
      } else {
        this.router.navigate(['/offreVoyage']);
        return null;
      }
    }));
  }


}
