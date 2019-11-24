import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {filter, first, take} from 'rxjs/operators';
import {HotelService} from '../service/hotel.service';
import {HotelState} from '../store/hotel.reducer';
import {selectFeatureHotels} from '../store/hotel.selectors';
import {Hotelsloading, LoadHotelsFailed, LoadHotelsSuccess} from '../store/hotel.actions';


@Injectable()
export class HotelsResolverService implements Resolve<boolean> {


  constructor(private store: Store<HotelState>,
              private hotelService: HotelService,
              private router: Router) {
    // this.store.dispatch(new LoadRequestCategory());
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Observable(subscriber => {
      this.store.select(selectFeatureHotels).pipe(first()).subscribe(value => {
        if (value.isLoaded) {
          subscriber.next(true);
          subscriber.complete();
        } else {
          this.store.dispatch(new Hotelsloading());
          this.hotelService.findAll('').subscribe(value1 => {
            this.store.dispatch(new LoadHotelsSuccess({hotel: value1}));
            subscriber.next(true);
            subscriber.complete();
          }, error1 => {
            this.store.dispatch(new LoadHotelsFailed());
            subscriber.error(error1);
          });
        }
      });
    });
  }


}
