import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig, MatTableDataSource} from '@angular/material';
import {Agence} from '../../model/agence';
import {select, Store} from '@ngrx/store';
import {AgenceState} from '../../store/agence.reducer';
import {selectAllAgences, selectAgenceSearch} from '../../store/agence.selectors';
import {ConfirmComponent} from '../../../../layouts/alerts/confirm/confirm.component';
import {DeleteAgenceRequest, LoadOneAgenceRequest, LoadAgencesRequest} from '../../store/agence.actions';
import {DialogAddAgenceComponent} from '../dialog-add-agence/dialog-add-agence.component';
import {DialogUpdateAgenceComponent} from '../dialog-update-agence/dialog-update-agence.component';
import {Observable} from 'rxjs';
import {UserPermissions} from '../../../user/model/user-permissions';
import {selectUserPermissions} from '../../../user/store/user.selectors';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {


  displayedColumns: string[] = ['id', 'nom', 'logo', 'fax', 'tel', 'email', 'actions'];
  dataSource: MatTableDataSource<Agence>;
  search: string;
  userPermission: Observable<UserPermissions>;

  constructor(
    private store: Store<AgenceState>,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.userPermission = this.store.select(selectUserPermissions);
    this.store.pipe(select(selectAllAgences)).subscribe(value => {
      this.dataSource = new MatTableDataSource(value);
    });
    this.store.pipe(select(selectAgenceSearch)).subscribe(value => {
      this.search = value;
    });
  }

  delete(selectedId: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {titre: 'Suppression', body: 'Voulez-vous supprimer ?'};
    dialogConfig.width = '440px';
    this.dialog.open(ConfirmComponent, dialogConfig).afterClosed().subscribe(value => {
      if (value) {
        this.store.dispatch(new DeleteAgenceRequest({id: selectedId}));
      }
    });
  }

  change(paginator) {
    this.store.dispatch(new LoadAgencesRequest(
      this.search));
  }

  newElement() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.dialog.open(DialogAddAgenceComponent, dialogConfig);
  }

  update(selectedId: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.store.dispatch(new LoadOneAgenceRequest({id: selectedId}));
    this.dialog.open(DialogUpdateAgenceComponent, dialogConfig);
  }

  onSearch($event: any) {
    this.store.dispatch(new LoadAgencesRequest(
      $event));
  }
}
