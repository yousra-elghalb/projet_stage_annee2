import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig, MatTableDataSource} from '@angular/material';
import {Pays} from '../../model/pays';
import {PaginatorInformations} from '../../../../shared_models/paginator-informations';
import {select, Store} from '@ngrx/store';
import {PaysState} from '../../store/pays.reducer';
import {selectAllPayss, selectPaysSearch} from '../../../pays/store/pays.selectors';
import {ConfirmComponent} from '../../../../layouts/alerts/confirm/confirm.component';
import {DeletePaysRequest, LoadOnePaysRequest, LoadPayssRequest} from '../../../pays/store/pays.actions';
import {DialogAddPaysComponent} from '../dialog-add-pays/dialog-add-pays.component';
import {DialogUpdatePaysComponent} from '../dialog-update-pays/dialog-update-pays.component';
import {selectUserPermissions} from '../../../user/store/user.selectors';
import {Observable} from 'rxjs';
import {UserPermissions} from '../../../user/model/user-permissions';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {


  displayedColumns: string[] = ['id', 'nom', 'actions'];
  dataSource: MatTableDataSource<Pays>;
  search: string;
  userPermission: Observable<UserPermissions>;

  constructor(private store: Store<PaysState>, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.userPermission = this.store.select(selectUserPermissions);

    this.store.pipe(select(selectAllPayss)).subscribe(value => {
      this.dataSource = new MatTableDataSource(value);
    });
    this.store.pipe(select(selectPaysSearch)).subscribe(value => {
      this.search = value;
    });
  }

  delete(selectedId: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {titre: 'Suppression', body: 'Voulez-vous supprimer ?'};
    dialogConfig.width = '440px';
    this.dialog.open(ConfirmComponent, dialogConfig).afterClosed().subscribe(value => {
      if (value) {
        this.store.dispatch(new DeletePaysRequest({id: selectedId}));
      }
    });
  }

  change(paginator) {
    this.store.dispatch(new LoadPayssRequest(
      this.search));
  }

  newElement() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.dialog.open(DialogAddPaysComponent, dialogConfig);
  }

  update(selectedId: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.store.dispatch(new LoadOnePaysRequest({id: selectedId}));
    this.dialog.open(DialogUpdatePaysComponent, dialogConfig);
  }

  onSearch($event: any) {
    this.store.dispatch(new LoadPayssRequest(
      $event));
  }
}
