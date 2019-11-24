import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig, MatTableDataSource} from '@angular/material';
import {PaginatorInformations} from '../../../../shared_models/paginator-informations';
import {select, Store} from '@ngrx/store';
import {
  selectAllSousCategories,
  selectSousCategorieSearch
} from '../../store/sous-categorie.selectors';
import {ConfirmComponent} from '../../../../layouts/alerts/confirm/confirm.component';
import {DeleteSousCategorieRequest, LoadOneSousCategorieRequest, LoadSousCategoriesRequest} from '../../store/sous-categorie.actions';
import {DialogAddSousCategorieComponent} from '../dialog-add-sous-categorie/dialog-add-sous-categorie.component';
import {DialogUpdateSousCategorieComponent} from '../dialog-update-sous-categorie/dialog-update-sous-categorie.component';
import {SousCategorie} from '../../model/sous-categorie';
import {SousCategorieState} from '../../store/sous-categorie.reducer';
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
  dataSource: MatTableDataSource<SousCategorie>;
  search: string;
  userPermission: Observable<UserPermissions>;

  constructor(private store: Store<SousCategorieState>, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.userPermission = this.store.select(selectUserPermissions);
    this.store.pipe(select(selectAllSousCategories)).subscribe(value => {
      this.dataSource = new MatTableDataSource(value);
    });
    this.store.pipe(select(selectSousCategorieSearch)).subscribe(value => {
      this.search = value;
    });
  }

  delete(selectedId: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {titre: 'Suppression', body: 'Voulez-vous supprimer ?'};
    dialogConfig.width = '440px';
    this.dialog.open(ConfirmComponent, dialogConfig).afterClosed().subscribe(value => {
      if (value) {
        this.store.dispatch(new DeleteSousCategorieRequest({id: selectedId}));
      }
    });
  }

  change(paginator) {
    this.store.dispatch(new LoadSousCategoriesRequest(
      this.search));
  }

  newElement() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.dialog.open(DialogAddSousCategorieComponent, dialogConfig);
  }

  update(selectedId: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.store.dispatch(new LoadOneSousCategorieRequest({id: selectedId}));
    this.dialog.open(DialogUpdateSousCategorieComponent, dialogConfig);
  }

  onSearch($event: any) {
    this.store.dispatch(new LoadSousCategoriesRequest(
      $event));
  }
}
