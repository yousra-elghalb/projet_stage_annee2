import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig, MatTableDataSource} from '@angular/material';
import {Hotel} from '../../model/hotel';
import {PaginatorInformations} from '../../../../shared_models/paginator-informations';
import {select, Store} from '@ngrx/store';
import {HotelState} from '../../store/hotel.reducer';
import {selectAllHotels, selectHotelSearch} from '../../store/hotel.selectors';
import {ConfirmComponent} from '../../../../layouts/alerts/confirm/confirm.component';
import {DeleteHotelRequest, LoadOneHotelRequest, LoadHotelsRequest} from '../../store/hotel.actions';
import {DialogAddHotelComponent} from '../dialog-add-hotel/dialog-add-hotel.component';
import {DialogUpdateHotelComponent} from '../dialog-update-hotel/dialog-update-hotel.component';
import {Observable} from 'rxjs';
import {UserPermissions} from '../../../user/model/user-permissions';
import {selectUserPermissions} from '../../../user/store/user.selectors';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {


  displayedColumns: string[] = ['id', 'nom', 'reponsable', 'cat', 'formule', 'rib', 'actions'];
  dataSource: MatTableDataSource<Hotel>;
  search: string;
  userPermission: Observable<UserPermissions>;

  constructor(
    private store: Store<HotelState>,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.userPermission = this.store.select(selectUserPermissions);
    this.store.pipe(select(selectAllHotels)).subscribe(value => {
      this.dataSource = new MatTableDataSource(value);
    });
    this.store.pipe(select(selectHotelSearch)).subscribe(value => {
      this.search = value;
    });
  }

  delete(selectedId: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {titre: 'Suppression', body: 'Voulez-vous supprimer ?'};
    dialogConfig.width = '440px';
    this.dialog.open(ConfirmComponent, dialogConfig).afterClosed().subscribe(value => {
      if (value) {
        this.store.dispatch(new DeleteHotelRequest({id: selectedId}));
      }
    });
  }

  change(paginator) {
    this.store.dispatch(new LoadHotelsRequest(
      this.search));
  }

  newElement() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.dialog.open(DialogAddHotelComponent, dialogConfig);
  }

  update(selectedId: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.store.dispatch(new LoadOneHotelRequest({id: selectedId}));
    this.dialog.open(DialogUpdateHotelComponent, dialogConfig);
  }

  onSearch($event: any) {
    this.store.dispatch(new LoadHotelsRequest(
      $event));
  }
}
