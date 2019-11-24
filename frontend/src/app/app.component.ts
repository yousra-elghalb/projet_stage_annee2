import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Store} from '@ngrx/store';
import {Role} from './modules/role/model/role';
import {RoleState} from './modules/role/store/role.reducer';
import {LoadRolesRequest} from './modules/role/store/role.actions';
import {MatDialog, MatSnackBar} from '@angular/material';
import {RootState} from './root-state/reducers';
import {Observable} from 'rxjs';
import {selectLoginIsLoading} from './modules/user/store/user.selectors';
import {RouteConfigLoadEnd, RouteConfigLoadStart, Router} from '@angular/router';
import {Actions, ofType} from '@ngrx/effects';
import {VilleActionTypes} from './modules/ville/store/ville.actions';
import {map} from 'rxjs/operators';
import {UserActionTypes} from './modules/user/store/user.actions';
import {CommercialActionTypes} from './modules/commercial/store/commercial.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  isLoginLoadng$: Observable<boolean>;

  constructor(private snackBar: MatSnackBar, private store: Store<RootState>, private translate: TranslateService, private  actions: Actions) {
    translate.setDefaultLang('fr');
    this.isLoginLoadng$ = this.store.select(selectLoginIsLoading);
  }

  ngOnInit(): void {
    this.actions.pipe(ofType(
      UserActionTypes.UpdateCommercialProfileSuccess,
      CommercialActionTypes.UpdateCommercialchangePasswordSuccess),
      map(value => {
        this.translate.get('message success update').subscribe(value1 => {
          this.snackBar.open(value1, 'X');
        });
      })
    ).subscribe();
    this.actions.pipe(ofType(
      UserActionTypes.UpdateCommercialProfileFailed,
      CommercialActionTypes.UpdateCommercialchangePasswordFailed),
      map(value => {
        this.translate.get('message failed update').subscribe(value1 => {
          this.snackBar.open(value1, 'X');
        });
      })
    ).subscribe();
  }


}
