import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Store} from '@ngrx/store';
import {Voyage} from '../model/voyage';
import {VoyageState} from '../store/voyage.reducer';
import {Observable} from 'rxjs';
import {LoadVoyagesIsNotLoadedRequest, LoadVoyagesRequest} from '../store/voyage.actions';
import {selectVoyageIsLoading} from '../store/voyage.selectors';
import {filter, map, take} from 'rxjs/operators';
import {VoyageService} from '../service/voyage.service';

@Injectable()
export class VoyageResolverService implements Resolve<Voyage> {

  constructor(private voyageService: VoyageService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Voyage> | Promise<Voyage> | Voyage {
    const id = route.paramMap.get('id');
    return this.voyageService.findById(parseFloat(id));
  }


}
