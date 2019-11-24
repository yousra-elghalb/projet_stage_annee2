import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Store} from '@ngrx/store';
import {RootState} from '../../root-state/reducers';
import {LogoutRequest} from '../../modules/user/store/user.actions';
import {selectCommercial} from '../../modules/user/store/user.selectors';
import {Observable} from 'rxjs';
import {Commercial} from '../../modules/commercial/model/commercial';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {LoadOneCommercialRequest} from '../../modules/commercial/store/commercial.actions';
import {DialogUpdateCommercialComponent} from '../../modules/commercial/views/dialog-update-commercial/dialog-update-commercial.component';
import {DialogUpdateProfleComponent} from '../../modules/commercial/views/dialog-update-profile/dialog-update-profle.component';
import {DialogUpdatePasswordComponent} from '../../modules/commercial/views/dialog-update-password/dialog-update-password.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() drawer: any;
  @Input() isSmall: any;
  commercial: Commercial;

  constructor(private store: Store<RootState>, private dialog: MatDialog) {

  }

  ngOnInit() {
    this.store.select(selectCommercial).subscribe(value => {
      this.commercial = value;
    });

  }

  logout() {
    this.store.dispatch(new LogoutRequest());
  }

  update() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.store.dispatch(new LoadOneCommercialRequest({id: this.commercial.id}));
    this.dialog.open(DialogUpdateProfleComponent, dialogConfig);
  }

  changePassword() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.dialog.open(DialogUpdatePasswordComponent, dialogConfig);
  }
}
