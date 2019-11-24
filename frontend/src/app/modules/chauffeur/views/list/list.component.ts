import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig, MatTableDataSource} from '@angular/material';
import {Chauffeur} from '../../model/chauffeur';
import {PaginatorInformations} from '../../../../shared_models/paginator-informations';
import {select, Store} from '@ngrx/store';
import {ChauffeurState} from '../../store/chauffeur.reducer';
import {selectAllChauffeurs, selectChauffeurSearch} from '../../store/chauffeur.selectors';
import {ConfirmComponent} from '../../../../layouts/alerts/confirm/confirm.component';
import {DeleteChauffeurRequest, LoadOneChauffeurRequest, LoadChauffeursRequest} from '../../store/chauffeur.actions';
import {DialogAddChauffeurComponent} from '../dialog-add-chauffeur/dialog-add-chauffeur.component';
import {DialogUpdateChauffeurComponent} from '../dialog-update-chauffeur/dialog-update-chauffeur.component';
import {Observable} from 'rxjs';
import {UserPermissions} from '../../../user/model/user-permissions';
import {selectUserPermissions} from '../../../user/store/user.selectors';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {


  displayedColumns: string[] = ['id', 'nom', 'prenom', 'cin', 'tel', 'email', 'actions'];
  dataSource: MatTableDataSource<Chauffeur>;
  search: string;
  userPermission: Observable<UserPermissions>;

  constructor(
    private store: Store<ChauffeurState>,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.userPermission = this.store.select(selectUserPermissions);
    this.store.pipe(select(selectAllChauffeurs)).subscribe(value => {
      this.dataSource = new MatTableDataSource(value);
    });
    this.store.pipe(select(selectChauffeurSearch)).subscribe(value => {
      this.search = value;
    });
  }

  delete(selectedId: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {titre: 'Suppression', body: 'Voulez-vous supprimer ?'};
    dialogConfig.width = '440px';
    this.dialog.open(ConfirmComponent, dialogConfig).afterClosed().subscribe(value => {
      if (value) {
        this.store.dispatch(new DeleteChauffeurRequest({id: selectedId}));
      }
    });
  }

  change(paginator) {
    this.store.dispatch(new LoadChauffeursRequest(
      this.search));
  }

  newElement() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.dialog.open(DialogAddChauffeurComponent, dialogConfig);
  }

  update(selectedId: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.store.dispatch(new LoadOneChauffeurRequest({id: selectedId}));
    this.dialog.open(DialogUpdateChauffeurComponent, dialogConfig);
  }

  onSearch($event: any) {
    this.store.dispatch(new LoadChauffeursRequest(
      $event));
  }
}
