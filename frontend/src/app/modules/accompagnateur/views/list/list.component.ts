import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig, MatTableDataSource} from '@angular/material';
import {Accompagnateur} from '../../model/accompagnateur';
import {PaginatorInformations} from '../../../../shared_models/paginator-informations';
import {select, Store} from '@ngrx/store';
import {AccompagnateurState} from '../../store/accompagnateur.reducer';
import {selectAllAccompagnateurs, selectAccompagnateurSearch} from '../../store/accompagnateur.selectors';
import {ConfirmComponent} from '../../../../layouts/alerts/confirm/confirm.component';
import {DeleteAccompagnateurRequest, LoadOneAccompagnateurRequest, LoadAccompagnateursRequest} from '../../store/accompagnateur.actions';
import {DialogAddAccompagnateurComponent} from '../dialog-add-accompagnateur/dialog-add-accompagnateur.component';
import {DialogUpdateAccompagnateurComponent} from '../dialog-update-accompagnateur/dialog-update-accompagnateur.component';
import {Observable} from 'rxjs';
import {UserPermissions} from '../../../user/model/user-permissions';
import {selectUserPermissions} from '../../../user/store/user.selectors';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {


  displayedColumns: string[] = ['id', 'nom', 'prenom', 'cin', 'tel', 'email', 'actions'];
  dataSource: MatTableDataSource<Accompagnateur>;
  search: string;
  userPermission: Observable<UserPermissions>;

  constructor(
    private store: Store<AccompagnateurState>,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.userPermission = this.store.select(selectUserPermissions);
    this.store.pipe(select(selectAllAccompagnateurs)).subscribe(value => {
      this.dataSource = new MatTableDataSource(value);
    });
    this.store.pipe(select(selectAccompagnateurSearch)).subscribe(value => {
      this.search = value;
    });
  }

  delete(selectedId: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {titre: 'Suppression', body: 'Voulez-vous supprimer ?'};
    dialogConfig.width = '440px';
    this.dialog.open(ConfirmComponent, dialogConfig).afterClosed().subscribe(value => {
      if (value) {
        this.store.dispatch(new DeleteAccompagnateurRequest({id: selectedId}));
      }
    });
  }

  change(paginator) {
    this.store.dispatch(new LoadAccompagnateursRequest(
      this.search));
  }

  newElement() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.dialog.open(DialogAddAccompagnateurComponent, dialogConfig);
  }

  update(selectedId: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.store.dispatch(new LoadOneAccompagnateurRequest({id: selectedId}));
    this.dialog.open(DialogUpdateAccompagnateurComponent, dialogConfig);
  }

  onSearch($event: any) {
    this.store.dispatch(new LoadAccompagnateursRequest(
      $event));
  }
}
