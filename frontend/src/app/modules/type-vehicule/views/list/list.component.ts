import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig, MatTableDataSource} from '@angular/material';
import {TypeVehicule} from '../../model/type-vehicule';
import {PaginatorInformations} from '../../../../shared_models/paginator-informations';
import {select, Store} from '@ngrx/store';
import {TypeVehiculeState} from '../../store/type-vehicule.reducer';
import {selectAllTypeVehicules, selectTypeVehiculeSearch} from '../../store/type-vehicule.selectors';
import {ConfirmComponent} from '../../../../layouts/alerts/confirm/confirm.component';
import {DeleteTypeVehiculeRequest, LoadOneTypeVehiculeRequest, LoadTypeVehiculesRequest} from '../../store/type-vehicule.actions';
import {DialogAddTypeVehiculeComponent} from '../dialog-add-type-vehicule/dialog-add-type-vehicule.component';
import {DialogUpdateTypeVehiculeComponent} from '../dialog-update-type-vehicule/dialog-update-type-vehicule.component';
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
  dataSource: MatTableDataSource<TypeVehicule>;
  search: string;
  userPermission: Observable<UserPermissions>;

  constructor(private store: Store<TypeVehiculeState>, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.userPermission = this.store.select(selectUserPermissions);

    this.store.pipe(select(selectAllTypeVehicules)).subscribe(value => {
      this.dataSource = new MatTableDataSource(value);
    });
    this.store.pipe(select(selectTypeVehiculeSearch)).subscribe(value => {
      this.search = value;
    });
  }

  delete(selectedId: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {titre: 'Suppression', body: 'Voulez-vous supprimer ?'};
    dialogConfig.width = '440px';
    this.dialog.open(ConfirmComponent, dialogConfig).afterClosed().subscribe(value => {
      if (value) {
        this.store.dispatch(new DeleteTypeVehiculeRequest({id: selectedId}));
      }
    });
  }

  change(paginator) {
    this.store.dispatch(new LoadTypeVehiculesRequest(
      this.search));
  }

  newElement() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.dialog.open(DialogAddTypeVehiculeComponent, dialogConfig);
  }

  update(selectedId: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.store.dispatch(new LoadOneTypeVehiculeRequest({id: selectedId}));
    this.dialog.open(DialogUpdateTypeVehiculeComponent, dialogConfig);
  }

  onSearch($event: any) {
    this.store.dispatch(new LoadTypeVehiculesRequest(
      $event));
  }
}
