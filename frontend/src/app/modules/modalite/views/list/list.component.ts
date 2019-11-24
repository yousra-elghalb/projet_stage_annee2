import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig, MatTableDataSource} from '@angular/material';
import {Modalite} from '../../../modalite/model/modalite';
import {PaginatorInformations} from '../../../../shared_models/paginator-informations';
import {select, Store} from '@ngrx/store';
import {ModaliteState} from '../../../modalite/store/modalite.reducer';
import {selectAllModalites, selectModalitePaginatorInformations, selectModaliteSearch} from '../../../modalite/store/modalite.selectors';
import {ConfirmComponent} from '../../../../layouts/alerts/confirm/confirm.component';
import {DeleteModaliteRequest, LoadOneModaliteRequest, LoadModalitesRequest} from '../../../modalite/store/modalite.actions';
import {DialogAddModalteComponent} from '../dialog-add-modalte/dialog-add-modalte.component';
import {DialogUpdateModaliteComponent} from '../dialog-update-modalite/dialog-update-modalite.component';
import {Observable} from 'rxjs';
import {UserPermissions} from '../../../user/model/user-permissions';
import {selectUserPermissions} from '../../../user/store/user.selectors';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {


  displayedColumns: string[] = ['id', 'nom', 'actions'];
  dataSource: MatTableDataSource<Modalite>;
  paginatorInformations: PaginatorInformations = {per_page: 15, current_page: 1};
  search: string;
  userPermission: Observable<UserPermissions>;

  constructor(private store: Store<ModaliteState>, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.userPermission = this.store.select(selectUserPermissions);
    this.store.pipe(select(selectAllModalites)).subscribe(value => {
      this.dataSource = new MatTableDataSource(value);
    });
    this.store.pipe(select(selectModalitePaginatorInformations)).subscribe(value => {
      this.paginatorInformations = value;
    });
    this.store.pipe(select(selectModaliteSearch)).subscribe(value => {
      this.search = value;
    });
  }

  delete(selectedId: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {titre: 'Suppression', body: 'Voulez-vous supprimer ?'};
    dialogConfig.width = '440px';
    this.dialog.open(ConfirmComponent, dialogConfig).afterClosed().subscribe(value => {
      if (value) {
        this.store.dispatch(new DeleteModaliteRequest({id: selectedId}));
      }
    });
  }

  change(paginator) {
    this.store.dispatch(new LoadModalitesRequest(
      this.search,
      {
        current_page: paginator.pageIndex + 1,
        per_page: paginator.pageSize
      }));
  }

  newElement() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.dialog.open(DialogAddModalteComponent, dialogConfig);
  }

  update(selectedId: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.store.dispatch(new LoadOneModaliteRequest({id: selectedId}));
    this.dialog.open(DialogUpdateModaliteComponent, dialogConfig);
  }

  onSearch($event: any) {
    this.store.dispatch(new LoadModalitesRequest(
      $event,
      {
        current_page: this.paginatorInformations.current_page,
        per_page: this.paginatorInformations.per_page
      }));
  }
}
