import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig, MatTableDataSource} from '@angular/material';
import {Vehicule} from '../../model/vehicule';
import {PaginatorInformations} from '../../../../shared_models/paginator-informations';
import {select, Store} from '@ngrx/store';
import {VehiculeState} from '../../store/vehicule.reducer';
import {selectAllVehicules, selectVehiculeSearch} from '../../store/vehicule.selectors';
import {ConfirmComponent} from '../../../../layouts/alerts/confirm/confirm.component';
import {DeleteVehiculeRequest, LoadOneVehiculeRequest, LoadVehiculesRequest} from '../../store/vehicule.actions';
import {DialogAddVehiculeComponent} from '../dialog-add-vehicule/dialog-add-vehicule.component';
import {DialogUpdateVehiculeComponent} from '../dialog-update-vehicule/dialog-update-vehicule.component';
import {selectUserPermissions} from '../../../user/store/user.selectors';
import {Observable} from 'rxjs';
import {UserPermissions} from '../../../user/model/user-permissions';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {


  displayedColumns: string[] = ['id',
    'immatriculation',
    'place',
    'date_ex_assurance',
    'type',
    'marque',
    'societe',
    'actions'];
  dataSource: MatTableDataSource<Vehicule>;
  search: string;
  userPermission: Observable<UserPermissions>;

  constructor(private store: Store<VehiculeState>, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.userPermission = this.store.select(selectUserPermissions);

    this.store.pipe(select(selectAllVehicules)).subscribe(value => {
      this.dataSource = new MatTableDataSource(value);
    });
    this.store.pipe(select(selectVehiculeSearch)).subscribe(value => {
      this.search = value;
    });
  }

  delete(selectedId: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {titre: 'Suppression', body: 'Voulez-vous supprimer ?'};
    dialogConfig.width = '440px';
    this.dialog.open(ConfirmComponent, dialogConfig).afterClosed().subscribe(value => {
      if (value) {
        this.store.dispatch(new DeleteVehiculeRequest({id: selectedId}));
      }
    });
  }

  change(paginator) {
    this.store.dispatch(new LoadVehiculesRequest(
      this.search));
  }

  newElement() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.dialog.open(DialogAddVehiculeComponent, dialogConfig);
  }

  update(selectedId: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.store.dispatch(new LoadOneVehiculeRequest({id: selectedId}));
    this.dialog.open(DialogUpdateVehiculeComponent, dialogConfig);
  }

  onSearch($event: any) {
    this.store.dispatch(new LoadVehiculesRequest(
      $event));
  }
}
