import {Component, OnInit} from '@angular/core';
import {selectAllRoles, selectRolePaginatorInformations, selectRoleSearch} from '../../store/role.selectors';
import {select, Store} from '@ngrx/store';
import {RoleState} from '../../store/role.reducer';
import {Role} from '../../model/role';
import {MatDialog, MatDialogConfig, MatTableDataSource} from '@angular/material';
import {PaginatorInformations} from '../../../../shared_models/paginator-informations';
import {DeleteRoleRequest, LoadOneRoleRequest, LoadRolesRequest} from '../../store/role.actions';
import {ConfirmComponent} from '../../../../layouts/alerts/confirm/confirm.component';
import {DialogAddRoleComponent} from '../dialog-add-role/dialog-add-role.component';
import {DialogUpdateRoleComponent} from '../dialog-update-role/dialog-update-role.component';
import {selectUserPermissions} from '../../../user/store/user.selectors';
import {UserPermissions} from '../../../user/model/user-permissions';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nom', 'actions'];
  dataSource: MatTableDataSource<Role>;
  paginatorInformations: PaginatorInformations = {per_page: 15, current_page: 1};
  search: string;
  userPermission: Observable<UserPermissions>;

  constructor(private store: Store<RoleState>, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.userPermission = this.store.select(selectUserPermissions);
    this.store.pipe(select(selectAllRoles)).subscribe(value => {
      this.dataSource = new MatTableDataSource(value);
    });
    this.store.pipe(select(selectRolePaginatorInformations)).subscribe(value => {
      this.paginatorInformations = value;
    });
    this.store.pipe(select(selectRoleSearch)).subscribe(value => {
      this.search = value;
    });
  }

  delete(selectedId: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {titre: 'Suppression', body: 'Voulez-vous supprimer ?'};
    dialogConfig.width = '440px';
    this.dialog.open(ConfirmComponent, dialogConfig).afterClosed().subscribe(value => {
      if (value) {
        this.store.dispatch(new DeleteRoleRequest({id: selectedId}));
      }
    });
  }

  change(paginator) {
    this.store.dispatch(new LoadRolesRequest(
      this.search,
      {
        current_page: paginator.pageIndex + 1,
        per_page: paginator.pageSize
      }));
  }

  onSearch($event: any) {
    this.store.dispatch(new LoadRolesRequest(
      $event,
      {
        current_page: this.paginatorInformations.current_page,
        per_page: this.paginatorInformations.per_page
      }));
  }

  newElement() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.dialog.open(DialogAddRoleComponent, dialogConfig);
  }

  update(selectedId: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.store.dispatch(new LoadOneRoleRequest({id: selectedId}));
    this.dialog.open(DialogUpdateRoleComponent, dialogConfig);
  }


}
