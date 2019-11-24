import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig, MatTableDataSource} from '@angular/material';
import {Societe} from '../../model/societe';
import {PaginatorInformations} from '../../../../shared_models/paginator-informations';
import {select, Store} from '@ngrx/store';
import {SocieteState} from '../../store/societe.reducer';
import {selectAllSocietes, selectSocieteSearch} from '../../store/societe.selectors';
import {ConfirmComponent} from '../../../../layouts/alerts/confirm/confirm.component';
import {DeleteSocieteRequest, LoadOneSocieteRequest, LoadSocietesRequest} from '../../store/societe.actions';
import {DialogAddSocieteComponent} from '../dialog-add-societe/dialog-add-societe.component';
import {DialogUpdateSocieteComponent} from '../dialog-update-societe/dialog-update-societe.component';
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
  dataSource: MatTableDataSource<Societe>;
  search: string;
  userPermission: Observable<UserPermissions>;

  constructor(private store: Store<SocieteState>, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.userPermission = this.store.select(selectUserPermissions);

    this.store.pipe(select(selectAllSocietes)).subscribe(value => {
      this.dataSource = new MatTableDataSource(value);
    });
    this.store.pipe(select(selectSocieteSearch)).subscribe(value => {
      this.search = value;
    });
  }

  delete(selectedId: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {titre: 'Suppression', body: 'Voulez-vous supprimer ?'};
    dialogConfig.width = '440px';
    this.dialog.open(ConfirmComponent, dialogConfig).afterClosed().subscribe(value => {
      if (value) {
        this.store.dispatch(new DeleteSocieteRequest({id: selectedId}));
      }
    });
  }

  change(paginator) {
    this.store.dispatch(new LoadSocietesRequest(
      this.search));
  }

  newElement() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.dialog.open(DialogAddSocieteComponent, dialogConfig);
  }

  update(selectedId: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.store.dispatch(new LoadOneSocieteRequest({id: selectedId}));
    this.dialog.open(DialogUpdateSocieteComponent, dialogConfig);
  }

  onSearch($event: any) {
    this.store.dispatch(new LoadSocietesRequest(
      $event));
  }
}
