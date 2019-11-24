import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig, MatTableDataSource} from '@angular/material';
import {Commercial} from '../../model/commercial';
import {PaginatorInformations} from '../../../../shared_models/paginator-informations';
import {select, Store} from '@ngrx/store';
import {CommercialState} from '../../store/commercial.reducer';
import {selectAllCommercials, selectCommercialSearch} from '../../store/commercial.selectors';
import {ConfirmComponent} from '../../../../layouts/alerts/confirm/confirm.component';
import {DeleteCommercialRequest, LoadOneCommercialRequest, LoadCommercialsRequest} from '../../store/commercial.actions';
import {DialogAddCommercialComponent} from '../dialog-add-commercial/dialog-add-commercial.component';
import {DialogUpdateCommercialComponent} from '../dialog-update-commercial/dialog-update-commercial.component';
import {Observable} from 'rxjs';
import {UserPermissions} from '../../../user/model/user-permissions';
import {selectUserPermissions} from '../../../user/store/user.selectors';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {


  displayedColumns: string[] = ['id', 'img', 'nom', 'prenom', 'cin', 'tel', 'email', 'agence', 'actions'];
  dataSource: MatTableDataSource<Commercial>;
  search: string;
  userPermission: Observable<UserPermissions>;
  externe: boolean;

  constructor(
    private store: Store<CommercialState>,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.userPermission = this.store.select(selectUserPermissions);
    this.store.pipe(select(selectAllCommercials)).subscribe(value => {
      this.route.paramMap.subscribe(value1 => {
        this.externe = value1.get('externe') === 'yes';
        if (this.externe) {
          this.dataSource = new MatTableDataSource(value.filter(value2 => value2.limitedAccess));
        } else {
          this.dataSource = new MatTableDataSource(value.filter(value2 => !value2.limitedAccess));
        }
      });
    });
    this.store.pipe(select(selectCommercialSearch)).subscribe(value => {
      this.search = value;
    });
  }

  delete(selectedId: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {titre: 'Suppression', body: 'Voulez-vous supprimer ?'};
    dialogConfig.width = '440px';
    this.dialog.open(ConfirmComponent, dialogConfig).afterClosed().subscribe(value => {
      if (value) {
        this.store.dispatch(new DeleteCommercialRequest({id: selectedId}));
      }
    });
  }

  change(paginator) {
    this.store.dispatch(new LoadCommercialsRequest(
      this.search));
  }

  newElement() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.dialog.open(DialogAddCommercialComponent, dialogConfig);
  }

  update(selectedId: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.store.dispatch(new LoadOneCommercialRequest({id: selectedId}));
    this.dialog.open(DialogUpdateCommercialComponent, dialogConfig);
  }

  onSearch($event: any) {
    this.store.dispatch(new LoadCommercialsRequest(
      $event));
  }
}
