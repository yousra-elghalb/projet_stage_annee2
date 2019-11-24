import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig, MatTableDataSource} from '@angular/material';
import {Ville} from '../../model/ville';
import {select, Store} from '@ngrx/store';
import {VilleState} from '../../store/ville.reducer';
import {selectAllVilles, selectVilleSearch} from '../../store/ville.selectors';
import {ConfirmComponent} from '../../../../layouts/alerts/confirm/confirm.component';
import {DeleteVilleRequest, LoadOneVilleRequest, LoadVillesRequest} from '../../store/ville.actions';
import {DialogAddVilleComponent} from '../dialog-add-ville/dialog-add-ville.component';
import {DialogUpdateVilleComponent} from '../dialog-update-ville/dialog-update-ville.component';
import {selectUserPermissions} from '../../../user/store/user.selectors';
import {Observable} from 'rxjs';
import {UserPermissions} from '../../../user/model/user-permissions';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {


  displayedColumns: string[] = ['id', 'nom', 'nomPays', 'actions'];
  dataSource: MatTableDataSource<Ville>;
  search: string;
  userPermission: Observable<UserPermissions>;

  constructor(private store: Store<VilleState>, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.userPermission = this.store.select(selectUserPermissions);
    this.store.pipe(select(selectAllVilles)).subscribe(value => {
      this.dataSource = new MatTableDataSource(value);
    });
    this.store.pipe(select(selectVilleSearch)).subscribe(value => {
      this.search = value;
    });
  }

  delete(selectedId: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {titre: 'Suppression', body: 'Voulez-vous supprimer ?'};
    dialogConfig.width = '440px';
    this.dialog.open(ConfirmComponent, dialogConfig).afterClosed().subscribe(value => {
      if (value) {
        this.store.dispatch(new DeleteVilleRequest({id: selectedId}));
      }
    });
  }

  change(paginator) {
    this.store.dispatch(new LoadVillesRequest(
      this.search));
  }

  newElement() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.dialog.open(DialogAddVilleComponent, dialogConfig);
  }

  update(selectedId: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.store.dispatch(new LoadOneVilleRequest({id: selectedId}));
    this.dialog.open(DialogUpdateVilleComponent, dialogConfig);
  }

  onSearch($event: any) {
    this.store.dispatch(new LoadVillesRequest(
      $event));
  }
}
