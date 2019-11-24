import {Component, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {RoleState} from '../../modules/role/store/role.reducer';
import {select, Store} from '@ngrx/store';
import {selectIsLoading} from '../../root-state/root.selector';
import {RouteConfigLoadEnd, RouteConfigLoadStart, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  selectIsLoading$: Observable<boolean>;
  isSmall$: Observable<boolean> = this.breakpointObserver.observe('(max-width: 1024px)')
    .pipe(
      map(result => result.matches)
    );

  loadingRouteConfig = false;


  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof RouteConfigLoadStart) {
        this.loadingRouteConfig = true;
      } else if (event instanceof RouteConfigLoadEnd) {
        this.loadingRouteConfig = false;
      }
    });
  }

  constructor(private breakpointObserver: BreakpointObserver, private store: Store<RoleState>, private router: Router) {
    this.selectIsLoading$ = this.store.pipe(select(selectIsLoading));
  }
}
