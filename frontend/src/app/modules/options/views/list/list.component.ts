import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig, MatTableDataSource} from '@angular/material';
import {Option} from '../../model/option';
import {PaginatorInformations} from '../../../../shared_models/paginator-informations';
import {select, Store} from '@ngrx/store';
import {OptionState} from '../../store/option.reducer';
import {selectAllOptions, selectOptionSearch} from '../../store/option.selectors';
import {ConfirmComponent} from '../../../../layouts/alerts/confirm/confirm.component';
import {DeleteOptionRequest, LoadOneOptionRequest, LoadOptionsRequest} from '../../store/option.actions';
import {DialogAddOptionComponent} from '../dialog-add-option/dialog-add-option.component';
import {DialogUpdateOptionComponent} from '../dialog-update-option/dialog-update-option.component';
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
  dataSource: MatTableDataSource<Option>;
  search: string;
  userPermission: Observable<UserPermissions>;

  constructor(private store: Store<OptionState>, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.userPermission = this.store.select(selectUserPermissions);

    this.store.pipe(select(selectAllOptions)).subscribe(value => {
      this.dataSource = new MatTableDataSource(value);
    });
    this.store.pipe(select(selectOptionSearch)).subscribe(value => {
      this.search = value;
    });
  }

  delete(selectedId: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {titre: 'Suppression', body: 'Voulez-vous supprimer ?'};
    dialogConfig.width = '440px';
    this.dialog.open(ConfirmComponent, dialogConfig).afterClosed().subscribe(value => {
      if (value) {
        this.store.dispatch(new DeleteOptionRequest({id: selectedId}));
      }
    });
  }

  change(paginator) {
    this.store.dispatch(new LoadOptionsRequest(
      this.search));
  }

  newElement() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.dialog.open(DialogAddOptionComponent, dialogConfig);
  }

  update(selectedId: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.store.dispatch(new LoadOneOptionRequest({id: selectedId}));
    this.dialog.open(DialogUpdateOptionComponent, dialogConfig);
  }

  onSearch($event: any) {
    this.store.dispatch(new LoadOptionsRequest(
      $event));
  }
}
