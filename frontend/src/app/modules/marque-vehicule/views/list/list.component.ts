import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig, MatTableDataSource} from '@angular/material';
import {MarqueVehicule} from '../../model/marque-vehicule';
import {PaginatorInformations} from '../../../../shared_models/paginator-informations';
import {select, Store} from '@ngrx/store';
import {MarqueVehiculeState} from '../../store/marque-vehicule.reducer';
import {selectAllMarqueVehicules, selectMarqueVehiculeSearch} from '../../store/marque-vehicule.selectors';
import {ConfirmComponent} from '../../../../layouts/alerts/confirm/confirm.component';
import {DeleteMarqueVehiculeRequest, LoadOneMarqueVehiculeRequest, LoadMarqueVehiculesRequest} from '../../store/marque-vehicule.actions';
import {DialogAddMarqueVehiculeComponent} from '../dialog-add-marque-vehicule/dialog-add-marque-vehicule.component';
import {DialogUpdateMarqueVehiculeComponent} from '../dialog-update-marque-vehicule/dialog-update-marque-vehicule.component';
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
  dataSource: MatTableDataSource<MarqueVehicule>;
  search: string;
  userPermission: Observable<UserPermissions>;

  constructor(private store: Store<MarqueVehiculeState>, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.userPermission = this.store.select(selectUserPermissions);

    this.store.pipe(select(selectAllMarqueVehicules)).subscribe(value => {
      this.dataSource = new MatTableDataSource(value);
    });
    this.store.pipe(select(selectMarqueVehiculeSearch)).subscribe(value => {
      this.search = value;
    });
  }

  delete(selectedId: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {titre: 'Suppression', body: 'Voulez-vous supprimer ?'};
    dialogConfig.width = '440px';
    this.dialog.open(ConfirmComponent, dialogConfig).afterClosed().subscribe(value => {
      if (value) {
        this.store.dispatch(new DeleteMarqueVehiculeRequest({id: selectedId}));
      }
    });
  }

  change(paginator) {
    this.store.dispatch(new LoadMarqueVehiculesRequest(
      this.search));
  }

  newElement() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.dialog.open(DialogAddMarqueVehiculeComponent, dialogConfig);
  }

  update(selectedId: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.store.dispatch(new LoadOneMarqueVehiculeRequest({id: selectedId}));
    this.dialog.open(DialogUpdateMarqueVehiculeComponent, dialogConfig);
  }

  onSearch($event: any) {
    this.store.dispatch(new LoadMarqueVehiculesRequest(
      $event));
  }
}
